/**
 * 
 */
var author_jsondata = "";
var recommand_jsondata = "";
var course_jsondata = "";
var textbookId;
var refer = "";
var textbookMark;
var textbookCollectNum;
var ju;
var whichlayer;
var jdc;
var uploading = false;
var close_index;

//教材查询选择
function select() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if($("#selectContent2").val() != "")
		f += 1;
	if($("#selectName3").val() != "")
		f += 1;
	if(f == 0){
		layer.alert("请输入查询条件");
		return ;
	}
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();
	 var selectName1 = $("#selectName1").val();
	 if(selectName1 == "教材编号：")
		 selectName1 = "JCBH";
	 else if(selectName1 == "教材名称：")
		 selectName1 = "JCMC";
	 else if(selectName1 == "教材作者：")
		 selectName1 = "JCZZ";
	 
	 var selectCondition =  $("#selectCondition").val();
	 if(selectCondition == "等于")
			selectCondition = "=";
	else if(selectCondition == "大于等于")
			selectCondition = ">=";
	else if(selectCondition == "小于等于")
			selectCondition = "<=";
	 
	 var selectName2 = $("#selectName2").val();
	 if(selectName2 == "评分")
		 selectName2 = "PF";
	 else if(selectName2 == "收藏人数")
		 selectName2 = "GZRS";
	 else if(selectName2 == "阅读人数")
		 selectName2 = "YDRS";
	
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 				+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\","
	 				+ "\"selectName2\":\"" + selectName2 + "\","
	 				+ "\"selectCondition\":\"" + selectCondition + "\","
	 				+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findTextbook',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	var mydata = [];
	        	if($("#selectContent2").val() != "" && (selectName2 == "PF" || selectName2 =="GZRS")){
	        		for(var i in jsondata){
	        			course_jsondata = "";
	        			var courselink = "<a onclick='findCourselink("+ jsondata[i][0]  +")'>查看关联课程</a>";
	        			var mark = jsondata[i][13];
	        			if(mark == 0)
	        				mark = "未评分";
	        			 
	        			var str = "{\"textbookId\":\"" + jsondata[i][0] + "\","
				    		+ "\"textbookName\":\"" + jsondata[i][1] + "\","
				    		+ "\"textbookAuthor\":\"" + jsondata[i][6] + "\","
				    		+ "\"textbookPriority\":\"" + jsondata[i][7] + "\","
				    		+ "\"textbookClickNum\":\"" + jsondata[i][15] + "\","
				    		+ "\"textbookAssessmark\":\"" + mark + "\","
				    		+ "\"textbookCollectnum\":\"" + jsondata[i][13] + "\","
				    		+ "\"textbookAndcourse\":\"" + courselink + "\"}";
	        				
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}else {
	        		for(var i in jsondata){	         			
	        			course_jsondata = "";
	        			var courselink = "<a onclick='findCourselink("+ jsondata[i].textbookId  +")'>查看关联课程</a>";
	        			var mark = jsondata[i].textbookAssessmark;
	        			if(mark == 0)
	        				mark = "未评分";
	        			 
	        			var str = "{\"textbookId\":\"" + jsondata[i].textbookId + "\","
				    		+ "\"textbookName\":\"" + jsondata[i].textbookName + "\","
				    		+ "\"textbookAuthor\":\"" + jsondata[i].textbookAuthorName + "\","
				    		+ "\"textbookPriority\":\"" + jsondata[i].textbookPriority + "\","
				    		+ "\"textbookClickNum\":\"" + jsondata[i].textbookClickNum + "\","
				    		+ "\"textbookAssessmark\":\"" + mark + "\","
				    		+ "\"textbookCollectnum\":\"" + jsondata[i].textbookCollectnum + "\","
				    		+ "\"textbookAndcourse\":\"" + courselink + "\"}";
	        				
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	} 
	        	
	        	getTable(mydata);
	        }
	    },
	    error: function(err) {
	    	layer.alert("查询失败");
	    }
	});

}


