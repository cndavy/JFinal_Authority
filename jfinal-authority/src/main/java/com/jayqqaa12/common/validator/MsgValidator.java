package com.jayqqaa12.common.validator;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jfinal.core.Controller;

public class MsgValidator extends Validator
{

	@Override
	protected void validate(Controller c)
	{
		validateString("msg.msg", 1, 500,  "留言不能超过200个字符 并且不能为空");
		
	}


}
