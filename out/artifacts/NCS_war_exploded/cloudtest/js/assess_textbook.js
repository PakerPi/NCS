/**
 * 
 */
var course_jsondata = "";
var textbook_jsondata = "";
var video_jsondata = "";
var user_jsondata = "";
var assessId;
var whichlayer;


//评价查询选择
function assess_select() {
	var f = 0;
	if($("#selectContent1").val() != "")
		f += 1;
	if($("#selectContent3").val() != "")
		f += 1;
	if(f == 0){
		layer.alert("请输入查询条件");
		return ;
	}
	if(f > 1){
		layer.alert("查询条件过多，请重新输入！");
		return ;
	}
	
	var selectName1 = $("#selectName1").val();
	 if(selectName1 == "用户ID：")
		 selectName1 = "YHID";
	 else if(selectName1 == "教材ID：")
		 selectName1 = "JCID";
	 
	 
	 var selectCondition =  $("#selectCondition").val();
	 if(selectCondition == "等于")
			selectCondition = "=";
	else if(selectCondition == "大于等于")
			selectCondition = ">=";
	else if(selectCondition == "小于等于")
			selectCondition = "<=";
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();	 
	 var params = "{\"selectName1\":\"" + selectName1 + "\","
	 			+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\","
	 			+ "\"selectName3\":\"" + $("#selectName3").val() + "\","
	 			+ "\"selectContent3\":\"" + $("#selectContent3").val() + "\","
	 			+ "\"selectCondition\":\"" + selectCondition + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'assessManageAction_findAssessTextbook',
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
        			var str = "{\"assessId\":\"" + jsondata[i][0].assessId + "\","
				    		+ "\"aimId\":\"" + jsondata[i][2].textbookId + "\","
				    		+ "\"aimName\":\"" + jsondata[i][2].textbookName + "\","
				    		+ "\"assessPeople\":\"" + jsondata[i][1].userName + "\","
				    		+ "\"assessContent\":\"" + jsondata[i][0].assessContent + "\","
				    		+ "\"assessMark\":\"" + jsondata[i][0].assessMark + "\","
				    		+ "\"assessTime\":\"" + jsondata[i][0].assessTime + "\"}";
        				
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


//删除评论
function delete_assess (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择数据");
		return;
	}
	//assessId = $('.success').find('td').eq(0).text();
	assessId = [];
	var trList = $("#table_list_2").find("tr");
	for(var i=1; i<trList.length; i++){
		if(trList.eq(i).hasClass('success')){
			var Id = trList.eq(i).find("td").eq(1).text();
			var str = "{\"assessId\":\"" + Id + "\"}";
			var json = $.parseJSON(str);
			assessId.push(json);
		}
	}
	
	whichlayer = layer.open({
		title : '删除评论',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#assessdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}
	
function delete_confirm(){
	var formData = new FormData();
	 formData.append("params", JSON.stringify(assessId));
	
	// ajax传输
	$.ajax({
		url: 'assessManageAction_deleteAssess',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	        if(data!=null){
	        	refresh();
	        	layer.close(whichlayer);
	        	layer.alert("删除成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败");
	    }
	});
}

function cancel(){
	refresh();
	layer.close(whichlayer);
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
		url: 'assessManageAction_showAllAssessTextbook',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	
	    	if(data!=null){
	        	var jsondata = $.parseJSON(data);
	        	//var jsondata = eval ('(' + data + ')');
	        	
	        	var mydata = [];
	      		for(var i in jsondata){      			
	      			var str = "{\"assessId\":\"" + jsondata[i][0].assessId + "\","
				    		+ "\"aimId\":\"" + jsondata[i][2].textbookId + "\","
				    		+ "\"aimName\":\"" + jsondata[i][2].textbookName + "\","
				    		+ "\"assessPeople\":\"" + jsondata[i][1].userName + "\","
				    		+ "\"assessContent\":\"" + jsondata[i][0].assessContent + "\","
				    		+ "\"assessMark\":\"" + jsondata[i][0].assessMark + "\","
				    		+ "\"assessTime\":\"" + jsondata[i][0].assessTime + "\"}";
	      				
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
	      //page:1
	}).trigger("reloadGrid");
	$("#table_list_2").jqGrid( {
		data:mydata,
		datatype:"local",
		height:450,
		autowidth:true,
		shrinkToFit:true,
		rowNum:20,
		rowList:[10,20,30],
		colNames:["编号","评价人","教材ID","教材名称","评分","评价时间","评价内容"],
		colModel:[
		          {name:"assessId",index:"assessId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"assessPeople",index:"assessPeople",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"aimId",index:"aimId",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"aimName",index:"aimName",editable:true,width:110,align:"left",sorttype:"string"},  
		          {name:"assessMark",index:"assessMark",editable:true,width:70,align:"left",sorttype:"double"},
		          {name:"assessTime",index:"assessTime",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"assessContent",index:"assessContent",editable:true,width:150,align:"left",sorttype:"string"}
		          ],
		pager:"#pager_list_2",
		viewrecords:true,
		caption:false,
		add:true,
		edit:true,
		multiselect:true,
		addtext:"Add",
		edittext:"Edit",
		hidegrid:false});
	
	$(window).bind("resize",function(){
		var width=$(".jqGrid_wrapper").width();
		$("#table_list_2").setGridWidth(width)})
}









