package com.jfinal.ext.plugin.sqlinxml;

import com.jfinal.ext.kit.JaxbKit;
import com.jfinal.log.Logger;

import java.io.File;
import java.io.FileFilter;
import java.util.HashMap;
import java.util.Map;

public class SqlKit {

    protected static final Logger LOG = Logger.getLogger(SqlKit.class);

    private static Map<String, String> sqlMap;

    public static String sql(String groupNameAndsqlId) {
        if (sqlMap == null) {
            throw new NullPointerException("SqlInXmlPlugin not start");
        }
        String result=sqlMap.get(groupNameAndsqlId);
        if(result==null) {
            init();
            return sqlMap.get(groupNameAndsqlId);
        }
        else return result;

    }

    static void clearSqlMap() {
        sqlMap.clear();
    }

    
    //FIXME 12 SHU MIDIFY
    static void init() {
        sqlMap = new HashMap<String, String>();
        File file = new File(SqlKit.class.getClassLoader().getResource("").getFile());
        File[] files = file.listFiles(new FileFilter() {

            @Override
            public boolean accept(File pathname) {
                if (pathname.getName().endsWith("sql.xml")) {
                    return true;
                }
                return false;
            }
        });
        for (File xmlfile : files) {
            SqlGroup group = JaxbKit.unmarshal(xmlfile, SqlGroup.class);

            String parentName =group.name;
            for(SqlGroup g :group.groups){
            	String name = g.name;
            	
                if (name == null || name.trim().equals("")) {
                    name = xmlfile.getName();
                }
                for (SqlItem sqlItem : g.sqlItems) {
                    sqlMap.put(parentName+"."+name + "." + sqlItem.id, sqlItem.value);
                }
            	
            }
            
        }
        
        LOG.debug("sqlMap" + sqlMap);
    }
}
