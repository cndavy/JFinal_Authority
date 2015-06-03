package com.jayqqaa12.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;

import com.jayqqaa12.system.model.Role;
import com.jayqqaa12.system.model.User;

public class ShiroDbRealm extends AuthorizingRealm
{

	@Override
	public void setCacheManager(CacheManager cacheManager)
	{
		super.setCacheManager(cacheManager);
		ShiroCache.setCacheManager(cacheManager);
	}

	/**
	 * 认证回调函数,登录时调用.
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException
	{

		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		User user = User.dao.findByName(token.getUsername());
		
		if (user == null) throw new UnknownAccountException();// 没找到帐号
		if (user.getStatus().equals(2)) throw new LockedAccountException(" USER Freeze");

		else return new SimpleAuthenticationInfo(user.getName(), user.getPwd(), getName());
	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals)
	{

		String loginName = (String) principals.fromRealm(getName()).iterator().next();
		User user = User.dao.findByName(loginName);

		if (user != null)
		{
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			info.addRoles(user.getRolesName(loginName));
			for (String role : info.getRoles())
			{
				info.addStringPermissions(Role.dao.getResUrl(role));

			}

			return info;

		}
		else
		{
			return null;
		}
	}

	/**
	 * 更新用户授权信息缓存.
	 */
	public void clearCachedAuthorizationInfo(String principal)
	{
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());

		clearCachedAuthorizationInfo(principals);
	}

	/**
	 * 清除所有用户授权信息缓存.
	 */
	public void clearAllCachedAuthorizationInfo()
	{
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();

		if (cache != null)
		{
			for (Object key : cache.keys())
			{
				cache.remove(key);
			}
		}
	}

}
