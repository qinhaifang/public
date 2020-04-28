// var ipStr= "http://pms.green-ant.cn";
// var ipStr= "http://test.fqweb.pms.efanghang.com"; //测试
//var ipStr= "http://test.pms.zuzhuwang.com"; //恩加壹测试
// var ipStr= "http://localhost:52001"; //恩加壹测试
//var ipStr= "http://10.0.0.71:52001"; //吴勇奇
// var ipStr= "http://test.pms.zuzhuwang.com"; //阮炎
//var picIpStr = 'http://test.pms.zuzhuwang.com';   //扫码上传图片
//var serverUrl = "http://test.free.pms.efanghang.com";
//服务器IP地址
var ipOldStr ="http://test.odfly.com";
//var ipStr = "http://47.93.39.198:8080";   //正式服务器
//var ipStr = "http://47.94.97.40:8080"; //测试服务器
//var ipStr = "http://10.0.0.164:8080";//赵燕云本地测试地址
var ipStr = "http://10.0.0.173:8080" //惠玲本地测试地址
//var ipStr = "http://10.0.0.148:8080" //康慧君本地测试地址

//-----------------------------------------------------------
//图片上传IP地址
//var picIpStr = "http://47.94.97.40:8080"; //测试地址
var picIpStr = "http://47.93.39.198:8080"; //正式地址
// var picIpStr = "http://10.0.0.173:8080"; //本地地址
var serverUrl = "http://free.pms.efanghang.com";
var $url = window.location.origin;   //获取服务器请求地址
var $url = window.location.origin;   //获取服务器请求地址
var $webSocketIpStr = 'test.fqweb.pms.efanghang.com';


var gcid = !isNull(getItems('gcid')) ? getItems('gcid') : "0100099";
var cityCode = "010";
var cityName = "北京市";
var cityLng = "116.232929";
var isEncrypt = "user encrypt1";
var cityLat = "39.542415";
var currentJJRUser = "JJRUser";
/**
 * 检查权限
 */
//checkAccess();

function checkAccess() {
    if (!isNull(getItemsObj(currentJJRUser)) && getItemsObj(currentJJRUser).accountName != "admin") {
        var roleAccessList = $("body").find("*[roleAccess]");
        $(roleAccessList).hide();
        var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
        for (var i = 0; i < roleAccessList.length; i++) {
            if (systemResourcesList.length > 0) {
                for (var j = 0; j < systemResourcesList.length; j++) {
                    if ($(roleAccessList.get(i)).attr("roleAccess") == systemResourcesList[j]["mark"]) {
                        $(roleAccessList.get(i)).show();
                        break;
                    } else {
                        if (j == systemResourcesList.length - 1) {
                            $(roleAccessList.get(i)).remove();
                        }
                    }
                }
            }
        }
    }
}

//报表导出功能，
function exportSheet(url,sendData){
        top.layer.open({
            type: 1,
            title: [
                '提示',
                'color: #86b22f; font-size:16px;'
            ],
            area: ['420px', '203px'], //宽高
            content: showPromptWin('数据正在导出中，请耐心等待！导出完毕，请手动关闭此弹窗！')
        });
        var alink=document.createElement("a");
        alink.href=url+"?data=" + encodeURIComponent(JSON.stringify(sendData));
        //后台设置了文件下载的filename，download设置的名称被覆盖，downlaod属性可有可无
        alink.download="导出的报表";
        alink.click();
        //清除垃圾
        setTimeout(function(){
            alink=null;
        },50);
}
/**
 * 检查功能
 */
/*checkAdmission();
 function checkAdmission() {
 var admission =  $("body").find("*[hideAdmission]");
 for(var i=0; i<admission.length; i++){
 /!*$("body").off("click",admission.eq(i));*!/
 //if(admission.eq(i).attr("hideAdmission") == "hide"){
 admission.eq(i).bind("click",function () {
 admission.eq(i).unbind(); //解绑点击事件
 top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦!");

 });

 /!*top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦!");*!/
 //}
 /!*admission.eq(i).bind("click",function () {
 top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦!");
 });*!/
 /!*if(admission.eq(i).attr("hideAdmission") == "hide"){
 admission.eq(i).unbind(); //解绑点击事件
 top.ff.tips("info","您需开通铂金会员才有权限使用该功能哦!");
 }*!/
 }
 }*/
/**
 * 禁用右键查看源码
 * @returns {boolean}
 */
//$(document).ready(function () {
//    $(document).bind("contextmenu", function (e) {
//        return false;
//    });
//    $("*").keydown(function (e) {   //判断按键
//        e = window.event || e || e.which;
//        if (e.keyCode == 112 || e.keyCode == 113
//            || e.keyCode == 114 || e.keyCode == 115
//            || e.keyCode == 117
//            || e.keyCode == 118 || e.keyCode == 119
//            || e.keyCode == 120 || e.keyCode == 121
//            || e.keyCode == 122 || e.keyCode == 123) {
//            e.keyCode = 0;
//            return false;
//        }
//    });
//});
/**
 * 免费版系统提示请升级
 */
/*function hideAdmission($thisObj) {
 var $url = window.location.origin;
 /!*console.log($url);
 top.ff.tips("info","此功能为收费功能，请续费升级！");*!/
 //if($url == "http://test.fqweb.pms.efanghang.com"){
 //添加不链接的自定义属性
 $(this).attr("hideAdmission","hide");
 top.ff.tips("info","此功能为收费功能，请续费升级！");
 //}
 }*/
/**
 * 显示指定div，点击其它则隐藏
 */
$(document).bind("click", function (e) {
    if ($(getSrcElement()).parents("div[isShowTarget=true]").length == 0) {
        $(document).find("div[isShowTarget]").attr("isShowTarget", "false").hide();
    }
    if (!isNull($(getSrcElement()).attr("targetScope"))) {
        $(getSrcElement()).parents($(getSrcElement()).attr("targetScope")).find($(getSrcElement()).attr("showTarget")).attr("isShowTarget", "true").show();
    } else {
        $($(getSrcElement()).attr("showTarget")).attr("isShowTarget", "true").show();
    }
});

/**
 * 获取源对象，解决火狐与谷歌兼容
 * @type {Event}
 */
function getEvent() {
    if (document.all)
        return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
                || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}

function getSrcElement() {
    return getEvent().srcElement || getEvent().target;
}

/**
 * 格式化字符串，超出部分...
 * @param arg1
 * @param length
 */
function strTips(arg1, length) {
    var $val = arg1;
    if (length) {
        $val = arg1.substr(0, length) + "...";
    }
    var $tip = '<tip alt="' + arg1 + '" onmouseover="mouseTips(this)">' + $val + '</tip>';
    return $tip;
}

function mouseTips($this) {
	if ($($this).attr("alt")){
		layui.layer.tips($($this).attr("alt"), $this, {
	        tips: [3, '#86b22f'],
	        time: 0
	    });
	    $($this).unbind("mouseout");
	    $($this).mouseout(function () {
	        layui.layer.closeAll("tips");
	    });
	}
}

function mouseTip($this) {
    layui.layer.tips($($this).html(), $this, {
        tips: [3, '#86b22f'],
        time: 0
    });
    $($this).unbind("mouseout");
    $($this).mouseout(function () {
        layui.layer.closeAll("tips");
    });
}

/**
 * 格式化字符串，超出部分...（不超出正常显示）
 * @param arg1
 * @param length
 */
function strTipsEr(arg1, length) {
    var $val = arg1;
    if ($val.length > length) {
        $val = arg1.substr(0, length) + "...";
    } else {
        $val = arg1.substr(0, length);
    }
    var $tip = '<tip alt="' + arg1 + '" onmouseover="mouseTips(this)">' + $val + '</tip>';
    return $tip;
}

/**
 * 判断某个值是否为空，为空返回true，否则返回false
 * @param value  传入参数
 * @returns {boolean}
 */
function isNull(value) {
    if ($.trim(value).length == 0 || $.trim(value) == "undefined" || $.trim(value) == "" || $.trim(value) == "null") {
        return true;
    }
    return false;
}

//如果字符串为null则转换为指定提示信息
function strFormat(arg1, tipMsg) {
    try {
        if (isNull(arg1)) {
            if (isNull(tipMsg)) {
                return "";
            }
            return tipMsg;
        }
        return (arg1 + "").replace(/<[^>]+>/g, "");
    } catch (e) {
        return "";
    }
}

//----------------------在iframe中获取指定页面对象 start--------------------
/**
 * 获取指定iframe对象
 * @param arg1
 * @returns {*}
 */
function getIframe(arg1) {
    var iframeList = new Array();
    iframeList = findIframe(top.document, iframeList);
    for (var i = 0; i < iframeList.length; i++) {
        var currentObj = iframeList[i].contentDocument.getElementById(arg1);
        if (!isNull(currentObj)) {
            return iframeList[i];
        }
    }
}

/**
 * 获取所有的iframe
 * @param arg
 */
function findIframe(arg, iframeList) {
    var $iframe = "";
    if (iframeList.length <= 0) {
        $iframe = arg.getElementsByTagName("iframe");
    } else {
        $iframe = arg.contentDocument.getElementsByTagName("iframe");
    }
    for (var i = 0; i < $iframe.length; i++) {
        iframeList.push($iframe[i]);
        findIframe($iframe[i], iframeList);
    }
    return iframeList;
}

//----------------------在iframe中获取指定页面对象 end--------------------
/**
 * 获取URL地址参数
 * @param name  参数名称
 * @param url  url地址，如果为空，默认是当前地址
 * @returns {string}
 */
function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == "") {
        url = window.location.href;
    }
    url = url.substring(url.indexOf("?"));
    r = url.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return "";
}

/**
 * 获取父页面URL地址参数
 * @param name  参数名称
 * @param url  url地址，如果为空，默认是当前地址
 * @returns {string}
 */
function getParentQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == "") {
        url = parent.document.location.href;
    }
    url = url.substring(url.indexOf("?"));
    r = url.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return "";
}

