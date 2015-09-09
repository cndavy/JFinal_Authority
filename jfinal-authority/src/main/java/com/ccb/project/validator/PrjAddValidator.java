package com.ccb.project.validator;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jfinal.core.Controller;

/**
 * Created by han on 2015/5/27.
 */
public class PrjAddValidator extends Validator {


    @Override
    protected void validate(Controller c) {

        validateRequired("prj.name","msg","项目名称不能为空");
        validateRequired("prj.createdate","msg","项目开始日期不能为空");
        validateRequired("prj.planenddate","msg","项目开始日期不能为空");
        validateString("prj.name", 1, 50, "名称不能超过50个字符");
        validateString("prj.des", 0, 10000, "字符不能为空 或者太多了");
    }
}
