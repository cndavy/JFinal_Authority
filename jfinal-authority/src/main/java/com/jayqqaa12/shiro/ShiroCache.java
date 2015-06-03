package com.jayqqaa12.shiro;

import java.io.Serializable;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;

public class ShiroCache
{

	private static CacheManager cacheManager;

	/**
	 * 清除用户的授权信息
	 * 
	 * @param username
	 */
	public static void clearAuthorizationInfo(String username)
	{
		Cache<Object, Object> cache = cacheManager.getCache("myRealm.authorizationCache");
		cache.remove(username);
		
	}

	public static void clearAuthorizationInfoAll()
	{
		Cache<Object, Object> cache = cacheManager.getCache("myRealm.authorizationCache");
		cache.clear();

	}

	/**
	 * 清除session(认证信息)
	 * 
	 * @param JSESSIONID
	 */
	public static void clearSession(Serializable JSESSIONID)
	{
		Cache<Object, Object> cache = cacheManager.getCache("shiro-activeSessionCache");
		cache.remove(JSESSIONID);
	}

	public static CacheManager getCacheManager()
	{
		return cacheManager;
	}

	public static void setCacheManager(CacheManager cacheManager)
	{
		ShiroCache.cacheManager = cacheManager;
	}

}
