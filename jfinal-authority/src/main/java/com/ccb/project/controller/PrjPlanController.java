package com.ccb.project.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ccb.project.model.Plan;
import com.ccb.project.model.Prj;
import com.ccb.project.vo.calEventItem;
import com.jayqqaa12.common.UrlConfig;
import com.jayqqaa12.jbase.jfinal.ext.ctrl.EasyuiController;
import com.jayqqaa12.jbase.util.DateUtil;
import com.jayqqaa12.model.easyui.DataGrid;
import com.jayqqaa12.model.easyui.Form;
import com.jfinal.ext.route.ControllerBind;
import org.apache.commons.lang.StringEscapeUtils;

import java.text.SimpleDateFormat;
import java.util.*;

@ControllerBind(controllerKey = "/projectPlan", viewPath = UrlConfig.PROJECTPLAN)
public class PrjPlanController extends EasyuiController<Plan>
{
public void sass(){
render("sass.html");
}
	public void search(){
		render("search.html");
	}
	public void idlePerson(){
		render("idlePerson.html");
	}
	public void list()
	{
		renderJson(Plan.dao.list(Plan.dao.sql("project.projectPlan.listPerson"),getFrom(null)));
	}
	public void listPrjAndPersonWithCount()
	{
		renderJson(Plan.dao.listByDataGrid(Plan.dao.sql("project.projectPlan.listPrjAndPersonWithCount"), getDataGrid(),getFrom(null)));

	}
//	listIdleByPerson
public void listIdleByPerson()
{
	DataGrid<Plan> dg=getDataGrid();
	Form f=getFrom(null);
	String bgnDate=f.getFromParm("plan.bgnDateStart");
	String endDate=f.getFromParm("plan.endDateEnd");
	if (bgnDate==null) {
		bgnDate= DateUtil.format(DateUtil.getAfterDate(new Date(),-366));
	}
	if (endDate==null) {
		endDate= DateUtil.getNow();
	}
	List<Plan> list = Plan.dao.find(Plan.dao.sql("project.projectPlan.listIdleByPerson"),bgnDate,bgnDate,endDate,endDate,bgnDate,endDate,bgnDate,endDate);
   Map <String,String>map=new HashMap<String,String>();
    for (Plan p:list){
       String PersonName =p.get("PersonName");
 		String PrjName =p.get("PrjName");
		if (map.get(PersonName)!=null){
			String v=map.get(PersonName);
			v=v+","+PrjName;
			map.put(PersonName,v);
		}else{

			map.put(PersonName,PrjName);
		}
	}
	list=new ArrayList<Plan>();
	for(String key :map.keySet()){
		Plan row=new Plan();
		int count=0;
		String v=map.get(key);
		if (v.length()>0) {
			count = v.split(",").length;
		}
		row.put("PersonName", key);
		row.put("PrjName", v);
		row.put("count", count);
		list.add(row);
	}
	list.sort(new Comparator<Plan>() {
		@Override
		public int compare(Plan o1, Plan o2) {
			 {
				if (dg.sortOrder.equals("asc")) {

					return   o1.get(dg.sortName).toString().compareTo( o2.get(dg.sortName).toString());
				}else
				{

					return   o2.get(dg.sortName).toString().compareTo(  o1.get(dg.sortName).toString());
				}
			}

		}
	});
   dg.setRows(list);
	dg.setTotal(list.size());
    renderJson(dg);
}
	public void listPlanByPerson()
	{
		DataGrid<Plan> dg=getDataGrid();
		renderJson(	Plan.dao.listByDataGrid(Plan.dao.sql("project.projectPlan.listProjectByPerson"),dg,getFrom(null)));
	//	renderJson(Plan.dao.list(Plan.dao.sql("project.projectPlan.listProjectByPerson"),getFrom(null)));
	}
	public void chgperson(){
		String[] insertedList=getParaValues("inserted");
		String[] deletedList=getParaValues("deleted");
		String[] updatedList=getParaValues("updated");
	/*	getModel();
		getDataGrid();
		getPara();*/

			Plan iPlan = new Plan();
		if(insertedList!=null&&insertedList.length>0) {
			JSONArray aA = (JSONArray) JSONArray.parse(StringEscapeUtils.unescapeHtml(insertedList[0]));

			for (int i = 0; i < aA.size(); i++) {
				JSONObject o = (JSONObject) aA.get(i);
				iPlan.clear();
				iPlan.setAttrs(o);
				iPlan.save();
				iPlan.emptyRemove("id");
			}
		}
		if (deletedList!=null&&deletedList.length>0) {
			JSONArray dA = (JSONArray) JSONArray.parse(StringEscapeUtils.unescapeHtml(deletedList[0]));

			for (int i = 0; i < dA.size(); i++) {
				JSONObject o = (JSONObject) dA.get(i);
			//	iPlan.setAttrs(o);
				iPlan.deleteById(o.get("id"));
			//	iPlan.delete();
			}
		}
		if(updatedList!=null&&updatedList.length>0) {
			JSONArray uA = (JSONArray) JSONArray.parse(StringEscapeUtils.unescapeHtml(updatedList[0]));

			for (int i = 0; i < uA.size(); i++) {
				JSONObject o = (JSONObject) uA.get(i);
				iPlan.clear();
                o.remove("des");
				o.remove("name");
				iPlan.setAttrs(o);

				iPlan.update();
			}
		}

		renderJsonResult(true);
	}

//// projectPlan/getPersonInPrjList
	public void getPersonInPrjList(){

		Integer pid=getParaToInt("prjid");
		DataGrid<Plan> dg=	getDataGrid();
		if (pid!=null) {

			renderJson(Plan.dao.getPersonInPrj(pid, dg));
		/*	renderJson(Prj.dao.getPersonInPrjRows(pid, dg));*/
		}
		else {
			//renderJson( Prj.dao.getPersonInPrjRows(1, dg));
			dg.setTotal(0);
			dg.setRows(null);
			renderJson(dg);
		}

	}

