/*//初始内容区iform高度
initMapWindows();
function initMapWindows() {
    $(".updata").css({"height":($(window).height()) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $(".updata").css({"height":($(window).height()) + "px"});
});*/
$(function () {
    getNewRemarks();
});
function getNewRemarks() {
    var sendData = {
        status: '1'// 0未发布,1已发布
    };
    getNewRemarksData(sendData);
}




