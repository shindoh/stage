$.stage.component = {};

/*
 *
 * @listview
 * 
 * @parameters
 * 	   eleId : listview element id
 *     tmpId : script element id
 *       url : target url (get method type)
 *    params : get parameters (json type)
 *      func : callback function
 *   options : (json type, can be omitted)
 *              -listIndex (default 0)
 *              -listCount (default 25)
 *              -autoLoad  (default true)
 *             
 */
$.stage.component.listview = function(eleId,tmpId,url,params,func,options)
{
	var listIndex = 0;
	var listCount = 25;
	var autoLoad = true;
	if(options)
	{
		if(options.listIndex)
			listIndex = options.listIndex;
		if(options.listCount)
			listCount = options.listCount;
		if(options.autoLoad==false)
			autoLoad = false;
	}
	console.log("autoLoad : "+autoLoad);
	$.mobile.showPageLoadingMsg("b", "loading...", true);
	
	if(!params)
	{
		var params={};				
	}
	params.listIndex = listIndex;
	params.listCount = listCount; ///난 이부분 위의 if 안에만 들어가면 
								////param이 null이 아닐때는 object 처리만 해서 넣어주면 될것 같애.
	$.stageAjax.getJson(url,params,function(result){
		var listData = result.list;
		var list = $('#'+eleId);
		$('#'+tmpId).tmpl(listData).appendTo(list);
		list.listview("refresh");
		func();
		$.mobile.hidePageLoadingMsg();
	},true);
	
	if(autoLoad)
	{
		$('#'+eleId).bind("scrollstop",function(){
			var yDistance = $(window).scrollTop();
			var height = $(window).height();
			if($(document).height()-40 < (yDistance+height))
			{
				$.mobile.showPageLoadingMsg("b", "loading...", true);
				params.listIndex += listCount;
				params.listCount = listCount;		
				$.stageAjax.getJson(url,params,function(result){
					var listData = result.list;
					var list = $('#'+eleId);
						
					$('#'+tmpId).tmpl(listData).appendTo(list);
					list.listview("refresh");
					func();
					$.mobile.hidePageLoadingMsg();
				},true);
			}
		});		
	}

}

/*
*
*
* @infoview
* 
* @parameters
* 	   eleId : infoview element id
*     tmpId : script element id
*       url : target url (get method type)
*    params : get parameters (json type)
*      func : callback function
*   options : (json type, can be omitted)
*              -listIndex (default 0)
*              -listCount (default 25)
*              -autoLoad  (default true)
*             
*/

$.stage.component.infoview = function(eleId,tmpId,url,params,func)
{
	var ID = params;
	$.mobile.showPageLoadingMsg("b", "loading...", true);
	
	///////
	//var params={};	
	//params.userId = ID;
	//parameter에서 ID 객체 생성 구문

	$.stageAjax.getJson(url,params,function(result){
		var infoData = result.data;
		var info = $('#'+eleId);
		$('#'+tmpId).tmpl(infoData).appendTo(info);
		info.listview("refresh"); //리스트뷰를 위한 구문
		func();
		$.mobile.hidePageLoadingMsg();

	},true);
	
}

$.stage.component.infosend = function(eleId,tmpId,url,params,func)
{
	var ID = params;
	$.mobile.showPageLoadingMsg("b", "loading...", true);
	
	///////
	//var params={};	
	//params.userId = ID;
	//parameter에서 ID 객체 생성 구문

	$.stageAjax.postJson(url,params,function(result){
		var infoData = result.data;
		var info = $('#'+eleId);
		$('#'+tmpId).tmpl(infoData).appendTo(info);
		info.listview("refresh"); //리스트뷰를 위한 구문
		func();
		$.mobile.hidePageLoadingMsg();

	},true);
	
}


/*
 * @pass params 
 * 
 * @parameters
 *  jsonParams : send data to move page(type json)
 */
$.stage.component.pageParam = function(jsonParams)
{
	if(jsonParams)
	{
		localStorage.setItem("pageParams",JSON.stringify(jsonParams));		
	}
	return JSON.parse(localStorage.getItem("pageParams"));
}

/*
 * @pagemove
 *
 * @parameters 
 *  	  page : move page (type jquery selector)
 *  jsonParams : send data to move page(type json)
 *     options : jquery options of $.mobile.changePage method required(type json)
 */ 
$.stage.component.pageMove = function(page,jsonParams,options)
{
	if(jsonParams)
	{
		localStorage.setItem("pageParams",JSON.stringify(jsonParams));		
	}

	$.mobile.changePage(page,options);
}


$.stageComponent = $.stage.component;
