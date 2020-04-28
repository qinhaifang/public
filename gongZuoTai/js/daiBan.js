/**
 * Created by Long on 2017/6/16.
 */
//初始内容区iform高度
initMapWindows();
function initMapWindows() {
    $("#daiBan").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
    /**
     * 房态图自适应屏幕宽
     */
    //获取展示房态图div最大宽度
    var showFangTai = $('.more').width();
    console.log(showFangTai);
    //一排可以展示多少个房源
    var showHouse = showFangTai/4;
    if(showFangTai<670){
        //一排展示4个
        $('.moreDiv').css('width','calc(51% - 20px');
        // $('.house-box').css('width','calc(25% - 10px)');
    }else if(showFangTai>=670 && showFangTai <750){
        //一排展示5个
        $('.moreDiv').css('width','calc(51% - 18px');
        $('.moreDiv').eq(1).css("margin-right","0");
        $('.moreDiv').eq(2).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","0");
    }else if(showFangTai >=800 && showFangTai <1000){
        //一排展示6个
        $('.moreDiv').css('width','calc(34% - 20px');
        $('.moreDiv').eq(1).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","15px");
        $('.moreDiv').eq(2).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","0");
    }else if(showFangTai >=1000){
        $('.moreDiv').css('width','calc(25.5% - 21px');
        $('.moreDiv').eq(1).css("margin-right","15px");
        $('.moreDiv').eq(2).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","15px");
    }
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#daiBan").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
    /**
     * 房态图自适应屏幕宽
     * 先获取展示房态图div最大宽度，然后判断一排可以展示多少个房源
     */
    var fangTaiDivWidth = $('.more').width();
    console.log(fangTaiDivWidth);
    // var showHouse = fangTaiDivWidth/4;
    if(fangTaiDivWidth<670){
        //一排展示4个
        $('.moreDiv').css('width','calc(51% - 20px');
    }else if(fangTaiDivWidth>=670 && fangTaiDivWidth <750){
        //一排展示5个
        $('.moreDiv').css('width','calc(51% - 18px');
        $('.moreDiv').eq(1).css("margin-right","0");
        $('.moreDiv').eq(2).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","0");
    }else if(fangTaiDivWidth >=800 && fangTaiDivWidth <1000){
        //一排展示6个
        $('.moreDiv').css('width','calc(34% - 20px');
        $('.moreDiv').eq(1).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","15px");
        $('.moreDiv').eq(2).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","0");
    }else if(fangTaiDivWidth >=1000){
        $('.moreDiv').css('width','calc(25.5% - 21px');
        $('.moreDiv').eq(1).css("margin-right","15px");
        $('.moreDiv').eq(2).css("margin-right","15px");
        $('.moreDiv').eq(3).css("margin-right","0");
        $('.moreDiv').eq(4).css("margin-right","15px");
        $('.moreDiv').eq(5).css("margin-right","15px");
    }
});
//先执行
$(function () {
    //获得最新一条公告
    getNewGongGao();
    //获得今日提醒列表
    getTodayReminList();
    //获得统计
    getAllCount();
    //获得今日任务
    getTask();
    //in家需求，无权限时，隐藏对应房源模块
    getCheckRole();
});
//获得统计
function getAllCount() {
    getAllCountOne();
    getAllCountTwo();
    getAllCountThree();
    getAllCountFour();
    getAllCountFive();
    getAllCountSix();
    getAllCountSeven();
    getAllCountEie();
}
//统计财务
var getOne = {
    type: '1',//收支类型-1:收入，2:支出
    indentType: '1',//订单类型-1:计划订单,2:实际订单
    predictTimeStrat: '',//预计开始时间
    predictTimeEnd: ''//预计结束时间
};
function getAllCountOne() {
    var $date = laydate.now();
    getOne.predictTimeStrat = $date;
    getOne.predictTimeEnd = addDay($date, 7);
    var sendData = getOne;
    getAllCountOneData(sendData);
}
//统计合同
function getAllCountTwo() {
    var sendData = '';
    getAllCountTwoData(sendData);
}
//统计维修
function getAllCountThree() {
    var sendData = '';
    getAllCountThreeData(sendData);
}
//统计保洁
function getAllCountFour() {
    var sendData = '';
    getAllCountFourData(sendData);
}
//统计合租
function getAllCountFive() {
    var sendData = '';
    getAllCountFiveData(sendData);
}
//统计整租
function getAllCountSix() {
    var sendData = '';
    getAllCountSixData(sendData);
}
//统计集中
function getAllCountSeven() {
    var sendData = '';
    getAllCountSevenData(sendData);
}
//统计投诉
function getAllCountEie() {
    var sendData = '';
    getAllCountEieData(sendData);
}


