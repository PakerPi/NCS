/**
 * 
 */
var author_jsondata = "";
var recommand_jsondata = "";
var course_jsondata = "";
var trainId;
var refer = "";
var trainMark;
var trainCollectNum;
var ju;
var whichlayer;
var jdc;
var uploading = false;
var close_index;

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
	 else if(selectName == "作者：")
		 selectName = "ZZ";
	
	 var params = "{\"selectName\":\"" + selectName + "\","
	 				+ "\"selectContent\":\"" + $("#selectContent").val() + "\","
	 				+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'trainManageAction_findTrain',
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
	       			var str = "{\"trainId\":\"" + jsondata[i].trainId + "\","
				    		+ "\"trainTitle\":\"" + jsondata[i].trainTitle + "\","
				    		+ "\"trainAuthor\":\"" + jsondata[i].trainAuthor + "\","
				    		+ "\"trainTime\":\"" + jsondata[i].trainTime  + "\","
				    		+ "\"trainClickNum\":\"" + jsondata[i].trainClickNum + "\","
				    		//+ "\"trainType\":\"" + jsondata[i].trainType + "\","
				    		+ "\"trainPriority\":\"" + jsondata[i].trainPriority + "\"}";
	      				
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


//添加战法训法
function add_train() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	
	$("#trainTitle").val("");
	$("#trainTitle").focus();
	$("#trainAuthor").val("");
	$("#trainTime").val("");
	$("#trainContent").val(null);
	$("#trainPriority").val("");
	$("#trainType").val("");

	addlock();
}


