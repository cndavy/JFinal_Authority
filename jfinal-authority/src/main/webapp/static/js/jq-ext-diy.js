/**
 * Created by han on 2015/6/3.
 */
$.extend($.fn.layout.methods, {
    fullScreen : function (jq) {
        return jq.each(function () {
            var layout = $(this);
            var center = layout.layout('panel', 'center');
            center.panel('maximize');
            center.parent().css('z-index', 20);
            $(window).on('resize.full', function () {
                layout.layout('unFullScreen').layout('resize');
            });
        });
    },
    unFullScreen : function (jq) {
        return jq.each(function () {
            var center = $(this).layout('panel', 'center');
            center.parent().css('z-index', 'inherit');
            center.panel('restore');
            $(window).off('resize.full');
        });
    }
});
//使用方法：
//$("").layout("fullScreen");
//
//$("").layout("unFullScreen");


$.extend($.fn.datagrid.defaults.editors, {
    combogrid: {
        init: function(container, options){
            var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
            input.combogrid(options);
            return input;
        },
        destroy: function(target){
            $(target).combogrid('destroy');
        },
        getValue: function(target){
            return $(target).combogrid('getValue');
        },
        setValue: function(target, value){
            $(target).combogrid('setValue', value);
        },
        resize: function(target, width){
            $(target).combogrid('resize',width);
        }
    }
})