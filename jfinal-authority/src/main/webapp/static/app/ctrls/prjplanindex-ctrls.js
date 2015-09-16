window.name ="NG_DEFER_BOOTSTRAP!";
var init =false;

/**
 * easyui 和 anguarjs 结合有点勉强 
 * 让它先暂停 执行等到 ajax 加载后后再进行初始化NG
 */
$('#dataGrid').datagrid({
	url : PATH+'/projectPlan/listPrjAndPersonWithCount',
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
	},{
		field : 'PersonNum',
		title : '项目参与人数',
		width : 100,
		sortable : true
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
var editRow = undefined;
function unitformatter(value, rowData, rowIndex) {
	if (value == 0) {
		return;
	}
	var data=perlist.combogrid('grid').datagrid("getData").rows;
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
		formatter: unitformatter ,
		editor:  perlist1
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
	},
		{
			field : 'Memo',
			title : '备注',
			width :60,
			sortable : true,
			editor:{
				type:'textarea'
			}
		}]],
	toolbar:[

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
var perlist=$('#prjManager').combogrid({
	url : PATH+'/project/getPerson',

	textField : 'des',
	idField:'id',
	multiSelected:true,
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],	columns:[[

		{field:'id',title:'id',width:60,hidden:true},

		{field:'des',title:'中文名称',width:120}

	]],
    mode: 'remote',
	onChange:function  (n,o){
		$('#prjManagers').attr('value',n.toString()) ;
	}
});

var perlist1=$('#prjManagerid').combogrid({
	url : PATH+'/project/getPerson',
	frozenColumns:[[
		{field:'ck',checkbox:true}
	]],	columns:[[

		{field:'id',title:'id',width:60,hidden:true},

		{field:'des',title:'中文名称',width:120}

	]],
	  idField:'id',
	textField:'des',
	onChange:function  (n,o){
	$('#prjManagerids').attr('value',n.toString()) ;
}
});

MainApp.controller('PrjInfoCtrls', [ '$scope', function($scope) {
$scope.load=function(){

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
 	     showDialog('#dlg-person',' 项目参与人员清单');

	     $('#personselectGrid').datagrid('reload');

		url=PATH+'/project/person';
	}
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
		if(node.des)KindEditor.html('#note2',node.des);
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












 

