/**
 * 
 */
var author_jsondata = "";
var recommand_jsondata = "";
var course_jsondata = "";
var videoId;
var videoMark;
var videoCollectNum;
var floor;
var ju;
var whichlayer;
var jdc;
var uploading = false;
var close_index;

// 视频查询选择
function video_select() {
	var f = 0;
	if ($("#selectContent1").val() != "")
		f += 1;
	if ($("#selectContent2").val() != "")
		f += 1;
	if (f == 0) {
		layer.alert("请输入查询条件");
		return;
	}
	if (f > 1) {
		layer.alert("查询条件过多，请重新输入！");
		return;
	}

	$.jgrid.defaults.styleUI = "Bootstrap";
	var formData = new FormData();
	var selectName1 = $("#selectName1").val();
	if (selectName1 == "微课编号：")
		selectName1 = "SPBH";
	else if (selectName1 == "微课名称：")
		selectName1 = "SPMC";
	else if (selectName1 == "主讲人：")
		selectName1 = "ZJR";

	var selectCondition = $("#selectCondition").val();
	if (selectCondition == "等于")
		selectCondition = "=";
	else if (selectCondition == "大于等于")
		selectCondition = ">=";
	else if (selectCondition == "小于等于")
		selectCondition = "<=";

	var selectName2 = $("#selectName2").val();
	if (selectName2 == "评分")
		selectName2 = "PF";
	else if (selectName2 == "收藏人数")
		selectName2 = "GZRS";
	else if (selectName2 == "观看人数")
		selectName2 = "GKRS";

	var params = "{\"selectName1\":\"" + selectName1 + "\","
			+ "\"selectContent1\":\"" + $("#selectContent1").val() + "\","
			+ "\"selectName2\":\"" + selectName2 + "\","
			+ "\"selectCondition\":\"" + selectCondition + "\","
			+ "\"selectContent2\":\"" + $("#selectContent2").val() + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_findVideo',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				var jsondata = $.parseJSON(data);

				var mydata = [];
				if ($("#selectContent2").val() != ""
						&& (selectName2 == "PF" || selectName2 == "GZRS")) {
					for ( var i in jsondata) {
						course_jsondata = "";
						var courselink = "<a onclick='findCourselink("
								+ jsondata[i][0] + ")'>查看关联课程</a>";
						var mark = jsondata[i][9];
						if (mark == 0)
							mark = "未评分";

						var str = "{\"videoId\":\"" + jsondata[i][0] + "\","
								+ "\"videoName\":\"" + jsondata[i][1] + "\","
								+ "\"videoAuthor\":\"" + jsondata[i][4] + "\","
								+ "\"videoMark\":\"" + mark + "\","
								+ "\"videoAndcourse\":\"" + courselink + "\","
								+ "\"videoTotalnum\":\"" + jsondata[i][12]
								+ "\"," + "\"videoUptime\":\"" + jsondata[i][6]
								+ "\"," + "\"videoCollectnum\":\""
								+ jsondata[i][11] + "\"}";

						var json = eval('(' + str + ')');
						mydata.push(json);
					}
				} else {
					for ( var i in jsondata) {
						course_jsondata = "";
						var courselink = "<a onclick='findCourselink("
								+ jsondata[i].videoId + ")'>查看关联课程</a>";
						var mark = jsondata[i].videoMark;
						if (mark == 0)
							mark = "未评分";

						var str = "{\"videoId\":\"" + jsondata[i].videoId
								+ "\"," + "\"videoName\":\""
								+ jsondata[i].videoName + "\","
								+ "\"videoAuthor\":\""
								+ jsondata[i].videoAuthor + "\","
								+ "\"videoMark\":\"" + mark + "\","
								+ "\"videoAndcourse\":\"" + courselink + "\","
								+ "\"videoTotalnum\":\""
								+ jsondata[i].videoTotalnum + "\","
								+ "\"videoUptime\":\""
								+ jsondata[i].videoUptime + "\","
								+ "\"videoCollectnum\":\""
								+ jsondata[i].videoCollectnum + "\"}";

						var json = eval('(' + str + ')');
						mydata.push(json);
					}
				}

				getTable(mydata);
			}
		},
		error : function(err) {
			layer.alert("查询失败");
		}
	});

}

