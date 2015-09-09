package com.ccb.project.vo;

import com.jfinal.plugin.activerecord.Record;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by han on 2015/9/6.
 */
public class SerialRecord extends Record {
    private Map<String, Object> columns;



    @Override
    public Map<String, Object> getColumns() {
        if (this.columns == null) {
           columns=new LinkedHashMap<>();
        }
        return columns;
    }
}
