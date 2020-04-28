
var ipStr = "http://47.93.39.198:8080";   //正式服务器
//var ipStr = "http://10.0.0.173:8080" //惠玲本地测试地址

//------------------------------------------------------
//图片上传IP地址
//var picIpStr = "http://47.94.97.40:8080"; //测试地址
var picIpStr = "http://47.93.39.198:8080"; //正式地址

var $url = window.location.origin;   //获取服务器请求地址

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
//}
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
//鼠标移入显示弹框
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
