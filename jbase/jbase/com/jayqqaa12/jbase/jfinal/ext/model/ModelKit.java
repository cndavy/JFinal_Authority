package com.jayqqaa12.jbase.jfinal.ext.model;

import java.util.List;


/**
 * 
 * model 辅助工具类
 * @author 12
 *
 */
public class ModelKit
{

	
	/**
	 * 从 list 里面 找到 id 相同的
	 * 
	 * @param listKey
	 * @param idKey
	 * @param list
	 * @return
	 */
	public static Model getValue(String listKey,Object idKey ,List<? extends Model> list){
		
		for(Model m :list){
			
			if(m.get(listKey).equals(idKey))return m;
			
		}

		
		return null;
		
	}
	
	

}
