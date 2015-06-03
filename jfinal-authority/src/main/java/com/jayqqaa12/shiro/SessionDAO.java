package com.jayqqaa12.shiro;

import java.io.Serializable;
import java.util.Collection;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;

import com.jayqqaa12.common.Consts;
import com.jayqqaa12.jbase.util.L;
import com.jfinal.ext.plugin.redis.JedisKit;
import com.jfinal.ext.plugin.redis.JedisPlugin;

/***
 * 用redis 实现 分布式缓存
 * 
 * @author 12
 * 
 */
public class SessionDAO extends EnterpriseCacheSessionDAO
{
	private static final String SHIRO_SESSION = "shiro-session:";

	private static int i;

	public SessionDAO()
	{
		if (Consts.OPEN_REDIS) new JedisPlugin().start();
	}

	@Override
	protected Serializable doCreate(Session session)
	{
		if (Consts.OPEN_REDIS)
		{
			L.i("on create session=" + session);
			Serializable sessionId = super.doCreate(session);
			L.i("after on create session=" + session);
			saveSession(sessionId, session);
			return sessionId;
		}
		else return super.doCreate(session);

	}

	@Override
	protected Session doReadSession(Serializable sessionId)
	{
		L.i("doReadSession");
		if (Consts.OPEN_REDIS)
		{
			Session session = super.doReadSession(sessionId);
			if (session != null) return session;
			session = JedisKit.get(SHIRO_SESSION + sessionId.toString());
			if (session != null) super.update(session);
			return session;
		}
		else return super.doReadSession(sessionId);
	}

	@Override
	public void update(Session session) throws UnknownSessionException
	{

		L.i(" update session " + session);
		if (Consts.OPEN_REDIS)
		{
			super.update(session);
			if (i++ % 10 == 0) saveSession(session.getId(), session);
		}
		else super.update(session);
	}

	@Override
	public void delete(Session session)
	{
		if (session != null)
		{
			Serializable id = session.getId();

			if (id != null)
			{
				if (Consts.OPEN_REDIS) JedisKit.del(SHIRO_SESSION + session.getId().toString());
				super.delete(session);
			}

		}
	}

	private Session saveSession(Serializable id, Session session)
	{
		L.i("saveSession ID=" + id + " session=" + session);
		if (id != null) JedisKit.set(SHIRO_SESSION + session.getId().toString(), (Serializable) session, (int) session.getTimeout() / 1000);

		return session;
	}

	@Override
	public Collection<Session> getActiveSessions()
	{
		if (Consts.OPEN_REDIS) return null;
		else return super.getActiveSessions();
	}

}
