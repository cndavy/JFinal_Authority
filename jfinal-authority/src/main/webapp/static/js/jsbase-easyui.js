




function alertSelf(myid,id){
	
	if(myid==id){
		
	parent.$.messager.show({
		title : '提示',
		msg : '不可以操作自己！'
	});
    return false;	
	}
	else return true;
	
}





	/***
	 * 主要作用 就是 用于 obj.xxx 的name的自动装配
	 * @param fm
	 * @param node
	 */
function loadFrom(fm,node){
		
		var obj ={};
		var data =$.evalJSON($.toJSON(node));
		var name='';
		var namespace='';
		
		var map=  new Map();
// $(fm).children().find('input,select').
		 $(fm+' input,select').each(function(){
		        name=$(this).attr('name'); 
		    if(name){
		    	namespace= name.split('.')[1];
		        if(namespace) map.put(namespace,name);
		   }
		 });
		
		for( d in data){
			
			obj[map.get(d)]= data[d];
		}
		
		$(fm).form('load',obj);
		
}


















/**
 * @author 12
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展validatebox，添加验证验证文件格式
 */
$.extend($.fn.validatebox.defaults.rules, {
	fileType : {
	validator : function(value,param) {
	    return value.indexOf(param[0].toLocaleUpperCase())!=-1|| value.indexOf(param[0].toLocaleLowerCase())!=-1;
       },
	message : '文件格式不对！'
	},
    minLength : { // 判断最小长度
        validator : function(value, param) {
            return value.length >= param[0];
        },
        message : '最少输入 {0} 个字符。'
    },
    length:{validator:function(value,param){
        var len=$.trim(value).length;
            return len>=param[0]&&len<=param[1];
        },
            message:"输入内容长度必须介于{0}和{1}之间."
        },
    phone : {// 验证电话号码
        validator : function(value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message : '格式不正确,请使用下面格式:020-88888888'
    },
    mobile : {// 验证手机号码
        validator : function(value) {
            return /^(13|15|18)\d{9}$/i.test(value);
        },
        message : '手机号码格式不正确'
    },
    idcard : {// 验证身份证
        validator : function(value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message : '身份证号码格式不正确'
    },
    intOrFloat : {// 验证整数或小数
        validator : function(value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message : '请输入数字，并确保格式正确'
    },
    currency : {// 验证货币
        validator : function(value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message : '货币格式不正确'
    },
    qq : {// 验证QQ,从10000开始
        validator : function(value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message : 'QQ号码格式不正确'
    },
    integer : {// 验证整数
        validator : function(value) {
            return /^[+]?[1-9]+\d*$/i.test(value);
        },
        message : '请输入整数'
    },
    chinese : {// 验证中文
        validator : function(value) {
            return /^[\u0391-\uFFE5]+$/i.test(value);
        },
        message : '请输入中文'
    },
    english : {// 验证英语
        validator : function(value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message : '请输入英文'
    },
    unnormal : {// 验证是否包含空格和非法字符
        validator : function(value) {
            return /.+/i.test(value);
        },
        message : '输入值不能为空和包含其他非法字符'
    },
    username : {// 验证用户名
        validator : function(value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno : {// 验证传真
        validator : function(value) {
//            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message : '传真号码不正确'
    },
    zip : {// 验证邮政编码
        validator : function(value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message : '邮政编码格式不正确'
    },
    ip : {// 验证IP地址
        validator : function(value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message : 'IP地址格式不正确'
    },
    name : {// 验证姓名，可以是中文或英文
            validator : function(value) {
                return /^[\u0391-\uFFE5]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
            },
            message : '请输入姓名'
    },
    carNo:{
        validator : function(value){
            return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value); 
        },
        message : '车牌号码无效（例：粤J12350）'
    },
    carenergin:{
        validator : function(value){
            return /^[a-zA-Z0-9]{16}$/.test(value); 
        },
        message : '发动机型号无效(例：FG6H012345654584)'
    },
    msn:{
        validator : function(value){
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value); 
    },
    message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    same:{
        validator : function(value, param){
            if($("#"+param[0]).val() != "" && value != ""){
                return $("#"+param[0]).val() == value; 
            }else{
                return true;
            }
        },
        message : '两次输入的密码不一致！'    
    }
});




/***
 * easyui datebox  扩展 自定义 日期格式 
 * 
 * @param date
 * @return
 */
function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

/***
 * easyui datebox  扩展 自定义 日期格式 解析
 * 
 * @param date
 * @return
 */

function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}



/***
 * 判断后缀名 
 * @param value
 * @param param
 * @return
 */
function endsWith(value,param){
	
	if( value.indexOf(param.toLocaleUpperCase())==-1&& value.indexOf(param.toLocaleLowerCase())==-1){
		
		$.messager.alert('提示',' 文件不能为空 且必需为 '+param+'格式');
		
		return false;
	}
	 return true;
	
}


function tgredo(tg) {
	var node = tg.treegrid('getSelected');
	if (node) {
		tg.treegrid('expandAll', node.id);
	} else {
		tg.treegrid('expandAll');
	}
}

function tgundo(tg) {
	var node = tg.treegrid('getSelected');
	if (node) {
		tg.treegrid('collapseAll', node.id);
	} else {
		tg.treegrid('collapseAll');
	}
}



/***
 * 快捷方式而已
 * @param id
 * @param title
 */
function showDialog(id,title){
   //  $("").layout("fullScreen");

	 $(id).show().dialog('open').dialog('setTitle',title);	
}












