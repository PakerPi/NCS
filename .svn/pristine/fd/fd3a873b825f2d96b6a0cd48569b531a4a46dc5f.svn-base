/**
 * 
 */
var author_jsondata = "";
var recommand_jsondata = "";
var course_jsondata = "";
var teamId;
var refer = "";
var teamMark;
var teamCollectNum;
var ju;
var whichlayer;

//教研团队查询选择
function select() {
	var f = 0;
	if($("#selectContent1").val() != "")
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
	
	var content2 = $("#selectContent2").val();
	if(content2 == "研究室")
		content2 = "YJS";
	else if(content2 == "课题组")
		content2 = "KTZ";
	else if(content2 == "训练专题")
		content2 = "XLZT";
	
	 $.jgrid.defaults.styleUI="Bootstrap";
	 var formData = new FormData();	
	 var params = "{\"selectContent1\":\"" + $("#selectContent1").val() + "\","
	 				+ "\"selectContent2\":\"" + content2 + "\"}";
	 formData.append("params", params);
	 
	// ajax传输
	$.ajax({
		url: 'teamManageAction_findTeam',
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
	        		var teamType = jsondata[i].teamType;
	        		if(teamType == "YJS")
	        			teamType = "研究室";
	        		else if(teamType == "KTZ")
	        			teamType = "课题组";
	        		else if(teamType == "XLZT")
	        			teamType = "训练专题";
	       			var str = "{\"teamId\":\"" + jsondata[i].teamId + "\","
				    		+ "\"teamTitle\":\"" + jsondata[i].teamTitle + "\","
				    		+ "\"teamLeader1\":\"" + jsondata[i].teamLeader1 + "\","
				    		+ "\"teamLeader2\":\"" + jsondata[i].teamLeader2 + "\","
				    		+ "\"teamMember\":\"" + jsondata[i].teamMember + "\","
				    		+ "\"teamContent\":\"" + jsondata[i].teamContent + "\","
				    		+ "\"teamType\":\"" + teamType + "\","
				    		+ "\"teamPriority\":\"" + jsondata[i].teamPriority + "\"}";
	      				
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


//添加教研团队
function add_team() {
	$("#tijiao").css("display","");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display","none");
	
	$("#teamTitle").val("");
	$("#teamTitle").focus();
	$("#teamContent").val(null);
	$("#teamPriority").val("");
	$("#teamType").val("");
	$("#teamLeader1").val("");
	$("#teamLeader2").val("");
	$("#teamMember").val("");

	addlock();
}


//提交教研团队
function submit_team(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var formData = new FormData();
	var f = $("#teamPriority").val();
	if(f == "")
		f = 0;
	var teamType = $("#teamType").val();
	if(teamType == "研究室")
		teamType = "YJS";
	else if(teamType == "课题组")
		teamType = "KTZ";
	else if(teamType == "训练专题")
		teamType = "XLZT";
	 var introduce = $("#teamContent").val()
	 introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')   //replace(/\s/g, ' ')
	
	var params = "{\"teamTitle\":\"" + $("#teamTitle").val() + "\","
	 			+ "\"teamContent\":\"" + introduce + "\","
	 			+ "\"teamPriority\":" + f + ","
	 			+ "\"teamLeader1\":\"" + $("#teamLeader1").val() + "\","
	 			+ "\"teamLeader2\":\"" + $("#teamLeader2").val() + "\","
	 			+ "\"teamMember\":\"" + $("#teamMember").val() + "\","
	 			+ "\"teamType\":\"" + teamType + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url: 'teamManageAction_addTeam',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_team();
	        	cancel_team();
	        	layer.alert("添加成功");
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}



//编辑教研团队
function edit_team (){
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
	
	teamId = $('.success').find('td').eq(0).text();
	var formData = new FormData();
	formData.append("params", teamId);
	
	// ajax传输
	$.ajax({
		url: 'teamManageAction_findTeamById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	var jsondata = $.parseJSON(data);	
	        	$("#teamTitle").val(jsondata.teamTitle);
	        	$("#teamTitle").focus();
	        	var introduce = jsondata.teamContent
	        	introduce = introduce.replace(/<br\/>/g, '\n').replace(/&nbsp/g, ' ')  //replace(/\s/g, ' ')
	        	$("#teamContent").val(introduce)
	        	//$("#teamContent").val(jsondata.teamContent);
	        	$("#teamPriority").val(jsondata.teamPriority);
	        	$("#teamLeader1").val(jsondata.teamLeader1)
	        	$("#teamLeader2").val(jsondata.teamLeader2)
	        	$("#teamMember").val(jsondata.teamMember)
	        	var teamType = jsondata.teamType;
        		if(teamType == "YJS")
        			teamType = "研究室";
        		else if(teamType == "KTZ")
        			teamType = "课题组";
        		else if(teamType == "XLZT")
        			teamType = "训练专题";
	        	$('#teamType').val(teamType);
	        }
	    },
	    error: function(err) {
	    	layer.alert("编辑失败");
	    }
	});
}


//更新教研团队
function update_team(){
	/*ju = 0;
	judge();
	if(ju == 1)
		return ;*/
	var teamType = $("#teamType").val();
	if(teamType == "研究室")
		teamType = "YJS";
	else if(teamType == "课题组")
		teamType = "KTZ";
	else if(teamType == "训练专题")
		teamType = "XLZT";
	var introduce = $("#teamContent").val()
	 introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')
	
	var formData = new FormData();	 
	var params = "{\"teamTitle\":\"" + $("#teamTitle").val() + "\","
				+ "\"teamId\":" + teamId + ","
				+ "\"teamContent\":\"" + introduce + "\","
				+ "\"teamLeader1\":" + $("#teamLeader1").val() + ","
	 			+ "\"teamLeader2\":" + $("#teamLeader2").val() + ","
	 			+ "\"teamMember\":" + $("#teamMember").val() + ","
				+ "\"teamPriority\":\"" + $("#teamPriority").val() + "\","
				+ "\"teamType\":\"" + teamType + "\"}";
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'teamManageAction_updateTeam',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh_team();	        	
	        	cancel_team();
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
		url: 'teamManageAction_getPriority',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	        if(data!=null){
	        	$("#teamPriority").val(data);
	        	//refresh_team();	        	
	        	//cancel_team();
	        }
	    },
	    error: function(err) {

	    }
	});
}


