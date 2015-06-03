package com.ccb.project.model;

import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jfinal.ext.plugin.tablebind.TableBind;

@TableBind(tableName = "project")
public class Prj extends EasyuiModel<Prj>
{
	private static final long serialVersionUID = -1L;

	public static Prj dao = new Prj();




}