// 关联选择
function selectCondition() {
	var formData = new FormData();
	var selectName1 = $("#selectName1").val();

	if (selectName1 == "主讲人：") {
		$.ajax({
			url : 'userManageAction_findjiaoyuanByLevel',
			type : "POST",
			async : false,
			cache : false,
			processData : false,// 告诉jQuery不要去处理发送的数据
			contentType : false,// 告诉jQuery不要去设置Content-Type请求头
			data : formData,
			success : function(data) {
				if (data != null) {
					var jsondata = eval('(' + data + ')');

					var mydata = [];
					for ( var i in jsondata) {
						var str = "{\"ID\":\"" + jsondata[i].userName + "\","
								+ "\"Name\":\"" + jsondata[i].userName + "\"}"; // jsondata[i].userId

						var json = eval('(' + str + ')');
						mydata.push(json);
					}

					$("#selectContent1").combobox('loadData', mydata);
				}
			},
			error : function(err) {
				layer.alert("导入失败，请稍候再试");
			}
		});
	} else {
		$.ajax({
			url : 'videoManageAction_showAllVideo',
			type : "POST",
			async : false,
			cache : false,
			processData : false,// 告诉jQuery不要去处理发送的数据
			contentType : false,// 告诉jQuery不要去设置Content-Type请求头
			data : formData,
			success : function(data) {
				if (data != null) {
					var jsondata = eval('(' + data + ')');

					var mydata = [];
					for ( var i in jsondata) {
						var str = "";
						if (selectName1 == "微课编号：")
							str = "{\"ID\":\"" + jsondata[i].videoId + "\","
									+ "\"Name\":\"" + jsondata[i].videoId + "-"
									+ jsondata[i].videoName + "\"}";
						else if (selectName1 == "微课名称：")
							str = "{\"ID\":\"" + jsondata[i].videoName + "\","
									+ "\"Name\":\"" + jsondata[i].videoName
									+ "\"}";

						var json = eval('(' + str + ')');
						mydata.push(json);
					}

					$("#selectContent1").combobox('loadData', mydata);
				}
			},
			error : function(err) {
				layer.alert("导入失败，请稍候再试");
			}
		});
	}
}

// 视频主讲人选择
function selectauthor() {
	var formData = new FormData();

	$.ajax({
		url : 'userManageAction_findjiaoyuanByLevel',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				var jsondata = eval('(' + data + ')');

				var mydata = [];
				for ( var i in jsondata) {
					var str = "{\"ID\":\"" + jsondata[i].userId + "-"
							+ jsondata[i].userName + "\"," + "\"Name\":\""
							+ jsondata[i].userId + "-" + jsondata[i].userName
							+ "\"}";

					var json = eval('(' + str + ')');
					mydata.push(json);
				}

				$("#videoAuthor").combobox('loadData', mydata);
			}
		},
		error : function(err) {
			layer.alert("导入失败，请稍候再试");
		}
	});
}

// 添加视频
function add_video() {
	$("#tijiao").css("display", "");
	$("#tijiao").attr("disabled", false);
	$("#baocun").css("display", "none");
	$("#copy").css("display", "none");

	$("#videoName").val("");
	$("#videoName").focus();
	$("#videoAuthor").combobox('setValue', null);
	// $("#videoUpime").val("");
	$("#videoIntroduce").val("");
	$("#videoContent").val("");
	$("#videoRephoto").val("");
	$("#videophoto").val("");
	$("#videoPriority").val("");
	// $("#recommand").val("不推荐");

	addlock();
	selectauthor();
}

