// JavaScript Document
/**************轮播配置*************************/
var picTotal = 3; //图片总张数,必须修改
var change_delay = 3000; //图片切换间隔，单位毫秒
var change_speed = 800; //图片求换速度，单位毫秒
var arr = new Array(
"text1", //文本1
"text2", //文本2
"text3" //文本3
);
var change_mode = 1;//切换模式，共有3中分别为上一张图片50%移动，100%移动，和不移动;
var direction = 0; //滚动方向：1向右，0向左
/********************************************/

var img_width = $(".lunbo_img").width();
var t;
var currentPic = 1; //当前图片位置
var lastPic = 0;
var status = 0 //点击屏蔽
var img_position;
$(document).ready(function() { //initinalize,注意预先定义图片数量
    // document.getElementById("lunbo_tip").innerHTML = arr[0];
	$(".lunbo_img").each(function(i) {
		$(this).css("z-index", 10 + i); //为每一张图片确定堆叠顺序   
	});
	for (var index = 1; index < picTotal; index++) {
		if (direction == 1) {
			img_position = -img_width;
		} else {
			img_position = img_width;
		}
		$(".lunbo_img").eq(index).css("left", img_position);
	} //滚动方向
	t = setTimeout("picChange()", 3000);
});
// $("#lunbo_num span").on('click',
// function() {
// 	if ($(this).index() != lastPic && status == 0) {
// 		currentPic = $(this).index();
// 		clearTimeout(t);
// 		picChange();
// 		status = 1;
// 	}
// });
picChange = function() {
	$("#lunbo_tip").fadeOut(200).animate({
		left: 870
	},
	0); //轮播tip
	if(change_mode == 1){//1/2移动
		change_position = -img_position / 2;
	} else if(change_mode == 2) {//百分之百移动
		change_position = -img_position;
		} else if(change_mode == 3){//不移动
			change_position = 0;
			}
		
	$(".lunbo_img").eq(lastPic).animate({
		left: change_position
	},
	change_speed,
	function() {
		$(this).children(".lunbo_detail").fadeOut();
	});

	$("#lunbo_num span").eq(lastPic).animate({
		padding: "5px 5px"
	},
	200);
	$("#lunbo_num span").eq(lastPic).css("backgroundColor", "rgba(255,255,255,.3)");
	// $("#lunbo_num span").eq(currentPic).animate({
	// 	padding: "5px 10px"
	// },
	// 200);
	$("#lunbo_num span").eq(currentPic).css("backgroundColor", "#fff");

	$(".lunbo_img").eq(currentPic).animate({
		left: "0"
	},
	change_speed,
	function() { //进入图片的最终位置
		$(this).children(".lunbo_detail").fadeIn(500);
		$(".lunbo_content").eq(currentPic).fadeIn(500);
		$(".lunbo_content").eq(lastPic).hide();
		$(".lunbo_img").eq(lastPic).css("left", img_position).css("z-index", 11);
		$(".lunbo_img").eq(currentPic).css("z-index", 10);
		var val
		switch (currentPic) {
		case 0:
			val = arr[0];
			break;
		case 1:
			val = arr[1];
			break;
		case 2:
			val = arr[2];
			break;
		}
		// document.getElementById("lunbo_tip").innerHTML = val;
		$("#lunbo_tip").show().animate({
			left: 890
		},
		200);

		lastPic = currentPic;
		currentPic += 1;
		currentPic = currentPic % picTotal;
		status = 0;
	}); //切换
	t = setTimeout("picChange()", change_delay);

};
$(window).resize(function() {
	//浏览器窗口变化修正
	img_width = $(".lunbo_img").width();
	for (var index = 0; index < picTotal; index++) {
		if (direction == 1&&index!=lastPic) {
			img_position = -img_width;
		} else {
			img_position = img_width;
		}}
	$(".lunbo_img").eq(index).css("left", img_position);
})