	public Form getFrom(String tableName)
	{

		return Form.getForm(tableName, this, "plan.uId",
				"enddateStart", "enddateEnd", "createdateEnd", "createdateStart",
				"plan.bgnDateStart", "plan.bgnDateEnd", "plan.endDateEnd", "plan.endDateStart","auditprj.prjManager");
	}


	public void delete()
	{
		renderJsonResult(Prj.dao.deleteById(getPara("id")));
	}
	VO self;
	 public void GetCalViewData(){
		 String timezone = getPara("timezone") ;
		 String viewtype = getPara("viewtype");
		 String showdate = getPara("showdate");


		 try{
		 SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
		 Date date= dateFormat.parse(showdate);
		 String dateStr = sdf.format(date);
		 date = sdf.parse(dateStr);
		 String jqlist = listCalendar(date, viewtype);
			 // [主键,标题,开始时间,结束时间，是否全天日程，是否跨天日程,是否循环日程,颜色主题,是否有权限,地点,参与人]
	      //  renderJson( "\t{\"events\":[[\"57\",\"ddd\",\"/Date(1435766400000)/\",\"/Date(1438358400000)/\",1,0,0,20,1,\"Location\",\"管理员\"]],\"issort\":true,\"start\":\"\\/Date(1435852800000)\\/\",\"end\":\"\\/Date(1438531200000)\\/\",\"error\":null}") ;

			// renderJson( "{\"IsSuccess\":true,\"events\":[[\"57\",\"ddd\",\"/Date(1435852800000)/\",\"/Date(1435852800000)/\",1,0,0,20,1,\"Location\",\"man\"]],\"issort\":true,\"start\":\"\\/Date(1435852800000)\\/\",\"end\":\"\\/Date(1438531200000)\\/\",\"error\":null}") ;
            System.out.println(jqlist);
			  renderJson(jqlist);
	    } catch (Exception err) {
        	err.printStackTrace();
			 renderJsonResult(false);
        }


	 }
	////快速添加日程Post Url 地址
	public void QuickAddCal(){
		String	start=getPara("start");
	}

