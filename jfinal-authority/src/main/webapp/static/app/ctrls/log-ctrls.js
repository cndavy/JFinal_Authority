window.name ="NG_DEFER_BOOTSTRAP!";
init =false;
$('#operation').combobox({
    valueField:'operation',
    textField:'value',
    data:[ {
    	operation: '1',
    	value:'访问'
    },{
    	operation:'2' ,
    	value:'登录'
    },{
    	operation:'3' ,
    	value:'添加事件'
    },{
    	operation:'4' ,
    	value:'编辑事件'
    },{
    	operation:'5' ,
    	value:'删除事件'
    },{
    	operation:'6' ,
    	value:'授权事件'
    }]
	  });		

var dataGrid = $('#dataGrid').datagrid({
	url : PATH+'/system/log/list',
	fit : true,
	fitColumns : true,
	border : false,
	pagination : true,
	idField : 'id',
	pageSize : 15,
	pageList : [ 15, 30, 45, 60, 75 ],
	sortName : 'date',
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
		field : 'operation',
		title : '事件名称',
		width : 80,
		sortable : true,
		formatter:function(value){
			if(value=='1') return '访问';
			if(value=='2') return '登录';
			if(value=='3') return '添加';
			if(value=='4') return '编辑';
			if(value=='5') return '删除';
			if(value=='6') return '授权';
		}
	} ] ],
	columns : [[ {
		field:'user_name',
		title:'操作用户',
		width:50,
	},
	{
		field : 'ip',
		title : 'ip',
		width : 50,
		sortable : true
	},
	{
		field : 'from',
		title : '来源',
		width : 220,
		formatter:function(value,row){
			
			if(value&&value.indexOf('loginView')!=-1) return'';
			else if(value&&row.operation=='访问') return value;
			else return '';
		}
	}
	,
	{
		field : 'date',
		title : '日期',
		width : 100,
		sortable : true
	},{
		field : 'action',
		title : '操作',
		width : 40,
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

$('.datagrid-wrap').append("<div id='main'   ></div>");


MainApp.controller('LogCtrls', [ '$scope', function($scope) {


$scope.deleteFun=function(id) {
	if (id == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	}
	parent.$.messager.confirm('询问', '您是否要删除当前log？', function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(PATH+'/system/log/delete', {
				id : id
			}, function(result) {
				if (result.code==200) {
					dataGrid.datagrid('reload');
				}
				parent.$.messager.progress('close');
			}, 'JSON');
		}
	});
};


$scope.searchFun=function() {
	
	if($('.datagrid-view').is(':hidden')) $scope.initChart();
	else dataGrid.datagrid('load', $.serializeObject($('#searchForm')) );
	
};
$scope.cleanFun=function() {
	  $('#searchForm input').val('');
	 if($('.datagrid-view').is(':hidden'))  $scope.initChart();
	else dataGrid.datagrid('load', {});
};


$scope.chart=function(){
	$('.datagrid-view').toggle();
	
	$('.datagrid-pager').toggle();
	
	if($('.datagrid-view').is(':hidden')){
	
	    	$('#operation').combobox({
	    valueField:'operation',
	    textField:'value',
	    data:[ {
	    	operation: '1',
	    	value:'访问'
	    },{
	    	operation:'2' ,
	    	value:'登录'
	    }]
		  });		
	  $scope.initChart();
    }
	else{
		$('#operation').combobox({
		    valueField:'operation',
		    textField:'value',
		    data:[ {
		    	operation: '1',
		    	value:'访问'
		    },{
		    	operation:'2' ,
		    	value:'登录'
		    },{
		    	operation:'3' ,
		    	value:'添加事件'
		    },{
		    	operation:'4' ,
		    	value:'编辑事件'
		    },{
		    	operation:'5' ,
		    	value:'删除事件'
		    },{
		    	operation:'6' ,
		    	value:'授权事件'
		    }]
   		  });		
		
	}
};



$scope.excel=function(){
	
	url=PATH+'/system/log/excel';
	
	$('#searchForm').form('submit',{url:url});
	
};


$scope.initChart=function(url){
 

 $.post(PATH+'/system/log/chart',$.serializeObject($('#searchForm')),function(data){
		
	    $('#main').highcharts({
	        title: {
	            text: 'User line chart',
	            x: -20 //center
	        },
	        credits : {
				enabled : false
			},
	        xAxis: {
	            categories: data.categories
	        },
	        yAxis: {
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: data.series
	    });
		
		} ,'json');
};
   

} ]);

