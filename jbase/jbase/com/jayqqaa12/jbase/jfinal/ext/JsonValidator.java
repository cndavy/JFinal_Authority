package com.jayqqaa12.jbase.jfinal.ext;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jayqqaa12.model.json.SendJson;
import com.jfinal.core.Controller;

public class JsonValidator extends Validator
{
	
	
	
	protected void addError(int code )
	{
		super.addError("code", code+"");
		
	}
	
	
	
	
	
	
	@Override
	protected void handleError(Controller c)
	{
		c.renderJson(new SendJson(Integer.parseInt((String)c.getAttr("code"))) .toJson());
		
	}

}
