/**
 * Created by wx on 2019/8/19.
 */
//监听提交
layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;
    form.verify({
        title: function(value){
            if(value.length < 5){
                return '标题至少得5个字符啊';
            }
        }
        ,username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }
        ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
        ,content: function(value){
            layedit.sync(editIndex);
        }
        ,repass:function(value){
            var pass = $("#pass").val();
            if(pass != value){
                return '两次输入的密码不一致';
            }
            //if(!new RegExp(pass).test(value)) {
            //    return '两次输入的密码不一致';
            //}
        }
    });
    form.on('submit(demo1)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });
})