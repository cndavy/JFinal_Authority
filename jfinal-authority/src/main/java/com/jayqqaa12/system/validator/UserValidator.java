package com.jayqqaa12.system.validator;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jayqqaa12.jbase.util.Validate;
import com.jayqqaa12.system.model.User;
import com.jfinal.core.Controller;

public class UserValidator extends Validator
{

	@Override
	protected void validate(Controller c)
	{
		super.validate(c);

		if (!isEmpty("repwd")) validateString("user.pwd", 5, 100, "密码不能为空 并且在5 到100个字符");
		else
		{
			validateString("user.name", 1, 20, "名称不能为空 并且不能超过20个字符");
			validateString("user.des", false, 0, 100, "描述不能超过100个字符");
			validateString("user.email", false, 0, 100, "email不能超过100个字符");
			validateEmail("user.email", false);
			if (Validate.isEmpty(c.getPara("user.id")) && User.dao.checkNameExist(c.getPara("user.name"))) addError("用户名已存在");
		}
	}

}
