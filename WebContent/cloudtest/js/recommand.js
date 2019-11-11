/**
 * 
 */
var course_jsondata = "";
var textbook_jsondata = "";
var video_jsondata = "";
var recommandId;
var whichlayer;


//关联选择
function selectCondition() {
	var formData = new FormData();
	var aimClass = $("#aimClass").val(); 
	var add;
	if(aimClass == "课程ID：")
		add = "courseManageAction_showAllCourse";
	else if(aimClass == "教材ID：")
		add = "textbookManageAction_showAllTextbook";
	else if(aimClass == "微课ID：")
		add = "videoManageAction_showAllVideo";
	
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
	        	if(aimClass == "课程ID："){
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].courseId + "\","
				    		+ "\"Name\":\"" + jsondata[i].courseId + "-" +jsondata[i].courseName + "\"}";
	        			
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}
	        	else if(aimClass == "教材ID："){
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].textbookId + "\","
				    		+ "\"Name\":\"" + jsondata[i].textbookId + "-" +jsondata[i].textbookName + "\"}";
	        			
	        			var json = eval('(' + str + ')');
		        		mydata.push(json);
		        	}
	        	}
	        	else if(aimClass == "微课ID："){
	        		for(var i in jsondata){
	        			var str = "{\"ID\":\"" + jsondata[i].videoId + "\","
				    		+ "\"Name\":\"" + jsondata[i].videoId + "-" +jsondata[i].videoName + "\"}";
	        			
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

//添加推荐
function add_recommand() {
	cancel_recommand();
	selectCondition();
	
	whichlayer = layer.open({
		title : '添加推荐',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '560px', '170px'],
		//z-index: 19891023;
		zIndex: 10000,
		content : $('#recommandAdd')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});	
}

var sy, pt;
//推荐提交
function submit_recommand() {
	var formData = new FormData();
	
	sy = 0;
	judgeSY();
	if(sy == 1)
		return ;
	pt = 0;
	judgePT();
	if(pt == 1)
		return ;
	 
	var flag = 11;
	if($("#recommandSY").prop("checked") == true){ 
		flag -= 10;
	}
	if($("#recommandPT").prop("checked") == true){ 
		flag -= 1;
	}
	
	var aimClass = $("#aimClass").val();
	if(aimClass == "课程ID：")
		aimClass = "KCID";
	else if(aimClass == "教材ID：")
		aimClass = "JCID";
	else if(aimClass == "微课ID：")
		aimClass = "SPID";

	var params = "{\"aimClass\":\"" + aimClass + "\","
				+ "\"aimId\":" + $("#selectContent1").val() * 1 + ","
				+ "\"flag\":" + flag + "}";
	formData.append("params", params);

	 
	// ajax传输
	$.ajax({
		url: 'recommandManageAction_addRecommand',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh();
	        	cancel_recommand();
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}

//自选推荐
function selfSelect_recommand() {
	
	$("#recommandFile").val(null)
	//selectCondition();
	
	whichlayer = layer.open({
		title : '自选推荐',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '560px', '170px'],
		//z-index: 19891023;
		//zIndex: 10000,
		content : $('#recommandSelfSelect')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});	
}

function submit_selectRecommand() {
	sy = 0;
	judgeSY();
	if(sy == 1)
		return ;
	var formData = new FormData();
	if( $("#recommandFile").val()!= "")
		formData.append("recommandFile",$("#recommandFile")[0].files[0]);
	 
	// ajax传输
	$.ajax({
		url: 'recommandManageAction_addSelfSelectRecommand',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	refresh();
	        	cancel_selectRecommand();
	        }
	    },
	    error: function(err) {
	    	layer.alert("导入失败，请稍候再试");
	    }
	});
}




