package com.jayqqaa12.system.controller;

import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.Controller;
import com.jayqqaa12.shiro.ShiroCache;
import com.jayqqaa12.shiro.ShiroInterceptor;
import com.jayqqaa12.system.model.Res;
import com.jayqqaa12.system.model.Role;
import com.jayqqaa12.system.validator.ResValidator;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/system/res", viewPath = UrlConfig.SYSTEM)
public class ResController extends Controller<Res>
{

	public void tree()
	{
		Integer pid = getParaToInt("id");
		Integer passId = getParaToInt("passId");
		int type = getParaToInt("type", Res.TYPE_MEUE);
		renderJson(Res.dao.getTree(pid, type, passId));

	}

	public void list()
	{
		renderJson(Res.dao.listOrderBySeq());
	}

	public void delete()
	{
		renderJsonResult(Res.dao.deleteByIdAndPid(getParaToInt("id")));

		removeAuthorization();
	}

	@Before(value = { ResValidator.class })
	public void add()
	{
		Res res=getModel();
		boolean result=res.save();
		renderJsonResult(result);
		
		if(result) Role.dao.grant(1, res.getId()+"");
		
		removeAuthorization();
	}

	@Before(value = { ResValidator.class })
	public void edit()
	{
		Res res = getModel();

		if (res.getId() == res.getPid()) renderJsonError("父节点不能为自己");
		else if (res.getType() == Res.TYPE_PERMISSION && Res.dao.getChild(res.getId(), null).size() > 0) renderJsonError("功能属性不能有子节点");
		else if (Res.dao.pidIsChild(res.getId(), res.getPid())) renderJsonError("父节点不能为子节点");
		else
		{
			renderJsonResult(res.update());
			removeAuthorization();
		}

	}

	private void removeAuthorization()
	{
		ShiroCache.clearAuthorizationInfoAll();
		ShiroInterceptor.updateUrls();
	}

}