/**
 * 获取地址栏参数并转码
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null) return decodeURI(r[2]);
    return null;
}

function ChangeURLParm(Turl, Parm, PValue, ClearParm) {
    //Turl: 网址
    //Parm： 参数
    //PValue： 参数值
    //ClearParm: 要清除的参数
    var URL, Parms, ParmsArr, IsExist;
    var NewURL = Turl;//window.location.href
    IsExist = false;
    with (Turl) {
        if (indexOf('?') > 0) {
            URL = substr(0, indexOf('?'));//不包含参数
            Parms = substr(indexOf('?') + 1, length);//参数
        }
        else {
            URL = Turl;
            Parms = '';
        }
    }
    if (Parms != '') {
        var i;
        ParmsArr = Parms.split("&");
        for (i = 0; i <= ParmsArr.length - 1; i++) {
            if (String(Parm).toUpperCase() == String(ParmsArr[i].split("=")[0]).toUpperCase()) {//原来有参数Parm则改变其值
                ParmsArr[i] = Parm + "=" + PValue;
                IsExist = true;
                if (String(ClearParm) == "") {
                    break;
                }
            }
            else if ((String(ClearParm) != "") && (String(ClearParm).toUpperCase() == String(ParmsArr[i].split("=")[0])).toUpperCase()) {//去掉参数ClearParm的值
                ParmsArr[i] = ClearParm + "=";
            }
        }

        for (i = 0; i <= ParmsArr.length - 1; i++) {
            if (i == 0) {
                Parms = ParmsArr[i];
            }
            else {
                Parms = Parms + "&" + ParmsArr[i];
            }
        }
        NewURL = URL + "?" + Parms;
        if (!IsExist) {
            NewURL = NewURL + "&" + Parm + "=" + PValue;
        }
    }
    else {
        NewURL = URL + "?" + Parm + "=" + PValue;
    }
    return NewURL;
}

/**
 * 设置items 缓存
 * @param name
 * @param value
 */
function setItems(name, value) {
    if (window.localStorage) {
        window.localStorage.setItem(name, value);
    } else {
        setCookie(name, value);
    }
}

/**
 * 获取items 缓存
 * @param name key值
 * @returns {string}
 */
function getItems(name) {
    var value = "";
    if (window.localStorage) {
        value = window.localStorage.getItem(name);
    } else {
        value = getCookie(name);
    }
    return value;
}

/**
 * 获取items 缓存
 * @param name key值
 * @returns {string}
 */
function getItemsClear(name) {
    var value = "";
    if (window.localStorage) {
        value = window.localStorage.getItem(name);
    } else {
        value = getCookie(name);
    }
    delItems(name);
    return value;
}

/**
 * 设置items 缓存
 * @param name
 * @param obj
 */
function setItemsObj(name, obj) {
    obj = JSON.stringify(obj);
    if (window.localStorage) {
        window.localStorage.setItem(name, obj);
    } else {
        setCookie(name, obj);
    }
}

/**
 * 获取items 缓存
 * @param name key值
 * @returns {obj}
 */
function getItemsObj(name) {
    var obj = "";
    if (window.localStorage) {
        obj = window.localStorage.getItem(name);
    } else {
        obj = getCookie(name);
    }
    obj = JSON.parse(obj);
    return obj;
}

/**
 * 获取items 缓存
 * @param name key值
 * @returns {obj}
 */
function getItemsObjClear(name) {
    var obj = "";
    if (window.localStorage) {
        obj = window.localStorage.getItem(name);
    } else {
        obj = getCookie(name);
    }
    obj = JSON.parse(obj);
    delItems(name);
    return obj;
}

/**
 * 删除itemss 缓存
 * @param name key值
 */
function delItems(name) {
    if (window.localStorage) {
        window.localStorage.removeItem(name);
    } else {
        delCookie(name);
    }

}

/**
 * 清空items缓存
 */
function clearItems() {
    try {
        window.localStorage.clear();
    } catch (e) {
        clearCookie();
    }

}

//休眠
function sleep(n) { //n表示的毫秒数
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}

//清空
function trim(s) {
    return s.replace(/[ ]/g, "")
}

/**
 * 打开一个窗体
 * @param url
 * @param name
 * @param width
 * @param height
 */
function windowOpen(url, name, width, height) {
    var top = parseInt((window.screen.height - height) / 2, 10), left = parseInt((window.screen.width - width) / 2, 10),
        options = "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes," +
            "resizable=yes,scrollbars=yes," + "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    window.open(url, name, options);
}

/**
 * cookie操作
 * @param name
 * @param value
 * @param options
 * @returns {*}
 */
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

/**
 * 数字前补0
 * @param num
 * @param n
 * @returns {*}
 */
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

/**
 * 检查表单提交字段非空判断
 * @param formObj  表单对象ID 不局限任何html标签
 * @returns {boolean}  返回true 表示验证通过
 */
function checkField(formObj) {
    if (isNull(formObj)) {
        return true;
    }
    //1.获取所有必填对象
    //2.去除display:none的元素的判断-陈雷涛修改,除select外(layui渲染select样式时将原来的select隐藏了)
    var objList = $(formObj).find("*[mustField]:visible,.layui-form select[mustField]");
    if (objList.length > 0) {
        for (var i = 0; i < objList.length; i++) {
            //2.判断对象类型
            var obj = $(objList[i]);
            if (obj.is('input')) {
                //单行文本框-必填
                //3.获取当前遍历对象值判断是否为空
                if (isNull(obj.val())) {
                    //返回结果 如果为空 把mustFiled中的类容显示出来，并返回 return false
                    obj.focus();//获取焦点、
                    layer.tips(obj.attr("mustField"), obj, {
                        tips: [3, '#FF784E']
                    });
                    return false;
                } else if (strFormat(obj.attr("checkType"), "") == '0') {
                    //判断身份证号是否正常
                    obj.focus();//获取焦点、
                    layer.tips(obj.attr("checkTypeYu"), obj, {
                        tips: [3, '#FF784E']
                    });
                    return false;
                }
            } else if (obj.is('select')) {
                //下拉列表-必填
                if (isNull(obj.val()) || obj.val() < 0) {
                    top.ff.tips("info",obj.attr("mustField"));
                    return false;
                }
            } else if (obj.is('textarea')) {
                //多行文本框-必填
                if (isNull(obj.val())) {
                    top.ff.tips("info",obj.attr("mustField"));
                    obj.focus();//获取焦点
                    return false;
                }
            }
        }
    }
    return true;
}

