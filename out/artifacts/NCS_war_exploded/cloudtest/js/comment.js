/**
 * 
 */
var commentId;
var ju;
var whichlayer;

//战法训法查询选择
function select() {
	var f = 0;
	if($("#selectContent").val() != "")
		f += 1;
	if(f == 0){
		layer.alert("请输入查询条件");
		return ;
	}
	if(f > 1){
		layer.alert("查询条件过多，请重新输入");
		return ;
	}
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();
	 var selectName = $("#selectName").val();
	 var type = 0;
	 if(selectName == "评论人：")
		 type = 1
	 else if(selectName == "回复人：")
		 type = 2
	
	 var params = "{\"type\":\"" + type + "\","
	 				+ "\"selectContent\":\"" + $("#selectContent").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'commentManageAction_findComment',
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
	        		var str = "{\"commentId\":\"" + jsondata[i].commentId + "\","
				    		+ "\"commentAuthor\":\"" + jsondata[i].commentAuthor + "\","
				    		+ "\"commentTime\":\"" + jsondata[i].commentTime + "\","
				    		+ "\"commentReplyAuthor\":\"" + jsondata[i].commentReplyAuthor + "\","
				    		+ "\"commentContent\":\"" + jsondata[i].commentContent + "\"}";
	      				
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


//添加话题
function add_comment() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	
	$("#commentName").val("");
	$("#commentName").focus();
	$("#commentRely").val("");
	$("#commentPriority").val("");

	addlock();
}


