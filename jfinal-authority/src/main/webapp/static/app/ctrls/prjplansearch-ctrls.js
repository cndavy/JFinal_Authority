window.name ="NG_DEFER_BOOTSTRAP!";
init =false;

/**
 * easyui 和 anguarjs 结合有点勉强 
 * 让它先暂停 执行等到 ajax 加载后后再进行初始化NG
 */
$('#dataGrid').datagrid({
	url : PATH+'/projectPlan/listPlanByPerson',
	fit : true,
	fitColumns : true,
	border : false,
	pagination : true,
	idField : 'id',
	pageSize : 10,
	pageList : [ 10, 20, 30, 40, 50 ],
	sortName : 'bgnDate',
	sortOrder : 'asc',
	checkOnSelect : false,
	selectOnCheck : false,
	nowrap : false,
	striped : true,
	rownumbers : true,
	singleSelect : true,
	queryParams:{},
	frozenColumns : [ [ {
		field : 'id',
		title : '编号',
		width : 150,
		hidden : true
	}, {
		field : 'Pname',
		title : '项目名称',
		width : 120,
		sortable : true
	} ] ],
	columns : [ [ {
		field : 'bgnDate',
		title : '参与开始日期',
		width : 120,
		sortable : true
	},  {
		field : 'endDate',
		title : '参与结束日期',
		width : 120,
		sortable : true
	} ,{
		field : 'ManagerId',
		title : '项目发起人Id',
		width : 100,
		sortable : true
        ,hidden:true

	},{
		field : 'PDesc',
		title : '项目DESC',
		width : 100,
		sortable : true
		,hidden:true

	},{
		field : 'ManagerName',
		title : '项目发起人',
		width : 100,
		sortable : true

	},{
		field : 'uName',
		title : '参与人姓名',
		width : 100,
		sortable : true

	},{
		field : 'uId',
		title : '参与人姓名Id',
		width : 100,
		sortable : true,
		hidden:true
	}
		,{
		field : 'action',
		title : '操作',
		width : 100,
		formatter : formatterFun
	} ] ],
	 toolbar : '#toolbar',
	onLoadSuccess : function() {
		
		$('#searchForm table').show();

		parent.$.messager.progress('close');
		$(this).datagrid('tooltip');
	
		if(!init){
			angular.resumeBootstrap();
			init=true;
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
var perlist=$('#prjPerson').combogrid({
	url : PATH+'/project/getPerson',
	textField : 'des',
	idField:'id',
	mode: 'remote',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],	columns:[[

		{field:'id',title:'id',width:60,hidden:true},

		{field:'des',title:'中文名称',width:120}

	]],
	onChange: function(n,o){
		$('#prjPersons').attr('value',n.toString()) ;
		$('#dataGrid').datagrid('load', $.serializeObject($('#searchForm')));
	}
});
var editRow = undefined;
function unitformatter(value, rowData, rowIndex) {
	if (value == 0) {
		return;
	}
	var data=perlist.combobox('getData');
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == value) {
			return data[i].des;
		}
	}
}
function endEdit(){
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
	},{
		field : 'uId',
		title : '项目参与人',
		width : 100,
		sortable : true,
		formatter: unitformatter

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
		{ text: '添加', iconCls: 'book-add', handler: function () {
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

			text: '保存', iconCls: 'book-save', handler: function () {

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

			text: '撤销', iconCls: 'icon-redo', handler: function () {

				editRow = undefined;

				pergrd.datagrid('rejectChanges');

				pergrd.datagrid('unselectAll');

			}
		 } ,'-', {
			text: '删除', iconCls: 'book-delete', handler: function () {
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
			text: '修改', iconCls: 'icon-edit', handler: function () {
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
			iconCls: 'icon-cancel', handler:endEdit
		},
		'-'/*,{
			text: '上移', iconCls: 'icon-up', handler: function () {
				MoveUp();
			}

		}, '-', {

			text: '下移', iconCls: 'icon-down', handler: function () {
				MoveDown();
			}
		}*/
	],

	onLoadSuccess : function() {

		$('#fm-person table').show();
		parent.$.messager.progress('close');
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




MainApp.controller('PrjInfoSearchCtrls', [ '$scope', function($scope) {
$scope.load=function(){
//	$scope.createNote();
	$scope.createReadOnlyNote();
  $('#prjPerson').combobox('reload');

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
	
	 KindEditor.instances[0].readonly(true);
};
$scope.viewFun=function(id) {
if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		$scope.createReadOnlyNote();
		if(node.PDesc)KindEditor.html('#note2',node.PDesc);
		showDialog('#dlg2','查看项目');
		
	}
};

$scope.searchFun=function() {
	$('#dataGrid').datagrid('load', $.serializeObject($('#searchForm')));
};
$scope.cleanFun=function() {
	$('#searchForm input').val('');
	$('#dataGrid').datagrid('load', {});
};


 


} ]);












 

