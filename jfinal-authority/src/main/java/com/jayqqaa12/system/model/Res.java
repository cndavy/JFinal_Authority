package com.jayqqaa12.system.model;

import com.jayqqaa12.jbase.jfinal.ext.ListUtil;
import com.jayqqaa12.jbase.jfinal.ext.ShiroExt;
import com.jayqqaa12.jbase.jfinal.ext.model.EasyuiModel;
import com.jayqqaa12.model.easyui.Tree;
import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@TableBind(tableName = "system_res")
public class Res extends EasyuiModel<Res>
{
	private static final long serialVersionUID = 9204284399513186930L;

	public static Res dao = new Res();

	/**
	 * type define
	 */
	public static int TYPE_MEUE = 1;
	public static final int TYPE_PERMISSION = 2;

	/**
	 * 转化为 easyui Tree 对象
	 * 
	 * @param type
	 * 
	 * @return
	 */
	public List<Tree> getTree(Integer pid, int type,Integer passId)
	{
		// 根据用户角色来获取 列表
		List<Tree> trees = new ArrayList<Tree>();

		for (Res res : getChild(pid, type))
		{

			if(res.getId().equals(passId)) continue;
			
			Tree tree = new Tree(res.getId(), res.getPid(), res.getName(), res.getIconCls(), res, false);
			tree.children = getTree(res.getId(), type,passId);
			if (tree.children.size() > 0) tree.changeState();
			

			trees.add(tree);
		}

		return trees;
	}

	public List<String> getUrls()
	{
		return dao.getAttr(sql("system.res.getUrls"), "url");
	}

	public List<Res> getChild(Integer id, Integer type)
	{
		ShiroExt ext = new ShiroExt();
		List<Res> list = null;
		
		if(type==null) return dao.list("where pid =?",id);
		else if (id == null&&type == TYPE_MEUE) list = dao.listOrderBySeq(" where  pid is null and type =? ", type);
		else if (id==null&& type == TYPE_PERMISSION) list = dao.listOrderBySeq("where pid is null");
		else if (type == TYPE_MEUE) list = dao.listOrderBySeq(" where  pid =? and type =? ", id, type);
		else if (type == TYPE_PERMISSION) list = dao.listOrderBySeq(" where  pid =?  ", id);

		
//		L.i(" child id ="+id +"list ="+list);
		
		if (id == null) return list;
		else if (TYPE_PERMISSION == type) return list;
		else
		{
			ListIterator<Res> itor = list.listIterator();
			while (itor.hasNext())
			{
				Res r = itor.next();
				if (r.getStr("url") == null) continue;
				if (!ext.hasPermission(r.getStr("url"))) {
//					L.i("remove "+r.getStr("url"));
					itor.remove();
					
				}
			}
		}
		

		return list;
	}

	/***
	 * 通过 role id 获得 res
	 * 
	 * @param id
	 * @return
	 */
	public List<Res> getRes(int id)
	{
		return dao.find(sql("system.res.getRes"), id);

	}

	public boolean batchAdd(int roleId, String resIds)
	{
		Object[][] params = ListUtil.stringToArray(roleId, resIds);

		Db.batch("insert into system_role_res(role_id,res_id)  values(?,?)", params, params.length);

		return true;
	}




}
