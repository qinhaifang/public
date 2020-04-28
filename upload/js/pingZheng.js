// 上传图片
function show(obj) {
    var fileList=document.getElementById('iptfileUpload').files;
    // console.log(fileList.length);
    for(var i=0;i<fileList.length;i++){
        var reader=new FileReader();
        reader.readAsDataURL(fileList[i]);
        // console.log(reader.readAsDataURL(fileList[i]));
        reader.onload=function(){
            $(".img-load").before('<div class="img-show"><img src="'+this.result+'" class="showimg" onclick="big()"/><i class="del"><img src="images/img_del.png" alt="" class="showimg"></i></div>');
            // sessionStorage.setItem("pic",this.name);
            // console.log(sessionStorage.getItem("pic"));
            //对上传的图片进行编辑
            $(".img-show").mouseover(function () {
                $(this).find(".del").show();
            }).mouseout(function () {
                $(this).find(".del").hide();
            });
            $(".del").click(function () {
                $(this).parents(".img-show").remove();
            });
            $("#iptfileUpload").val("");
            //图片放大
            big();
        }
    }
}
// 查看大图
function big() {
    // 图片放大
    try {
        $('.showimg').viewer({
            url: 'data-original',
            navbar: false,   //显示缩略图导航
            toolbar: true,  //显示工具栏
            rotatable:true,  //图片是否可旋转
            scalable:false,  //图片是否可翻转
            button:false,   //显示右上角关闭按钮（jQuery 版本无效）
            tooltip:false,  //显示缩放百分比
            movable:false,  //图片是否可移动
            zoomable:false, //图片是否可缩放
            transition:false, //使用 CSS3 过度
            fullscreen:true,  //播放时是否全屏
            keyboard:false,   //播放时是否支持键盘
            interval:5000,    //播放间隔，单位为毫秒
            zIndex: 19891014999, //重点1
            success: function(layui, zIndex){
                console.log(layui, zIndex);
            },
            shown: function () {
                $(".proof-main .viewer-container img").unbind("click");
                $(".proof-main .viewer-container img").click(function () {
                    $(".viewer-close").click();
                });
            }
        });
    } catch (e) {

    }
}
//关闭凭证的取消按钮
$("#proof-cancel").on('click',function(){
    /*
    //console.log($(this).text());
    if($(".img-show").length<=0){
        
        var _iframe = window.parent;
        var _div =_iframe.document.getElementById('yuDing');
        // console.log(_div.firstChild.lastChild.previousSibling.lastChild.lastChild.previousSibling.innerHTML);
        console.log(_div.firstChild.innerHTML);
    }
    */
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});
//保存按钮
$("#proof-save").unbind("click");
$("#proof-save").on('click',function(){
    huoQuImages();
    //$("#imgPic", parent.document).html();
    //保存图片
    if($(".proof").find(".img-show").length!=0){
        $(".yd-pingzheng", window.parent.document).find("img").show();      //预定凭证
        $("."+sessionStorage.getItem("tzPingZheng"), window.parent.document).find("img").show();        //退租凭证
        $(".td-pingzheng", window.parent.document).find("img").show();      //推定凭证
        $(".pz", window.parent.document).find("img").show();        //添加记账凭证
        $("."+sessionStorage.getItem("jzPingZheng"), window.parent.document).find("img").show();        //记账凭证
    }else{
        $(".yd-pingzheng", window.parent.document).find("img").hide();      //预定凭证
        $("."+sessionStorage.getItem("tzPingZheng"), window.parent.document).find("img").hide();        //退租凭证
        $(".td-pingzheng", window.parent.document).find("img").hide();      //推定凭证
        $(".pz", window.parent.document).find("img").hide();        //添加记账凭证
        $("."+sessionStorage.getItem("jzPingZheng"), window.parent.document).find("img").hide();        //记账凭证
    }
    sessionStorage.removeItem("tzPingZheng");
    sessionStorage.removeItem("jzPingZheng");
    //关闭弹层
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});
//获取图片路径存储到父页面
function huoQuImages() {
    var imagesLenght = $("#imagesPic div").length;
    var picList = '';
    for(var i = 0; i<imagesLenght-1; i++){
        var $pic = $("#imagesPic div").find("img").attr("src");
        picList += '<li><img src="'+$pic+'" /></li>';
    }
    $("#imgPic", parent.document).html(picList);
}

