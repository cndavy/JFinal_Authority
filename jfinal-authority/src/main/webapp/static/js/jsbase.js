






/***
 * 把form 表单  转化为 url 参数
 * @param param
 * @param key
 * @return
 */
var parseParam=function(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};




  /***
   * 判断文件后缀名 
   * @param value
   * @param param
   * @return
   */
  function isEnd(value,param){
	
	if( value.indexOf(param.toLocaleUpperCase())==-1&& value.indexOf(param.toLocaleLowerCase())==-1){
		return false;
	}
	 return true;
 }
 
 
  /***
   * 验证是否为空  传递 id 即可 
   * @param param
   * user isEmpty(['name','pwd'])
   * @return
   */
 function isEmpty(param){
  	 
  	 for(var i in param ){
  		 
  		 var val = $('#'+param[i]).val();
  		 
  		 if(val==''||val==undefined)
  		 {
  			 return true;
  		 }
  		 
  	 }
  	 return false;
   }

 
 function trim(str){ //删除左右两端的空格
     return str.replace(/(^\s*)|(\s*$)/g, "");
 }

/**
 * 验证 url
 * @param str_url
 * @return
 */
	function isURL(str){ 
		str = str.match(/http:\/\/.+/); 
		if (str == null){
			return false;
		}else{
			return true; 
		}
	} 


/**
 * 获得 url 里面的参数
 * @param paras
 * @return
 */
function request(paras)
 { 
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
  }
		


/**
 * 打印log 到 console
 * @param msg
 * @return
 */
function log(msg)
{
  console.log(msg);	

}


/***
 * 判断 2个日期的相差的天数
 * @param sDate1
 * @param sDate2
 * @return
 */
function dateDiff(sDate1, sDate2) { // sDate1和sDate2是2004-10-18格式
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) // 转换为10-18-2004格式
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
	return iDays
}


///////////////////////////JQUERY -SETTING  JQEURY EXTENDS//////////////////////////////////

/**
 * 设置 ajax  缓存为 false 并且设置默认 错误提示
 */
 
$.ajaxSetup({ 
    cache: false,  
    error: function (XMLHttpRequest, status, errorThrown) { 
    	$.messager.progress('close');
    	parent.$.messager.progress('close');
    	
    	if(status=='parsererror'&&XMLHttpRequest.responseText.indexOf('login')!=-1)
    		 window.open('jump','_top');
    	else if( typeof(errorThrown) != "undefined" ) 
            $.messager.alert('error', "调用服务器失败<br />" + errorThrown ,'error'); 
        else{ 
            var error = "<b style='color: #f00'>" + XMLHttpRequest.status + "  " + XMLHttpRequest.statusText + "</b>"; 
            var start = XMLHttpRequest.responseText.indexOf("<title>"); 
            var end = XMLHttpRequest.responseText.indexOf("</title>"); 
            if( start > 0 && end > start ) 
                error += "<br /><br />" + XMLHttpRequest.responseText.substring(start + 7, end); 
                $.messager.alert("error", "调用服务器失败<br />" + error ,'error'); 
        } 
    } 
});





/***
 * Jquery 扩展  
 */
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
  
});




/**
 * map 
 * @returns
 */
function Map(){
	this.container = new Object();
	}


	Map.prototype.put = function(key, value){
	this.container[key] = value;
	}


	Map.prototype.get = function(key){
	return this.container[key];
	}


	Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for (var key in this.container) {
	// 跳过object的extend函数
	if (key == 'extend') {
	continue;
	}
	keyset[count] = key;
	count++;
	}
	return keyset;
	}


	Map.prototype.size = function() {
	var count = 0;
	for (var key in this.container) {
	// 跳过object的extend函数
	if (key == 'extend'){
	continue;
	}
	count++;
	}
	return count;
	}


	Map.prototype.remove = function(key) {
	delete this.container[key];
	}


	Map.prototype.toString = function(){
	var str = "";
	for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
	str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
	}
	return str;
}














