package com.ccb.project.validator;

import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jfinal.core.Controller;

/**
 * Created by han on 2015/9/6.
 */
public class AuditItemAddValidator extends Validator {
    @Override
    protected void validate(Controller c) {
        validateRequired("auditItem.ItemTitle","msg","没有标题");
        validateRequired("auditItem.ItemFieldLists","msg","标题列表不能为空");
        validateRequired("auditItem.createdate","msg","事项开始日期不能为空");
        validateRequired("auditItem.enddate","msg","事项结束日期不能为空");
        validateRequired("ItemWriter","msg","事项参与人不能为空");
        validateString("auditItem.ItemTitle", 1, 600, "标题不能超过600个字符");
        validateString("auditItem.ItemFieldLists", 1, 600, "标题列表不能超过600个字符");
        validateString("auditItem.ItemDesc", 0, 10000, "事项简介字符不能为空 或者太多了");
    }
}
