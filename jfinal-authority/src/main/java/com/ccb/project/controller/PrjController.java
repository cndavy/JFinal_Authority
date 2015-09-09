package com.ccb.project.controller;

import com.ccb.project.model.Prj;
import com.ccb.project.validator.PrjAddValidator;
import com.ccb.project.validator.PrjEditValidator;
import com.ccb.project.validator.PrjEndDateValidator;
import com.jayqqaa12.common.Consts;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.EasyuiController;
import com.jayqqaa12.model.easyui.Form;
import com.jayqqaa12.system.model.User;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/project", viewPath = UrlConfig.PROJECT)
public class PrjController extends EasyuiController<Prj>
{


	public void list()
	{
		renderJson(Prj.dao.listByDataGrid(Prj.dao.sql("project.project.listPerson"), getDataGrid(),getFrom(null)));
	}
    public void getPerson(){
	   renderJson(Prj.dao.getPerson());
    }

	public Form getFrom(String tableName)
	{

		return Form.getForm(tableName, this,  "system_user.id", "enddateStart", "enddateEnd", "auditprj.name","createdateEnd", "createdateStart",
				  "auditprj.createdateEnd", "auditprj.createdateStart", "auditprj.enddateEnd", "auditprj.enddateStart");
	}
	@Before(value = { PrjEndDateValidator.class })
	public void endprj(){
		renderJsonResult(getModel().update());
	}
	/*public void status()
	{

		renderJsonResult(getModel().updateAndModifyDate());

	}*/

	@Before(value = { PrjAddValidator.class })
	public void add()
	{
		Integer id=	((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId();
		Prj  prj=(Prj)getModel();
		prj.set("prjManager",id);
		renderJsonResult(prj.saveAndCreateDate());

	}

	@Before(value = { PrjEditValidator.class })
	public void edit()
	{
		renderJsonResult(getModel().update())  ;

	}

	public void delete()
	{
		renderJsonResult(Prj.dao.deleteByPrjId(getPara("id")));
	}

}
