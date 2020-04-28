/**
 * Created by Long on 2017/9/21.
 */
//初始内容区iform高度
initMapWindows();
function initMapWindows() {
    $("#list").css({"height":($(window).height()-200) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#list").css({"height":($(window).height()-200) + "px"});
});
$(function () {
    getDaiBanInfo(getQueryString("remindId"));
    getAllBuMen();
});
//获得待办列表
function getDaiBanInfo($objId) {
    var sendData = {
        id: $objId
    };
    getDaiBanInfoData(sendData);
}
//获取部门列表
function getAllBuMen() {
    var sendData = '';
    getAllBuMenData(sendData);
    getAllJjrData(sendData);
}
var searchData = {
    dptmId: '',
    jjrUserLikeName: ''
};
function interViewData() {
    searchData.dptmId = $("select[name=bumen] option:selected").attr("value");
    searchData.jjrUserLikeName = $("#likeName").val();
}
function getJjrList() {
    interViewData();
    var sendData = searchData;
    getAllJjrData(sendData);
}
$("#likeName").keydown(function (event) {
    var key = event.keyCode;
    if (key == 13){ /*回车搜索*/
        getJjrList();
    }
});
//监听部门
layui.form().on("select(buMen)",function (data) {
    getJjrList();
});

//监听勾选
var idArr = new Array();
var nameArr = new Array();
layui.form().on("checkbox(gouXuan)",function (data) {
    if (data.elem.checked == true) {
        $(data.elem).attr("checked", true);
        if(idArr.indexOf($(data.elem).attr("attrId")) == '-1'){
            idArr.push($(data.elem).attr("attrId"));
            nameArr.push($(data.elem).attr("attrName"));
        }
    } else {
        $(data.elem).attr("checked", false);
        idArr.splice(idArr.indexOf($(data.elem).attr("attrId")),1);
        nameArr.splice(nameArr.indexOf($(data.elem).attr("attrName")),1);
    }
    $("#names").text(nameArr);
    if(nameArr.length == '0'){
        $("#names").text('请选择人员！');
    }
});
//确定按钮
var fenData = {
    id: '',// true string 要分享待办时间的Id
    content: '',// true string 内容
    remindTime: '',// true string 提醒时间
    title: '',// true string 标题
    isFinish: '',// true string 是否完成-0:未完成，1:已完成;
    gcid: '',// true string 公司Id
    crowdedId: '',// true array[string] 列表：被分享所有的人的Id
    crowdedName: '',// true array[object] 列表：被分享所有的人（姓名）
    toTop: '',// true string 是否置顶：0不置顶，1置顶>>数据库默认是0
    ctId: '',// true string 分享人Id
    shareMan: ''// true string 分享人name
};
function interSearchData() {
    fenData.id = getQueryString("remindId");
    fenData.crowdedId = idArr;
    fenData.crowdedName = nameArr;
    fenData.ctId = getItemsObj(currentJJRUser).id;
    fenData.shareMan = getItemsObj(currentJJRUser).nickName;
}
function queDingSelect() {
    interSearchData();
    var sendData = fenData;
    queDingSelectData(sendData);
}
//清空图标
$("#likeName").focus(function () {
    if($(this).val().length > 0){
        $(".nothing").show();
    }else{
        $(".nothing").hide();
    }
});
$("#likeName").hover(function () {
    if($(this).val().length > 0){
        $(".nothing").show();
    }else{
        $(".nothing").hide();
    }
});
function noThing() {
    $("#likeName").val('');
    $(".nothing").hide();
    getJjrList();
}