/**
 * Created by haifang.qin on 2019/9/5.
 */
//手机号的验证的正则表达式
var checktestphone = /^1[3|5|7|8|9][0-9]\d{4,8}$/;
//手机号验证
function checkphoneFormat(phone){
	if(checktestphone.test(phone)){
		return true;
	}
	return false;
}

//用户名验证
//var userName = /^[a-zA-Z]\w{3,15}$/
//4到16位（字母，数字，下划线，减号）
var userName = /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/;
function  checkUserName(name){
	if(userName.test(name)){
		return true;
	}
	return false;
}
//密码验证
var password = /^[\S]{6,12}$/;
function checkPassword(value){
	if(password.test(value)){
		return true
	}
	return false
}
//判断是否登录返回个人
function isLogin(){
	var phone = getItems("zukePhone");
	var sfz = getItems("zukeSFZ");
	//if(isNull(phone)){
	//	window.location.href="../mine/login.html";
	//}
	//else{
	//	return true;
	//}
}
//返回到指定页面
function goBackToPage(pageUrl){
	window.location.href=pageUrl;
}
//-----------------------cookie-user-info----------------------------
// 两个参数，一个是cookie的名子，一个是值
function setItems(name, value)
{	
	if(window.localStorage){
		window.localStorage.setItem(name,value);
	}else{
	 	setCookie(name, value);
	}
}
// 取cookies函数
function getItems(name)
{
	var value = "";
	if(window.localStorage){
		value =  window.localStorage.getItem(name);
	}else{
	 	value = getCookie(name);
	}
	return value;
}
// 删除cookie
function delItems(name)
{
	if(window.localStorage){
		window.localStorage.removeItem(name);
	}else{
	 	delCookie(name);
	}
	
}
function clearItems(){
	window.localStorage.clear();
}
//退出
function exit(){
	clearItems();
	window.location.href="../mine/login.html";
}

// 判断某个值是否为空，为空返回true，否则返回false
function isNull(value) {
	if ($.trim(value).length == 0 || $.trim(value) == "undefined" || $.trim(value) == "" || $.trim(value) == "null") {
		return true;
	}
	return false;
}