//json参数封装
function toRequestData(data) {
    return "data=" + encodeURI(JSON.stringify(data));
}
var tipiNum = 0;
jQuery.send = function (dataArg) {
    var host = (dataArg.host == null || dataArg.host == "" || typeof (dataArg.host) == "undefined") ? ipStr : dataArg.host;
    var url = dataArg.url;
    if (url.indexOf("http://") < 0) {
        url = host + url;
    }
    var async = (dataArg.async == null || dataArg.async == "" || typeof (dataArg.async) == "undefined") ? "true" : dataArg.async;//是同步请求还是异步请求
    var type = (dataArg.type == null || dataArg.type == "" || typeof (dataArg.type) == "undefined") ? "post" : dataArg.type;//请求类型
    var dataType = (dataArg.dataType == null || dataArg.dataType == "" || typeof (dataArg.dataType) == "undefined") ? "json" : dataArg.dataType;//返回格式
    var data = (dataArg.data == null || dataArg.data == "" || typeof (dataArg.data) == "undefined") ? { "sendDate": new Date().getTime() } : dataArg.data;//请求数据
    var self = (dataArg.self == null || dataArg.self == "" || typeof (dataArg.self) == "undefined") ? "" : dataArg.self;//点击发送请求对象
    var isLoading = (dataArg.isLoading == null || dataArg.isLoading == "" || typeof (dataArg.isLoading) == "undefined") ? "false" : dataArg.isLoading;//是否需要加载动画
    var loadingType = (dataArg.loadingType == null || dataArg.loadingType == "" || typeof (dataArg.loadingType) == "undefined") ? "" : dataArg.loadingType;//是否需要加载动画
    var dataJson = {
        userid: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id,
        token: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token,
        gcid: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).gcid,
        params: data
    };
    //如果子参数中包含gcid，则子参数值自动覆盖上一级相同参数值
    if (!(data.gcid == null || data.gcid == "" || typeof (data.gcid) == "undefined")) {
        dataJson.gcid = data.gcid;
    }
    //禁止同时发送多次重复请求
    if (!isNull(self)) {
        if ($(self).attr("isClick") == "false") {
            //结束本次请求
            return;
        } else {
            $(self).attr("isClick", "false");
        }
    }
    var tokVal = strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token;
    var timeStampVal = JSON.stringify(new Date().getTime());

    var sendEnDataJson = "";
    var needEncrypt = 0;
    if (isEncrypt == "user encrypt") {
        sendEnDataJson = base_encode_salt(JSON.stringify(dataJson), tokVal, timeStampVal); //加密
        needEncrypt = 1;
    } else {
        sendEnDataJson = JSON.stringify(dataJson);
    }
    $.ajax({
        type: type,
        async: async,
        // data: JSON.stringify(dataJson),
        // data:  new Base64().encode(JSON.stringify(dataJson)), //加密
        data: sendEnDataJson, //加密
        url: url,
        dataType: dataType,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/javascript;charset=UTF-8");
            xhr.setRequestHeader("Request-Type", "body");
            xhr.setRequestHeader("isEncrypt", needEncrypt);
            xhr.setRequestHeader("timeStamp", timeStampVal);
            xhr.setRequestHeader("gcid", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).gcid);
            xhr.setRequestHeader("token", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token);
            xhr.setRequestHeader("userid", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id);
            var nowGcid0 = strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).gcid;
            if (!isNull(nowGcid0) && tipiNum == 0){
                tipiNum ++;
                if (nowGcid0 == '03510005' || nowGcid0 == '03000013' ||  nowGcid0 == '0531015'|| nowGcid0 == '0351008'||nowGcid0 == '028077'||nowGcid0 == '0291013'||nowGcid0 == '021176'||nowGcid0 == '05000013'){
                    // SOKAYO　180828　定制化项目不需要判断
                    // var tiShiCon="为保障系统的稳定，现更换登录地址为：http://zhd.pms.efanghang.com  请记录保存，方便下次快速访问！感谢您的支持与理解!";
                    // var linkTo ="http://zhd.pms.efanghang.com";
                    // top.layer.open({
                    //     type: 2,
                    //     title: false,
                    //     content: 'tanCeng/tiShiTo.html?parentBodyId=refundMoney&tiShiCon=' + tiShiCon +'&linkTo='+linkTo,
                    //     area: ['450px', '210px'],
                    //     cancel:function () {
                    //         window.location.href = 'http://zhd.pms.efanghang.com';
                    //     }
                    // });
                    // return false;

                }else {
                    // if(window.confirm('为保障系统的稳定，先更换登录地址为：http://fangqian.pinganfang.com/login.html  请记录保存，方便下次快速访问！感谢您的支持与理解')){
                    //     //alert("确定");
                    //
                    //     window.location.href = 'http://fangqian.pinganfang.com/login.html';
                    //     return false;
                    // }else{
                    //     //alert("取消");
                    //     window.location.href = 'http://fangqian.pinganfang.com/login.html';
                    //     return false;
                    // }
                }
            }
            tipiNum ++;
            //加载层-默认风格
            if (isLoading == "true") {
                layer.load(0, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            }
            //加载前
            if (dataArg.beforeSend == null || dataArg.beforeSend == "" || typeof (dataArg.beforeSend) == "undefined") {
            } else {
                dataArg.beforeSend(xhr);
            }
            // loadingType{1:当前对象左边加载,2:当前对象上方加载,3:当前对象右方加载，4：当前对象下方加载}
            if (!isNull(self) && loadingType == "1") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            } else if (!isNull(self) && loadingType == "2") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            }

        },
        success: function (d, status, xhr) {
            //加载成功
            if (dataArg.success == null || dataArg.success == "" || typeof (dataArg.success) == "undefined") {
            } else {
                /* SOKAYO  */
                // console.log("ｓｓｓ" +　d);
                /* SOKAYO 180822 判断是否权限修改  */
                if(d.status.code == "1000" || d.status.code == 1000){
                    $("#changePermissions",parent.document).css({
                        display:"block"
                    });
                    return
                }
                if (isEncrypt == "user encrypt") {
                    dataArg.success(JSON.parse(base_decode_salt(d, tokVal, xhr.getResponseHeader("timeStamp"))));
                } else {
                    dataArg.success(d);
                }

            }
        },
        error: function (r,s,e) {
            layer.closeAll('loading');
            if(r.status!=0){
                top.ff.tips("error","网络异常，请稍后重试！");
            }
            //加载失败
            if (dataArg.error == null || dataArg.error == "" || typeof (dataArg.error) == "undefined") {
                // top.ff.tips("error","网络异常，请稍后重试！");
            } else {
                dataArg.error(e);
            }
        },
        complete: function () {
            //加载完成
            if (dataArg.complete == null || dataArg.complete == "" || typeof (dataArg.complete) == "undefined") {
            } else {
                dataArg.complete();
            }
            //此处加载动画关闭
            if (isLoading == "true") {
                layer.closeAll('loading');
            }
            if (!isNull(self)) {
                //恢复点击事件
                $(self).attr("isClick", "true");
                //移除当前对象加载动画
                if (!isNull(loadingType)) {
                    $(self).find("i").remove();
                }
            }
        }
    });
};
jQuery.sends = function (dataArg) {
    var host = (dataArg.host == null || dataArg.host == "" || typeof (dataArg.host) == "undefined") ? ipStr : dataArg.host;
    var url = dataArg.url;
    if (url.indexOf("http://") < 0) {
        url = host + url;
    }
    var async = (dataArg.async == null || dataArg.async == "" || typeof (dataArg.async) == "undefined") ? "true" : dataArg.async;//是同步请求还是异步请求
    var type = (dataArg.type == null || dataArg.type == "" || typeof (dataArg.type) == "undefined") ? "post" : dataArg.type;//请求类型
    var dataType = (dataArg.dataType == null || dataArg.dataType == "" || typeof (dataArg.dataType) == "undefined") ? "json" : dataArg.dataType;//返回格式
    var data = (dataArg.data == null || dataArg.data == "" || typeof (dataArg.data) == "undefined") ? { "sendDate": new Date().getTime() } : dataArg.data;//请求数据
    var self = (dataArg.self == null || dataArg.self == "" || typeof (dataArg.self) == "undefined") ? "" : dataArg.self;//点击发送请求对象
    var isLoading = (dataArg.isLoading == null || dataArg.isLoading == "" || typeof (dataArg.isLoading) == "undefined") ? "false" : dataArg.isLoading;//是否需要加载动画
    var loadingType = (dataArg.loadingType == null || dataArg.loadingType == "" || typeof (dataArg.loadingType) == "undefined") ? "" : dataArg.loadingType;//是否需要加载动画
    var dataJson = {
        userid: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id,
        token: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token,
        params: data
    };
    //禁止同时发送多次重复请求
    if (!isNull(self)) {
        if ($(self).attr("isClick") == "false") {
            //结束本次请求
            return;
        } else {
            $(self).attr("isClick", "false");
        }
    }
    var tokVal = strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token;
    var timeStampVal = JSON.stringify(new Date().getTime());

    var sendEnDataJson = "";
    var needEncrypt = 0;
    if (isEncrypt == "user encrypt") {
        sendEnDataJson = base_encode_salt(JSON.stringify(dataJson), tokVal, timeStampVal); //加密
        needEncrypt = 1;
    } else {
        sendEnDataJson = JSON.stringify(dataJson);
    }
    $.ajax({
        type: type,
        async: async,
        // data: JSON.stringify(dataJson),
        // data:  new Base64().encode(JSON.stringify(dataJson)), //加密
        data: sendEnDataJson, //加密
        url: url,
        dataType: dataType,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/javascript;charset=UTF-8");
            xhr.setRequestHeader("Request-Type", "body");
            xhr.setRequestHeader("isEncrypt", needEncrypt);
            xhr.setRequestHeader("timeStamp", timeStampVal);
            xhr.setRequestHeader("token", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token);
            xhr.setRequestHeader("userid", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id);
            tipiNum ++;
            //加载层-默认风格
            if (isLoading == "true") {
                layer.load(0, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            }
            //加载前
            if (dataArg.beforeSend == null || dataArg.beforeSend == "" || typeof (dataArg.beforeSend) == "undefined") {
            } else {
                dataArg.beforeSend(xhr);
            }
            // loadingType{1:当前对象左边加载,2:当前对象上方加载,3:当前对象右方加载，4：当前对象下方加载}
            if (!isNull(self) && loadingType == "1") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            } else if (!isNull(self) && loadingType == "2") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            }

        },
        success: function (d, status, xhr) {
            //加载成功
            if (dataArg.success == null || dataArg.success == "" || typeof (dataArg.success) == "undefined") {
            } else {
                /* SOKAYO  */
                // console.log("ｓｓｓ" +　d);
                /* SOKAYO 180822 判断是否权限修改  */
                if(d.status.code == "1000" || d.status.code == 1000){
                    $("#changePermissions",parent.document).css({
                        display:"block"
                    });
                    return
                }
                if (isEncrypt == "user encrypt") {
                    dataArg.success(JSON.parse(base_decode_salt(d, tokVal, xhr.getResponseHeader("timeStamp"))));
                } else {
                    dataArg.success(d);
                }

            }
        },
        error: function (r,s,e) {
            layer.closeAll('loading');
            if(r.status!=0){
                top.ff.tips("error","网络异常，请稍后重试！");
            }
            //加载失败
            if (dataArg.error == null || dataArg.error == "" || typeof (dataArg.error) == "undefined") {
                // top.ff.tips("error","网络异常，请稍后重试！");
            } else {
                dataArg.error(e);
            }
        },
        complete: function () {
            //加载完成
            if (dataArg.complete == null || dataArg.complete == "" || typeof (dataArg.complete) == "undefined") {
            } else {
                dataArg.complete();
            }
            //此处加载动画关闭
            if (isLoading == "true") {
                layer.closeAll('loading');
            }
            if (!isNull(self)) {
                //恢复点击事件
                $(self).attr("isClick", "true");
                //移除当前对象加载动画
                if (!isNull(loadingType)) {
                    $(self).find("i").remove();
                }
            }
        }
    });
};
/**
 * 提示弹框
 * @param promptCon  提示内容
 */
function showPromptWin(promptCon) {
    var $prompt = '';
    $prompt += '<div style="width: auto; height: auto; padding: 20px; overflow: hidden;">';
    $prompt += '<p style="width: 100%; height: 60px; line-height: 30px; font-size: 14px; text-indent: 1em; overflow: hidden">' + promptCon + '</p>';
    $prompt += '<button onclick="closePromptWin(this)" style="width: auto; height: 40px; line-height: 40px; font-size: 16px; color: #fff;border: 0; border-radius: 4px; background: #86b22f; padding: 0 20px; margin-top: 20px; float: right; cursor: pointer; overflow: hidden;">确定</button>';
    $prompt += '</div>';
    return $prompt;
}

/**
 * 关闭提示弹框
 * @param $this
 */
function closePromptWin($this) {
    layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
    $($this).parent().hide();
}

/**
 * 收支详情弹层
 * @param dataArg
 */
