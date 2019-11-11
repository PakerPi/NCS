
$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
});


function userImport(){
	if( $("#userFile").val() == ""){
		layer.alert("请选择需要导入的学员录入文档！")
		return ;
	}
	var formData = new FormData();
	formData.append("userFile",$("#userFile")[0].files[0]);

	// ajax传输
	$.ajax({
		url: 'importManageAction_importUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var str;
	        	if(data == "userName")
	        		str = "数据表中户姓名不能为空，请更改并重新导入";
	        	else if(data == "userName1")
	        		str = "数据表中户姓名不能包含空格，请更改并重新导入";
	        	else if(data == "userName2")
	        		str = "数据表中户姓名不能超过20个字符，请更改并重新导入";
	        	else if(data == "userName3")
	        		str = "数据表中户姓名不能出现阿拉伯数字，请更改并重新导入";
	        	else if(data == "userAccount1")
	        		str = "数据表中警号不能为空，请更改并重新导入";
	        	else if(data == "userAccount2")
	        		str = "数据表中警号应在6-7位，请更改并重新导入";
	        	else if(data == "userSex")
	        		str = "数据表中性别只能为男或女，请更改并重新导入";
	        	else if(data == "userPhone")
	        		str = "数据表中手机号不能为空，请更改并重新导入";
	        	else if(data == "userPhone1")
	        		str = "数据表中手机号不能包含空格，请更改并重新导入";
	        	else if(data == "userPhone2")
	        		str = "数据表中手机号长度固定为11位，请更改并重新导入";
	        	else if(data == "userPhone3")
	        		str = "数据表中手机号必须为数字，请更改并重新导入";
	        	else if(data == "userIDnumber1")
	        		str = "数据表中身份证号不能包含空格，请更改并重新导入";
	        	else if(data == "userIDnumber2")
	        		str = "数据表中身份证号必须为18位，请更改并重新导入";
	        	else if(data == "userJobtitle1")
	        		str = "数据表中用户职称不能包含空格，请更改并重新导入";
	        	else if(data == "userJobtitle2")
	        		str = "数据表中用户职称不能超过20个字符，请更改并重新导入";
	        	else if(data == "userJob1")
	        		str = "数据表中工作单位不能包含空格，请更改并重新导入";
	        	else if(data == "userJob2")
	        		str = "数据表中工作单位不能超过40个字符，请更改并重新导入";
	        	else if(data == "userDuplicate")
	        		str = "数据表中出现重复手机号，请更改并重新导入";
	        	else if(data == "success")
	        		str = "学员批量导入成功";
	        	else
	        		str = "手机号：" + data + "与数据库出现重复冲突，请更改并重新导入";
	        	
	        	layer.alert(str);
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}

function teacherImport(){
	if( $("#teacherFile").val() == ""){
		layer.alert("请选择需要导入的教员录入文档！")
		return ;
	}
	var formData = new FormData();
	formData.append("teacherFile",$("#teacherFile")[0].files[0]);

	// ajax传输
	$.ajax({
		url: 'importManageAction_importUser',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var str = data;
	        	if(data == "userName")
	        		str = "数据表中户姓名不能为空，请更改并重新导入";
	        	else if(data == "userName1")
	        		str = "数据表中户姓名不能包含空格，请更改并重新导入";
	        	else if(data == "userName2")
	        		str = "数据表中户姓名不能超过20个字符，请更改并重新导入";
	        	else if(data == "userAccount1")
	        		str = "数据表中警号不能为空，请更改并重新导入";
	        	else if(data == "userAccount2")
	        		str = "数据表中警号应在6-7位，请更改并重新导入";
	        	else if(data == "userSex")
	        		str = "数据表中性别只能为男或女，请更改并重新导入";
	        	else if(data == "userPhone")
	        		str = "数据表中手机号不能为空，请更改并重新导入";
	        	else if(data == "userPhone1")
	        		str = "数据表中手机号不能包含空格，请更改并重新导入";
	        	else if(data == "userPhone2")
	        		str = "数据表中手机号长度固定为11位，请更改并重新导入";
	        	else if(data == "userPhone3")
	        		str = "数据表中手机号必须为数字，请更改并重新导入";
	        	else if(data == "userIDnumber1")
	        		str = "数据表中身份证号不能包含空格，请更改并重新导入";
	        	else if(data == "userIDnumber2")
	        		str = "数据表中身份证号必须为18位，请更改并重新导入";
	        	else if(data == "userJobtitle1")
	        		str = "数据表中用户职称不能包含空格，请更改并重新导入";
	        	else if(data == "userJobtitle2")
	        		str = "数据表中用户职称不能超过20个字符，请更改并重新导入";
	        	else if(data == "userJob1")
	        		str = "数据表中工作单位不能包含空格，请更改并重新导入";
	        	else if(data == "userJob2")
	        		str = "数据表中工作单位不能超过40个字符，请更改并重新导入";
	        	else if(data == "userDuplicate")
	        		str = "数据表中出现重复手机号，请更改并重新导入";
	        	else if(data == "success")
	        		str = "教员批量导入成功";
	        	else
	        		str = "手机号：" + data + "与数据库出现重复冲突，请更改并重新导入";
	        	
	        	layer.alert(str);
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}

function relateImport() {
	var formData = new FormData();
	var start = $("#userStartId").val();
	var end = $("#userEndId").val();
	var condition = $("#relateCourse").val();
	if(start == "" || end == "" || condition == ""){
		layer.alert("批量关联条件不能为空！");
		return ;
	}

	if(start*1 > end*1){
		layer.alert("结束用户ID必须大于等于起始用户ID！");
		return ;
	}
	
	var params = "{\"userStartId\":\"" + start + "\","
				+ "\"userEndId\":\"" + end + "\","
				+ "\"relateCourse\":\"" + condition + "\"}";
	formData.append("params", params);
	
	$.ajax({
		url: 'importManageAction_importRelate',
	    type: "POST", 
	    async: false,
	    cache: false,
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.alert("用户关联成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("关联失败，请稍候再试");
	    }
	});
	
}

$(document).ready(function (){
	var formData = new FormData();
	
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
        			var str = "{\"ID\":\"" + jsondata[i].courseId + "\","
			    		+ "\"Name\":\"" + jsondata[i].courseId + "-" + jsondata[i].courseName + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#relateCourse").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
	
	$.ajax({
   		url: 'userManageAction_findxueyuanByLevel',
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
        			var le = jsondata[i].userLevel;
        			var lev = le.split(",");
        			var levelq = "";
        			if(le != "") {
        				for(var j=0; j<lev.length; j++){
        					if(j != 0)
        						levelq += ",";
        					if(lev[j] == "JY")
        						levelq += "教员";				
        					else if(lev[j] == "ZZ")
        						levelq += "作者";
        					else  if(lev[j] == "XY")
        						levelq += "学员";	
        					else  if(lev[j] == "YK")
        						levelq += "游客";
        				}
        			}
        			
        			var str = "{\"ID\":\"" + jsondata[i].userId + "\","
			    		+ "\"Name\":\"" + jsondata[i].userId + "-" + jsondata[i].userName + "-" + levelq + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#userStartId").combobox('loadData', mydata);
        		$("#userEndId").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
});


//用户关联课程选择
function selectcourse() {
	var formData = new FormData();
	
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
        			var str = "{\"ID\":\"" + jsondata[i].courseId + "\","
			    		+ "\"Name\":\"" + jsondata[i].courseName + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
        		
        		$("#userAndcourse").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});
}

