$(function () {
    //获取缓存里的公司机构代码
    // $("#anQuanMa").val(getItems("gcid"));
    //获取缓存里的登录名
    $("#userName").val(getItems("chaoJiName"));
    //清空密码
    $("#passWord").val("");
    //初始化电脑信息，安装包用
    initComputerInfo();
});

/**
 * 获取页面数据
 */
var viewData = {
    gcid:"",        //安全码
    accountName:"", //用户名
    accountPwd:"",  //密码
    mac:"",         //电脑mac
    cpuId:"",        //电脑cpuId
    cip: ""
};

/**
 * 初始化页面数据
 */
function initViewData(){
    viewData.gcid = $("#anQuanMa").val();  //安全码
    viewData.accountName = $("#userName").val();  //用户名
    viewData.accountPwd = $("#passWord").val();  //密码
    viewData.cip = returnCitySN["cip"]; // 引入第三方script获取当前cip
}

/**
 * 初始化电脑信息，安装包用
 */
function initComputerInfo(){
    try{
        SystemWin.macAddress(function(arg){
            viewData.mac = arg;   //mac
        },function(arg){});
        SystemWin.cpuId(function(arg){
            viewData.cpuId = arg;  //cpuid
        },function(arg){})
    }catch (e){}
}

var chekA = false;
function chek(){
    if(!chekA){
        $(".layui-icon").parent().addClass("layui-form-checked");
        chekA = true;
    }else{
        $(".layui-icon").parent().removeClass("layui-form-checked");
        chekA = false;
    }
}

/**
 * 登录
 * 点击登录按钮初始化页面数据，然后判断必填字段是否为空，再给登录API传参
 */
function login() {
    //获取数据
    initViewData();
    var sendData = viewData;
    //将gcid先存入缓存
    setItemsObj(currentJJRUser,viewData);
    if(checkField($("#login"))){
        loginData(sendData);
    }
}

//定时器
var $time = '';

/**
 * 登录方式切换
 * 点击登录内容右上角切换用户名登录或二维码登录
 */
$(".user-mt-img").click(function(){
    //获取二维码
    getErWeiMa();
    $(".user-main").hide();      //隐藏输入框
    $(".qrCode-main").show();    //显示二维码
    /**
     * 设置定时器，1s请求一次
     */
    $time = setInterval(getErWeiMa, 1000);
});
/**
 * 切换输入框登录
 */
$(".qrCode-mt-img").click(function(){
    $(".qrCode-main").hide();     //隐藏二维码登录
    $(".user-main").show();       //显示输入框
    //清除定时器
    clearErWeiMa();
    $("#ewmCode").html("");   //二维码清空
    $("#loginCon").find("[name=erweima]").attr("code","");   //清空二维码code
});
//回车执行登录事件
$(document).keypress(function(e) {
    // 回车键事件
    if(e.which == 13) {
        login();
    }
});

/**
 * 返回二维码重新登录
 */
function showErWeiMa($thisObj) {
    $($thisObj).parent().hide();
    $($thisObj).parent().parent().find("[name=erweima]").show();
    /**
     * 设置定时器，1s请求一次
     */
    $time = setInterval(getErWeiMa, 1000);
}

/**
 * 清除定时器
 */
function clearErWeiMa() {
    window.clearTimeout($time);
}

/**
 * 获取二维码信息
 * @type {{scanCode: string}}
 */
var getMaData = {
    scanCode:""   //code码
};

/**
 * 获取二维码
 */
function getErWeiMa() {
    getMaData.scanCode = strFormat( $("#loginCon").find("[name=erweima]").attr("code"),"");
    var sendData = getMaData;
    getErWeiMaData(sendData);
}

/**
 * 刷新二维码
 */
function showNewMa() {
    //获取新二维码
    getErWeiMa();
    $("#loginCon").find("[name=showMaGuoQi]").hide();   //隐藏二维码过期
}
