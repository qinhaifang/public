$(function () {
    //可视高度
    $("#kongZhiTongJi").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
    //获取房源数量
    getHouseCount();
    //获取空置率
    getHouseKongZhiLv();
});

//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#kongZhiTongJi").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
});

//房源，整租、合租、集中筛选状态
$("#kongZhiTongJi").find("[name=houseStatus]").find("span").click(function () {
    $(this).addClass("houseActive").siblings().removeClass("houseActive");
});

/**
 * 获取房源数量
 */
function getHouseCount() {
    var sendData = '';
    getHouseCountData(sendData);
}

/**
 * 获取空置率
 */
function getHouseKongZhiLv() {
    var sendData = '';
    getHouseKongZhiLvData(sendData);
}

// 基于准备好的dom，初始化echarts实例
var kongzhifangChart = echarts.init(document.getElementById('kongzhifangmain'));

// 指定图表的配置项和数据
var kongzhifangOption = {

};


