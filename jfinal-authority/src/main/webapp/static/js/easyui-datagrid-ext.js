/**
 * Created by han on 2015/8/17.
 */

    $.extend($.fn.datagrid.methods,{
        createHeader: function (jq, opts) {
            function buildHeader(headerContainer, columnsDefine, frozenHeader) {
                //如果列配置为空，直接返回
                if (!columnsDefine) {
                    return;
                }
                $(headerContainer).show(); //标题显示
                $(headerContainer).empty(); //清空原有内容
                //生成table的dom对象，添加到header所在的层
                var t = $("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(headerContainer);
                //columns设置格式[[...],[...],[...]],第一个子数组生成表格的一行
                for (var i = 0; i < columnsDefine.length; i++) {
                    var tr = $("<tr></tr>").appendTo($("tbody", t));
                    var cols = columnsDefine[i];
                    for (var j = 0; j < cols.length; j++) {
                        var col = cols[j]; //列设置col
                        var attr = "";
                        if (col.rowspan) {//跨行设置
                            attr += "rowspan=\"" + col.rowspan + "\" ";
                        }
                        if (col.colspan) {//跨列设置
                            attr += "colspan=\"" + col.colspan + "\" ";
                        }
                        var td = $("<td " + attr + "></td>").appendTo(tr); //生成td,设置属性
                        //是否在第一列添加checkbox
                        if (col.checkbox) {
                            td.attr("field", col.field);
                            $("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
                        } else {
                            //如果设置了field字段
                            if (col.field) {
                                td.attr("field", col.field);
                                td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
                                $("span", td).html(col.title);
                                $("span.datagrid-sort-icon", td).html("&nbsp;");
                                var cell = td.find("div.datagrid-cell");
                                if (col.resizable == false) {
                                    cell.attr("resizable", "false");
                                }
                                col.boxWidth = $.boxModel ? (col.width - (cell.outerWidth() - cell.width())) : col.width;
                                cell.width(col.boxWidth);
                                cell.css("text-align", (col.align || "left"));
                            } else {
                                $("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
                            }
                        }
                        //隐藏表格
                        if (col.hidden) {
                            td.hide();
                        }
                    }
                }
                //是否显示行号
                if (frozenHeader && opts.rownumbers) {
                    var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"datagrid-header-rownumber\"></div></td>");
                    if ($("tr", t).length == 0) {
                        td.wrap("<tr></tr>").parent().appendTo($("tbody", t));
                    } else {
                        td.prependTo($("tr:first", t));
                    }
                }
            };
            return jq.each(function () {
                var dc = $.data(this, "datagrid").dc;
                var headerContainer1 = dc.view1.children("div.datagrid-header");
                var headerContainer2 = dc.view2.children("div.datagrid-header");
                var header1 = headerContainer1.children("div.datagrid-header-inner"); //view1的header，行号标题，一般为空
                var header2 = headerContainer2.children("div.datagrid-header-inner"); //表格的header，显示title
                buildHeader(header1, opts.frozenColumns, true); //生成冻结表头
                buildHeader(header2, opts.columns, false); //生成表头
                header1.css("display", opts.showHeader ? "block" : "none");
                header2.css("display", opts.showHeader ? "block" : "none");
            });
        }
    });
