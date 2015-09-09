window.name ="NG_DEFER_BOOTSTRAP!";
init =false;

/**
 * easyui 和 anguarjs 结合有点勉强 
 * 让它先暂停 执行等到 ajax 加载后后再进行初始化NG
 */
$('#dataGrid').datagrid({
	url : PATH+'/projectPlan/listIdleByPerson',
	fit : true,
	fitColumns : true,
	border : false,
	pagination : true,
	idField : 'PersonName',

	pageSize : 10,
	pageList : [ 10, 20, 30, 40, 50 ],
	sortName : 'count',
	sortOrder : 'asc',
	checkOnSelect : false,
	selectOnCheck : false,
	nowrap : false,
	striped : true,
	rownumbers : true,
	singleSelect : true,
	queryParams:{},
	frozenColumns : [ [  {
		field : 'PersonName',
		title : '项目参与人名称',
		width : 120,
		sortable : true
	} ] ],
	columns : [ [ {
		field : 'PrjName',
		title : '项目名称',
		width : 200,
		sortable : true,
		formatter : formatterFun

	},{
		field : 'count',
		title : '参与项目数量',
		width : 50,
		sortable : true

	}
		 ] ],
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
var formatterFun = function (val,rec){
alert(val);
}
MainApp.controller('PrjPlanIdleCtrls', [ '$scope', function($scope) {
	$scope.load = function () {


	};
	$scope.searchFun = function () {
		$('#dataGrid').datagrid('load', $.serializeObject($('#searchForm')));
	};
	$scope.cleanFun = function () {
		$('#searchForm input').val('');
		$('#dataGrid').datagrid('load', {});
	};
}
]
);

 















 

