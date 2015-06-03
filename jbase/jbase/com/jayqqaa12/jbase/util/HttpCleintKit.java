 
package com.jayqqaa12.jbase.util;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

 
/***
 * 模拟消息使用
 * @author 12
 *
 */
public class HttpCleintKit  {
    private static BlockingQueue<Runnable> queue = new LinkedBlockingQueue<Runnable>();
	private static ThreadPoolExecutor executor =  new ThreadPoolExecutor(3, 5, 20,	TimeUnit.SECONDS,queue);;
    
    public static void  execute(final String url , final String [] keys ,final String ...params)
	{
	    executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					httpPost(url,keys,params);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		 });
	}
 
    
    public static void  execute(final String url  )
  	{
  	    executor.execute(new Runnable() {
  			@Override
  			public void run() {
  				try {
  					httpGet(url );
  				} catch (Exception e) {
  					e.printStackTrace();
  				}
  			}
  		 });
  	}
    
    private static String httpGet(String url ) throws Exception 
	{
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet get = new HttpGet(url);
		
        CloseableHttpResponse response2 = httpclient.execute(get);
        String data = null;
        try {
            System.out.println(response2.getStatusLine());
            HttpEntity entity2 = response2.getEntity();
            data = EntityUtils.toString(entity2);
        } finally {
            response2.close();
        }
        
        L.i(data);
		 
         return data;
	}
	
	private static String httpPost(String url,String[] keys, String ... prams) throws Exception 
	{
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
        List <NameValuePair> nvps = new ArrayList <NameValuePair>();
        
        int i=0;
        for(String k:keys){
          nvps.add(new BasicNameValuePair(k,prams[i++]));
        }
        
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));
        CloseableHttpResponse response2 = httpclient.execute(httpPost);
        String data = null;
        try {
            System.out.println(response2.getStatusLine());
            HttpEntity entity2 = response2.getEntity();
            data = EntityUtils.toString(entity2);
        } finally {
            response2.close();
        }
        
        
        L.i(data);
		
         return data;
	}
	
  
}
