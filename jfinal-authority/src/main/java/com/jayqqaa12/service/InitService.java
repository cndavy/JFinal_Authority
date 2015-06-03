package com.jayqqaa12.service;

import java.io.File;

import com.jayqqaa12.jbase.util.Fs;
import com.jayqqaa12.jbase.util.L;
import com.jfinal.plugin.activerecord.Db;

public class InitService
{

	public void initDb(String path){
		
		try
		{
			String sql = Fs.readFile(new File(path));
			
			String[] sqls = sql.split(";");
			
			for(String s :sqls ){
				Db.update(s);
				L.i(s);
			}
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}

	}
	
	
	
}
