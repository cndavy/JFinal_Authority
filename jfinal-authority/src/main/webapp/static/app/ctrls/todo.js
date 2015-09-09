

function formatAction(value, row, index){
    alert(value);
    $.formatString('<img onclick="$(this).scope().itemWriterFun(\'{0}\')"  src="{1}" title="填写"/>',
        row.id, PATH+'/static/js/ext/style/images/extjs_icons/notes/note_go.png');
}
$("#todoGrid").datagrid({
    height: 340,
    url: PATH+'/auditItem/getToDo',
    method: 'POST',
    queryParams: {  },
    idField: '产品ID',
    striped: true,
    fitColumns: true,
    singleSelect: false,
    rownumbers: true,
    pagination: false,
    nowrap: false,
    pageSize: 10,
    pageList: [10, 20, 50, 100],
    showFooter: true,
    columns: [[

        { field: 'Name', title: '姓名', width: 30, align: 'left' },
        { field: 'ItemTitle', title: '事项标题', width: 100, align: 'left' },
        { field: 'Per', title: '百分比', width: 30, align: 'right',
            editor: {
                type: 'numberbox',
                options: {
                    min: 0,
                    precision: 0
                }
            }
        },{
            field : 'action',
            title : '操作',
            width : 20,
            formatter : formatAction

        }
    ]],
    onBeforeLoad: function (param) {
    },
    onLoadSuccess: function (data) {

    },
    onLoadError: function () {

    },
    onClickCell: function (rowIndex, field, value) {

    }

});



