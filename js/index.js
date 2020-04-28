// 初始内容区iform高度
initMapWindows();
function initMapWindows() {
    $(".updata").css({"height": ($(window).height()) + "px"});
    $("#index").css({"height": ($(window).height() - 0) + "px"});
    $("#layout-content").css({"height": ($(window).height() - 60) + "px"}, {"width": ($(window).width() - 100) + "px"});
    $("#main-content").css({"height": ($(window).height() - 60) + "px"}, {"width": ($(window).width() - 100) + "px"});
    $("#index .navigationList").css({"height": ($(window).height() - 135) + "px"});
}
// 监听浏览器可视区域触发事件
$(window).resize(function () {
    $(".updata").css({"height": ($(window).height()) + "px"});
    $("#index").css({"height": ($(window).height() - 0) + "px"});
    $("#layout-content").css({"height": ($(window).height() - 60) + "px"}, {"width": ($(window).width() - 100) + "px"});
    $("#main-content").css({"height": ($(window).height() - 60) + "px"}, {"width": ($(window).width() - 100) + "px"});
    $("#index .navigationList").css({"height": ($(window).height() - 135) + "px"});
});
/*左侧导航栏切换功能*/
/*点击一级菜单，二级菜单的隐藏显示*/
$(function () {
    //设置权限
    //checkAccess();
    shezhiQuanXian();
    //获取公司logo
    companylogoData();   //获取logo图片
    //没有登录跳回登录页
    if (isNull(getItemsObj(currentJJRUser))) {
        window.location.href = "login.html";
    } else {
        //登录账号为 0100099  的账号显示资源管理功能s
        if (getItems("gcid") == "0100099" && getItems("chaoJiName") == "zhimin.liao") {
            $("#peiZhi_children").find("[name=ziYuanGuanLi]").show();
            $("#qiYe_children").find("[name=wenTiFanKui]").show();
            $("#peiZhi_children").find("[name=banbengengxin]").show();
        } else {
            //其余账号隐藏资源管理功能
            $("#peiZhi_children").find("[name=ziYuanGuanLi]").remove();
            $("#qiYe_children").find("[name=wenTiFanKui]").remove();
            $("#peiZhi_children").find("[name=banbengengxin]").remove();
        }
        //保利显示日租模块
        if (getItems("gcid") == "0200011" || getItems("gcid") == "888888" || getItems("gcid") == "0100099"){
            $("#index").find("[special=specialRizu]").show();
        }else {
            $("#index").find("[special=specialRizu]").hide();
        }
        //只有登录安全码为0100099且账号为admin展示视频教程功能
        if (!(getItems("gcid") == "0100099" && getItems("chaoJiName") == "admin")){
            $("#peiZhi_children").find("[name=courseManage]").remove();
        }
    }
    /*
     * 判断是否登录
     * 判断window是否有缓存，若无则跳转登录页面
     * */
    ifLogin();

    //获取登录人信息   判断登录人信息的头像，若无则用公共图片，然后给$('#broker')填充标签
    getJingJiRenName();


    //判断是否有更新说明，并且是第一次打开弹层提示
    // openUpdataRemark();
    //判断新增权限是否应该存在
    checkNewAddButton();
});

/**
 * 判断新增权限是否应该存在
 */
function checkNewAddButton() {
    var $convenientCon = $("#convenientCon");   //新增按钮集合
    var $addButton = $(".nav-quickEntry").find("a");
    if($addButton.length < 1){
        $("#convenientCon").remove();
    }
    //判断新增按钮是否存在
    var $newAddLength = $convenientCon.find("li").length;
    if($newAddLength < 1){
        $addButton.remove();
    }
}
//版本更新
function openUpdataRemark() {
    var sendData = {
        status: '1'// 0未发布,1已发布
    };
    getNewRemarksData(sendData);
}
function closeUpdata($this) {
    setItems("close", "close");
    setItems("closeId", $($this).attr("attrId"));
    $("#upDataRemark").hide();
}
/*
 * 判断是否登录
 * 判断window是否有缓存，若无则跳转登录页面
 * */
function ifLogin() {
    try {
        if (isNull(getItems(currentJJRUser))) {
            
            window.location.href = "login.html";
        }
    } catch (e) {
    }
}
/*
 * 获取登录人信息
 * 判断登录人信息的头像，若无则用公共图片，然后给$('#broker')填充标签
 * */
function getJingJiRenName() {
    var jjrXinXi = getItemsObj(currentJJRUser).pic;
    if (isNull(jjrXinXi)) {
        jjrXinXi = "images/index_touxiang.png";
    }
    var jjr = "";
    jjr += '<img src="' + jjrXinXi + '" />';
    jjr += '<span>' + getItemsObj(currentJJRUser).nickName + '</span>';
    $("#broker").html(jjr);
}
/**
 * 退出
 * 点击退出，清除window缓存(清除用户信息)，跳转登录页面
 * */
