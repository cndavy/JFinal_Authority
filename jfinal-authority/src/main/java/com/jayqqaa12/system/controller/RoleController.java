package com.jayqqaa12.system.controller;

import com.jayqqaa12.common.Consts;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.Controller;
import com.jayqqaa12.shiro.ShiroCache;
import com.jayqqaa12.system.model.Role;
import com.jayqqaa12.system.model.User;
import com.jayqqaa12.system.validator.RoleValidator;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/system/role", viewPath = UrlConfig.SYSTEM)
public class RoleController extends Controller<Role>
{

	public void list()
	{
		renderJson(Role.dao.list());
	}
	
	

	public void tree()
	{

		Integer pid = getParaToInt("id");
		Integer passId = getParaToInt("passId");
		renderJson(Role.dao.getTree(pid, passId));

	}

	public void grant()
	{
		Role role = getModel();
		String res_ids = getPara("res_ids");
		renderJsonResult(Role.dao.batchGrant(role.getId(), res_ids));

		ShiroCache.clearAuthorizationInfoAll();

	}

	@Override
	@Before(value = { RoleValidator.class })
	public void add()
	{
		renderJsonResult(getModel().save());
	}

	@Override
	@Before(value = { RoleValidator.class })
	public void edit()
	{
		Role role = getModel();

		if (role.getId() == role.getPid()) renderJsonError("父节点不能为自己");
		else if (Role.dao.pidIsChild(role.getId(), role.getPid())) renderJsonError("父节点不能为子节点");
		else renderJsonResult(role.update());

	}

	public void delete()
	{
		int id = getParaToInt("id");

		for (Role r : Role.dao.getRole(((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId()))
		{
			if (r.getId() == id)
			{
				renderJsonError("无法删除 自己的角色");
				return;
			}
		}

		if (id == 1) renderJsonError("admin 无法删除");
		else renderJsonResult(Role.dao.deleteByIdAndPid(id));
	}

}