	public void QuickUpdateCal(){
		String	start=getPara("start");
	}
	//快速删除日程的
	public void QuickDeleteCal(){
		String	start=getPara("start");
	}

	public void EditCalendar(){
		String	start=getPara("start");
		String end=getPara("end");
		String isallday=getPara("isallday");
		String title=getPara("title");
		String num =getPara("_");
	}
	public void ViewCalendar (){
		//getParaToInt(0);
		String id=getPara();
		String	start=getPara("start");
		String	last=getPara("_");
        List <Plan>list= Plan.dao.find(Plan.dao.sql("project.projectPlan.selectDetailByPlanId"),id);
       // renderJson(list);
		StringBuilder str =new StringBuilder();
		for (Plan p :list){
			str.append("<tr>");
		    	str.append("<td>");
			    str.append(p.get("bgnDate").toString());
			    str.append("</td>");
					str.append("<td>");
					str.append(p.get("endDate").toString());
					str.append("</td>");
			str.append("</tr>");
		}

		renderHtml("<table class='easyui-datagrid'>" +"<tr><th>开始日期</th><th>结束日期</th></tr>" +
				str.toString()+
				"</table>");
		//forwardAction("search?id="+id);
	}
	private class VO  {
		public String getStart_day() {
			return start_day;
		}

		public void setStart_day(String start_day) {
			this.start_day = start_day;
		}

		public String getEnd_day() {
			return end_day;
		}

		public void setEnd_day(String end_day) {
			this.end_day = end_day;
		}

		public String start_day;
		public  String end_day;
}

	public String listCalendar(Date time, String type)
	{
		Date st = null;//开始时间
		Date et = null;//结束时间
		if("month".equals(type)){
			Calendar cal = Calendar.getInstance();
			cal.setTime(time);//开始计算该时间所在周的时间范围
			st = time;
			//1个月后
			cal.add(Calendar.MONTH,1); //将当前日期加一个月
			et = cal.getTime();
		}else if("week".equals(type)){
			Calendar cal = Calendar.getInstance();
			cal.setTime(time);//开始计算该时间所在周的时间范围
			//判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
			int dayWeek = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
			if(1 == dayWeek) {
				cal.add(Calendar.DAY_OF_MONTH, -1);
			}
			cal.setFirstDayOfWeek(Calendar.MONDAY);//设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
			int day = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
			cal.add(Calendar.DATE, cal.getFirstDayOfWeek()-day);//根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
			st= cal.getTime();//周一时间,开始时间
			cal.add(Calendar.DATE, 6); //周一日期再加6就是周日
			et = cal.getTime();//结束时间
		}else if("day".equals(type)){
			Calendar cal = Calendar.getInstance();
			cal.setTime(time);//开始计算该时间所在周的时间范围
			st = time;
			cal.add(Calendar.DAY_OF_MONTH, -1);//日期前 一天
			st = cal.getTime();
			cal.add(Calendar.DAY_OF_MONTH, 2);//日期后一天
			et = cal.getTime();
		}
		return listCalendarByRange(st, et);
	}