function delete_recommand() {
	if(!($('tr').hasClass('success'))){
		layer.alert("请选择数据");
		return;
	}
	
	recommandId = [];
	var trList = $("#table_list_2").find("tr");
	for(var i=1; i<trList.length; i++){
		if((trList.eq(i).hasClass('success'))){
			var Id = trList.eq(i).find("td").eq(1).text();
			var str = "{\"recommandId\":\"" + Id + "\"}";
			var json = $.parseJSON(str);
			recommandId.push(json);
		}
	}
	
	
	whichlayer = layer.open({
		title : '删除推荐',
		type : 1,
		shade : 0.5,
		shadeClose : false, //点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#recommandDelete')
	//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}

//删除推荐
function deleteConfirm (){
	var formData = new FormData();
	formData.append("params", JSON.stringify(recommandId));
	
	// ajax传输
	$.ajax({
		url: 'recommandManageAction_deleteRecommand',
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
	    	layer.alert("清空失败");
	    }
	});
	
}



//取消
function cancel_recommand() {
	$("#aimClass").val("课程ID：");
	$("#selectContent1").combobox("setValue", null);   
	
	$('div input[type=checkbox]').attr('checked',false);
	layer.close(whichlayer);
}

function cancel_selectRecommand() {
	$("#recommandFile").val(null);

	layer.close(whichlayer);
}




//根据ID从course_info表里面提取课程名称
function findcourse(id){
	var formData = new FormData();
	var params= "{\"courseId\":\"" + id + "\"}"
	formData.append("params", params);
	
	// ajax传输
	$.ajax({
		url: 'courseManageAction_findCourseById',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	course_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
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


//根据ID从video_info表里面提取视频名称
function findvideo(id){
	var formData = new FormData();
	formData.append("videoId", id);
	
	// ajax传输
	$.ajax({
		url: 'videoManageAction_findVideoId',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	        if(data!=null){
	        	video_jsondata = $.parseJSON(data);
	        }
	    },
	    error: function(err) {
	    	layer.alert("修改失败");
	    }
	});
}

function judgeSY(){
	if($("#recommandPT").prop("checked") == true)
		return ;
	var aimClass = null
	if($("#recommandSY").prop("checked") == true)
		aimClass = $("#aimClass").val();
	var formData = new FormData();
	
	// ajax传输
	$.ajax({
		url: 'recommandManageAction_showAllRecommand',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data!=null){
	        	var jsondata = $.parseJSON(data);	        	
	        	var f1 = 0;
	        	var f2 = 0;
	        	var f3 = 0;
	        	if($("#recommandSY").prop("checked") == true || $("#recommandFile").val() != null){ 
	        		var count = 0;
	        		for(var i in jsondata){
		      			if(jsondata[i].recommandLevel == "SYTJ"){
		      				count++;
//		      				var courseId =jsondata[i].courseId*1;
//		      				var textbookId = jsondata[i].textbookId*1;
//		      				var videoId = jsondata[i].videoId*1;

//		      				if(courseId != 0)
//		      					f1 += 1;
//		      				else 
//		      				if(textbookId != 0)
//		      					f2 += 1;
//		      				else if(videoId != 0)
//		      					f3 += 1;
		      				
//			      			if(aimClass == "课程ID："){
//			      				if(f1 == 1){
//			      					layer.close(whichlayer);
//				      				sy = 1;
//				      				layer.alert("同类型的首页推荐至多一条，请删除后再添加");
//				      				return;
//			      				}
//			      			}
//			      			else 
//			      			if(aimClass == "教材ID："){
//			      				if(f2 == 1){
//			      					layer.close(whichlayer);
//				      				sy = 1;
//				      				layer.alert("同类型的首页推荐至多一条，请删除后再添加");
//				      				return;
//			      				}
//			      			}
//			      			else if(aimClass == "视频ID："){
//			      				if(f3 == 1){
//			      					layer.close(whichlayer);
//				      				sy = 1;
//				      				layer.alert("同类型的首页推荐至多一条，请删除后再添加");
//				      				return;
//			      				}
//			      			}
//			      			else 
		      				if(count == 6){
			      				layer.close(whichlayer);
			      				sy = 1;
			      				layer.alert("首页推荐至多六条，请删除后再添加");
			      				return;
			      			}
		      			}
		        	}
	        	}
	        }
	    },
	    error: function(err) {
	    	//layer.alert("删除失败");
	    }
	});
}

function judgePT(){
	if($("#recommandSY").prop("checked") == true)
		return ;
	var formData = new FormData();
	var aimClass = $("#aimClass").val();
	var content = $("#selectContent1").val();
	
	// ajax传输
	$.ajax({
		url: 'recommandManageAction_showAllRecommand',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: formData,
	    success: function(data){
	    	if(data!=null){
	        	var jsondata = $.parseJSON(data);	        	
	        	var f1 = 0;
	        	var f2 = 0;
	        	var f3 = 0;
	        	if($("#recommandPT").prop("checked") == true){ 
	        		for(var i in jsondata){
		      			if(jsondata[i].recommandLevel == "PTTJ"){
		      				var courseId =jsondata[i].courseId*1;
		      				var textbookId = jsondata[i].textbookId*1;
		      				var videoId = jsondata[i].videoId*1;

		      				if(courseId != 0)
		      					f1 += 1;
		      				else if(textbookId != 0)
		      					f2 += 1;
		      				else if(videoId != 0)
		      					f3 += 1;
		      				
			      			if(aimClass == "课程ID："){
			      				if(courseId != 0 && courseId == content){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("相同课程不能重复相同推荐");
				      				return;
			      				}
			      				if(f1 == 3){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("课程型的普通推荐至多三条，请删除后再添加");
				      				return;
			      				}
			      			}
			      			else if(aimClass == "教材ID："){
			      				if(textbookId != 0 && textbookId == content){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("相同教材不能重复相同推荐");
				      				return;
			      				}
			      				if(f2 == 3){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("教材型的普通推荐至多三条，请删除后再添加");
				      				return;
			      				}
			      			}
			      			else if(aimClass == "视频ID："){
			      				if(videoId != 0 && videoId == content){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("相同视频不能重复相同推荐");
				      				return;
			      				}
			      				if(f3 == 3){
			      					layer.close(whichlayer);
				      				pt = 1;
				      				layer.alert("视频型的普通推荐至多三条，请删除后再添加");
				      				return;
			      				}
			      			}
		      			}
		        	}
	        	}
	        }
	    },
	    error: function(err) {
	    	layer.alert("查找失败");
	    }
	});
}



$(document).ready(function() {
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
		url: 'recommandManageAction_showAllRecommand',
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
	      			var courseId = jsondata[i].courseId * 1;
	      			var textbookId = jsondata[i].textbookId * 1;
	      			var videoId = jsondata[i].videoId * 1;
	      			var aimClass = "自选", aimId="", aimName="";
	      			if(courseId != 0){
	      				aimClass = "课程";
	      				aimId = courseId;
	      				findcourse(courseId);
	      				aimName = course_jsondata[0].courseName;
	      			}
	      			if(textbookId != 0){
	      				aimClass = "教材";
	      				aimId = textbookId;
	      				findtextbook(textbookId);
	      				aimName = textbook_jsondata[0].textbookName;
	      			}
	      			if(videoId != 0){
	      				aimClass = "视频";
	      				aimId = videoId;
	      				findvideo(videoId);
	      				aimName = video_jsondata[0].videoName;
	      			}
	      			
	      			var recommand = jsondata[i].recommandLevel;
	      			if(recommand == "PTTJ")
	      				 recommand = "普通推荐";
	      			 else if(recommand == "SYTJ")
	      				 recommand = "首页推荐";
	      			
	      			var str = "{\"recommandId\":\"" + jsondata[i].recommandId + "\","
				    		+ "\"aimClass\":\"" + aimClass + "\","
				    		+ "\"aimId\":\"" + aimId + "\","
				    		+ "\"aimName\":\"" + aimName + "\","
				    		+ "\"recommandLevel\":\"" + recommand + "\","
				    		+ "\"recommandTime\":\"" + jsondata[i].recommandTime + "\"}";
	      				
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
	$("#table_list_2").jqGrid({
		data:mydata,
		datatype:"local",
		height:650,
		autowidth:true,
		shrinkToFit:true,
		rowNum:20,
		rowList:[10,20,30],
		colNames:["编号","目标类型","目标ID","目标名称","推荐等级","推荐日期"],
		colModel:[
		          {name:"recommandId",index:"recommandId",editable:true,width:70,align:"left",sorttype:"int",search:true},
		          {name:"aimClass",index:"aimClass",editable:true,width:70,align:"left",sorttype:"string"},
		          {name:"aimId",index:"aimId",editable:true,width:70,align:"left",sorttype:"int"},
		          {name:"aimName",index:"aimName",editable:true,width:110,align:"left",sorttype:"string"},
		          {name:"recommandLevel",index:"recommandLevel",editable:true,width:90,align:"left",sorttype:"string"},
		          {name:"recommandTime",index:"recommandTime",editable:true,width:110,align:"left",sorttype:"string"}
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








