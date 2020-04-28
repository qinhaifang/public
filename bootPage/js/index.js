// 根据用户屏幕宽度 加载 响应的图形化js文件
function setSize() {
	var dw = document.documentElement.clientWidth;
	document.documentElement.style.fontSize = (dw * def).toFixed(2) + 'px';
}
if (document.documentElement.clientWidth < 1600 ) {
	$("#bootPages")[0].src="./bootPage/js/bootPages_1366.js";
	def = (100 / 1366).toFixed(3);
} else {
	$("#bootPages")[0].src="./bootPage/js/bootPages_1920.js";
	def = (100 / 1920).toFixed(3);
}

setSize();
window.addEventListener("resize", setSize, false);

localStorage.role = -1;	// 存储用户选择的身份

getState();
// 选择身份
$("#selectRole>li").on("click", function () {
	localStorage.role = $(this).index();	// 存储用户选择的身份
	renderBootPage (bootPage[$(this).index()]);
	$("#dialog").hide();
	sendState({
		landfallPc: ($(this).index())+1
	});
});

// 退出角色引导
$("#dialog .close").on("click", function () {
	$("#dialog, #mark").hide();
	localStorage.role = -1;	// 用户拒绝新手指导
});
var locarr = ["ziyuanchi_children", "contract_children", "work_children", "houseType_children", "zuHou_children", "finance_children", "statement_children", "oa_children", "peiZhi_children", "qiYe_children", "web_children", "yeji_children", "yingXiao_children"];

// 帮助按钮	初始化所有本地存储信息
$("#point").on("click", function () {
	// 初始化访问 修改本地存储
	localStorage.role = -1;
	for(var i=0; i<locarr.length; i++){
		localStorage[locarr[i]] = "not";
	}
	// 让用户选择身份，体验新手引导
	$("#dialog, #mark").show();
	$("#mark").css({"background" : "rgba(0, 0, 0, 0.6)"})
});

// 渲染引导图
function renderBootPage (bootPage) {
	$("#bootPage").empty();
	var div, exit, next, img,
		btnLen = bootPage["button"].length;	// 下一步盒子模块的数量

	for (var i=0; i<btnLen; i++) {
		div = document.createElement("div");
		img = document.createElement("img");
		exit = document.createElement("div");
		next = document.createElement("div");

		img.src = "./bootPage/images/"+ view +"/"+ bootPage["bootName"] +"/"+ (i+1) +".png";
		
		// 跳过按钮
		$(exit).css({"top": bootPage["button"][i]["top"] + "rem", "left": (bootPage["button"][i]["left"] - 0.8).toFixed(3) +  "rem"}).attr({"class": "button exit"});

		// 下一步按钮
		$(next).css({"top": bootPage["button"][i]["top"] + "rem", "left": bootPage["button"][i]["left"] + "rem"}).attr({"class": "button next"});

		$(div).append(img).append(exit).append(next);
		$("#bootPage").append(div);
	}
	$("#bootPage, #mark").show();
	$("#bootPage>div").eq(0).show();
	$("#mark").css({"background" : "#000"});

	// 下一步
	$("#bootPage .next").on("click", function () {
		var index = $(this).parent().index();
		$("#bootPage>div").eq(index).hide().end().eq(index+1).show();
		if(index == btnLen-1){
			// 显示静态指引模块
			$("#bootPage").hide();
			$("#mark").css({"background" : "rgba(0, 0, 0, 0.6)"})
			$("#pointOver, #mark").show();
		}
	})

	// 跳过
	$("#bootPage .exit").on("click", function () {
		localStorage.role = -1;
		$("#bootPage, #mark").hide();
	})
}


// 是否显示静态引导页    查看模块功能引导
$("#pointOver .continue").on("click", function () {
	$("#mark").css({"background" : "#000"})
    $("#subsequent>img").hide().attr("src", "./bootPage/images/"+ view +"/subsequent/work_children.png").show();
    if(document.documentElement.clientWidth>1600){
    	$("#know").css({"top": "5.1rem", "left": "8.8rem"})
    }
    localStorage["work_children"] = "visited";
	$("#pointOver").hide();
	$("#subsequent").show();
})

// 我已了解，不体验了
$("#pointOver .exit, #pointOver .close").on("click", function () {
	$("#pointOver, #mark").hide();
	localStorage.role = -1;
})


// 静态引导页的 “我知道了” 按钮
$("#know").on("click", function () {
	$("#subsequent, #mark").hide();
});
