/**
 * 
 */
var course_jsondata = "";
var video_jsondata = "";
var textbook_jsondata = "";
var user_jsondata = "";
var totalpeople = 0;
var userId;
var floor;
var ju;
var whichlayer;
var levelc;
var levelq;
var mydata;

//用户查询选择
function select_user() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if($("#selectName2").val() != "")
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
	 if(selectName1 == "用户编号：")
		 selectName1 = "YHBH";
	 else if(selectName1 == "姓名：")
		 selectName1 = "XM";
	 else if(selectName1 == "警号：")
		 selectName1 = "JH";
	 else if(selectName1 == "手机号：")
		 selectName1 = "SJH";
	 else if(selectName1 == "昵称：")
		 selectName1 = "NC";
	 
	 var level = $("#selectName2").val();
	 if(level == "学员")
		 level = "XY";
	 else if(level == "教员")
		 level = "JY";
	 else if(level == "作者")
		 level = "ZZ";
	 else if(level == "游客")
		 level = "YK";
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 			+ "\"selectContent1\":\"" + "" + $("#selectContent1").combobox('getValues') + "\","
	 			+ "\"selectName2\":\"" + level + "\"}";
	 formData.append("params", params);

	 
	// ajax传输
	$.ajax({
		url: 'userManageAction_findUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	mydata = [];
	        	analyze(jsondata);
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
	
	$.ajax({
   		url: 'userManageAction_showAllUser',
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
        			if(selectName1 == "用户编号：")
	        			str = "{\"ID\":\"" + jsondata[i].userId + "\","
				    		+ "\"Name\":\"" + jsondata[i].userId + "-" + jsondata[i].userName + "\"}";
        			else if(selectName1 == "姓名：")
	        			str = "{\"ID\":\"" + jsondata[i].userName + "\","
				    		+ "\"Name\":\"" + jsondata[i].userName + "\"}";
        			else if(selectName1 == "警号：")
        				str = "{\"ID\":\"" + jsondata[i].userAccount + "\","
			    			+ "\"Name\":\"" + jsondata[i].userName + "-" + jsondata[i].userAccount + "\"}";
        			else if(selectName1 == "手机号：")
        				str = "{\"ID\":\"" + jsondata[i].userPhone + "\","
		    				+ "\"Name\":\"" + jsondata[i].userName + "-" + jsondata[i].userPhone + "\"}";
        			else if(selectName1 == "昵称：")
        				str = "{\"ID\":\"" + jsondata[i].userNickname + "\","
	    					+ "\"Name\":\"" + jsondata[i].userName + "-" + jsondata[i].userNickname + "\"}";
        			
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

//添加用户
function add_user() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled",false);
	$("#baocun").css("display","none");
	
	$("#userName").val("");
	$("#userName").focus();
	$("#userSex").val("");
	$("#userNickname").val(""); 
	$("#userJobtitle").val("");
	$("#userJob").val("");
	$("#userPhone").val(""); 
	$("#userIDnumber").val("");
	$("#userAccount").val("");
	$("#userPhoto1File").val("");
	$("#userPhoto2File").val("");
	$("#userIntroduce").val("");
	$("#userLevel").combobox('setValue', "学员");

	addlock();
}

var ff;
//用户提交
function submit_user() {
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	
	ff = 0;
	duplicate_add();
	if(ff == 1)
		return ;
	
	var formData = new FormData();
	if( $("#userPhoto1File").val() != "")
		formData.append("userPhoto1File",$("#userPhoto1File")[0].files[0]);
	if( $("#userPhoto2File").val()!= "")
		formData.append("userPhoto2File",$("#userPhoto2File")[0].files[0]);

	 /*var level = "" + $("#userLevel").combobox('getValues');
	 if(level == "学员")
		 level = "XY";
	 else if(level == "教员")
		 level = "JY";
	 else if(level == "作者")
		 level = "ZZ";*/
	 
	 var le = "" + $("#userLevel").combobox('getValues');
	 var lev = le.split(",");
	 levelc = "";
	 if(lev != ""){
		 for(var i=0; i<lev.length; i++){
			 if(i != 0)
				 levelc += ",";
			 if(lev[i] == "学员")
				 levelc += "XY";
			 else if(lev[i] == "教员")
				 levelc += "JY";
			 else if(lev[i] == "作者")
				 levelc += "ZZ";
		 }
	 }
	 
	 var params = "{\"userName\":\"" + $("#userName").val() + "\","
	 			+ "\"userLevel\":\"" + levelc + "\","
	 			+ "\"userJobtitle\":\"" + $("#userJobtitle").val() + "\","
	 			+ "\"userSex\":\"" + $("#userSex").val() + "\","
	 			+ "\"userJob\":\"" + $("#userJob").val() + "\","
	 			+ "\"userNickname\":\"" + $("#userNickname").val() + "\","
	 			+ "\"userIntroduce\":\"" + $("#userIntroduce").val() + "\","
	 			+ "\"userIDnumber\":\"" + $("#userIDnumber").val() + "\","
	 			+ "\"userAccount\":\"" + $("#userAccount").val() + "\","
	 			+ "\"userPhone\":\"" + $("#userPhone").val() + "\"}";
	 formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'userManageAction_addUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_user();
	        	cancel_user();
	        	layer.alert("用户添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("用户添加失败，请稍候再试");
	    }
	});
}


//编辑用户
function edit_user() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	
	$("#tijiao").css("display","none");
	$("#baocun").css("display","");
	$("#deletephoto1").css("display","");
	$("#deletephoto2").css("display","");
	$("#userphoto1_see").css("display","");
	$("#userphoto2_see").css("display","");
	addlock();
	userId = $('.success').find('td').eq(0).text();
	
	var formData = new FormData();
	var params = "{\"userId\":\"" + userId + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_findUserById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	user_jsondata = jsondata;
	        	
	        	var le = jsondata[0].userLevel;
	        	var lev = le.split(",");
	        	levelq = "";
	        	if(le != "") {
	        		for(var i=0; i<lev.length; i++){
	        			if(i != 0)
	        				levelq += ",";
	        			if(lev[i] == "JY")
	        				levelq += "教员";		
	        			else if(lev[i] == "ZZ")
	        				levelq += "作者";
	        			else  if(lev[i] == "XY")
	        				levelq += "学员";
	        			else  if(lev[i] == "YK")
	        				levelq += "游客";
	        			if(lev[i] == "JY" || lev[i] == "ZZ"){
	    	        		$("#userName").attr("readonly","readonly");
	    	        	}
	        			if(lev[i] == "YK"){
	        				layer.alert("此用户是一名游客，不能更改其属性");
	        				return ;
	        			}
	        		}
	        	}
	        	$("#userLevel").combobox('setValue', levelq);
	        	
	        	$("#userName").val(jsondata[0].userName);
	        	$("#userName").focus();
	        	$("#userSex").val(jsondata[0].userSex);
	        	$("#userNickname").val(jsondata[0].userNickname); 
	        	$("#userJobtitle").val(jsondata[0].userJobtitle);
	        	$("#userJob").val(jsondata[0].userJob);
	        	$("#userPhone").val(jsondata[0].userPhone); 
	        	$("#userIDnumber").val(jsondata[0].userIDnumber);
	        	$("#userAccount").val(jsondata[0].userAccount);
	        	$("#userIntroduce").val(jsondata[0].userIntroduce);
	        		
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

//更新用户
function update_user(){
	ju = 0;
	judge();
	if(ju == 1)
		return ;
	
	ff = 0;
	duplicate_update();
	if(ff == 1)
		return ;
	
	$("#userName").removeAttr("readonly");
	var formData = new FormData();
	var flag = 111;		
	if( $("#userPhoto1File").val() != ""){
		flag -= 10;
		formData.append("userPhoto1File",$("#userPhoto1File")[0].files[0]);
	}
	if( $("#userPhoto2File").val()!= ""){
		flag -= 100;
		formData.append("userPhoto2File",$("#userPhoto2File")[0].files[0]);
	}
	formData.append("flag", flag * 1);
	
	/* var level = "" + $("#userLevel").combobox('getValues');
	 if(level == "学员")
		 level = "XY";
	 else if(level == "教员")
		 level = "JY";
	 else if(level == "作者")
		 level = "ZZ";*/
	 var le = "" + $("#userLevel").combobox('getValues');
	 var lev = le.split(",");
	 levelc = "";
	 if(lev != ""){
		 for(var i=0; i<lev.length; i++){
			 if(i != 0)
				 levelc += ",";
			 if(lev[i] == "学员")
				 levelc += "XY";
			 else if(lev[i] == "教员")
				 levelc += "JY";
			 else if(lev[i] == "作者")
				 levelc += "ZZ";
		 }
	 }
	 
	 var params = "{\"userName\":\"" + $("#userName").val() + "\","
	 			+ "\"userId\":\"" + userId + "\","
	 			+ "\"userLevel\":\"" + levelc + "\","
	 			+ "\"userJobtitle\":\"" + $("#userJobtitle").val() + "\","
	 			+ "\"userSex\":\"" + $("#userSex").val() + "\","
	 			+ "\"userJob\":\"" + $("#userJob").val() + "\","
	 			+ "\"userNickname\":\"" + $("#userNickname").val() + "\","
	 			+ "\"userIntroduce\":\"" + $("#userIntroduce").val() + "\","
	 			+ "\"userIDnumber\":\"" + $("#userIDnumber").val() + "\","
	 			+ "\"userAccount\":\"" + $("#userAccount").val() + "\","
	 			+ "\"userPhone\":\"" + $("#userPhone").val() + "\"}";
	 formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'userManageAction_updateUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	refresh_user();
	        	$("#tijiao").css("display","");
	        	$("#baocun").css("display","none");
	        	$("#content_see").css("display","none");
	        	$("#rephoto_see").css("display","none");
	        	$("#photo_see").css("display","none");

	        	layer.alert("用户更新成功");
	        	cancel_user();
	        }
	    },
	    error: function(err) {
	    	layer.alert("用户更新失败，请稍候再试");
	    }
	});
}

