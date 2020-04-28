$(function () {
    findDepartmentList();
});
/**
 * 获取页面数据
 */
var buMenViewData = {
    id: "",//
    name: "",//权限名称
    desc: "",//权限描述
    parent: "",//
    typeId: "",//部门类型主键
    ct: "",//创建时间
    phone: "",//部门电话
    address: "",//地址
    showIndex: "",//显示顺序
    //type: "",
    isDelete: "",//0删除1有效
    gcid: gcid,//公司I
    pageNo: 1, // 当前页, 默认为第1页
    pageSize: 10000, // 每页记录数
    totalRecord: -1 // 总记录数, 默认为-1, 表示需要查询
};
/**
 * 初始化页面数据
 */
function buMenInitViewData() {
    buMenViewData.id = $("#id").val();//
    buMenViewData.name = $("#name").val();//权限名称
    buMenViewData.desc = $("#desc").val();//权限描述
    buMenViewData.parent = $("#parent").val();//
    buMenViewData.typeId = $("#typeId").val();//部门类型主键
    buMenViewData.ct = $("#ct").val();//创建时间
    buMenViewData.phone = $("#phone").val();//部门电话
    buMenViewData.address = $("#address").val();//地址
    buMenViewData.showIndex = $("#showIndex").val();//显示顺序
    //buMenViewData.type = $("#type").val();
    buMenViewData.isDelete = 1;//0删除1有效
    buMenViewData.gcid = getItemsObj(currentJJRUser).gcid;//公司ID
}
/*点击空白位置隐藏部门div*/
/*$("body").bind("click",function(evt){
    if($(evt.target).parents(".report-part").length==0)
    {
        $('.report-department').hide();
        $('.house-area').hide();
        $('.house-reside').hide();
        $('.house-floor').hide();
        $('.house-acreage').hide();
    }

});*/
/**
 * 查询集合
 * @param obj 当前点击对象
 */
function findDepartmentList(obj) {
    buMenInitViewData();
    var sendData = buMenViewData;
    //非空判断，在checkField($("#表单对象Id"))中传入表单对象，默认不做非空判断
    sendFindDepartmentList(sendData);
}
//部门数组
var depList = [];
/**
 * 查询集合
 * @param sendData 发送请求参数
 */
function sendFindDepartmentList(sendData) {
    $.send({
        url: "/v2/sys/department/get_list",
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                var userList = "";
                if (data.result.list.length > 0) {
                    $(".report-part").find("#select-department").html("");
                    depLists = data.result.list;
                    for (var i = 0; i < depLists.length; i++) {
                        if (depLists[i].parent == "") {
                            var li = $('<li></li>');
                            li.append('<span class="hebing fengongsijia1 father one" depId="' + depLists[i].id + '" onclick="depInitialss(this)"><i class="fa fa-plus-square-o"></i></span>');
                            li.append('<span class="fengonsiFont" ondblclick="ondblselectDep(\'' + depLists[i].id + '\',\'' + depLists[i].name+ '\',\'' + depLists[i].level + '\')" onclick="selectUser(\'' + depLists[i].id + '\')">' + strTips(depLists[i].name,6) + '</span>');
                            $("#select-department").append(li);
                        }
                    }
                    $(".report-part").find("#select-department").find("li").eq(0).find("span").eq(0).click();
                    $(".report-part").find("#select-department").find("li").eq(0).find("span").eq(1).click();
                }
            } else {
                top.ff.tips("info","沒有数据！");
            }
        }
    });
}
/**
 * 获取当前部分指定部门类型的部门-向上遍历
 */
function findParentDepartmentByScope(depLists,currentParentDepartmentId,scope){
    for (var i = 0; i < depLists.length; i++) {
        if (depLists[i].id == currentParentDepartmentId) {
            if(depLists[i].type <= scope || depLists[i].type == 0 || depLists[i].parent == "" || depLists[i].parent == depLists[i].id){
                //终止循环
                return depLists[i].id;
            }
            var value = findParentDepartmentByScope(depLists,depLists[i].parent,scope);
            return value;
        }
    }
}
/**
 * 获取指定部门所有下级部门-向下遍历
 */
function findChildrenDepartmentByScope(depLists,currentDepartmentId,childrenDeptList){
    for (var i = 0; i < depLists.length; i++) {
        if (depLists[i].parent == currentDepartmentId) {
            childrenDeptList.push(depLists[i]);
            findChildrenDepartmentByScope(depLists,depLists[i].id,childrenDeptList);
        }
    }
    return childrenDeptList;
}