jQuery.openWindows = function(dataArg) {
  var id =
    dataArg.id == null || dataArg.id == "" || typeof dataArg.id == "undefined"
      ? ""
      : dataArg.id;
  var content =
    dataArg.content == null ||
    dataArg.content == "" ||
    typeof dataArg.content == "undefined"
      ? ""
      : dataArg.content;
  var area =
    dataArg.area == null ||
    dataArg.area == "" ||
    typeof dataArg.area == "undefined"
      ? ""
      : dataArg.area;
  var title =
    dataArg.title == null ||
    dataArg.title == "" ||
    typeof dataArg.title == "undefined"
      ? ""
      : dataArg.title;
  var offset = dataArg.offset 
  //弹出收支详情
  var openWindow = $('<div id="' + id + '" class="odfly-windows"></div>');
  $("body").append(openWindow);
  var contentHtml = '<div class="odfly-windows-shade"></div>';
  contentHtml += '<div class="odfly-windows-content">';
  contentHtml +=
    '<h3 class="odfly-windows-title">' + title + "<span> </span></h3>";
  contentHtml +=
    '<iframe src="" frameBorder=0 scrolling=no width="100%" height="100%"></iframe>';
  contentHtml += "</div>";
  $(openWindow).append(contentHtml);
  //弹出收支详情  end
  //设置点击之后需要改变之后的样式，以达到动画效果
  var csss = {}
  csss.height = area[1]
  csss.borderWidth = 0
  if(offset){
    offset.top ? csss.top = offset.top : ''
    offset.bottom ? csss.bottom = offset.bottom : ''
    offset.left ? csss.left = offset.left : ''
    offset.right ? csss.right = offset.right : ''
  }
//   top.$('.layout-top').css('z-index',99999)
//   top.$('.nav-personalCenter').css('z-index',99999)
//   top.$('#shenQingLoan').css('z-index',99999)
  $(openWindow)
    .find(".odfly-windows-content")
    .css(csss);
  $(openWindow)
    .find(".odfly-windows-content")
    .animate({ width: area[0]},500);
  $(openWindow)
    .find("iframe")
    .attr("src", content);

  $(openWindow)
    .find("h3 span")
    .click(function() {
      $(openWindow)
        .find(".odfly-windows-content")
        .animate({ width: "0" });
      openWindow.hide();
      setTimeout(function() {
        openWindow.remove();
        top.$('.layout-top').css('z-index',0)
        top.$('.nav-personalCenter').css('z-index',0)
        top.$('#shenQingLoan').css('z-index',0)
      }, 1000);
    });
  setTimeout(function() {
    $(openWindow).click(function() {
      $(openWindow)
        .find(".odfly-windows-content")
        .animate({ width: "0" });
      openWindow.hide();
      setTimeout(function() {
        openWindow.remove();
        // top.$('.layout-top').css('z-index',0)
        // top.$('.nav-personalCenter').css('z-index',0)
        // top.$('#shenQingLoan').css('z-index',0)
      }, 1000);
    });
    setTimeout(function () {
        $(openWindow).click(function () {
            $(openWindow).find(".odfly-windows-content").animate({ width: "0" });
            openWindow.hide();
            setTimeout(function () {
                openWindow.remove()
            }, 1000);
        })
    }, 500)
  })
};
/**
 * 页面加载完成后执行
 */
$(document).ready(function () {
    initDict($(document));//页面加载完毕后，立即初始化字典
});

/**
 * 初始化当前页面字典元素
 */
function initDict(elem, complete) {
    //1.获取所有必填对象
    var objList = $(elem).find("*[initDict]");
    if (objList.length > 0) {
        for (var i = 0; i < objList.length; i++) {
            var obj = $(objList[i]);
            var sendData = {};
            sendData.mark = obj.attr("initDict");
			sendData.hetong = obj.attr("hetong");
            sendData.currentObj = obj;
            loadDict(sendData, complete);
        }
    }
}

/**
 * 向服务器获取字典信息
 * @param sendData
 * 获取费用类型
 */
function loadDict(sendData, complete) {
    //给当前对象填充元素
    $.send({
        url: '/v2/sys/zi_dian/get_list_by_mark',
        data: sendData,
        success: function (json) {
            try {
                if (json.status.code == 200) {
                    if (json.result.list.length > 0) {
                    		if (sendData.currentObj.attr("placeholder")){
                    			var html = '<option value="">' + sendData.currentObj.attr("placeholder") + '</option>';
                        		html += '<option value="">' + sendData.currentObj.attr("placeholder") + '</option>';
                    		}
                        $.each(json.result.list, function (n, value) {
                            html += '<option value="' + value.id + '" mark="' + value.mark + '">' + value.key + '</option>';
                        });
                        $(sendData.currentObj).html(html);
                        if (!isNull($(sendData.currentObj).attr("defaultSelectedValue"))) {
                            //执行回显值
                            $(sendData.currentObj).find("option[value=" + $(sendData.currentObj).attr("defaultSelectedValue") + "]").attr("selected", "selected");
                        } else {
                            //执行默认mark
                            $(sendData.currentObj).find("option[mark=" + $(sendData.currentObj).attr("mark") + "]").attr("selected", "selected");
                        }
                        layui.form().render('select');//layui重新渲染select
                    }
                } else {
                    top.ff.tips("error",e);
                }
            } catch (e) {
                //top.ff.tips("info",e);
            }
        }, complete: function () {
            //加载完成
            if (complete == null || complete == "" || typeof (complete) == "undefined") {
            } else {
                complete();
            }
        }
    });
}