var deletelevel = "";
//删除用户
function delete_user() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	userId = $('.success').find('td').eq(0).text();
	deletelevel = $('.success').find('td').eq(4).text();
	
	whichlayer = layer.open({
		title : '删除用户',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#userdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}

function deleteconfirm(){
	var formData = new FormData();
	var params = "{\"userId\":\"" + userId +"\"}"
	 formData.append("params", params);
	
	if(deletelevel == "作者" ){
		textbook_jsondata = "";
		findtextbookByuserId(userId);
		if(textbook_jsondata != ""){
			layer.alert("存在关联，不能进行删除！")
			return ;
		}
	}else if(deletelevel == "教员"){
		video_jsondata = "";
		course_jsondata = "";
		findCourseByuserId(userId);
		findVideoByuserId(userId);
		
		if(video_jsondata != "" || course_jsondata != ""){
			layer.alert("存在关联，不能进行删除！")
			return ;
		}
	}
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_deleteUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	refresh_user();
	        	layer.close(whichlayer);
	        	layer.alert("删除成功")
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败,请等会尝试");
	    }
	});
	
}


//重置用户密码
function password_update() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	userId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '密码重置',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#passwordSet')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


function setconfirm(){
	var formData = new FormData();
	var params = "{\"userId\":\"" + userId +"\"}"
	 formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_passwordSet',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	refresh_user();
	        	layer.close(whichlayer);
	        	layer.alert("密码重置成功")
	        }
	    },
	    error: function(err) {
	    	layer.alert("删密码重置失败,请等会尝试");
	    }
	});
	
}




