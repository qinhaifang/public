/**
 * Created by haifang.qin on 2019/9/5.
 */
var loginPhone = "";
layui.use(['form'], function() {
    var form = layui.form
})
//正常登录
function loginPwd() {
    var phonestr = $("#userPhone").val(),
        pawstr = $("#userPwd").val();
    var obj = {
        phone:phonestr,
        password:pawstr
    };
    if(isNull(phonestr) && isNull(pawstr)){
        layer.msg("电话号码和密码不能为空");
    }else{
        if(!checkphoneFormat(phonestr)){
            layer.msg("请输入正确的手机号");
        }else if(!checkPassword(pawstr)){
            layer.msg("密码必须6到12位，且不能出现空格");
        }
        else{
            loginData(obj)
        }
    }
}
//注册
var isPwd=1;
function changeLogin(){
    if(isPwd == 1){
        $('.userName').css('display','block');
        $('.zuzhi').css('display','block');
        $('.register-btn').css("display","block");
        $('.sureLogin').css("display","none");
        $("#loginDesc").html("已有账号，密码登录>>").attr("loginType","2");
        isPwd=0;
    }else{
        $('.userName').css('display','none');
        $('.zuzhi').css('display','none');
        $('.register-btn').css("display","none");
        $('.sureLogin').css("display","block");
        $("#loginDesc").html("还没有账号，注册登录>>").attr("loginType","1");
        isPwd=1;
    }

}
function registerPwd(){
    var phonestr = $("#userPhone").val(),
        pawstr = $("#userPwd").val(),
        userName = $('#userName').val(),
        zuzhi = $('select[lay-filter=zuzhi]').val();
    var obj = {
        phone:phonestr,
        userName:userName,
        password:pawstr,
        organizationid:zuzhi
    };
    if(isNull(phonestr) && isNull(pawstr) && isNull(userName) && isNull(zuzhi)){
        layer.msg("必填项不能为空");
    }else{
        if(!checkUserName(userName)){
            layer.msg("用户名格式不正确");
        }else if(!checkphoneFormat(phonestr)){
            layer.msg("请输入正确的手机号");
        }else if(!checkPassword(pawstr)){
            layer.msg("密码必须6到12位，且不能出现空格");
        }
        else{
            registerData(obj)
        }
    }
}
////忘记密码
//function forget(){
//    $('.userName').css('display','block');
//    $('.zuzhi').css('display','block');
//    $('.register-btn').css("display","block");
//    $('.sureLogin').css("display","none");
//}