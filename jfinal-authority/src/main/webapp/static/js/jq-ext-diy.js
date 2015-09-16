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


$.extend($.fn.combo.methods, {
    /**
     * 禁用combo文本域
     * @param {Object} jq
     * @param {Object} param stopArrowFocus:是否阻止点击下拉按钮时foucs文本域
     * stoptype:禁用类型，包含disable和readOnly两种方式
     */
    disableTextbox : function(jq, param) {
        return jq.each(function() {
            param = param || {};
            var textbox = $(this).combo("textbox");
            var that = this;
            var panel = $(this).combo("panel");
            var data = $(this).data('combo');
            if (param.stopArrowFocus) {
                data.stopArrowFocus = param.stopArrowFocus;
                var arrowbox = $.data(this, 'combo').combo.find('span.combo-arrow');
                arrowbox.unbind('click.combo').bind('click.combo', function() {
                    if (panel.is(":visible")) {
                        $(that).combo('hidePanel');
                    } else {
                        $("div.combo-panel").panel("close");
                        $(that).combo('showPanel');
                    }
                });
                textbox.unbind('mousedown.mycombo').bind('mousedown.mycombo', function(e) {
                    e.preventDefault();
                });
            }
            textbox.prop(param.stoptype?param.stoptype:'disabled', true);
            data.stoptype = param.stoptype?param.stoptype:'disabled';
        });
    },
    /**
     * 还原文本域
     * @param {Object} jq
     */
    enableTextbox : function(jq) {
        return jq.each(function() {
            var textbox = $(this).combo("textbox");
            var data = $(this).data('combo');
            if (data.stopArrowFocus) {
                var that = this;
                var panel = $(this).combo("panel");
                var arrowbox = $.data(this, 'combo').combo.find('span.combo-arrow');
                arrowbox.unbind('click.combo').bind('click.combo', function() {
                    if (panel.is(":visible")) {
                        $(that).combo('hidePanel');
                    } else {
                        $("div.combo-panel").panel("close");
                        $(that).combo('showPanel');
                    }
                    textbox.focus();
                });
                textbox.unbind('mousedown.mycombo');
                data.stopArrowFocus = null;
            }
            textbox.prop(data.stoptype, false);
            data.stoptype = null;
        });
    }
});

function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    var result=div.innerHTML;

    return result;
}
function htmldecode(s){
    var div = document.createElement('div');
    div.innerHTML = s;
    var result=div.innerText || div.textContent;

    return result;
}