//取消
function cancel_user() {
	$("#userName").removeAttr("readonly");
	$("#userName").val("");
	$("#userSex").val("");
	$("#userNickname").val(""); 
	$("#userJobtitle").val("");
	$("#userJob").val("");
	$("#userPhone").val(""); 
	$("#userIDnumber").val("");
	$("#userAccount").val("");
	$("#userPhoto1File").val("");
	$("#userPhoto2File").val("");
	$("#userIntroduce").val("");
	$("#userLevel").combobox('setValue', "学员");
	
	$("#tijiao").attr("disabled",true);
	$("#tijiao").css("display","");
	$("#baocun").css("display","none");
	$("#deletephoto1").css("display","none");
	$("#deletephoto2").css("display","none");
	$("#userphoto1_see").css("display","none");
	$("#userphoto2_see").css("display","none");
	removelock();
	layer.close(whichlayer);
}



//用户推荐图预览
$('#userphoto1_see').on('click', function() {
	var formData = new FormData();
	var params ="{\"userId\":\"" + userId + "\"}"
	formData.append("params", params);
	
	// ajax传输
   	$.ajax({
   		url: 'userManageAction_findUserById',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var photo1_url = "http://localhost:8080/NCS/" + jsonData[0].userPhoto1;
    		var photo1_url = jsonData[0].userPhoto1;
    		
    		$("img").attr("src", photo1_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '本人头像',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
    			area : [ '300px', '342px' ],
    			content: $('#userphoto1')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});


//用户缩略图预览
$('#userphoto2_see').on('click', function() {
	var formData = new FormData();
	var params ="{\"userId\":\"" + userId + "\"}"
	formData.append("params", params);
	
	// ajax传输
   	$.ajax({
   		url: 'userManageAction_findUserById',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
    		var jsonData = eval('(' + data + ')');
    		//var photo2_url = "http://localhost:8080/NCS/" + jsonData[0].userPhoto2;
    		var photo2_url = jsonData[0].userPhoto2;
    		
    		$("img").attr("src", photo2_url.replace("192.168.20.72:59141", "10.73.94.81:8011"));
    		
    		layer.open({
    			title : '卡通头像',
    			type : 1,
    			shade : 0.5,
    			maxmin : true,
    			shadeClose : false, //点击遮罩关闭
    			scrollbar : false,
 
    			area : [ '300px', '342px' ],
    			content: $('#userphoto2')
    		//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    		});
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});


function deletePhoto1(){
	var formData = new FormData();
	var params = "{\"userId\":\"" + userId +"\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_deletePhoto1',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("用户本人头像删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("用户本人头像删除失败");
	    }
	});
}


function deletePhoto2(){
	var formData = new FormData();
	var params = "{\"userId\":\"" + userId +"\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_deletePhoto2',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("用户卡通头像删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("用户卡通头像删除失败");
	    }
	});
}




//根据用户姓名从video_info表里面提取视频名称
function findVideoByuserId(id){
	var formData = new FormData();
	var params ="{\"userId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'videoManageAction_findVideoByuserId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){ 	
	        if(data!=null){
	        	//video_jsondata = $.parseJSON(data);
	        	var jsondata = $.parseJSON(data);
	        	
	        	for(var i=0; i<jsondata.length; i++){
	        		if(i != 0)
	        			video_jsondata += ",";
	        		video_jsondata += jsondata[i][0].videoId+ "-" + jsondata[i][0].videoName;
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据用户Id从courseuser_info表里面提取课程Id
function findCourseByuserId(id){
	var formData = new FormData();
	var params ="{\"userId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findCourseByUserId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	for(var i=0; i<jsondata.length; i++){
	        		if(i != 0)
	        			course_jsondata += ",";
	        		course_jsondata += jsondata[i][0].courseId+ "-" + jsondata[i][0].courseName;
	        	}
	        	
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据用户ID从textbook_info表里面提取教材名称
function findtextbookByuserId(id){
	var formData = new FormData();
	var params ="{\"userId\":\"" + id + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'textbookManageAction_findTextbookByuserId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	//textbook_jsondata = $.parseJSON(data);
	        	var jsondata = $.parseJSON(data);
	        	
	        	for(var i=0; i<jsondata.length; i++){
	        		if(i != 0)
	        			textbook_jsondata += ",";
	        		textbook_jsondata += jsondata[i][0].textbookId+ "-" + jsondata[i][0].textbookName;
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("教材查找失败");
	    }
	});
}


function judge() {
	var name = $("#userName").val();
	if(name == ""){
		ju = 1;
		layer.alert("姓名不能为空，请重新输入！")
		return ;
	}
	
	var userAccount = $("#userAccount").val();
	if(userAccount.length > 0 && userAccount.length < 6){
		ju = 1;
		layer.alert("您的警号不足6位，请核对并重新输入！")
		return ;
	}
	
	var level = "" + $("#userLevel").combobox('getValues');
	var lev = level.split(",");
	var flag3 = 0;
	for(var i=0; i<lev.length; i++){
		if(lev[i] == "学员" || lev[i] == "教员")
			flag3 += 1;
	}
	if(flag3 == 2){
		ju = 1;
		layer.alert("学员和教员不能同时选中，请重新选择！");
		$("#userLevel").combobox('setValue', null);
		return ;
	}
	
	
	var name1 = $("#userPhoto1File").val();
	if(name1 != "")
		var file1 = $("#userPhoto1File")[0].files[0].size;
		if(file1 > 3145728){
		ju = 1;
		layer.alert("个人头像大于3M，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#userPhoto2File").val();
	if(name2 != "")
		var file2 = $("#userPhoto2File")[0].files[0].size;
		if(file2 > 3145728){
		ju = 1;
		layer.alert("卡通头像大于3M，请重新选择！");
		return ;
	}
}


function duplicate_add() {
	var formData = new FormData();
	// ajax传输
	$.ajax({
		url: 'userManageAction_showAllUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	var phone = $("#userPhone").val();
	        	if(phone != ""){
	        		for(var i in jsondata){
	        			if(phone == jsondata[i].userPhone){
	        				ff = 1;
	        				layer.alert("用户手机号在数据库中已存在，请确认后在录入");
	        				return ;
	        			}
		        	}
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("查找失败");
	    }
	});
}


function duplicate_update() {
	var formData = new FormData();
	// ajax传输
	$.ajax({
		url: 'userManageAction_showAllUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	var phone = $("#userPhone").val();
	        	var id = userId;
	        	if(phone != ""){
	        		for(var i in jsondata){
	        			if(id != jsondata[i].userId && phone == jsondata[i].userPhone){
	        				ff = 1;
	        				layer.alert("用户手机号在数据库中已存在，请确认后在录入");
	        				return ;
	        			}
		        	}
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("查找失败");
	    }
	});
}

$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	refresh_user();
	selectCondition();
});

//刷新数据显示表
function refresh_user(){
	$.jgrid.defaults.styleUI="Bootstrap";

	var formData = new FormData();
	// ajax传输
	$.ajax({
		url: 'userManageAction_showAllUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	
	        	mydata = [];
        		analyze(jsondata);
	        	
	        	getTable(mydata);
	        	//layer.close(floor);
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败");
	    }
	});
}