// 选择部门人员   获得焦点显示当前面板，隐藏其他面板
$('#department').click(function () {
    $(".report-part").find('.report-department').slideDown('fast');
    $(".report-part").find('.report-department').css('border-color', '#86b22f');
    $('.house-area').hide();
    $('.house-reside').hide();
    $('.house-floor').hide();
    $('.house-acreage').hide();
});
$('#area').click(function () {
    $('.report-department').hide();
    $('.house-area').slideDown('fast');
    $('.house-area').css('border-color', '#86b22f');
    $('.house-reside').hide();
    $('.house-floor').hide();
    $('.house-acreage').hide();
});
$('#house-type').click(function () {
    $('.report-department').hide();
    $('.house-area').hide();
    $('.house-reside').slideDown('fast');
    $('.house-reside').css('border-color', '#86b22f');
    $('.house-floor').hide();
    $('.house-acreage').hide();
});
$('#floor').click(function () {
    $('.report-department').hide();
    $('.house-area').hide();
    $('.house-reside').hide();
    $('.house-floor').slideDown('fast');
    $('.house-floor').css('border-color', '#86b22f');
    $('.house-acreage').hide();
});
$('#acreage').click(function () {
    $('.report-department').hide();
    $('.house-area').hide();
    $('.house-reside').hide();
    $('.house-floor').hide();
    $('.house-acreage').slideDown('fast');
    $('.house-acreage').css('border-color', '#86b22f');
});
//点击加号减号事件
function depInitialss(obj, e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    if($(obj).find("i").attr("class") == "fa fa-plus-square-o"){
        $(obj).html('<i class="fa fa-minus-square-o"></i>');
        if ($(obj).parent().children(".gongsidizhi").html() == undefined) {
            var ol = $('<ol class="gongsidizhi"></ol>');
            for (var i = 0; i < depLists.length; i++) {
                if (depLists[i].parent == $(obj).attr("depId")) {
                    var li = $('<li></li>');
                    var span = "";
                    for (var j = 0; j < depLists.length; j++) {
                        if (depLists[j].parent == depLists[i].id) {
                            span = $('<span class="hebing fengongsijia1 father"  depId="' + depLists[i].id + '" onclick="depInitialss(this)"><i class="fa fa-plus-square-o"></i></span>');
                            li.append(span);
                            break;
                        }
                    }
                    li.append('<span class="fengonsiFont" ondblclick="ondblselectDep(\'' + depLists[i].id + '\',\'' + depLists[i].name+ '\',\'' + depLists[i].level + '\')" onclick="selectUser(\'' + depLists[i].id + '\')">' + strTips(depLists[i].name,6) + '</span>');
                    ol.append(li);
                    depClickInitializations2(span);
                }
            }
            $(obj).parent().append(ol);
            $(obj).next().next().css('display', 'block');
            //depClickInitializations();
        } else {
            $(obj).next().next().css('display', 'block');
        }
    } else {
        $(obj).html('<i class="fa fa-plus-square-o"></i>');
        $(obj).next().next().css('display', 'none');
    }
}

