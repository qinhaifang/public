$(function () {
    $("#yewutongji").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
    //获取房源信息
    refreshData();
});

//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#yewutongji").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
});

/**
 * 获取房源信息数量
 * @type {{houseType: string}}
 */
var viewHouseData ={
    houseType:''   // 1 整租   2 合租    3 集中
};

/**
 * 获取房源信息数量
 */
function getData() {
    viewHouseData.houseType = $("#yewutongji").find("[name=houseStatus]").find(".houseActive").attr("type");   // 1 整租   2 合租    3 集中
}

/**
 * 获取房源信息数量
 */
function getHouseCount() {
    //获取房源状态   1 整租   2 合租    3 集中
    getData();
    var sendData = viewHouseData;
    getHouseCountData(sendData);
}

//房源，整租、合租、集中筛选状态
$("#yewutongji").find("[name=houseStatus]").find("span").click(function () {
    $(this).addClass("houseActive").siblings().removeClass("houseActive");

    //获取房源信息
    refreshData();
});

/**
 * 获取房源柱状图
 */
function getHouseZhuZhuang() {
    //获取房源状态   1 整租   2 合租    3 集中
    getData();
    var sendData = viewHouseData;
    getHouseZhuZhuangData(sendData);
}

/**
 * 刷新数据
 */
function refreshData() {
    //获取房源信息数量
    getHouseCount();
    //获取房源柱状图
    getHouseZhuZhuang();
}
/**
 * 柱状图数据
 *
 */
// 基于准备好的dom，初始化echarts实例
var chufangChart = echarts.init(document.getElementById('chufangmain'));       //出房柱状图
var shoufangChart = echarts.init(document.getElementById('shoufangmain'));     //收房柱状图

// 指定图表的配置项和数据
var chufangOption = {};     //出房柱状图
var shoufangOption = {};    //收房柱状图

