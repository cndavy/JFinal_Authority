package com.ccb.project.model;

import com.jayqqaa12.jbase.jfinal.ext.ListUtil;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jayqqaa12.jbase.util.Validate;
import com.jayqqaa12.model.easyui.DataGrid;
import com.jayqqaa12.model.easyui.Form;
import com.jayqqaa12.system.model.User;
import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;

import java.util.List;

@TableBind(tableName = "auditPrj")
public class Prj extends EasyuiModel<Prj>
{
	private static final long serialVersionUID = -1L;

	public static Prj dao = new Prj();

public List<User> getPerson(){
	List<User> list = User.dao.find(sql("project.project.getPerson"));

 	return list;

}
	public DataGrid<Prj> getPersonInPrj(int pid, DataGrid<Prj>dg){
		StringBuffer sqlstr=new StringBuffer();
		sqlstr.append(sql("project.project.getPersonInPrjList"));
		sqlstr.append(new Form().getWhereAndLimit(dg));

		List<Prj> list	=Prj.dao.find(sqlstr.toString(),pid);
        dg.setRows(list);
		dg.setTotal(list.size());
		return dg;
	}
	public  List  getPersonInPrjRows(int pid, DataGrid<Prj>dg){
		String sqlstr=sql("project.project.getPersonInPrjList");
		List<Prj> list	=Prj.dao.find(sqlstr,pid);

		return list;
	}

	public boolean batchGrant(int prjId, String personIds)
	{
		boolean result = Db.deleteById("auditprjplan", "prj_id", prjId);
		if (!Validate.isEmpty(personIds)) result = dao.batchAdd(prjId, personIds);


		return result;
	}
	public boolean batchAdd(int prjId, String personIds)
	{
		Object[][] params = ListUtil.stringToArray(prjId, personIds);

		Db.batch("insert into auditprjplan(role_id,res_id)  values(?,?)", params, params.length);

		return true;
	}

	public boolean deleteByPrjId(String PrjId) {


		List <Plan>  list = (List<Plan>) Plan.dao.list("where PrjId=?", PrjId);
		for (Plan m : list )
		{
			Plan.dao.deleteById(m.getId());

		}
		boolean result=deleteById(PrjId);
		return result;
	}
}