$("#index-exit").click(function () {
    // setItems("userId",getItemsObj(currentJJRUser).id);
    delItems(currentJJRUser);  //清空登录人信息
    //delItems("chaoJiName");    //清空管理员账号
    //delItems("gcid");          //清空gcid
    delItems("JJuserOperateTime"); //清空当前登录时间
    delItems("setItemsObj");    //清空登录信息
    // delItems("close");          //清空close
    // delItems("closeId");        //清空closeId
    window.location.href = "login.html";

});
/**
 * 修改密码
 * 修改完密码，确定，清除window缓存(清除用户信息)，跳转登录页面
 * */
$("#updateMiMa").click(function () {
    top.layer.open({
        title: [
            '修改密码',
            'color: #86b22f; font-size:16px;'
        ],
        type: 2,
        zIndex: '99999',
        //parentId='+$parentId+'&houseId='+$houseId
        content: 'changePwd.html',
        area: ['500px', '300px']
    });
});

$("#pms_system_message").click(function () {
    top.layer.open({
        title: [
            '系统消息',
            'color: #86b22f; font-size:16px;'
        ],
        type: 2,
        zIndex: '999',
        //parentId='+$parentId+'&houseId='+$houseId
        content: 'messageList/systemMessageList.html',
        area: ['800px', '660px']
    });
});


/*$(".nav-left").click(function () {
 var hash = location.hash;
 //$(this).addClass("nav-active").siblings().removeClass("nav-active");
 var nav_children_id = $(this).attr("href").substr(1);
 $(".layout-top ul[id='"+nav_children_id+"']").show().siblings().hide();
 $("#"+nav_children_id).find("li").eq(0).click();
 });*/
/*
 * 一级导航点击事件
 * 点击菜单栏显示对应的页面内容，给所点击的一级导航添加样式
 * */
$('.navCon').click(function () {
    layer.closeAll('iframe');//清空日租的无房型提示页面
    if ($url == serverUrl && $(this).attr("hideAdmission") == "hide") {
        top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦！");
    } else {
        var hash = location.hash;
        $(this).addClass("nav-active").siblings().removeClass("nav-active");
        var nav_children_id = $(this).find(".nav-left").attr("href").substr(1);
        $(".layout-top ul[id='"+nav_children_id+"']").show().siblings().hide();

        if ($("#"+nav_children_id).find("li[class='active']").length == 0){     //防止没有第二级菜单第一个按钮的权限情况
            $("#"+nav_children_id + " li").eq(0).click();
        } else {
            $("#"+nav_children_id).find("li[class='active']").click();
        }

        setTimeout(function () {
            var role = localStorage.role;
            // 根据本地存储状态 根据用户选择的身份 路由跳转时给出相应的操作指导
            if (role == 0 || role == 1 || role == 2) {
                // 如果本地访问过当前引导页 则不再显示新手引导
                if(localStorage[nav_children_id] != "visited" && nav_children_id!="rizu_children" && nav_children_id!="huiYuan_children" && nav_children_id!="help_children"){
                    $("#subsequent, #mark").show();
                    if(document.documentElement.clientWidth>1600){
                        $("#know").css({"top": "5.1rem", "left": "8.8rem"})
                    }
                    $("#subsequent>img").hide().attr("src", "").attr("src", "./bootPage/images/"+ view +"/subsequent/"+ nav_children_id +".png").show();
                    localStorage[nav_children_id] = "visited";
                }
            }
        })



        /*$("#"+nav_children_id).find("li").eq(0).click();*/
        /*点击菜单栏显示对应的页面内容*/
        //$("#main-content").attr("src",$(this).attr("navUrl"));
        /**
         * 点击nav
         * 给所点击的一级导航添加样式
         */
        var thisAlt = $(this).find("img").attr("alt");
        for(var i=0;i<$(this).siblings().find("img").length;i++){
            var alt = $(this).siblings().find("img").eq(i).attr("alt");
            $(this).siblings().eq(i).find("img").attr("src", "images/index_" + alt + ".png");
        }
        $(this).find("img").attr("src", "images/index_" + thisAlt + "s.png");
    }
});
var originalDom = "";       //原始划入dom
var originalDomIndex = 0;   //记录原始dom下标
/*
 * 二级菜单点击事件，给菜单添加删除类名
 */
