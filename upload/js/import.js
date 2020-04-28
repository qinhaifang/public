/**
 * Created by wx on 2019/9/3.
 */
initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#import").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#import").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});
function Export(){　　　　
    $("#exceltable").table2excel({            //exceltable为存放数据的table
        // 不被导出的表格行的CSS class类
        exclude: ".noExl",
        // 导出的Excel文档的名称
        name: "表格-" + new Date().getTime(),
        //文件后缀名
            fileext: ".xls",
        // Excel文件的名称
        filename: "表格-" + new Date().getTime() + ".xls",
        bootstrap: false
    });
}
//上传文件
$('.submit').click(function () {
    var crowd_name = $.trim($('#upload_crowd_name').val());
    var crowd_desc = $.trim($('#upload_crowd_desc').val());
    var crowd_file = $('#crowd_file')[0].files[0];
    if (typeof (crowd_file) == "undefined" || crowd_file.size <= 0) {
        alert("请选择文件");
        return;
    }
    var formData = new FormData();

    formData.append("crowd_file",$('#crowd_file')[0].files[0]);
    formData.append("crowd_name", crowd_name);
    formData.append("crowd_desc", crowd_desc);
    console.log('formData',formData)
    $.ajax({
        url:'/upload/',
        dataType:'json',
        type:'POST',
        async: false,
        data: formData,
        processData : false, // 使数据不做处理
        contentType : false, // 不要设置Content-Type请求头
        success: function(data){
            console.log(data);
            if (data.status == 'ok') {
                alert('上传成功！');
            }

        },
        error:function(response){
            console.log(response);
        }
    });
    //第一种  XMLHttpRequest 对象
    //var xhr = new XMLHttpRequest();
    //xhr.open("post", "/Admin/Ajax/VMKHandler.ashx", true);
    //xhr.onload = function () {
    //    alert("上传完成!");
    //};
    //xhr.send(formData);

    //$(input).click(function(e) {
    //    const files = e.target.files[0]
    //    //这里可以获取到文件，接下来做法和上面一样
    //})

})