// 视频提交
function submit_video() {
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
	if (ju == 1)
		return;
	var formData = new FormData();
	var introduce = $("#videoIntroduce").val()
	introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')
	var f = $("#videoPriority").val();
	if (f == "")
		f = 0;
	
	var params = "{\"videoName\":\""+ $("#videoName").val() +"\","
				+"\"videoIntroduce\":\""+ introduce +"\","
				+"\"videoAuthor\":\""+ $("#videoAuthor").combobox('getValues') +"\","
				+"\"videoPriority\":"+ f +"}";
	formData.append("params", params);
	//formData.append("videoName", $("#videoName").val());
	//formData.append("videoIntroduce", introduce)
	//formData.append("videoAuthor", "" + $("#videoAuthor").combobox('getValues'));// 多选框
	//formData.append("videoPriority", f);
	if ($("#videoContentFile").val() != "")
		formData.append("ContentFile", $("#videoContentFile")[0].files[0]);
	if ($("#videoRephotoFile").val() != "")
		formData.append("RephotoFile", $("#videoRephotoFile")[0].files[0]);
	if ($("#videoPhotoFile").val() != "")
		formData.append("PhotoFile", $("#videoPhotoFile")[0].files[0]);

	// ajax传输
	$.ajax({
		url : 'fileManageAction_addVideo',
		type : "POST",
		//async : false,
		//cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '微课文件传输进度',
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
		
		success : function(data) {
			if (data != null) {
				refresh();
				layer.alert("添加成功");
				cancel_video();
				// layer.close(floor);
			}
		},
		error : function(err) {
			layer.alert("添加失败，请稍候再试");
		}
	});
}

// 编辑视频
function edit_video() {
	if (!($('tr').hasClass('success'))) {
		layer.alert("请选择一条数据");
		return;
	}

	addlock();
	$("#tijiao").css("display", "none");
	$("#copy").css("display", "none");
	$("#baocun").css("display", "");
	$("#content_see").css("display", "");
	$("#deletecontent").css("display", "");
	$("#deleterephoto").css("display", "");
	$("#deletephoto").css("display", "");
	$("#top").css("display", "");
	$("#rephoto_see").css("display", "");
	$("#photo_see").css("display", "");
	videoId = $('.success').find('td').eq(0).text();

	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_findVideoId',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				var jsondata = $.parseJSON(data);

				$("#videoName").val(jsondata[0].videoName);
				$("#videoName").focus();
				// $("#videoIntroduce").val(jsondata[0].videoIntroduce);
				var introduce = jsondata[0].videoIntroduce
				introduce = introduce.replace(/<br\/>/g, '\n').replace(
						/&nbsp/g, ' ')
				$("#videoIntroduce").val(introduce)
				$("#videoPriority").val(jsondata[0].videoPriority);

				var str = jsondata[0].videoAuthorId.split(",");
				var s = jsondata[0].videoAuthor.split(",");
				if (str != "") {
					var string = "";
					for (var i = 0; i < str.length; i++) {
						if (i == 0) {
							string += str[i] + "-" + s[i];
						} else {
							string += "," + str[i] + "-" + s[i];
						}
					}
					$("#videoAuthor").combobox('setValue', string);
				}

				selectauthor();
				// layer.alert(data);
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}


