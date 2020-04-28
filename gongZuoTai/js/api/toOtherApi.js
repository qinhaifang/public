/**
 * Created by Long on 2017/9/21.
 */
/**
 * 获得待办详情
 */
function getDaiBanInfoData(sendData) {
    $.send({
        url: '/v2/employee/time_manager/get',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $value = data.result;
                fenData.content = $value.content;
                fenData.remindTime = $value.remindTime;
                fenData.title = $value.title;
                fenData.isFinish = $value.isFinish;
                fenData.toTop = $value.toTop;
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 获取部门list
 */
function getAllBuMenData(sendData) {
    $.send({
        url: '/v2/sys/department/get_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $list = '<option value="">部门</option><option value="">全部</option>';
                $.each(data.result.list,function (n,$value) {
                    $list += '<option value="'+$value.id+'">'+$value.name+'</option>';
                });
                $("select[name=bumen]").html('');
                $("select[name=bumen]").html($list);
                layui.form().render();
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 获取所有人员
 */
function getAllJjrData(sendData) {
    $.send({
        url: '/v2/sys/table_jjr_user/get_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $list = '';
                if(data.result.list.length > 0){
                    $.each(data.result.list,function (n,$value) {
                        if($value.id != getItemsObj(currentJJRUser).id){
                            $list += '<p class="list-p">';
                            if($value.gender == "0"){
                                $list += '<img class="p-img" src="images/nv.png" alt="">';
                            }else{
                                $list += '<img class="p-img" src="images/nan.png" alt="">';
                            }
                            $list += '<span class="p-name">'+$value.nickName+'</span>';
                            $list += '<input type="checkbox" attrName="'+$value.nickName+'" attrId="'+$value.id+'" lay-skin="primary" lay-filter="gouXuan">';
                            $list += '<span class="p-det">'+$value.dptm.name+'</span>';
                            $list += '</p>';
                        }
                    });
                }else{
                    $list += '<p class="list-p">暂无匹配人员信息！</p>';
                }
                $("#list").html('');
                $("#list").html($list);
                layui.form().render();
                if(idArr.length > 0 && $("#list").find(".list-p").length > 0){
                    for(var i=0;i<idArr.length;i++){
                        for(var j=0;j<$("#list").find(".list-p").length;j++){
                            if(idArr[i] == $("#list").find(".list-p").eq(j).find("input[type=checkbox]").attr("attrId")){
                                $("#list").find(".list-p").eq(j).find("input[type=checkbox]").attr("checked","checked");
                                layui.form().render();
                            }
                        }
                    }
                }
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 确定分享
 */
function queDingSelectData(sendData) {
    $.send({
        url: '/v2/employee/time_manager/insert_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
               top.ff.tips("success","共享成功")
                setTimeout(function () {
                    //刷新待办提醒列表
                    getIframe(getQueryString("parentBodyId")).contentWindow.getTodayReminList();
                    //当你在iframe页面关闭自身时
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                }, 1000);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}






