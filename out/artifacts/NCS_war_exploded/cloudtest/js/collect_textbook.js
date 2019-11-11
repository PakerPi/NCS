/**
 * 
 */
var course_jsondata = "";
var textbook_jsondata = "";
var video_jsondata = "";
var user_jsondata = "";
var collectId;
var whichlayer;


//收藏查询选择
function collect_select() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if(f == 0){
		layer.alert("请输入查询条件");
		return ;
	}
	
	var selectName1 = $("#selectName1").val();
	 if(selectName1 == "用户ID：")
		 selectName1 = "YHID";
	 else if(selectName1 == "教材ID：")
		 selectName1 = "JCID";
	 
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();	 
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 			+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'collectManageAction_findCollectTextbook',
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
	        	//if(st == ""){
        		for(var i in jsondata){        			    			
        			var str = "{\"collectId\":\"" + jsondata[i][0].collectId + "\","
			    		+ "\"aimId\":\"" + jsondata[i][2].textbookId + "\","
			    		+ "\"aimName\":\"" + jsondata[i][2].textbookName + "\","
			    		+ "\"collectPeople\":\"" + jsondata[i][1].userName + "\","
			    		+ "\"collectTime\":\"" + jsondata[i][0].collectTime + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
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
	var add;
	if(selectName1 == "用户ID：")
		add = "userManageAction_showAllUser";
	else if(selectName1 == "教材ID：")
		add = "textbookManageAction_showAllTextbook";
	
	$.ajax({
   		url: add,
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
	        	if(selectName1 == "用户ID："){
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].userId + "\","
				    		+ "\"Name\":\"" + jsondata[i].userId + "-" +jsondata[i].userName + "\"}";
	        			
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}
	        	else if(selectName1 == "教材ID："){
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].textbookId + "\","
				    		+ "\"Name\":\"" + jsondata[i].textbookId + "-" +jsondata[i].textbookName + "\"}";
	        			
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}
        		
        		$("#selectContent1").combobox('loadData', mydata);
    		}
   	    },
   	    error: function(err) {
   	    	layer.alert("导入失败，请稍候再试");
   	    }
   	});

}




//根据ID从textbook_info表里面提取教材名称
function findtextbook(id){
	var formData = new FormData();
	var params= "{\"textbookId\":\"" + id + "\"}"
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
	        	textbook_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}


//根据用户ID从user_info表中查找用户姓名
function findUserByUserId(id) {
	var formData = new FormData();
	var params= "{\"userId\":\"" + id + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'userManageAction_findUserByUserId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	user_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
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
		url: 'collectManageAction_showAllCollectTextbook',
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
        			var str = "{\"collectId\":\"" + jsondata[i][0].collectId + "\","
			    		+ "\"aimId\":\"" + jsondata[i][2].textbookId + "\","
			    		+ "\"aimName\":\"" + jsondata[i][2].textbookName + "\","
			    		+ "\"collectPeople\":\"" + jsondata[i][1].userName + "\","
			    		+ "\"collectTime\":\"" + jsondata[i][0].collectTime + "\"}";
        				
        			var json = eval('(' + str + ')');
	        		mydata.push(json);
	        	}
	        	
        		getTable(mydata);
	        }
	    },
	    error: function(err) {
	    	//layer.alert("删除失败");
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
			{data:mydata,
				datatype:"local",
				height:450,
				autowidth:true,
				shrinkToFit:true,
				rowNum:20,
				rowList:[10,20,30],
				colNames:["编号","收藏人","教材ID","教材名称","收藏日期"],
				colModel:[
				          {name:"collectId",index:"collectId",editable:true,width:70,align:"left",sorttype:"int",search:true},
				          {name:"collectPeople",index:"collectPeople",editable:true,width:90,align:"left",sorttype:"string"},
				          {name:"aimId",index:"aimId",editable:true,width:70,align:"left",sorttype:"int"},
				          {name:"aimName",index:"aimName",editable:true,width:110,align:"left",sorttype:"string"},  
				          {name:"collectTime",index:"collectTime",editable:true,width:110,align:"left",sorttype:"string"}
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




//模糊查询
/*$(function(){
	$("#selectContent1").on("keyup",function(e){
		var value = $(this).val();
		if(value == ""){
			$("#mhcx").html("");
		}else {
			var add;
			var select = $("#selectName1").val();
			if(select == "用户ID：")
				add = 'userManageAction_getFuzzyInfo';
			else if(select == "课程ID：")
				add = 'courseManageAction_getFuzzyInfo';
			else if(select == "教材ID：")
				add = 'textbookManageAction_getFuzzyInfo';
			else if(select == "视频ID：")
				add = 'videoManageAction_getFuzzyInfo';
			
			$.ajax({
				type: 'post',
				url: add,
				data: {
					params: value
				},
				dataType: 'json',
				success: function(data) {
					if(data == null){
						$("#mhcx").html("");
					}else {
						var jsonData = eval('(' + data + ')');
						var content = "";
						for(var i=0; i<jsonData.length; i++) {
							content += "<option value=" + jsonData[i].userId + ">" +  
									"姓名:&nbsp;" + jsonData[i].userName + "</option>";
						}
						$("#mhcx").html(content);
					}
				},
				error: function() {
					layer.alert("模糊查询失败");
				}
			});
		}
	});
});*/










