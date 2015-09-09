window.name ="NG_DEFER_BOOTSTRAP!";
var init =false;
var init1 =false;
/**
 * easyui 和 anguarjs 结合有点勉强 
 * 让它先暂停 执行等到 ajax 加载后后再进行初始化NG
 */


$('#dataGrid').datagrid({
	url : PATH+'/project/list',
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
		field : 'name',
		title : '项目名称',
		width : 120,
		sortable : true
	} ] ],
	columns : [ [ {
		field : 'createdate',
		title : '项目开始日期',
		width : 120,
		sortable : true
	}, {
		field : 'planenddate',
		title : '项目计划结束日期',
		width : 120,
		sortable : true
	},{
		field : 'enddate',
		title : '项目最终结束日期',
		width : 120,
		sortable : true
	} ,{
		field : 'prjName',
		title : '项目发起人',
		width : 100,
		sortable : true

	},{
		field : 'pid',
		title : '项目发起人id',
		width : 100,
		sortable : true,
		hidden:true
	}
		,{
		field : 'action',
		title : '操作',
		width : 100,
		 formatter : formatterFunPrjManage

	} ] ],
	 toolbar : '#toolbar',
	onLoadSuccess : function() {

		$('#searchForm table').show();
		$('#fm table').show();
		parent.$.messager.progress('close');
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
	var data=perlist.combogrid("grid").datagrid("getData").rows;
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == value) {
			return data[i].des;
		}
	}
}
function endEdit(data){
	pergrd.datagrid("getRows");
	for (var i =0;i<row.length;i++){
		pergrd.datagrid("endEdit",i);
	}
}
var pergrd=$('#personselectGrid').datagrid({
	url : PATH+'/projectPlan/getPersonInPrjList',
	collapsible:true,
	fit : true,
	fitColumns : true,
	border : false,

	pagination : true,
	idField : 'id',
	pageSize : 8,
	pageList : [ 8, 15, 20, 25 ],
	sortName : 'uid',
	sortOrder : 'desc',
	checkOnSelect : false,
	selectOnCheck : false,
	queryParams:{},
	nowrap : false,
	striped : true,
	rownumbers : true,
	singleSelect : false,

	frozenColumns :[[ {
		field : 'id',
		title : '编号',
		width : 150,
		hidden : true
	}, {
		field: 'uId',
		title: '项目参与人',
		width: 100,
		sortable: true,
		formatter: unitformatter,
		editor: {
			type: 'combogrid',
			options: {
				url: PATH + '/project/getPerson',
				frozenColumns: [[
					{field: 'select', checkbox: true}
				]],
				idField: 'id',
				textField: 'des',
				panelWidth: 350,
				mode: 'remote',
				columns: [[
					{field: 'id', title: 'id', width: 30},

					{field: 'des', title: '中文名称', width: 80}

				]]
			}
		}
	}]],
	columns :[[{
		field : 'bgnDate',
		title : '参与开始日期',
		width : 120,
		sortable : true,
		editor: {
			type:'datebox'
		}
	}, {
		field : 'endDate',
		title : '参与结束日期',
		width : 120,
		sortable : true,
		editor: {
			type:'datebox'
		}
	}]],
	toolbar:[
		{ text: '添加', iconCls: 'database_add', handler: function () {
             if (editRow != undefined) {
				 pergrd.datagrid('endEdit', editRow);
			}
			if (editRow == undefined) {
				var tmp={};
				var fm=$('#fm-person');

				var uid=fm.find("input[name='prj.pid']").val();
				var pid=fm.find("input[name='prj.id']").val();
				var bgndate=fm.find("input[name='prj.createdate']").val();
				var enddate=fm.find("input[name='prj.planenddate']").val();
				tmp.uId=uid;
				tmp.prjId=pid ;
				tmp.bgnDate=bgndate;
				tmp.endDate=enddate;
				pergrd.datagrid('insertRow', {
					index: 0,
					row: tmp
				});
				pergrd.datagrid('beginEdit', 0);
				editRow = 0;
			}
		}
		}, '-',{

			text: '保存', iconCls: 'database_save', handler: function () {

				pergrd.datagrid('endEdit', editRow);
 			//如果调用acceptChanges(),使用getChanges()则获取不到编辑和新增的数据。
 			//使用JSON序列化datarow对象，发送到后台。
 				var rows =pergrd.datagrid('getChanges');
				if (rows.length){
					var inserted=pergrd.datagrid('getChanges','inserted');
					var deleted=pergrd.datagrid('getChanges','deleted');
					var updated=pergrd.datagrid('getChanges','updated');
					var effectRow={}
					if ( inserted.length){
						effectRow['inserted']=JSON.stringify(inserted);

					}
					if ( deleted.length){
						effectRow['deleted']=JSON.stringify(deleted);

					}
					if ( updated.length){
						effectRow['updated']=JSON.stringify(updated);

					}
				}

 				$.post(PATH+'/projectPlan/chgperson', effectRow, function (data) {
					if (data.code=200){
						$.messager.alert("提示","提交成功!");
						pergrd.datagrid('acceptChanges');
						pergrd.datagrid("reload");
					}
     			},"JSON").error(function(){
					$.messager.alert("提示","提交错误了!");
				});

			}
		},'-', {

			text: '撤销', iconCls: 'cancel', handler: function () {

				editRow = undefined;

				pergrd.datagrid('rejectChanges');

				pergrd.datagrid('unselectAll');

			}
		 } ,'-', {
			text: '删除', iconCls: 'database_delete', handler: function () {
				var row = pergrd.datagrid('getSelections');
				if (row.length > 0) {
					for (var i = 0; i < row.length; i++) {
						var index = pergrd.datagrid('getRowIndex', row[i]);
						pergrd.datagrid('deleteRow', index);
					}
					pergrd.datagrid('unselectAll');
				}

			}
		},'-',{
			text: '修改', iconCls: 'database_edit', handler: function () {
				var row = pergrd.datagrid('getSelected');
				if (row != null) {
					if (editRow != undefined) {
						pergrd.datagrid('endEdit', editRow);
					}
					if (editRow == undefined) {
						var index = pergrd.datagrid('getRowIndex', row);
						pergrd.datagrid('beginEdit', index);
						editRow = index;
						pergrd.datagrid('unselectAll');

					}

				} else {
				}

			}

		},  '-',{
			text:'结束编辑',
			iconCls: 'disconnect', handler:endEdit
		}

	],

	onLoadSuccess : function() {
		parent.$.messager.progress('close');
		$('#fm-person table').show();

		$(this).datagrid('tooltip');
		$(this).datagrid('resize');
		if(!init){
			angular.resumeBootstrap();
			init=true;
		}
	},
	onAfterEdit: function (rowIndex, rowData, changes) {
		editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
		if (editRow != undefined) {
			$(this).datagrid('endEdit', editRow);
		}
		if (editRow == undefined) {
			$(this).datagrid('beginEdit', rowIndex);
			editRow = rowIndex;
		}

	},
	onClickRow: function (rowIndex, rowData) {
		if (editRow != undefined) {
			$(this).datagrid('endEdit', editRow);
		}
	}

});
var perlist=$('#prjManager').combogrid({
	url : PATH+'/project/getPerson',

	idField:'id',
	textField : 'des',
	value:'',
	panelWidth:350,
	mode: 'remote',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],
	columns:[[
		{field:'id',title:'id',width:10},

		{field:'des',title:'中文名称',width:120}
	]]
,checked:true,rownumbers:true
	,onChange:function  (n,o){
		$('#prjManagers').attr('value',n.toString()) ;
	}
	,
	pagination : true,

	pageSize : 8,
	pageList : [ 8, 15, 20, 25 ]
});

