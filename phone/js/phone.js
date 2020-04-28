/**
 * Created by wx on 2019/9/6.
 */
$(function(){
    //创建MeScroll对象
    var mescroll = new MeScroll("mescroll", {
        down: {
            auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            callback: downCallback //下拉刷新的回调
        },
        up: {
            auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
            isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
            callback: upCallback, //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
            toTop:{ //配置回到顶部按钮
                src : "include/mescroll/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
                //offset : 1000
            },
            htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
            empty: {
                //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                warpId:	"xxid", //父布局的id (1.3.5版本支持传入dom元素)
                icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
                tip: "暂无相关数据~" //提示
            },
            lazyLoad: {
                use: true, // 是否开启懒加载,默认false
                attr: 'imgurl' // 标签中网络图的属性名 : <img imgurl='网络图  src='占位图''/>
            }
        }
    });

    /*下拉刷新的回调 */
    function downCallback(){
        //联网加载数据
        location.reload();
        //$.ajax({
        //    url: 'xxxxxx',
        //    success: function(data) {
        //        //联网成功的回调,隐藏下拉刷新的状态;
        //        mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
        //        //设置数据
        //        //setXxxx(data);//自行实现 TODO
        //    },
        //    error: function(data) {
        //        //联网失败的回调,隐藏下拉刷新的状态
        //        mescroll.endErr();
        //    }
        //});
    }

    /*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function upCallback(page){
        //联网加载数据
        //商机列表
        setTimeout(function () {
            $.ajax({
                async : true,
                url : serverUrl+"/news/get",
                type : "GET",
                dataType : "json", // 返回的数据类型，设置为JSONP方式
                data : {
                    page : page.num,
                    type : 2,
                    plength : 15,
                    keyword : ""
                },
                success: function(response, status, xhr){
                    mescroll.endBySize(15, response.total);
                    var list = response.data;
                    var newArr=[];
                    setListData(list, true);
                },
                error: function(data){
                    mescroll.endErr();
                }
            });
        },1000)
    }

    /*设置列表数据*/
    function setListData(curPageData, isAppend) {
        var listDom=document.getElementById("newsList");
        for (var i = 0; i < curPageData.length; i++) {
            var newObj=curPageData[i];
            var str;
            if(newObj.is_show == 0){
                str='<div class="proAttr" style="width: 88%;float: left;" onclick="arricle3('+newObj.id+')"> '+
                    '<p class="proName" > '+ newObj.title +	'</p> '+
                    '</div> '+
                    '<div class="pic" style="margin:10px 20px 0 0;width:3%;height:auto;" onclick="arricle3('+newObj.id+')"> '+
                    '<i class="hook"></i><img '+
                    'src="images/fanli/lock2.png" /> '+
                    '</div> ';
            }else{
                str='<div class="proAttr" style="" onclick="arricle2('+newObj.id+')"> '+
                    '<p class="proName" > '+ newObj.title +	'</p> '+
                    '</div> ';
            }
            //	str+='<p class="new-content">'+newObj.create_time+'</p>';
            var liDom=document.createElement("li");
            liDom.innerHTML=str;

            if (isAppend) {
                listDom.appendChild(liDom);//加在列表的后面,上拉加载
            } else{
                listDom.insertBefore(liDom, listDom.firstChild);//加在列表的前面,下拉刷新
            }
        }
    }


});