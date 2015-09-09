package com.ccb.project.vo;

import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;

import java.util.Map;

/**
 * Created by han on 2015/9/6.
 */
public class SerialCaseInsensitiveContainerFactory extends CaseInsensitiveContainerFactory {
    @Override
    public Map<String, Object> getColumnsMap() {
        return super.getColumnsMap();
    }
}