//获得最新一条公告
function getNewGongGao() {
    var sendData = {
        pageSize:4,
        pageNo:1
    };
    getNewGongGaoData(sendData);
}
//获得今日提醒列表
var getRemin = {
    likeName: '',//关键字搜索
    remindTimeBegin: laydate.now(),//提醒开始时间
    remindTimeEnd: laydate.now(),//提醒结束时间
    isFinish: '0'//是否完成-0:未完成，1:已完成
};
function getTodayReminList() {
    var sendData = getRemin;
    getTodayReminListData(sendData);
}
//获得今日任务统计
function getTask() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    var tim = year+'-'+month+'-'+day;

    var parObiect = {
        houseType : "",
        selectDay : tim
    };
    var sendData = parObiect;
    getToDayTaskList(sendData);
}


/**
 * 日历插件
 */
$('#ca').calendar({
    width: 300,
    height: 298,
    data: [
        {
            date: '2015/12/24',
            value: 'Christmas Eve'
        },
        {
            date: '2015/12/25',
            value: 'Merry Christmas'
        },
        {
            date: '2016/01/01',
            value: 'Happy New Year'
        }
    ],
    onSelected: function (view, date, data) {
        var dateList = $(this).parent().parent().siblings().children().children();
        dateList.removeClass("active");
        dateList.removeClass("selected");
        $(this).addClass("active").siblings().removeClass("active");


        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var date1 = new Date();
        var day = date.getDate();
        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        var tim = year+'-'+month+'-'+day;

        var parObiect = {
            houseType : "",
            selectDay : tim
        };
        var sendData = parObiect;
        getToDayTaskList(sendData);

        if(date.getFullYear() == date1.getFullYear() && date.getMonth() == date1.getMonth() && date.getDate() == date1.getDate()){
            $('#jr').html("今日经营");
            this.className = "active1";
        }else{
            $('#jr').html(function () {
                return year + '-' + month + '-' + day;
            });
        }

    }
});
/**
 * 点击更多待办div
 */
