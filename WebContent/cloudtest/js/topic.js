/**
 * 
 */
var topicId;
var ju;
var whichlayer;

//战法训法查询选择
function select() {
	var f = 0;
	if($("#selectContent").val() != "")
		f += 1;
	if($("#selectContent2").val() != "")
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
	 if(selectName == "标题：")
		 selectName = "BT";
	 else if(selectName == "发布人：")
		 selectName = "FBR";
	
	 var params = "{\"selectName\":\"" + selectName + "\","
	 				+ "\"selectContent1\":\"" + $("#selectContent").val() + "\","
	 				+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'topicManageAction_findTopic',
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
	        		var str = "{\"topicId\":\"" + jsondata[i].topicId + "\","
				    		+ "\"topicTitle\":\"" + jsondata[i].topicTitle + "\","
				    		+ "\"topicAuthor\":\"" + jsondata[i].topicAuthor + "\","
				    		+ "\"topicType1\":\"" + jsondata[i].topicType1 + "\","
				    		+ "\"topicType2\":\"" + jsondata[i].topicType2 + "\","
				    		+ "\"topicTime\":\"" + jsondata[i].topicTime + "\","
				    		+ "\"topicNumber\":\"" + jsondata[i].topicNumber + "\","
				    		+ "\"topicAccessNumber\":\"" + jsondata[i].topicAccessNumber + "\","
				    		+ "\"topicTop\":\"" + jsondata[i].topicTop + "\","
				    		+ "\"topicPriority\":\"" + jsondata[i].topicPriority + "\"}";
	      				
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


//添加模块
function add_topic() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	
	$("#topicName").val("");
	$("#topicName").focus();
	$("#topicRely").val("");
	$("#topicPriority").val("");

	addlock();
}