//提交战法训法
function submit_train(){
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
	var f = $("#trainPriority").val();
	if(f == "")
		f = 0;
	var params = "{\"trainTitle\":\"" + $("#trainTitle").val() + "\","
	 			+ "\"trainAuthor\":\"" + $("#trainAuthor").val() + "\","
	 			+ "\"trainTime\":\"" + $("#trainTime").val() + "\","
	 			+ "\"trainPriority\":\"" + f + "\"}";
	if( $("#trainContentFile").val()!= "")
		formData.append("ContentFile",$("#trainContentFile")[0].files[0]); 
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'fileManageAction_addTrain',
	    type: "POST",  
	    //async: false,  
	    //cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '训法战法文件传输进度',
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
	        	refresh_train();
	        	cancel_train();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑战法训法
function edit_train (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	
	addlock();
	$("#tijiao").css("display","none");
	$("#baocun").css("display","");
	$("#top").css("display","");
	$("#del_content").css("display","");
	$("#see_content").css("display","");
	
	trainId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	formData.append("params", trainId);
	
	// ajax传输
	$.ajax({
		url: 'trainManageAction_findTrainById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	
	        	$("#trainTitle").val(jsondata.trainTitle);
	        	$("#trainTitle").focus();
	        	$("#trainAuthor").val(jsondata.trainAuthor);
	        	$("#trainTime").val(jsondata.trainTime);
	        	$("#trainPriority").val(jsondata.trainPriority);
	        	$('#trainType').val(jsondata.trainType);
	        	$('#trainContentFile').val(null);
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//更新战法训法
function update_train(){
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
	
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();	 
	var params = "{\"trainTitle\":\"" + $("#trainTitle").val() + "\","
				+ "\"trainId\":" + trainId + ","
				+ "\"trainAuthor\":\"" + $("#trainAuthor").val() + "\","
				+ "\"trainTime\":\"" + $("#trainTime").val() + "\","
				+ "\"trainPriority\":\"" + $("#trainPriority").val() + "\","
				+ "\"trainType\":\"" + $("#trainType").val() + "\"}";
	formData.append("params", params);
	if( $("#trainContentFile").val() != ""){
		formData.append("ContentFile",$("#trainContentFile")[0].files[0]);
	}

	
	// ajax传输
	$.ajax({
		url: 'fileManageAction_updateTrain',
	    type: "POST",  
	    //async: false,  
	    //cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '训法战法文件传输进度',
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
	        	refresh_train();	        	
	        	cancel_train();
	        	layer.alert("编辑成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}


//优先级置顶
function set_top(){
	// ajax传输
	$.ajax({
		url: 'trainManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#trainPriority").val(data);
	        	//refresh_train();	        	
	        	//cancel_train();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_train() {
	//$("#trainId").val("");   //jqury
	$("#trainTitle").val("");   
	$("#trainAuthor").val("");
	$("#trainTime").val("");
	$("#trainPriority").val("");
	$("#trainType").val("");
	$("#trainContentFile").val("");
	
	$("#tijiao").css("display","");
	$("#top").css("display","none");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display","none");
	$("#del_content").css("display","none");
	$("#see_content").css("display","none");

	removelock();
	//layer.close(whichlayer);
}


//删除战法训法
function delete_train (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	trainId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除战法训法',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#traindelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//确认删除战法训法内容
function del_confirm(){
	var formData = new FormData();
	formData.append("params",trainId);
	
	// ajax传输
	$.ajax({
		url: 'trainManageAction_deleteTrain',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_train();
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


//战法训法内容预览
$('#see_content').on('click', function() {
	var formData = new FormData();
	formData.append("params", trainId);
	
	// ajax传输
   	$.ajax({
   		url: 'trainManageAction_findTrainById',
   	    type: "POST",  
   	    async: false,  
   	    cache: false, 
   	    processData: false,// 告诉jQuery不要去处理发送的数据
   	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   	    data: formData,
   	    success: function(data){
   	    	if(data != null){
   	    		var jsonData = eval('(' + data + ')');
   	    		//var url = "http://localhost:8080/NCS/" + jsonData[0].trainContent;
   	    		var url = jsonData.trainContent;
   	    		if(url == ""){
   	    			layer.alert("该战法训法暂无内容，请导入后保存！")
   	    			return;
   	    		}
   	    		var url2 = url.replace("192.168.20.72:59141", "59.52.62.251:8011")
   	    		
   	    		layer.open({
   	    			title : '战法训法内容',
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



function del_Content(){
	var formData = new FormData();
	formData.append("params",trainId);
	
	// ajax传输
	$.ajax({
		url: 'trainManageAction_deleteContent',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data != null){
	    		layer.alert("战法训法内容删除成功");
	    	}
	    },
	    error: function(err) {
	    	layer.alert("战法训法内容删除失败");
	    }
	});
}


function judge() {
	var name = $("#trainTitle").val();
	if(name == ""){
		ju = 1;
		layer.alert("战法训法名不能为空，请重新输入！")
		return ;
	}
	
//	var name1 = $("#trainRephotoFile").val();
//	if(name1 != "")
//		var file1 = $("#trainRephotoFile")[0].files[0].size;
//		if(file1 > 307200){
//		ju = 1;
//		layer.alert("推荐图大于300KB，请重新选择！");
//		return ;
//	}
//	
//	
//	var name2 = $("#trainPhotoFile").val();
//	if(name2 != "")
//		var file2 = $("#trainPhotoFile")[0].files[0].size;
//		if(file2 > 307200){
//		ju = 1;
//		layer.alert("缩略图大于300KB，请重新选择！");
//		return ;
//	}
}


$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
	
	refresh_train();
});


//刷新数据显示表
function refresh_train(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'trainManageAction_showAllTrain',
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
	       			var str = "{\"trainId\":\"" + jsondata[i].trainId + "\","
				    		+ "\"trainTitle\":\"" + jsondata[i].trainTitle + "\","
				    		+ "\"trainAuthor\":\"" + jsondata[i].trainAuthor + "\","
				    		+ "\"trainTime\":\"" + jsondata[i].trainTime  + "\","
				    		+ "\"trainClickNum\":\"" + jsondata[i].trainClickNum + "\","
				    		//+ "\"trainType\":\"" + jsondata[i].trainType + "\","
				    		+ "\"trainPriority\":\"" + jsondata[i].trainPriority + "\"}";
	      				
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
		colNames:["编号","标题","作者","时间","点击次数","优先级"],
		colModel:[
		          {name:"trainId",index:"trainId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"trainTitle",index:"trainTitle",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"trainAuthor",index:"trainAuthor",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"trainTime",index:"trainTime",editable:true,width:70,align:"left",sorttype:"string"},//,formatter:"number"
		          {name:"trainClickNum",index:"trainClickNum",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"trainPriority",index:"trainPriority",editable:true,width:70,align:"left",sorttype:"int"},
		          //{name:"trainType",index:"trainType",editable:true,width:150,align:"left",sorttype:"string"},
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
		if(select == "作者："){
			$("#mhcx").html("");
			return ;
		}	
		if(value == ""){
			$("#mhcx").html("");
		}else {	
			$.ajax({
				type: 'post',
				url: 'trainManageAction_getTitle',
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
							content += "<option>" + jsonData[i].trainTitle + "</option>";
						}
						$("#mhcx").html(content);
					}
				},
//				error: function() {
//					layer.alert("模糊查询失败");
//				}
			});
		}
	});
});