function daiban(obj) {
    if ($(obj).attr("attrName") == "caiWu") {
        var roleAccess = getPermiss('fq_cw_fwsz');
        if(roleAccess == 1){
            top.layer.open({
                type: 2,
                title: [
                    '待收账单',
                    'color: #86b22f; font-size:16px;'
                ],
                content: 'caiwu/hetongShouZhi.html?gongZuoTai=2&parentBodyId=daiBanCon',
                area: ['99%', '99%'],
                zIndex: 99,
                cancel: function (index, layero) {
                    //刷新待办页面
                    updataPage();
                }
            })
        }else {
            top.ff.tips("error","您没有查看待收账单的权限，不能访问！");
        }
        // var $text = $html.getElementsByTagName("a")[3];
        // $text.click();
        // $($iframe).find("iframe").eq(0).attr("src","caiwu/hetongShouZhi.html?gongZuoTai=2");

    } else if ($(obj).attr("attrName") == "heTong") {
        // var $text = $html.getElementsByTagName("a")[2];
        // $text.click();
        if ($(obj).attr("attrNum") == "2") {
            // $($iframe).find("iframe").eq(0).attr("src","hetong/zukeHeTongList.html?gongZuoTai=2");
            var roleAccess = getPermiss('fq_ht_zk_lbck');
            if(roleAccess == 1){
                top.layer.open({
                    type: 2,
                    title: [
                        '即将搬入',
                        'color: #86b22f; font-size:16px;'
                    ],
                    content: 'hetong/zukeHeTongList.html?gongZuoTai=2&parentBodyId=daiBanCon',
                    area: ['99%', '99%'],
                    zIndex: 99,
                    cancel: function (index, layero) {
                        //刷新待办页面
                        updataPage();
                    }
                })
            }else{
                top.ff.tips("error","您没有查看即将搬入的权限，不能访问！");
            }

        } else if ($(obj).attr("attrNum") == "5") {
            // $($iframe).find("iframe").eq(0).attr("src","hetong/zukeHeTongList.html?gongZuoTai=5");
            var roleAccess = getPermiss('fq_ht_zk_lbck');
            if(roleAccess == 1){
                top.layer.open({
                    type: 2,
                    title: [
                        '即将搬出',
                        'color: #86b22f; font-size:16px;'
                    ],
                    content: 'hetong/zukeHeTongList.html?gongZuoTai=5&parentBodyId=daiBanCon',
                    area: ['99%', '99%'],
                    zIndex: 99,
                    cancel: function (index, layero) {
                        //刷新待办页面
                        updataPage();
                    }
                })
            }else {
                top.ff.tips("error","您没有查看即将搬出的权限，不能访问！");
            }

        }
    } else if ($(obj).attr("attrName") == "baoJie") {
        var roleAccess = getPermiss('fq_zh_bj'); // 保洁服务权限
        if(roleAccess == 1){
            top.layer.open({
                type: 2,
                title: [
                    '保洁服务',
                    'color: #86b22f; font-size:16px;'
                ],
                content: 'zuHouFuWu/baoJieFuWu.html?gongZuoTai=1&parentBodyId=daiBanCon',
                area: ['99%', '99%'],
                zIndex: 99,
                cancel: function (index, layero) {
                    //刷新待办页面
                    updataPage();
                }
            })
        }else {
            top.ff.tips("error","您没有查看保洁服务的权限，不能访问！");
        }

    } else if ($(obj).attr("attrName") == "weiXiu") {
        var roleAccess = getPermiss('fq_zh_wx'); //维修服务权限
        if(roleAccess == 1){
            top.layer.open({
                type: 2,
                title: [
                    '维修服务',
                    'color: #86b22f; font-size:16px;'
                ],
                content: 'zuHouFuWu/weiXiuFuWu.html?gongZuoTai=1&parentBodyId=daiBanCon',
                area: ['99%', '99%'],
                zIndex: 99,
                cancel: function (index, layero) {
                    //刷新待办页面
                    updataPage();
                }
            })
        }else{
            top.ff.tips("error","您没有查看维修服务的权限，不能访问！");
        }

    } else if ($(obj).attr("attrName") == "tousu") {
        var roleAccess = getPermiss('fq_zh_ts');  //投诉服务
        if(roleAccess == 1){
            top.layer.open({
                type: 2,
                title: [
                    '投诉服务',
                    'color: #86b22f; font-size:16px;'
                ],
                content: 'zuHouFuWu/touSuFuWu.html?gongZuoTai=1&parentBodyId=daiBanCon',
                area: ['99%', '99%'],
                zIndex: 99,
                cancel: function (index, layero) {
                    //刷新待办页面
                    updataPage();
                }
            })
        }else {
            top.ff.tips("error","您没有查看投诉服务的权限，不能访问！");
        }

    }
}

/**
 * 判断合租房源的权限
 */
function checkHeZuRole() {
    var $roleAccessType = false;
    //获取合租房源的权限标识
    var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
    if(systemResourcesList.length > 0){
        for(var i=0; i<systemResourcesList.length; i++){
            if(systemResourcesList[i].mark == 'fq_ft_hz'){
                $roleAccessType = true;
            }
        }
    }
    return $roleAccessType;
}

/**
 * 判断整租房源权限
 * @returns {boolean}
 */