// 更新视频
function update_video() {
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
	if (ju == 1)
		return;
	var formData = new FormData();
	var introduce = $("#videoIntroduce").val()
	introduce = introduce.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp')
	var params = "{\"videoName\":\""+ $("#videoName").val() +"\","
				+"\"videoId\":\""+ videoId +"\","
				+"\"videoIntroduce\":\""+ introduce +"\","
				+"\"videoAuthor\":\""+ $("#videoAuthor").combobox('getValues') +"\","
				+"\"videoPriority\":"+ $("#videoPriority").val() +"}";
	formData.append("params", params);
	
//	formData.append("videoId", videoId);
//	formData.append("videoName", $("#videoName").val());
//	formData.append("videoAuthor", "" + $("#videoAuthor").combobox('getValues'));// 多选框
//	formData.append("videoIntroduce", introduce)
//	formData.append("videoPriority", $("#videoPriority").val());

	var flag = 111;
	if ($("#videoContentFile").val() != "") {
		flag -= 1;
		formData.append("ContentFile", $("#videoContentFile")[0].files[0]);
	}
	if ($("#videoRephotoFile").val() != "") {
		flag -= 10;
		formData.append("RephotoFile", $("#videoRephotoFile")[0].files[0]);
	}
	if ($("#videoPhotoFile").val() != "") {
		flag -= 100;
		formData.append("PhotoFile", $("#videoPhotoFile")[0].files[0]);
	}
	formData.append("flag", flag)
	// if(uploading){
	// layer.alert("文件正在上传中，请稍候");
	// return false;
	// }

	// ajax传输
	//close_index = 
	$.ajax({
		url : 'fileManageAction_updateVideo',
		type : "POST",
		//async: false,
		//cache: false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,

		beforeSend : function() {
			uploading = true;
			jdc = layer.open({
				title : '视频文件传输进度',
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
		success : function(data) {
			if (data != null) {
				refresh();
				$("#tijiao").css("display", "");
				$("#baocun").css("display", "none");
				$("#content_see").css("display", "none");
				$("#rephoto_see").css("display", "none");
				$("#photo_see").css("display", "none");

				layer.alert("编辑成功");
				cancel_video();
			}
		},
		error : function(err) {
			//layer.close(jdc)
			//cancel_video();
			//layer.alert("上传终止，请稍候再试");
			layer.alert("编辑失败，请稍候再试");
		}
	});
//	console.log(close_index)
//	window.onbeforeunload = function(event) {
//		console.log(11111)
//		console.log(close_index)
//		close_index.abort()
//		event.returnValue = "我在这写点东西...";
//		console.log(222222)
//	};
}

function cancel_file(){
	console.log(close_index)
	console.log(11111)
	console.log(close_index)
	close_index.abort()
	console.log(222222)
	layer.close(jdc)
}
 

var copycontent_url = "";
var copyrephoto_url = "";
var copyphoto_url = "";

// 克隆视频
/*function copy_video() {
	if (!($('tr').hasClass('success'))) {
		layer.alert("请选择一条数据");
		return;
	}

	addlock();
	$("#tijiao").css("display", "none");
	$("#copy").css("display", "");
	$("#deletecontent").css("display", "");
	$("#deleterephoto").css("display", "");
	$("#deletephoto").css("display", "");
	$("#baocun").css("display", "none");
	$("#content_see").css("display", "");
	$("#rephoto_see").css("display", "");
	$("#photo_see").css("display", "");
	$("#top").css("display", "");
	videoId = $('.success').find('td').eq(0).text();

	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_findVideoId',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				var jsondata = $.parseJSON(data);

				$("#videoName").val(jsondata[0].videoName);
				$("#videoName").focus();
				$("#videoIntroduce").val(jsondata[0].videoIntroduce);
				$("#videoPriority").val(jsondata[0].videoPriority);
				copycontent_url = jsondata[0].videoContent;
				copyrephoto_url = jsondata[0].videoRephoto;
				copyphoto_url = jsondata[0].videoPhoto;

				selectauthor();
				// layer.alert(data);
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

// 克隆视频保存
function copysave_video() {
	ju = 0;
	judge();
	if (ju == 1)
		return;
	var formData = new FormData();
	formData.append("videoId", videoId);
	formData.append("videoName", $("#videoName").val());
	formData
			.append("videoAuthor", "" + $("#videoAuthor").combobox('getValues'));// 多选框
	formData.append("videoIntroduce", $("#videoIntroduce").val());
	formData.append("videoPriority", $("#videoPriority").val());

	var flag = 111;
	if ($("#videoContentFile").val() != "") {
		flag -= 1;
		formData.append("videoContentFile", $("#videoContentFile")[0].files[0]);
	} else {
		formData.append("videoContent", copycontent_url);
	}
	if ($("#videoRephotoFile").val() != "") {
		flag -= 10;
		formData.append("videoRephotoFile", $("#videoRephotoFile")[0].files[0]);
	} else {
		formData.append("videoRephoto", copyrephoto_url);
	}
	if ($("#videoPhotoFile").val() != "") {
		flag -= 100;
		formData.append("videoPhotoFile", $("#videoPhotoFile")[0].files[0]);
	} else {
		formData.append("videoPhoto", copyphoto_url);
	}
	var params = "" + flag;
	formData.append("params", params)

	// ajax传输
	$.ajax({
		url : 'fileManageAction_copyVideo',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				refresh();

				layer.alert("克隆成功");
				cancel_video();
			}
		},
		error : function(err) {
			layer.alert("克隆失败，请稍候再试");
		}
	});
}*/

// 优先级置顶
function set_top() {
	// ajax传输
	$.ajax({
		url : 'videoManageAction_getPriority',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : {},
		success : function(data) {
			if (data != null) {
				$("#videoPriority").val(data);
				// refresh_news();
				// cancel_news();
			}
		},
		error : function(err) {

		}
	});
}

// 删除视频
function delete_video() {
	if (!($('tr').hasClass('success'))) {
		layer.alert("请选择一条数据");
		return;
	}
	videoId = $('.success').find('td').eq(0).text();

	whichlayer = layer.open({
		title : '删除微课',
		type : 1,
		shade : 0.5,
		shadeClose : false, // 点击遮罩关闭
		scrollbar : false,
		skin : 'layui-layer-molv',
		area : [ '500px', '170px' ],
		content : $('#videodelete')
	// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
}

function deleteconfirm() {
	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_deleteVideo',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				layer.close(whichlayer);
				refresh();
				layer.alert("删除成功");
			}
		},
		error : function(err) {
			layer.alert("删除失败");
		}
	});

}

// 取消
function cancel_video() {
	// $("#videoId").val(""); //jqury
	$("#videoName").val("");
	$("#videoAuthor").combobox('setValue', null);
	// $("#videoUptime").val("");
	$("#videoIntroduce").val("");
	$("#videoContentFile").val("");
	$("#videoRephotoFile").val("");
	$("#videoPhotoFile").val("");
	$("#videoPriority").val("");
	// $("#recommand").val("不推荐");

	$("#tijiao").css("display", "");
	$("#tijiao").attr("disabled", true);
	$("#baocun").css("display", "none");
	$("#copy").css("display", "none");
	$("#deletecontent").css("display", "none");
	$("#deleterephoto").css("display", "none");
	$("#deletephoto").css("display", "none");
	$("#content_see").css("display", "none");
	$("#rephoto_see").css("display", "none");
	$("#photo_see").css("display", "none");
	$("#top").css("display", "none");
	removelock();
	layer.close(whichlayer);
}

// 教材大纲录入
$('#outline_add').on('click', function() {
	layer.open({
		title : '教材大纲录入',
		type : 1,
		shade : 0.5,
		shadeClose : false, // 点击遮罩关闭
		scrollbar : false,
		area : [ '850px', '700px' ],
		content : $('#outline')
	// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

// 视频内容预览
$('#content_see').on(
		'click',
		function() {
			var formData = new FormData();
			formData.append("videoId", videoId);

			// ajax传输
			$.ajax({
				url : 'videoManageAction_findVideoId',
				type : "POST",
				async : false,
				cache : false,
				processData : false,// 告诉jQuery不要去处理发送的数据
				contentType : false,// 告诉jQuery不要去设置Content-Type请求头
				data : formData,
				success : function(data) {
					if (data != null) {
						var jsonData = eval('(' + data + ')');
						// var url = "http://localhost:8080/NCS/" +
						// jsonData[0].videoContent;
						var url = jsonData[0].videoContent;

						if (url == "") {
							layer.alert("该视频暂无内容，请导入后保存！")
							return;
						}
						var url2 = url.replace("192.168.20.72:59141",
								"10.73.94.81:8011")

						layer.open({
							title : '微课内容',
							type : 2,
							shade : 0.5,
							maxmin : true,
							shadeClose : false, // 点击遮罩关闭
							scrollbar : false,
							area : [ '850px', '700px' ],
							content : url2
						// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
						});
					}
				},
				error : function(err) {
					layer.alert("导入失败，请稍候再试");
				}
			});
		});

// 视频推荐图预览
$('#rephoto_see').on(
		'click',
		function() {

			var formData = new FormData();
			formData.append("videoId", videoId);

			// ajax传输
			$.ajax({
				url : 'videoManageAction_findVideoId',
				type : "POST",
				async : false,
				cache : false,
				processData : false,// 告诉jQuery不要去处理发送的数据
				contentType : false,// 告诉jQuery不要去设置Content-Type请求头
				data : formData,
				success : function(data) {
					var jsonData = eval('(' + data + ')');
					// var rephoto_url = "http://localhost:8080/NCS/" +
					// jsonData[0].videoRephoto;
					var rephoto_url = jsonData[0].videoRephoto;

					$("img").attr(
							"src",
							rephoto_url.replace("192.168.20.72:59141",
									"10.73.94.81:8011"));

					layer.open({
						title : '微课推荐图',
						type : 1,
						shade : 0.5,
						maxmin : true,
						shadeClose : false, // 点击遮罩关闭
						scrollbar : false,
						area : [ '717px', '580px' ],
						content : $('#rephoto')
					// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
					});
				},
				error : function(err) {
					layer.alert("导入失败，请稍候再试");
				}
			});
		});

// 视频缩略图预览
$('#photo_see').on(
		'click',
		function() {
			var formData = new FormData();
			formData.append("videoId", videoId);

			// ajax传输
			$.ajax({
				url : 'videoManageAction_findVideoId',
				type : "POST",
				async : false,
				cache : false,
				processData : false,// 告诉jQuery不要去处理发送的数据
				contentType : false,// 告诉jQuery不要去设置Content-Type请求头
				data : formData,
				success : function(data) {
					var jsonData = eval('(' + data + ')');
					// var photo_url = "http://localhost:8080/NCS/" +
					// jsonData[0].videoPhoto;
					var photo_url = jsonData[0].videoPhoto;

					$("img").attr(
							"src",
							photo_url.replace("192.168.20.72:59141",
									"10.73.94.81:8011"));

					layer.open({
						title : '微课缩略图',
						type : 1,
						shade : 0.5,
						maxmin : true,
						shadeClose : false, // 点击遮罩关闭
						scrollbar : false,
						// area : [ '450px', '650px' ],
						area : [ '717px', '580px' ],
						content : $('#photo')
					// 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
					});
				},
				error : function(err) {
					layer.alert("导入失败，请稍候再试");
				}
			});
		});

function deleteContent() {
	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_deleteContent',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				layer.alert("微课内容删除成功");
			}
		},
		error : function(err) {
			layer.alert("微课内容删除失败");
		}
	});
}

function deleteRephoto() {
	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_deleteRephoto',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				layer.alert("微课推荐图删除成功");
			}
		},
		error : function(err) {
			layer.alert("微课推荐图删除失败");
		}
	});
}

