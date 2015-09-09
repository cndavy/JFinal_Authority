 


MainApp.controller('IndexCtrls', [ '$scope', function($scope) {
    
	$scope.load=function(){
		
		$('#tab_p').panel({
			border:false,
			isonCls:'anchor',
			tools : [ {
			    iconCls : 'database_refresh',
		     	handler : function() {
		     	  $('#layout_west_tree').tree('reload');
	    		 }}, {
		    	iconCls : 'resultset_next',
		    	handler : function() {
		 		var node = $('#layout_west_tree').tree('getSelected');
				if (node) {
					$('#layout_west_tree').tree('expandAll', node.target);
				 } else {
					$('#layout_west_tree').tree('expandAll');
				 }}},{
		     	iconCls : 'resultset_previous',
		    	handler : function() {
				var node = $('#layout_west_tree').tree('getSelected');
				if (node) {
					$('#layout_west_tree').tree('collapseAll', node.target);
				} else {
			$('#layout_west_tree').tree('collapseAll');
			}}} ]
		});
		
		
		$scope.index_layout = $('#index_layout').layout({
			fit : true
		});
		//index_layout.layout('collapse', 'east');
	//	index_layout.layout('collapse', 'north');
		$scope.index_layout.layout('collapse', 'south');


		$scope.index_tabs = $('#index_tabs').tabs({
			fit : true,
			border : false,
			onContextMenu : function(e, title) {
				e.preventDefault();
				$scope.index_tabsMenu.menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('tabTitle', title);
			},
			tools : [ {
				iconCls : 'database_refresh',
				handler : function() {
					var href = $scope.index_tabs.tabs('getSelected').panel('options').href;
					if (href) {/*说明tab是以href方式引入的目标页面*/
						var index = $scope.index_tabs.tabs('getTabIndex', $scope.index_tabs.tabs('getSelected'));
						$scope.index_tabs.tabs('getTab', index).panel('refresh');
					} else {/*说明tab是以content方式引入的目标页面*/
						var panel = $scope.index_tabs.tabs('getSelected').panel('panel');
						var frame = panel.find('iframe');
						try {
							if (frame.length > 0) {
								for ( var i = 0; i < frame.length; i++) {
									frame[i].contentWindow.document.write('');
									frame[i].contentWindow.close();
									frame[i].src = frame[i].src;
								}
								if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
									try {
										CollectGarbage();
									} catch (e) {
									}
								}
							}
						} catch (e) {
						}
					}
				}
			}, {
				iconCls : 'delete',
				handler : function() {
					var index = $scope.index_tabs.tabs('getTabIndex', $scope.index_tabs.tabs('getSelected'));
					var tab = $scope.index_tabs.tabs('getTab', index);
					if (tab.panel('options').closable) {
						$scope.index_tabs.tabs('close', index);
					} else {
						$.messager.alert('提示', '[' + tab.panel('options').title + ']不可以被关闭！', 'error');
					}
				}
			} ]
		});
		
		
		$scope.index_tabsMenu = $('#index_tabsMenu').menu({
			onClick : function(item) {
				var curTabTitle = $(this).data('tabTitle');
				var type = $(item.target).attr('title');

				if (type === 'refresh') {
					$scope.index_tabs.tabs('getTab', curTabTitle).panel('refresh');
					return;
				}

				if (type === 'close') {
					var t = $scope.index_tabs.tabs('getTab', curTabTitle);
					if (t.panel('options').closable) {
						$scope.index_tabs.tabs('close', curTabTitle);
					}
					return;
				}

				var allTabs = $scope.index_tabs.tabs('tabs');
				var closeTabsTitle = [];

				$.each(allTabs, function() {
					var opt = $(this).panel('options');
					if (opt.closable && opt.title != curTabTitle && type === 'closeOther') {
						closeTabsTitle.push(opt.title);
					} else if (opt.closable && type === 'closeAll') {
						closeTabsTitle.push(opt.title);
					}
				});

				for ( var i = 0; i < closeTabsTitle.length; i++) {
					$scope.index_tabs.tabs('close', closeTabsTitle[i]);
				}
			}
		});

	};
	

	 $scope.init_north=function(){
		 
		 $('#btn_skin').menubutton({
         iconCls: 'cog',
          menu: '#layout_north_pfMenu'
         });
		 
		 $('#btn_logout').menubutton({
	         iconCls: 'cog',
	          menu: '#layout_north_zxMenu'
	      });
		$("#btn_coll").linkbutton({
			plain:true
		});

		 
		
		var jQueryWeatherConfig = {
			lang : {
				day : '白天',
				night : '夜晚',
				temp : '°C',
				wind : '级风',
				wangzimo : '12shu'
			},
			convert : function(sky){
				var weatherInfo = {
						cloudy 		: ['多云','多云转阴','晴转多云','阴转多云'],
						overcast	: ['阴','雾','沙尘暴','浮尘','扬沙','强沙尘暴'],
						rainy		: ['多云转小雨','小雨转多云','小雨','中雨','大雨','暴雨','大暴雨','特大暴雨','冻雨','小雨转中雨','中雨转大雨','大雨转暴雨','暴雨转大暴雨','大暴雨转特大暴雨','阵雨','雷阵雨','雷阵雨伴有冰雹'],
						sleet		: ['雨夹雪'],
						snow		: ['阵雪','小雪','中雪','大雪','暴雪','小雪转中雪','中雪转大雪','大雪转暴雪','中雪转小雪','大雪转中雪','暴雪转大雪'],
						sunshine	: ['晴']
					},
					weather = '',
					state = '';
				for( state in weatherInfo ){
					if( $.inArray( sky , weatherInfo[state] ) > -1 ){
						weather = state;
						break;
					}
				} 
				return weather || state || 'sunshine'  ;
			}
		};

			
		/*	$.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=&charset=utf-8', function(){
				//window.SWther 这是返回的天气情况
				var city, dataInfo = window.SWther.w ;
				for( var city in dataInfo ); //获取 天气
				dataInfo = dataInfo[city][0];
				//jQueryWeatherConfig 
				var weatherData = {
					city : city ,
					date : SWther.add.now.split(' ')[0] || '',
					day_weather: dataInfo.s1,
					night_weather :dataInfo.s2,
					day_temp: dataInfo.t1,
					night_temp: dataInfo.t2,
					day_wind:dataInfo.p1,
					night_wind: dataInfo.p2
				};
				
				var hour = (new Date( SWther.add.now )).getHours();
				var sky = hour > 18 ? weatherData.day_weather : weatherData.night_weather ;
				var weatherBox = $('#debug').weather({ sky : jQueryWeatherConfig.convert( sky ), weatherData : weatherData , config : jQueryWeatherConfig });
				  
				//weatherBox 是 整个天气图标的跟节点的 jQuery ，所以可以直接操作，可以自己随意扩展效果。

			});

		*/	/**
			 * 更换EasyUI主题的方法
			 */
			  $scope.changeThemeFun=function(themeName) {
				
				if ($.cookie('easyuiThemeName')) {
					
					$('#layout_north_pfMenu').menu(
						'setIcon',
					    {
								target : $('#layout_north_pfMenu div[title='
										+ $.cookie('easyuiThemeName') + ']')[0],
								iconCls : 'emptyIcon'
						});
				}
				
				
				$('#layout_north_pfMenu').menu('setIcon', {
					target : $('#layout_north_pfMenu div[title=' + themeName + ']')[0],
					iconCls : 'tick'
				});
				var $easyuiTheme = $('#easyuiTheme'); //_css.html
				var url = $easyuiTheme.attr('href');
				var href = url.substring(0, url.indexOf('themes')) + 'themes/'
						+ themeName + '/easyui.css';
				$easyuiTheme.attr('href', href);

				var $iframe = $('iframe');
				if ($iframe.length > 0) {
					for ( var i = 0; i < $iframe.length; i++) {
						var ifr = $iframe[i];
						try {
							$(ifr).contents().find('#easyuiTheme').attr('href', href);
						} catch (e) {
							try {
								ifr.contentWindow.document
										.getElementById('easyuiTheme').href = href;
							} catch (e) {
							}
						}
					}
				}

				$.cookie('easyuiThemeName', themeName, {
					expires : 7
				});

			};

			 $scope.logout=function() {
					location.replace(PATH+'/loginOut');
			}
		};

			
	 $scope.init_east= function(){
			
		 $('#layout_east_calendar').calendar({
			fit : true,
			current : new Date(),
			border : false,
			onSelect : function(date) {
				$(this).calendar('moveTo', new Date());
			}
		 } );

		 $('#layout_east_onlinePanel').panel({
			tools : [ {
				iconCls : 'database_refresh',
				handler : function() {
					
				}
			} ]
		  });
		}

	 $scope.init_west=function(){
	
		 
			 // 加入 url tree 
		    var layout_west_tree_url = PATH+'/system/res/tree';
			
				  $('#layout_west_tree').tree({
					url : layout_west_tree_url,
					parentField : 'pid',
					lines : true,
					onClick : function(node) {
						if (node.attributes && node.attributes.url) {
							var url;
							if (node.attributes.url.indexOf('/') == 0) {/*如果url第一位字符是"/"，那么代表打开的是本地的资源*/
								url = PATH+ node.attributes.url;
								if (url.indexOf('/druid') == -1 &&url.indexOf('/monitoring') == -1&&url.indexOf('/error') == -1) {/*如果不是druid相关的控制器连接，那么进行遮罩层屏蔽*/
									parent.$.messager.progress({
										title : '提示',
										text : '数据处理中，请稍后....'
							 		});
								}
								
							} else {/*打开跨域资源*/	
								url = node.attributes.url;
								}
							addTab({
								url : url,
								title : node.text,
								iconCls : node.iconCls
							});
						}
					},
					onBeforeLoad : function(node, param) {
					 
						if (layout_west_tree_url) {//只有刷新页面才会执行这个方法
							parent.$.messager.progress({
								title : '提示',
								text : '数据处理中，请稍后....'
							});
						}
					},
				 	onLoadSuccess : function(node, data) {
				 	
						parent.$.messager.progress('close');
					}
				});

			function addTab(params) {
			
				var iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:98%;" ></iframe>';

				// if http url  jia js close
			    if(params.url&&params.url.indexOf('http') == 0){
			    iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:98%;" security="restricted" sandbox="" ></iframe>';
				}
			    
				var t = $('#index_tabs');
				var opts = {
					title : params.title,
					closable : true,
					iconCls : params.iconCls,
					content : iframe,
					border : false,
					fit : true
				};
				if (t.tabs('exists', opts.title)) {
					t.tabs('close', opts.title);
					t.tabs('add', opts);
				} else {
					t.tabs('add', opts);
				}
				
				//parent.$.messager.progress('close');
			}
			
		};
	
} ]);










 