//提交话题
function submit_comment(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();
	var f = $("#commentPriority").val();
	if(f == "")
		f = 0;
	var params = "{\"commentName\":\"" + $("#commentName").val() + "\","
	 			+ "\"commentRely\":\"" + $("#commentRely").val() + "\","
	 			+ "\"commentPriority\":\"" + f + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'commentManageAction_addComment',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_comment();
	        	cancel_comment();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑话题
function edit_comment (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	
	addlock();
	//$("#tijiao").css("display","none");
	$("#baocun").attr("disabled", false);
	$("#top").css("display","");
	$("#del_content").css("display","");
	$("#see_content").css("display","");
	
	commentId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	formData.append("params", commentId);
	
	// ajax传输
	$.ajax({
		url: 'commentManageAction_findCommentById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	
	        	$("#commentTitle").val(jsondata.commentTitle);
	        	$("#commentTitle").focus();
	        	$("#commentAuthor").val(jsondata.commentAuthor);
	        	$("#commentTime").val(jsondata.commentTime);
	        	$("#commentNumber").val(jsondata.commentNumber);
	        	$("#commentType1").val(jsondata.commentType1);
	        	$("#commentType2").val(jsondata.commentType2);
	        	$("#commentTop").val(jsondata.commentTop);
	        	$("#commentContent").val(jsondata.commentContent);
	        	//$("#commentTitle").val(jsondata.commentTitle);
	        	
	        	$("#commentPriority").val(jsondata.commentPriority);
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//更新话题
function update_comment(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();	 
	var params = "{\"commentTitle\":\"" + $("#commentTitle").val() + "\","
				+ "\"commentId\":" + commentId + ","
				+ "\"commentAuthor\":\"" + $("#commentAuthor").val() + "\","
				+ "\"commentTime\":\"" + $("#commentTime").val() + "\","
				+ "\"commentNumber\":\"" + $("#commentNumber").val() + "\","
				+ "\"commentType1\":\"" + $("#commentType1").val() + "\","
				+ "\"commentType2\":\"" + $("#commentType2").val() + "\","
				+ "\"commentTop\":\"" + $("#commentTop").val() + "\","
				+ "\"commentContent\":\"" + $("#commentContent").val() + "\","
				+ "\"commentPriority\":\"" + $("#commentPriority").val() + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'commentManageAction_updateComment',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_comment();	        	
	        	cancel_comment();
	        	layer.alert("编辑成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}


//获取最高优先级
function set_top(){
	// ajax传输
	$.ajax({
		url: 'commentManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#commentPriority").val(data);
	        	//refresh_comment();	        	
	        	//cancel_comment();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_comment() {
	//$("#commentId").val("");   //jqury
	$("#commentTitle").val("");   
	$("#commentAuthor").val("");
	$("#commentTime").val("");
	$("#commentNumber").val("");
	$("#commentType1").val("");
	$("#commentType2").val("");
	$("#commentTop").val("");
	$("#commentContent").val("");
	$("#commentPriority").val("");

	
	//$("#tijiao").css("display","");
	$("#top").css("display","none");
	//$("#tijiao").attr("disabled", true);
	$("#baocun").attr("disabled",true);
	$("#del_content").css("display","none");
	$("#see_content").css("display","none");

	removelock();
	//layer.close(whichlayer);
}


//删除论坛话题
function delete_comment (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	commentId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除论坛模块',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#commentdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//确认删除论坛话题内容
function del_confirm(){
	var formData = new FormData();
	formData.append("params",commentId);
	
	// ajax传输
	$.ajax({
		url: 'commentManageAction_deleteComment',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_comment();
	        	layer.alert("删除成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("删除失败");
	    }
	});
	
}


//战法训法参考文献保存
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
    
    refer = JSON.stringify(object);
    layer.close(whichlayer);
}*/


function judge() {
	var name = $("#commentName").val();
	if(name == ""){
		ju = 1;
		layer.alert("战法训法名不能为空，请重新输入！")
		return ;
	}
	
	var name1 = $("#commentRephotoFile").val();
	if(name1 != "")
		var file1 = $("#commentRephotoFile")[0].files[0].size;
		if(file1 > 307200){
		ju = 1;
		layer.alert("推荐图大于300KB，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#commentPhotoFile").val();
	if(name2 != "")
		var file2 = $("#commentPhotoFile")[0].files[0].size;
		if(file2 > 307200){
		ju = 1;
		layer.alert("缩略图大于300KB，请重新选择！");
		return ;
	}
}


$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	refresh_comment();
});


//刷新数据显示表
function refresh_comment(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'commentManageAction_showAllComment',
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
	       			var str = "{\"commentId\":\"" + jsondata[i].commentId + "\","
				    		+ "\"commentAuthor\":\"" + jsondata[i].commentAuthor + "\","
				    		+ "\"commentTime\":\"" + jsondata[i].commentTime + "\","
				    		+ "\"commentReplyAuthor\":\"" + jsondata[i].commentReplyAuthor + "\","
				    		+ "\"commentContent\":\"" + jsondata[i].commentContent + "\"}";
	      				
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
		colNames:["编号","评论人","回复人","评论时间","内容"],
		colModel:[
		          {name:"commentId",index:"commentId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"commentAuthor",index:"commentAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"commentReplyAuthor",index:"commentReplyAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"commentTime",index:"commentTime",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"commentContent",index:"commentContent",editable:true,width:200,align:"left",sorttype:"string"},
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


function addlock(){
	$("#tianjia").attr("disabled",true);
	$("#shanchu").attr("disabled",true);
	$("#bianji").attr("disabled",true);
	$("#shuaxin").attr("disabled",true);
}

function removelock(){
	$("#tianjia").attr("disabled",false);
	$("#shanchu").attr("disabled",false);
	$("#bianji").attr("disabled",false);
	$("#shuaxin").attr("disabled",false);
}

//模糊查询
$(function(){
	$("#selectContent").on("keyup",function(e){
		var value = $(this).val();
		var select = $("#selectName").val();
		var type;
		if(select == "评论人："){
			type = 1;
		} else if(select == "回复人："){
			type = 2;
		}
		var formData = new FormData();
		var params = "{\"value\":\""+ value + "\",\"type\":" + type + "}";
		formData.append("params", params);
		
		if(value == ""){
			$("#mhcx").html("");
		}else {	
			$.ajax({
				url: 'commentManageAction_MHCX',
			    type: "POST",  
			    async: false,  
			    cache: false, 
			    processData: false,// 告诉jQuery不要去处理发送的数据
			    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
			    data: formData,
				success: function(data) {
					if(data == null){
						$("#mhcx").html("");
					}else {
						var jsonData = eval('(' + data + ')');
						var content = "";
						for(var i=0; i<jsonData.length; i++) {
							if(type == 1)
								content += "<option>" + jsonData[i].commentAuthor + "</option>";
							if(type == 2)
								content += "<option>" + jsonData[i].commentReplyAuthor + "</option>";
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
});





