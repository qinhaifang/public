/**
 * Created by wx on 2019/9/2.
 */
initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#upload").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#upload").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});
function btn(){
    layer.open({
        type: 2,
        area: ['580px', '340px'],
        title: [
            '附件',
            'color: #86b22f; font-size:16px;'
        ],
        content: 'pingZheng.html'
    });
}
//layui 上传
layui.use('upload', function() {
    var $ = layui.jquery
        , upload = layui.upload;
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: '/upload/'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
    //多图片上传
    upload.render({
        elem: '#test2'
        ,url: '/upload/'
        ,multiple: true
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
            });
        }
        ,done: function(res){
            //上传完毕
        }
    });

    upload.render({
        elem: '#test5'
        ,url: '/upload/'
        ,accept: 'video' //视频
        ,done: function(res){
            console.log(res)
        }
    });

})