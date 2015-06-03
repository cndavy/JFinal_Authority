package com.ccb.project.controller;

import com.ccb.project.model.Prj;
import com.ccb.project.validator.PrjValidator;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.EasyuiController;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/project", viewPath = UrlConfig.PROJECT)
public class PrjController extends EasyuiController<Prj>
{

	public void list()
	{
		renderJson(Prj.dao.list(getDataGrid(), getFrom(null)));
	}

	public void status()
	{

		renderJsonResult(getModel().updateAndModifyDate());

	}

	@Before(value = { PrjValidator.class })
	public void add()
	{
		renderJsonResult(getModel().saveAndCreateDate());

	}

	@Before(value = { PrjValidator.class })
	public void edit()
	{
		renderJsonResult(getModel().updateAndModifyDate());

	}

	public void delete()
	{
		renderJsonResult(Prj.dao.deleteById(getPara("id")));
	}

}
