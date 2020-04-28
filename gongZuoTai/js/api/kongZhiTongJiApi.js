/**
 * 获取房源数量
 * @param sendData
 */
function getHouseCountData(sendData) {
    $.send({
        url: "/v2/reportforms/over_all_situation/house_status",
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                if(!isNull(data.result)){
                    var $tongji = $("#kongZhiTongJi");
                    //合租房源数量统计
                    $tongji.find("[name=heKeZu]").html(data.result.partPartObject.daiZuCount);       //合租可租
                    $tongji.find("[name=heKongZhi]").html(data.result.partPartObject.kongZhi);       //合租空置
                    $tongji.find("[name=heYuDing]").html(data.result.partPartObject.yuDingCount);    //合租预定

                    //整租房源数量统计
                    $tongji.find("[name=zhengKeZu]").html(data.result.fullObject.daiZuCount);       //整租可租
                    $tongji.find("[name=zhengKongZhi]").html(data.result.fullObject.kongZhi);       //整租空置
                    $tongji.find("[name=zhengYuDing]").html(data.result.fullObject.yuDingCount);    //整租预定

                    //集中房源数量统计
                    $tongji.find("[name=jiKeZu]").html(data.result.focusObject.daiZuCount);        //集中可租
                    $tongji.find("[name=jiKongZhi]").html(data.result.focusObject.kongZhi);        //集中空置
                    $tongji.find("[name=jiYuDing]").html(data.result.focusObject.yuDingCount);     //集中预定
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}

/**
 * 获取空置率
 * @param sendData
 */
function getHouseKongZhiLvData(sendData) {
    $.send({
        url: "/v2/reportforms/over_all_situation/this_vacant",
        data: sendData,
        isLoading:"true",
        success: function (data) {
            if (data.status.code == 200) {
                if(!isNull(data.result)){
                    //饼状图数据
                    // 指定图表的配置项和数据
                    kongzhifangOption = {
                        title: {

                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        /*legend: {
                            orient: 'vertical',
                            x: 'right'
                        },*/
                        series: [{
                            name: '空置房',
                            type: 'pie',
                            radius:['35%','95%'],
                            data: [
                                {value:data.result.vacant.seven, name:'0-7天', itemStyle:{ normal:{color:'#33c575', borderColor:'#fff', borderWidth:3} }  },
                                {value:data.result.vacant.fifteen, name:'8-15天',itemStyle:{ normal:{color:'#39b6fc',borderColor:'#fff',borderWidth:3} }  },
                                {value:data.result.vacant.twenty, name:'16-20天',itemStyle:{ normal:{color:'#ba4deb',borderColor:'#fff',borderWidth:3} }  },
                                {value:data.result.vacant.thirfy, name:'21-30天',itemStyle:{ normal:{color:'#fdab3d',borderColor:'#fff',borderWidth:3} }  },
                                {value:data.result.vacant.fifty, name:'31-50天',itemStyle:{ normal:{color:'#f67135',borderColor:'#fff',borderWidth:3} }  },
                                {value:data.result.vacant.others, name:'51天以上',itemStyle:{ normal:{color:'#f05155',borderColor:'#fff',borderWidth:3} }  }
                            ],
                            animation: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            }
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    kongzhifangChart.setOption(kongzhifangOption);

                    //房源数据统计
                    var $tongji = $("#kongZhiTongJi");
                    $tongji.find("[name=sevenCount]").find("label").html(strFormat(data.result.vacant.seven , '0') + '间');         //0-7天空置天
                    $tongji.find("[name=sevenCount]").find("strong").html(strFormat(data.result.vacant.sevenVacant , '0.00%'));     //0-7天空置率
                    $tongji.find("[name=fifteenCount]").find("label").html(strFormat(data.result.vacant.fifteen , '0') + '间');     //8-15天空置天
                    $tongji.find("[name=fifteenCount]").find("strong").html(strFormat(data.result.vacant.fifteenVacant , '0.00%')); //8-15天空置率
                    $tongji.find("[name=twentyCount]").find("label").html(strFormat(data.result.vacant.twenty , '0') + '间');       //16-20天空置天
                    $tongji.find("[name=twentyCount]").find("strong").html(strFormat(data.result.vacant.twentyVacant , '0.00%'));   //16-20天空置率
                    $tongji.find("[name=thirfyCount]").find("label").html(strFormat(data.result.vacant.thirfy , '0') + '间');       //21-30天空置天
                    $tongji.find("[name=thirfyCount]").find("strong").html(strFormat(data.result.vacant.thirfyVacant , '0.00%'));   //21-30天空置率
                    $tongji.find("[name=fiftyCount]").find("label").html(strFormat(data.result.vacant.fifty , '0') + '间');         //31-50天空置天
                    $tongji.find("[name=fiftyCount]").find("strong").html(strFormat(data.result.vacant.fiftyVacant , '0.00%'));     //31-50天空置率
                    $tongji.find("[name=othersCount]").find("label").html(strFormat(data.result.vacant.others , '0') + '间');       //51天以上空置天
                    $tongji.find("[name=othersCount]").find("strong").html(strFormat(data.result.vacant.othersVacant , '0.00%'));   //51天以上空置率
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    });
}