package com.jayqqaa12.jbase.jfinal.ext.ctrl;

import java.util.List;

import com.jayqqaa12.model.easyui.DataGrid;
import com.jayqqaa12.model.easyui.Form;

public class EasyuiController<T> extends Controller<T>
{
	
	public DataGrid<T> getDataGrid()
	{
		DataGrid<T> dg = new DataGrid<T>();
		dg.sortName = getPara("sort", "");
		dg.sortOrder = getPara("order", "");
		dg.page = getParaToInt("page", 1);
		dg.total = getParaToInt("rows", 15);

		return dg;
	}


}
