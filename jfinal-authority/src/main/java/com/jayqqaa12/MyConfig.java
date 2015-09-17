package com.jayqqaa12;

import com.alibaba.druid.filter.stat.StatFilter;
import com.alibaba.druid.wall.WallFilter;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.xss.XssHandler;
import com.jayqqaa12.shiro.SessionHandler;
import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.handler.FakeStaticHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.ext.plugin.config.ConfigKit;
import com.jfinal.ext.plugin.config.ConfigPlugin;
import com.jfinal.ext.plugin.shiro.ShiroInterceptor;
import com.jfinal.ext.plugin.shiro.ShiroPlugin;
import com.jfinal.ext.plugin.sqlinxml.SqlInXmlPlugin;
import com.jfinal.ext.plugin.tablebind.AutoTableBindPlugin;
import com.jfinal.ext.route.AutoBindRoutes;
import com.jfinal.plugin.activerecord.SqlReporter;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.druid.DruidStatViewHandler;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import org.beetl.core.GroupTemplate;
import org.beetl.ext.jfinal.BeetlRenderFactory;

/**
 * API引导式配置
 */
public class MyConfig extends JFinalConfig
{
	public boolean OPEN_SHIRO = true;
	public boolean OPEN_ADV =true; // 可设置隐藏  项目介绍等
	
	private Routes routes;
	private boolean isDev = isDevMode();

	private boolean isDevMode()
	{
		String osName = System.getProperty("os.name");
		return osName.indexOf("Windows") != -1;
	}

	/**
	 * 配置常量
	 */
	public void configConstant(Constants me)
	{
		me.setError404View("/page/error/404.html");
		me.setError401View("/page/error/401.html");
		me.setError403View("/page/error/403.html");
		me.setError500View("/page/error/500.html");

		new ConfigPlugin(".*.txt").reload(false).start();

		me.setDevMode(isDev);
		// me.setViewType(ViewType.OTHER);

		// beel
		me.setMainRenderFactory(new BeetlRenderFactory());
		GroupTemplate gt = BeetlRenderFactory.groupTemplate;
		gt.registerFunctionPackage("so", new ShiroExt());
		me.setEncoding("utf-8");
	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me)
	{
		this.routes = me;
		// 自动扫描 建议用注解
		me.add(new AutoBindRoutes(false) );
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me)
	{

		// 配置Druid 数据库连接池插件
		DruidPlugin dbPlugin = new DruidPlugin(ConfigKit.getStr("jdbcUrl"),
				ConfigKit.getStr("user"), ConfigKit.getStr("password")
		// DruidUtil.decrypt(getProperty("password"),
		// getProperty("decrypt"))

		);
		// 设置 状态监听与 sql防御
		WallFilter wall = new WallFilter();
		wall.setDbType(ConfigKit.getStr("dbType"));
		dbPlugin.addFilter(wall);
		dbPlugin.addFilter(new StatFilter());
		me.add(dbPlugin);


		// redis
		// me.add(new JedisPlugin());

		// add EhCache
		me.add(new EhCachePlugin());
		// add sql xml plugin
		me.add(new SqlInXmlPlugin());
		// add shrio
		if (OPEN_SHIRO) me.add(new ShiroPlugin(this.routes));

		// 配置AutoTableBindPlugin插件
		AutoTableBindPlugin atbp = new AutoTableBindPlugin(dbPlugin);
		atbp.setDialect(new MysqlDialect());
		if (isDev) atbp.setShowSql(true);
		atbp.autoScan(false);
		if (ConfigKit.getStr("TransactionLevel")!=null)
		atbp.setTransactionLevel(ConfigKit.getInt("TransactionLevel"));
		//atbp.addMapping("audititemlist", "ItemId, ItemRelaPersId, serialNum", AuditItemList.class);
		me.add(atbp);
		// sql记录
		SqlReporter.setLogger(true);

		// cim 模块 可做聊天 推送等
		// CIMPlugin cim = new CIMPlugin();
		// cim.setBindHandler(new BindHandler());
		// cim.setHeartBeatHandler(new HeartbeatHandler());
		// cim.setLogoutHandler(new LogoutHandler());
		// cim.setSessionClosedHandler(new SessionClosedHandler());
		// me.add(cim);

	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me)
	{
		// shiro权限拦截器配置
		if (OPEN_SHIRO) me.add(new ShiroInterceptor());
		if (OPEN_SHIRO) me.add(new com.jayqqaa12.shiro.ShiroInterceptor());

		// 让 模版 可以使用session
		me.add(new SessionInViewInterceptor());
	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me)
	{
		// 计算每个page 运行时间
		// me.add(new RenderingTimeHandler());

		// xss 过滤
		me.add(new XssHandler("s"));
		// 伪静态处理
		me.add(new FakeStaticHandler());
		// 去掉 jsessionid 防止找不到action
		me.add(new SessionHandler());
		me.add(new DruidStatViewHandler("/druid"));

		me.add(new ContextPathHandler());// Context_Path 变量设置
	}

	/**
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args)
	{
		JFinal.start("src/main/webapp", 2222, "/", 5);
	}

}