// 添加年份
function addYear(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setYear(calculateAdd(date.getFullYear(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    dateStr = year + "-" + month + "-" + day;
    dateStr = addDay(dateStr, -1);
    return dateStr;
}

// 添加月份
function addMonth(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setMonth(calculateAdd(date.getMonth(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    dateStr = year + "-" + month + "-" + day;
    dateStr = addDay(dateStr, -1);
    return dateStr;
}

// 添加日期
function addDay(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setDate(calculateAdd(date.getDate(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    dateStr = year + "-" + month + "-" + day;
    return dateStr;
}

// 减少日期
function shortDay(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setDate(calculateSub(date.getDate(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    dateStr = year + "-" + month + "-" + day;
    return dateStr;
}

// 获取两日期-月份差
function diffMonth(date1, date2) {
    var diffYMD = getDiffDates(date1, date2);
    // 相差月份
    var diffM = diffYMD[0] * 12 + diffYMD[1];
    if (diffYMD[2] != 0) {
        diffM += 1;
    }
    return diffM;
}

/**
 * 获取指定相加年月日后的日期
 * @param date
 * @param addstr
 * @returns {*}
 */
function getDateFor(date, addstr) {
    date = new Date(shortDayBefore(formatDate(date), 1));

    addstr.replace(/(\d+)([年月日])/g, function (s0, s1, s2) {
        switch (s2) {
            case '年':
                date.setFullYear(date.getFullYear() + parseInt(s1));
                break;
            case '月':
                date.setMonth(date.getMonth() + parseInt(s1));
                break;
            case '日':
                date.setDate(date.getDate() + parseInt(s1));
                break;
        }
    });
    var dateReal = formatDate(date);
    return dateReal;
}

/**
 * 将日期格式化为 2018-01-01
 * @param date
 * @returns {string}
 */
function formatDate(date) {
    var fixZero = function (n) {
        return n < 10 ? '0' + n : n;
    };
    var d = new Date(date);
    var y = d.getFullYear();
    var m = fixZero(d.getMonth() + 1);
    var day = fixZero(d.getDate());
    var youWant = y + '-' + m + '-' + day;
    return youWant;
}

/**
 * 去除字符串前的0值  例001变 1
 * @param str
 * @returns {void|XML|*|string}
 */
function shortZero(str) {
    var dateStr = str.replace(/\b(0+)/gi, "")
    return dateStr;
}


/**
 * 获取当前日期
 * @returns {string}
 */
function getDateNow() {
    var d = new Date();
    var str = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
    return str;
}

/**
 * 计算两个日期天数差的函数，通用（火狐不兼容）
 */

function diffDay(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
}

/**
 * 计算两日期差  兼容谷歌，火狐浏览器
 * @param time1  例如（2017-09-10）
 * @param time2  例如（2017-09-14）
 * @returns {string}
 */
function diy_time(time1, time2) {
    var $time1 = Date.parse(new Date(time1));
    var $time2 = Date.parse(new Date(time2));
    var $time3 = Math.abs(parseInt(($time2 - $time1) / 1000 / 3600 / 24));  //两日期差天数
    return $time3;
}
/**
 * 获取两日期之间所有具体日期-原型
 * @returns {string}
 */
Date.prototype.format = function() {
    var s = '';
    var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};
/**
 * 获取两日期之间所有具体日期-返回数组
 * @param begin
 * @param end
 */
function getAllConcreteDayForTwo(begin, end) {
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    var arr = [];
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    for (var k = unixDb; k <= unixDe;) {
        //console.log((new Date(parseInt(k))).format());
        arr.push((new Date(parseInt(k))).format());
        k = k + 24 * 60 * 60 * 1000;
    }
    return arr;
}
/**
 * 比较两日期大小
 * @param date1
 * @param date2
 * @returns {boolean}
 */
function compareDate(date1, date2) {
    var startDate = (typeof date1 == "object" ? date1 : strConvertDate(date1));
    var endDate = (typeof date2 == "object" ? date2 : strConvertDate(date2));
    if (startDate.getTime() > endDate.getTime()) {
        return false;
    } else {
        return true;
    }
}
/**
 * 识别日期对应周几
 * @param date
 * @returns {*}
 */
function getMyDay(date){
    var week;
    if(date.getDay()==0) week="周日"
    if(date.getDay()==1) week="周一"
    if(date.getDay()==2) week="周二"
    if(date.getDay()==3) week="周三"
    if(date.getDay()==4) week="周四"
    if(date.getDay()==5) week="周五"
    if(date.getDay()==6) week="周六"
    return week;
}
// 字符串日期格式化成date
function strConvertDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, function (a) {
        return parseInt(a, 10) - 1;
    }).match(/\d+/g) + ')');
    return date;
}

/**
 * 获取当前年
 */
function getYear() {
    var d = new Date();

    function addzero(v) {
        if (v < 10) return '0' + v;
        return v.toString();
    }

    var year = d.getFullYear().toString();
    return year;
}

/**
 * 获取当前月
 */
function getMonth() {
    var d = new Date();

    function addzero(v) {
        if (v < 10) return '0' + v;
        return v.toString();
    }

    var month = addzero(d.getMonth() + 1);
    return month;
}

// 获取指定年，月的最后一天
function getMonthDay(year, month) {
    var day = new Date(year, month, 0);
    // 获取当月最后一天日期
    var lastday = day.getDate();
    return lastday;
}

// 获取日期差的年月日 -按照30天计算
function getDiffDates(date1, date2) {
    var dates = "";
    var diffList = new Array();
    var startDate = (typeof date1 == "object" ? date1 : strConvertDate(date1));
    var endDate = (typeof date2 == "object" ? date2 : strConvertDate(date2));
    // 开始时间
    var startY = startDate.getFullYear();
    var startM = startDate.getMonth();
    var startD = startDate.getDate();
    var startDayOfMonth = getMonthDay(startY, startM);
    // 结束时间
    var endY = endDate.getFullYear();
    var endM = endDate.getMonth();
    // 处理起止日期为同一天，默认服务为一天 示例：2016-01-01 至 2016-01-01
    var endD = endDate.getDate() + 1;
   // console.log(startY, startM, startD, endY, endM, endD);
    var endDayOfMonth = getMonthDay(endY, endM + 1);
    var lday = endD - startD;
    // 每月按照30天计算
    if (endD < startD) {
        endM = endM - 1;
        lday = 30 - startD + endD;
    }

    /*
     * 按照正常日期计算 if (lday<0) { endM = endM -1; lday = startDayOfMonth+ lday; }
     */
    if (lday < 0) {
        endM = endM - 1;
        lday = startDayOfMonth + lday;
    }
    // 处理服务天数问题，示例：2016-01-01 到 2017-12-31 实际上是1年
    if (lday == endDayOfMonth) {
        endM = endM + 1;
        lday = 0;
    }
    var mos = (endY - startY) * 12 + (endM - startM);
    var lyear = Math.floor(mos / 12);
    var lmonth = mos % 12;
    if (lyear == 0 && lmonth == 0) {
        var month1 = startDate.getMonth();
        var month2 = endDate.getMonth();
        if (month1 != month2) {
            //计算开始日期距其本月最后一天有几天
            lday = calculateSub(getCurrentMonthFirsts(startDate, 1), startD);
            //计算结束日期当月第一天距结束日期的天数
            lday += endD;
            if (lday == 0) {
                lday = 1;
            }
        }
    }


    diffList.push(lyear);
    diffList.push(lmonth);
    diffList.push(lday);
    return diffList;


}

/**
 * 获取两日期之间的差值-真实差值
 * @param date1
 * @param date2
 * @returns {*}
 */
function getDiffDatesReal(date1, date2) {
    var diffList = new Array();
    var fixDate = function (date, isAdd) {
        var aD = date.split('-');
        for (var i = 0; i < aD.length; i++) {
            aD[i] = fixZero(parseInt(aD[i]));
        }

        return aD.join('-');
    };
    var fixZero = function (n) {
        return n < 10 ? '0' + n : n;
    };
    var fixInt = function (a) {
        for (var i = 0; i < a.length; i++) {
            a[i] = parseInt(a[i]);
        }
        return a;
    };
    var getMonthDays = function (y, m) {
        var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)) {
            aMonthDays[2] = 29;
        }
        return aMonthDays[m];
    };
    var checkDate = function (date1) {
    };
    var y = 0;
    var m = 0;
    var d = 0;
    var sTmp;
    var aTmp;
    date2 = getNextDay(date2);
    date1 = fixDate(date1);
    date2 = fixDate(date2);
    var aDate1 = date1.split('-');
    aDate1 = fixInt(aDate1);
    var aDate2 = date2.split('-');
    aDate2 = fixInt(aDate2);
    y = aDate2[0] - aDate1[0];
    if (date2.replace(aDate2[0], '') < date1.replace(aDate1[0], '')) {
        y = y - 1;
    }
    //计算月份
    aTmp = [aDate1[0] + y, aDate1[1], fixZero(aDate1[2])];
    while (true) {
        if (aTmp[1] == 12) {
            aTmp[0]++;
            aTmp[1] = 1;
        } else {
            aTmp[1]++;
        }

        if (([aTmp[0], fixZero(aTmp[1]), aTmp[2]]).join('-') <= date2) {
            m++;
        } else {
            break;
        }
    }
    //计算天数
    aTmp = [aDate1[0] + y, aDate1[1] + m, aDate1[2]];
    if (aTmp[1] > 12) {
        aTmp[0]++;
        aTmp[1] -= 12;
    }
    while (true) {
        if (aTmp[2] >= getMonthDays(aTmp[0], aTmp[1])) {
            aTmp[1]++;
            if (aTmp[1] > 12) {
                aTmp[0]++;
                aTmp[1] -= 12;
            }
            aTmp[2] = 1;
        } else {
            aTmp[2]++;
        }
        sTmp = ([aTmp[0], fixZero(aTmp[1]), fixZero(aTmp[2])]).join('-');
        if (sTmp <= date2) {
            d++;
        } else {
            break;
        }
    }
    diffList.push(y);
    diffList.push(m);
    diffList.push(d);
    return diffList;
}

/**
 * 获取指定日期的前一天
 * @param dateArg
 * @param count
 * @returns {string|*}
 */
function shortDayBefore(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setDate(calculateSub(date.getDate(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    dateStr = year + "/" + month + "/" + day;
    return dateStr;
}

/**
 * 获取指定日期的后一天
 * @param d
 * @returns {string}
 */
function getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    //return d;
    //格式化
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

}


// 获取日期差的年月日 -开始结束均为二月按照28天计算 其余按照三十天计算
function getDiffDateser(date1, date2) {
    var dates = "";
    var diffList = new Array();
    var startDate = (typeof date1 == "object" ? date1 : strConvertDate(date1));
    var endDate = (typeof date2 == "object" ? date2 : strConvertDate(date2));
    // 开始时间
    var startY = startDate.getFullYear();
    var startM = startDate.getMonth();
    var startD = startDate.getDate();
    var startDayOfMonth = getMonthDay(startY, startM);
    // 结束时间
    var endY = endDate.getFullYear();
    var endM = endDate.getMonth();
    // 处理起止日期为同一天，默认服务为一天 示例：2016-01-01 至 2016-01-01
    var endD = endDate.getDate() + 1;
    //console.log(startY, startM, startD, endY, endM, endD);
    var endDayOfMonth = getMonthDay(endY, endM + 1);
    var lday = endD - startD;

    if (startM == 1 && endM == 1) {  //开始结束均是2月
        // 每月按照28天计算
        if (endD < startD) {
            endM = endM - 1;
            lday = 28 - startD + endD;
        }
    } else {
        // 每月按照30天计算
        if (endD < startD) {
            endM = endM - 1;
            lday = 30 - startD + endD;
        }
    }
    /*
     * 按照正常日期计算 if (lday<0) { endM = endM -1; lday = startDayOfMonth+ lday; }
     */
    // 处理服务天数问题，示例：2016-01-01 到 2017-12-31 实际上是1年
    if (lday == endDayOfMonth) {
        endM = endM + 1;
        lday = 0;
    }
    var mos = (endY - startY) * 12 + (endM - startM);
    var lyear = Math.floor(mos / 12);
    var lmonth = mos % 12;
    diffList.push(lyear);
    diffList.push(lmonth);
    diffList.push(lday);
    return diffList;
}

/**
 * 将日期转换为时间戳
 * @param objDate
 * @returns {*}
 */
function timeStamp(objDate) {
    var date = objDate;
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    date = date.getTime();
    return date;
}

/**
 * 获取当前时间
 */
function getTime() {
    var d = new Date();

    function addzero(v) {
        if (v < 10) return '0' + v;
        return v.toString();
    }

    var s = d.getFullYear().toString() + '-' + addzero(d.getMonth() + 1) + '-' + addzero(d.getDate());
    return s;
}

/*
 * 获取当前时间
 */
function getCurrent(s) {
    return s < 10 ? '0' + s : s;
}

/**
 * 获取当前时间，包括时分秒
 */
function getCurrentTime() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    var nowTime = year + '-' + getCurrent(month) + "-" + getCurrent(date) + " " + getCurrent(h) + ':' + getCurrent(m) + ":" + getCurrent(s);
    return nowTime;
}

/**
 * 获取当前时间，包括时分，不包括秒
 */
function getCurrentMinutesTime() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    var nowTime = year + '-' + getCurrent(month) + "-" + getCurrent(date) + " " + getCurrent(h) + ':' + getCurrent(m);
    return nowTime;
}

/**
 * 加法
 * @param a
 * @param b
 */
function calculateAdd(a, b) {
    a = a ? a : 0;
    b = b ? b : 0;
    var c, d, e;
    try {
        c = (a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = (b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (calculateMul(a, e) + calculateMul(b, e)) / e;
}

/**
 * 减法
 * @param a
 * @param b
 */
function calculateSub(a, b) {
    a = a ? a : 0;
    b = b ? b : 0;
    var c, d, e;
    try {
        c = (a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = (b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (calculateMul(a, e) - calculateMul(b, e)) / e;
}

/**
 * 乘法
 * @param a
 * @param b
 * @returns {number}
 */
function calculateMul(a, b) {
    a = a ? a : 0;
    b = b ? b : 0;
    var c = 0,
        d = (a).toString(),
        e = (b).toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {
    }
    try {
        c += e.split(".")[1].length;
    } catch (f) {
    }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

/**
 * 除法
 * @param a
 * @param b
 */
function calculateDiv(a, b) {
    a = a ? a : 0;
    b = b ? b : 0;
    var c, d, e = 0,
        f = 0;
    try {
        e = (a).toString().split(".")[1].length;
    } catch (g) {
    }
    try {
        f = (b).toString().split(".")[1].length;
    } catch (g) {
    }
    return c = Number((a).toString().replace(".", "")), d = Number((b).toString().replace(".", "")), calculateMul(c / d, Math.pow(10, f - e));
}

/**
 * 对象排序,升序
 */
function sortAsc(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value2 < value1) {
            return 1;
        } else if (value2 > value1) {
            return -1;
        } else {
            return 0;
        }
    }
}

function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

/**-------------------监听input正在输入中Start---------------*/
var inputLock = true;
$('input').on('compositionstart', function () {
    inputLock = false;
});
$('input').on('compositionend', function () {
    //console.log("true");
    inputLock = true;
});

/**-------------------监听input正在输入中End---------------*/
/**
 * 输入验证
 * int 全数字
 * float 包含小数点的数字
 * char 字母[a-z|A-Z]
 * string 不包含特殊字符的字符串
 * money 金额
 * phone 手机号
 * email 邮箱
 */
function checkVerify(type, len) {
    var obj = $(getSrcElement());
    //验证类型
    if (!isNull(type)) {
        if (type == "int") {
            //只能输入数字类型
            if (!isInt(obj.val())) {
                layer.tips("只能为数字！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "money") {
            //只能输入金额类型
            if (!isMoeny(obj.val())) {
                layer.tips("金额不合法！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }

        } else if (type == "nine"){
            //只能输入 123456789.12
            if (!isNine(obj.val())) {
                layer.tips("业绩值不合法！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "float") {
            //只能输入 123789.12
            if (!isNine(obj.val())) {
                layer.tips("面积不合法！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "english") {
            //只能输入 字母
            if (!isEnglish(obj.val())) {
                layer.tips("只能为字母！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "english_int") {
            //只能输入 字母和数字
            if (!isEnglishInt(obj.val())) {
                layer.tips("只能为数字和字母！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "idCardNo") {   //检测身份证号
            //只能输入 字母和数字
            if (!isEnglishInt(obj.val())) {
                layer.tips("只能为数字和字母！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                if (obj.val().length == '0') {
                    //判断是否为必填项
                    if (obj.attr("mustFieldType") == '0') {
                        obj.removeAttr("mustField");  //如果身份证号为空，移除必填属性
                    }
                } else {
                    layui.layer.closeAll('tips');
                }
            }
        } else if (type == "chek") {    //验证服务协议
            if (!isEnglishInt(obj.val())) {
                layer.tips("只能为数字和字母！", obj, { tips: [3, '#FF784E'], time: 0 });
            } else {
                if (obj.val().length == '0') {
                    //判断是否为必填项
                    if (obj.attr("mustFieldType") == '0') {
                        obj.removeAttr("mustField");  //如果身份证号为空，移除必填属性
                    }
                } else {
                    layui.layer.closeAll('tips');
                }
            }
        } else if (type == "phone") {  //检验手机号
            if (obj.val().length == '0') {
                //判断是否为必填项
                if (obj.attr("mustFieldType") == '0') {
                    obj.removeAttr("mustField");  //如果身份证号为空，移除必填属性
                }
            } else {
                layui.layer.closeAll('tips');
            }
        }
    }
    //验证输入长度
    if (!isNull(len) && inputLock) {
        if (obj.val().length > len) {
            layui.layer.tips("不能超出" + len + "个字符！", obj, {tips: [3, '#FF784E']});
            obj.val(obj.val().substr(0, len));
        }
    }
}


//校验是否全由数字组成
function isNine(s) {
    if (s == "") return true;
    var patrn = /(^[1-9]([0-9]{1,8})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!patrn.exec(s)) return false;
    return true
}

//校验是否全由数字组成
function isInt(s) {
    if (s == "") return true
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.exec(s)) return false
    return true
}

//校验金额
function isMoeny(s) {
    if (s == "") return true
    var patrn = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!patrn.exec(s)) return false
    return true
}

//校验字母
function isEnglish(s) {
    if (s == "") return true
    var patrn = /(^[A-Za-z]+$)/;
    if (!patrn.exec(s)) return false
    return true
}

//校验字母数字
function isEnglishInt(s) {
    if (s == "") return true
    var patrn = /(^[A-Za-z0-9]+$)/;
    if (!patrn.exec(s)) return false
    return true
}

/*  验证手机号  */
function yzPhone(s) {
    if (s == "") return true
    var patrn = /^1(3|4|5|7|8)\d{9}$/;
    if (!patrn.exec(s)) return false
    return true
}

/*--------------- 校验身份证合法性 --------------------*/

/**
 * 身份证数据
 * @type {{idCard: string}}
 */
var idCardData = {
    idCard: ""   //身份证号
};

/**
 * 识别身份证号码真假
 * @param $thisObj
 */
function checkIdCard($thisObj) {
    var $idCard = $thisObj.val();   //身份证号
    idCardData.idCard = $idCard;
    var sendData = idCardData;
    checkIdCardData(sendData, $thisObj);
}

/**
 * 检查身份证合法性
 * @param sendData
 */
function checkIdCardData(sendData, $thisObj) {
    $.send({
        url: "/v2/id/id_card/validate",
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                //身份证不合法
                if (strFormat(data.result.isLegal, '') == 'false') {
                    layer.tips("身份证号不合法！", $thisObj, { tips: [3, '#FF784E'], time: 0 });
                    $thisObj.attr("checkType", '0')
                    if($thisObj.attr("checkTypeYu")){
                        $thisObj.attr("mustField", $thisObj.attr("checkTypeYu"));  //给身份证赋值不合法类型 0 不合法   1 合法
                    }
                } else {
                    layui.layer.closeAll('tips');
                    $thisObj.attr("checkType", '1');  //给身份证赋值不合法类型 0 不合法   1 合法
                }
            } else {
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/*--------------- 校验身份证合法性 end --------------------*/

/**
 * 判断银行卡号是否合格
 * @param num
 * @returns {boolean}
 */
function isIdCardNo(num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    } else {
        return true;
    }
}

/**
 * img 图片放大
 * @param type
 * @param len
 */
function imgZoom($this) {
    //loading层
    var imgLoading = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    var _w = parseInt($(window).width());//获取浏览器的宽度
    var _h = parseInt($(window).height());//获取浏览器的高度
    var realWidth;//真实的宽度
    var realHeight;//真实的高度
    //弹出div
    var $div = '<div id="showBigImages" ondblclick="closePic(this)"><img src="' + $($($this)).attr("bigSrc") + '"/></div>';
    var img = $("<img/>").attr("src", $($this).attr("bigSrc")).load(function () {
        realWidth = this.width;
        realHeight = this.height;
        if (this.width >= _w) {//如果真实的宽度大于浏览器的宽度就按照100%显示
            realWidth = _w;
        } else {//如果小于浏览器的宽度按照原尺寸显示
            realWidth = this.width;
        }
        if (this.height >= _h) {
            realHeight = "100%";
        } else {
            realHeight = this.height;
        }

        /*$div.css({  //这里半透明样式我就不写了
         'width' : 'auto',
         'height' : _h,
         'text-align' : 'center',
         'overflow-y' : 'scroll'
         });*/
        layui.layer.close(imgLoading);
        top.layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: [realWidth, realHeight],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            zIndex: 99999999,
            content: '<div id="showBigImages" style="width:auto; height:auto; text-align:center; overflow-y:scroll;" ondblclick="closePic(this)"><img src="' + $($($this)).attr("bigSrc") + '"/></div>'
        });
    });
}

/**
 * 关闭查看大图
 */
function closePic($thisObj) {
    $($thisObj).parents("body").find(".layui-layer-shade").remove();
    $($thisObj).parent().parent().remove();
}

/**
 * 查看大图（layer）
 */
function showPic($picListCon) {
    //调用示例s
    top.layer.photos({
        zIndex: '99999999',
        photos: $picListCon    //图片集合
        , anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });
}

/**
 * 查看大图
 */
function showBigPic($picThis, $parentBodyId) {
    //查看大图
    var picListArr = [];   //图片集合
    var $picList = $($picThis).parents("ul").find("img[isdata-original=1]");
    if ($picList.length > 0) {
        $.each($picList, function (n, $value) {
            picListArr.push($($value).attr("data-original"));
        });
        var pinIndex = $($picThis).attr("imgIndex");
        setItems("voucherImg", picListArr);
        top.layer.open({
            type: 2,
            title: false,
            shade: [0.5, '#000'],
            area: ['100%', "100%"],
            shadeClose: false,
            resize: false,
            zIndex: 9999999,
            content: "tanCeng/picViewer.html?parentBodyId=" + $parentBodyId + "&pinIndex=" + pinIndex,
            cancel: function () {
                return false;
            }
        });
    }
}

/**
 * 获取36位不重复唯一ID （uuid）
 */
function getUUID() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    var chars = CHARS, uuid = [], i;
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    uuid = uuid.join('');
    //随机替换 “-”
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < 4; i++) {
        var id = Math.ceil(Math.random() * 35);
        uuid = uuid.replace("-", chars[id]);
    }
    return uuid;
}

/**
 * 获取当前时间
 */
function getTime() {
    var d = new Date();

    function addzero(v) {
        if (v < 10) return '0' + v;
        return v.toString();
    }

    var s = d.getFullYear().toString() + '-' + addzero(d.getMonth() + 1) + '-' + addzero(d.getDate());
    return s;
}

/**
 * 获取当前时间（包含时分秒）
 */
function getTimeSecond() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var $dateHours = date.getHours();
    if ($dateHours >= 0 && $dateHours <= 9) {
        $dateHours = "0" + $dateHours;
    }
    var $dateMinutes = date.getMinutes();
    if ($dateMinutes >= 0 && $dateMinutes <= 9) {
        $dateMinutes = "0" + $dateMinutes;
    }
    var $dateSeconds = date.getSeconds();
    if ($dateSeconds >= 0 && $dateSeconds <= 9) {
        $dateSeconds = "0" + $dateSeconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + $dateHours + seperator2 + $dateMinutes
        + seperator2 + $dateSeconds;
    return currentdate;
}

/**
 * 获取今天、明天、后天的日期
 * @param AddDayCount
 * @returns {string}
 * @constructor
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}

/*document.write("前天："+GetDateStr(-2));
 document.write("<br />昨天："+GetDateStr(-1));
 document.write("<br />今天："+GetDateStr(0));
 document.write("<br />明天："+GetDateStr(1));
 document.write("<br />后天："+GetDateStr(2));
 document.write("<br />大后天："+GetDateStr(3));*/
/**
 * 获取当前月的第一天
 * @returns {Date}
 */
function getCurrentMonthFirst() {
    var date = new Date();
    date.setDate(1);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;//获取当前月份的日期
    var d = date.getDate();
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}

/**
 *  获取当前月的最后一天
 * @returns {Date}
 */
function getCurrentMonthLast() {
    var date = new Date();
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var dd = new Date(nextMonthFirstDay - oneDay);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}

/**
 * 封装查看房源详情弹层
 * @param dataArg
 */
jQuery.tipWindows = function (dataArg) {
    var id = (dataArg.id == null || dataArg.id == "" || typeof (dataArg.id) == "undefined") ? "" : dataArg.id;
    var content = (dataArg.content == null || dataArg.content == "" || typeof (dataArg.content) == "undefined") ? "" : dataArg.content;
    var area = (dataArg.area == null || dataArg.area == "" || typeof (dataArg.area) == "undefined") ? "" : dataArg.area;
    var top = (dataArg.top == null || dataArg.top == "" || typeof (dataArg.top) == "undefined") ? "" : dataArg.top;
    var bottom = (dataArg.bottom == null || dataArg.bottom == "" || typeof (dataArg.bottom) == "undefined") ? "" : dataArg.bottom;
    var left = (dataArg.left == null || dataArg.left == "" || typeof (dataArg.left) == "undefined") ? "" : dataArg.left;
    var right = (dataArg.right == null || dataArg.right == "" || typeof (dataArg.right) == "undefined") ? "" : dataArg.right;
    var widths = (dataArg.width == null || dataArg.width == "" || typeof (dataArg.width) == "undefined") ? "" : dataArg.width;
    var heights = (dataArg.height == null || dataArg.height == "" || typeof (dataArg.height) == "undefined") ? "" : dataArg.height;
    var wHeight = (dataArg.wHeight == null || dataArg.wHeight == "" || typeof (dataArg.wHeight) == "undefined") ? "" : dataArg.wHeight;
    var wWidth = (dataArg.wWidth == null || dataArg.wWidth == "" || typeof (dataArg.wWidth) == "undefined") ? "" : dataArg.wWidth;
    //房态详情
    var openWindow = $('<div id="' + id + '" class="odfly-windowss"></div>');
    $("body").append(openWindow);
    var contentHtml = '<div class="odfly-windows-shades"></div>';
    contentHtml += '<div class="odfly-windows-contents">';
    contentHtml += '<span class="san"></span>';
    contentHtml += '<span class="sans"></span>';
    contentHtml += '<iframe src="" frameBorder=0 scrolling=no width="100%" height="100%"></iframe>';
    contentHtml += '</div>';
    $(openWindow).append(contentHtml);
    //点击当前对象位置与浏览器中心距离的比较：如果在浏览器中心左侧，那么弹层出现在当前对象的右侧；
    //                                                  右侧                       左侧
    //                                                  上侧                       下侧
    //                                                  下侧                       上侧
    var $pLeft = '';
    var $pTop = '';
    if (wWidth / 2 > left) {
        $(openWindow).find(".odfly-windows-contents").find('span.san').show();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').hide();
        $pLeft = (left + widths + 27) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top - heights) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', heights * 1.5 + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 2 - heights / 2) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', (top / 1.8) + 'px');
        } else {
            $pTop = (wHeight / 4) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', '270px');
        }
        if (top - heights + parseInt(area[1]) > wHeight) {//解决弹窗溢出窗口问题
            $pTop = wHeight - parseInt(area[1]) - 20 + "px";
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', top - (wHeight - parseInt(area[1]) - 20) + 'px');
        }
    } else {
        $(openWindow).find(".odfly-windows-contents").find('span.san').hide();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').show();
        $pLeft = (left - 470) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top - heights) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', heights * 1.5 + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 2 - heights / 2) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', (top / 1.8) + 'px');
        } else {
            $pTop = (wHeight / 4) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', '270px');
        }
        if (top - heights + parseInt(area[1]) > wHeight) {//解决弹窗溢出窗口问题
            $pTop = wHeight - parseInt(area[1]) - 20 + "px";
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', top - (wHeight - parseInt(area[1]) - 20) + 'px');
        }
    }
    //设置点击之后需要改变之后的样式，以达到动画效果
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft,
        borderWidth: 0
    }, 5);
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft
    });
    $(openWindow).find("iframe").attr("src", content);
    setTimeout(function () {
        $(openWindow).click(function () {
            $(openWindow).find(".odfly-windows-contents").animate({ width: "0" });
            openWindow.hide();
            setTimeout(function () {
                openWindow.remove()
            }, 1000);
        })
    }, 500)
};

/**
 * 封装查看资产详情弹层
 * @param dataArg
 */
jQuery.tipZiChanWindows = function (dataArg) {
    var id = (dataArg.id == null || dataArg.id == "" || typeof (dataArg.id) == "undefined") ? "" : dataArg.id;
    var content = (dataArg.content == null || dataArg.content == "" || typeof (dataArg.content) == "undefined") ? "" : dataArg.content;
    var area = (dataArg.area == null || dataArg.area == "" || typeof (dataArg.area) == "undefined") ? "" : dataArg.area;
    var top = (dataArg.top == null || dataArg.top == "" || typeof (dataArg.top) == "undefined") ? "" : dataArg.top;
    var bottom = (dataArg.bottom == null || dataArg.bottom == "" || typeof (dataArg.bottom) == "undefined") ? "" : dataArg.bottom;
    var left = (dataArg.left == null || dataArg.left == "" || typeof (dataArg.left) == "undefined") ? "" : dataArg.left;
    var right = (dataArg.right == null || dataArg.right == "" || typeof (dataArg.right) == "undefined") ? "" : dataArg.right;
    var widths = (dataArg.width == null || dataArg.width == "" || typeof (dataArg.width) == "undefined") ? "" : dataArg.width;
    var heights = (dataArg.height == null || dataArg.height == "" || typeof (dataArg.height) == "undefined") ? "" : dataArg.height;
    var wHeight = (dataArg.wHeight == null || dataArg.wHeight == "" || typeof (dataArg.wHeight) == "undefined") ? "" : dataArg.wHeight;
    var wWidth = (dataArg.wWidth == null || dataArg.wWidth == "" || typeof (dataArg.wWidth) == "undefined") ? "" : dataArg.wWidth;
    //房态详情
    var openWindow = $('<div id="' + id + '" class="odfly-windowss"></div>');
    $("body").append(openWindow);
    var contentHtml = '<div class="odfly-windows-shades"></div>';
    contentHtml += '<div class="odfly-windows-contents">';
    contentHtml += '<span class="san"></span>';
    contentHtml += '<span class="sans"></span>';
    contentHtml += '<iframe src="" frameBorder=0 scrolling=no width="100%" height="100%"></iframe>';
    contentHtml += '</div>';
    $(openWindow).append(contentHtml);
    //点击当前对象位置与浏览器中心距离的比较：如果在浏览器中心左侧，那么弹层出现在当前对象的右侧；
    //                                                  右侧                       左侧
    //                                                  上侧                       下侧
    //                                                  下侧                       上侧
    var $pLeft = '';
    var $pTop = '';
    if (wWidth / 2 > left) {
        $(openWindow).find(".odfly-windows-contents").find('span.san').show();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').hide();
        $pLeft = (left + widths + 27) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', (top / 16) + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 1.1) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', (top / 7.7) + 'px');
        } else {
            $pTop = '270px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', (top / 5) + 'px');
        }
    } else {
        $(openWindow).find(".odfly-windows-contents").find('span.san').hide();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').show();
        $pLeft = (left - 470) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', (top / 16) + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 1.1) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', (top / 7.7) + 'px');
        } else {
            $pTop = '270px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', (top / 5) + 'px');
        }
    }
    //设置点击之后需要改变之后的样式，以达到动画效果
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft,
        borderWidth: 0
    }, 5);
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft
    });
    $(openWindow).find("iframe").attr("src", content);
    setTimeout(function () {
        $(openWindow).click(function () {
            $(openWindow).find(".odfly-windows-contents").animate({ width: "0" });
            openWindow.hide();
            setTimeout(function () {
                openWindow.remove()
            }, 1000);
        })
    }, 500)
};

