package com.ccb.project.model;

import com.jayqqaa12.common.Consts;
import com.jayqqaa12.jbase.jfinal.ext.ListUtil;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.model.Db;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jayqqaa12.system.model.User;
import com.jfinal.ext.plugin.tablebind.TableBind;

import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by han on 2015/8/14.
 */
@TableBind(tableName = "audititem")
public class AuditItem extends EasyuiModel<AuditItem> {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
    private static final long serialVersionUID = 3706516534681611550L;

    public static AuditItem dao = new AuditItem();

    public List<User> getPerson(){
        List<User> list = User.dao.find(sql("auditItem.list.getPerson"));

        return list;

    }

    public List getColumns(int pid) {
       String sql= sql("auditItem.list.getColumns");
        Integer uid=	((User) ShiroExt.getSessionAttr(Consts.SESSION_USER)).getId();
        AuditItem a=  dao.findFirstByWhere(" where id=?", pid);
        Integer createrId=a.get("ItemCreaterId");
        String personIds="";
        if (uid.equals(createrId)){
            //事项创建人 ,权限能看到全部事项
            personIds=a.get("ItemWriter");
        }else {//只能看到自己的事项
            personIds=String.valueOf(uid);
        }


        String []listFields=((String)a.get("ItemFieldLists")).split("\\|");
      //  ListUtil.inStringTrans(personIds);
      sql=  Pattern.compile("(##)").matcher(sql("auditItem.list.selectByItemIdAndPersId")).replaceAll(ListUtil.inStringTrans(personIds));
        List <AuditItemList> selectList=    AuditItemList.dao.find( sql, pid ) ;

        List result=new LinkedList<>();
        for (AuditItemList item :selectList )
         for (String s :listFields)
        {
              if (s.equals(item.get("serialId"))){//find 字段
                result.add (item);
            }
        }


      return result;

    }
    private  Object[][] getParas(String ItemWriters,  List <AuditItemList> selectList){
        return null;
    }


    public boolean createNewItem() {
        this.save();
        Integer itemId=this.getId();
        String []listFields=((String)this.get("ItemFieldLists")).split("\\|");
       String [] perIds=null;
         perIds=this.get("ItemWriter").toString().split(",");
        for (String serialId :listFields)
          for(String perId:perIds)  {
                AuditItemList a=new AuditItemList();
                a.set("ItemId",itemId);
                a.set("ItemRelaPersId",perId);
                a.set("serialId",serialId);
                a.set("ItemContents","");
                a.save();
            }
        return true;
    }

    public boolean deleteCasById(Integer id) {


            String sql = sql("auditItem.list.deleteItemListByItemId");
            Db.update(sql, id);
            this.deleteById(id);
            return true;

    }
}


