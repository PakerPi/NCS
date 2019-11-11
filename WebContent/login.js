/**
 * 
 */
function login(){
	
	var userphone= $('#username').val();
	var password = $('#password').val();

	if(""==userphone){
    	alert("用户账号不能为空！");
    	return ;
    }
	if(""==password){
    	alert("密码不能为空！");
        return ;
    }
	
	var formData = new FormData();
	var params ="{\"userPhone\":\"" + userphone + "\",\"userPassword\":\"" + password +"\"}";
	formData.append("params", params);
	
	$.ajax({
		url: 'userManageAction_userlogin',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	sessionStorage.setItem("login", "false");
	        	if(data == "YZCG"){
	        		sessionStorage.setItem("login", "true");
	        		url = "./cloudtest/page/index.html"
            		window.location.href = url;
            		//window.navigate(url);
            		//window.location.replace(url);
	        	}
	        	if(data == "YZSB"){
	        		alert("账号或密码错误，请重新登录！")
	        	}
	        	if(data == "FGLY"){
	        		alert("非管理员账号不能登录此系统！")
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("用户登录失败");
	    }
	});
	
}