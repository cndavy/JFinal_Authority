package com.ccb.project.validator;

import com.ccb.project.model.AuditItem;
import com.jayqqaa12.common.Consts;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.Validator;
import com.jayqqaa12.system.model.User;
import com.jfinal.core.Controller;

/**
 * Created by han on 2015/9/6.
 */
public class AuditItemOwnerValidator extends Validator {
    @Override
    protected void validate(Controller c) {
        Integer id = ((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId();

        String itemId=       c.getPara("auditItem.id") ;
        if(itemId==null)
            itemId=       c.getPara("id");
        if(itemId==null )
            addError("msg","数据错误");
       AuditItem a= AuditItem.dao.findFirst("select * from auditItem where id=? ",itemId);

    if (id>1 && (a==null ||
            ((Integer)a.get("ItemCreaterId")).longValue()!=(id.longValue() ))){
        addError("msg", "不是创建人");

    }
    }
}
