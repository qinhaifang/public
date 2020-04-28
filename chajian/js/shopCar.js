/**
 * Created by wx on 2019/8/28.
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
var list = [{name:"春季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:100,num:1},{name:"夏季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:20,num:1},{name:"秋季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:100,num:1},{name:"冬季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:110,num:1},{name:"春季男士迷彩无袖T恤圆领潮流韩版修身男装背心青年时尚打底衫男",size:"默认",price:10,num:1}];
var listHtml = '';
for(var i=0;i<list.length;i++){
    listHtml += '<ul><li> ' +
        '<label for="sonCheck" class="iconfont css">&#xe67e;</label> ' +
        '<input type="checkbox" class="sonChecked" onchange="checkSon(this.checked,'+i+')"> ' +
        '</li> ' +
        '<li class="name">'+list[i].name+'</li> ' +
        '<li class="price">￥'+list[i].price+'</li> ' +
        '<li> ' +
        '<span class="cut reSty">-</span> ' +
        '<input type="number" class="count" value="'+list[i].num+'"> ' +
        '<span class="plus">+</span> ' +
        '</li> ' +
        '<li class="priceNum">￥'+list[i].price+'</li> ' +
        '<li class="iconfont">&#xe501;</li></ul>'
}
$('.shopJs .list').html(listHtml)

$('.cut').click(function(){
    var inputVal = $(this).next();
    var count = parseInt(inputVal.val()) -1;
    var price = $(this).parents('ul').find('.price').html();//商品价格
    var priceNum = $(this).parents('ul').find('.priceNum'); //商品总价
    if(inputVal.val() > 1){
        inputVal.val(count);
        priceNum.html('￥' + count*price.substring(1))
    }
    if(inputVal.val() == 1 && !$(this).hasClass('reSty')){
        $(this).addClass('reSty');
    }

})
$('.plus').click(function(){
    var inputVal = $(this).prev();
    var count = parseInt(inputVal.val()) +1;
    var price = $(this).parents('ul').find('.price').html();//商品价格
    var cut = $(this).parents('ul').find('.cut');
    inputVal.val(count);
    var priceNum = $(this).parents('ul').find('.priceNum');
    priceNum.html('￥' + count*price.substring(1))
    if(inputVal.val()>1 && cut.hasClass('reSty')){
        cut.removeClass('reSty');
    }
})
//--------------------------输入框校验，合计实时变化------------------------
var inputNum = $('.count')
inputNum.keyup(function(){
    if($(this).val() == ''){
        $(this).val('1');
    }
    $(this).val($(this).val().replace(/\D|^0/g,''));
    inputNum = $(this).val();
    var price = $(this).parents('ul').find('.price').html();
    var priceSum = $(this).parents('ul').find('.priceNum');
    var priceTotal = 0;
    priceTotal = inputNum * parseInt(price.substring(1));
   $(this).attr('value',inputNum);
    priceSum.html('￥' + priceTotal);
    total_money()
})

//--------------------------全选---------------------------
function checkAll(checked){
    if(checked){
        $('.shopJs .list input.sonChecked').prop('checked',true);
        $('.shopJs .list input.sonChecked').prev().html('&#xe502;');
        $('.checkAll').prev().html('&#xe502;')
    }else{
        $('.shopJs .list input.sonChecked').prop('checked',false);
        $('.shopJs .list input.sonChecked').prev().html('&#xe67e;');
        $('.checkAll').prev().html('&#xe67e;');
    }
    total_money()
}
function checkSon(checked,index){
    var checkedNum = $('.shopJs .list input.sonChecked');
    var checkedCount = $('.shopJs .list input.sonChecked:checked');
    if(checked){
        $('.shopJs .list input.sonChecked').eq(index).prev().html('&#xe502;');
        if(checkedNum.size() == checkedCount.size()){
            $('.checkAll').prop('checked',checked)
            $('.checkAll').prev().html('&#xe502;')
        }
    }else{
        $('.checkAll').prev().html('&#xe67e;')
        $('.shopJs .list input.sonChecked').eq(index).prev().html('&#xe67e;');
        $('.checkAll').prop('checked',checked)
    }
    total_money()
}
//-----------------统计价格----------------
function total_money(){
    var total_money = 0;
    var total_count = 0;
    var sonChecked = $('.shopJs .list input.sonChecked');
    sonChecked.each(function(){
        if($(this).is(':checked')){
            var price = parseInt($(this).parents('ul').find('.priceNum').html().substring(1));
            var count = parseInt($(this).parents('ul').find('.count').val())
            total_money += price
            total_count += count
        }
    })
    $('.total_text').html(total_money)
    $('.piece_num').html(total_count);

}