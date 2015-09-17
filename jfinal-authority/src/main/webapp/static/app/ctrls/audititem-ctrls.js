window.name ="NG_DEFER_BOOTSTRAP!";
var init =false;
var init1 =false;
/**
 * easyui 和 anguarjs 结合有点勉强 
 * 让它先暂停 执行等到 ajax 加载后后再进行初始化NG
 */
var perlist=$('#itemCreaterid').combogrid({
	url : PATH+'/auditItem/getPerson',
	checked:true,
	multiSelected:true,
	textField:'des',
	panelWidth:350,
	idField:'id',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],
	columns:[[
		{field:'id',title:'id',width:60,hidden:true},

		{field:'des',title:'中文名称',width:120}

	]],
	mode: 'remote'
	,onChange:function  (n,o){
		$('#itemCreaterids').attr('value',n.toString()) ;
	}
});
perlist.combogrid('disableTextbox',{stoptype:'readonly',stopArrowFocus:true});
var perlist1=$('#audititemPerson').combogrid({
	url : PATH+'/auditItem/getPerson',
	checked:true,
	multiSelected:true,
	textField:'des',
	panelWidth:350,
	idField:'id',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],
	columns:[[
		{field:'id',title:'id',width:60,hidden:true},

		{field:'des',title:'中文名称',width:120}

	]],
	mode: 'remote'
	,onChange:function  (n,o){
		$('#ItemWriterids').attr('value',n.toString()) ;
	}
});
perlist1.combogrid('disableTextbox',{stoptype:'readonly',stopArrowFocus:true});
$('#dataGrid').datagrid({
	url : PATH+'/auditItem/list',
	fit : true,
	fitColumns : true,
	border : false,
	pagination : true,
	idField : 'id',
	pageSize : 10,
	pageList : [ 10, 20, 30, 40, 50 ],
	sortName : 'createdate',
	sortOrder : 'desc',
	checkOnSelect : false,
	selectOnCheck : false,
	nowrap : false,
	striped : true,
	rownumbers : true,
	singleSelect : true,
	frozenColumns : [ [ {
		field : 'id',
		title : '编号',
		width : 150,
		hidden : true
	}, {
		field : 'ItemTitle',
		title : '事项标题',
		width : 120,
		sortable : true
	},{
		field : 'ItemFieldLists',
		title : '事项标题列表',
		width : 150,
		hidden : true
	} ] ],
	columns : [ [ {
		field : 'createdate',
		title : '开始日期',
		width : 80,
		sortable : true
	}, {
		field : 'enddate',
		title : '结束日期',
		width : 80,
		sortable : true
	}  ,{
		field : 'ItemCreaterName',
		title : '事项发起人',
		width : 100,
		sortable : true

	},{
		field : 'ItemCreaterId',
		title : '事项发起人id',
		width : 100,
		sortable : true,
		hidden:true
	},{
		field : 'ItemWriter',
		title : '事项编写人',
		width : 200,
		sortable : true,
		formatter: unitformatter
	},{
		field : 'ItemDesc',
		title : 'ItemDesc',
		width : 150,
		hidden : true
	}
		,{
		field : 'action',
		title : '操作',
		width : 120,
		 formatter : formatterFunItemManage

	} ] ],
	 toolbar : '#toolbar',
	onLoadSuccess : function() {
		parent.$.messager.progress('close');
		$('#searchForm table').show();
        $('#fm table').show();
		$('#fm table').css("display","null")
		$(this).datagrid('tooltip');
		$(this).datagrid('resize');
		 if(!init){
			angular.resumeBootstrap();
			 init=true
		}

	},
	onRowContextMenu : function(e, rowIndex, rowData) {
		e.preventDefault();
		$(this).datagrid('unselectAll');
		$(this).datagrid('selectRow', rowIndex);
		$('#menu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
	}

});
var editRow = undefined;
function unitformatter(value, rowData, rowIndex) {
	if (value == 0) {
		return;
	}
	var arr=new Array();
	arr=value.split(",");
	var data=perlist.combogrid("grid").datagrid("getData").rows;
	var result='';
	for (var j=0;j<arr.length;j++){
		for (var i = 0; i < data.length; i++) {
			if (data[i].id == arr[j]) {
				result=result+","+ data[i].des;
			}
		}
	}
	return result.substring(1,result.length);

}
function endEdit(data){
	pergrd.datagrid("getRows");
	for (var i =0;i<row.length;i++){
		pergrd.datagrid("endEdit",i);
	}
}



var	rainGrid = $("#tbl_itemWriter");

MainApp.controller('ItemManageCtrls', [ '$scope', function($scope) {
$scope.load=function(){
	$scope.createNote();
	$scope.createReadOnlyNote();
	$scope.createDetailNote();

	$.extend($.fn.validatebox.defaults.rules,{
		TimeCheck:{
			validator:function(value,param){
				var s = $("input[name='"+param[0]+"']").val();
				//因为日期是统一格式的所以可以直接比较字符串 否则需要Date.parse(_date)转换
				return value>=s;
			},
			message:'非法数据'
		}
	});

};
$scope.personOk=function(id){
	$('#personselectGrid').datagrid('reload');
}
$scope.personFun=function(id){
 //alert("personFun" + id);
	if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);

	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		var nodeid=node.id;
		loadFrom('#fm-person',node);
		  $('#personselectGrid').datagrid('options').queryParams.prjid=nodeid;
 	     showDialog('#dlg-person','修改项目人员');

	     $('#personselectGrid').datagrid('reload');

		url=PATH+'/auditItem/person';
	}
};
$scope.itemWriterFun=function(id) {

		if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);

		var node = $('#dataGrid').datagrid('getSelected');
		if (node) {

			$.post(PATH + '/auditItem/GetItems',node,
				function(data,textStatus) {
					if (textStatus == 'success') {
						$('#tbl_itemWriter').empty().append('<tr><td><input name="auditItem.id" type="hidden"  /></td></tr>');
						showDialog('#dlg-itemWriter', "填写事项");
						loadFrom('#fmdlgitemWriter', node);

						for (var item in data){
 						var arrName =data[item]['des'];
						var arrColumnName=data[item]['serialId']	;
						var arrValue=	data[item]['ItemContents']	;
							if (!arrValue)arrValue='';
						var arrNameId=	data[item]['ItemRelaPersId']
						  {
							var ai = $('#tbl_itemWriter').append('<tr><th>' + arrName+","+arrColumnName + '</th><td></td></tr>')
							  var vid='item.detail'+ arrNameId
							var td_last=ai.find('td').last();
							 td_last.append('<input type="hidden" name="item.itemName_'+  arrNameId+'" value="'+arrColumnName+'" />')
						      .append('<input name="item.itemContent_' + arrNameId
							+ '" multiple="true"   '
							+ ' class="easyui-textbox" style="width:500px; " data-options="required:true" '
								+ '" value="'
								/* +arrValue*/
								 +'"'
								 +' />'  )

								 .append('<a href="javascript:void(0)"   >点击查看</a>');
							  $('#tbl_itemWriter').find('[name="item.itemContent_' + arrNameId+'"]').val((arrValue));
						}
					}
						$('#tbl_itemWriter a').each( function(i,element){
							$(element).linkbutton({plain:true});
							$(element).click(function(){
								var v=$(element).prev().val();
								$scope.current_detail=$(element).prev();
								  KindEditor.html('#detail_note', (v));
								 showDialog('#dlg-detail','编辑详情');
							});
						});
				}
			}, "json");

			url = PATH + '/auditItem/itemWriter';
		}

	};
$scope.detailFun=function(id){
	$scope.detail_editor.sync();
	var html = KindEditor('#detail_note').val();
	$scope.current_detail.val((html));
	$('#dlg-detail').dialog('close');
}
	$scope.itemWriterExport=function(id){
		if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
		var node = $('#dataGrid').datagrid('getSelected');
		if (node) {
			url=PATH+'/auditItem/itemWriterExport';
			$('#dlg-detail-download form input[name=id] ').attr("value",node.id);
			$('#dlg-detail-download form input[name=title]' ).attr("value",node.ItemTitle);
			$('#dlg-detail-download form input[name=ItemFieldLists] ' ).attr("value",node.ItemFieldLists);
			$('#dlg-detail-download form' ).form("submit",{"url":url,
				success: function (result) {
					result = $.parseJSON(result);

					if (result.code == 200) {

					}else {
						$.messager.alert('提示',result.msg);
					}

				}

			});


		}

	}
	//填写事项 保存按钮
$scope.saveItems=function() {
	//
			parent.$.messager.confirm('询问', '您是否要保存当前事项？', function (b) {
				if (b) {
					parent.$.messager.progress({
						title: '提示',
						text: '数据处理中，请稍后....'

					});
					$('#fmdlgitemWriter').form('submit', {
						url: PATH + '/auditItem/itemWriter'
						, onSubmit: function(){
							//进行表单验证
							$('#tbl_itemWriter input[name*="item.itemContent_"]').each(function(i,element){
								$(element).val(htmlencode($(element).val()));
								});
							//如果返回false阻止提交
							return true;
						},
						success: function (result) {
							result = $.parseJSON(result);

							if (result.code == 200) {
								$('#dlg-itemWriter').dialog('close');

							}else {
								$.messager.alert('提示',result.msg);
							}
							parent.$.messager.progress('close');
						}
					});
				}
			});

	};
$scope.createNote=function(){
	$scope.editor = KindEditor.create('#note', {
			width : '750px',
			height : '360px',
			items : [ 'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image','multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink' ],
			uploadJson : PATH+'/common/file/upload',
			fileManagerJson : PATH+'/common/file/fileManage',
			allowFileManager : true,
		afterBlur: function(){this.sync();}

		});
};

$scope.createReadOnlyNote=function(){
	  KindEditor.create('#note2', {
		  top:'20px',
        left:'200px',
		width : '350px',
		height : '400px',
		items : [ 'print','fullscreen']
	});
	
	KindEditor.instances[1].readonly(true);


};
	$scope.createDetailNote=function(){
		$scope.detail_editor = KindEditor.create('#detail_note', {
			width : '750px',
			height : '360px',
			items : [ 'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image','multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink' ],
			uploadJson : PATH+'/common/file/upload',
			fileManagerJson : PATH+'/common/file/fileManage',
			allowFileManager : true
		});
	};



$scope.deleteFun=function(id) {
	if (id == undefined) {
		var rows = $('#dataGrid').datagrid('getSelections');
		id = rows[0].id;
	}
	parent.$.messager.confirm('询问', '您是否要删除当前事项？', function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(PATH+'/auditItem/delete', {
				id : id
			}, function(result) {
				if (result.code==200) {
					$('#dataGrid').datagrid('reload');
				} else {
					$.messager.alert('提示',result.msg);
				}
				parent.$.messager.progress('close');
			}, 'JSON');
		}
	});
};


