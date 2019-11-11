/**
 * 
 */
var moduleId;
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
	 else if(selectName == "作者：")
		 selectName = "ZZ";
	
	 var params = "{\"selectName\":\"" + selectName + "\","
	 				+ "\"selectContent\":\"" + $("#selectContent").val() + "\","
	 				+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'moduleManageAction_findModule',
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
	       			var str = "{\"moduleId\":\"" + jsondata[i].moduleId + "\","
				    		+ "\"moduleTitle\":\"" + jsondata[i].moduleTitle + "\","
				    		+ "\"moduleAuthor\":\"" + jsondata[i].moduleAuthor + "\","
				    		+ "\"moduleTime\":\"" + jsondata[i].moduleTime  + "\","
				    		+ "\"moduleClickNum\":\"" + jsondata[i].moduleClickNum + "\","
				    		+ "\"moduleType\":\"" + jsondata[i].moduleType + "\","
				    		+ "\"modulePriority\":\"" + jsondata[i].modulePriority + "\"}";
	      				
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


//添加论坛模块
function add_module() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	
	$("#moduleName").val("");
	$("#moduleName").focus();
	$("#moduleRely").val("");
	$("#modulePriority").val("");

	addlock();
}


//提交论坛模块
function submit_module(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();
	var f = $("#modulePriority").val();
	if(f == "")
		f = 0;
	var params = "{\"moduleName\":\"" + $("#moduleName").val() + "\","
	 			+ "\"moduleRely\":\"" + $("#moduleRely").val() + "\","
	 			+ "\"modulePriority\":\"" + f + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'moduleManageAction_addModule',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_module();
	        	cancel_module();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑战法训法
function edit_module (){
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
	
	moduleId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	formData.append("params", moduleId);
	
	// ajax传输
	$.ajax({
		url: 'moduleManageAction_findModuleById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	
	        	$("#moduleName").val(jsondata.moduleName);
	        	$("#moduleTitle").focus();
	        	$("#moduleRely").val(jsondata.moduleRely);
	        	$("#modulePriority").val(jsondata.modulePriority);
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//更新战法训法
function update_module(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();	 
	var params = "{\"moduleName\":\"" + $("#moduleName").val() + "\","
				+ "\"moduleId\":" + moduleId + ","
				+ "\"moduleRely\":\"" + $("#moduleRely").val() + "\","
				+ "\"modulePriority\":\"" + $("#modulePriority").val() + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'moduleManageAction_updateModule',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_module();	        	
	        	cancel_module();
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
		url: 'moduleManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#modulePriority").val(data);
	        	//refresh_module();	        	
	        	//cancel_module();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_module() {
	//$("#moduleId").val("");   //jqury
	$("#moduleName").val("");   
	$("#moduleRely").val("");
	$("#modulePriority").val("");

	
	$("#tijiao").css("display","");
	$("#top").css("display","none");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display","none");
	$("#del_content").css("display","none");
	$("#see_content").css("display","none");

	removelock();
	//layer.close(whichlayer);
}


//删除论坛模块
function delete_module (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	moduleId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除论坛模块',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#moduledelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//确认删除论坛模块内容
function del_confirm(){
	var formData = new FormData();
	formData.append("params",moduleId);
	
	// ajax传输
	$.ajax({
		url: 'moduleManageAction_deleteModule',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_module();
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
	var name = $("#moduleName").val();
	if(name == ""){
		ju = 1;
		layer.alert("战法训法名不能为空，请重新输入！")
		return ;
	}
	
	var name1 = $("#moduleRephotoFile").val();
	if(name1 != "")
		var file1 = $("#moduleRephotoFile")[0].files[0].size;
		if(file1 > 307200){
		ju = 1;
		layer.alert("推荐图大于300KB，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#modulePhotoFile").val();
	if(name2 != "")
		var file2 = $("#modulePhotoFile")[0].files[0].size;
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
	
	refresh_module();
});


//刷新数据显示表
function refresh_module(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'moduleManageAction_showAllModule',
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
	       			var str = "{\"moduleId\":\"" + jsondata[i].moduleId + "\","
				    		+ "\"moduleName\":\"" + jsondata[i].moduleName + "\","
				    		+ "\"moduleRely\":\"" + jsondata[i].moduleRely + "\","
				    		+ "\"modulePriority\":\"" + jsondata[i].modulePriority + "\"}";
	      				
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
		colNames:["编号","版块名称","父版块","优先级"],
		colModel:[
		          {name:"moduleId",index:"moduleId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"moduleName",index:"moduleName",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"moduleRely",index:"moduleRely",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"modulePriority",index:"modulePriority",editable:true,width:70,align:"left",sorttype:"int"},
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
				url: 'moduleManageAction_getTitle',
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
							content += "<option>" + jsonData[i].moduleTitle + "</option>";
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