/**
 * 封装修改考勤打卡详情弹层
 * @param dataArg
 */
jQuery.oAtipWindows = function (dataArg) {
    var id = (dataArg.id == null || dataArg.id == "" || typeof (dataArg.id) == "undefined") ? "" : dataArg.id;
    var content = (dataArg.content == null || dataArg.content == "" || typeof (dataArg.content) == "undefined") ? "" : dataArg.content;
    var area = (dataArg.area == null || dataArg.area == "" || typeof (dataArg.area) == "undefined") ? "" : dataArg.area;
    var top = (dataArg.top == null || dataArg.top == "" || typeof (dataArg.top) == "undefined") ? "" : dataArg.top;
    var bottom = (dataArg.bottom == null || dataArg.bottom == "" || typeof (dataArg.bottom) == "undefined") ? "" : dataArg.bottom;
    var left = (dataArg.left == null || dataArg.left == "" || typeof (dataArg.left) == "undefined") ? "" : dataArg.left;
    var right = (dataArg.right == null || dataArg.right == "" || typeof (dataArg.right) == "undefined") ? "" : dataArg.right;
    var widths = (dataArg.width == null || dataArg.width == "" || typeof (dataArg.width) == "undefined") ? "" : dataArg.width;
    var heights = (dataArg.height == null || dataArg.height == "" || typeof (dataArg.height) == "undefined") ? "" : dataArg.height;
    var wHeight = (dataArg.wHeight == null || dataArg.wHeight == "" || typeof (dataArg.wHeight) == "undefined") ? "" : dataArg.wHeight;
    var wWidth = (dataArg.wWidth == null || dataArg.wWidth == "" || typeof (dataArg.wWidth) == "undefined") ? "" : dataArg.wWidth;
    //房态详情
    var openWindow = $('<div id="' + id + '" class="odfly-windowss"></div>');
    $("body").append(openWindow);
    var contentHtml = '<div class="odfly-windows-shades"></div>';
    contentHtml += '<div class="odfly-windows-contents">';
    contentHtml += '<span class="san"></span>';
    contentHtml += '<span class="sans"></span>';
    contentHtml += '<iframe src="" frameBorder=0 scrolling=no width="100%" height="100%"></iframe>';
    contentHtml += '</div>';
    $(openWindow).append(contentHtml);
    //点击当前对象位置与浏览器中心距离的比较：如果在浏览器中心左侧，那么弹层出现在当前对象的右侧；
    var $pLeft = '';
    var $pTop = '';
    if (wWidth / 2 > left) {
        $(openWindow).find(".odfly-windows-contents").find('span.san').show();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').hide();
        $pLeft = (left + widths + 27) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top - heights) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', heights * 1.5 + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 2 - heights / 2) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', (top / 1.8) + 'px');
        } else {
            $pTop = (wHeight / 4) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', '270px');
        }
        if (top - heights + parseInt(area[1]) > wHeight) {//解决弹窗溢出窗口问题
            $pTop = wHeight - parseInt(area[1]) - 20 + "px";
            $(openWindow).find(".odfly-windows-contents").find('span.san').css('top', top - (wHeight - parseInt(area[1]) - 20) + 'px');
        }
    } else {
        $(openWindow).find(".odfly-windows-contents").find('span.san').hide();
        $(openWindow).find(".odfly-windows-contents").find('span.sans').show();
        $pLeft = (left - 320) + 'px';
        if (wHeight / 2 > top) {
            $pTop = (top - heights) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', heights * 1.5 + 'px');
        } else if (wHeight / 2 < top) {
            $pTop = (top / 2 - heights / 2) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', (top / 1.8) + 'px');
        } else {
            $pTop = (wHeight / 4) + 'px';
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', '270px');
        }
        if (top - heights + parseInt(area[1]) > wHeight) {//解决弹窗溢出窗口问题
            $pTop = wHeight - parseInt(area[1]) - 20 + "px";
            $(openWindow).find(".odfly-windows-contents").find('span.sans').css('top', top - (wHeight - parseInt(area[1]) - 20) + 'px');
        }
    }
    //设置点击之后需要改变之后的样式，以达到动画效果
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft,
        borderWidth: 0
    }, 5);
    $(openWindow).find(".odfly-windows-contents").animate({
        width: area[0],
        height: area[1],
        top: $pTop,
        left: $pLeft
    });
    $(openWindow).find("iframe").attr("src", content);
    setTimeout(function () {
        $(openWindow).click(function () {
            $(openWindow).find(".odfly-windows-contents").animate({ width: "0" });
            openWindow.hide();
            setTimeout(function () {
                openWindow.remove()
            }, 1000);
        })
    }, 500)
};