//提交模块
function submit_topic(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();
	var f = $("#topicPriority").val();
	if(f == "")
		f = 0;
	var params = "{\"topicName\":\"" + $("#topicName").val() + "\","
	 			+ "\"topicRely\":\"" + $("#topicRely").val() + "\","
	 			+ "\"topicPriority\":\"" + f + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'topicManageAction_addTopic',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_topic();
	        	cancel_topic();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑话题
function edit_topic (){
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
	
	topicId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	formData.append("params", topicId);
	
	// ajax传输
	$.ajax({
		url: 'topicManageAction_findTopicById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	
	        	$("#topicTitle").val(jsondata.topicTitle);
	        	$("#topicTitle").focus();
	        	$("#topicAuthor").val(jsondata.topicAuthor);
	        	$("#topicTime").val(jsondata.topicTime);
	        	$("#topicNumber").val(jsondata.topicNumber);
	        	$("#topicAccessNumber").val(jsondata.topicAccessNumber);
	        	$("#topicType1").val(jsondata.topicType1);
	        	$("#topicType2").val(jsondata.topicType2);
	        	$("#topicTop").val(jsondata.topicTop);
	        	$("#topicContent").val(jsondata.topicContent);
	        	//$("#topicTitle").val(jsondata.topicTitle);
	        	
	        	$("#topicPriority").val(jsondata.topicPriority);
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//更新话题
function update_topic(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();	 
	var params = "{\"topicTitle\":\"" + $("#topicTitle").val() + "\","
				+ "\"topicId\":" + topicId + ","
				+ "\"topicAuthor\":\"" + $("#topicAuthor").val() + "\","
				+ "\"topicTime\":\"" + $("#topicTime").val() + "\","
				+ "\"topicNumber\":\"" + $("#topicNumber").val() + "\","
				+ "\"topicAccessNumber\":\"" + $("#topicAccessNumber").val() + "\","
				+ "\"topicType1\":\"" + $("#topicType1").val() + "\","
				+ "\"topicType2\":\"" + $("#topicType2").val() + "\","
				+ "\"topicTop\":\"" + $("#topicTop").val() + "\","
				+ "\"topicContent\":\"" + $("#topicContent").val() + "\","
				+ "\"topicPriority\":\"" + $("#topicPriority").val() + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'topicManageAction_updateTopic',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_topic();	        	
	        	cancel_topic();
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
		url: 'topicManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#topicPriority").val(data);
	        	//refresh_topic();	        	
	        	//cancel_topic();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_topic() {
	//$("#topicId").val("");   //jqury
	$("#topicTitle").val("");   
	$("#topicAuthor").val("");
	$("#topicTime").val("");
	$("#topicNumber").val("");
	$("#topicAccessNumber").val("");
	$("#topicType1").val("");
	$("#topicType2").val("");
	$("#topicTop").val("");
	$("#topicContent").val("");
	$("#topicPriority").val("");

	
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
function delete_topic (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	topicId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除论坛模块',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#topicdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//确认删除论坛话题内容
function del_confirm(){
	var formData = new FormData();
	formData.append("params",topicId);
	
	// ajax传输
	$.ajax({
		url: 'topicManageAction_deleteTopic',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_topic();
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
    
}*/


function judge() {
	var name = $("#topicName").val();
	if(name == ""){
		ju = 1;
		layer.alert("战法训法名不能为空，请重新输入！")
		return ;
	}
	
	var name1 = $("#topicRephotoFile").val();
	if(name1 != "")
		var file1 = $("#topicRephotoFile")[0].files[0].size;
		if(file1 > 307200){
		ju = 1;
		layer.alert("推荐图大于300KB，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#topicPhotoFile").val();
	if(name2 != "")
		var file2 = $("#topicPhotoFile")[0].files[0].size;
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
	
	refresh_topic();
});


//刷新数据显示表
function refresh_topic(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'topicManageAction_showAllTopic',
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
	       			var str = "{\"topicId\":\"" + jsondata[i].topicId + "\","
				    		+ "\"topicTitle\":\"" + jsondata[i].topicTitle + "\","
				    		+ "\"topicAuthor\":\"" + jsondata[i].topicAuthor + "\","
				    		+ "\"topicType1\":\"" + jsondata[i].topicType1 + "\","
				    		+ "\"topicType2\":\"" + jsondata[i].topicType2 + "\","
				    		+ "\"topicTime\":\"" + jsondata[i].topicTime + "\","
				    		+ "\"topicNumber\":\"" + jsondata[i].topicNumber + "\","
				    		+ "\"topicAccessNumber\":\"" + jsondata[i].topicAccessNumber + "\","
				    		+ "\"topicTop\":\"" + jsondata[i].topicTop + "\","
				    		+ "\"topicPriority\":\"" + jsondata[i].topicPriority + "\"}";
	      				
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
		colNames:["编号","标题","发布人","发布时间","评论数","访问数","优先级","父模块","子模块"],
		colModel:[
		          {name:"topicId",index:"topicId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"topicTitle",index:"topicTitle",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"topicAuthor",index:"topicAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"topicTime",index:"topicTime",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"topicNumber",index:"topicNumber",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"topicAccessNumber",index:"topicAccessNumber",editable:true,width:70,align:"left",sorttype:"int"},
		          //{name:"topicTop",index:"topicTop",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"topicPriority",index:"topicPriority",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"topicType1",index:"topicType1",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"topicType2",index:"topicType2",editable:true,width:110,align:"left",sorttype:"string"},
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
		if(select == "标题："){
			type = 1;
		} else if(select == "发布人："){
			type = 2;
		}
		var formData = new FormData();
		var params = "{\"value\":\""+ value + "\",\"type\":" + type + "}";
		formData.append("params", params);
		
		if(value == ""){
			$("#mhcx").html("");
		}else {	
			$.ajax({
				url: 'topicManageAction_MHCX',
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
								content += "<option>" + jsonData[i].topicTitle + "</option>";
							if(type == 2)
								content += "<option>" + jsonData[i].topicAuthor + "</option>";
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