$(".nav-children li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    if (isNull($(this).attr("navUrl"))){
        $("#" + $(this).attr("navTo") + " li").eq(0).click();
    }
    $("#main-content").attr("src", $(this).attr("navUrl"));
    //权限设置
    checkQuanXian(this);
    originalDom = $(".nav-children .active");
    originalDomIndex = 0;
});
$(".nav-children li").on("mouseover", function () {
    if (originalDomIndex == 0){
        originalDom = $(".nav-children .active");
    }
    originalDomIndex ++;
    $(this).addClass("active").siblings().removeClass("active");
    if ( !isNull($(this).attr("navTo")) ) {
        $(".layout-top-children").stop(true,true).slideDown().find("div[id=" + $(this).attr("navTo") + "]").show().siblings().hide();
    }else {
        $(".layout-top-children").hide();
    }
});
$(".nav-children li").on("mouseout", function () {
    // $(".layout-top-children").find("div[id=" + $(this).attr("navTo") + "]").hide();
    originalDom.addClass("active").siblings().removeClass("active");
    originalDomIndex = 0;
});
$(".layout-top-children").on("mouseleave", function () {
    $(this).stop(true,true).slideUp();

});

/*报表三级菜单点击效果*/
$("#zongheBaobiao li").click(function () {
    $("#statement_children").find("li[navTo=zongheBaobiao]").addClass("active").siblings().removeClass("active");
    $("#zongheBaobiao li").removeClass("active");
    $(this).addClass("active");
    $("#main-content").attr("src", $(this).attr("navUrl"));
    $("#statement_children .active").attr("navurl", $(this).attr("navUrl"));
    //权限设置
    checkQuanXian(this);
});
$("#jizhongBaobiao li").click(function () {
    $("#statement_children").find("li[navTo=jizhongBaobiao]").addClass("active").siblings().removeClass("active");
    $("#jizhongBaobiao li").removeClass("active");
    $(this).addClass("active");
    $("#main-content").attr("src", $(this).attr("navUrl"));
    //权限设置
    checkQuanXian(this);
});
/**
 * 设置权限
 */
function shezhiQuanXian() {
    //默认点击第一个二级导航菜单
    $(".navigationList").find(".navCon").eq(0).click();
    //隐藏所有按钮
    $("#piLiangBangMenSuo").hide();   //批量绑门锁
    $("#addBuMen").hide();       //添加部门
    $("#addJueSe").hide();       //添加角色
    $("#addYuanGong").hide();    //添加员工
    $("#addZiDian").hide();      //添加字典
    $("#addZiYuan").hide();      //添加资源
    /*$("#shenPai").hide(); */       //申请维修
    /*$("#shenBao").hide(); */       //申请保洁
    /*$("#shenTou").hide(); */       //申请投诉
    $("#addZhanghu").hide();     //添加账户
    $("#addhtTemplet").hide();   //添加模板
    $("#addCurstomer").hide();   //添加客源
    $("#addYuYue").hide();       //资源池-租客-添加预约
    /*$("#addAnQuan").hide();      //添加白名单*/
    $("#houseDaoru").hide();     //导入房源
    $("#zukeHeTongDaoru").hide();  //租客合同导入
    $("#zukeInfoDaoru").hide();   //租客信息导入
    $("#yezhuHeTongDaoru").hide();  //业主合同导入
    $("#shouzhiDaoru").hide();    //收支导入
    $("#gongyingshang").hide();   //供应商管理添加按钮
    //$("#kuandaidingdan").hide();  //宽带订单
    $("#zichanguanli").hide();    //资产管理添加按钮
    $("#bannermanger").hide();    //banner管理添加按钮
    $("#addkaoqin").hide();       //考勤管理添加按钮
    $("#shenQingLoan").hide();    //申请贷款添加按钮
    $("#banbenupdata").hide();    //隐藏版本更新按钮
    $("#officialWebsite").hide(); //隐藏官网管理

}
/**
 * 权限设置
 */
