/**
 * Created by wx on 2019/8/14.
 */

// 获取当天
function getDate(){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    var year_month = '';

    if(String(Month).length == 1){
        Month = '0' + Month;
    }
    if(String(Day).length == 1){
        Day = '0' + Day;
    }
    year_month_day = Year + '-' + Month + '-' + Day ;
}
// 获取自然周
function getweek(){
    // 获取周
    getDate();
    var date = new Date(year_month_day);
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length == 1){
        month = '0' + month;
    }if(String(day).length == 1){
        day = '0' + day;
    }
    week_start_date = year +'-'+ month + '-' + day;
    date.setDate(date.getDate() + 6);
    var year_end = date.getFullYear();
    var month_end = date.getMonth()+1;
    var day_end = date.getDate();
    if(String(month_end).length == 1){
        month_end = '0' + month_end;
    }if(String(day_end).length == 1){
        day_end = '0' + day_end;
    }
    week_end_date = year_end + '-' + month_end + '-' + day_end;
}
function getWeeks(dateString){
    var date = new Date(dateString);
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length == 1){
        month = '0' + month;
    }if(String(day).length == 1){
        day = '0' + day;
    }
    var start_date = year +'-'+ month + '-' + day;
    date.setDate(date.getDate() + 6);
    var year_end = date.getFullYear();
    var month_end = date.getMonth()+1;
    var day_end = date.getDate();
    if(String(month_end).length == 1){
        month_end = '0' + month_end;
    }if(String(day_end).length == 1){
        day_end = '0' + day_end;
    }
    var end_date = year_end + '-' + month_end + '-' + day_end;
    sessionStorage.setItem('week_start_date',start_date);
    sessionStorage.setItem('week_end_date',end_date);
}

//获取时分秒
var t = null;
t = setTimeout(time, 1000);
function time() {
    clearTimeout(t);
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    $("#time") .html( year + "年" + month + "月" + date + "日" +"&nbsp;&nbsp;"+ hour + ":" + minute + ":" + second);
    t = setTimeout(time, 1000);
}