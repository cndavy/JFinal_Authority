package com.jayqqaa12.jbase.jfinal.ext.xss;


import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

/**
 * 对HttpServletRequestWrapper重写，为了统一XSS处理 
 * @date 2014-5-5 上午9:10:18
 */
public class HttpServletRequestWrapper extends javax.servlet.http.HttpServletRequestWrapper{

	public HttpServletRequestWrapper(HttpServletRequest request) {
		super(request);
	}
	/**
	 * 重写并过滤getParameter方法
	 */
	@Override
	public String getParameter(String name) {
	  {
				if(isDes(name))
					return  (super.getParameter(name));
		         else return  HtmlFilter.getBasicHtmlandimage(super.getParameter(name));
		}
	}
	
	/**
	 * 重写并过滤getParameterValues方法
	 */
	@Override
	public String[] getParameterValues(String name) {
		String[] values = super.getParameterValues(name);
		if (null == values){
			return null;
		}
		String[] newValues  = new String[values.length];
		for (int i = 0; i < values.length; i++) {
			if (isDes(name)){
				newValues[i] = (values[i]);
			}
			 else newValues[i] = HtmlFilter.getBasicHtmlandimage(values[i]);

		}
		return newValues;
	}

	private boolean isDes(String name) {
		if (name!=null && name.length()>3)
	    	return  name.substring(name.length()-3,name.length()).equals("des");
		else return false;
	}

	/**
	 * 重写并过滤getParameterMap方法
	 */
	@Override
	public Map<String, String[]> getParameterMap() {
		
		Map<String, String[]> temp = new HashMap<String, String[]>();
		Map<String, String[]> paraMap = super.getParameterMap();
		// 对于paraMap为空的直接return
		if (null == paraMap || paraMap.isEmpty()) {
			return paraMap;
		}
		
		Iterator<Entry<String, String[]>> iter= paraMap.entrySet().iterator();
		while (iter.hasNext()) {
			Entry<String, String[]> entry = iter.next();
			String key = entry.getKey();
			String[] values     = entry.getValue();
			if (null == values) {
				continue;
			}
			String[] newValues  = new String[values.length];
			for (int i = 0; i < values.length; i++) {
				if (isDes(key)){
					newValues[i] = (values[i]);
				}
				else newValues[i] = HtmlFilter.getBasicHtmlandimage(values[i]);
			}
			temp.put(key, newValues);
		}
		
		return temp;
	}
}
