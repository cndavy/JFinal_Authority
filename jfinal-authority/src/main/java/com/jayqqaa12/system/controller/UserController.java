package com.jayqqaa12.system.controller;

import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.EasyuiController;
import com.jayqqaa12.jbase.util.Validate;
import com.jayqqaa12.service.EmailService;
import com.jayqqaa12.shiro.ShiroCache;
import com.jayqqaa12.system.model.User;
import com.jayqqaa12.system.validator.UserValidator;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/system/user", viewPath = UrlConfig.SYSTEM)
public class UserController extends EasyuiController<User>
{

	public void list()
	{
		renderJson(User.dao.listByDataGrid(getDataGrid(), getFrom(User.dao.tableName)));
	}
	
	
	public void select()
	{
		renderJson(User.dao.list(getDataGrid(), getFrom(User.dao.tableName)));
	}


	@Override
	public void delete()
	{
		renderJsonResult(User.dao.deleteById(getPara("id")));
	}

	public void freeze()
	{
		renderJsonResult(User.dao.changeStaus(getParaToInt("id"), getParaToInt("status")));
	}

	public void batchDelete()
	{
		renderJsonResult(User.dao.batchDelete(getPara("ids")));
	}

	public void batchGrant()
	{

		Integer[] role_ids = getParaValuesToInt("role_ids");
		String ids = getPara("ids");

		renderJsonResult(User.dao.batchGrant(role_ids, ids));

		ShiroCache.clearAuthorizationInfoAll();

	}

	@Before(value = { UserValidator.class })
	public void add()
	{
		renderJsonResult(getModel().encrypt().saveAndDate());
	}

	@Override
	@Before(value = { UserValidator.class })
	public void edit()
	{
		
		renderJsonResult(getModel().update());

	}

	@Before(value = { UserValidator.class })
	public void pwd()
	{
		renderJsonResult(getModel().encrypt().update());
		
		
		//send eamil
		User user = User.dao.findById(getModel().getId());
		if (!Validate.isEmpty(user.getStr("email"))) ;
		new EmailService().sendModifyPwdEmail(user.getStr("email"));

	}

	public void grant()
	{
		Integer[] role_ids = getParaValuesToInt("role_ids");
		renderJsonResult(User.dao.grant(role_ids, getModel().getId()));
		ShiroCache.clearAuthorizationInfoAll();

	}

}