/**
 * 获取必填字段
 * @param markType
 * @param mark
 */
function getDecisionMaking(markType, mark) {
    var sendData = {
        markType: markType
    };
    $.send({
        url: "/v2/sys/decision/get_list",
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
                var $list = data.result.list;
                if ($list.length > 0) {
                    $.each($list, function (n, $value) {
                        //按钮类型  1输入框  2单选   3多选   4 日期
                        if ($value.mark == mark) {
                            if ($value.chooseType == "1" || $value.chooseType == "3" || $value.chooseType == "4") {
                                return $value.value;
                            } else if ($value.chooseType == "2") {
                                if ($value.value == "1") {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    })
                }
            }
        }
    })
}

//监听用户行为清除锁屏计时
cleanListenOperate();

function cleanListenOperate() {
    var x;
    var y;
    //监听鼠标
    document.onmousemove = function (event) {
        var x1 = event.clientX;
        var y1 = event.clientY;
        if (x != x1 || y != y1) {
            // count = 0;
            setItems("JJuserOperateTime", new Date().getTime());          //当前操作时间
        }
        x = x1;
        y = y1;
    };

    //监听键盘
    document.onkeydown = function () {
        // count = 0;
        setItems("JJuserOperateTime", new Date().getTime());          //当前操作时间
    };
}
function base_encode_salt(str, firstKey, secondKey) {
    var Base64encodeStr = createKey(firstKey) + new Base64().encode(str) + createKey(secondKey);
    return new Base64().encode(Base64encodeStr);
}
function base_decode_salt(str, firstKey, secondKey) {
    var basede64DecodeValue = new Base64().decode(str);
    basede64DecodeValue = basede64DecodeValue.replace(createKey(firstKey), "").replace(createKey(secondKey), "");
    return new Base64().decode(basede64DecodeValue);
}
function createKey(key) {
    return new Base64().encode(new Base64().encode(new Base64().encode(key))).replace(/=/g, "");
}
// String.prototype.replaceAll=function(str,repaceStr) {
//     return this.replace(new RegExp(str,"gmi"),repaceStr)
// };
/**
 * 初始化门卡管理程序
 */
function initDoorCardManager() {
    SystemWin.getLocalCache("doorManagerPath", function (data) {
        if (!isNull(data)) {
            DoorLock.initSoftPath(data, function () {

            }, function () {

            });
            DoorLock.openPort(1, function () {

            }, function () {

            });
        } else {
            var parentBodyId = $("body").attr("id");
            top.layer.open({
                type: 2,
                title: [
                    '门卡管理软件安装路径',
                    'color: #86b22f; font-size:16px;'
                ],
                area: ['400px', "300px"],
                fixed: true, //不固定
                zIndex: 9999,
                shade: 0,
                content: 'rizu/adddoorManagerPath.html?parentBodyId=' + parentBodyId
            });
        }

    }, function (data) {

    })

}
/**
 * 保存门卡管理app路径到缓存
 * @param data
 */
function saveDoorAppPath(data) {
    // setItems("doorManagerPath",data);
    SystemWin.setLocalCache("doorManagerPath", data);
    DoorLock.initSoftPath(data, function () {

    }, function () {

    });
    DoorLock.openPort(1, function () {

    }, function () {

    });
}

/**
 * 禁止页面所有点击事件
 */
function stopAllEvent() {
    $("body").find("*").each(function () {
        $(this).off("click").attr("onclick", null);
        $(this).on("click", function (event) {
            event.preventDefault();
        })//a标签阻止跳转。
        $(this).attr("disabled",true);  //禁止输入框进行任何操作
        $(this).keydown(function (e) {//判断按键
            e = window.event || e || e.which;
            if (e.keyCode == 13) {
                e.keyCode = 0;
                return false;
            }
        });

    })
}


/**
 * 判断手机号输入是否正确
 * @param $thisObj
 */
function checkPhone($thisObj) {
    var $phone = $($thisObj).val();   //手机号
    //判断手机号不为空
    if(isNull($phone)){
        layer.tips("请输入手机号！", $thisObj, {tips: [3, '#FF784E'], time: 0});
        $($thisObj).attr("checkType", '0').attr("mustField", $($thisObj).attr("checkTypeYu"));  //给手机号赋值不合法类型 0 不合法   1 合法
    }else{
        //判断手机号长度是否为11位
        if($phone.length == 11){
            //正则表达式手机号是否正确
            // if (!(/^((13[0-9])|(14[1|4|5|6|7|8])|(15([0-3]|[5-9]))|(16[6])|(17[0-9])|(18[0,1,2,3,5-9])|(19[8-9]))\d{8}$/.test($phone))) {
            if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($phone))) {
                layer.tips("请输入正确的手机号！", $thisObj, {tips: [3, '#FF784E'], time: 0});
                $($thisObj).attr("checkType", '0').attr("mustField", $($thisObj).attr("checkTypeYu"));  //给手机号赋值不合法类型 0 不合法   1 合法
            }else{
                layui.layer.closeAll('tips');
                $($thisObj).attr("checkType", '1');  //给身份证赋值不合法类型 0 不合法   1 合法
            }
        }
    }
    timeoutCloseAlltips();
}

