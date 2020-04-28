/**
 * 登录API
 */
function loginData(sendData) {
    // getSrcElement();
    $.send({
        url: "/v2/jjr_user_login/pc_login",
        self: getSrcElement(),
        loadingType: '1',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                setItems("gcid",sendData.gcid);  //gcid
                setItems("chaoJiName",sendData.accountName);//管理员账号
                setItems("JJuserOperateTime",new Date().getTime());//当前登录时间
                setItemsObj(currentJJRUser,data.result);
               top.ff.tips("success","登录成功！")
                window.location.href = "index.html";
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}

/**
 * 登录API
 */
function loginData(sendData) {
    window.location.href = "index.html";
    // getSrcElement();
    //$.send({
    //    url: "/v2/jjr_user_login/pc_login_new",
    //    loadingType: '1',
    //    data: sendData,
    //    success: function (data) {
    //        if (data.status.code == 200) {
    //            setItems("gcid",sendData.gcid);  //gcid
    //            setItems("chaoJiName",sendData.accountName);//管理员账号
    //            setItems("JJuserOperateTime",new Date().getTime());//当前登录时间
    //            setItemsObj(currentJJRUser,data.result);
    //           top.ff.tips("success","登录成功！")
    //            window.location.href = "index.html";
    //        } else if (data.status.code == 911){
    //
    //            // if(window.confirm('为保障系统的稳定，先更换登录地址为：'+data.status.msg+'  请记录保存，方便下次快速访问！感谢您的支持与理解')){
    //            //     window.location.href = data.status.msg;
    //            // }else{
    //            //     window.location.href = data.status.msg;
    //            //
    //            // }
    //            var tiShiCon="为保障系统的稳定，现更换登录地址为："+data.status.msg+"  请记录保存，方便下次快速访问！感谢您的支持与理解!";
    //            top.layer.open({
    //                type: 2,
    //                title: false,
    //                content: 'tanCeng/tiShiTo.html?parentBodyId=refundMoney&tiShiCon=' + tiShiCon,
    //                area: ['450px', '210px']
    //            });
    //
    //
    //
    //        }else {
    //            top.ff.tips("error",data.status.msg);
    //        }
    //    }
    //});
}
/**
 * 注册API
 */
function registerData(sendData) {
    // getSrcElement();
    $.send({
        url:"/v2/sys/table_jjr_user/regist_account",
        // self:getSrcElement(),
        loadingType: '1',
        data: sendData,
        success:function(data){
            if(data.status.code == 200){
                $("#fhsj").val(data.result.id);
            }else {
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 判断手机号是否注册过
 */
function panduanPhone(sendData) {
    $.send({
        url:"/v2/sys/table_jjr_user/judge_phone",
        loadingType: '1',
        data: sendData,
        success:function(data){
            if(data.status.code == 300){ // 300 有账号  可修改
                if($(".forgetM-main").css('display') == "block"){
                    $("#fsyzm2").attr("onclick");
                    top.ff.tips("info","获取验证码重置密码");
                }
                if($(".forget-main").css('display') == "block"){
                    $("#fsyzm1").attr("onclick");
                    top.ff.tips("info","获取验证码找回安全码");
                }
                if($(".register-main1").css('display') == "block"){
                    $("#fsyzm").removeAttr("onclick");
                    top.ff.tips("info","手机号已被注册");
                }
            }else if(data.status.code == 200){ // 200没有 前往注册
                if($(".register-main1").css('display') == "block"){
                    top.ff.tips("info","此手机号可注册");
                }
                if($(".forget-main").css('display') == "block"){
                    top.ff.tips("info","此手机号未注册，无法找回安全码");
                }
                if($(".forgetM-main").css('display') == "block"){
                    top.ff.tips("info","此手机号未注册，请前往注册");
                    $("#fsyzm2").removeAttr("onclick");
                }
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 找回安全码
 */
function RetrieveSafetyCode(sendData){
    getSrcElement();
    $.send({
        url:"/v2/sys/table_jjr_user/reget_safe_code",
        self:getSrcElement(),
        loadingType: '1',
        data: sendData,
        success:function(data){
            if(data.status.code == 200){
                $("#SafetyCode").html(data.result.gcid);
            }else {
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 找回密码
 */
function RetrieveMi(sendData){
    $.send({
        url:"/v2/sys/table_jjr_user/reset_password",
        loadingType: '1',
        data: sendData,
        success:function(data){
            if(data.status.code == 200){
                $(".forgetM-main").hide();
                $(".apply-main2").show();
            }else{
               top.ff.tips("error","重置密码失败");
            }
        }
    })
}
/**
 * 试用申请API
 */
function trialData(sendData){
    $.send({
        url:"/v2/sys/resources_adjust/try_apply",
        data: sendData,
        success:function(data){
            if(data.status.code == 200){
                $(".register-main").hide();
                $(".apply-main").show();
                $("#aqcode").html(data.result.gcid);
            }else {
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 获取城市列表
 */
var sendData_form = {
    companyCityName:"",
    companyCityId:""
}

// 获取-渲染城市列表
function getCityList(datas){
    $.send({
        url: "/v2/location/city/get_list",
        data: datas,
        success: function (json) {
            if (json.status.code == 200) {
                var lis = "";
                for (var i=0; i<json.result.list.length; i++) {
                    lis +="<li data-cityCode="+ json.result.list[i]["cityCode"] +" data-id="+ json.result.list[i]["id"] +" data-provinceId="+ json.result.list[i]["provinceId"] +">"+ json.result.list[i]["name"] +"</li>";
                }
                $(".citys>div>ul:eq(0)").html(lis);


                // 输入框输入进行模糊查询
                $(".citys .sendForm").on("keyup", function () {
                    var reg = new RegExp(this.value, "g");
                    lis = "";
                    for(var i=0; i<json.result.list.length; i++){
                        if(reg.exec(json.result.list[i].name) != null){
                            lis +="<li data-cityCode="+ json.result.list[i]["cityCode"] +" data-id="+ json.result.list[i]["id"] +" data-provinceId="+ json.result.list[i]["provinceId"] +">"+ json.result.list[i]["name"] +"</li>";
                        }
                    }
                    if(lis.length>1){
                        $(".citys>div>ul:eq(0)").html(lis);
                    } else {
                        $(".citys>div>ul:eq(0)").html("<li>没有匹配的信息</li>");
                    }
                });
            }
        }
    });
    $.send({
        url: "/v2/location/town/get_list",
        data: datas,
        success: function (json) {
            if (json.status.code == 200) {
                var lis = "";
                for (var i=0; i<json.result.list.length; i++) {
                    lis += "<li data-cityCode="+ json.result.list[i]["cityCode"] +" data-id="+ json.result.list[i]["id"] +" data-cityId="+ json.result.list[i]["cityId"] +">"+ json.result.list[i]["name"] +"</li>";
                }
                $(".citys>div>ul:eq(1)").html(lis);

                // 切换城市 改变当前城市的区域
                $(".citys>div>ul:eq(0)").delegate("li", "click", function (e) {
                    e.stopPropagation();
                    lis = "";
                    $(this).addClass("active").siblings().removeClass("active");
                    for (var i=0; i<json.result.list.length; i++) {
                        if(json.result.list[i].cityId == $(this).attr("data-id")){
                            lis += "<li data-cityCode="+ json.result.list[i]["cityCode"] +" data-id="+ json.result.list[i]["id"] +" data-cityId="+ json.result.list[i]["cityId"] +">"+ json.result.list[i]["name"] +"</li>";
                        }
                    }
                    if(lis.length>1){
                        $(".citys>div>ul:eq(1)").html(lis);
                    } else {
                        $(".citys>div>ul:eq(1)").html("<li class='citys-li-tip'>没有匹配的信息</li>");
                    }
                });

                // 输入框输入进行模糊查询
                $(".citys .sendForm").on("keyup", function () {
                    var reg = new RegExp(this.value, "g");
                    lis = "";
                    for(var i=0; i<json.result.list.length; i++){
                        if(reg.exec(json.result.list[i].name) != null){
                            lis += "<li data-cityCode="+ json.result.list[i]["cityCode"] +" data-id="+ json.result.list[i]["id"] +" data-cityId="+ json.result.list[i]["cityId"] +">"+ json.result.list[i]["name"] +"</li>";
                        }
                    }
                    if(lis.length>1){
                        $(".citys>div>ul:eq(1)").html(lis);
                    } else {
                        $(".citys>div>ul:eq(1)").html("<li class='citys-li-tip'>没有匹配的信息</li>");
                    }
                });

                // 单击选中区域
                $(".citys>div>ul:eq(1)").delegate("li", "click", function (e) {
                    e.stopPropagation();
                    if($(this).hasClass("citys-li-tip")){
                        return false;
                    }
                    // 发送表单内容更变
                    sendData_form["companyCityName"] = $(this).text();
                    sendData_form["companyCityId"] = $(this).attr("data-id");
                    // 输入框内容更变
                    $(".citys input").attr("value", $(this).text());
                    // 样式改变
                    $(this).addClass("active").siblings().removeClass("active");
                    // 城市选择栏隐藏
                    $(".citys>div").hide();
                });
            }
        }
    });
}
// getCityList();
// 城市选择 输入框
$(".citys .sendForm").on("click", function (e) {
    e.stopPropagation();
    $(".citys>div").show();
});
$(document).on("click", function (e) {
    e.stopPropagation();
    $(".citys>div").hide();
});
// 城市选择 重置按钮
$(".citys>div .resite").on("click", function (e) {
    e.stopPropagation();
    // 发送表单内容更变
    sendData_form["companyCityName"] = $(this).text();
    sendData_form["companyCityId"] = $(this).attr("data-id");
    // 清空所有样式
    $(".citys>div>ul:eq(0)>li, .citys>div>ul:eq(1)>li").removeClass("active");
    // 清空选择的内容
    $(".citys .sendForm").attr("value", "");
});
/**
 * 获取验证码
 */
function obtainData(sendData) {
    $.send({
        url:"/v2/sms/worker/get_code",
        data: sendData,
        success:function(data){
            if(data.status.code == 200){
                $("#yzmyz").val(data.result.code);
                $("#fsyzm2").attr("onClick","phoneCode3()");
            }else {
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 获取二维码
 * @param sendData
 */
function getErWeiMaData(sendData) {
    $.send({
        url: "/v2/jjr_user_login/scan_code_login",
        data: sendData,
        success: function (data) {
            var $loginCon = $("#loginCon");
            if(data.status.code == 200){   //请求登录
                //清除定时器
                clearErWeiMa();
                $("#anQuanMa").val(data.result.gcid);           //公司安全码
                $("#userName").val(data.result.accountName);    //用户名
                $("#passWord").val(data.result.accountPwd);     //密码
                //调用登录方法
                $loginCon.find("[name=erweima]").hide();    //隐藏二维码
                $loginCon.find("[name=shaoma]").show();     //显示扫码成功
                setTimeout(function () {
                    login();
                },1000)
            } else if (data.status.code == 198) {    //生成二维码
                if(isNull(sendData.scanCode)){
                    $("#ewmCode").html("");  //清除二维码
                    var qrcode = new QRCode('ewmCode', {
                        text: data.result.scanCode,
                        width: 150,
                        height: 150,
                        colorDark : '#000000',
                        colorLight : '#ffffff',
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    $loginCon.find("[name=erweima]").attr("code",data.result.scanCode.split(":")[1]);
                }
            } else if(data.status.code == 199) {  //等待扫描中及已扫描

            } else if(data.status.code == 197){   //二维码已过期  15S
                //清除定时器
                clearErWeiMa();
                $loginCon.find("[name=showMaGuoQi]").show();        //显示二维码已过期提示
                $loginCon.find("[name=erweima]").attr("code","");    //清空二维码code
            } else if(data.status.code == ''){
                $loginCon.find("[name=erweima]").hide();    //隐藏二维码
                $loginCon.find("[name=shaoma]").show();     //显示扫码成功
                //清除定时器
                window.clearTimeout($time);
                $loginCon.find("[name=erweima]").attr("code","");  //清除code
            } else{
                /*top.ff.tips("error",data.status.msg);*/
            }
        }
    });
}