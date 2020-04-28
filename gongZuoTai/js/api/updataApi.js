/**
 * Created by Long on 2017/8/22.
 */
function getNewRemarksData(sendData) {
    $.send({
        url: '/v2/sys/update_description/getOne',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                var $value = data.result;
                  $("#content").val($value.releaseContent);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}







