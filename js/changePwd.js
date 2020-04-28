/**
 * Created by Long on 2017/5/23.
 */
//取消按钮
function onCancel(){
    //当你在iframe页面关闭自身时
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}
//保存按钮
var viewData = {
    id: '',//经纪人ID
    oldPassword: '',//旧密码
    accountPwd: ''//新密码
};
function saveCancel(){
    if(checkField($("#changeMain"))){
        if($("#isFilter").val() == $("#oldPassword").val()){
            top.ff.tips("info","新密码不能与旧密码相同！");
        }else{
            viewData.id = getItemsObj(currentJJRUser).id;
            viewData.oldPassword = $("#oldPassword").val();
            viewData.accountPwd = $("#accountPwd").val();
            var sendData = viewData;
            saveCancelData(sendData);
        }
    }
}
//确定按钮，重新登录
function saveChange() {
    delItems(currentJJRUser);  //清空登录人信息
    delItems("chaoJiName");  //清空成交人姓名
    delItems("gcid");  //清空gcid
    top.window.location.href = "login.html";
}
//监听新密码是否与旧密码一致
$("#isFilter").keyup(function () {
    if($(this).val() == $("#oldPassword").val()){
        top.ff.tips("info","新密码不能与旧密码相同！");
    }
});







