/**
 * Created by Long on 2017/6/16.
 */
var objId= "";
var $idList = [],$titleList = [],$etList = [],$contentList=[],index = 0, taretList = [];
$(function(){
    objId = getQueryString("gongGaoId");
    // if(getQueryString("type") != ''||getQueryString("begin") != ''||getQueryString("end") != ''||getQueryString("like") != ''||getQueryString("title") != ''||getQueryString("userId") != ''||getQueryString("bumenId") != ''){
    //     var sendData = {
    //         noticeType: getQueryString("type"),
    //         pubBeginTime: getQueryString("begin"),
    //         pubEndTime: getQueryString("end"),
    //         likeName: getQueryString("like"),
    //         titleLikeName: getQueryString("title"),
    //         ggUserId: getQueryString("userId"),
    //         departmentId: getQueryString("bumenId"),
    //         id:objId
    //     };
    //     index = getNewGongGaoDatas(objId,sendData);
    // }else{
    //     //获得最新一条公告
    //     index = getNewGongGaoDatas(objId,{id:objId});
    // }
    index = getNewGongGaoDatas(objId,{id:objId});
});

/* 判断是否是第一篇或最后一篇 若是，改样式  */
function firstOrLast() {
    var list=JSON.parse(getItems('noticeList'));
    if( index == 0 ){ $(".prePage").css("color","#e6e6e6") }else{ $(".prePage").css("color","#86b22f") };
    if( index == list.length-1 ){ $(".nexPage").css("color","#e6e6e6") }else{ $(".nexPage").css("color","#86b22f") }
}
/* 下一页 */
function nextPageFn(){
    index++;
    var list=JSON.parse(getItems('noticeList'));
    var curId=list[index];
    getNewGongGaoDatas(curId,{id:curId});
    // if(index < $titleList.length){
    //     // $("#showTitle").html($titleList[ index ]);
    //     $("#showTitle div.titleText").html($titleList[ index ]);
    //     $("#showTitle div.showTime").html($etList[ index ]);
    //     $("#gongGaoCon").html($contentList[ index ]);
    //     var str = '';
    //     console.log(taretList)
    //     // console.log(taretList[index]);
    //     if(taretList[index].length>14){ //过多隐藏
    //         taretList[index] = taretList[index].splice(0,14);
    //     }else if(taretList[index].length == 0){
    //         str+='<span>全部</span>'
    //     }
    //     $.each(taretList[index],function (index,value) {
    //         str+='<span>'+value+'</span>'
    //     })
    //     $('.content').html(str)
    // }else{
    //     index = $titleList.length-1;
    // }
    firstOrLast();
    downLoadBox();
}
/* 上一页 */
function prePageFn(){
    index--;
    if(index > 0 || index == 0){
        // $("#showTitle").html($titleList[ index ]);
        // $("#showTitle div.titleText").html($titleList[ index ]);
        // $("#showTitle div.showTime").html($etList[ index ]);
        // $("#gongGaoCon").html($contentList[ index ]);
        // var str = '';
        // if(taretList[index].length>14){ //过多隐藏
        //     taretList[index] = taretList[index].splice(0,14);
        // }else if(taretList[index].length  == 0){
        //     str+='<span>全部</span>'
        // }
        // $.each(taretList[index],function (index,value) {
        //     str+='<span>'+value+'</span>'
        // })
        // $('.content').html(str)
        var list=JSON.parse(getItems('noticeList'));
        var curId=list[index];
        getNewGongGaoDatas(curId,{id:curId});
    }else{
        index = 0;
    }
    firstOrLast();
    downLoadBox();
}
/**
 *图片下载
 * */
function downLoadBox(){
    var imgList = $("#gongGaoCon img");
    imgList.each(function (i) {
        $(this).click(function () {
            var a = $("<a></a>").attr("href", this.src).attr("target", "_blank").appendTo("body");
            a[0].click();
            a.remove();
        });
        $(this.parentNode).css({ position:"relative" });
        $(this).css({ cursor:"pointer" });
        // $(this.parentNode).children("#downLoadA").remove();
        $("<a id='downLoadA'>下载</a>").attr("href", this.src).attr("download", "img.png").css({ fontSize:"16px",position:"absolute",left:this.offsetLeft+this.offsetWidth-40+"px",top:this.offsetTop+this.offsetHeight-25+"px",zIndex:999}).appendTo(this.parentNode);
        $(this.parentNode).children("#downLoadA").hide();
        $(this).mouseenter(function () {
            $(this.parentNode ).find("#downLoadA").show();
        });
        $(this).mouseleave(function () {
            $(this.parentNode).find("#downLoadA").hide();
        });
        $(this.parentNode).children("#downLoadA").mouseenter(function () {
            $(this).show();
        });
        $(this.parentNode).children("#downLoadA").mouseleave(function () {
            $(this).hide();
        });
        $(this.parentNode).children("#downLoadA").click(function () {
            $(this).hide();
        });
    });
};