//取消编辑，添加
function cancel_team() {
	//$("#teamId").val("");   //jqury
	$("#teamTitle").val("");   
	$("#teamAuthor").val("");
	$("#teamPriority").val("");
	$("#teamType").val("");
	$("#teamContent").val("");
	$("#teamLeader1").val("");
	$("#teamLeader2").val("");
	$("#teamMember").val("");
	
	$("#tijiao").css("display","");
	$("#top").css("display","none");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display","none");
	$("#del_content").css("display","none");
	$("#see_content").css("display","none");

	removelock();
	//layer.close(whichlayer);
}


//删除教研团队
function delete_team (){
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择一条数据");
		return;
	}
	teamId = $('.success').find('td').eq(0).text();
	
	whichlayer = layer.open({
		title : '删除教研团队',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#teamdelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}


//确认删除教研团队内容
function del_confirm(){
	var formData = new FormData();
	formData.append("params",teamId);
	
	// ajax传输
	$.ajax({
		url: 'teamManageAction_deleteTeam',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	layer.close(whichlayer);
	        	refresh_team();
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
	var name = $("#teamName").val();
	if(name == ""){
		ju = 1;
		layer.alert("战法训法名不能为空，请重新输入！")
		return ;
	}
	
	var name1 = $("#teamRephotoFile").val();
	if(name1 != "")
		var file1 = $("#teamRephotoFile")[0].files[0].size;
		if(file1 > 307200){
		ju = 1;
		layer.alert("推荐图大于300KB，请重新选择！");
		return ;
	}
	
	
	var name2 = $("#teamPhotoFile").val();
	if(name2 != "")
		var file2 = $("#teamPhotoFile")[0].files[0].size;
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
	
	refresh_team();
});


//刷新数据显示表
function refresh_team(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'teamManageAction_showAllTeam',
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
	      			var teamType = jsondata[i].teamType;
	        		if(teamType == "YJS")
	        			teamType = "研究室";
	        		else if(teamType == "KTZ")
	        			teamType = "课题组";
	        		else if(teamType == "XLZT")
	        			teamType = "训练专题";
	       			var str = "{\"teamId\":\"" + jsondata[i].teamId + "\","
				    		+ "\"teamTitle\":\"" + jsondata[i].teamTitle + "\","
				    		+ "\"teamLeader1\":\"" + jsondata[i].teamLeader1 + "\","
				    		+ "\"teamLeader2\":\"" + jsondata[i].teamLeader2 + "\","
				    		+ "\"teamMember\":\"" + jsondata[i].teamMember + "\","
				    		+ "\"teamContent\":\"" + jsondata[i].teamContent + "\","
				    		+ "\"teamType\":\"" + teamType + "\","
				    		+ "\"teamPriority\":\"" + jsondata[i].teamPriority + "\"}";
	      				
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
		colNames:["编号","标题","组长","副组长","成员","介绍","类型","优先级"],
		colModel:[
		          {name:"teamId",index:"teamId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"teamTitle",index:"teamTitle",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"teamLeader1",index:"teamLeader1",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"teamLeader2",index:"teamLeader2",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"teamMember",index:"teamMember",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"teamContent",index:"teamContent",editable:true,width:150,align:"left",sorttype:"string"},
		          {name:"teamType",index:"teamType",editable:true,width:70,align:"left",sorttype:"string"},//,formatter:"number"
		          {name:"teamPriority",index:"teamPriority",editable:true,width:70,align:"left",sorttype:"int"},
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
	$("#selectContent1").on("keyup",function(e){
		var value = $(this).val();
		var select = $("#selectName").val();
		if(value == ""){
			$("#mhcx").html("");
		}else {	
			$.ajax({
				type: 'post',
				url: 'teamManageAction_getTitle',
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
							content += "<option>" + jsonData[i].teamTitle + "</option>";
						}
						$("#mhcx").html(content);
					}
				}
			});
		}
	});
});