//用户关联课程选择
function selectCondition() {
	var formData = new FormData();
	var selectName1 = $("#selectName1").val(); 
	if(selectName1 == "教材作者："){
		$.ajax({
	   		url: 'userManageAction_findUserByLevel',
	   	    type: "POST",  
	   	    async: false,  
	   	    cache: false, 
	   	    processData: false,// 告诉jQuery不要去处理发送的数据
	   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	   	    data: formData,
	   	    success: function(data){
	    		if(data != null){
	    			var jsondata = eval('(' + data + ')');
		        	
		        	var mydata = [];
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].userName + "\","
				    		+ "\"Name\":\"" + jsondata[i].userName + "\"}";
	        				
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        		
	        		$("#selectContent1").combobox('loadData', mydata);
	    		}
	   	    },
	   	    error: function(err) {
	   	    	layer.alert("导入失败，请稍候再试");
	   	    }
	   	});
	}else{
		$.ajax({
	   		url: 'textbookManageAction_showAllTextbook',
	   	    type: "POST",  
	   	    async: false,  
	   	    cache: false, 
	   	    processData: false,// 告诉jQuery不要去处理发送的数据
	   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	   	    data: formData,
	   	    success: function(data){
	    		if(data != null){
	    			var jsondata = eval('(' + data + ')');
		        	
		        	var mydata = [];
	        		for(var i in jsondata){
	        			var str = "";
	        			if(selectName1 == "教材编号：")
		        			str = "{\"ID\":\"" + jsondata[i].textbookId + "\","
					    		+ "\"Name\":\"" + jsondata[i].textbookId + "-" + jsondata[i].textbookName + "\"}";
	        			else if(selectName1 == "教材名称：")
		        			str = "{\"ID\":\"" + jsondata[i].textbookName + "\","
					    		+ "\"Name\":\"" + jsondata[i].textbookName + "\"}";
	        			
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        		
	        		$("#selectContent1").combobox('loadData', mydata);
	    		}
	   	    },
	   	    error: function(err) {
	   	    	layer.alert("导入失败，请稍候再试");
	   	    }
	   	});
	}
}