$scope.viewFun=function(id) {

if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		$scope.createReadOnlyNote();
		if(node.ItemDesc)KindEditor.html('#note2',node.ItemDesc);
		showDialog('#dlg2','查看');
		
	}
	
};


$scope.editFun=function(id) {
	
	if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		loadFrom('#fm',node);
		$('#fm table').css("display",null)
		if(node.ItemFieldLists) $('#fm table  input[name="auditItem.ItemFieldLists"]').attr("disabled","disabled");
		else $('#fm table  input[name="auditItem.ItemFieldLists"]').removeAttr("disabled");
		if(node.ItemDesc)
			$scope.editor.html(node.ItemDesc);
		if(node.ItemWriter) {
			$('#ItemWriterids').attr('value',node.ItemWriter) ;
			$('#audititemPerson').combogrid('setValues',node.ItemWriter.split(','));
			$('#audititemPerson').combogrid('disable');
		}else {
			$('#audititemPerson').combogrid('enable');
			$('#audititemPerson').combogrid('disableTextbox',{stoptype:'readonly',stopArrowFocus:true});
		}
		$("").layout("fullScreen");
		showDialog('#dlg','编辑事项');
		url=PATH+'/auditItem/edit';
	}
};

$scope.addFun=function() {
	  $('#fm').form('clear');
	  $scope.editor.html('');
	$('#audititemPerson').combogrid('enable');
	  $('#fm table  input[name="auditItem.ItemFieldLists"]').removeAttr("disabled");
	  showDialog('#dlg','添加事项');
	  url=PATH+'/auditItem/add';
	  
};


