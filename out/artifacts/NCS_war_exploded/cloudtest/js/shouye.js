

var aimPeople = 50;
var onlinePeople ;

$(document).ready(function(){
	var login = sessionStorage.getItem("login");
	if(login != "true")
		window.location.href = "../../login.html";
});

function toDesktop(sUrl,sName){
    try{
        var WshShell = new ActiveXObject("WScript.Shell");
        var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
        oUrlLink.TargetPath = sUrl;
        oUrlLink.Save();
    }catch(e){  
        alert("当前浏览器安全级别不允许操作！");  
    }
}

window.onload = function () {	
	// ajax传输
	$.ajax({
		url: 'userListener_list',
	    type: "POST",  
	    async: false,  
	    cache: false, 
	    processData: false,// 告诉jQuery不要去处理发送的数据
	    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
	    data: {},
	    success: function(data){
	    	onlinePeople = data * 1 + 31;
	    },
	    error: function(err) {
	    	layer.alert("在线人数获取失败，请稍候再试");
	    }
	});
	
    count();
}


function count() {
    var a0;
    var a1;
    var a2;
   // alert("jinru");

	$.ajax({
	    type: "post",
		url: "findMCDAction_findMCD",
		data: {
		
		},
		// cache:false,
		//  async:true,
	
		success: function (data) {
		    var aa = data.split(",");
		    a0 = parseFloat(aa[0]);//内存占用率
		    a1 = parseFloat(aa[1]);//CPU占有率
		    a2 = parseFloat(aa[2]);//硬盘占用率

		    $('#container').highcharts({
		        chart: {
		            type: 'gauge',plotBackgroundColor: null,plotBackgroundImage: null,plotBorderWidth: 0,plotShadow: false
		        },
		        title: {
		            text: '内存占用率（%）'
		        },
		        pane: {
		            startAngle: -150,endAngle: 150,
		            background: [{
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#FFF'],
		                        [1, '#333']
		                    ]
		                },
		                borderWidth: 0,outerRadius: '109%'
		            }, {
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#333'],
		                        [1, '#FFF']
		                    ]
		                },
		                borderWidth: 1,outerRadius: '107%'
		            }, {
		                // default background
		            }, {
		                backgroundColor: '#DDD',borderWidth: 0,outerRadius: '105%',innerRadius: '103%'
		            }]
		        },
		        // the value axis
		        yAxis: {
		            min: 0,max: 100,minorTickInterval: 'auto',minorTickWidth: 1,minorTickLength: 10,minorTickPosition: 'inside',
		            minorTickColor: '#666',tickPixelInterval: 30,tickWidth: 2,tickPosition: 'inside',tickLength: 10,tickColor: '#666',
		            labels: {
		                step: 2,rotation: 'auto'
		            },
		            title: {
		                text: '内存占用率（%）'
		            },
		            plotBands: [{
		                from: 0,to: 60,color: '#55BF3B' // green
		            }, {
		                from: 60,to: 80,color: '#DDDF0D' // yellow
		            }, {
		                from: 80,to: 100,color: '#DF5353' // red
		            }]
		        },
		        credits: {
		            enabled: false     //是否显示logo，默认为显示，false不显示
		        },
		        series: [{
		            id: 'containerse',name: '占用率',data: [a0],
		            tooltip: {
		                valueSuffix: '%'
		            }
		        }],
		    })
	    
		    $('#container1').highcharts({
		        chart: {
		            type: 'gauge',plotBackgroundColor: null,plotBackgroundImage: null,plotBorderWidth: 0,plotShadow: false
		        },
		        title: {
		            text: 'CPU占用率（%）'
		        },
		        pane: {
		            startAngle: -150,endAngle: 150,
		            background: [{
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#FFF'],
		                        [1, '#333']
		                    ]
		                },
		                borderWidth: 0,outerRadius: '109%'
		            }, {
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#333'],
		                        [1, '#FFF']
		                    ]
		                },
		                borderWidth: 1,outerRadius: '107%'
		            }, {
		                // default background
		            }, {
		                backgroundColor: '#DDD',borderWidth: 0,outerRadius: '105%',innerRadius: '103%'
		            }]
		        },
		        // the value axis
		        yAxis: {
		            min: 0,max: 100,minorTickInterval: 'auto',minorTickWidth: 1,minorTickLength: 10,minorTickPosition: 'inside',
		            minorTickColor: '#666',tickPixelInterval: 30,tickWidth: 2,tickPosition: 'inside',tickLength: 10,tickColor: '#666',
		            labels: {
		                step: 2,rotation: 'auto'
		            },
		            title: {
		                text: 'CPU占用率（%）'
		            },
		            plotBands: [{
		                from: 0,to: 60,color: '#55BF3B' // green
		            }, {
		                from: 60,to: 80,color: '#DDDF0D' // yellow
		            }, {
		                from: 80,to: 100,color: '#DF5353' // red
		            }]
		        },
		        credits: {
		            enabled: false     //是否显示logo，默认为显示，false不显示
		        },
		        series: [{
		            id:'container1se',
		            name: '占用率',
		            data: [a1],
		            tooltip: {
		                valueSuffix: '%'
		            }
		        }]
		
		    })
	
		    $('#container2').highcharts({
		        chart: {
		            type: 'gauge',plotBackgroundColor: null,plotBackgroundImage: null,plotBorderWidth: 0,plotShadow: false
		        },
		        title: {
		            text: '硬盘占用率（%）'
		        },
		        pane: {
		            startAngle: -150,endAngle: 150,
		            background: [{
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#FFF'],
		                        [1, '#333']
		                    ]
		                },
		                borderWidth: 0, outerRadius: '109%'
		            }, {
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [
		                        [0, '#333'],
		                        [1, '#FFF']
		                    ]
		                },
		                borderWidth: 1,outerRadius: '107%'
		            }, {
		                // default background
		            }, {
		                backgroundColor: '#DDD',borderWidth: 0,outerRadius: '105%',innerRadius: '103%'
		            }]
		        },
		        // the value axis
		        yAxis: {
		            min: 0,max: 100,minorTickInterval: 'auto',minorTickWidth: 1,minorTickLength: 10,minorTickPosition: 'inside',
		            minorTickColor: '#666',tickPixelInterval: 30,tickWidth: 2,tickPosition: 'inside',tickLength: 10,tickColor: '#666',
		            labels: {
		                step: 2, rotation: 'auto'
		            },
		            title: {
		                text: '硬盘占用率（%）'
		            },
		            plotBands: [{
		                from: 0,to: 60,color: '#55BF3B' // green
		            }, {
		                from: 60,to: 80,color: '#DDDF0D' // yellow
		            }, {
		                from: 80,to: 100,color: '#DF5353' // red
		            }]
		        },
		        credits: {
		            enabled: false     //是否显示logo，默认为显示，false不显示
		        },
		        series: [{
		            name: '占用率',
		            id: 'container2se',
		            data: [a2],
		            tooltip: {
		                valueSuffix: '%'
		            }
		        }]
		    })
	    
	    
		    getPeopleShow();
		    
	    
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {  //连接至ashx文件失败时，执行函数
		    //XMLHttpRequest在这个例子里没有用到
		    //textStatus是表示状态的字符串，这里textStatus的值是"error"
		    //errorThrown包含连接失败的信息，可以输出查看
		    alert("请求在连接过程中出现错误..\n" + errorThrown);
		 }
	});
}
 