function checkQuanXian($thisObj) {
    $("#add-official-website-banner").remove();
    //批量绑门锁
    /*判断是否是智能门锁页面，是则显示批量绑门锁按钮*/
    if ($($thisObj).attr("name") == "mensuo") {
        $("#piLiangBangMenSuo").css("display", "block");
    } else {
        //否则隐藏
        $("#piLiangBangMenSuo").css("display", "none");
    }
    //添加部门
    /*判断是否是配置页面的部门管理页面，是则显示添加部门按钮*/
    if ($($thisObj).attr("name") == "buMenGuanLi") {
        $("#addBuMen").css("display", "block");
    } else {
        //否则隐藏
        $("#addBuMen").css("display", "none");
    }
    //添加角色
    /*判断是否是配置页面的角色管理页面，是则显示添加角色按钮*/
    if ($($thisObj).attr("name") == "jueSeGuanLi") {
        $("#addJueSe").css("display", "block");
    } else {
        //否则隐藏
        $("#addJueSe").css("display", "none");
    }
    //添加员工
    /*判断是否是配置页面的员工管理页面，是则显示添加员工按钮*/
    if ($($thisObj).attr("name") == "yuanGongGuanLi") {
        $("#addYuanGong").css("display", "block");
    } else {
        //否则隐藏
        $("#addYuanGong").css("display", "none");
    }
    //添加字典
    /*判断是否是配置页面的字典管理页面，是则显示添加字典按钮*/
    if ($($thisObj).attr("name") == "ziDianGuanLi") {
        $("#addZiDian").css("display", "block");
    } else {
        //否则隐藏
        $("#addZiDian").css("display", "none");
    }
    //添加PK
    /*判断是否是配置页面的擂台管理页面，是则显示添加PK按钮*/
    if($($thisObj).attr("name") == "leitaiguanli"){
        $("#addPK").css("display","block");
    }else{
        //否则隐藏
        $("#addPK").css("display","none");
    }
    //添加人员
    /*判断是否是黑名单管理的页面，是则显示添加人员按钮*/
    if($($thisObj).attr("name") == "heimingdan"){
        $("#addHeimingdan").css("display","block");
    }else{
        //否则隐藏
        $("#addHeimingdan").css("display","none");
    }
    //添加教程
    /*判断是否是教程管理的页面，是则显示添加教程按钮*/
    if($($thisObj).attr("name") == "courseManage"){
        $("#addCourse").css("display","block");
    }else{
        //否则隐藏
        $("#addCourse").css("display","none");
    }
    //添加企业账号
    /*判断是否是企业账号管理的页面，是则显示添加企业账号*/
    if($($thisObj).attr("name") == "qiyezhanghao"){
        $("#addQiYeZhangHao").css("display","block");
    }else{
        //否则隐藏
        $("#addQiYeZhangHao").css("display","none");
    }
    //添加资源
    /*判断是否是配置页面的资源管理页面，是则显示添加资源按钮*/
    if ($($thisObj).attr("name") == "ziYuanGuanLi") {
        $("#addZiYuan").css("display", "block");
    } else {
        //否则隐藏
        $("#addZiYuan").css("display", "none");
    }
    //添加账户
    /*判断是否是对公账户页面，是则显示添加账户按钮*/
    if ($($thisObj).attr("name") == "duigongzhanghu") {
        $("#addZhanghu").css("display", "block");
    } else {
        //否则隐藏
        $("#addZhanghu").css("display", "none");
    }
    //添加模板
    /*判断是否是合同模板页面，是则显示添加合同模板按钮*/
    if ($($thisObj).attr("name") == "allTemplet") {
        $("#addhtTemplet").css("display", "block");
    } else {
        //否则隐藏
        $("#addhtTemplet").css("display", "none");
    }
    /*判断是否是模板页面，是则显示添加模板按钮*/
    if ($($thisObj).attr("name") == "hetongtemplet") {
        $("#addhtTemplet").css("display", "block");
    } else {
        //否则隐藏
        $("#addhtTemplet").css("display", "none");
    }
    /*判断是否是定金模板页面，是则显示添加定金模板按钮*/
    if ($($thisObj).attr("name") == "shoudingtemplet") {
        $("#adddjTemplet").css("display", "block");
    } else {
        //否则隐藏
        $("#adddjTemplet").css("display", "none");
    }
    //添加客源
    /*判断是否是资源管理，预约页面，是则显示添加客源按钮*/
    if ($($thisObj).attr("name") == "zuke") {
        $("#addCurstomer").css("display", "block");
    } else {
        //否则隐藏
        $("#addCurstomer").css("display", "none");
    }
    //资源池 预约 添加预约
    /*判断是否是资源管理，预约页面，是则显示添加预约按钮*/
    if ($($thisObj).attr("name") == "zuke") {
        $("#addYuYue").css("display", "block");
    } else {
        //否则隐藏
        $("#addYuYue").css("display", "none");
    }
    //添加客源
    /*判断是否是业主资源管理，是则显示添加房源按钮*/
    if ($($thisObj).attr("name") == "yezhuweituo") {
        $("#addFangYuan").css("display", "block");
    } else {
        //否则隐藏
        $("#addFangYuan").css("display", "none");
    }
    //添加白名单
    /*判断是否是设置添加安全页面，是则显示添加白名单按钮*/
    /*if($($thisObj).attr("name") == "anquan"){
     $("#addAnQuan").css("display","block");
     }else{
     //否则隐藏
     $("#addAnQuan").css("display","none");
     }*/
    //导入房源
    /*判断是否是房源页面，是则显示导入房源按钮*/
    if ($($thisObj).attr("name") == "house_daoru") {
        $("#houseDaoru").css("display", "block");
    } else {
        //否则隐藏
        $("#houseDaoru").css("display", "none");
    }
    //导入租客合同信息（出房合同）
    if ($($thisObj).attr("name") == "zukeHetong") {
        $("#zukeHeTongDaoru").css("display", "block");
    } else {
        //否则隐藏
        $("#zukeHeTongDaoru").css("display", "none");
    }
    //导入租客信息
    if ($($thisObj).attr("name") == "zukeHetong") {
        $("#zukeInfoDaoru").css("display", "block");
    } else {
        //否则隐藏
        $("#zukeInfoDaoru").css("display", "none");
    }
    //导入业主合同（即收房合同）
    if ($($thisObj).attr("name") == "yezhuHetong") {
        $("#yezhuHeTongDaoru").css("display", "block");
    } else {
        //否则隐藏
        $("#yezhuHeTongDaoru").css("display", "none");
    }
    //收支导入
    if ($($thisObj).attr("name") == "shouzhidaoru") {
        $("#shouzhiDaoru").css("display", "block");
    } else {
        //否则隐藏
        $("#shouzhiDaoru").css("display", "none");
    }
    /*判断是否是企业页面的企业公告页面，是则显示添加公告按钮*/
    if ($($thisObj).attr("name") == "qiye") {
        $("#addGongGao").css("display", "block");
    } else {
        //否则隐藏
        $("#addGongGao").css("display", "none");
    }
    /*判断是否是报表页面，是则显示添加报表按钮*/
    if ($($thisObj).attr("name") == "laoBaoBiao") {
        $("#anniu").css("display", "block");
    } else {
        //否则隐藏
        $("#anniu").css("display", "none");
    }
    /*判断是否是楼盘字典页面，是则显示添加楼盘字典按钮*/
    if ($($thisObj).attr("name") == "loupanzidian") {
        $("#addLouPan").css("display", "block");
    } else {
        //否则隐藏
        $("#addLouPan").css("display", "none");
    }
    /*判断是否是营销优惠页面，是则显示添加营销优惠按钮*/
    if ($($thisObj).attr("name") == "yingxiaoyuohui") {
        $("#addYXHuoDong").css("display", "block");
    } else {
        //否则隐藏
        $("#addYXHuoDong").css("display", "none");
    }
    //供应商管理
    if ($($thisObj).attr("name") == "gongyingshang") {
        $("#gongyingshang").css("display", "block");
    } else {
        //否则隐藏
        $("#gongyingshang").css("display", "none");
    }
    //宽带订单
    /*if($($thisObj).attr("name") == "kuandaidingdan"){
     $("#kuandaidingdan").css("display","block");
     }else{
     //否则隐藏
     $("#kuandaidingdan").css("display","none");
     }*/
    /*判断是否是商品管理页面，是则显示添加商品按钮*/
    if ($($thisObj).attr("name") == "shangpinguanli") {
        $("#addShangPin").css("display", "block");
    } else {
        //否则隐藏
        $("#addShangPin").css("display", "none");
    }
    /*判断是否是活动页面，是则显示添加活动按钮*/
    if ($($thisObj).attr("name") == "youhuihuodong") {
        $("#addHouDong").css("display", "block");
    } else {
        //否则隐藏
        $("#addHouDong").css("display", "none");
    }
    /*判断是否是资产管理页面，是则显示添加资产按钮*/
    if ($($thisObj).attr("name") == "zichanguanli") {
        $("#zichanguanli").css("display", "block");
    } else {
        //否则隐藏
        $("#zichanguanli").css("display", "none");
    }
    /*判断是否是版本更新页面，是则显示添加版本按钮*/
    if ($($thisObj).attr("name") == "banbengengxin") {
        $("#banbenupdata").css("display", "block");
    } else {
        //否则隐藏
        $("#banbenupdata").css("display", "none");
    }
    /*判断是否是banner管理页面，是则显示添加banner按钮*/
    if ($($thisObj).attr("name") == "bannermanager") {
        $("#bannermanger").css("display", "block");
    } else {
        //否则隐藏
        $("#bannermanger").css("display", "none");
    }
    /*判断是否是营销会员页面，是则显示添加营销会员相关按钮*/
    if ($($thisObj).attr("name") == "huiyuanManager") {
        $("#huodongManager").css("display", "block");
    } else {
        //否则隐藏
        $("#huodongManager").css("display", "none");
    }
    /*判断是否是考勤管理页面，是则显示添加考勤按钮*/
    if ($($thisObj).attr("name") == "kaoqinGuanLi") {
        $("#addkaoqin").css("display", "block");
    } else {
        //否则隐藏
        $("#addkaoqin").css("display", "none");
    }
    /*判断是否是日租房态页面，是则显示新增预定按钮*/
    if ($($thisObj).attr("name") == "rizuAddRes") {
        $("#addRiZuRes").css("display", "block");
        $("#doNightAuditor").css("display", "block");
        try {               //客户端才显示门卡管理按钮
            SystemWin.browser(function (data) {
                //成功回调
                var navigatorJson = JSON.parse(data);
                if (navigatorJson.name == "qypms") {
                    $("#managerDoorCard").css("display", "block");
                }
            },function () {

            })
        }catch (e){

        }
    } else {
        //否则隐藏
        $("#addRiZuRes").css("display", "none");
        $("#managerDoorCard").css("display", "none");
        $("#doNightAuditor").css("display", "none");
    }
    /*判断是否是批量设置页面，是则显示添加批量设置按钮*/
    if ($($thisObj).attr("name") == "batchSet") {
        $("#addBatchSet").css("display", "block");
    } else {
        //否则隐藏
        $("#addBatchSet").css("display", "none");
    }
    /*判断是否是支付管理设置页面，是则显示添加支付管理按钮*/
    if ($($thisObj).attr("name") == "paymentManager") {
        $("#addPaymentManager").css("display", "block");
    } else {
        //否则隐藏
        $("#addPaymentManager").css("display", "none");
    }
    /*判断是否是金融申请贷款页面，是则显示申请贷款按钮*/
    if ($($thisObj).attr("name") == "shenQingLoan") {
        $("#shenQingLoan").css("display", "block");
    } else {
        //否则隐藏
        $("#shenQingLoan").css("display", "none");
    }
    /*判断是否是需要提示试用版的特殊页面，是则显示试用版申请遮罩层*/
    if (!isNull(getItems("trialVersionRole"))){     //改试用版角色缓存有值则代表是试用版
        if ($($thisObj).attr("name") == "shuju" || $($thisObj).attr("name") == "tuiguang"|| $($thisObj).attr("name") == "mensuo"|| $($thisObj).attr("name") == "shuibiao"|| $($thisObj).attr("name") == "dianbiao"|| $($thisObj).attr("name") == "zichanguanli") {
            if (getItems("edition") == 2){      //未认证
                showOrHideTryOutMaskLayer("show");
                if (getItems("trialVersionRole") == "normal"){      //普通角色不显示认证按钮
                    $("#doAuthentication").remove();
                }else {
                    $("#doAuthentication").on("click",function () {
                        $("#qiYeChildren").click();
                        $("#qiYe_children").find("li[name=qiYeXinXi]").click();
                    })
                }
            }
        } else {
            //否则隐藏
            showOrHideTryOutMaskLayer("hide");
        }
    }
    /*判断是否是web管理页面，是则显示web管理按钮*/
    if ($($thisObj).attr("name") == "bannermanager") {
        $("#officialWebsite").css("display", "block");
    } else {
        //否则隐藏
        $("#officialWebsite").css("display", "none");
    }
    /*判断是否是智能水电表页面，是则显示批量绑表按钮*/
    if ($($thisObj).attr("name") == "dianbiao") {
        //显示电表按钮
        $("#piLiangBangDianBiao").css("display", "block").html("批量绑电表");
        $("#piLiangBangShuiBiao").hide();

    }else if($($thisObj).attr("name") == "shuibiao"){
        //显示水表按钮
        $("#piLiangBangShuiBiao").css("display", "block").html("批量绑水表");
        $("#piLiangBangDianBiao").hide()
    } else {
        //否则隐藏
        $("#piLiangBangShuiBiao").css("display", "none");
        $("#piLiangBangDianBiao").css("display", "none");
    }
}
function PLdianbiao(){ //批量绑定电表按钮事件
    top.layer.open({
        type: 2,
        title: [
            '批量绑定电表',
            'color: #86b22f; font-size:16px;'
        ],
        area: ['460px', "400px"],
        zIndex:999,
        content:"fangyuan/piliangbangbiao.html?parentBodyId=zhinengdianbiao&type=40&str=clear"
    })
}
function PLshuibiao(){//批量绑定水表按钮事件
    top.layer.open({
        type: 2,
        title: [
            '批量绑定水表',
            'color: #86b22f; font-size:16px;'
        ],
        area: ['460px', "400px"],
        zIndex:999,
        content:"fangyuan/piliangbangbiao.html?parentBodyId=zhinengshuibiao&type=10&str=clear"
    });
}
function PLmensuo(){//批量绑定门锁按钮事件
    layer.open({
        type: 2,
        title: [
            '批量绑锁',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'znjiaju/piliangbangmensuo.html?id=znMenSuo',
        area: ['500px', '440px'],
        zIndex: 99,
        end:function(index){
            layer.close(index);
            var slectList = [];
            localStorage.setItem('jizhongIds',slectList);
            localStorage.setItem('zhengzuIds',slectList);
            localStorage.setItem('hezuIds',slectList);
        }
    });
}
/*左侧导航栏切换功能 end*/
/*
 * 快捷入口
 * 快捷入口(加号)的鼠标移入移出事件，下拉框ul的显示隐藏
 * */
$(".nav-quickEntry").mouseover(function () {
    $(this).find(".convenient").show();
}).mouseout(function () {
    $(this).find(".convenient").hide();
});
// 快捷入口新增房源弹框
function addHouse($this) {
    top.layer.open({
        type: 2,
        title: [
            '新增房源',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'fangyuan/hezuLuRu.html?parentBodyId=index',
        area: ['97%', '96%'],
        //
        maxmin: false,
        zIndex: 99
    });
}
// 快捷入口录入合同弹框
function luRuHeTong() {
    //hetongType   1 为新签    2 为续签  3 为重置
    top.layer.open({
        type: 2,
        title: [
            '录入合同',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'hetong/zuKe_luRuHeTong.html?parentBodyId=index&type=index&hetongType=1',
        area: ['97%', '96%'],
        //
        maxmin: false,
        //zIndex: 999
    });
}
// 快捷入口预定房源弹框
function yuDingHouse() {
    top.layer.open({
        type: 2,
        title: [
            '预定房源',
            'color: #86b22f; font-size:16px;'
        ],
        area: ['815px', '550px'],
        zIndex: 99,
        content: 'fangyuan/yuDing.html?parentBodyId=index'
    });
}
// 快捷入口新增记账弹框
function addJiZhang() {
    top.layer.open({
        type: 2,
        title: [
            '新增记账',
            'color: #86b22f; font-size:16px;'
        ],
        area: ['870px', '500px'],
        zIndex: 99,
        content: 'caiwu/jiZhang.html?parentBodyId=index'
    });
}

/**
 * 添加待办
 */
function addDaiBan() {
    top.layer.open({
        type: 2,
        title: false,
        area: ['98%', '94%'],
        zIndex: 99,
        content: 'gongZuoTai/remindList.html?parentBodyId=index'
    });
}
/**
 * 刷新页面数据
 */
function refreshData() {
    // console.log("成功");
}
/**
 * 显示二级菜单
 */
function showMenu($this) {

    $($this).parents(".navigationList").css("width","380px");

    var $id = $($this).attr("href").substr(1);  //菜单导航  $id=work_children

    var $showMenuList = '';  //显示二级菜单
    var $erjiMenuList = $("#" + $id).find("li");
    for (var i = 0; i < $erjiMenuList.length; i++) {
        if (getItems("gcid") == "0100099" && getItems("chaoJiName") == "zhimin.liao") {
            $showMenuList += '<li onclick="clickTowMenu(this)" navUrl="' + $erjiMenuList.eq(i).attr("navUrl") + '" roleAccess="' + strFormat($erjiMenuList.eq(i).attr("roleAccess"), "") + '">' + $erjiMenuList.eq(i).html() + '</li>';
        } else {
            if ($erjiMenuList.eq(i).attr("name") != "ziYuanGuanLi") {
                if (isNull($erjiMenuList.eq(i).attr("navUrl"))){
                    $showMenuList += '<li onclick="clickTowMenu(this)" navTo="' + $erjiMenuList.eq(i).attr("navTo") + '" roleAccess="' + strFormat($erjiMenuList.eq(i).attr("roleAccess"), "") + '">' + $erjiMenuList.eq(i).html() + '</li>';
                }else {
                    $showMenuList += '<li onclick="clickTowMenu(this)" navUrl="' + $erjiMenuList.eq(i).attr("navUrl") + '" roleAccess="' + strFormat($erjiMenuList.eq(i).attr("roleAccess"), "") + '">' + $erjiMenuList.eq(i).html() + '</li>';
                }
            }
        }
    }
    $($this).parent().find(".menuCon").html($showMenuList);
    $($this).next().css("top", "0px");
    	if ($($this).next().height()>=$(".navigationList").height()){
		$($this).next().css({"height":$(".navigationList").height(),"overflow-y":"scroll"})
	}else{
		$($this).next().css({"height":"auto"})
	}
    var maxHeight = $(".navigationList").height()+70;
	var totalHeight = $($this).next().height() + $($this).next().offset().top;
	var needAddTop = totalHeight - maxHeight;
	if (maxHeight<totalHeight){
		$($this).next().css("top", -needAddTop + "px");
	}
	//帮助菜单需单独设置
	if($($this).parent().attr('id')=='help'){
	    var helpHeight= $($this).next().height();
        $($this).next().css("top", 46-helpHeight + "px");
    }
}
$(".navigationList").on("mouseleave",function () {
    $(this).css("width","180px");
});
$(".menuCon").on("mouseleave",function () {
    $(".navigationList").css("width","180px");
});
/**
 * 选中二级菜单
 */
function clickTowMenu($this) {
    if ($url == serverUrl && $($this).parent().parent().attr("hideAdmission") == "hide") {
        top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦！");
    } else {
        if (isNull($($this).attr("navurl"))){
            $(".layout-top").find('li[navto="' + $($this).attr("navto") + '"]').click();
        }else {
            $(".layout-top").find('li[navUrl="' + $($this).attr("navUrl") + '"]').click();
        }
    }
}

/* <!--  头 部 推 广  --> */

closeTuiGuang();
function closeTuiGuang() {
    setTimeout(function () {
        $(".tuiGuang").hide();
        $(".tuiGuanglogo").mouseout(hideTuiGuang);
    }, 15000);
}
$(".logoBtn").on("click", function (event) {
    var e = event || window.event;
    e.stopPropagation();
    $(".tuiGuanglogo").hide();
});
$(".tuiGuanglogo").on("click", function () {
    //跳企业服务
    // $("a[href = '#qiYe_children']").click();
    // $(".layout-top").find("li[ navUrl= 'qiyeguanli/gongSiXinXi.html' ] ").click();
    //跳推广
//  $("a[href = '#houseType_children']").click();
//  $(".layout-top").find("li[ navUrl= 'release/hezuList.html' ] ").attr("navUrl","release/hezuList.html?pingtai=xianyu").click();
});
function showTuiGuang() {
    $(".tuiGuang").show();
}
function hideTuiGuang() {
    $(".tuiGuang").hide();
}

/**
 * 多城市切换  start
 */
function showMoreCity($obj) {
    $($obj).find("ul").show();
    $($obj).find("span").css("color","#fff");
    $($obj).find("img").attr("src","images/tabCitys.png");
}
function hideMoreCity($obj) {
    $($obj).find("ul").hide();
    $($obj).find("span").css("color","#b3bbbb");
    $($obj).find("img").attr("src","images/tabCity.png");
}

/**
 * 监听日租项目
 */
//layui.form().on("select(itemNum)",function (data) {
//    setItems("riZuItemId",data.elem.value+'&'+getItemsObj(currentJJRUser).id);
//    if ($("#rizu_children").find("li[class='active']").length == 0){     //防止没有第二级菜单第一个按钮的权限情况
//        $("#rizu_children li").eq(0).click();
//    }else {
//        $("#rizu_children").find("li[class='active']").click();
//    }
//});

//日租子页面调取index的渲染
function updataIndexPage() {
    layui.form().render();
    if(getItems("riZuItemId")){
        if(getItems("riZuItemId").split('&')[1] == getItemsObj(currentJJRUser).id){
            for(var i=0;i<$("select[name=itemNum]").find("option").length;i++){
                if($("select[name=itemNum]").find("option").eq(i).attr("value") == getItems("riZuItemId").split('&')[0]){
                    $("select[name=itemNum]").find("option").eq(i).attr("selected",true);
                }
            }
        }
    }else{
        setItems("riZuItemId",$("select[name=itemNum]").find("option").eq(0).val()+'&'+getItemsObj(currentJJRUser).id);
    }
    layui.form().render();
}


//点击一级导航时，清除iframe上的WeChatId属性     此事件如web相关

$('.layout-left').find('.navCon').not('[roleaccess=fq_web]').on('click',function (){
    if($('#main-content').attr('wechatId')&&$('#main-content').attr('wechatId')!=''){
        $('#main-content').attr('wechatId',"");
    }
});
//修改于2018/02/26  初始余额
//document.getElementById('chuShiYuE').addEventListener('mouseover',function () {
//  mouseTips(this);
//});
//document.getElementById('chuShiYuE').addEventListener('mouseout',function () {
//  originalDom.addClass("active").siblings().removeClass("active");
//  originalDomIndex = 0;
//});
/**
 * 显示隐藏试用版提示
 */
function showOrHideTryOutMaskLayer(order) {
    if (order == "show"){
        $("#tryOutMaskLayer").show();
    }else if (order == "hide"){
        $("#tryOutMaskLayer").hide();
    }
}
