/**
 * Created by Long on 2017/6/16.
 */
//添加日程
function saveAddRiChengData(sendData){
    $.send({
        url: '/v2/employee/time_manager/insert',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
               top.ff.tips("success","添加成功！")
                //刷新待办提醒页面的提醒列表 或者 提醒列表里的所有列表
                getIframe(getQueryString("parentBodyId")).contentWindow.getTodayReminList();
                //当你在iframe页面关闭自身时
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭
            }
        }
    })
}











