/**
 * Created by wx on 2019/8/14.
 */
initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#lunbo").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#lunbo").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});