function analyze(jsondata){
	for(var i in jsondata){
		if(jsondata[i].userLevel != "GLY"){
		video_jsondata = "";
		course_jsondata = "";
		textbook_jsondata = "";
		
		var courselink = "";
		var videolink = "";
		var textbooklink = "";
		var le = jsondata[i].userLevel;
		var lev = le.split(",");
		levelq = "";
		if(le != "") {
			for(var j=0; j<lev.length; j++){
				if(j != 0)
					levelq += ",";
				if(lev[j] == "JY"){
					levelq += "教员";
					courselink = "<a onclick='findCourselink("+ jsondata[i].userId  +")'>查看关联课程</a>";
					videolink = "<a onclick='findVideolink("+ jsondata[i].userId  +")'>查看关联微课</a>";
					//findCourseByuserId(jsondata[i].userId);
					//findVideoByuserId(jsondata[i].userId);
				}				
				else if(lev[j] == "ZZ"){
					levelq += "作者";
					textbooklink = "<a onclick='findTextbooklink("+ jsondata[i].userId  +")'>查看关联教材</a>";
					//findtextbookByuserId(jsondata[i].userId);
				}		
				else  if(lev[j] == "XY"){
					levelq += "学员";
					courselink = "<a onclick='findCourselink("+ jsondata[i].userId  +")'>查看关联课程</a>";
					//findCourseByuserId(jsondata[i].userId);
				}	
				else  if(lev[j] == "YK")
					levelq += "游客";
			}
		}
		
		
		var str = "{\"userId\":\"" + jsondata[i].userId + "\","
    		+ "\"userName\":\"" + jsondata[i].userName + "\","
    		+ "\"userAccount\":\"" + jsondata[i].userAccount + "\","
    		+ "\"userPhone\":\"" + jsondata[i].userPhone + "\","
    		+ "\"userNickname\":\"" + jsondata[i].userNickname + "\","
    		+ "\"userAndcourse\":\"" + courselink + "\","
    		//+ "\"userAndcourse\":\"" + "<a onclick='findCourseById("+ jsondata[i].userId  +")'>查看关联课程</a>" + "\","
    		+ "\"userAndvideo\":\"" + videolink + "\","
    		+ "\"userAndtextbook\":\"" + textbooklink + "\","
    		+ "\"userLevel\":\"" + levelq + "\"}";
			
		var json = eval('(' + str + ')');
		mydata.push(json);
	}}
}


