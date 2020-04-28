/**
 * 账户余额 及 昨日租客缴费逾期
 * @param sendData
 */
function getYuEData(sendData){
    $.send({
        url: '/v2/reportforms/over_all_situation/pay_rent',
        data: sendData,
        isLoading:"true",
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //账户余额
                //新增的时间0208
                if (!isNull(data.result.balanceObject.deadline)){
                    $tongji.find("[name=endTime]").html('(截止到' + data.result.balanceObject.deadline + ')');
                }
                $tongji.find("[name=chuShiYuE]").html('￥' + strFormat(data.result.balanceObject.init , '0.00'));         //初始余额  修改初始余额0208
                $tongji.find("[name=shijiShouRu]").html('￥' + strFormat(data.result.balanceObject.income , '0.00'));         //实际收入
                $tongji.find("[name=shijiZhiChu]").html('￥' + strFormat(data.result.balanceObject.expenditure , '0.00'));    //实际支出
                $tongji.find("[name=dangQianYuE]").html('￥' + strFormat(data.result.balanceObject.totalBalance , strFormat(data.result.balanceObject.init , '0.00')));        //当前账户余额    修改账户余额0208

                //昨日租客缴费逾期
                $tongji.find("[name=weijiao]").html(strFormat(data.result.payRentObject.lastday , '0'));            //未交房租
                $tongji.find("[name=yuqiThree]").html(strFormat(data.result.payRentObject.three , '0'));            //逾期1-3天
                $tongji.find("[name=yuqiSeven]").html(strFormat(data.result.payRentObject.seven , '0'));            //逾期4-7天
                $tongji.find("[name=yuqiOthers]").html(strFormat(data.result.payRentObject.others , '0'));          //逾期8天以上

            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
// /*
//  * 修改初始余额
//  */
// function getChuYuEData(sendData){
//     $.send({
//         url: '/v2/reportforms/over_all_situation/historical_balance',
//         data: sendData,
//         isLoading:"true",
//         success: function (data) {
//             if(data.status.code == 200){
//                 var $tongji = $("#quanjushuju");
//                 if (!isNull(data.result.balanceObject.deadline)){
//                     $tongji.find("[name=endTime]").html('(截止到' + data.result.balanceObject.deadline + ')');
//                 }
//                 $tongji.find("[name=chuShiYuE]").html('￥' + strFormat(data.result.balanceObject.init , '0.00'));         //初始余额
//                 $tongji.find("[name=shijiShouRu]").html('￥' + strFormat(data.result.balanceObject.income , '0.00'));         //实际收入
//                 $tongji.find("[name=shijiZhiChu]").html('￥' + strFormat(data.result.balanceObject.expenditure , '0.00'));    //实际支出
//                 $tongji.find("[name=dangQianYuE]").html('￥' + strFormat(Number(data.result.balanceObject.balance) + Number(data.result.balanceObject.init)), '0.00');        //当前账户余额
//             }else{
//                 top.ff.tips("error",data.status.msg);
//             }
//         }
//     })
// }
/**
 * 时间转换
 */
function transferTime(timeData) {
    var d = new Date(timeData);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    // var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
    // var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    // var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
    return year+ '-' + month + '-' + day;
}
/**
 * 当前累计空置
 * @param sendData
 */
function getKongZhiData(sendData){
    $.send({
        url: '/v2/reportforms/over_all_situation/this_month_vacant',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //当前累计空置
                $tongji.find("[name=zongTao]").html(strFormat(data.result.vacant.total , '0'));          //空置总套
                $tongji.find("[name=tongjiSeven]").html(strFormat(data.result.vacant.seven , '0'));      //0-7天
                $tongji.find("[name=tongjiFifteen]").html(strFormat(data.result.vacant.fifteen , '0'));  //8-15天
                $tongji.find("[name=tongjiTwenty]").html(strFormat(data.result.vacant.twenty , '0'));    //16-20天
                $tongji.find("[name=tongjiThirfy]").html(strFormat(data.result.vacant.thirfy , '0'));    //21-30天
                $tongji.find("[name=tongjiFifty]").html(strFormat(data.result.vacant.fifty , '0'));      //31-50天
                $tongji.find("[name=tongjiOthers]").html(strFormat(data.result.vacant.others , '0'));    //51天以上
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 获取昨日业务报表数据
 * @param sendData
 */
function getZuoRiData(sendData){
    $.send({
        url: '/v2/reportforms/over_all_situation/last_month_Data',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //昨日新租
                $tongji.find("[name=newHe]").html(strFormat(data.result.chengzu.partNum , '0'));                //昨日新租合租房间数
                $tongji.find("[name=newCountHe]").html(strFormat(data.result.chengzu.partMonthNum , '0'));      //本月新租合租房间数
                $tongji.find("[name=newZheng]").html(strFormat(data.result.chengzu.fullNum , '0'));             //昨日新租整租房间数
                $tongji.find("[name=newCountZheng]").html(strFormat(data.result.chengzu.fullMonthNum , '0'));   //本月新租整租房间数
                $tongji.find("[name=newJi]").html(strFormat(data.result.chengzu.focusNum , '0'));               //昨日新租集中房间数
                $tongji.find("[name=newCountJi]").html(strFormat(data.result.chengzu.focusMonthNum , '0'));     //本月新租集中房间数

                //昨日新收
                $tongji.find("[name=newShouZheng]").html(strFormat(data.result.qianyue.fullNum , '0'));             //昨日新收整租房间数
                $tongji.find("[name=newShouCountZheng]").html(strFormat(data.result.qianyue.fullMonthNum , '0'));   //本月新收合租房间数
                $tongji.find("[name=newShouJi]").html(strFormat(data.result.qianyue.focusNum , '0'));               //昨日新收集中房间数
                $tongji.find("[name=newShouCountJi]").html(strFormat(data.result.qianyue.focusMonthNum , '0'));     //本月新收集中房间数

                //昨日预定
                $tongji.find("[name=newYuHe]").html(strFormat(data.result.shouding.partNum , '0'));                //昨日预定合租房间数
                $tongji.find("[name=newYuZheng]").html(strFormat(data.result.shouding.fullNum , '0'));             //昨日预定整租房间数
                $tongji.find("[name=newYuJi]").html(strFormat(data.result.shouding.focusNum , '0'));               //昨日预定集中房间数
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 获取昨日租客续租、逾期、应退
 * @param sendData
 */
function getZuKeData(sendData){
    $.send({
        url: '/v2/reportforms/over_all_situation/last_month_rent',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //昨日租客续约
                $tongji.find("[name=zukeXuYue]").html(strFormat(data.result.renewObject.lastDayre , '0'));            //租客续约
                $tongji.find("[name=zukeBenYue]").html(strFormat(data.result.renewObject.lastMonthre , '0'));         //本月累计续约
                $tongji.find("[name=zukeTuiFang]").html(strFormat(data.result.expireObject.lastMonthexpire , '0'));   //本月应退房
                $tongji.find("[name=xuqianLv]").html(strFormat(data.result.renewObject.renewRat , '0'));              //本月续约率

                //昨日租客退房逾期
                $tongji.find("[name=tuifangCount]").html(strFormat(data.result.expireObject.lastdayExpire , '0'));    //应退房
                $tongji.find("[name=tuifangThree]").html(strFormat(data.result.overObject.three , '0'));              //逾期1-3天
                $tongji.find("[name=tuifangSeven]").html(strFormat(data.result.overObject.seven , '0'));              //逾期4-7天
                $tongji.find("[name=tuifangOthers]").html(strFormat(data.result.overObject.others , '0'));            //逾期8天以上
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 当前房间总数 - 合租
 * @param sendData
 */
function getHeZuHouseCountData(sendData){
    $.send({
        url: '/v2/house/part_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //当前房间总数 - 合租
                $tongji.find("[name=heKongLv]").html(strFormat(data.result.vacancyRate , '0.00%')); //合租 - 当前空置率
                $tongji.find("[name=heKeZu]").html(strFormat(data.result.daiZuCount , '0'));        //合租 - 可租
                $tongji.find("[name=hePeiZhi]").html(strFormat(data.result.peiZhiCount , '0'));     //合租 - 配置
                $tongji.find("[name=heYuDing]").html(strFormat(data.result.yuDingCount , '0'));     //合租 - 预定
                $tongji.find("[name=heChengZu]").html(strFormat(data.result.yiZuCount , '0'));      //合租 - 成租
                $tongji.find("[name=heBuKeZu]").html(strFormat(data.result.buKeZuCount , '0'));     //合租 - 不可租
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 当前房间总数 - 整租
 * @param sendData
 */
function getZhengZuHouseCountData(sendData){
    $.send({
        url: '/v2/house/full_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //当前房间总数 - 合租
                $tongji.find("[name=zhengKongLv]").html(strFormat(data.result.vacancyRate , '0.00%')); //整租 - 当前空置率
                $tongji.find("[name=zhengKeZu]").html(strFormat(data.result.daiZuCount , '0'));        //整租 - 可租
                $tongji.find("[name=zhengPeiZhi]").html(strFormat(data.result.peiZhiCount , '0'));     //整租 - 配置
                $tongji.find("[name=zhengYuDing]").html(strFormat(data.result.yuDingCount , '0'));     //整租 - 预定
                $tongji.find("[name=zhengChengZu]").html(strFormat(data.result.yiZuCount , '0'));      //整租 - 成租
                $tongji.find("[name=zhengBuKeZu]").html(strFormat(data.result.buKeZuCount , '0'));     //整租 - 不可租
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/**
 * 当前房间总数 - 集中
 * @param sendData
 */
function getJiZhongHouseCountData(sendData){
    $.send({
        url: '/v2/house/focus_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $tongji = $("#quanjushuju");
                //当前房间总数 - 集中
                $tongji.find("[name=jiKongLv]").html(strFormat(data.result.vacancyRate , '0.00%')); //集中 - 当前空置率
                $tongji.find("[name=jiKeZu]").html(strFormat(data.result.daiZuCount , '0'));        //集中 - 可租
                $tongji.find("[name=jiPeiZhi]").html(strFormat(data.result.peiZhiCount , '0'));     //集中 - 配置
                $tongji.find("[name=jiYuDing]").html(strFormat(data.result.yuDingCount , '0'));     //集中 - 预定
                $tongji.find("[name=jiChengZu]").html(strFormat(data.result.yiZuCount , '0'));      //集中 - 成租
                $tongji.find("[name=jiBuKeZu]").html(strFormat(data.result.buKeZuCount , '0'));     //集中 - 不可租
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
/**
 * 获取企业账号
 * @param sendData
 */
function getCorporateAccount(sendData){
	$.send({
        url: '/v2/sys/corporate_account/account_name_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
//          		console.log(data.result)
            		var list = data.result.list;
            		var html = "";
            		for (var i = 0;i< list.length;i++){
            			html += '<option value="'+ list[i].id +'">'+list[i].accountName+'</option>'
            		}
            		$("#corporateAccount").append(html);
            		layui.form().render();
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