/**
 * 判断手机号输入是否正确
 * @param $thisObj
 */
function checkPhoneInfo($thisObj) {
    var $phone = $($thisObj).val();   //手机号
    //判断手机号不为空
    if(isNull($phone)){
        layer.tips("请输入手机号！", $thisObj, {tips: [3, '#FF784E'], time: 0});
        $($thisObj).attr("checkType", '0').attr("mustField", $($thisObj).attr("checkTypeYu"));  //给手机号赋值不合法类型 0 不合法   1 合法
    }else{
        //判断手机号长度是否为11位
        if($phone.length != 11){
            layer.tips("请输入正确的手机号！", $thisObj, {tips: [3, '#FF784E'], time: 0});
            $($thisObj).attr("checkType", '0').attr("mustField", $($thisObj).attr("checkTypeYu"));  //给手机号赋值不合法类型 0 不合法   1 合法
        }
    }
    timeoutCloseAlltips();
}

/**
 * 延时关闭提示语
 */
function timeoutCloseAlltips(time) {
    var timeNum = time ? time : 2000;
    setTimeout(function () {
        layui.layer.closeAll('tips');
    },timeNum)
}
/**
 * textarea 内容保留格式
 */
function textareaStr(str){
    var reg=new RegExp("\n","g");
    var regSpace=new RegExp(" ","g");
    str = str.replace(reg,"<br>");
    str = str.replace(regSpace,"&nbsp;");
    return str;
}
function toTextarea(str){
    var reg=new RegExp("<br>","g");
    var regSpace=new RegExp("&nbsp;","g");
    str = str.replace(reg,"\n");
    str = str.replace(regSpace," ");
    return str;
}