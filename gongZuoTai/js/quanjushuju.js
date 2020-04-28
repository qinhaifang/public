
/**
 * 显示数据
 * @type {{selectDay: string}}
 */
var viewData = {
    selectDay:""   //显示指定日期内容
};

$(function(){
    var $quanjushuju = $("#quanjushuju");
    //控制内容区显示高度
    $quanjushuju.css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
    //获取当天时间
    $quanjushuju.find("input[name=dateTime]").val(getTime());
    // 默认显示为昨日
    $quanjushuju.find("[name=shujuTime]").html('昨日');
    //修改昨日数据为历史数据
    $("#shujuTime").html("历史")

    //账户余额 及 昨日租客缴费逾期
    getYuE();
    //当前累计空置
    getKongZhi();
    //获取昨日业务报表数据
    getZuoRi();
    //获取昨日租客续租、逾期、应退
    getZuKe();
    //当前房间总数 - 合租
    getHeZuHouseCount();
    //当前房间总数 - 整租
    getZhengZuHouseCount();
    //当前房间总数 - 集中
    getJiZhongHouseCount();
    //获取企业账号
    getCorporateAccount();
    //选择企业账户
    
	viewData.selectDay = $(".shuju-time input").val();
    layui.form().on('select(account)', function (data) {
    		var id = $(data.elem).attr('value') != 0 ? $(data.elem).attr('value') : "";
    		viewData.corporateId = id;
		getYuEData(viewData);
	})
});

//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#quanjushuju").css({"height": ($(window).height() - 44) + "px"}, {"width": ($(window).width() - 100) + "px"});
});

/**
 * 选择时间之后获取数据
 */
function showTime($datas) {
    var $data = $datas;
    //判断是否选择的今天，选择今天显示昨日
    if($data == getTime()){
        $("#quanjushuju").find("[name=shujuTime]").html('昨日');
        //如果选择今天，显示昨天的数据
        viewData.selectDay = shortDay(getTime() , '1');
    }else{
        var $month = $data.split("-")[1];
        var $day = $data.split("-")[2];
        $("#quanjushuju").find("[name=shujuTime]").html($month + '.' + $day + '日');
        viewData.selectDay = $data;    //如果选择的不是今天，则显示当天的数据
    }
    //刷新页面数据
    refreshData();
}
/**
 * 户余额 及 租客缴费逾期数据
 * @type {{selectDay: string}}
 */
var yuData = {
    selectDay:""    //指定日期
};
/**
 * 账户余额 及 昨日租客缴费逾期
 * @param sendData
 */
function getYuE(){
    getYuEData(viewData);
    // //新增初始余额
    // getChuYuEData(sendData)
}

/**
 * 当前累计空置
 * @param sendData
 */
function getKongZhi(){
    getKongZhiData();
}

/**
 * 获取昨日业务报表数据
 * @param sendData
 */
function getZuoRi(){
    getZuoRiData(viewData);
}

/**
 * 获取租客续租、逾期、应退
 * @param sendData
 */
function getZuKe(){
    getZuKeData(viewData);
}

/**
 * 当前房间总数 - 合租
 * @param sendData
 */
function getHeZuHouseCount(){
    getHeZuHouseCountData();
}

/**
 * 当前房间总数 - 整租
 * @param sendData
 */
function getZhengZuHouseCount(){
    getZhengZuHouseCountData();
}

/**
 * 当前房间总数 - 集中
 * @param sendData
 */
function getJiZhongHouseCount(){
    getJiZhongHouseCountData();
}

/**
 * 选择时间框清空时间
 */
function clearTime() {
    // $("#quanjushuju").find("[name=shujuTime]").html('昨日');
    // //数据修改为历史
    // $("#quanjushuju").find("[name=shujuTime]").html('历史');
    viewData.selectDay = '';   //清空日期
    //刷新页面数据
    refreshData();
}

/**
 * 当前时间
 */
function nowTime() {
    //刷新数据
    refreshData();
}

/**
 * 刷新页面数据
 */
function refreshData() {
    //账户余额 及 昨日租客缴费逾期
    getYuE();
    //获取昨日业务报表数据
    getZuoRi();
    //获取昨日租客续租、逾期、应退
    getZuKe();
}

/**
 * 合租房源列表
 * @param $typeId 1：可租， 2：配置， 3：预定， 4：成租， 5：不可租
 */
function showHeZu($typeId) {
    /*----   状态: 10：待配置，11：配置中，20：可租， 21：空置，22：转租，23：预到期，24：申退，  30：预定，40：已租，50：不可租，51：非正常退，60：脏房  ----*/
    var $houseStatus = '';
    if($typeId == '1'){         //可租
        $houseStatus = '20';
    }else if($typeId == '2'){   //配置
        $houseStatus = '10';
    }else if($typeId == '3'){   //预定
        $houseStatus = '30';
    }else if($typeId == '4'){   //成租
        $houseStatus = '40';
    }else if($typeId == '5'){   //不可租
        $houseStatus = '50';
    }
    top.layer.open({
        type: 2,
        title: [
            '合租房源',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'fangyuan/fangTai_hezu.html?houseStatus=' + $houseStatus + '&parentBodyId=quanjushuju',
        area: ['99%', '99%'],
        zIndex: 99,
        cancel: function (index, layero) {
            //刷新待办页面
            //updataPage();
        }
    })
}

/**
 * 整租房源列表
 * @param $typeId  $typeId 1：可租， 2：配置， 3：预定， 4：成租， 5：不可租
 */
function showZhengZu($typeId) {
    /*----   状态: 10：待配置，11：配置中，20：可租， 21：空置，22：转租，23：预到期，24：申退，  30：预定，40：已租，50：不可租，51：非正常退，60：脏房  ----*/
    var $houseStatus = '';
    if($typeId == '1'){         //可租
        $houseStatus = '20';
    }else if($typeId == '2'){   //配置
        $houseStatus = '10';
    }else if($typeId == '3'){   //预定
        $houseStatus = '30';
    }else if($typeId == '4'){   //成租
        $houseStatus = '40';
    }else if($typeId == '5'){   //不可租
        $houseStatus = '50';
    }
    top.layer.open({
        type: 2,
        title: [
            '整租房源',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'fangyuan/fangTai_zhengzu.html?houseStatus=' + $houseStatus + '&parentBodyId=quanjushuju',
        area: ['99%', '99%'],
        zIndex: 99,
        cancel: function (index, layero) {
            //刷新待办页面
            //updataPage();
        }
    })
}

/**
 * 集中房源列表
 * @param $typeId
 */
function showJiZhong($typeId) {
    /*----   状态: 10：待配置，11：配置中，20：可租， 21：空置，22：转租，23：预到期，24：申退，  30：预定，40：已租，50：不可租，51：非正常退，60：脏房  ----*/
    var $houseStatus = '';
    if($typeId == '1'){         //可租
        $houseStatus = '20';
    }else if($typeId == '2'){   //配置
        $houseStatus = '10';
    }else if($typeId == '3'){   //预定
        $houseStatus = '30';
    }else if($typeId == '4'){   //成租
        $houseStatus = '40';
    }else if($typeId == '5'){   //不可租
        $houseStatus = '50';
    }
    top.layer.open({
        type: 2,
        title: [
            '集中房源',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'fangyuan/fangTai_jizhong.html?houseStatus=' + $houseStatus + '&parentBodyId=quanjushuju',
        area: ['99%', '99%'],
        zIndex: 99,
        cancel: function (index, layero) {
            //刷新待办页面
            //updataPage();
        }
    })
}