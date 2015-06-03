//window.name ="NG_DEFER_BOOTSTRAP!";
//init =false;
MainApp.controller('ContentCtrls', [ '$scope', function($scope) {
	
    $scope.load=function(){
	    
 	      $('#portalLayout').layout({
				fit : true
			});
			$(window).resize(function() {
				$('#portalLayout').layout('panel', 'center').panel('resize', {
					width : 1,
					height : 1
				});
			});
			
		  $scope.panels = [
	            {
	          	id : 'p1',
		        title : 'log',
		        collapsible : true,
		        height : 250,
		        closable: true,
		        href : PATH+'/rh?to=log'
	            },
			      {
				id : 'p2',
				title : 'bug',
				collapsible : true,
				closable: true,
				href : PATH+'/rh?to=bug'
		     	}
			, {
				id : 'p3',
				title : 'msg',
				closable: true,
				 height : 320,
				collapsible : true,
				href : PATH+'/index/msg/list'
			}, {
				id : 'p4',
				title : 'about',
				collapsible : true,
				closable: true,
				href : PATH+'/rh?to=about'
			},
			{
			id : 'p5',
			title : 'chart',
			collapsible : true,
			closable: true,
			href : PATH+'/rh?to=chart'
		     }
			
			];

			 $('#portal').portal({
				border : false,
				fit:true,
				onStateChange : function() {
					$.cookie('portal-state', $scope.getPortalState(), {
						expires : 7
					});
				}
			});
			
			var state = $.cookie('portal-state');
			
			if (!state) {
				state = 'p4,p2,p5:p1,p3';/*冒号代表列，逗号代表行*/
			}
			$scope.addPortalPanels(state);
			$('#portal').portal('resize');
 	   
    } ;
    

	  $scope.sendMsg=function(){
		  var msg =$('#msg').val();
		  $.post(PATH+'/index/msg/add',{'msg.msg':msg},function(result){
			  if(result.code==200){
				  $(".chats li").first().remove();
				   $('.chats').append("<li class='by-me'><div class='avatar pull-left'><img src=PATH+'${session.user.attrs['icon']!}'  /></div><div class='chat-content'><div class='chat-meta'>${session.user.name!} <span class='pull-right'>1分钟前</span></div>"+msg+"<div class='clearfix'></div></div>");
			  }
			  else{
				  $.messager.show({
		                title:'error',
		                msg:result.msg,
		                showType:'show'
		            });
			  }
			  
		  },'json');
		};
		
		$scope.getPanelOptions=function(id) {
			
			for ( var i = 0; i <  $scope.panels.length; i++) {
				if ( $scope.panels[i].id == id) {
					return  $scope.panels[i];
				}
			}
			return undefined;
		};
		$scope.getPortalState=function() {
			var aa = [];
			for ( var columnIndex = 0; columnIndex < 2; columnIndex++) {
				var cc = [];
				var panels = $('#portal').portal('getPanels', columnIndex);
				for ( var i = 0; i < panels.length; i++) {
					cc.push(panels[i].attr('id'));
				}
				aa.push(cc.join(','));
			}
			return aa.join(':');
		};
		
		$scope.addPortalPanels=function(portalState) {
			var columns = portalState.split(':');
			for ( var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
				var cc = columns[columnIndex].split(',');
				for ( var j = 0; j < cc.length; j++) {
					var options = $scope.getPanelOptions(cc[j]);
					if (options) {
						var p = $('<div/>').attr('id', options.id).appendTo('body');
						p.panel(options);
						$('#portal').portal('add', {
							panel : p,
							columnIndex : columnIndex
						});
					}
				}
			}
       };
	
   
	
	
	
} ]);