var perlist1=$("#prjManagerid").combogrid({
	url : PATH+'/project/getPerson',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],
	idField:'id',
	textField:'des',
	panelWidth:350,
	mode: 'remote',
	columns:[[
		{field:'id',title:'id',width:30 },
		{field:'des',title:'中文名称',width:80}

	]]
	,onChange:function  (n,o){
	     $('#prjManagerids').attr('value',n.toString()) ;
	}
});


MainApp.controller('PrjManageCtrls', [ '$scope', function($scope) {
$scope.load=function(){
	$scope.createNote();
	$scope.createReadOnlyNote();


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

		url=PATH+'/project/person';
	}
};
	$scope.endPrjFun=function(id) {

		if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);

		var node = $('#dataGrid').datagrid('getSelected');
		if (node) {
			showDialog('#dlg-endprj', "终止项目");
			loadFrom('#fmdlgendprj', node);
			url = PATH + '/project/endprj';
		}

	};

$scope.endPrjFun1=function() {
			parent.$.messager.confirm('询问', '您是否要终止当前项目？', function (b) {
				if (b) {
					parent.$.messager.progress({
						title: '提示',
						text: '数据处理中，请稍后....'

					});
					$('#fmdlgendprj').form('submit', {
						url: PATH + '/project/endprj'
						,
						success: function (result) {
							result = $.parseJSON(result);

							if (result.code == 200) {
								$('#dlg-endprj').dialog('close');
								$('#dataGrid').datagrid('reload');
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
			allowFileManager : true
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

/*
$scope.statusFun=function(id){
	if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		loadFrom('#fm-status',node);
		showDialog('#dlg-status','修改状态');
		url=PATH+'/project/status';
	}
	
};*/
/*

$scope.submitStatus=function(){
	
	  $('#fm-status').form('submit',{
          url: url,
          success: function(result){
           result= $.parseJSON(result);
           if(result.code==200){
            $('#dlg-status').dialog('close'); 
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

*/

$scope.deleteFun=function(id) {
	if (id == undefined) {
		var rows = $('#dataGrid').datagrid('getSelections');
		id = rows[0].id;
	}
	parent.$.messager.confirm('询问', '您是否要删除当前项目？', function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(PATH+'/project/delete', {
				id : id
			}, function(result) {
				if (result.code==200) {
					$('#dataGrid').datagrid('reload');
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
		if(node.des)KindEditor.html('#note2',node.des);
		showDialog('#dlg2','查看项目');
		
	}
	
};


$scope.editFun=function(id) {
	
	if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {

		loadFrom('#fm',node);
		 if(node.des) KindEditor.html('#note',node.des);
		showDialog('#dlg','编辑项目');
		url=PATH+'/project/edit';
	}
};

$scope.addFun=function() {
	  $('#fm').form('clear');
	  $scope.editor.html('');
	  showDialog('#dlg','添加项目');
	  url=PATH+'/project/add';
	  
};


$scope.submit=function(){
	
 	$scope.editor.sync();
	var html = $scope.editor.text();
	$("#note")[0].innerText=html;
	//alert(html);
      $("#fm").form('submit',{
                url: url,
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
	//console.log($('#prjManager').combogrid("grid").datagrid("getSelected"))
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












 

