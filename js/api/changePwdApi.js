/**
 * Created by Long on 2017/5/23.
 */
//保存按钮，提交数据
function saveCancelData(sendData) {
    $.send({
        url: '/v2/sys/table_jjr_user/change_password',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                
                $("#changeMain").hide();
                $("#okMain").show();
            }else{
               top.ff.tips("error","修改失败！");
            }
        }
    })
}
