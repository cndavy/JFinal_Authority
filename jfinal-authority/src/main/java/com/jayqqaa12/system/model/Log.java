package com.jayqqaa12.system.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.jayqqaa12.common.Consts;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jayqqaa12.jbase.util.IpUtil;
import com.jayqqaa12.model.easyui.DataGrid;
import com.jayqqaa12.model.easyui.Form;
import com.jfinal.core.Controller;
import com.jfinal.ext.plugin.tablebind.TableBind;

import com.jayqqaa12.model.*;

@TableBind(tableName = "system_log")
public class Log extends EasyuiModel<Log>
{
	private static final long serialVersionUID = -128801010211787215L;

	public static Log dao = new Log();
	public static final int EVENT_VISIT = 1;
	public static final int EVENT_LOGIN = 2;
	public static final int EVENT_ADD = 3;
	public static final int EVENT_UPDATE = 4;
	public static final int EVENT_DELETE = 5;
	public static final int EVENT_GRANT = 6;
	
	public List<Log> list(Form f)
	{
		return super.list(sql("system.log.list"), f);
	}

	@Override
	public DataGrid listByDataGrid(DataGrid dg, Form f)
	{
		return super.listByDataGrid(sql("system.log.list"), dg, f);
	}

	public void insert(Controller con, int operation)
	{

		String ip = IpUtil.getIp(con.getRequest());
		String from = con.getRequest().getHeader("Referer");
		User user = ShiroExt.getSessionAttr(Consts.SESSION_USER);
		Log event = new Log().set("ip", ip).set("from", from);
		if (user != null) event.set("uid", user.getId());

		event.set("operation", operation).saveAndDate();

	}

	public Chart getVisitCount()
	{
		Chart chart = new Chart();
		List<Long> series = new ArrayList<Long>();

		List<Log> date = dao.find(sql("system.log.getVisitCount"));
		for (Log event : date)
		{
			chart.categories.add(event.getDate());
			series.add(event.getCount());
		}
		Collections.reverse(chart.categories);
		Collections.reverse(series);
		chart.setSeriesDate("登录用户", series);

		return chart;

	}

	public Chart chart(Form f)
	{
		boolean flag = false;
		if (f.getFromParm("operation") == null) flag = true;

		if (flag) f.setFromParm("operation", "1");
		List<Log> date = dao.find(sql("system.log.chart") + f.getWhereGroupDate());
		if (flag) f.setFromParm("operation", "2");
		List<Log> date2 = dao.find(sql("system.log.chart") + f.getWhereGroupDate());

		Chart chart = new Chart();
		
		List<Long> series = new ArrayList<Long>();
		List<Long> series2 = new ArrayList<Long>();

		for (Log event : date)
		{
			chart.categories.add(event.getDate());
			series.add(event.getCount());
		}

		for (Log event : date2)
		{
			chart.categories.add(event.getDate());
			series2.add(event.getCount());
		}
		Collections.reverse(chart.categories);
		Collections.reverse(series);
		Collections.reverse(series2);

		chart.setSeriesDate("访问用户", series);
		chart.setSeriesDate("登录用户", series2);
		 
		if(!flag&&f.getFromParm("operation").equals("1")) chart.series.remove(1);
		else if(!flag) chart.series.remove(0);
		

		return chart;
	}

	

}