//点击加号减号事件2为避免双次点击bug
function depClickInitializations2(span) {
    $(span).toggle(
        function () {
            $(this).html('<i class="fa fa-minus-square-o"></i>');
            if ($(this).parent().children(".gongsidizhi").html() == undefined) {
                var ol = $('<ol class="gongsidizhi"></ol>');
                for (var i = 0; i < depLists.length; i++) {
                    if (depLists[i].parent == $(this).attr("depId")) {
                        var li = $('<li ></li>');
                        for (var j = 0; j < depLists.length; j++) {
                            if (depLists[j].parent == depLists[i].id) {
                                var span = $('<span class="hebing fengongsijia1 father"  depId="' + depLists[i].id + '" onclick="depInitialss(this)"><i class="fa fa-plus-square-o"></i></span>');
                                li.append(span);
                                break;
                            }
                        }
                        li.append('<span class="fengonsiFont" ondblclick="ondblselectDep(\'' + depLists[i].id + '\',\'' + depLists[i].name + '\',\'' + depLists[i].level + '\')" onclick="selectUser(\'' + depLists[i].id + '\')">' + strTips(depLists[i].name,6) + '</span>');
                        ol.append(li);
                        depClickInitializations2(span);
                    }
                }
                $(this).parent().append(ol);
                $(this).next().next().css('display', 'block');
            } else {
                $(this).next().next().css('display', 'block');
            }
        }
        , function () {
            $(this).html('<i class="fa fa-plus-square-o"></i>');
            $(this).next().next().css('display', 'none');
        }
    );
}
//双击选中部门
function ondblselectDep(depId, depName,level) {
    $(".report-part").find("#department").val(depName);
    $(".report-part").find("#department").attr("depId", depId);
    $(".report-part").find("#department").attr("userId", "");
    $('.report-department').css('display', 'none');
    try{
        //刷新房态数据（合租，整租，集中）
        refreshData(1);
    }catch(e){}
    try {
        //收支查询
        findFinanceContract();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——租客(合同)
        findChengZuList();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——业主(合同)
        findQianYueList();
    }catch (e){}
    try{
        // 租客合同查询-房态
        findChengZuFangList();
    }catch(e){}
    try{
        // 业主合同查询-房态
        findQianYueFangList();
    }catch(e){}
    try{
        // 财务报表（基础报表列表）
        searchBaoBiao();
    }catch(e){}
    try{
        // 可租房源（合租）
        getListDaiZu();
    }catch(e){}
    try{
        // 企业（公告）
        getGongGaoList();
    }catch(e){}
    /*try{
        // 企业账号列表
        searchQiYeBtn()();
    }catch(e){}*/
    try{
        // 报表（基本信息）
        searchJiBenXinXi();
    }catch(e){}
    try{
        // 报表（押金台账）
        searchYaJinTaiZhang();
    }catch(e){}
    try{
        // 报表（代收代付）
        searchDaiShouDaiFu();
    }catch(e){}
    try{
        // 请假管理
        findQingjiaList();
    }catch(e){}
    try{
    // 刷新房租门锁列表
        getMensuoList()
    }catch(e){}
    try {
        //添加部门时,实现与部门类型联动
        var level=level==""?1:parseInt(level);
        for(var i=1;i<=level;i++){
            if(i<5){
                $("#addSection #type").find('option').eq(i).attr('disabled','disabled');
            }
        }
        if(level>=5){
            $("#addSection #type").find('option').eq(5).attr('selected','selected');
        }else{
            $("#addSection #type").find('option').eq(level+1).attr('selected','selected');
        }
        layui.form().render();
    }catch (e) {}
}
//单击选中员工
function clickSelectUser(id, nickName) {
    $(".report-part").find("#department").val(nickName);
    $(".report-part").find("#department").attr("userId", id);
    $(".report-part").find("#department").attr("depId", "");
    $(".report-part").find('.report-department').css('display', 'none');
    try{
        //刷新房态数据（合租，整租，集中）
        refreshData(1);
    }catch(e){}
    try{
        //合同收支查询、运营收支查询、借还查询
        findFinanceContract();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——租客(合同)
        findChengZuList();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——业主(合同)
        findQianYueList();
    }catch (e){}
    try{
        // 租客合同查询-房态
        findChengZuFangList();
    }catch(e){}
    try{
        // 业主合同查询-房态
        findQianYueFangList();
    }catch(e){}
    try{
        // 财务报表（基础报表列表）
        searchBaoBiao();
    }catch(e){}
    try{
        // 可租房源（合租）
        getListDaiZu();
    }catch(e){}
    try{
        // 企业（公告）
        getGongGaoList();
    }catch(e){}
    try{
        // 报表（基本信息）
        searchJiBenXinXi();
    }catch(e){}
    try{
        // 报表（押金台账）
        searchYaJinTaiZhang();
    }catch(e){}
    try{
        // 报表（代收代付）
        searchDaiShouDaiFu();
    }catch(e){}
    try{
        // 请假管理
        findQingjiaList();
    }catch(e){}
    try{
        // 刷新房租门锁列表
        getMensuoList()
    }catch(e){}
    try{
        // 水表
        getZhinengList();
    }catch(e){}
    try{
        // 电表
        dianbiaoList();
    }catch(e){}
}
//单击部门查找员工
var userSendData = {
    id: "",//
    accountName: "",//登录名
    accountPwd: "",//登录密码
    nickName: "",//昵称
    ct: "",//创建时间
    et: "",//修改时间
    remark: "",//备注
    grade: "",//用户等级
    status: "",//用户状态 0有效1冻结
    ip: "",//用户注册的IP地址
    dptmId: "",//
    phone: "",//联系电话
    email: "",//电子邮箱
    roleId: "",//
    wenhuacd: "",//文化程度: 1：研究生或以上 2：本科 3：大专 4：高中 5：中专 6：初中及以下
    qq: "",//qq号码
    msn: "",//msn
    weixin: "",//微信号码
    inductionTime: "",//入职日期
    mountTime: "",//上岗日期
    becomeStatus: "",//是否转正 1转正0未转正
    becomeTime: "",//转正日期
    handleId: "",//转账处理人id
    handleMan: "",//转正处理人姓名
    gender: "",//用户性别0女 1男
    pic: "",//用户头像
    idNumber: "",//用户身份证号码
    gCId: "",//公司编码
    fAddress: "",//家庭住址
    jieShaoRen: "",//介绍人
    ifSuShe: "",//是否住宿舍
    suSheName: "",//宿舍名
    ifTooRuZhi: "",//是否再次入职
    surcess: "",//渠道来源
    zhaoPinRen: "",//招聘人
    lastDepartment: "",//培训部门
    zhuJiao: "",//助教
    birthday: "",//生日
    bankNumber: "",//持卡人账号
    bankCard: "",//开户行
    openBank: "",//开户行支行
    bankCardName: "",//持卡人姓名
    userLevelId: "",//公司自定义等级
    lat: "",//经度
    lon: "",//纬度
    instancyUserName: "",//紧急联系人姓名
    instancyUserPhone: "",//紧急联系人手机号
    instancyUserRelation: "",//紧急联系人关系
    employeeNum: "",//员工编号
    developId: "",//开发商表id
    rongyunToken: "",//融云toke
    pageNo: 1, // 当前页, 默认为第1页
    pageSize: 1000, // 每页记录数
    totalRecord: -1 // 总记录数, 默认为-1, 表示需要查询
};
/**
 * 查询经纪人信息
 * @param $thisObj
 */
