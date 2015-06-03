window.name ="NG_DEFER_BOOTSTRAP!";
init =false;

$('#pid').combotree({
	url : PATH+'/system/role/tree',
	parentField : 'pid',
	lines : true,
	panelHeight : 'auto',
});


var treeGrid = $('#treeGrid').treegrid({
	url : PATH+'/system/role/list',
	idField : 'id',
	treeField : 'name',
	parentField : 'pid',
	fit : true,
	fitColumns : false,
	border : false,
	nowrap : true,
	frozenColumns : [ [ {
		title : '编号',
		field : 'id',
		width : 150,
		hidden : true
	}, {
		field : 'name',
		title : '角色名称',
		width : 150
	} ] ],
	columns : [ [ {
		field : 'seq',
		title : '排序',
		width : 40
	}, {
		field : 'pid',
		title : '上级角色ID',
		width : 150,
		hidden : true
	}, {
		field : 'pname',
		title : '上级角色',
		width : 80
	}, {
		field : 'res_names',
		title : '拥有资源',
		width : 380
	}, {
		field : 'res_ids',
		title : '拥有资源ids',
		width : 80,
		hidden : true
	}, {
		field : 'des',
		title : '备注',
		width : 150
	}, {
		field : 'action',
		title : '操作',
		width : 70,
		formatter :formatterFun  

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

MainApp.controller('RoleCtrls', [ '$scope', function($scope) {

$scope.deleteFun=function(id) {
	if (id != undefined)  treeGrid.treegrid('select', id);
	
	var node = treeGrid.treegrid('getSelected');
	if (node) {
		parent.$.messager.confirm('询问', '您是否要删除当前角色？', function(b) {
			if (b) {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				$.post(PATH+'/system/role/delete', {
					id : node.id
				}, function(result) {
					if (result.code==200) {
					    	treeGrid.treegrid('reload');
						   $('#pid').combotree('reload');
					}
					else $.messager.alert('提示',result.msg);
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
		showDialog('#dlg','编辑角色');
		$('#pid').combotree('reload',PATH+'/system/role/tree?passId='+node.id);
		url=PATH+'/system/role/edit';
	}
};

$scope.addFun=function() {
	  $('#fm').form('clear');
	  showDialog('#dlg','添加角色');
	  url=PATH+'/system/role/add';
};

$scope.submit=function(){
	
      $('#fm').form('submit',{
                url: url,
                success: function(result){
                 result= $.parseJSON(result);
                 if(result.code==200){
                  $('#dlg').dialog('close'); 
                  treeGrid.treegrid('reload');
                  $('#pid').combotree('reload');
                  }
                else {
                  $.messager.alert('提示',result.msg);
                }
             }
       });		
};


$scope.grantFun=function(id) {
	
	if(id==1){
		   $.messager.alert('提示','admin 拥有全部权限无需授权');
		return ;
	}
	
	
	if (id != undefined) {
		treeGrid.treegrid('select', id);
	}
	var node = treeGrid.treegrid('getSelected');
	if (node) {
		parent.$.modalDialog({
			title : '角色授权',
			width : 500,
			height : 500,
			href : PATH+'/system/role/rh?to=roleGrant&id=' + node.id+'&name='+node.name+'&resIds='+node.res_ids+'&des='+node.des,
			buttons : [ {
				text : '授权',
				handler : function() {
					parent.$.modalDialog.openner_treeGrid = treeGrid;//因为添加成功之后，需要刷新这个treeGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#fm');
					f.submit();
				}
			} ]
		});
	}
};

} ]);