	/**
	 * 输出json
	 * @param st
	 * @param et
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String listCalendarByRange(Date st, Date et)
	{

		StringBuilder jsonstr = new StringBuilder();
		String exstring = null;
		try
		{
			//数据格式说明：
//         2：参数中eventItems的数据结构：
//         eventItems本身是个数组，数组的项本身又是个数组，结构如下所示
//         [主键,标题,开始时间,结束时间，是否全天日程，是否跨天日程,是否循环日程,颜色主题,是否有权限,地点,参与人]
//         对应的数据类型
//         [String,String,Date,Date,1/0,1/0,1/0,0-21,0/1,String,String]
//         3:异步请求中的数据结构["35","你好开发哈萨克合法可是","2014-03-10 00:00","2014-03-10 00:00",1,0,0,null,1,null,""]
//         {"events":[],"issort":true,"start":"\/Date(1261353600000)\/","end":"\/Date(1261958399000)\/","error":null}
//         events的结构同2中eventItems的结果，issort是否已在服务端排序（建议在服务端做好排序），接着start和end是本次请求的开始时间和结束时间，error是业务异常对象
//         可在服务端生成，结构为：{ErrorCode:””,ErrorMsg:””} 可在onRequestDataError中捕获，并做友好的提示。

			//List<Jqcalendar> calendarlist = JqcalendarDao.QueryRecordsByOriginal(" from Jqcalendar calendar where calendar.startTime between ? and ? ", new Object[]{st,et});
			List<calEventItem> calendarlist = Plan.dao.getEventItem( st,  et); //findAll();
		/*	List<ArrayList> lists = new ArrayList<ArrayList>();//添加几列
			List<String> reclists = new ArrayList<String>();//添加几列
		*/	String ResjsonStr ="";
			StringBuilder rec=new StringBuilder();
			if(calendarlist!=null&&calendarlist.size()>0){
				for (int i = 0; i < calendarlist.size(); i++){
					calEventItem jqcalendar = calendarlist.get(i);

					rec.append("[");
					ArrayList list = new ArrayList();

					rec.append("\"").append(jqcalendar.getId()).append("\"").append(",");

					rec.append("\"").append(jqcalendar.getSubject()).append("\"").append(",");

					SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
		         	rec.append("\"").append("\\/Date("+ String.valueOf(jqcalendar.getStartTime().getTime()) +")\\/")
							.append("\"").append(",");
					rec.append("\"").append("\\/Date("+ String.valueOf(jqcalendar.getEndTime().getTime()) +")\\/")
							.append("\"").append(",");


					rec.append(jqcalendar.getIsAllDayEvent()?1:0).append(",");

					rec.append(1).append(",");

					rec.append(0).append(",");

					rec.append(jqcalendar.getColor()).append(",");

					rec.append(1).append(",");

					rec.append("\"").append(jqcalendar.getLocation()).append("\"").append(",");

					rec.append("\"").append(jqcalendar.getPerson()).append("\"");
					rec.append("]");


					rec.append(",");
				}
			}

			if(calendarlist!=null&&calendarlist.size()>0){

				ResjsonStr=rec.toString();
			 ResjsonStr=ResjsonStr.substring(0,ResjsonStr.length()-1);
			 ResjsonStr="["+ResjsonStr+"]";
			}else{
				ResjsonStr = "[]";
			}
			jsonstr.append("{\"events\":");
			jsonstr.append(ResjsonStr + ",\"issort\":true,");
			SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
			/*jsonstr.append("\"start\":\"" + "\\/Date("+ String.valueOf(st.getTime()) +")\\/" + "\",");
			jsonstr.append("\"end\":\"" +   "\\/Date("+ String.valueOf(et.getTime()) +")\\/" + "\",");
*/
			jsonstr.append("\"start\":\"" + "\\/Date("+ String.valueOf(st.getTime()) +")\\/"
					+ "\",");
			jsonstr.append("\"end\":\"" +   "\\/Date("+ String.valueOf(et.getTime()) +")\\/" + "\",");


			//	jsonstr.append("\"start\":\"" +dateFormat2.format(st) + "\",");
		//	jsonstr.append("\"end\":\"" + dateFormat2.format(et) + "\",");
		}catch (Exception ex) {
			exstring = ex.getMessage();
		}
		//判断是否存在异常
		if (exstring == "" || exstring == null) {
			jsonstr.append("\"error\":null}");
		} else{
			jsonstr.append("\"error\":" + exstring + "}");
		}
		return jsonstr.toString();
	}
}
