package com.ccb.project.controller;

import com.ccb.project.model.AuditItem;
import com.ccb.project.model.AuditItemList;
import com.ccb.project.validator.AuditItemAddValidator;
import com.ccb.project.validator.AuditItemEditValidator;
import com.ccb.project.vo.SerialRecord;
import com.jayqqaa12.common.Consts;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.EasyuiController;
import com.jayqqaa12.model.easyui.Form;
import com.jayqqaa12.system.model.User;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@ControllerBind(controllerKey = "/auditItem", viewPath = UrlConfig.AUTDITITEM)
public class AuditItemController extends EasyuiController<AuditItem>
{
  public void getToDo(){

	  Integer id = ((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId();
	  renderJson(AuditItemList.dao.getToDo(id));
  }

	public void list()
	{
		renderJson(AuditItem.dao.listByDataGrid(
				AuditItem.dao.sql("auditItem.list.listItem"), getDataGrid(),getFrom(null)));
	}


	public Form getFrom(String tableName)
	{

		return Form.getForm(tableName, this,
				"system_user.id","u.id", "enddateStart", "enddateEnd", "a.ItemTitle",
				"createdateEnd", "createdateStart","auditItem.ItemWriter");
	}



@Before(value = {Tx.class,AuditItemAddValidator.class })

	public void add()
	{  try {
		Integer id = ((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId();
		AuditItem item = (AuditItem) getModel();

		item.set("ItemCreaterId", id);

		renderJsonResult(item.createNewItem());
	   } catch (Exception e){
		renderText("{\"msg\":\"保存事项失败!   " + e.getMessage() + "\" }");;
	}


	}

	@Before(value = {Tx.class,AuditItemEditValidator.class })
	public void edit()
	{
		renderJsonResult(getModel().update())  ;

	}
	@Before(Tx.class)
	public void delete() throws Exception
	{

		 renderJsonResult(AuditItem.dao.deleteCasById(getParaToInt("id")));
	}
	public void getPerson(){
		renderJson(AuditItem.dao.getPerson());
	}
	@Before(Tx.class)
	public void itemWriter(){
		Integer pid=getParaToInt("auditItem.id");
		AuditItemList.dao.FilterItem(getParaMap(),pid);
		renderJsonResult(true);
			//render("itemWriter.html");
	}
	public void itemWriterExport() throws UnsupportedEncodingException {
		List<AuditItemList> result=AuditItemList.dao.itemWriteExport(getParaToInt("id"));
		String[]ItemFieldLists=("#_填表人_#|" +getPara("ItemFieldLists")).split("\\|");
		List<Record> export=new ArrayList<>();
		Record record=null;
		Integer id=null;
		for (AuditItemList a:result){

			if (record==null||id==null ||!a.get("ItemRelaPersId").equals(id)){
				record=new SerialRecord();
			//	record.setColumns(new LinkedHashMap<String, Object>());

				record.set("#_填表人_#",a.get("des"));
				id=a.get("ItemRelaPersId") ;
				export.add(record);
			}
			if (a.get("ItemContents")==null){
				record.set(a.get("serialId"), "");
			} else {
				record.set(a.get("serialId"),a.get("ItemContents"));
			}


		}
       String filename=new String((getPara("title")).getBytes("utf-8"),"ISO-8859-1")+"_.xls";

		renderExcel(export, filename, ItemFieldLists);


	}
	public void 	GetItems( ){
		Integer pid=getParaToInt("id");
		List <AuditItem> a=	AuditItem.dao.getColumns(pid);
		renderJson(a);
		//render("itemWriter.html");
	}
	public void 	GetItemsToDo( ){
		Integer pid=getParaToInt("ItemId");
		List <AuditItem> a=	AuditItem.dao.getColumns(pid);
		renderJson(a);
		//render("itemWriter.html");
	}
}
