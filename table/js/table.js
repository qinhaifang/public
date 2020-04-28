/**
 * Created by wx on 2019/8/16.
 */
initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#tables").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#tables").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});

//$("#loadingToast").css({"display":"block","opacity":"1"});
//动态数据
layui.use('table', function(){
    var table = layui.table;
    table.render({
        elem: '#test'
        ,url:'js/json.js'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'id', title: 'ID', sort: true}
            ,{field:'username', title: '用户名'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'sex', title: '性别', sort: true}
            ,{field:'city', title: '城市'}
            ,{field:'sign', title: '签名'}
            ,{field:'classify', title: '职业', align: 'center'} //单元格内容水平居中
            ,{field:'experience', title: '积分', sort: true, align: 'right'} //单元格内容水平居中
            ,{field:'score', title: '评分', sort: true, align: 'right'}
            ,{field:'wealth', title: '财富', sort: true, align: 'right'}
        ]]
        ,page:true
        ,totalRow:true
    });
    table.render({
        elem: '#test1'
        ,url:'js/json.js'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'id', width:80, title: 'ID', sort: true}
            ,{field:'username', width:80, title: '用户名'}
            ,{field:'sex', width:80, title: '性别', sort: true}
            ,{field:'city', width:80, title: '城市'}
            ,{field:'sign', title: '签名', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'experience', title: '积分', sort: true}
            ,{field:'score', title: '评分', sort: true}
            ,{field:'classify', title: '职业'}
            ,{field:'wealth', width:137, title: '财富', sort: true}
        ]]
    });
});
//layui.use('laypage', function(){
//    var laypage = layui.laypage;
//
//    //执行一个laypage实例
//    laypage.render({
//        elem: 'test' //注意，这里的 test1 是 ID，不用加 # 号
//        ,count: 1000 //数据总数，从服务端得到
//        , limit: 10                      //每页显示条数
//        , limits: [10, 20, 30]
//        , curr: 1                        //起始页
//        , groups: 5                      //连续页码个数
//        , prev: '上一页'                 //上一页文本
//        , netx: '下一页'                 //下一页文本
//        , first: 1                      //首页文本
//        , last: 100                     //尾页文本
//        , layout: ['prev', 'page', 'next','limit','refresh','skip']
//        , jump: function (obj, first) { //obj为当前页的属性和方法，第一次加载first为true
//            //         do something
//            if (!first) {
//                //非首次加载 do something
//            }
//        }
//    });
//});

layui.use('table', function(){
    var table = layui.table;


});