package com.jayqqaa12.system.validator;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jfinal.core.Controller;

public class BugValidator extends Validator
{

	@Override
	protected void validate(Controller c)
	{
		validateString("bug.name", 1, 50, "名称不能超过50个字符");
		validateString("bug.des", 0, 10000, "字符不能为空 或者太多了");
		
	}
	
	

}
