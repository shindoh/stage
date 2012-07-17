	
	$.stage.ajax = {};
	
	$.stage.ajax.getJson = function(url,params,successFunc,isLogOnCosole)
	{
		var ajax = new XMLHttpRequest();
		var resultParams="";
		var tmpUrl = url;
		if(params)
		{
			url+="?";
			for(var key in params)
			{
				url+=key+"="+params[key];
				url+="&";
			}		
			url = url.substring(0, url.length-1);
			resultParams = url.substring(tmpUrl.length+1, url.length-1);
		}
		
		if(isLogOnCosole)
		{
			console.log("method : GET");
			console.log("url : "+url);			
			console.log("params : "+resultParams);
			console.log("open...");
		}
				
	
		ajax.open("GET",url,true);
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4 && (ajax.status==200||ajax.status==0)){
				var data = eval("(" + ajax.responseText + ')');
				successFunc(data);
				if(isLogOnCosole)
				{
					console.log("end...");
					resultTmpData = data;
				}				
			}
		};		
		ajax.send();
	};
	
	$.stage.ajax.postJson = function(url,params,successFunc,isLogOnCosole)
	{
		var ajax = new XMLHttpRequest();
		var resultParams="";
		if(params)
		{
			for(var key in params)
			{
				resultParams+=key+"="+params[key];
				resultParams+="&";
			}		
			resultParams = resultParams.substring(0, resultParams.length-1);
			
		}		
		
		if(isLogOnCosole)
		{
			console.log("method : POST");
			console.log("url : "+url);			
			console.log("params : "+resultParams);
			console.log("open...");
		}
		
		ajax.open("POST",url,true);
		ajax.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		ajax.setRequestHeader("Pragma","no-cache");   		
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"); 
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4 && (ajax.status==200||ajax.status==0)){
				var data = eval("(" + ajax.responseText + ')');
				successFunc(data);
				if(isLogOnCosole)
				{
					console.log("end...");
					resultTmpData = data;
				}

			}
		};		
		ajax.send(resultParams);
	};	
	
	
	/*
	 * required : jquery-x.js
	 * 			  phonegap-x.js 
	 * 
	 * 	 params : imageUrl(required)
	 * 	 description : flickrUploadFinish ȣ�� �� 'flickrUploadFinish'�̺�Ʈ�� ��Ƽ� 
	 * 				   FI.photoURL�� ȣ���Ͽ� Flickr�� ���ε尡 �Ϸ�� �ش��̹����� url�� �����ͼ� ����Ѵ�.
	 */
	FlickrInstance = function(){
		this.api_key = "104cbf46f6344b76e544c0823454ed1f",
		this.secretKey = "d074819899c12331",
		this.auth_token = "72157628937567693-2e6fe47d92903af2",
		this.format = 'json'
		this.imageURI = "";	
	    this.frob="";
	    this.photoUrl="";
	};
	
	var FI = new FlickrInstance();
	
	$.stage.ajax.uploadPhotoToFlickr = function(imageURI)	//imageURI�� Phonegap�� navigator.camera.getPicture�� �̿��ؼ� ������ ���õ� �̹����� ����(����̽�)���
	{
		FI.imageURI = imageURI;
		FI.photoURL = "";
		FI.frob = "";
		proc();
	};
		
		proc = function()
		{
			var url = "http://api.flickr.com/services/rest/";
			var method = "flickr.auth.getFrob";
			var api_sig = MD5(FI.secretKey+"api_key"+FI.api_key+"format"+FI.format+"method"+method);
			
			var params  = {
				method : method,
				format : FI.format,
				api_key : FI.api_key,
				api_sig : api_sig
			};
	
			$.ajaxGetJson(url,params,function(data){
				if(data.stat=="ok")
				{
					FI.frob = data.frob._content;
					uploadPhotoToFlickr();
				}
				else
				{
					console.log("frob error");
				}
			});
		};
			
		uploadPhotoToFlickr = function()
		{
	        var options = new FileUploadOptions();
	        options.fileKey="photo";
	        options.fileName=FI.imageURI.substr(FI.imageURI.lastIndexOf('/')+1);
	        options.mimeType="image/jpeg";
	        
			url = "http://api.flickr.com/services/upload/?"
			var api_sig = MD5(FI.secretKey+"api_key"+FI.api_key+"auth_token"+FI.auth_token+"format"+FI.format);	
			
	        var flickrParams = new Object();
	        flickrParams.api_key = FI.api_key;
	        flickrParams.auth_token = FI.auth_token;
	        flickrParams.format = FI.format;
	        flickrParams.api_sig = api_sig;
	        
	        options.params = flickrParams;
	
	        var ft = new FileTransfer();
	        ft.upload(FI.imageURI, url, flickrUploadSuccess, flickrUploadFail, options);        
		}
		
		
	    function StringtoXML(text){
	        if (window.ActiveXObject){
	          var doc=new ActiveXObject('Microsoft.XMLDOM');
	          doc.async='false';
	          doc.loadXML(text);
	        } else {
	          var parser=new DOMParser();
	          var doc=parser.parseFromString(text,'text/xml');
	        }
	        return doc;
	    }
		
	    function flickrUploadSuccess(r) {
	        var xmlDoc = StringtoXML(r.response);
	        var photo_id = xmlDoc.getElementsByTagName("photoid")[0];
			var photo_id = (photo_id.text) ? photo_id.text:photo_id.textContent;            
			var format = "json";
			console.log("photo_id : "+photo_id);			
			
			var url = "http://api.flickr.com/services/rest/"
			var method = "flickr.photos.getInfo";
			var api_sig = MD5(FI.secretKey+"api_key"+FI.api_key+"format"+FI.format+"method"+method+"photo_id"+photo_id);
				
			var params  = {
				method : method,
				format : FI.format,
				api_key : FI.api_key,
				photo_id : photo_id,
				api_sig : api_sig
			};
			
			var photoUrl = $.ajaxGetJson(url,params,function(data){
				if(data.photo)
				{
					var photoId = data.photo.id;
					var farm = data.photo.farm;
					var server = data.photo.server;
					var secret = data.photo.secret;
					var imageFormat = data.photo.originalformat;
					
					var imageUrl = "http://farm"+farm+".static.flickr.com/"+server+"/"+photoId+"_"+secret+"."+imageFormat;
					FI.photoURL = imageUrl;  
					$(document).trigger("flickrUploadFinish");
					FI.imageURI = "";
					FI.photoURL = "";
					FI.frob = "";
				}
				else
				{
					console.log("error");
					FI.imageURI = "";
				} 
			},true);
			
	    }
	
	    function flickrUploadFail(error) {
	        alert("An error has occurred: Code = " = error.code);
			FI.imageURI = "";
			FI.photoURL = "";
			FI.frob = "";
	    }	
	    
		
		jsonFlickrApi = function(data)
		{
			return data;
		}        
    
		$.stageAjax=$.stage.ajax;