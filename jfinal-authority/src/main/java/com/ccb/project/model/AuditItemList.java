package com.ccb.project.model;

import com.jayqqaa12.jbase.jfinal.ext.model.Db;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jfinal.ext.plugin.tablebind.TableBind;
import org.apache.commons.lang.StringEscapeUtils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by han on 2015/8/14.
 */
@TableBind(tableName = "audititemlist")
public class AuditItemList extends EasyuiModel<AuditItemList> {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
    private static final long serialVersionUID = 3706516534681611550L;

    public static AuditItemList dao = new AuditItemList();


    public void FilterItem(Map<String, String[]> paraMap,Integer itemId) {
        Map <String,AuditItemList>perMap=new HashMap<String,AuditItemList>();

        for (String key:paraMap.keySet()){
            if(key.split("_").length>1){

                String personId=key.split("_")[1];

                String []itemName=null;
                String []itemContent=null;
                if (key.split("_")[0].equals("item.itemName")){
                    itemName=paraMap.get(key);

                    for (int x=0;x<itemName.length;x++){
                        AuditItemList cell=new AuditItemList();
                        cell.set("ItemRelaPersId",personId);
                        cell.set("ItemId",itemId);
                        itemName[x]=  StringEscapeUtils.unescapeHtml(itemName[x]);
                        cell.set("serialId",itemName[x]);
                        cell.set("serialNum",x);

                        perMap.put(personId+","+x,cell);
                    }
                }
                if (key.split("_")[0].equals("item.itemContent")){
                    itemContent=paraMap.get(key);
                    for (int y=0;y<itemContent.length;y++){
                    perMap.get(personId+","+y).set("ItemContents",itemContent[y]);
                }


                }

            }
        }
        for (AuditItemList c :perMap.values()){
            AuditItemList.dao.deleteByMultId(c);
            c.save();
        }
    }

    private void deleteByMultId(AuditItemList cell) {
    String sql=sql("auditItem.list.deleteByItemIdAndPersIdAndSerialNum");
        //cell.delete();
       Object[]ss= new Object[]{cell.get("ItemId").toString(),cell.get("ItemRelaPersId").toString(),
               cell.get("serialNum").toString()};

        Db.batch(sql,new Object[][]{ss},1);

    }

    public List<AuditItemList> itemWriteExport(Integer id) {
        String sql=sql("auditItem.list.selectAuditListByItemId");
        return dao.find(sql,id);

    }

    public List<AuditItemList> getToDo(Integer id) {
        String date=  sdf.format( Calendar.getInstance().getTime());
        String sql=sql("auditItem.todo.getToDO");
        return dao.find(sql,id,date);
    }
}
