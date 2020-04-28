//搜索列表 —— 未完成
function searchNoReminListData(sendData) {
    $.send({
        url: '/v2/employee/time_manager/get_un_complete_list',
        data: sendData,
        isLoading:"true",
        success: function (data) {
            if(data.status.code == 200){
                var $list = '';
                if(data.result.list.length > 0){
                    $.each(data.result.list,function (n,$value) {
                        $list += '<div class="line">';
                        var $crowdedId = '';
                        if(!isNull($value.crowdedId)){
                            if($value.crowdedId != '1'){
                                //别人分享的
                                $crowdedId = '1';
                            }else{
                                //自己的
                                $crowdedId = '1';
                            }
                        }else{
                            //自己的
                            $crowdedId = '0';
                        }
                        $list += '<p onclick="clickText(this,\''+$value.remindTime+'\',\''+$value.shareTime+'\',\''+$value.shareMan+'\',\''+$crowdedId+'\')">';
                        $list += '<span name="crowdedName" style="display: none;">'+$value.crowdedName+'</span>';
                        $list += '<span class="naoling">';
                        if(!isNull($value.remindTime)){
                            $list += '<img src="images/naoLing.png" alt="">';
                            $list += '<span>'+$value.remindTime+'</span>';
                        }else{
                            $list += '<span>'+$value.et+'</span>';
                        }
                        $list += '</span>';
                        $list += '<span class="text tixingCon" alt="' + $value.content + '" onmouseover="mouseTips(this)" conNum="'+$value.isFinish+'" conId="'+$value.id+'" conCont="'+$value.content+'" conEt="'+$value.ct+'">' + $value.content + '</span>';
                        $list += '</p>';
                        if($value.toTop == '0'){
                            $list += '<img class="tipsImgs fa" src="images/tips2.png" alt="" onclick="topPage(this,\''+$value.id+'\',1)"/>';//未置顶——已置顶
                        }else{
                            $list += '<img class="tipsImgs fa" src="images/tips3.png" alt="" onclick="topPage(this,\''+$value.id+'\',0)"/>';//已置顶——未置顶
                        }
                        if(!isNull($value.crowdedId)){
                            if($value.crowdedId != '1'){
                                //别人分享的
                                $list += '<img class="tipsImgss fa" src="images/tips5.png" alt="" onclick="fenXiang(1,\''+$value.id+'\')"/>';
                            }else{
                                //自己的
                                $list += '<img class="tipsImgss fa" src="images/tips4.png" alt="" onclick="fenXiang(0,\''+$value.id+'\')"/>';
                            }
                        }else{
                            //自己的
                            $list += '<img class="tipsImgss fa" src="images/tips4.png" alt="" onclick="fenXiang(0,\''+$value.id+'\')"/>';
                        }
                        $list += '<i class="fa fa-trash" onclick="delLists(\''+$value.id+'\')"></i>';
                        if($value.isFinish == "0"){
                            $list += '<input name="newText" attrId="'+$value.id+'" attrSynchro="'+$value.synchro+'" attrCon="'+$value.content+'" attrIsFinish="'+$value.isFinish+'" lay-filter="newText" type="checkbox" title="完成">';
                        }else{
                            $list += '<input name="newText" attrId="'+$value.id+'" attrSynchro="'+$value.synchro+'" attrCon="'+$value.content+'" attrIsFinish="'+$value.isFinish+'" lay-filter="newText" type="checkbox" title="已完成" checked="checked">';
                        }
                        $list += '</div>';
                    })
                }else{
                    $list += '<div class="line">';
                    $list += '<p>';
                    $list += '<span class="text" style="padding-left: 5px;">暂无匹配信息！</span>';
                    $list += '</p>';
                    $list += '</div>';
                }
                $("#newList").html('');
                $("#newList").html($list);
                layui.form().render();
                $(".line").mouseover(function () {
                    $(this).find(".fa").show();
                }).mouseout(function () {
                    $(this).find(".fa").hide();
                });
                if($("#newList").find(".line").length > 0){
                    if(!isNull(getQueryString("remindId"))){
                        for(var i=0;i<$("#newList").find(".line").length;i++){
                            if(getQueryString("remindId") == $("#newList").find(".line").eq(i).find(".tixingCon").attr("conId")){
                                $("#newList").find(".line").eq(i).find("p").click();
                            }
                        }
                    }
                }
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//搜索列表 —— 已完成
function searchNoSuccessData(sendData) {
    $.send({
        url: '/v2/employee/time_manager/get_complete_list',
        data: sendData,
        success: function (data) {
            if(data.status.code == 200){
                var $list = '';
                if(data.result.list.length > 0){
                    $.each(data.result.list,function (n,$value) {
                        $list += '<div class="line">';
                        var $crowdedId = '';
                        if(!isNull($value.crowdedId)){
                            if($value.crowdedId != '1'){
                                //别人分享的
                                $crowdedId = '1';
                            }else{
                                //自己的
                                $crowdedId = '1';
                            }
                        }else{
                            //自己的
                            $crowdedId = '0';
                        }
                        $list += '<p onclick="clickText(this,\''+$value.remindTime+'\',\''+$value.shareTime+'\',\''+$value.shareMan+'\',\''+$crowdedId+'\')">';
                        $list += '<span name="crowdedName" style="display: none;">'+$value.crowdedName+'</span>';
                        $list += '<span class="naoling">';
                        if(!isNull($value.remindTime)){
                            $list += '<img src="images/naoLing.png" alt="">';
                            $list += '<span>'+$value.remindTime+'</span>';
                        }else{
                            $list += '<span>'+$value.et+'</span>';
                        }
                        $list += '</span>';
                        $list += '<span class="text tixingCon" alt="' + $value.content + '" onmouseover="mouseTips(this)" conNum="'+$value.isFinish+'" conId="'+$value.id+'" conCont="'+$value.content+'" conEt="'+$value.ct+'">' + $value.content + '</span>';
                        $list += '</p>';
                        if($value.toTop == '0'){
                            $list += '<img class="tipsImgs fa" src="images/tips2.png" alt="" onclick="topPage(this,\''+$value.id+'\',1)"/>';//未置顶——已置顶
                        }else{
                            $list += '<img class="tipsImgs fa" src="images/tips3.png" alt="" onclick="topPage(this,\''+$value.id+'\',0)"/>';//已置顶——未置顶
                        }
                        if(!isNull($value.crowdedId)){
                            if($value.crowdedId != '1'){
                                //别人分享的
                                $list += '<img class="tipsImgss fa" src="images/tips5.png" alt="" onclick="fenXiang(1,\''+$value.id+'\')"/>';
                            }else{
                                //自己的
                                $list += '<img class="tipsImgss fa" src="images/tips4.png" alt="" onclick="fenXiang(0,\''+$value.id+'\')"/>';
                            }
                        }else{
                            //自己的
                            $list += '<img class="tipsImgss fa" src="images/tips4.png" alt="" onclick="fenXiang(0,\''+$value.id+'\')"/>';
                        }
                        $list += '<i class="fa fa-trash" onclick="delLists(\''+$value.id+'\')"></i>';
                        $list += '<input name="newText" attrSynchro="'+$value.synchro+'" attrId="'+$value.id+'" attrCon="'+$value.content+'" attrIsFinish="'+$value.isFinish+'" lay-filter="newText" type="checkbox" title="已完成" checked="checked">';
                        $list += '</div>';
                    })
                }else{
                    $list += '<div class="line">';
                    $list += '<p>';
                    $list += '<span class="text" style="padding-left: 5px;">暂无匹配信息！</span>';
                    $list += '</p>';
                    $list += '</div>';
                }
                $("#newLists").html('');
                $("#newLists").html($list);
                layui.form().render();

                //分页显示
                $("#tenantPages").show();
                layui.laypage({
                    cont: 'tenantPages', //容器。值支持id名、原生dom对象，jquery对象,
                    pages: data.result.totalPage, //通过后台拿到的总页数
                    groups: 3, //连续显示分页数
                    curr: data.result.pageNo || 1, //当前页
                    // skip: false, //是否开启跳页
                    skin: '#86b22f',
                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                    last: data.result.totalPage, //将尾页显示为总页数。若不显示，设置false即可
                    prev: '上一页', //若不显示，设置false即可
                    next: '下一页', //若不显示，设置false即可
                    jump: function (obj, first) {
                        if (!first) {  //一定要加此判断，否则初始时会无限刷新
                            top.ff.tips("info",'第 ' + obj.curr + '页')
                            sendData.pageNo = obj.curr;
                            searchNoSuccessData(sendData);
                        }
                    }
                });


                $(".line").mouseover(function () {
                    $(this).find(".fa").show();
                }).mouseout(function () {
                    $(this).find(".fa").hide();
                });
                if($("#newLists").find(".line").length > 0){
                    if(!isNull(getQueryString("remindId"))){
                        for(var i=0;i<$("#newLists").find(".line").length;i++){
                            if(getQueryString("remindId") == $("#newLists").find(".line").eq(i).find(".tixingCon").attr("conId")){
                                $("#newLists").find(".line").eq(i).find("p").click();
                            }
                        }
                    }
                }
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//勾选变成已完成
function saveYesData(sendData){
    $.send({
        url: '/v2/employee/time_manager/update_complete',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
               top.ff.tips("success","操作成功！")
                //刷新页面
                getTodayReminList();
                $("input[name=save]").attr("checked",false);
                $("#content").attr("conId",'').attr("conNum",'').val('');
                $("#conEt").text('');
                $("#textNum").text('0');
                layui.form().render();
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}
//勾选变成未完成
function saveYesDatas(sendData){
    $.send({
        url: '/v2/employee/time_manager/update',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
               top.ff.tips("success","操作成功！")
                //刷新页面
                getTodayReminList();
                $("input[name=save]").attr("checked",false);
                $("#content").attr("conId",'').attr("conNum",'').val('');
                $("#conEt").text('');
                $("#textNum").text('0');
                $("#save").removeAttr("disabled");
                layui.form().render();
            }else{
                top.ff.tips("error",data.status.msg);
                $("#save").removeAttr("disabled");
                layui.form().render();
            }
        }
    })
}
//添加日程
function addNoData(sendData){
    $.send({
        url: '/v2/employee/time_manager/insert',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
               top.ff.tips("success","添加成功！")
                //刷新页面
                getTodayReminList();
                $("input[name=save]").attr("conId",'');
                $("img[name=delImg]").attr("conId",'');
                $("i[name=delImg]").attr("conId",'');
                $("#content").attr("conId",'').val('');
                $("#conEt").text('');
                // $("#remindDate").val('');
                $("#textNum").text('0');
                $("#save").removeAttr("disabled");
                layui.form().render();
            }else{
                top.ff.tips("error",data.status.msg);
                $("#save").removeAttr("disabled");
                layui.form().render();
            }
        }
    })
}
//删除提醒
function delRemindData(sendData){
    $.send({
        url: '/v2/employee/time_manager/delete_by_id',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
               top.ff.tips("success","删除成功！")
                //刷新页面
                getTodayReminList();
                $("input[name=save]").attr("conId",'');
                $("img[name=delImg]").attr("conId",'');
                $("i[name=delImg]").attr("conId",'');
                $("#conEt").text('');
                $("#remindDate").attr("attrIsn","0").attr("conId",'').attr("conNum",'').val(currentDate());
                $("#botheight").hide();
                $("#content").attr("conId",'').val('').css({"height":($(window).height() - 245) + "px"});
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}

/***********************************************************************************************************************
 * 是否置顶
 */
function topPageData(sendData) {
    $.send({
        url: '/v2/employee/time_manager/update_by_id',
        data: sendData,
        success: function (data) {
            if (data.status.code == 200) {
               top.ff.tips("success","操作成功！")
                //刷新页面
                getTodayReminList();
            }else{
                top.ff.tips("error",data.status.msg);
            }
        }
    })
}














