/**
 * Created by wx on 2019/9/6.
 */
$(function(){
    //����MeScroll����
    var mescroll = new MeScroll("mescroll", {
        down: {
            auto: false, //�Ƿ��ڳ�ʼ�����֮���Զ�ִ�������ص�callback; Ĭ��true
            callback: downCallback //����ˢ�µĻص�
        },
        up: {
            auto: true, //�Ƿ��ڳ�ʼ��ʱ���������صķ�ʽ�Զ����ص�һҳ����; Ĭ��false
            isBounce: false, //�˴���ֹios�ص�,����(��������Ķ�,�ر������һ��): http://www.mescroll.com/qa.html#q10
            callback: upCallback, //�����ص�,�˴��ɼ�д; �൱�� callback: function (page) { upCallback(page); }
            toTop:{ //���ûص�������ť
                src : "include/mescroll/img/mescroll-totop.png", //Ĭ�Ϲ�����1000px��ʾ,������offset�޸�
                //offset : 1000
            },
            htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
            empty: {
                //�б��һҳ���κ�����ʱ,��ʾ�Ŀ���ʾ����; ������warpId����ʾ
                warpId:	"xxid", //�����ֵ�id (1.3.5�汾֧�ִ���domԪ��)
                icon: "../img/mescroll-empty.png", //ͼ��,Ĭ��null,֧������ͼ
                tip: "�����������~" //��ʾ
            },
            lazyLoad: {
                use: true, // �Ƿ���������,Ĭ��false
                attr: 'imgurl' // ��ǩ������ͼ�������� : <img imgurl='����ͼ  src='ռλͼ''/>
            }
        }
    });

    /*����ˢ�µĻص� */
    function downCallback(){
        //������������
        location.reload();
        //$.ajax({
        //    url: 'xxxxxx',
        //    success: function(data) {
        //        //�����ɹ��Ļص�,��������ˢ�µ�״̬;
        //        mescroll.endSuccess(); //�޲�. ע���������ˢ�����޲ε�
        //        //��������
        //        //setXxxx(data);//����ʵ�� TODO
        //    },
        //    error: function(data) {
        //        //����ʧ�ܵĻص�,��������ˢ�µ�״̬
        //        mescroll.endErr();
        //    }
        //});
    }

    /*�������صĻص� page = {num:1, size:10}; num:��ǰҳ ��1��ʼ, size:ÿҳ�������� */
    function upCallback(page){
        //������������
        //�̻��б�
        setTimeout(function () {
            $.ajax({
                async : true,
                url : serverUrl+"/news/get",
                type : "GET",
                dataType : "json", // ���ص��������ͣ�����ΪJSONP��ʽ
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

    /*�����б�����*/
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
                listDom.appendChild(liDom);//�����б�ĺ���,��������
            } else{
                listDom.insertBefore(liDom, listDom.firstChild);//�����б��ǰ��,����ˢ��
            }
        }
    }


});