package com.jayqqaa12.model.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.jayqqaa12.jbase.jfinal.ext.model.Model;
import com.jfinal.plugin.activerecord.Record;

public class SendJson
{
	public int code = 200;

	public Map data = new HashMap();

	public SendJson(Model model)
	{
		if (model != null) this.data = model.getAttrs();

	}

	public SendJson(String key, List list)
	{
		 setData(key, list);
	}

	public SendJson()
	{

	}

	public SendJson(int code)
	{

		this.code = code;
	}

	public String toJson()
	{
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		return gson.toJson(this);
	}

	public void setData(String key, Model m)
	{
		this.data.put(key, m.getAttrs());

	}
	
	

	public void setData(String key, List list)
	{
		if (list == null) return;
		List<Map> attr = new ArrayList<Map>();

		for (Object o : list)
		{
			if (o instanceof Model) attr.add(((Model) o).getAttrs());
			if(o instanceof Record ) attr.add(((Record) o).getColumns());
		}
		data.put(key, attr);

	}

}