function findUser($thisObj) {
    if (!isNull($($thisObj).val()) && inputLock) {
        $this = $($thisObj).parent().parent().parent().find("[name=searchDepartment]");
        userSendData.nickName = $($thisObj).val();
        userSendData.gCId = getItemsObj(currentJJRUser).gcid;
        userSendData.dptmId = "";
        sendFindJjrUserList(userSendData);
    }
}
function selectUser(depId) {
    userSendData.gCId = getItemsObj(currentJJRUser).gcid;
    userSendData.dptmId = depId;
    userSendData.nickName = "";
    sendFindJjrUserList(userSendData);
}
/**
 * 查询集合
 * @param sendData 发送请求参数
 */
function sendFindJjrUserList(sendData) {
    $.send({
        url: "/v2/sys/table_jjr_user/search_list_by_nick_name",
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                var list = data.result.list;
                var li = "";
                if(list.length > 0){
                    $("#select-user").html("");
                    for (var i = 0; i < list.length; i++) {
                        li += '<li onclick="clickSelectUser(\'' + list[i].id + '\',\'' + list[i].nickName + '\')">' + list[i].nickName + '</li>';
                    }
                }else{
                    li = '<li>没有此人员！</li>';
                }
                $(".report-part").find("#select-user").html(li);
                $(".report-part").find("#select-user").show();
            }
        }

    });
}
//重置
$("#reset").click(function () {
    $(".report-part").find("#department").val("");
    $(".report-part").find("#department").attr("userId", "");
    $(".report-part").find("#department").attr("depId", "");
    $(".report-part").find('.report-department').css('display', 'none');
    $("#user-name").val("");
    $("#select-user").html("");
    try{
        //刷新房态数据（合租，整租，集中）
        refreshData(1);
    }catch(e){}
    try{
        //合同收支查询、运营收支查询、借还查询
        findFinanceContract();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——租客(合同)
        findChengZuList();
    }catch (e){}
    try{
        //部门人员筛选刷新列表——业主(合同)
        findQianYueList();
    }catch (e){}
    try{
        // 租客合同查询-房态
        findChengZuFangList();
    }catch(e){}
    try{
        // 业主合同查询-房态
        findQianYueFangList();
    }catch(e){}
    try{
        // 财务报表（基础报表列表）
        searchBaoBiao();
    }catch(e){}
    try{
        // 可租房源（合租）
        getListDaiZu();
    }catch(e){}
    try{
        // 企业（公告）
        getGongGaoList();
    }catch(e){}
    try{
        // 报表（基本信息）
        searchJiBenXinXi();
    }catch(e){}
    try{
        // 报表（押金台账）
        searchYaJinTaiZhang();
    }catch(e){}
    try{
        // 报表（代收代付）
        searchDaiShouDaiFu();
    }catch(e){}
    try{
        // 智能门锁
        getMensuoList();
    }catch(e){}
    try{
        // 水表
        getZhinengList();
    }catch(e){}
    try{
        // 电表
        dianbiaoList();
    }catch(e){}
});
//搜索用户
// $("#search-user").click(function () {
//     userSendData.nickName = $("#user-name").val();
//     userSendData.gCId = getItemsObj(currentJJRUser).gcid;
//     userSendData.dptmId = "";
//     sendFindJjrUserList(userSendData);
// });
$(function () {
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {

            $("#search-user").click()

        }
    }
});

