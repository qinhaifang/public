/**
 * Created by yangl on 2018/1/14.
 */
/**
 * 获取公司logo
 */
function companylogoData() {
    $.send({
        url: "/v2/sys/resources_adjust/get",
        loadingType: '1',
        success: function (data) {
            console.log(data);
            if (data.status.code == 200) {
                if (!isNull(data.result.logo)){
                    $(".logo").css("background",'url('+data.result.logo+') no-repeat center center #1f323c');
                }
                if(data.result.isShare == 1){
                    $('#shareTitle').show();
                }else{
                    $('#shareTitle').hide();
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}
