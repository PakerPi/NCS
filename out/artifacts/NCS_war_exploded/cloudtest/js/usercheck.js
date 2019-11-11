/**
 * 
 */
var userId;
var whichlayer;
var levelq;
var mydata;


//用户查询选择
function user_select() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if($("#selectContent2").val() != "")
		f += 1;
	if($("#selectContent3").val() != "")
		f += 1;
	if($("#selectContent4").val() != "")
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
	 if(selectName1 == "用户姓名：")
		 selectName1 = "YHXM";
	 else if(selectName1 == "手机号：")
		 selectName1 = "SJH";
	 
	 var level = $("#selectContent2").val();
	 if(level == "游客")
		 level = "YK";
	 else if(level == "学员")
		 level = "XY";
	 else if(level == "教员")
		 level = "JY";
	 
	 var state = $("#selectContent3").val();
	 if(state == "有效")
		 state = "YX";
	 else if(state == "无效")
		 state = "WX";
	 
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 			+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\","
	 			+ "\"selectContent2\":\"" + level + "\","
	 			+ "\"selectContent3\":\"" + state + "\","
	 			+ "\"selectContent4\":\"" + $("#selectContent4").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'userManageAction_findCheckUser',
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
//$('#selectContent1').on('click', function(){
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
      			if(selectName1 == "用户姓名：")
	        			str = "{\"ID\":\"" + jsondata[i].userName + "\","
				    		+ "\"Name\":\"" + jsondata[i].userId + "-" + jsondata[i].userName + "\"}";
      			else if(selectName1 == "手机号：")
      				str = "{\"ID\":\"" + jsondata[i].userPhone + "\","
		    				+ "\"Name\":\"" + jsondata[i].userPhone + "\"}";
      			
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


//启用用户
function start_user() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择数据");
		return;
	}
	
	userId = [];
	var trList = $("#table_list_2").find("tr");
	for(var i=1; i<trList.length; i++){
		if((trList.eq(i).hasClass('success'))){
			var Id = trList.eq(i).find("td").eq(1).text();
			var str = "{\"userId\":\"" + Id + "\",\"userAccountstate\":\"YX\"}";
			var json = $.parseJSON(str);
			userId.push(json);
		}
	}
	
	whichlayer = layer.open({
		title : '启用用户',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#userStart')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
	
}


//用户启用确认
function startConfirm() {
	var formData = new FormData();
	formData.append("params", JSON.stringify(userId));

	// ajax传输
	$.ajax({
		url: 'userManageAction_updateUserstate',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh();
	        	cancel();
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}





//禁用用户
function end_user (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择数据");
		return;
	}
	
	userId = [];
	var trList = $("#table_list_2").find("tr");
	for(var i=1; i<trList.length; i++){
		if(trList.eq(i).hasClass('success')){
			var Id = trList.eq(i).find("td").eq(1).text();
			var str = "{\"userId\":\"" + Id + "\",\"userAccountstate\":\"WX\"}";
			var json = $.parseJSON(str);
			userId.push(json);
		}
	}
	
	whichlayer = layer.open({
		title : '禁用用户',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#userEnd')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//用户禁用确认
function endConfirm(){
	var formData = new FormData();
	formData.append("params", JSON.stringify(userId));

	// ajax传输
	$.ajax({
		url: 'userManageAction_updateUserstate',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh();
	        	cancel();
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//取消
function cancel() {

	refresh();
	layer.close(whichlayer);
}

$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	refresh();
	selectCondition();
});


//刷新数据显示表
function refresh(){
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
	        }
	    },
	    error: function(err) {
	    	//layer.alert("删除失败");
	    }
	});
}

function analyze(jsondata){
	for(var i in jsondata){
		if(jsondata[i].userLevel != "GLY"){
			var le = jsondata[i].userLevel;
			var lev = le.split(",");
			levelq = "";
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
			
			var state = jsondata[i].userAccountstate;
			if(state == "YX")
				state = "有效";
			else if(state == "WX")
				state = "无效";
			
			var str = "{\"userId\":\"" + jsondata[i].userId + "\","
	    		+ "\"userName\":\"" + jsondata[i].userName + "\","
	    		+ "\"userAccount\":\"" + jsondata[i].userAccount + "\","
	    		+ "\"userPhone\":\"" + jsondata[i].userPhone + "\","
	    		+ "\"userLevel\":\"" + levelq + "\","
	    		+ "\"userAccountstate\":\"" + state + "\","
	    		+ "\"userRegtime\":\"" + jsondata[i].userRegtime + "\"}";
				
			var json = eval('(' + str + ')');
			mydata.push(json);
		}
	}
}

function getTable(mydata){
	$("#table_list_2").jqGrid('clearGridData');  //清空表格
	$("#table_list_2").jqGrid('setGridParam',{  // 重新加载数据
	      datatype:'local',
	      data : mydata,   
	      //page:1
	}).trigger("reloadGrid");
	$("#table_list_2").jqGrid( {
		data:mydata,
		datatype:"local",
		height:450,
		autowidth:true,
		shrinkToFit:true,
		rowNum:20,
		rowList:[10,20,50],
		colNames:["编号","用户姓名","警号","手机号","用户类型","用户状态","注册日期"],
		colModel:[
		          {name:"userId",index:"userId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"userName",index:"userName",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"userAccount",index:"userAccount",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"userPhone",index:"userPhone",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"userLevel",index:"userLevel",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"userAccountstate",index:"userAccountstate",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"userRegtime",index:"userRegtime",editable:true,width:110,align:"left",sorttype:"string"}
		          ],
		pager:"#pager_list_2",
		viewrecords:true,
		caption:false,
		multiselect: true,
		add:true,
		edit:true,
		addtext:"Add",
		edittext:"Edit",
		hidegrid:false});
	
	$(window).bind("resize",function(){
		var width=$(".jqGrid_wrapper").width();
		$("#table_list_2").setGridWidth(width)})
}















