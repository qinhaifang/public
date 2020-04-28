/**
 * Created by wx on 2019/8/26.
 */
initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#shopOrder").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#shopOrder").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});


layui.use('table', function() {
    var table = layui.table;
    table.render({
        elem:'shop',
        cols:[[
            {checkbox: true,align:'center'}
            ,{ width: 80,fixed:'left'}
            ,{ title: '商品参数', width: 120}
        ]]
    })
})
function getList(){
    var list = [{name:"春季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:980,num:1},{name:"夏季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:980,num:1},{name:"秋季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:980,num:1},{name:"冬季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:980,num:1},{name:"春季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:980,num:1}];
    var html = '';
    layui.use('form',function(){
        var form = layui.form;
        for(var i=0;i<list.length;i++){
            html += '<tr>' +
                '<td><input type="checkbox" class="sonCheckbox" lay-filter="sonCheckbox" /></td> ' +
                '<td>'+list[i].name+'</td> ' +
                '<td>规格：'+list[i].size+'</td> ' +
                '<td class="price">￥'+list[i].price+'</td> ' +
                '<td> ' +
                '<span class="reduce reSty">-</span> ' +
                '<input type="number" value="'+list[i].num+'"> ' +
                '<span class="plus">+</span> ' +
                '</td> ' +
                '<td class="priceTotal">￥'+list[i].price+'</td> ' +
                '<td onclick="del('+i+')">删除</td> ' +
                '</tr>'
        }
        $('#shop tbody').html(html)
        form.render()
    })
}
getList();

var $plus = $('.plus'),$reduce = $('.reduce'),$allCheckbox = $('.allCheckbox'),$sonCheckbox = $('.sonCheckbox');
//增加数量
$plus.click(function(){
    var $inputVal = $(this).prev('input'),
    $count = parseInt($inputVal.val())+ 1,
    $reduce = $(this).parents('tr').find('.reduce'),
    $price = $(this).parents('tr').find('.price').html(), //单价
    $priceTotalObj = $(this).parents('tr').find('.priceTotal'), //总价
    $priceTotal = $count*parseInt($price.substring(1));
    $inputVal.val($count);
    $priceTotalObj.html('￥' +$priceTotal);
    if($inputVal.val() > 1 && $reduce.hasClass('reSty')){
        $reduce.removeClass('reSty')
    }
    totalMoney();
})
$reduce.click(function(){
    var $inputVal = $(this).next('input'),
        $count = parseInt($inputVal.val())-1,
        $price = $(this).parents('tr').find('.price').html(), //单价
        $priceTotalObj = $(this).parents('tr').find('.priceTotal'), //总价元素
        $priceTotal = $count*parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥'+ $priceTotal);
        if($inputVal.val() > 1){
            $inputVal.val($count);
            $priceTotalObj.html('￥' +$priceTotal)
        }else{
            $inputVal.val(1);
            $priceTotalObj.html($price);
        }
        if($inputVal.val() == 1 && !$(this).hasClass('reSty') ){
            $(this).addClass('reSty');
        }
    totalMoney();
})
$(".plus").bind("selectstart", function () { return false; });
$(".reduce").bind("selectstart", function () { return false; });

//---------------------layui form----------------------
layui.use('form',function(){
    var form = layui.form;
    form.on('checkbox(allChecked)', function(data){
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
        if(data.elem.checked){
            $('.sonCheckbox').each(function(index, item){
                item.checked = data.elem.checked;
            });
        }else{
            $('.sonCheckbox').each(function(index, item){
                item.checked = data.elem.checked;
            });
        }
        form.render('checkbox');
        totalMoney();
    });
    form.on('checkbox(sonCheckbox)',function(data){
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
            if(data.elem.checked){
                if($('.sonCheckbox:checked').size() == $('.sonCheckbox').size()){
                    $('.allCheckbox')[0].checked = data.elem.checked;
                }
            }else{
                $('.allCheckbox')[0].checked = data.elem.checked;
            }
            form.render('checkbox');
        totalMoney();
    })
})
//-------------------总计--------------------
function totalMoney(){
    var total_money = 0;
    var total_count = 0;
    var btn = $('.orderBtn');
    $sonCheckbox.each(function(){
        if($(this).is(':checked')){
            var price = parseInt($(this).parents('tr').find('.priceTotal').html().substring(1));
            var num = parseInt($(this).parents('tr').find('input[type=number]').val());
            total_money += price;
            total_count += num;
        }
    });
    $('.totalPrice').html(total_money);
    $('.totalNum').html(total_count);

}






//全局的checkbox选中和未选中的样式
$allCheckbox.click(function(){
    //mark 是背景图片
    //if ($(this).is(':checked')) {
    //    $(this).next('label').addClass('mark');
    //} else {
    //    $(this).next('label').removeClass('mark')
    //}
})
//------------全选与单个商品的关系------------------------
$allCheckbox.click(function(){
    if($(this).is(':checked')){
        $sonCheckbox.prop('checked',true)
    }else{
        $sonCheckbox.prop('checked',false)
    }
})
