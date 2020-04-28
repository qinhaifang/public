/**
 * Created by Long on 2017/6/16.
 */

//获得最新的4条公告
function getNewGongGaoData(sendData){
    $.send({
        url: '/v2/company/company_notice/get_list_console',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                if(data.result.list.length > 0){
                    var html = "";
                    // for(var i=0; i<4; i++){
                    //     html +='<div class="textColor" style="position: relative;cursor: pointer" onclick="lookGongGaoDetail(\''+ data.result.list[i].id +'\')" >'+'<span style="position: absolute;left: -15px;top:0;">•</span>'+'<span style="margin-right: 10px;">['+ data.result.list[i].noticeType.key +']</span>'+ data.result.list[i].title +'</div>';
                    // }
                    $.each(data.result.list,function (n,val) {
                        if (n < 4 ){
                            html +='<div class="textColor" style="position: relative;cursor: pointer" onclick="lookGongGaoDetail(\''+ val.id +'\')" >'+'<span style="position: absolute;left: -15px;top:0;">•</span>'+'<span style="margin-right: 10px;">['+ val.noticeType.key +']</span>'+ val.title +'</div>';
                        }
                    });



                    $("#newCon").html(html);
                }
                
            }
        }
    })
}
//获得今日提醒列表
function getTodayReminListData(sendData){
    $.send({
        url: '/v2/employee/time_manager/get_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $list = '';
                if(data.result.list.length > 0){
                    $.each(data.result.list,function (n,$value) {
                        $list += '<li onclick="lookTiXingList(\''+$value.content+'\',\''+0+'\',\''+$value.id+'\')">';
                        var $time = $value.remindTime;
                        var $times = $time.slice(11);
                        $list += '<span class="date">'+$times+'</span>';
                        // $list += '<p alt="' + $value.content + '" onmouseover="mouseTips(this)">' + $value.content + '</p>';
                        $list += '<p alt="' + $value.content + '" onmouseover="mouseTips(this)">' + $value.content + '</p>';
                        $list += '</li>';
                    })
                }else{
                    $list += '<li>暂无提醒信息哦！</li>'
                }
                $("#xitingList").html('');
                $("#xitingList").html($list);
            }
        }
    })
}
//获取今日统计
function getToDayTaskList(sendData){
    $.send({
        url:'/v2/reportforms/over_all_situation/this_month_type_Data',
        data:sendData,
        success:function(data){
            if(data.status.code == 200){
                $("#left1").html(data.result.chengzu.num);
                $("#left2").html(data.result.qianyue.num);
                $("#left3").html(data.result.shouding.num);
                $("#left4").html(data.result.renewObject.num);
                $("#right1").html(data.result.chengzu.monthNum);
                $("#right2").html(data.result.qianyue.monthNum);
                $("#right3").html(data.result.shouding.monthNum);
                $("#right4").html(data.result.renewObject.monthNum);
            }
        }
    });
}

//统计财务
function getAllCountOneData(sendData){
    $.send({
        url: '/v2/balance/table_balance_sheet/get_compact_count',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                $("#daishou").text(data.result.count);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计合同
function getAllCountTwoData(sendData){
    $.send({
        url: '/v2/compact/chengzu/status_count',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                // jiJiangBanRuCount true string 即将搬入
                // jiJiangBanChuCount true string 即将搬出
                // zaiZuZhongCount true string 在租中
                // yiDaoQiCount true string 已到期
                // yiTuiZuCount true string 已退租
                // allCount true string 总数
                $("#tuifang").text(data.result.jiJiangBanChuCount);
                $("#banru").text(data.result.jiJiangBanRuCount);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计维修
function getAllCountThreeData(sendData){
    $.send({
        url: '/v2/rentservice/table_web_repair/get_status_count',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                $("#weixiu").text(data.result.daiChuLi);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计保洁
function getAllCountFourData(sendData){
    $.send({
        url: '/v2/rentservice/table_clean/get_status_count',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                $("#baojie").text(data.result.daiChuLi);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计合租
function getAllCountFiveData(sendData){
    $.send({
        url: '/v2/house/part_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                // allCount true string 全部
                // peiZhiCount true string 配置中
                // daiZuCount true string 可租
                // yuDingCount true string 预订
                // yiZuCount true string 已租
                // buKeZuCount true string 不可租
                $("#hedai").text(data.result.daiZuCount);
                $("#hekong").text(data.result.kongZhi);
                $("#hezhuan").text(data.result.zhuanZu);
                $("#heshen").text(data.result.shenTui);
                $("#hedao").text(data.result.yuDaoQi);
                $("#hekonglv").text(data.result.vacancyRate);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计整租
function getAllCountSixData(sendData){
    $.send({
        url: '/v2/house/full_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                // allCount true string 全部
                // peiZhiCount true string 配置中
                // daiZuCount true string 可租
                // yuDingCount true string 预订
                // yiZuCount true string 已租
                // buKeZuCount true string 不可租
                $("#zhengdai").text(data.result.daiZuCount);
                $("#zhengkong").text(data.result.kongZhi);
                $("#zhengzhuan").text(data.result.zhuanZu);
                $("#zhengshen").text(data.result.shenTui);
                $("#zhengdao").text(data.result.yuDaoQi);
                $("#zhengkonglv").text(data.result.vacancyRate);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计集中
function getAllCountSevenData(sendData){
    $.send({
        url: '/v2/house/focus_house/get_count_by_status',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                // allCount true string 全部
                // peiZhiCount true string 配置中
                // daiZuCount true string 可租
                // yuDingCount true string 预订
                // yiZuCount true string 已租
                // buKeZuCount true string 不可租
                $("#jidai").text(data.result.daiZuCount);
                $("#jikong").text(data.result.kongZhi);
                $("#jizhuan").text(data.result.zhuanZu);
                $("#jishen").text(data.result.shenTui);
                $("#jidao").text(data.result.yuDaoQi);
                $("#jikonglv").text(data.result.vacancyRate);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//统计投诉
function getAllCountEieData(sendData){
    $.send({
        url: '/v2/rentservice/complaint_letter/get_status_count',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                $("#tousu").text(data.result.daiChuLi);
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}





