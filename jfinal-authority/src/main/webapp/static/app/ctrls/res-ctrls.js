window.name ="NG_DEFER_BOOTSTRAP!";
init =false;

//init
$('#iconCls').combobox({
	data : $.iconData,
	formatter : function(v) {
		return $.formatString('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.value, v.value);
	}
});

$('#pid').combotree({
	url : PATH+'/system/res/tree',
	parentField : 'pid',
	lines : true,
	panelHeight : 'auto'
});


var treeGrid = $('#treeGrid').treegrid({
	url : PATH+'/system/res/list',
	idField : 'id',
	treeField : 'name',
	parentField : 'pid',
	fit : true,
	fitColumns : false,
	border : false,
	frozenColumns : [ [ {
		title : '编号',
		field : 'id',
		width : 150, 
		hidden : true
	} ] ],
	columns : [ [ {
		field : 'name',
		title : '资源名称',
		width : 200
	}, {
		field : 'url',
		title : '资源路径',
		width : 330
	}, {
		field : 'type',
		title : '资源类型ID',
		width : 150,
		hidden : true
	},
	 {
		field : 'typeName',
		title : '资源类型',
		width : 80,
		formatter:function(value,row){
			if(row.type=='1')return '菜单';
			if(row.type=='2')return'功能';
			
		}
	},
	{
		field : 'seq',
		title : '排序',
		width : 40
	}, {
		field : 'pid',
		title : '上级资源ID',
		width : 150,
		hidden : true
	} ,{
		field : 'action',
		title : '操作',
		width : 50,
		formatter : formatterFun
	}, {
		field : 'des',
		title : '备注',
		width : 250
	} ] ],
	toolbar : '#toolbar',
	onContextMenu : function(e, row) {
		e.preventDefault();
		$(this).treegrid('unselectAll');
		$(this).treegrid('select', row.id);
		$('#menu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
	},
	onLoadSuccess : function() {
		parent.$.messager.progress('close');
		$(this).treegrid('tooltip');
		
		if(!init){
			angular.resumeBootstrap();
			init=true;
		}
	}
});


MainApp.controller('ResCtrls', [ '$scope', function($scope) {


$scope.deleteFun=function(id) {
	if (id != undefined)treeGrid.treegrid('select', id);
	
	var node = treeGrid.treegrid('getSelected');
	if (node) {
		parent.$.messager.confirm('询问', '您是否要删除当前资源？', function(b) {
			if (b) {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				$.post(PATH+'/system/res/delete', {
					id : node.id
				}, function(result) {
					if (result.code==200) {
						treeGrid.treegrid('reload');
						 $('#layout_west_tree').tree('reload');
						   $('#pid').combotree('reload');
					}
					parent.$.messager.progress('close');
				}, 'JSON');
			}
		});
	}
};

$scope.editFun=function(id) {
	if (id != undefined)treeGrid.treegrid('select', id);
	
	var node = treeGrid.treegrid('getSelected');
	if (node) {
		loadFrom('#fm',node);
		 if(node.des)$('#des').text(node.des);
		$('#pid').combotree('reload',PATH+'/system/res/tree?passId='+node.id);
		showDialog('#dlg','编辑资源');
		url=PATH+'/system/res/edit';
	}
};

$scope.addFun=function() {
	  $('#fm').form('clear');
	  showDialog('#dlg','添加资源');
	  url=PATH+'/system/res/add';
	  
};


$scope.submit=function(){
	
      $('#fm').form('submit',{
                url: url,
                success: function(result){
                 result= $.parseJSON(result);
                 if(result.code==200){
                  $('#dlg').dialog('close'); 
                  treeGrid.treegrid('reload');
	              	   $('#layout_west_tree').tree('reload');
	              	   $('#pid').combotree('reload');
                  }
                else {
                  $.messager.alert('提示',result.msg);
                }
             }
       });		
};


} ]);