function count1() {
    var a0;
    var a1;
    var a2;
    // alert("jinru");

	$.ajax({
	    type: "post",
		url: "findMCDAction_findMCD",
		
		data: {
		
		},
		// cache:false,
		//  async:true,
		
		success: function (data) {

		    var aa = data.split(",");
		    // alert(aa[0]);
		    a0 = parseFloat(aa[0]);//内存占用率
		    a1 = parseFloat(aa[1]);//CPU占有率
		    a2 = parseFloat(aa[2]);//硬盘占用率
		    //a2 = (1.0 - a2) * 100;
		    var exSeries = $('#container').highcharts().get('containerse');
		    // 设置定时器, 5秒刷新一次
		    var exSeries1 = $('#container1').highcharts().get('container1se');
		    var exSeries2 = $('#container2').highcharts().get('container2se');
		    // 设置需要显示的数据
		    
		    // 第2个参数表示是否重绘，第3个参数表示是否启用动画，第4个参数表示是否更新数据点[数组长度一样时建议false]
		    exSeries.setData([a0], true, false, false);
		    exSeries1.setData([a1], true, false, false);
		    exSeries2.setData([a2], true, false, false);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {  //连接至ashx文件失败时，执行函数
		    //XMLHttpRequest在这个例子里没有用到
		    //textStatus是表示状态的字符串，这里textStatus的值是"error"
		    //errorThrown包含连接失败的信息，可以输出查看
		    alert("请求在连接过程中出现错误..\n" + errorThrown);
        }
    });
  
}
// strPrintName 打印任务名
// printDatagrid 要打印的datagrid
setInterval("count1()", "5000");
// 首先获取serie

function confirm() {
	aimPeople = $("#aimPeople").val();
	getPeopleShow();
}

function getPeopleShow() {
	var mydata = [];
    var str = "{\"y\":" + onlinePeople + ",\"target\":" + aimPeople + "}";
    var json = eval('(' + str + ')');
    mydata.push(json);
    $('#container11').highcharts({
    	chart: {
    		inverted: true,
			type: 'bullet',
			marginLeft: 220,
    		marginTop: 40
    	},
    	title: {
    		text: '系统在线账户数：' + onlinePeople * 1
    	},
    	legend: {
			enabled: false
		},
    	xAxis: {
    		categories: ['<span class="hc-cat-title">人数</span><br/> 个']
    	},
    	yAxis: {
    		gridLineWidth: 0,
    		plotBands: [{
    			from: 0,
    			to: 50,
    			color: '#666'
    		}, {
    			from: 50,
    			to: 150,
    			color: '#999'
    		}, {
    			from: 150,
    			to: 9e9,
    			color: '#bbb'
    		}],
    		title: null
    	},
    	plotOptions: {
			series: {
				pointPadding: 0.25,
				borderWidth: 0,
				color: '#000',
				targetOptions: {
					width: '200%'
				}
			}
		},
    	series: [{
    		id: 'peopleShow',
    		data: mydata
    	}],
    	tooltip: {
    		pointFormat: '<b>{point.y}</b> （目标值 {point.target}）'
    	},
		credits: {
            enabled: false     //是否显示logo，默认为显示，false不显示
        },
        exporting: {
			enabled: false
		}
    });
}



