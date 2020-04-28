/**
 * Created by wx on 2019/8/19.
 */
$("#loadingToast").css({"display":"block","opacity":"1"});
//$.send({
//    url: 'json.js',
//    data: {},
//    success: function (data) {
//        if (data.status.code == 200) {
//            $("#loadingToast").css({"display":"none","opacity":"0"});
//            console.log(123,data);
//
//        }
//    }
//})
sessionStorage.removeItem('pagecount');
function getList(nowPage,pagenum){
    $.ajax({
        type: "GET",
        url: "js/json.js",
        data: {page:nowPage,limit:pagenum},
        dataType: "json",
        success: function(data){
            $("#loadingToast").css({"display":"none","opacity":"0"});
            sessionStorage.setItem('pagecount',data.count)
            var html = '';
            var list = data.data;
            for(var i = 0;i<list.length;i++){
                html += '<tr><td>'+list[i].username+'</td><td>'+list[i].sex+'</td><td>'+list[i].city+'</td><td>'+list[i].sign+'</td><td>'+list[i].classify+'</td></tr>'
            }
            $('#table tbody').html(html);
            page($('.pageOption select option:checked').val(),nowPage)
        }
    });
}
getList(1,10)
//layui.use(['laypage', 'layer'], function() {
//    var laypage = layui.laypage
//        , layer = layui.layer;
//    laypage.render({
//        elem: 'demo8'
//        , count: 40
//        ,limit:10
//        , layout: ['limit', 'prev', 'page', 'next']
//    });
//})
function page(pagenum,nowPage){
    // 心电项目分页
    $("#page").paging({
        nowPage: nowPage, // 当前页码,默认为1
        pageNum: Number(sessionStorage.getItem('pagecount')), // 总页码
         buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
        callback: function(num) { //回调函数,num为当前页码
            getList(num,pagenum);
        }
    });
}
page($('.pageOption select option:checked').val(),1);
$('.pageOption select').change(function(){
    sessionStorage.removeItem('pagecount');
    getList(1,this.value);
})

$("#page").bind("selectstart", function () { return false; });