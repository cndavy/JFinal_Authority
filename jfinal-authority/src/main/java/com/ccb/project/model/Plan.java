package com.ccb.project.model;

import com.ccb.project.vo.calEventItem;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jayqqaa12.model.easyui.DataGrid;
import com.jayqqaa12.model.easyui.Form;
import com.jfinal.ext.plugin.tablebind.TableBind;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by han on 2015/6/29.
 */
@TableBind(tableName = "auditprjplan")
public class Plan extends EasyuiModel<Plan> {
    private static final SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
    private static final long serialVersionUID = 3706516534681611550L;

    public static Plan dao = new Plan();
    public DataGrid<Plan> getPersonInPrj(int pid, DataGrid<Plan>dg){
        StringBuffer sqlstr=new StringBuffer();
        sqlstr.append(sql("project.project.getPersonInPrjList"));
        sqlstr.append(new Form().getWhereAndLimit(dg));
      Long lCount=  Plan.dao.getCount(sqlstr.toString(),pid);
        List<Plan> list	=Plan.dao.find(sqlstr.toString(),pid);


        dg.setRows(list);
        dg.setTotal( lCount.intValue());

        return dg;
    }


    public List<calEventItem> getEventItem(Date startTime, Date endTime) throws ParseException {
        List<calEventItem> resultList = new ArrayList<calEventItem>();
        List<Plan> list	=Plan.dao.find(sql("project.projectPlan.GetCalViewData"),startTime,startTime,endTime,endTime,startTime,endTime,startTime,endTime);
        for (Plan p :list){
           Map <String,Object> attr=  p.getAttrs();
            calEventItem result = new calEventItem();
            result.setId(p.getId().toString());
            result.setSubject("项目:"+getStr(attr.get("PrjName"))+" 人员:"+getStr(attr.get("PersonName"))+"[" +getStr(attr.get("PrjBgnDate"))+","+getStr(attr.get("PrjFuture"))+","+getStr(attr.get("PrjEndDate"))+"]" );
            result.setStartTime(sdf.parse((String) attr.get("bgnDate")));
            result.setEndTime(sdf.parse((String)attr.get("endDate") ));
            result.setPerson((String)attr.get("PersonName") );
           // result.setStartTime(p.ge);
            result.setIsAllDayEvent(true);
            resultList.add(result);
        }

        return resultList;
    }

    private String getStr(Object v){
         if (v==null)return "";
        else return  v.toString();
    }
}