function checkZhengZuRole() {
    var $roleAccessType = false;   //整租权限判断标识  0 无权限   1 有权限
    //获取整租房源的权限标识
    var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
    if(systemResourcesList.length > 0){
        for(var i=0; i<systemResourcesList.length; i++){
            if(systemResourcesList[i].mark == 'fq_ft_zz'){
                $roleAccessType = true;
            }
        }
    }
    return $roleAccessType;
}

/**
 * 判断集中房源权限
 * @returns {boolean}
 */
function checkJiZhongRole() {
    var $roleAccessType = false;   //整租权限判断标识  0 无权限   1 有权限
    //获取整租房源的权限标识
    var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
    if(systemResourcesList.length > 0){
        for(var i=0; i<systemResourcesList.length; i++){
            if(systemResourcesList[i].mark == 'fq_ft_jz'){
                $roleAccessType = true;
            }
        }
    }
    return $roleAccessType;
}

/*-------- in家需求（2018-04-01）（当用户关闭整租，合租，集中的模块时，房态模块不变，在工作台对应的模块消失） --------*/
function getCheckRole() {
    var $daiBan = $("#daiBan");
    //判断合租房源权限
    if(!checkHeZuRole()){
        //没有权限隐藏合租房源模块
        $daiBan.find("[name=heZuHouse]").hide();
    }
    //判断整租房源权限
    if(!checkZhengZuRole()){
        //没有权限隐藏整房源模块
        $daiBan.find("[name=zhengZuHouse]").hide();
    }
    //判断集中房源权限
    if(!checkJiZhongRole()){
        //没有权限隐藏集中房源模块
        $daiBan.find("[name=jiZhongHouse]").hide();
    }
}
/*-------- in家需求（2018-04-01）（当用户关闭整租，合租，集中的模块时，房态模块不变，在工作台对应的模块消失）end --------*/
/**
 * 合租房源列表
 * @param obj
 */
function heDai(obj) {
    <!--状态: 10：待配置，11：配置中，20：可租， 21：空置，22：转租，23：预到期，24：申退，  30：预定，40：已租，50：不可租，51：非正常退，60：脏房-->
    var status = "";
    switch (obj){
        case "1" :
            status = "20";
            break;
        case "2" :
            status = "21";
            break;
        case "3" :
            status = "22";
            break;
        case "4" :
            status = "24";
            break;
        case "5" :
            status = "23";
            break;
    }
    //判断有没有合租房源权限
    if(checkHeZuRole()) {
        top.layer.open({
            type: 2,
            title: [
                '合租房源',
                'color: #86b22f; font-size:16px;'
            ],
            content: 'fangyuan/fangTai_hezu.html?houseStatus=' + status + '&parentBodyId=daiBanCon',
            area: ['99%', '99%'],
            zIndex: 99,
            cancel: function (index, layero) {
                //刷新待办页面
                updataPage();
            }
        });
    }else{
        top.ff.tips("error","您没有查看集中合租的权限，不能访问！");
    }
}

/**
 * 整租房源列表
 * @param obj
 */
function zhengDai(obj) {
    <!--状态: 10：待配置，11：配置中，20：可租， 21：空置，22：转租，23：预到期，24：申退，  30：预定，40：已租，50：不可租，51：非正常退，60：脏房-->
    var status = "";
    switch (obj){
        case "1" :
            status = "20";
            break;
        case "2" :
            status = "21";
            break;
        case "3" :
            status = "22";
            break;
        case "4" :
            status = "24";
            break;
        case "5" :
            status = "23";
            break;
    }
    //判断有没有整租房源权限
    if(checkZhengZuRole()) {
        top.layer.open({
            type: 2,
            title: [
                '整租房源',
                'color: #86b22f; font-size:16px;'
            ],
            content: 'fangyuan/fangTai_zhengzu.html?houseStatus=' + status + '&parentBodyId=daiBanCon',
            area: ['99%', '99%'],
            zIndex: 99,
            cancel: function (index, layero) {
                //刷新待办页面
                updataPage();
            }
        });
    }else{
        top.ff.tips("error","您没有查看整租房源的权限，不能访问！");
    }
}

