/**
 * 获取房源数量
 * @param sendData
 */
function getHouseCountData(sendData) {
    $.send({
        url: "/v2/reportforms/over_all_situation/this_month_type_Data",
        data: sendData,
        isLoading:"true",
        success: function (data) {
            if (data.status.code == 200) {
                if(!isNull(data.result)){
                    var $tongji = $("#yewutongji");
                    //出房
                    $tongji.find("[name=jinRiChu]").html(strFormat(data.result.chengzu.num , '0'));              //今日出房
                    $tongji.find("[name=benYueChu]").html(strFormat(data.result.chengzu.monthNum , '0'));        //本月出房

                    //收房
                    $tongji.find("[name=jinRiShou]").html(strFormat(data.result.qianyue.num , '0'));             //今日收房
                    $tongji.find("[name=benYueShou]").html(strFormat(data.result.qianyue.monthNum , '0'));       //本月收房

                    //预定
                    $tongji.find("[name=jinRiYuDing]").html(strFormat(data.result.shouding.num , '0'));          //今日预定
                    $tongji.find("[name=benYueYuDing]").html(strFormat(data.result.shouding.monthNum , '0'));    //本月预定

                    //租客续约
                    $tongji.find("[name=jinRiXuYue]").html(strFormat(data.result.renewObject.num , '0'));        //今日租客续约
                    $tongji.find("[name=benYueXuYue]").html(strFormat(data.result.renewObject.monthNum , '0'));  //本月租客续约
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}

/**
 * 获取房源柱状图
 * @param sendData
 */
function getHouseZhuZhuangData(sendData) {
    $.send({
        url: "/v2/reportforms/over_all_situation/six_chart",
        data: sendData,
        isLoading:"true",
        success: function (data) {
            if (data.status.code == 200) {
                if(!isNull(data.result)){
                    var $chuYue = [];        //出房月份
                    var $chuXuCount = [];    //出房续租房源量
                    var $chuNewCount = [];   //出房新租房源量
                    //出房月份
                    $.each(data.result.czXinArray, function (n,value) {
                        $chuYue[n] = value.months + '月';
                    });
                    //出房续租房源量
                    $.each(data.result.czXuArray, function (n,value) {
                        $chuXuCount[n] = value.number;
                    });
                    //出房新租房源量
                    $.each(data.result.czXinArray, function (n,value) {
                        $chuNewCount[n] = value.number;
                    });

                    //出房柱状图
                    chufangOption = {
                        title: {
                            text: '近6个月出房业务数据 ',
                            textStyle:{
                                fontWeight:'normal',
                                fontSize:16
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'none'         // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['续租','新租']
                        },
                        xAxis: [
                            {
                                data: $chuYue,     //出房月份
                                axisLine: {show: false},
                                axisTick: {show: false}
                            }
                        ],
                        yAxis: [{
                            type: 'value',
                            name:'间       ',
                            nameGap: 14,
                            axisLine: {show: false},
                            axisTick: {show: false}
                            /*max: 250,
                            offset:5*/
                        }],
                        series: [{
                            name: '续租',
                            type: 'bar',
                            barWidth : 12,
                            data: $chuXuCount,    //出房续租房源量
                            itemStyle: {
                                normal: {
                                    color: '#a7dffe'
                                },
                                emphasis:{
                                    color: '#55abe6'
                                }
                            }
                        },{
                            name: '新租',
                            type: 'bar',
                            barWidth : 12,
                            data: $chuNewCount,    //出房新租房源量
                            itemStyle: {
                                normal: {
                                    color: '#ade7cb'
                                },
                                emphasis:{
                                    color: '#00be6a'
                                }
                            }
                        }]
                    };

                    //收房数据
                    var $shouYue = [];        //收房月份
                    var $shouXuCount = [];    //收房续租房源量
                    var $shouNewCount = [];   //收房新租房源量
                    //收房月份
                    $.each(data.result.qyXinArray, function (n,value) {
                        $shouYue[n] = value.months + '月';
                    });
                    //收房续租房源量
                    $.each(data.result.qyXuArray, function (n,value) {
                        $shouXuCount[n] = value.number;
                    });
                    //收房新租房源量
                    $.each(data.result.qyXinArray, function (n,value) {
                        $shouNewCount[n] = value.number;
                    });

                    //收房柱状图
                    shoufangOption = {
                        title: {
                            text: '近6个月收房业务数据 ',
                            textStyle:{
                                fontWeight:'normal',
                                fontSize:16
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['续租','新收']
                        },
                        xAxis: [
                            {
                                data: $shouYue,  //月份
                                axisLine: {show: false},
                                axisTick: {show: false}
                            }
                        ],
                        yAxis: [{
                            type: 'value',
                            name:'套       ',
                            nameGap: 14,
                            axisLine: {show: false},
                            axisTick: {show: false}
                            /*max: 100,
                            offset:5*/
                        }],
                        series: [{
                            name: '续租',
                            type: 'bar',
                            barWidth : 12,
                            data: $shouXuCount,    //续租数量
                            itemStyle: {
                                normal: {
                                    color: '#f7b2b4'
                                },
                                emphasis:{
                                    color: '#eb3f43'
                                }
                            }
                        },{
                            name: '新收',
                            type: 'bar',
                            barWidth : 12,
                            data: $shouNewCount,   //新签数量
                            itemStyle: {
                                normal: {
                                    color: '#fde2b4'
                                },
                                emphasis:{
                                    color: '#fbb643'
                                }
                            }
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    chufangChart.setOption(chufangOption);    //出房柱状图
                    shoufangChart.setOption(shoufangOption);  //收房柱状图
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}