function deletePhoto() {
	var formData = new FormData();
	formData.append("videoId", videoId);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_deletePhoto',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				layer.alert("微课缩略图删除成功");
			}
		},
		error : function(err) {
			layer.alert("微课缩略图删除失败");
		}
	});
}

// 根据ID从relate_info表里面提取课程
function findcourse(id) {
	var formData = new FormData();
	var params = "{\"videoId\":\"" + id + "\"}";
	formData.append("params", params);
	// ajax传输
	$.ajax({
		url : 'relateManageAction_findCourseByvideoId',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				// course_jsondata = $.parseJSON(data);
				var json = $.parseJSON(data);

				for (var i = 0; i < json.length; i++) {
					if (i != 0)
						course_jsondata += ",";
					course_jsondata += json[i][0] + "-" + json[i][1];
				}

			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

// 根据ID从user_info表里面提取用户姓名
function findauthor(id) {
	var formData = new FormData();
	formData.append("videoId", id);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_findUserNameById',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				author_jsondata = $.parseJSON(data);
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

// 根据ID从recommand_info表里面提取推荐等级
function findrecommand(id) {
	var formData = new FormData();
	formData.append("videoId", id);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_findRecommandById',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				recommand_jsondata = $.parseJSON(data);
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

// 根据视频ID计算课程的平均评分
function averageMark(id) {
	var formData = new FormData();
	var params = "{\"videoId\":\"" + id + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url : 'assessManageAction_averageMarkByVideoId',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {

				videoMark = data;
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

// 根据视频ID计算课程的收藏人数
function collectNum(id) {
	var formData = new FormData();
	var params = "{\"videoId\":\"" + id + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url : 'collectManageAction_collectNumByVideoId',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				videoCollectNum = data;
			}
		},
		error : function(err) {
			layer.alert("修改失败");
		}
	});
}

function judge() {
	var name = $("#videoName").val();
	if (name == "") {
		ju = 1;
		layer.alert("视频名不能为空，请重新输入！")
		return;
	}

	var name3 = $("#videoContentFile").val();
	if (name3 != "")
		var file3 = $("#videoContentFile")[0].files[0].size;
	if (file3 > 3145728000) { // 157286400-150M
		ju = 1;
		layer.alert("视频内容大于300M，请重新选择！");
		return;
	}

	var name1 = $("#videoRephotoFile").val();
	if (name1 != "")
		var file1 = $("#videoRephotoFile")[0].files[0].size;
	if (file1 > 3145728) {
		ju = 1;
		layer.alert("推荐图大于3M，请重新选择！");
		return;
	}

	var name2 = $("#videoPhotoFile").val();
	if (name2 != "")
		var file2 = $("#videoPhotoFile")[0].files[0].size;
	if (file2 > 3145728) {
		ju = 1;
		layer.alert("缩略图大于3M，请重新选择！");
		return;
	}

}

$(document).ready(function() {
	 var login = sessionStorage.getItem("login");
	 if(login != "true")
	 window.location.href = "../../login.html";
	updateAssessAndCollect();
	refresh();
	selectCondition();
});

// 更新课程表中的评分和收藏数v1.2
function updateAssessAndCollect() {
	var formData = new FormData();

	// ajax传输
	$.ajax({
		url : 'videoManageAction_updateAssessAndCollect',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {

		},
		error : function(err) {
			layer.alert("更新失败");
		}
	});
}

// 刷新数据显示表
function refresh() {
	$.jgrid.defaults.styleUI = "Bootstrap";

	var formData = new FormData();
	// ajax传输
	$.ajax({
		url : 'videoManageAction_showAllVideo',
		type : "POST",
		async : true,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {
				var jsondata = $.parseJSON(data);

				var mydata = [];
				for ( var i in jsondata) {
					videoMark = 0;
					videoCollectNum = 0;
					course_jsondata = "";
					var courselink = "<a onclick='findCourselink("
							+ jsondata[i].videoId + ")'>查看关联课程</a>";
					var mark = jsondata[i].videoMark;
					if (mark == 0)
						mark = "未评分";

					var str = "{\"videoId\":\"" + jsondata[i].videoId + "\","
							+ "\"videoName\":\"" + jsondata[i].videoName
							+ "\"," + "\"videoAuthor\":\""
							+ jsondata[i].videoAuthor + "\","
							+ "\"videoMark\":\"" + mark + "\","
							+ "\"videoAndcourse\":\"" + courselink + "\","
							+ "\"videoTotalnum\":\""
							+ jsondata[i].videoTotalnum + "\","
							+ "\"videoUptime\":\"" + jsondata[i].videoUptime
							+ "\"," + "\"videoPriority\":\""
							+ jsondata[i].videoPriority + "\","
							+ "\"videoCollectnum\":\""
							+ jsondata[i].videoCollectnum + "\"}";

					var json = eval('(' + str + ')');
					mydata.push(json);
				}

				getTable(mydata);
			}
		},
		error : function(err) {
			layer.alert("删除失败");
		}
	});
}

function getTable(mydata) {
	$("#table_list_2").jqGrid('clearGridData'); // 清空表格
	$("#table_list_2").jqGrid('setGridParam', { // 重新加载数据
		datatype : 'local',
		data : mydata,
	// page:1
	}).trigger("reloadGrid");
	$("#table_list_2").jqGrid(
			{
				data : mydata,
				datatype : "local",
				height : 450,
				autowidth : true,
				shrinkToFit : true,
				rowNum : 20,
				rowList : [ 10, 20, 30 ],
				colNames : [ "微课编号", "微课名称", "主讲人", "评分", "收藏人数", "观看人数",
						"上传时间", "优先级" ],
				colModel : [ {
					name : "videoId",
					index : "videoId",
					editable : true,
					width : 70,
					align : "left",
					sorttype : "int",
					search : true
				}, {
					name : "videoName",
					index : "videoName",
					editable : true,
					width : 110,
					align : "left",
					sorttype : "string"
				}, {
					name : "videoAuthor",
					index : "videoAuthor",
					editable : true,
					width : 110,
					align : "left",
					sorttype : "string"
				}, {
					name : "videoMark",
					index : "videoMark",
					editable : true,
					width : 70,
					align : "left",
					sorttype : "double"
				}, {
					name : "videoCollectnum",
					index : "videoCollectnum",
					editable : true,
					width : 70,
					align : "left",
					sorttype : "int"
				}, {
					name : "videoTotalnum",
					index : "videoTotaltnum",
					editable : true,
					width : 70,
					align : "left",
					sorttype : "int"
				}, {
					name : "videoUptime",
					index : "videoUptime",
					editable : true,
					width : 110,
					align : "left",
					sorttype : "string"
				}, {
					name : "videoPriority",
					index : "videoPriority",
					editable : true,
					width : 110,
					align : "left",
					sorttype : "int"
				},
				// {name:"videoAndcourse",index:"videoAndcourse",editable:true,width:150,align:"left",sorttype:"string"},
				],
				pager : "#pager_list_2",
				viewrecords : true,
				caption : false,
				add : true,
				edit : true,
				addtext : "Add",
				edittext : "Edit",
				hidegrid : false
			});
	$(window).bind("resize", function() {
		var width = $(".jqGrid_wrapper").width();
		$("#table_list_2").setGridWidth(width)
	})
}

// 保存视频评分
function saveMark(id, mark) {
	var formData = new FormData();
	var params = "{\"videoId\":\"" + id + "\",\"videoMark\":\"" + mark + "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_saveVideoAverageMark',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {

			}
		},
		error : function(err) {
			layer.alert("刷新失败");
		}
	});
}