//教材作者选择
function selectauthor() {
	var formData = new FormData();
	
	$.ajax({
   		url: 'userManageAction_findUserByLevel',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		if(data != null){
    			var jsondata = eval('(' + data + ')');
	        	
	        	var mydata = [];
        		for(var i in jsondata){
        			var str = "{\"ID\":\"" + jsondata[i].userId  + "-" + jsondata[i].userName + "\","
			    		+ "\"Name\":\"" + jsondata[i].userId  + "-" + jsondata[i].userName + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#textbookAuthor").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
}


//添加教材
function add_textbook() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	$("#copy").css("display","none");
	
	$("#textbookName").val("");
	$("#textbookName").focus();
	$("#textbookAuthor").combobox('setValue', null);
	$("#textbookPublic").val("");
	$("#textbookPublictime").val("");
	$("#textbookIntroduce").val("");
	$("#textbookContentFile").val("");
	$("#textbookRephotoFile").val("");
	$("#textbookPhotoFile").val("");
	$("#outline_add").val("");
	$("#reference_add").val("");
	//$("#recommand").val("不推荐");
	$("#textbookPriority").val("");
		        	
	selectauthor();
	addlock();
}


//教材提交
function submit_textbook() {
	// 首先封装一个方法 传入一个监听函数 返回一个绑定了监听函数的XMLHttpRequest对象
	var xhrOnProgress = function(fun) {
		xhrOnProgress.onprogress = fun; // 绑定监听
		// 使用闭包实现监听绑
		return function() {
			// 通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
			var xhr = $.ajaxSettings.xhr();
			// 判断监听函数是否为函数
			if (typeof xhrOnProgress.onprogress !== 'function') {
				return xhr;
			}
			// 如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
			if (xhrOnProgress.onprogress && xhr.upload) {
				xhr.upload.onprogress = xhrOnProgress.onprogress;
			}

			return xhr;
		}
	}
	
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	
	 var formData = new FormData();
	 var introduce = $("#textbookIntroduce").val()
	 introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')   //replace(/\s/g, ' ')
	 var f = $("#textbookPriority").val();
	 if(f == "")
		f = 0;
	 var params = "{\"textbookName\":\""+ $("#textbookName").val() +"\","
	 			+"\"textbookIntroduce\":\""+ introduce +"\","
	 			+"\"textbookPublic\":\""+ $("#textbookPublic").val() +"\","
	 			+"\"textbookPublictime\":\""+ $("#textbookPublictime").val() +"\","
	 			+"\"textbookAuthor\":\""+ $("#textbookAuthor").combobox('getValues') +"\","
	 			+"\"textbookPriority\":"+ f +","
	 			+"\"textbookOutline\":\""+ $('#outline_add').val() +"\"}"
	 formData.append("params", params)
	 
	 //formData.append("textbookName",$("#textbookName").val()); 
	 //formData.append("textbookIntroduce",introduce)
	 //formData.append("textbookPublic",$("#textbookPublic").val());
	 //formData.append("textbookPublictime",$("#textbookPublictime").val());
	 //formData.append("textbookAuthor","" + $("#textbookAuthor").combobox('getValues'));//多选框
	 formData.append("Outline", $('#outline_add').val());
	 //formData.append("textbookPriority", f); 
	 formData.append("Reference", $("#reference_add").val());
	 if( $("#textbookContentFile").val()!= "")
		formData.append("ContentFile",$("#textbookContentFile")[0].files[0]);
	if( $("#textbookRephotoFile").val() != "")
		formData.append("RephotoFile",$("#textbookRephotoFile")[0].files[0]);
	if( $("#textbookPhotoFile").val()!= "")
		formData.append("PhotoFile",$("#textbookPhotoFile")[0].files[0]);

	// ajax传输
	$.ajax({
		url: 'fileManageAction_addTextbook',
	    type: "POST",  
	    //async: false,  
	    //cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '教材文件传输进度',
				type : 1,
				shade : 0.5,
				closeBtn: 0,
				//maxmin : true,
				shadeClose : false, // 点击遮罩关闭
				scrollbar : false,
				area : [ '401px', '81px' ],
				content : $('#load')
			// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
			});
		},
		// 进度要调用原生xhr
		xhr : xhrOnProgress(function(evt) {
			var percent = Math.floor(evt.loaded / evt.total * 100);// 计算百分比
			// 设置进度样式
			$('#jdt').css('width', percent * 4 + 'px');
			$('#jdt').css('background', 'skyblue');
			// 显示进度百分比
			$('#jdt').text(percent + '%');
			$('#loaded').text(evt.loaded / 1024 / 1024 + 'M');
			$('#total').text(evt.total / 1024 / 1024 + 'M');
			if (percent == 100)
				layer.close(jdc)
		}),
	    
	    success: function(data){
	        if(data!=null){
	        	refresh_textbook();
	        	cancel_textbook();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}


//编辑教材
function edit_textbook (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	
	addlock();
	$("#tijiao").css("display","none");
	$("#baocun").css("display","");
	$("#deletecontent").css("display","");
	$("#deleterephoto").css("display","");
	$("#deletephoto").css("display","");
	$("#content_see").css("display","");
	$("#top").css("display","");
	$("#copy").css("display","none");
	$("#rephoto_see").css("display","");
	$("#photo_see").css("display","");
	textbookId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + textbookId + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findTextbookId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	        	
	        	$("#textbookName").val(jsondata[0].textbookName);
	        	$("#textbookName").focus();
	        	$("#textbookPublic").val(jsondata[0].textbookPublic);
	        	$("#textbookPublictime").val(jsondata[0].textbookPublictime);
	        	//$("#textbookIntroduce").val(jsondata[0].textbookIntroduce);
	        	var introduce = jsondata[0].textbookIntroduce
	        	introduce = introduce.replace(/<br\/>/g, '\n').replace(/&nbsp/g, ' ')  //replace(/\s/g, ' ')
	        	$("#textbookIntroduce").val(introduce)
	        	$('#outline_add').val(jsondata[0].textbookOutline);
	        	$("#textbookPriority").val(jsondata[0].textbookPriority);
	        
	        	var str = jsondata[0].textbookAuthor.split(",");
	        	var s = jsondata[0].textbookAuthorName.split(",");
	        	
	        	if(str != ""){
	        		var string = "";
	        		for(var i=0; i<str.length; i++){
		        		if(i == 0){
		        			string += str[i] + "-" + s[i];
		        		}else {
		        			string += "," + str[i] + "-" + s[i];
		        		}
		        	}
	        		$("#textbookAuthor").combobox('setValue', string);
	        	}
	        	
	        	findReference(textbookId);
	        	selectauthor();
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}

//更新教材
function update_textbook(){
	// 首先封装一个方法 传入一个监听函数 返回一个绑定了监听函数的XMLHttpRequest对象
	var xhrOnProgress = function(fun) {
		xhrOnProgress.onprogress = fun; // 绑定监听
		// 使用闭包实现监听绑
		return function() {
			// 通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
			var xhr = $.ajaxSettings.xhr();
			// 判断监听函数是否为函数
			if (typeof xhrOnProgress.onprogress !== 'function') {
				return xhr;
			}
			// 如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
			if (xhrOnProgress.onprogress && xhr.upload) {
				xhr.upload.onprogress = xhrOnProgress.onprogress;
			}

			return xhr;
		}
	}
	
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	var formData = new FormData();	
	var introduce = $("#textbookIntroduce").val()
	introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')
	var f = $("#textbookPriority").val();
	if (f == "")
		f = 0;
	
	var params = "{\"textbookName\":\""+ $("#textbookName").val().toString() +"\","
				+"\"textbookIntroduce\":\""+ introduce +"\","
				+"\"textbookId\":"+ textbookId +","
				+"\"textbookPublic\":\""+ $("#textbookPublic").val() +"\","
				+"\"textbookPublictime\":\""+ $("#textbookPublictime").val() +"\","
				+"\"textbookAuthor\":\""+ $("#textbookAuthor").combobox('getValues') +"\","
				+"\"textbookPriority\":"+ f +"}"
				//+"\"textbookOutline\":\""+ $('#outline_add').val() +"\"}"
	formData.append("params", params)
	//formData.append("textbookId",textbookId);
	//formData.append("textbookName",$("#textbookName").val());
	//formData.append("textbookAuthor","" + $("#textbookAuthor").combobox('getValues'));//多选框
	//formData.append("textbookIntroduce",introduce)
	//formData.append("textbookPublic",$("#textbookPublic").val());
	//formData.append("textbookPublictime",$("#textbookPublictime").val());
	//formData.append("textbookPriority",$("#textbookPriority").val());
	formData.append("Outline", $('#outline_add').val());
	formData.append("Reference", $("#reference_add").val()); 
	var flag = 111;
	if( $("#textbookContentFile").val()!= ""){
		flag -= 1;
		formData.append("ContentFile",$("#textbookContentFile")[0].files[0]);
	}
	if( $("#textbookRephotoFile").val() != ""){
		flag -= 10;
		formData.append("RephotoFile",$("#textbookRephotoFile")[0].files[0]);
	}	
	if( $("#textbookPhotoFile").val()!= ""){
		flag -= 100;
		formData.append("PhotoFile",$("#textbookPhotoFile")[0].files[0]);
	}
	formData.append("flag",flag)
	
	
	// ajax传输
	$.ajax({
		url: 'fileManageAction_updateTextbook',
	    type: "POST",  
	    //async: false,  
	    //cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    
	    beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '教材文件传输进度',
				type : 1,
				shade : 0.5,
				closeBtn: 0,
				//maxmin : true,
				shadeClose : false, // 点击遮罩关闭
				scrollbar : false,
				area : [ '401px', '81px' ],
				content : $('#load')
			// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
			});
		},
		// 进度要调用原生xhr
		xhr : xhrOnProgress(function(evt) {
			var percent = Math.floor(evt.loaded / evt.total * 100);// 计算百分比
			// 设置进度样式
			$('#jdt').css('width', percent * 4 + 'px');
			$('#jdt').css('background', 'skyblue');
			// 显示进度百分比
			$('#jdt').text(percent + '%');
			$('#loaded').text(evt.loaded / 1024 / 1024 + 'M');
			$('#total').text(evt.total / 1024 / 1024 + 'M');
			if (percent == 100)
				layer.close(jdc)
		}),
	    
	    success: function(data){
	        if(data!=null){
	        	refresh_textbook();
	        	$("#tijiao").css("display","");
	        	$("#baocun").css("display","none");
	        	$("#content_see").css("display","none");
	        	$("#rephoto_see").css("display","none");
	        	$("#photo_see").css("display","none");
	        	
	        	cancel_textbook();
	        	layer.alert(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}

var copycontent_url = "";
var copyrephoto_url = "";
var copyphoto_url = "";

//克隆教材
/*function copy_textbook (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	
	addlock();
	$("#tijiao").css("display","none");
	$("#baocun").css("display","none");
	$("#copy").css("display","");
	$("#deletecontent").css("display","");
	$("#deleterephoto").css("display","");
	$("#deletephoto").css("display","");
	$("#content_see").css("display","");
	$("#rephoto_see").css("display","");
	$("#photo_see").css("display","");
	$("#top").css("display","");
	textbookId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + textbookId + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findTextbookId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	        	
	        	$("#textbookName").val(jsondata[0].textbookName);
	        	$("#textbookName").focus();
	        	$("#textbookPublic").val(jsondata[0].textbookPublic);
	        	$("#textbookPublictime").val(jsondata[0].textbookPublictime);
	        	$("#textbookIntroduce").val(jsondata[0].textbookIntroduce);
	        	$('#outline_add').val(jsondata[0].textbookOutline);
	        	$("#textbookPriority").val(jsondata[0].textbookPriority);
	        	copycontent_url = jsondata[0].textbookContent;
	        	copyrephoto_url = jsondata[0].textbookRephoto;
	        	copyphoto_url = jsondata[0].textbookPhoto;
	        	
	        	findReference(textbookId);
	        	selectauthor();
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//教材克隆保存
function copysave_textbook(){
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	var formData = new FormData();	 
	formData.append("textbookId",textbookId);
	formData.append("textbookName",$("#textbookName").val());
	formData.append("textbookAuthor","" + $("#textbookAuthor").combobox('getValues'));//多选框
	formData.append("textbookIntroduce",$("#textbookIntroduce").val());
	formData.append("textbookPublic",$("#textbookPublic").val());
	formData.append("textbookPublictime",$("#textbookPublictime").val());
	
	var flag = 111;
	if( $("#textbookContentFile").val()!= ""){
		flag -= 1;
		formData.append("textbookContentFile",$("#textbookContentFile")[0].files[0]);
	}else {
		formData.append("textbookContent", copycontent_url);
	}
	if( $("#textbookRephotoFile").val() != ""){
		flag -= 10;
		formData.append("textbookRephotoFile",$("#textbookRephotoFile")[0].files[0]);
	}else {
		formData.append("textbookRephoto", copyrephoto_url);
	}	
	if( $("#textbookPhotoFile").val()!= ""){
		flag -= 100;
		formData.append("textbookPhotoFile",$("#textbookPhotoFile")[0].files[0]);
	}else {
		formData.append("textbookPhoto", copyphoto_url);
	}
	var params = "" + flag;
	formData.append("params",params)
	var textbookOutline = $('#outline_add').val();
	formData.append("textbookOutline", textbookOutline);
	formData.append("textbookReference", $("#reference_add").val()); 
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_copyTextbook',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_textbook();
	        	
	        	cancel_textbook();
	        	layer.alert("克隆成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("克隆失败，请稍候再试");
	    }
	});
}*/

//优先级置顶
function set_top(){
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#textbookPriority").val(data);
	        	//refresh_news();	        	
	        	//cancel_news();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_textbook() {
	//$("#textbookId").val("");   //jqury
	$("#textbookName").val("");   
	$("#textbookAuthor").combobox('setValue', null);
	$("#textbookPublic").val("");
	$("#textbookPublictime").val("");
	$("#textbookIntroduce").val("");
	$("#textbookContentFile").val("");
	$("#textbookRephotoFile").val("");
	$("#textbookPhotoFile").val("");
	//$("#recommand").val("不推荐");
	$("#reference_add").val("");
	$("#outline_add").val("");
	$("#textbookPriority").val("");
	
	
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display","none");
	$("#deletecontent").css("display","none");
	$("#deleterephoto").css("display","none");
	$("#deletephoto").css("display","none");
	$("#top").css("display","none");
	$("#copy").css("display","none");
	$("#content_see").css("display","none");
	$("#rephoto_see").css("display","none");
	$("#photo_see").css("display","none");
	removelock();
	layer.close(whichlayer);
}


//删除教材
function delete_textbook (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	textbookId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除教材',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#textbookdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}

function deleteconfirm(){
	var formData = new FormData();
	formData.append("textbookId",textbookId);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_deleteTextbook',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_textbook();
	        	layer.alert("删除成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败");
	    }
	});
	
}



//教材大纲录入
$('#outline_add').on('click', function() {
	layer.open({
		title : '教材目录',
		type : 2,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		area : [ '850px', '700px' ],
		skin: 'layui-layer-molv',
		content : 'textbook_outline.html'
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

//教材大纲预览
$('#outline_see').on('click', function() {
	layer.open({
		title : '教材目录',
		type : 2,
		shade : 0.5,
		maxmin : true,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin: 'layui-layer-molv',
		area : [ '850px', '700px' ],
		content: 'textbook_outline.html'		
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

//教材参考文献录入
var whichlayer;
$('#reference_add').on('click', function() {
	whichlayer = layer.open({
		title : '教材参考文献',
		type : 2,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '1000px', '700px' ],
		//content : $('#reference')
		content : 'textbook_reference.html'
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

//教材参考文献保存
/*
function referencesave(){
	var trList = $("#jqGrid2").find("tr");

	var object = [];
    for (var i=1;i<trList.length;i++) {
        var tdArr = trList.eq(i).find("td");
        var referenceSeq = tdArr.eq(0).text();
        var referenceAuthor = tdArr.eq(1).text();
        var referenceName = tdArr.eq(2).text();
        var referenceClass = tdArr.eq(3).text();
        var referencePublicadd = tdArr.eq(4).text();
        var referencePublic = tdArr.eq(5).text();
        var referencePublictime = tdArr.eq(6).text(); 
        
        var str = "{\"referenceSeq\":\"" + referenceSeq + "\"," +
        		"\"referenceAuthor\":\"" + referenceAuthor +"\"," +
        		"\"referenceName\":\"" + referenceName +"\"," +
        		"\"referenceClass\":\"" + referenceClass +"\"," +
        		"\"referencePublic\":\"" + referencePublic +"\"," +
        		"\"referencePublicadd\":\"" + referencePublicadd +"\"," +
        		"\"referencePublictime\":\"" + referencePublictime +"\"}";

        var json = eval('(' + str + ')');
        object.push(json);
    }
    
}*/

//教材参考文献预览
$('#reference_see').on('click', function() {
	layer.open({
		title : '教材参考文献',
		type : 2,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin: 'layui-layer-molv',
		area : [ '850px', '700px' ],
		content: 'textbook_reference.html'
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

//教材内容预览
$('#content_see').on('click', function() {
	var formData = new FormData();
	formData.append("textbookId", textbookId);
	
	// ajax传输
   	$.ajax({
   		url: 'textbookManageAction_findTextbookId',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
   	    	if(data != null){
   	    		var jsonData = eval('(' + data + ')');
   	    		//var url = "http://localhost:8080/NCS/" + jsonData[0].textbookContent;
   	    		var url = jsonData[0].textbookContent;
   	    		if(url == ""){
   	    			layer.alert("该教材暂无内容，请导入后保存！")
   	    			return;
   	    		}
   	    		var url2 = url.replace("192.168.20.72:59141", "10.73.94.81:8011")
   	    		
   	    		layer.open({
   	    			title : '教材内容',
   	    			type : 2,
   	    			shade : 0.5,
   	    			maxmin : true,
   	    			shadeClose : false, //点击遮罩关闭
   	    			scrollbar : false,
   	    			area : [ '850px', '700px' ],
   	    			content: url2
   	    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
   	    		});
   	    	}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});

//教材推荐图预览
$('#rephoto_see').on('click', function() {
	var formData = new FormData();
	formData.append("textbookId", textbookId);
	
	// ajax传输
   	$.ajax({
   		url: 'textbookManageAction_findTextbookId',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var rephoto_url = "http://localhost:8080/NCS/" + jsonData[0].textbookRephoto;
    		var rephoto_url = jsonData[0].textbookRephoto;

    		$("img").attr("src", rephoto_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '教材推荐图',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
    			area : [ '717px', '580px' ],
    			content: $('#rephoto')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});

//教材缩略图预览
$('#photo_see').on('click', function() {
	var formData = new FormData();
	formData.append("textbookId", textbookId);
	
	// ajax传输
   	$.ajax({
   		url: 'textbookManageAction_findTextbookId',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var photo_url = "http://localhost:8080/NCS/" + jsonData[0].textbookPhoto;
    		var photo_url = jsonData[0].textbookPhoto;
    		$("img").attr("src", photo_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '教材缩略图',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
    			//area : [ '450px', '650px' ],
    			area : [ '717px', '580px' ],
    			content: $('#photo')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});


function deleteContent(){
	var formData = new FormData();
	formData.append("textbookId",textbookId);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_deleteContent',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("教材内容删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("教材内容删除失败");
	    }
	});
}



function deleteRephoto(){
	var formData = new FormData();
	formData.append("textbookId",textbookId);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_deleteRephoto',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("教材推荐图删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("教材推荐图删除失败");
	    }
	});
}


function deletePhoto(){
	var formData = new FormData();
	formData.append("textbookId",textbookId);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_deletePhoto',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("教材缩略图删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("教材缩略图删除失败");
	    }
	});
}



//根据ID从user_info表里面提取用户姓名
function findauthor(id){
	var formData = new FormData();
	formData.append("textbookId",id);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findUserNameById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	author_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据ID从relate_info表里面提取课程
function findcourse(id){
	var formData = new FormData();
	var params ="{\"textbookId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'relateManageAction_findCourseBytextbookId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	//course_jsondata = $.parseJSON(data);
	        	var json= $.parseJSON(data);
	        	for(var i=0; i<json.length; i++){
	        		if(i != 0)
	        			course_jsondata += ",";
	        		course_jsondata += json[i][0] + "-" + json[i][1];
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据ID从recommand_info表里面提取推荐等级
function findrecommand(id){
	var formData = new FormData();
	formData.append("textbookId",id);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findRecommandById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){  	
	        if(data!=null){
	        	recommand_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

function findReference(id) {
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'referenceManageAction_findReference',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);

	        	$('#reference_add').val(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据教材ID计算课程的平均评分
function averageMark(id){
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + id +"\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'assessManageAction_averageMarkByTextbookId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data != null){
	        	textbookMark = data;
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//根据教材ID计算课程的收藏人数
function collectNum(id){
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + id +"\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'collectManageAction_collectNumByTextbookId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){	
	        	textbookCollectNum = data;
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

function judge() {
	var name = $("#textbookName").val();
	if(name == ""){
		ju = 1;
		layer.alert("教材名不能为空，请重新输入！")
		return ;
	}
	
	var name1 = $("#textbookRephotoFile").val();
	if(name1 != "")
		var file1 = $("#textbookRephotoFile")[0].files[0].size;
		if(file1 > 3145728){
		ju = 1;
		layer.alert("推荐图大于3M，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#textbookPhotoFile").val();
	if(name2 != "")
		var file2 = $("#textbookPhotoFile")[0].files[0].size;
		if(file2 > 3145728){
		ju = 1;
		layer.alert("缩略图大于3M，请重新选择！");
		return ;
	}
}


$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	updateAssessAndCollect();
	refresh_textbook();
	selectCondition()
});


//刷新数据显示表
function refresh_textbook(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_showAllTextbook',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	var mydata = [];
      		for(var i in jsondata){       			
       			course_jsondata = "";
       			
       			var courselink = "<a onclick='findCourselink("+ jsondata[i].textbookId  +")'>查看关联课程</a>";
       			var mark = jsondata[i].textbookAssessmark;
      			if(mark == 0)
      				mark = "未评分";
      			 
      			var str = "{\"textbookId\":\"" + jsondata[i].textbookId + "\","
			    		+ "\"textbookName\":\"" + jsondata[i].textbookName + "\","
			    		+ "\"textbookAuthor\":\"" + jsondata[i].textbookAuthorName + "\","
			    		+ "\"textbookPriority\":\"" + jsondata[i].textbookPriority + "\","
			    		+ "\"textbookClickNum\":\"" + jsondata[i].textbookClickNum + "\","
			    		+ "\"textbookAssessmark\":\"" + mark  + "\","
			    		+ "\"textbookAndcourse\":\"" + courselink + "\","
			    		+ "\"textbookCollectnum\":\"" + jsondata[i].textbookCollectnum + "\"}";
      				
      			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
	        	
      			getTable(mydata);
	        }
	    },
	    error: function(err) {
	    	layer.alert("刷新失败");
	    }
	});
}


//更新教材表中的评分和收藏数v1.2
function updateAssessAndCollect(){
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_updateAssessAndCollect',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	       
	    },
	    error: function(err) {
	    	layer.alert("更新失败");
	    }
	});
}

function getTable(mydata) {
	$("#table_list_2").jqGrid('clearGridData');  //清空表格
	$("#table_list_2").jqGrid('setGridParam',{  // 重新加载数据
	      datatype:'local',
	      data : mydata,   
	}).trigger("reloadGrid");
	$("#table_list_2").jqGrid(
	{
		data:mydata,
		datatype:"local",
		height:450,
		autowidth:true,
		shrinkToFit:true,
		rowNum:20,
		rowList:[10,20,30],
		colNames:["教材编号","教材名称","作者","评分","观看人数","收藏人数","优先级"],
		colModel:[
		          {name:"textbookId",index:"textbookId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"textbookName",index:"textbookName",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"textbookAuthor",index:"textbookAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"textbookAssessmark",index:"textbookAssessmark",editable:true,width:70,align:"left",sorttype:"double"},//,formatter:"number"
		          {name:"textbookClickNum",index:"textbookClickNum",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"textbookCollectnum",index:"textbookCollectnum",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"textbookPriority",index:"textbookPriority",editable:true,width:70,align:"left",sorttype:"int"},
		          //{name:"textbookAndcourse",index:"textbookAndcourse",editable:true,width:150,align:"left",sorttype:"string"},
		          ],
		pager:"#pager_list_2",
		viewrecords:true,
		caption:false,
		add:true,
		edit:true,
		addtext:"Add",
		edittext:"Edit",
		hidegrid:false});
	$(window).bind("resize",function(){
		var width=$(".jqGrid_wrapper").width();
		$("#table_list_2").setGridWidth(width)})
}



//保存教材评分
function saveMark(id, mark){
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + id + "\",\"textbookMark\":\"" + mark + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_saveTextbookAverageMark',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){  	
	        if(data!=null){
	        	
	        }
	    },
	    error: function(err) {
	    	layer.alert("刷新失败");
	    }
	});
}

//保存教材收藏人数
function saveCollectNum(id, num){
	var formData = new FormData();
	var params = "{\"textbookId\":\"" + id + "\",\"textbookCollectNum\":\"" + num + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_saveTextbookCollectNum',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){  	
	        if(data!=null){
	        	
	        }
	    },
	    error: function(err) {
	    	layer.alert("刷新失败");
	    }
	});
}

function addlock(){
	$("#tianjia").attr("disabled",true);
	$("#shanchu").attr("disabled",true);
	$("#bianji").attr("disabled",true);
	$("#shuaxin").attr("disabled",true);
	$("#kelong").attr("disabled",true);
}

function removelock(){
	$("#tianjia").attr("disabled",false);
	$("#shanchu").attr("disabled",false);
	$("#bianji").attr("disabled",false);
	$("#shuaxin").attr("disabled",false);
	$("#kelong").attr("disabled",false);
}

//findcourse(jsondata[i].textbookId);
function findCourselink(id){
	course_jsondata = "";
	findcourse(id);
	
	if(course_jsondata != "")
		layer.alert(course_jsondata,{title: '关联课程'});
	else
		layer.alert("无关联课程",{title: '关联课程'});
}





