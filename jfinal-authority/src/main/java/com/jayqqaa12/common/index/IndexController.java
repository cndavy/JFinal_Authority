package com.jayqqaa12.common.index;

import com.jayqqaa12.common.Consts;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.common.validator.LoginValidator;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.Controller;
import com.jayqqaa12.jbase.util.RSA;
import com.jayqqaa12.jbase.util.Sec;
import com.jayqqaa12.jbase.util.Validate;
import com.jayqqaa12.system.model.Log;
import com.jayqqaa12.system.model.User;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import org.apache.commons.codec.binary.Hex;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;

import java.security.interfaces.RSAPublicKey;

/***
 * 
 * 月落斜阳 灯火阑珊
 * 
 * @author 12
 * 
 */
@ControllerBind(controllerKey = "/",viewPath=UrlConfig.INDEX)
public class IndexController extends Controller
{
	
	public void jump()
	{
		Log.dao.insert(this, Log.EVENT_VISIT);
		render(UrlConfig.VIEW_COMMON_JUMP);
	}

	public void initDb()
	{
	//	new InitService().initDb(getRequest().getRealPath("/static/file") + File.separator + "init.sql");
		forwardAction("/jump");
	}

	public void loginView()
	{
		if (firstInto()) return;

		RSAPublicKey publicKey = RSA.getDefaultPublicKey();
		String modulus = new String(Hex.encodeHex(publicKey.getModulus().toByteArray()));
		String exponent = new String(Hex.encodeHex(publicKey.getPublicExponent().toByteArray()));

		setAttr("modulus", modulus);
		setAttr("exponent", exponent);

		render(UrlConfig.VIEW_COMMON_LOGIN);

	}

	private boolean firstInto()
	{
		String init = getCookie("init");
		if (init == null) setCookie("init", "init", 1000 * 60 * 60 * 24 * 365);
		render(UrlConfig.VIEW_COMMON_INIT);

		return Validate.isEmpty(init);
	}

	public void loginOut()
	{
		try
		{
			Subject subject = SecurityUtils.getSubject();
			subject.logout();

			renderTop(UrlConfig.LOGIN);

		} catch (AuthenticationException e)
		{
			e.printStackTrace();
			renderText("异常：" + e.getMessage());
		}
	}

	@Before(LoginValidator.class)
	public void login()
	{
		String[] result = RSA.decryptUsernameAndPwd(getPara("key"));

		try
		{
			UsernamePasswordToken token = new UsernamePasswordToken(result[0], Sec.md5(result[1]));
			Subject subject = SecurityUtils.getSubject();
			if (!subject.isAuthenticated())
			{
				token.setRememberMe(true);
				subject.login(token);
				subject.getSession(true).setAttribute(Consts.SESSION_USER, User.dao.findByName(result[0]));

			}

			Log.dao.insert(this, Log.EVENT_LOGIN);

			redirect("/");

		} catch (UnknownAccountException e)
		{

			forwardAction("用户名不存在", UrlConfig.LOGIN);

		} catch (IncorrectCredentialsException e)
		{
			forwardAction("密码错误", UrlConfig.LOGIN);

		} catch (LockedAccountException e)
		{
			forwardAction("对不起 帐号被封了", UrlConfig.LOGIN);
			e.printStackTrace();
		} catch (ExcessiveAttemptsException e)
		{
			forwardAction("尝试次数过多 请明天再试", UrlConfig.LOGIN);
		} catch (AuthenticationException e)
		{
			forwardAction("对不起 没有权限 访问", UrlConfig.LOGIN);
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
			forwardAction("请重新登录", UrlConfig.LOGIN);
		}

	}

	public void unauthorized()
	{

		render(UrlConfig.VIEW_ERROR_401);
	}

}
