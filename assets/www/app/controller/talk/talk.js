$("#talkListPage").on("pageshow",function(){
	$.stageComponent.listview("talkList","talkItemTpl",$.stageRestPool.GET_TALK_LIST,null,function(){
		$('#talkList > li').bind("tap",function(){
			var jsonParams = {
				talkIdx : $(this).attr('data-messageId')
			};

			$.stageComponent.pageMove("#talkSubListPage",jsonParams, { transition: "slideup"});
		});			
	},{
		listIndex : 0,
		listCount : 10
	});		
});
