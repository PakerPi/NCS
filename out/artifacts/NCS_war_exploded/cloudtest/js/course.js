/**
 * 
 */
var textbook_jsondata = "";
var textbookId_jsondata = "";
var video_jsondata = "";
var videoId_jsondata = "";
var userId_jsondata = "";
var recommand_jsondata = "";
var totalpeople = 0;
var courseId;
var courseMark;
var courseCollectNum;
var ju;
var whichlayer;

//课程查询选择
function select_course() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if($("#selectContent2").val() != "")
		f += 1;
	if(f == 0){
		layer.alert("请输入查询条件");
		return ;
	}
	if(f > 1){
		layer.alert("查询条件过多，请重新输入！");
		return ;
	}
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();
	 var selectName1 = $("#selectName1").val();
	 if(selectName1 == "课程编号：")
		 selectName1 = "KCBH";
	 else if(selectName1 == "课程名称：")
		 selectName1 = "KCMC";
	 else if(selectName1 == "教员：")
		 selectName1 = "JY";
	 
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
	 else if(selectName2 == "总参与人数")
		 selectName2 = "ZCYRS";
	 
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 			+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\","
	 			+ "\"selectName2\":\"" + selectName2 + "\","
	 			+ "\"selectCondition\":\"" + selectCondition + "\","
	 			+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findCourse',
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
	        	if($("#selectContent2").val() != ""){
	        		for(var i in jsondata){
	        			textbook_jsondata = "";
		      			video_jsondata = "";
		      			var textbooklink = "<a onclick='findTextbooklink("+ jsondata[i][0]  +")'>查看关联教材</a>";
		      			var videolink = "<a onclick='findVideolink("+ jsondata[i][0]  +")'>查看关联视频</a>";
	        			var mark = jsondata[i][13];
	        			if(mark == 0)
	        				mark = "未评分";
	        			var totalpeople = jsondata[i][12];
	        			totalpeople = totalpeople * 1 + 10000 * 1; 
	        			
	        			 var str = "{\"courseId\":\"" + jsondata[i][0] + "\","
				    		+ "\"courseName\":\"" + jsondata[i][1] + "\","
				    		+ "\"courseAuthor\":\"" + jsondata[i][4] + "\","
				    		+ "\"courseMark\":\"" + mark + "\","
				    		+ "\"coursePeople\":\"" + jsondata[i][10] + "\","
				    		+ "\"courseTotalpeople\":\"" + totalpeople + "\","
				    		+ "\"courseAndtextbook\":\"" + textbooklink + "\","
				    		+ "\"courseAndvideo\":\"" + videolink + "\","
				    		+ "\"courseCollectnum\":\"" + jsondata[i][11] + "\"}";
	        				
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}else {
	        		for(var i in jsondata){
	        			textbook_jsondata = "";
	        			video_jsondata = "";
	        			var textbooklink = "<a onclick='findTextbooklink("+ jsondata[i].courseId  +")'>查看关联教材</a>";
		      			var videolink = "<a onclick='findVideolink("+ jsondata[i].courseId  +")'>查看关联微课</a>";
	        			var mark = jsondata[i].courseMark;
	        			if(mark == 0)
	        				mark = "未评分";
	        			var totalpeople = jsondata[i].courseTotalnum;
	        			totalpeople = totalpeople * 1 + 10000 * 1; 
	        			 
	        			 var str = "{\"courseId\":\"" + jsondata[i].courseId + "\","
				    		+ "\"courseName\":\"" + jsondata[i].courseName + "\","
				    		+ "\"courseAuthor\":\"" + jsondata[i].courseAuthor + "\","
				    		+ "\"courseMark\":\"" + mark + "\","
				    		+ "\"coursePeople\":\"" + jsondata[i].coursePeople + "\","
				    		+ "\"courseTotalpeople\":\"" + totalpeople + "\","
				    		+ "\"courseAndtextbook\":\"" + textbooklink + "\","
				    		+ "\"courseAndvideo\":\"" + videolink + "\","
				    		+ "\"courseCollectnum\":\"" + jsondata[i].courseCollectnum + "\"}";
	        				
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


//关联选择
function selectCondition() {
	var formData = new FormData();
	var selectName1 = $("#selectName1").val(); 
	
	if(selectName1 == "教员："){
		$.ajax({
	   		url: 'userManageAction_findjiaoyuanByLevel',
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
				    		+ "\"Name\":\"" + jsondata[i].userName + "\"}";	// jsondata[i].userId + "-" +
	        			
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
	else {
		$.ajax({
	   		url: 'courseManageAction_showAllCourse',
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
	        			if(selectName1 == "课程编号：")
		        			str = "{\"ID\":\"" + jsondata[i].courseId + "\","
					    		+ "\"Name\":\"" + jsondata[i].courseId + "-" + jsondata[i].courseName + "\"}";
	        			else if(selectName1 == "课程名称：")
		        			str = "{\"ID\":\"" + jsondata[i].courseName + "\","
					    		+ "\"Name\":\"" + jsondata[i].courseName + "\"}";
	        			
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


//课程作者选择
function selectauthor() {
	var formData = new FormData();
	
	$.ajax({
   		url: 'userManageAction_findjiaoyuanByLevel',
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
        		
        		$("#courseAuthor").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
}

//课程关联教材选择
function selecttextbook() {
	var formData = new FormData();
	
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
        			var str = "{\"ID\":\"" + jsondata[i].textbookId + "-" + jsondata[i].textbookName + "\","
			    		+ "\"Name\":\"" + jsondata[i].textbookId + "-" + jsondata[i].textbookName + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#courseAndtextbook").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
}

//课程关联视频选择
function selectvideo() {
	var formData = new FormData();
	
	$.ajax({
   		url: 'videoManageAction_showAllVideo',
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
        			var str = "{\"ID\":\"" + jsondata[i].videoId + "-" + jsondata[i].videoName + "\","
			    		+ "\"Name\":\"" + jsondata[i].videoId + "-" +  jsondata[i].videoName + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#courseAndvideo").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
}


//添加课程
function add_course() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	$("#copy").css("display","none");
	
	$("#courseName").val("");   
	$("#courseName").focus(); 
	$("#courseAuthor").combobox('setValue', null);
	$("#courseStime").val("");
	$("#courseEtime").val("");
	$("#courseRephotoFile").val("");
	$("#coursePhotoFile").val("");
	//$("#recommand").val("不推荐");
	$("#courseAim").val("");
	$("#courseIntroduce").val("");
	$("#courseAndtextbook").combobox('setValue', null);
	$("#courseAndvideo").combobox('setValue', null);
	$("#coursePeople").val("");
	$("#outline_add").val("");
	
	selectauthor();
	selecttextbook();
	selectvideo();
	addlock();
}


//课程提交
function submit_course() {
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	var formData = new FormData();
	if( $("#courseRephotoFile").val() != "")
		formData.append("courseRephotoFile",$("#courseRephotoFile")[0].files[0]);
	if( $("#coursePhotoFile").val()!= "")
		formData.append("coursePhotoFile",$("#coursePhotoFile")[0].files[0]);

	var author = "" + $("#courseAuthor").combobox('getValues');
	var textbook = "" + $("#courseAndtextbook").combobox('getValues');
	var video = "" + $("#courseAndvideo").combobox('getValues');
	var params = "{\"courseName\":\"" + $("#courseName").val() + "\","
				//+ "\"courseId\":\"" + $("#courseId").val() + "\","
	 			+ "\"courseAuthor\":\"" + author + "\","
	 			+ "\"courseAndtextbook\":\"" + textbook + "\","
	 			+ "\"courseAndvideo\":\"" + video + "\","
	 			+ "\"courseStime\":\"" + $("#courseStime").val() + "\","
	 			+ "\"courseEtime\":\"" + $("#courseEtime").val() + "\","
	 			//+ "\"courseIntroduce\":\"" + $("#courseIntroduce").val() + "\","
	 			+ "\"coursePeople\":\"" + $("#coursePeople").val() + "\"}";
	 			//+ "\"courseAim\":\"" + $("#courseAim").val() + "\"
	 formData.append("params",params);
	 formData.append("courseOutline", $("#outline_add").val());
	 formData.append("courseIntroduce", $("#courseIntroduce").val());
	 formData.append("courseAim", $("#courseAim").val());
	 
	// ajax传输
	$.ajax({
		url: 'courseManageAction_addCourse',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){	
	        if(data!=null){
	        	refresh_course();
	        	cancel_course();
	        	layer.alert("导入成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑课程
function edit_course() {	
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}

	addlock();
	$("#tijiao").css("display","none");
	$("#copy").css("display","none");
	$("#baocun").css("display","");
	$("#deleterephoto").css("display","");
	$("#deletephoto").css("display","");
	$("#courserephoto_see").css("display","");
	$("#coursephoto_see").css("display","");
	courseId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	var params = "{\"courseId\":\"" + courseId + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findCourseById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	//$("#courseId").val(jsondata[0].courseId);   //jqury
	        	$("#courseName").val(jsondata[0].courseName);  
	        	$("#courseName").focus(); 
	        	$("#courseStime").val(jsondata[0].courseStime);
	        	$("#courseEtime").val(jsondata[0].courseEtime);
	        	$("#courseAim").val(jsondata[0].courseAim);
	        	$("#courseIntroduce").val(jsondata[0].courseIntroduce);
	        	$("#coursePeople").val(jsondata[0].coursePeople);
	        	$("#outline_add").val(jsondata[0].courseOutline);
	        	
	        	userId_jsondata = "";
	        	finduserid(courseId);
	        	if(userId_jsondata != ""){
	        		var s1 = jsondata[0].courseAuthor.split(",");
		        	var str1 = userId_jsondata.toString().split(",");
		        	var string1 = "";
		        	for(var i=0; i<s1.length; i++){
		        		if(i == 0){
		        			string1 += str1[i] + "-" + s1[i];
		        		}else {
		        			string1 += "," + str1[i] + "-" + s1[i];
		        		}
		        	}
		        	$("#courseAuthor").combobox('setValue', string1);
	        	}

	        	textbook_jsondata = "";
	        	textbookid_jsondata = "";
	        	findtextbook(courseId);
	        	findtextbookid(courseId);
	        	if(textbook_jsondata != ""){
		        	var s2 = textbook_jsondata.toString().split(",");
		        	var str2 = textbookId_jsondata.toString().split(",");
		        	var string2 = "";
		        	for(var i=0; i<s2.length; i++){
		        		if(i == 0){
		        			string2 += str2[i] + "-" + s2[i];
		        		}else {
		        			string2 += "," + str2[i] + "-" + s2[i];
		        		}
		        	}
		        	$("#courseAndtextbook").combobox('setValue', string2);
	        	}
	        	
	        	video_jsondata = "";
	        	videoId_jsondata = "";
	        	findvideo(courseId);
	        	findvideoid(courseId);
	        	if(video_jsondata != ""){
	        		var s3 = video_jsondata.toString().split(",");
		        	var str3 = videoId_jsondata.toString().split(",");
		        	var string3 = "";
		        	for(var i=0; i<s3.length; i++){
		        		if(i == 0){
		        			string3 += str3[i] + "-" + s3[i];
		        		}else {
		        			string3 += "," + str3[i] + "-" + s3[i];
		        		}
		        	}
		        	$("#courseAndvideo").combobox('setValue', string3);
	        	}
	        	
	        	
	        	selectauthor();
	        	selecttextbook();
	        	selectvideo();
				 
			    //layer.alert("修改成功");
			}
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//更新课程
function update_course(){
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	var formData = new FormData();	 	
	 
	var flag = 111;		
	if( $("#courseRephotoFile").val() != ""){
		flag -= 10;
		formData.append("courseRephotoFile",$("#courseRephotoFile")[0].files[0]);
	}
	if( $("#coursePhotoFile").val()!= ""){
		flag -= 100;
		formData.append("coursePhotoFile",$("#coursePhotoFile")[0].files[0]);
	}
	
	var author = "" + $("#courseAuthor").combobox('getValues');
	var textbook = "" + $("#courseAndtextbook").combobox('getValues');
	var video = "" + $("#courseAndvideo").combobox('getValues');
	var params = "{\"courseId\":\"" + courseId + "\","
	 			+ "\"courseName\":\"" + $("#courseName").val() + "\","
	 			+ "\"courseAuthor\":\"" + author + "\","
	 			+ "\"courseAndtextbook\":\"" + textbook + "\","
	 			+ "\"flag\":" + flag + ","
	 			+ "\"courseAndvideo\":\"" + video + "\","
	 			+ "\"courseStime\":\"" + $("#courseStime").val() + "\","
	 			+ "\"courseEtime\":\"" + $("#courseEtime").val() + "\","
	 			+ "\"coursePeople\":\"" + $("#coursePeople").val() + "\"}";

	 formData.append("params",params);
	 formData.append("courseOutline", $("#outline_add").val());
	 formData.append("courseIntroduce", $("#courseIntroduce").val());
	 formData.append("courseAim", $("#courseAim").val());

	// ajax传输
	$.ajax({
		url: 'courseManageAction_updateCourse',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_course();
	        	$("#tijiao").css("display","");
	        	$("#baocun").css("display","none");
	        	$("#content_see").css("display","none");
	        	$("#rephoto_see").css("display","none");
	        	$("#photo_see").css("display","none");

	        	cancel_course();
	        	layer.alert("数据更新成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("数据更新失败，请稍候再试");
	    }
	});
}


var copyrephoto_url = "";
var copyphoto_url = "";
//克隆课程
function copy_course() {	
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}

	addlock();
	$("#tijiao").css("display","none");
	$("#baocun").css("display","none");
	$("#copy").css("display","");
	$("#deleterephoto").css("display","");
	$("#deletephoto").css("display","");
	$("#courserephoto_see").css("display","");
	$("#coursephoto_see").css("display","");
	courseId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	var params = "{\"courseId\":\"" + courseId + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findCourseById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	//$("#courseId").val(jsondata[0].courseId);   //jqury
	        	$("#courseName").val(jsondata[0].courseName);  
	        	$("#courseName").focus(); 
	        	$("#courseAim").val(jsondata[0].courseAim);
	        	$("#courseIntroduce").val(jsondata[0].courseIntroduce);
	        	$("#outline_add").val(jsondata[0].courseOutline);
	        	copyrephoto_url = jsondata[0].courseRephoto;
	        	copyphoto_url = jsondata[0].coursePhoto;
	        	

	        	textbook_jsondata = "";
	        	textbookid_jsondata = "";
	        	findtextbook(courseId);
	        	findtextbookid(courseId);
	        	if(textbook_jsondata != ""){
		        	var s2 = textbook_jsondata.toString().split(",");
		        	var str2 = textbookId_jsondata.toString().split(",");
		        	var string2 = "";
		        	for(var i=0; i<s2.length; i++){
		        		if(i == 0){
		        			string2 += str2[i] + "-" + s2[i];
		        		}else {
		        			string2 += "," + str2[i] + "-" + s2[i];
		        		}
		        	}
		        	$("#courseAndtextbook").combobox('setValue', string2);
	        	}
	        	
	        	video_jsondata = "";
	        	videoId_jsondata = "";
	        	findvideo(courseId);
	        	findvideoid(courseId);
	        	if(video_jsondata != ""){
	        		var s3 = video_jsondata.toString().split(",");
		        	var str3 = videoId_jsondata.toString().split(",");
		        	var string3 = "";
		        	for(var i=0; i<s3.length; i++){
		        		if(i == 0){
		        			string3 += str3[i] + "-" + s3[i];
		        		}else {
		        			string3 += "," + str3[i] + "-" + s3[i];
		        		}
		        	}
		        	$("#courseAndvideo").combobox('setValue', string3);
	        	}
	        	
	        	
	        	selectauthor();
	        	selecttextbook();
	        	selectvideo();
				 
			    //layer.alert("修改成功");
			}
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//课程克隆保存
function copysave_course() {
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	var formData = new FormData();
	var flag = 111;		
	if( $("#courseRephotoFile").val() != ""){
		flag -= 10;
		formData.append("courseRephotoFile",$("#courseRephotoFile")[0].files[0]);
	}else {
		formData.append("courseRephoto", copyrephoto_url);
	}
	if( $("#coursePhotoFile").val()!= ""){
		flag -= 100;
		formData.append("coursePhotoFile",$("#coursePhotoFile")[0].files[0]);
	}else {
		formData.append("coursePhoto", copyphoto_url);
	}

	var author = "" + $("#courseAuthor").combobox('getValues');
	var textbook = "" + $("#courseAndtextbook").combobox('getValues');
	var video = "" + $("#courseAndvideo").combobox('getValues');
	var params = "{\"courseName\":\"" + $("#courseName").val() + "\","
	 			+ "\"courseAuthor\":\"" + author + "\","
	 			+ "\"courseAndtextbook\":\"" + textbook + "\","
	 			+ "\"flag\":" + flag + ","
	 			+ "\"courseAndvideo\":\"" + video + "\","
	 			+ "\"courseStime\":\"" + $("#courseStime").val() + "\","
	 			+ "\"courseEtime\":\"" + $("#courseEtime").val() + "\","
	 			+ "\"coursePeople\":\"" + $("#coursePeople").val() + "\"}";

	 formData.append("params",params);
	 formData.append("courseOutline", $("#outline_add").val());
	 formData.append("courseIntroduce", $("#courseIntroduce").val());
	 formData.append("courseAim", $("#courseAim").val());
	 
	// ajax传输
	$.ajax({
		url: 'courseManageAction_copyCourse',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){	
	        if(data!=null){
	        	refresh_course();
	        	cancel_course();
	        	layer.alert("克隆成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("克隆失败，请稍候再试");
	    }
	});
}


//取消
function cancel_course() {
	//$("#courseId").val("");   //jqury
	$("#courseName").val("");   
	$("#courseAuthor").combobox('setValue', null);
	$("#courseStime").val("");
	$("#courseEtime").val("");
	$("#courseRephotoFile").val("");
	$("#coursePhotoFile").val("");
	//$("#recommand").val("不推荐");
	$("#courseAim").val("");
	$("#courseIntroduce").val("");
	$("#courseAndtextbook").combobox('setValue', null);
	$("#courseAndvideo").combobox('setValue', null);
	$("#coursePeople").val("");
	$("#outline_add").val("");
	
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display","none");
	$("#copy").css("display","none");
	$("#deleterephoto").css("display","none");
	$("#deletephoto").css("display","none");
	$("#courserephoto_see").css("display","none");
	$("#coursephoto_see").css("display","none");
	removelock();
	layer.close(whichlayer);
}



//删除课程
function delete_course() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	courseId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除课程',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#coursedelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}

function deleteconfirm(){
	layer.alert(whichlayer);
	var formData = new FormData();
	var params = "{\"courseId\":\"" + courseId +"\"}"
	 formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_deleteCourse',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_course();
	        	layer.alert("删除成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败");
	    }
	});
	
}




//课程大纲录入
$('#outline_add').on('click', function() {
	layer.open({
		title : '课程大纲',
		type : 2,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin: 'layui-layer-molv',
		area : [ '850px', '700px' ],
		//content : $('#outline')
		content : 'course_outline.html'
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});



//课程推荐图预览
$('#courserephoto_see').on('click', function() {
	var formData = new FormData();
	var params ="{\"courseId\":\"" + courseId + "\"}"
	formData.append("params", params);
	
	// ajax传输
   	$.ajax({
   		url: 'courseManageAction_findCourseById',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var rephoto_url = "http://localhost:8080/NCS/" + jsonData[0].courseRephoto;
    		var rephoto_url = jsonData[0].courseRephoto;
    		$("img").attr("src", rephoto_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '课程推荐图',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
    			area : [ '717px', '580px' ],
    			content: $('#courserephoto')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});

//课程缩略图预览
$('#coursephoto_see').on('click', function() {
	var formData = new FormData();
	var params ="{\"courseId\":\"" + courseId + "\"}"
	formData.append("params", params);
	
	// ajax传输
   	$.ajax({
   		url: 'courseManageAction_findCourseById',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var photo_url = "http://localhost:8080/NCS/" + jsonData[0].coursePhoto;
    		var photo_url = jsonData[0].coursePhoto;
    		$("img").attr("src", photo_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '课程缩略图',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
    			area : [ '717px', '580px' ],
    			content: $('#coursephoto')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});



function deleteRephoto(){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + courseId + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_deleteRephoto',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("课程推荐图删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("课程推荐图删除失败");
	    }
	});
}


function deletePhoto(){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + courseId + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_deletePhoto',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("课程缩略图删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("课程缩略图删除失败");
	    }
	});
}



//根据ID从courseuser_info表里面提取用户ID
function finduserid(id){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findUserIdBycourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	userId_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//根据ID从relate_info表里面提取教材名称
function findtextbook(id){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'relateManageAction_findTextbookBycourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	//textbook_jsondata = $.parseJSON(data);
	        	var json = $.parseJSON(data);
	        	
	        	for(var i=0; i<json.length; i++){
	        		if(i != 0)
	        			textbook_jsondata += ",";
	        		textbook_jsondata += json[i][0] + "-" + json[i][1];
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//根据ID从relate_info表里面提取教材ID
function findtextbookid(id){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'relateManageAction_findTextbookIdBycourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	textbookId_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据ID从relate_info表里面提取视频名称
function findvideo(id){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + id + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'relateManageAction_findVideoBycourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	//video_jsondata = $.parseJSON(data);
	        	var json = $.parseJSON(data);
	        	
	        	for(var i=0; i<json.length; i++){
	        		if(i != 0)
	        			video_jsondata += ",";
	        		video_jsondata += json[i][0] + "-" + json[i][1];
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//根据ID从relate_info表里面提取视频ID
function findvideoid(id){
	var formData = new FormData();
	var params ="{\"courseId\":\"" + id + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'relateManageAction_findVideoIdBycourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	videoId_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

function computerpeople(name) {
	var formData = new FormData();
	var params = "{\"courseName\":\"" + name +"\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_computerPeople',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	totalpeople = $.parseJSON(data)[0].courseTotalpeople;
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据课程ID计算课程的平均评分
function averageMark(id){
	var formData = new FormData();
	var params = "{\"courseId\":\"" + id +"\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'assessManageAction_averageMarkByCourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data != null){

	        	courseMark = data;
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//根据课程ID计算课程的收藏人数
function collectNum(id){
	var formData = new FormData();
	var params = "{\"courseId\":\"" + id +"\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'collectManageAction_collectNumByCourseId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){	
	        	courseCollectNum = data;
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


function judge() {
	var name = $("#courseName").val();
	if(name == ""){
		ju = 1;
		layer.alert("课程名不能为空，请重新输入！")
		return ;
	}
	
	
	var st = $("#courseStime").val();
	var et = $("#courseEtime").val();
	if(st > et){
		ju = 1;
		layer.alert("结课时间不能晚于开课时间，请重新输入");
		return ;
	}

	var name1 = $("#courseRephotoFile").val();
	if(name1 != ""){
		var file1 = $("#courseRephotoFile")[0].files[0].size;
		if(file1 > 307200){
			ju = 1;
			layer.alert("推荐图大于300KB，请重新选择！");
			return ;
		}
	}
		
	
	
	var name2 = $("#coursePhotoFile").val();
	if(name2 != ""){
		var file2 = $("#coursePhotoFile")[0].files[0].size;
		if(file2 > 307200){
			ju = 1;
			layer.alert("缩略图大于300KB，请重新选择！");
			return ;
		}
	}
}

$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	updateAssessAndCollect();
	refresh_course();
	selectCondition();
});


//更新课程表中的评分和收藏数v1.2
function updateAssessAndCollect(){
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_updateAssessAndCollect',
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


//刷新数据显示表
function refresh_course(){
	$.jgrid.defaults.styleUI="Bootstrap";

	var formData = new FormData();
	// ajax传输
	$.ajax({
		url: 'courseManageAction_showAllCourse',
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
	      			textbook_jsondata = "";
	      			video_jsondata = "";
	      			var textbooklink = "<a onclick='findTextbooklink("+ jsondata[i].courseId  +")'>查看关联教材</a>";
	      			var videolink = "<a onclick='findVideolink("+ jsondata[i].courseId  +")'>查看关联微课</a>";
	
	      			var mark = jsondata[i].courseMark;
	      			if(mark == 0)
	      				mark = "未评分";
	      			var totalpeople = jsondata[i].courseTotalnum;
	      			totalpeople = totalpeople * 1 + 10000 * 1; 
	      			 
	       			var str = "{\"courseId\":\"" + jsondata[i].courseId + "\","
				    		+ "\"courseName\":\"" + jsondata[i].courseName + "\","
				    		+ "\"courseAuthor\":\"" + jsondata[i].courseAuthor + "\","
				    		+ "\"courseMark\":\"" + mark + "\","
				    		+ "\"coursePeople\":\"" + jsondata[i].coursePeople + "\","
				    		+ "\"courseTotalpeople\":\"" + totalpeople + "\","
				    		+ "\"courseAndtextbook\":\"" + textbooklink + "\","
				    		+ "\"courseAndvideo\":\"" + videolink + "\","
				    		+ "\"courseCollectnum\":\"" + jsondata[i].courseCollectnum + "\"}";
	      				
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
		colNames:["课程编号","课程名称","教员","评分","收藏人数","本期参与人数","总参与人数","关联教材","关联微课"],
		colModel:[
		          {name:"courseId",index:"courseId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"courseName",index:"courseName",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"courseAuthor",index:"courseAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"courseMark",index:"courseMark",editable:true,width:70,align:"left",sorttype:"double"},
		          {name:"courseCollectnum",index:"courseCollectnum",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"coursePeople",index:"coursePeople",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"courseTotalpeople",index:"courseTotalpeople",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"courseAndtextbook",index:"courseAndtextbook",editable:true,width:150,align:"left",sorttype:"string"},
		          {name:"courseAndvideo",index:"courseAndvideo",editable:true,width:150,align:"left",sorttype:"string"},
		          //{name:"courseRecommand",index:"courseRecommand",editable:true,width:120,align:"left",sorttype:"string"}
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

//保存课程评分
function saveMark(id, mark){
	var formData = new FormData();
	var params = "{\"courseId\":\"" + id + "\",\"courseMark\":\"" + mark + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_saveCourseAverageMark',
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

//保存课程收藏人数
function saveCollectNum(id, num){
	var formData = new FormData();
	var params = "{\"courseId\":\"" + id + "\",\"courseCollectNum\":\"" + num + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_saveCourseCollectNum',
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

//findtextbook(jsondata[i].courseId);
	//findvideo(jsondata[i].courseId);
function findTextbooklink(id){
	textbook_jsondata = "";
	findtextbook(id);
	
	if(textbook_jsondata != "")
		layer.alert(textbook_jsondata,{title: '关联教材'});
	else
		layer.alert("无关联教材",{title: '关联教材'});
}

function findVideolink(id){
	video_jsondata = "";
	findvideo(id);
	
	if(video_jsondata != "")
		layer.alert(video_jsondata,{title: '关联视频'});
	else
		layer.alert("无关联视频",{title: '关联视频'});
}