$scope.submit=function(){

    $("#fm").form('submit',{
		url: url,
		onSubmit: function(){
			//进行表单验证
			$scope.editor.sync();
			var html = KindEditor('#note').val();
			$('input[name="auditItem.ItemDesc"]').val(htmlencode(html));;
			//如果返回false阻止提交
			return true;
		},
                success: function(result){
                 result= $.parseJSON(result);
                 if(result.code==200){
                  $('#dlg').dialog('close'); 
                  $('#dataGrid').datagrid('reload');
                  $('#layout_west_tree').tree('reload');
	              	   $('#pid').combotree('reload');
                  }
                else {
                  $.messager.alert('提示',result.msg);
                }
             }
       });		
};

$scope.searchFun=function() {
	$('#dataGrid').datagrid('load', $.serializeObject($('#searchForm')));
};
$scope.cleanFun=function() {
	$('#searchForm input').val('');
	$('#dataGrid').datagrid('load', {});
};

$scope.fileManage=function() {
	 
	console.log('load ');
	 
	$scope.editor.loadPlugin('filemanager', function() {
		$scope.editor.plugin.filemanagerDialog({
			viewType : 'VIEW',
			dirName : 'root',
			clickFn : function(url, title) {
				//KindEditor('#url').val(url);
				$scope.editor.insertHtml($.formatString('<img src="{0}" alt="" />', url));
				$scope.editor.hideDialog();
			}
		});
	});
};

 


} ]);












 

