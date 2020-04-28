/**
 * Created by Long on 2017/6/16.
 */
//获取公告详情
function getNewGongGaoDatas(objId,sendData){
    $.send({
        url: '/v2/company/company_notice/get_by_id',
        data: sendData,
        isLoading:true,
        success: function (data) {
            if(data.status.code == 200){
                var $value=data.result;
                var deptnames=$value.deptNames;
                var namestr='';
                if(deptnames.length==0){
                    deptnames='全部';
                    namestr+='<span>全部</span>';
                }
                if(deptnames.length>14){
                    deptnames=deptnames.slice(0,14);
                    $.each(deptnames,function (i,el) {
                        namestr+='<span>'+el+'</span>'
                    })
                }

                $("#showTitle div.titleText").html($value.title);
                $("#showTitle div.showTime").html($value.et);
                $("#gongGaoCon").html($value.content);
                $('.content').html(namestr);
                var list=JSON.parse(getItems('noticeList'));
                $.each(list,function (i,el) {
                    if(objId==el){
                        index=i;
                    }
                })
                downLoadBox();/*图片下载*/
                firstOrLast();
                return index;




                // $idList = [];$titleList = [];$contentList=[];index = 0;taretList =[];
                // if(data.result.list.length > 0){
                //     $.each(data.result.list, function (n,$value) {
                //         if($value.id == objId){
                //             var deptNames = $value.deptNames;
                //             var deptStr = '';
                //             if(deptNames.length>14){
                //                 deptNames = deptNames.splice(0,14);
                //             }
                //             if(deptNames.length>0){
                //                 $.each(deptNames,function (index,value) {
                //                     deptStr+= '<span>'+value+'</span>'
                //                 })
                //             }else if(deptNames.length == 0){
                //                 deptStr+= '<span>全部</span>'
                //             }
                //             index = n;
                //             $("#showTitle div.titleText").html($value.title);
                //             $("#showTitle div.showTime").html($value.et);
                //             $("#gongGaoCon").html($value.content);
                //             $('.content').html(deptStr);
                //         }
                //         $idList.push($value.id);
                //         $titleList.push($value.title);
                //         $etList.push($value.et);
                //         $contentList.push($value.content);
                //         taretList.push($value.deptNames);
                //     });
                //     if( index == 0 ){ $(".prePage").css("color","#e6e6e6") }
                //     if( index == $titleList.length-1 ){ $(".nexPage").css("color","#e6e6e6") }
                //     downLoadBox();/*图片下载*/
                //     return index;
                // }
            }
        }
    })
}