/**
 * 集中房源列表
 * @param obj
 */
function jiDai(obj) {
    var status = "";
    switch (obj){
        case "1" :
            status = "20";
            break;
        case "2" :
            status = "21";
            break;
        case "3" :
            status = "22";
            break;
        case "4" :
            status = "24";
            break;
        case "5" :
            status = "23";
            break;
    }
    //判断有没有集中房源权限
    if(checkJiZhongRole()){
        top.layer.open({
            type: 2,
            title: [
                '集中房源',
                'color: #86b22f; font-size:16px;'
            ],
            content: 'fangyuan/fangTai_jizhong.html?houseStatus=' + status + '&parentBodyId=daiBanCon',
            area: ['99%', '99%'],
            zIndex: 99,
            cancel: function (index, layero) {
                //刷新待办页面
                updataPage();
            }
        });
    }else{
        top.ff.tips("error","您没有查看集中房源的权限，不能访问！");
    }
}
$(".zheng-mainCon").mouseover(function () {
    $(this).find(".shuziTitle").css("color", "#404040");
}).mouseout(function () {
    $(this).find(".shuziTitle").css("color", "#999");
});
/**
 * 添加日程
 */
function addRiCheng() {
    top.layer.open({
        type: 2,
        title: [
            '添加日程',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'gongZuoTai/addRiCheng.html?parentBodyId=daiBanCon',
        area: ['390px', '350px'],
        zIndex: 99
    });
}
/**
 * 查看公告详情
 */
function lookGongGaoDetail(objId) {
    top.layer.open({
        type: 2,
        title: [
            '公告详情',
            'color: #86b22f; font-size:16px;background-color:#fff;height:50px;line-height:50px'
        ],
        content: 'gongZuoTai/lookGongGao.html?gongGaoId=' + objId,
        area: ['940px', '540px'],
        zIndex: 99
    });
}
/**
 * 查看提醒列表
 */
function lookTiXingList(objCon, objNum, $objId) {
    top.layer.open({
        type: 2,
        /*title: [
            '提醒列表  ',
            'color: #86b22f; font-size:16px;'
        ],*/
        title: false,
        content: 'gongZuoTai/remindList.html?parentBodyId=daiBanCon&reminContent=' + objCon + '&add=' + objNum + '&remindId=' + $objId,
        area: ['98%', '94%'],
        zIndex: 99,
        // scrollbar: false,
        cancel: function (index, layero) {
            //刷新待办页面
            updataPage();
        }
    });
}
/**
 * 公司公告  的更多按钮，跳转到 企业管理 的 企业公告
 */
function toQiYe() {
    /*var $html = top.parent.document.body.getElementsByClassName("navigationList")[0];
     var $text = $html.getElementsByTagName("a");
     console.log($text);
     for(var i=0;i<$text.length;i++){
     if($text[i].id == "qiYeChildren"){
     $text[i].click();
     }
     }*/
    top.layer.open({
        type: 2,
        title: [
            '企业公告',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'qiyeguanli/qiYeGongGao.html?parentBodyId=daiBanCon',
        area: ['99%', '99%'],
        zIndex: 99,
        cancel: function (index, layero) {
            //刷新待办页面
            updataPage();
        }
    })
}


//刷新页面
function updataPage() {
    //获得最新一条公告
    getNewGongGao();
    //获得今日提醒列表
    getTodayReminList();
    //获得统计
    getAllCount();
}

/**
 *
 * @param obj 权限选项
 */
function  getPermiss(obj) {
    var $roleAccessType = 0;   //合租权限判断标识  0 无权限   1 有权限
    //获取合租房源的权限标识
    var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
    if(systemResourcesList.length > 0){
        for(var i=0; i<systemResourcesList.length; i++){
            if(systemResourcesList[i].mark == obj){
                $roleAccessType = 1;
            }
        }
    }
    return $roleAccessType;
}