function getTable(mydata) {
	$("#table_list_2").jqGrid('clearGridData');  //清空表格
	$("#table_list_2").jqGrid('setGridParam',{  // 重新加载数据
	      datatype:'local',
	      data : mydata,   
	      //page:1
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
		colNames:["用户编号","姓名","警号","手机号","昵称","用户类型","主讲微课","主编教材"],
		colModel:[
		          {name:"userId",index:"userId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"userName",index:"userName",editable:true,width:100,align:"left",sorttype:"string"},
		          {name:"userAccount",index:"userAccount",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"userPhone",index:"userPhone",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"userNickname",index:"userNickname",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"userLevel",index:"userLevel",editable:true,width:90,align:"left",sorttype:"string"},
		          //{name:"userAndcourse",index:"userAndcourse",editable:true,width:130,align:"left",sorttype:"string"},
		          {name:"userAndvideo",index:"userAndvideo",editable:true,width:130,align:"left",sorttype:"string"},
		          {name:"userAndtextbook",index:"userAndtextbook",editable:true,width:130,align:"left",sorttype:"string"},
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


function levelqu(le){
	var lev = le.split(",");

	if(le != "") {
		for(var i=0; i<lev.length; i++){
			if(i != 0)
				levelq += ",";
			if(lev[i] == "JY")
				levelq += "教员";		
			else if(lev[i] == "ZZ")
				levelq += "作者";
			else  if(lev[i] == "XY")
				levelq += "学员";
			else  if(lev[i] == "YK")
				levelq += "游客";
			if(lev[i] == "教员" || lev[i] == "作者"){
        		$("#userName").attr("readonly","readonly");
        	}
		}
	}
}

function addlock(){
	$("#tianjia").attr("disabled",true);
	$("#shanchu").attr("disabled",true);
	$("#bianji").attr("disabled",true);
	$("#shuaxin").attr("disabled",true);
	$("#chongzhimima").attr("disabled",true);
}

function removelock(){
	$("#tianjia").attr("disabled",false);
	$("#shanchu").attr("disabled",false);
	$("#bianji").attr("disabled",false);
	$("#shuaxin").attr("disabled",false);
	$("#chongzhimima").attr("disabled",false);
}

function findCourselink(id){
	course_jsondata = "";
	findCourseByuserId(id);
	
	if(course_jsondata != "")
		layer.alert(course_jsondata,{title: '关联课程'});
	else
		layer.alert("无关联课程",{title: '关联课程'});
}

function findTextbooklink(id){
	textbook_jsondata = "";
	findtextbookByuserId(id);
	
	if(textbook_jsondata != "")
		layer.alert(textbook_jsondata,{title: '关联教材'});
	else
		layer.alert("无关联教材",{title: '关联教材'});
}

function findVideolink(id){
	video_jsondata = "";
	findVideoByuserId(id);
	
	if(video_jsondata != "")
		layer.alert(video_jsondata,{title: '关联微课'});
	else
		layer.alert("无关联微课",{title: '关联微课'});
}










