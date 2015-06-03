window.name ="NG_DEFER_BOOTSTRAP!";
init =false;
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
		title : '创建时间',
		width : 120,
		sortable : true
	}, {
		field : 'modifydate',
		title : '最后修改时间',
		width : 120,
		sortable : true
	},{
		field : 'type',
		title : '项目类型',
		width : 120,
		sortable : true,
		formatter:function(value){
			if(value=='1')return '类型1';
			if(value=='2')return '类型2';
		}
	},{
		field : 'status',
		title : '状态',
		width : 100,
		sortable : true,
		formatter:function(value){
			if(value=='1')return '待处理';
			if(value=='2')return '已处理';
			if(value=='3')return '忽略';
		}
	},{
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
MainApp.controller('PrjCtrls', [ '$scope', function($scope) {
$scope.load=function(){
	$scope.createNote();
	$scope.createReadOnlyNote();
	
	
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
        left:'400px',
		width : '350px',
		height : '400px',
		items : [ 'print','fullscreen']
	});
	
	KindEditor.instances[1].readonly(true);
};


$scope.statusFun=function(id){
	if (id != undefined)$('#dataGrid').datagrid('selectRecord', id);
	
	var node = $('#dataGrid').datagrid('getSelected');
	if (node) {
		loadFrom('#fm-status',node);
		showDialog('#dlg-status','修改状态');
		url=PATH+'/project/status';
	}
	
};

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












 

