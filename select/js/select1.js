
//下拉复选框
var formSelects = layui.formSelects;
$.send({
    url: '/v2/article/article_column/getCrawlColumn',
    data: {},
    success: function (data) {
        if (data.status.code == 200) {
            $("#loadingToast").css({"display":"none","opacity":"0"});
            var list = data.result.columns;
            var content = '';
            for (var i = 0; i < list.length; i++) {
                content += '<option value="' + list[i].id + '">' + list[i].class_name + '</option>'
            }
            $('#getColumn').html(content);
            formSelects.render();
        }
    }
})
//选地址
var sendData = {};
var province = document.getElementById("province").value
    ,city = document.getElementById("city").value
    ,area = document.getElementById("area").value;
if(area == ''){
    if(city == ''){
        sendData.articleAddressCode = city.substring(0,6);
        sendData.articleAddressName = province.substr(province.lastIndexOf("_")).substr(1) + city.substr(city.lastIndexOf("_")).substr(1)
    }else{
        sendData.articleAddressCode = province.substring(0,6);
        sendData.articleAddressName = province.substr(province.lastIndexOf("_")).substr(1);
    }
}else {
    sendData.articleAddressCode = area.substring(0, 6);
    sendData.articleAddressName = province.substr(province.lastIndexOf("_")).substr(1) + city.substr(city.lastIndexOf("_")).substr(1) + area.substr(area.lastIndexOf("_")).substr(1);
}
$('.address').html(sendData.articleAddressName);
// tree 选择框
layui.use(['tree', 'layer'], function() {
    var layer = layui.layer
        , $ = layui.jquery;
    layui.tree({
        elem: '#demo1' //指定元素
        ,target: '_blank' //是否新选项卡打开（比如节点返回href才有效）
        ,click: function(item){ //点击节点回调
            layer.msg('当前节名称：'+ item.name + '<br>全部参数：'+ JSON.stringify(item));
            console.log(item);
        }
        ,nodes: [ //节点
            {
                name: '常用文件夹'
                ,id: 1
                ,alias: 'changyong'
                ,children: [
                {
                    name: '所有未读（设置跳转）'
                    ,id: 11
                    ,href: 'http://www.layui.com/'
                    ,alias: 'weidu'
                }
            ]
            }, {
                name: '我的邮箱'
                ,id: 2
                ,spread: true
                ,children: [
                    {
                        name: 'QQ邮箱'
                        ,id: 21
                        ,spread: true
                        ,children: [
                        {
                            name: '收件箱'
                            ,id: 211
                            ,children: [
                            {
                                name: '所有未读'
                                ,id: 2111
                            }
                        ]
                        }, {
                            name: '已发出的邮件'
                            ,id: 212
                        }
                    ]
                    }
                ]
            }
        ]
    });
    //生成一个模拟树
    var createTree = function(node, start){
        node = node || function(){
                var arr = [];
                for(var i = 1; i < 2; i++){
                    arr.push({
                        name: i.toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
                    });
                }
                return arr;
            }();
        start = start || 1;
        layui.each(node, function(index, item){
            if(start < 2 && index < 1){
                var child = [
                    {
                        name: (1 + index + start).toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
                    }
                ];
                node[index].children = child;
                createTree(child, index + start + 1);
            }
        });
        return node;
    };

    layui.tree({
        elem: '#demo2' //指定元素
        ,nodes: createTree()
    });
})

//tree

function showTree(){
    if($('.ztree').css('display') == 'none'){
        $('.ztree').css('display','block');
    } else{
        $('.ztree').css('display','none');
    }
    $("body").bind("mousedown", onBodyDownByActionType);
}
function onBodyDownByActionType(event) {
    if (event.target.id.indexOf('treeDemo') == -1){
        if(event.target.id != 'orgName'){
            hideTree();
        }
    }
}
function hideTree() {
    $('.ztree').css('display','none');
    $("body").unbind("mousedown", onBodyDownByActionType);
    return false;
}
function zTreeOnClick(event, treeId, treeNode) {
    $('#orgName').val(treeNode.name);
    $('#orgCode').val(treeNode.Id)
    hideTree();
};

var orgList =[
    { id:1, pId:0, name:"父节点1 - 展开", open:true},
    { id:11, pId:1, name:"父节点11 - 折叠"},
    { id:111, pId:11, name:"叶子节点111"},
    { id:112, pId:11, name:"叶子节点112"},
    { id:113, pId:11, name:"叶子节点113"},
    { id:114, pId:11, name:"叶子节点114"},
    { id:12, pId:1, name:"父节点12 - 折叠"},
    { id:121, pId:12, name:"叶子节点121"},
    { id:122, pId:12, name:"叶子节点122"},
    { id:123, pId:12, name:"叶子节点123"},
    { id:124, pId:12, name:"叶子节点124"},
];
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    //回调
    callback: {
        onClick: zTreeOnClick
    },
    view: {
        fontCss: { fontSize: "14px" }
    }
};
//节点点击事件

$(document).ready(function () {
    //初始组织树状图
    $.fn.zTree.init($("#treeDemo"), setting, orgList);
});