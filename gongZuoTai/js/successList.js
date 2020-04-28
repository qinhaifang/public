//初始内容区iform高度
initMapWindows();
function initMapWindows() {
    $(".newList").css({"height":($(window).height()-155) + "px"});
    $(".con").css({"height":($(window).height()-140) + "px"});
    $("#content").css({"height":($(window).height() - 205) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $(".newList").css({"height":($(window).height()-155) + "px"});
    $(".con").css({"height":($(window).height()-140) + "px"});
    $("#content").css({"height":($(window).height() - 205) + "px"});
});
function currentDate() {
    var $date = new Date(),
        $dates = $date.toLocaleTimeString();

    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes();

    return currentdate;
}
$(function () {
    if(getQueryString("add") == '1'){
        $("#content").focus();
        $("#remindDate").val(currentDate());
    }
    //刷新页面
    getTodayReminList();
});
//为了子页面刷新该页面
function getTodayReminList(){
    //获取未完成的提醒列表
    searchNoReminList();
}
//获取提醒列表
var searchData = {
    remindTimeBegin: '',//提醒开始时间
    remindTimeEnd: '',//提醒结束时间
    likeName: '',//关键字搜索
    isDelete: '1',//
    pageNo: '1',//
    pageSize: '10',//
    ctId: getItemsObj(currentJJRUser).id// false string
};
$("#likeName").keydown(function (event) {
    var key = event.keyCode;
    if (key == 13){ /*回车搜索*/
        getTodayReminList();
    }
});
//搜索
function searchNoReminList(){
    var $timeType = $("select[name=searchDate] option:selected").attr("value");  //筛选时间类型
    if($timeType == '0'){
        searchData.remindTimeBegin = '';
        searchData.remindTimeEnd = '';
    }else if($timeType == '1'){
        //获取当前时间
        var $time = laydate.now();
        searchData.remindTimeBegin = $time;
        searchData.remindTimeEnd = $time;
    }else if($timeType == '2'){
        //获取本周时间
        var $startTime = getWeekStartDate();//本周开始时间
        var $endTime = getWeekEndDate();//本周结束时间
        searchData.remindTimeBegin = $startTime;
        searchData.remindTimeEnd = $endTime;
    }else if($timeType == '3'){
        //获取本月时间
        var $startTime = getMonthStartDate();//本月开始时间
        var $endTime = getMonthEndDate();//本月结束时间
        searchData.remindTimeBegin = $startTime;
        searchData.remindTimeEnd = $endTime;
    }
    searchData.pageNo = "1";
    searchData.likeName = $("#likeName").val();
    var sendData = searchData;
    searchNoReminListData(sendData);
}
//添加日程
function addRiChengs(){
    $("input[name=save]").attr("conId",'');
    $("img[name=delImg]").attr("conId",'');
    $("#content").attr("conId",'').val('').focus();
    $("#remindDate").val(currentDate());
}
//删除
var delData = {
    id : ''//
};
/**
 * 删除提醒
 * @param objId
 */
function delLists(objId) {
    delData.id = objId;
    var $deleteCon = '您确定删除该条提醒记录吗？';
    //页面层
    top.layer.open({
        type: 2,
        title: [
            '删除',
            'color: #86b22f; font-size:16px;'
        ],
        area: ['450px', '195px'], //宽高
        content: 'tanCeng/isDelete.html?parentBodyId=successList&isYingCang=yingCang&deleteCon='+$deleteCon,
        zIndex:999,
        success: function (layero, index) {
            layer.iframeAuto(index)
        }
    });
}
/**
 * 确定删除
 * @param $objBody
 */
function deleteContract($objBody) {
    var sendData = delData;
    delRemindData(sendData);
}
/**
 * 点击文本内容，
 * 内容出现在右侧文本框里
 */
function clickText(obj,objTime,$shareTime,$shareMan,$crowdedId) {
    $("#content").attr("conId",$(obj).find(".text").attr("conId")).attr("conNum",$(obj).find(".text").attr("conNum")).val($(obj).find(".text").attr("conCont")).focus();
    $("#conEt").text($(obj).find(".text").attr("conEt"));
    $("#remindDate").val(objTime);
    $("#botheight").hide();
    $("#shareTime").text('');
    $("#shareMan").text('');
    $("#crowdedName").html('');
    $("#content").css({"height":($(window).height() - 245) + "px"});
    if($crowdedId == '1'){
        $("#botheight").show();
        $("#shareTime").text($shareTime);
        $("#shareMan").text($shareMan);
        var $names = $(obj).find("span[name=crowdedName]").text();
        $names = $names.split(" ");
        $names = $names.splice(0,$names.length - 1);
        $names = $names.join('，');

        var s = "完成";
        var reg = new RegExp("(" + s + ")", "g");
        $names = $names.replace(reg, "<span>"+s+"</span>");
        console.log($names);

        $("#crowdedName").html($names);
        $("#content").css({"height":($("#content").height() - $("#botheight").height()) + "px"});
    }
    layui.form().render();
}
/**
 * 文本输入框失去焦点时，保存内容
 */
var addData = {
    ctId: getItemsObj(currentJJRUser).id,
    title: '',//提醒标题
    content: '',//提醒内容
    remindTime: ''//提醒时间
};
$("#remindDate").val(laydate.now());
function saveList(){
    if($("#content").val() != ''){
        if($("#remindDate").attr("attrIsn") == "1"){
            // event.stopPropagation();
            // return;
        } else {
            if ($("#content").attr("conId") == '') {
                addData.content = $("#content").val();
                addData.remindTime = $("#remindDate").val();
                var sendData = addData;
                addNoData(sendData);
            } else {
                change.id = $("#content").attr("conId");
                change.content = $("#content").val();
                change.remindTime = $("#remindDate").val();
                change.isFinish = $("#remindDate").attr("conNum");
                var sendData = change;
                saveYesData(sendData);
            }
        }
    }
}
$("#remindDate").click(function () {
    $(this).attr("attrIsn","1");
}).blur(function () {
    $(this).attr("attrIsn","0");
});
var $date = '';
function saveRemindData() {
    if($("#content").attr("conId") == ''){
        $("#content").focus();
    }else{
        change.id = $("#content").attr("conId");
        change.content = $("#content").val();
        change.remindTime = $date;
        change.isFinish = $("#content").attr("conNum");
        var sendData = change;
        saveYesData(sendData);
    }
}
/**
 * 监听未完成的复选框点击勾选事件，
 * 勾选后自动请求完成保存接口，
 * 刷新页面，
 * 这条信息从未完成的列表里出现在完成的列表里，
 */
var change = {
    id: '',//
    title: '',//提醒标题
    content: '',//提醒内容
    remindTime: '',//提醒时间
    isDelete: '1',//有效
    isFinish: ''//是否完成-0:未完成，1:已完成
};
//未完成变成已完成
layui.form().on("checkbox(newText)",function (data) {
    change.id = $(data.elem).attr("attrId");
    change.content = $(data.elem).attr("attrCon");
    if($(data.elem).attr("attrIsFinish") == '0'){
        change.isFinish = '1';
    }else{
        change.isFinish = '0';
    }
    var sendData = change;
    saveYesData(sendData);
});
layui.form().on("select(searchDate)",function (data) {
    var $timeType = $(data.elem).attr("value");  //筛选时间类型
    if($timeType == '0'){
        searchData.remindTimeBegin = '';
        searchData.remindTimeEnd = '';
    }else if($timeType == '1'){
        //获取当前时间
        var $time = laydate.now();
        searchData.remindTimeBegin = $time;
        searchData.remindTimeEnd = $time;
    }else if($timeType == '2'){
        //获取本周时间
        var $startTime = getWeekStartDate();//本周开始时间
        var $endTime = getWeekEndDate();//本周结束时间
        searchData.remindTimeBegin = $startTime;
        searchData.remindTimeEnd = $endTime;
    }else if($timeType == '3'){
        //获取本月时间
        var $startTime = getMonthStartDate();//本月开始时间
        var $endTime = getMonthEndDate();//本月结束时间
        searchData.remindTimeBegin = $startTime;
        searchData.remindTimeEnd = $endTime;
    }
    getTodayReminList();
});
layui.form().on("select(searchDates)",function (data) {
    var $timeType = $(data.elem).attr("value");
    if($timeType == '0'){
        searchData.isFinish = '';
    }else if($timeType == '1'){
        searchData.isFinish = "0";
    }else if($timeType == '2'){
        searchData.isFinish = "1";
    }
    getTodayReminList();
});
//按Ctrl+S键保存信息
$(window).keydown(function (event) {
    if(event.which == 83 && event.ctrlKey) {
        event.preventDefault();
        console.log("111");
        saveList();
    }
});
function saveRemindDatas(){
    saveList();
}
// 显示字数
function LimitTextArea(field){
    $('#textNum').text($('#content').val().length);//这句是在键盘按下时，实时的显示字数
    maxlimit=500;
    if (field.value.length > maxlimit){
        field.value = field.value.substring(0, maxlimit);
        $('#textNum').text($('#content').val().length);
    }
}
//标题鼠标移上去显示提示框
$("#tipsImg").mouseover(function () {
    $("#showTips").show();
}).mouseout(function () {
    $("#showTips").hide();
});

//置顶
function topPage($this,$objId,$objNum) {
    var objNum = '';
    if($objNum == '1'){
        objNum = '1';
    }else if($objNum == '2'){
        objNum = '0';
    }
    var sendData = {
        id: $objId,// true string 待办id
        toTop: objNum,// true string 是否置顶：0不置顶，1置顶>>数据库默认是0
        gcid: getItemsObj(currentJJRUser).gcid// true string 公司id
    };
    topPageData(sendData);
}

//分享
function fenXiang($num,$objId) {
    if($num == '0'){
        top.layer.open({
            type: 2,
            title: [
                '共享给',
                'color: #86b22f; font-size:16px;'
            ],
            content: 'gongZuoTai/toOther.html?parentBodyId=successList&remindId='+$objId,
            area: ['500px', '90%'],
            zIndex: 99
        });
    }else{
        top.ff.tips("error","被共享的待办，不能再共享他人");
    }
}

