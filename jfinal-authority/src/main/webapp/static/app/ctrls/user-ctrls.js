window.name ="NG_DEFER_BOOTSTRAP!";
init =false;


var  dg = $('#dg').datagrid({
    url:PATH+'/system/user/list',
    fit:true,
    fitColumns : true,
	idField : 'id',
	sortName : 'date',
	sortOrder : 'asc',
	striped: true, 
	border : false,
	nowrap:false,
	rownumbers:true,
	singleSelect:true,
    pagination : true,
    checkOnSelect : false,
	selectOnCheck : false,
	pageSize : 15,
    pageList : [15, 20, 30, 40, 50],
    frozenColumns : [ [ {
		field : 'id',
		title : '编号',
		width : 150,
		checkbox : true
	}, {
		field : 'name',
		title : '登录名称',
		width : 80,
		sortable : true
	} ] ],
     columns:[[
        {
           field : 'pwd',
           title : '密码',
           width : 60,
     	   formatter : function(value, row, index) {
	       return '******';
       }
       },
       {
           field : 'email',
           title : '邮箱',
           width : 150
       },
        {field:'des',title:'描述',width:200,formatter:function(value,row){
          if(value) return ' <div class="easyui-tooltip" title="'+value+'" style="padding:5px">'+value+'</div>';
        }},
        {field:'role_names',title:'所属角色',width:150},
        {field:'role_ids',title:'所属角色',width:50,hidden:true},
        {field:'status',title:'状态',width:50,formatter:function(value,row){
        	if(value=='1') return '正常';
        	if(value=='2') return '冻结';
        }},
        {field:'date',title:'创建日期',width:140},
        {field:'action',title:'操作',width:100,
         formatter:formatterFun
	    
        }
      ]],
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
		$(this).datagrid('unselectAll').datagrid('uncheckAll');
		$(this).datagrid('selectRow', rowIndex);
		$('#menu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
	}
});


$('#role_ids').combotree({
	url : PATH+'/system/role/tree',
	parentField : 'pid',
	lines : true,
	panelHeight : 'auto',
	multiple : true,
	onLoadSuccess : function() {
		parent.$.messager.progress('close');
	},
	cascadeCheck : false,
});



MainApp.controller('UserCtrls', [ '$scope', function($scope) {



$scope.pwd=function(id){
 
 if (id != undefined)dg.datagrid('selectRecord', id);
	var node = dg.datagrid('getSelected');
	if (node) {
		 $('#fm3').form('clear');
    	$("input[name='user.id']").val(node.id);
		showDialog('#dlg-pwd','修改密码');
		url=PATH+'/system/user/pwd';
		
  }
 
};



$scope.freeze=function(id,status){
 
	
	
	
	dg.datagrid('unselectAll').datagrid('uncheckAll');
 
	parent.$.messager.confirm('询问', '是否冻结或解冻用户？', function(b) {
 		if(b){
 			var currentUserId = '${session.user.id}';/*当前登录用户的ID*/
			if (alertSelf(currentUserId,id)) {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				$.post(PATH+'/system/user/freeze', {
					id : id,
					status:status
				}, function(result) {
					if (result.code==200) {
						dg.datagrid('reload');
					}
					parent.$.messager.progress('close');
				}, 'JSON');
			
			}
		}
		
	});
 
};

$scope.searchFun=function() {
	dg.datagrid('load', $.serializeObject($('#searchForm')));
};
$scope.cleanFun=function() {
	$('#searchForm input').val('');
	dg.datagrid('load', {});
};


$scope.deleteFun=function(id) {
	if (id == undefined) {//点击右键菜单才会触发这个
		var rows = dg.datagrid('getSelections');
		id = rows[0].id;
	} else {//点击操作里面的删除图标会触发这个
		dg.datagrid('unselectAll').datagrid('uncheckAll');
	}
	parent.$.messager.confirm('询问', '您是否要删除当前用户？', function(b) {
		if (b) {
			var currentUserId = '${session.user.id}';/*当前登录用户的ID*/
			if (alertSelf(currentUserId,id)) {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				$.post(PATH+'/system/user/delete', {
					id : id
				}, function(result) {
					if (result.code==200) {
						dg.datagrid('reload');
					}
					parent.$.messager.progress('close');
				}, 'JSON');
				
			}
		}
	});
};

$scope.grant=function(id) {
	if (id != undefined)dg.datagrid('selectRecord', id);
	
	var node = dg.datagrid('getSelected');
	if (node) {
		$('#fm2').form('clear');
		loadFrom('#fm2',node);
		showDialog('#dlg-grant','授权');
		url=PATH+'/system/user/grant';
		
	}
};


$scope.editFun=function(id) {
	
	if (id != undefined)dg.datagrid('selectRecord', id);
	var node = dg.datagrid('getSelected');
	if (node) {
		loadFrom('#fm',node);
		
		$('#username').attr('readonly','readonly');
		
		$('#icon').attr('src',node.icon);
		if(node.des)$('#des').text(node.des);
		$('#pwd').val('');
		showDialog('#dlg','编辑用户');
		url=PATH+'/system/user/edit';
	}
};

$scope.addFun=function() {
	  $('#username').attr('readonly',false);
		$('#icon').attr('src','');
	  $('#fm').form('clear');
	  showDialog('#dlg','添加用户');
	  
	  $('#icon').attr('src',PATH+'/static/images/guest.jpg');
    	$("input[name='user.icon']").val('/static/images/guest.jpg');
	  url=PATH+'/system/user/add';
};


$scope.submit=function(fm,dlg){
	
	
      $(fm).form('submit',{
                url: url,
                success: function(result){
                 result= $.parseJSON(result);
                 if(result.code==200){
                  $(dlg).dialog('close'); 
                  dg.datagrid('reload');
                   $('#layout_west_tree').tree('reload');
                  }
                else {
                  $.messager.alert('提示',result.msg);
                }
             }
       });		
};


$scope.batchGrantFun=function() {
	var rows = dg.datagrid('getChecked');
	var ids = [];
	if (rows.length > 0) {
		for ( var i = 0; i < rows.length; i++) {
			ids.push(rows[i].id);
		}
		$('#fm2').form('clear');
		$('#ids').val(ids);
		showDialog('#dlg-grant','批量授权');
		url=PATH+'/system/user/batchGrant';

	} else {
		parent.$.messager.show({
			title : '提示',
			msg : '请勾选要授权的记录！'
		});
	}
};


$scope.batchDeleteFun=function() {
	var rows = dg.datagrid('getChecked');
	var ids = [];
	if (rows.length > 0) {
		parent.$.messager.confirm('确认', '您是否要删除当前选中的项目？', function(r) {
			if (r) {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				var currentUserId = '${session.user.id}';/*当前登录用户的ID*/
				var flag = false;
				for ( var i = 0; i < rows.length; i++) {
					if (currentUserId != rows[i].id) {
						ids.push(rows[i].id);
					} else {
						flag = true;
					}
				}
				$.getJSON(PATH+'/system/user/batchDelete', {
					ids : ids.join(',')
				}, function(result) {
					if (result.code==200) {
						dg.datagrid('load');
						dg.datagrid('uncheckAll').dataGrid('unselectAll').datagrid('clearSelections');
					}
					if (flag) {
						parent.$.messager.show({
							title : '提示',
							msg : '不可以删除自己！'
						});
					} else {
						parent.$.messager.alert('提示', result.msg, 'info');
					}
					parent.$.messager.progress('close');
				});
			}
		});
	} else {
		parent.$.messager.show({
			title : '提示',
			msg : '请勾选要删除的记录！'
		});
	}
};




} ]);