// 保存视频收藏人数
function saveCollectNum(id, num) {
	var formData = new FormData();
	var params = "{\"videoId\":\"" + id + "\",\"videoCollectNum\":\"" + num
			+ "\"}";
	formData.append("params", params);

	// ajax传输
	$.ajax({
		url : 'videoManageAction_saveVideoCollectNum',
		type : "POST",
		async : false,
		cache : false,
		processData : false,// 告诉jQuery不要去处理发送的数据
		contentType : false,// 告诉jQuery不要去设置Content-Type请求头
		data : formData,
		success : function(data) {
			if (data != null) {

			}
		},
		error : function(err) {
			layer.alert("刷新失败");
		}
	});
}

function addlock() {
	$("#tianjia").attr("disabled", true);
	$("#shanchu").attr("disabled", true);
	$("#bianji").attr("disabled", true);
	$("#shuaxin").attr("disabled", true);
	$("#kelong").attr("disabled", true);
}

function removelock() {
	$("#tianjia").attr("disabled", false);
	$("#shanchu").attr("disabled", false);
	$("#bianji").attr("disabled", false);
	$("#shuaxin").attr("disabled", false);
	$("#kelong").attr("disabled", false);
}

function findCourselink(id) {
	course_jsondata = "";
	findcourse(id);

	if (course_jsondata != "")
		layer.alert(course_jsondata, {
			title : '关联课程'
		});
	else
		layer.alert("无关联课程", {
			title : '关联课程'
		});
}
