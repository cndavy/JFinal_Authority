package com.jayqqaa12.jbase.jfinal.ext.ctrl;

import java.util.List;

import com.jayqqaa12.jbase.jfinal.ext.ctrl.Controller;
import com.jayqqaa12.jbase.jfinal.ext.model.Model;
import com.jayqqaa12.model.json.SendJson;

public class JsonController<T> extends Controller<T>
{

	public void sendJson(String key, List list)
	{

		renderJson(new SendJson(key, list).toJson());
	}

	public void sendJson(int code, SendJson result)
	{
		if (code == 200) renderJson(result.toJson());
		else sendJson(code);
	}

	public void sendJson(SendJson result)
	{
		renderJson(result.toJson());
	}

	public void sendJson()
	{

		renderJson(new SendJson().toJson());
	}

	public void sendJson(int code)
	{

		renderJson(new SendJson(code).toJson());
	}

	public void sendJson(Model m)
	{

		renderJson(new SendJson(m).toJson());
	}

}
