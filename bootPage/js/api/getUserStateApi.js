// 获取用户是否登录
function getState(sendData) {
    console.log('判断权限')
    //$.send({
    //    url: "/v2/sys/table_jjr_user/get_jjr",
    //    data: sendData,
    //    success: function (json) {
    //        // 初次访问页面
    //        var resultObj = json.result;
    //        var tableJjrUser = resultObj;
    //        delItems("edition");
    //        if(json.result.landfallPc == 0){
    //            if (!isNull(tableJjrUser.certificationStatus)){
    //                setItems("edition",tableJjrUser.certificationStatus);
    //                if (tableJjrUser.certificationStatus == 1){ //企业状态 0:试用/1:正式
    //                    // 让用户选择身份，体验新手引导
    //                    // $("#dialog, #mark").show();
    //                    // $("#mark").css({"background" : "rgba(0, 0, 0, 0.6)"});
    //                    // delItems("trialVersionRole");
    //                }else if (tableJjrUser.certificationStatus == 0){
    //                    setItems("trialVersionRole","normal");
    //                    var isAdmin = 0;
    //                    if (tableJjrUser.accountName == 'admin'){     //管理员账号
    //                        isAdmin = 1;
    //                        setItems("trialVersionRole","special")
    //                    }
    //                    if (resultObj.loginFlag == 0){     //登录标记 0:弹 1:不弹
    //                        if (tableJjrUser.confirmType == "2" || tableJjrUser.confirmType == "3" ||tableJjrUser.confirmType == "4" ){      //1:通过；2：试用，未认证；3：审核；4：失败。     未认证
    //                            setItems("edition","2");
    //                            var remainingDays = resultObj.remainingDays;        //剩余天数
    //                            var houseAmount = resultObj.houseAmount;        //已录房源数量
    //                            var certifiedHouseAcount = resultObj.certifiedHouseAcount;        //认证房源上限数量
    //                            var nocertifiedHouseAcount = resultObj.nocertifiedHouseAcount;        //未认证房源上限数量
    //                            var certifiedDataRetentionDays = resultObj.certifiedDataRetentionDays;        //认证数据保留天数：0/永久,1/30天,2/60天,3/90天
    //                            top.layer.open({
    //                                type: 2,
    //                                title: [
    //                                    "提示",
    //                                    'color: #86b22f; font-size:16px;'
    //                                ],
    //                                area: ['600px', "400px"],
    //                                zIndex:99,
    //                                content: 'tanCeng/uncertifiedTip.html?parentBodyId=index&isAdmin='+isAdmin+'&remainingDays='+remainingDays+'&houseAmount='+houseAmount+'&certifiedHouseAcount='+certifiedHouseAcount+'&nocertifiedHouseAcount='+nocertifiedHouseAcount+'&certifiedDataRetentionDays='+certifiedDataRetentionDays
    //                            })
    //                        }else if (tableJjrUser.confirmType == "1"){   //已认证
    //                            setItems("edition","3");
    //                            var tishiData = {
    //                                tipFirstcontent:"该试用账号将于"+resultObj.remainingDays+"天后停用，请咨询客服了解更多服务",   //第一行提示内容
    //                                tipSecondcontent:"客服热线：010-56013617",   //第二行提示内容
    //                                tipLeftButton:"",   //左侧按钮内容
    //                                tipRightButton:""   //右侧按钮内容
    //                            };
    //                            top.layer.open({
    //                                type: 2,
    //                                title: [
    //                                    "提示",
    //                                    'color: #86b22f; font-size:16px;'
    //                                ],
    //                                area: ['451px', "210px"],
    //                                zIndex:99,
    //                                content: 'tanCeng/trialVersionTips.html?parentBodyId=index&tipFirstcontent='+tishiData.tipFirstcontent+'&tipSecondcontent='+tishiData.tipSecondcontent+'&tipRightButton='+tishiData.tipRightButton
    //                            })
    //                        }
    //                    }else {
    //                        if (tableJjrUser.confirmType == "2" || tableJjrUser.confirmType == "3" ||tableJjrUser.confirmType == "4"){      //未认证
    //                            setItems("edition","2");
    //                        }else if (tableJjrUser.confirmType == "1") {   //已认证
    //                            setItems("edition","3");
    //                        }
    //                    }
    //
    //
    //
    //                }
    //            }else {
    //                // 让用户选择身份，体验新手引导
    //                // $("#dialog, #mark").show();
    //                // $("#mark").css({"background" : "rgba(0, 0, 0, 0.6)"});
    //                // delItems("trialVersionRole");
    //            }
    //
    //
    //        } else {
    //            localStorage["role"]  = -1;
    //            if (!isNull(tableJjrUser.certificationStatus)){
    //                setItems("edition",tableJjrUser.certificationStatus);
    //                if (tableJjrUser.certificationStatus == 1){ //企业状态 0:试用/1:正式
    //                    // 让用户选择身份，体验新手引导
    //                    // $("#dialog, #mark").show();
    //                    // $("#mark").css({"background" : "rgba(0, 0, 0, 0.6)"});
    //                    // delItems("trialVersionRole");
    //                }else if (tableJjrUser.certificationStatus == 0){
    //                    setItems("trialVersionRole","normal");
    //                    var isAdmin = 0;
    //                    if (tableJjrUser.accountName == 'admin'){     //管理员账号
    //                        isAdmin = 1;
    //                        setItems("trialVersionRole","special")
    //                    }
    //                    if (resultObj.loginFlag == 0){     //登录标记 0:弹 1:不弹
    //                        if (tableJjrUser.confirmType == "2" || tableJjrUser.confirmType == "3" ||tableJjrUser.confirmType == "4" ){      //1:通过；2：试用，未认证；3：审核；4：失败。     未认证
    //                            setItems("edition","2");
    //                            var remainingDays = resultObj.remainingDays;        //剩余天数
    //                            var houseAmount = resultObj.houseAmount;        //已录房源数量
    //                            var certifiedHouseAcount = resultObj.certifiedHouseAcount;        //认证房源上限数量
    //                            var nocertifiedHouseAcount = resultObj.nocertifiedHouseAcount;        //未认证房源上限数量
    //                            var certifiedDataRetentionDays = resultObj.certifiedDataRetentionDays;        //认证数据保留天数：0/永久,1/30天,2/60天,3/90天
    //                            top.layer.open({
    //                                type: 2,
    //                                title: [
    //                                    "提示",
    //                                    'color: #86b22f; font-size:16px;'
    //                                ],
    //                                area: ['600px', "400px"],
    //                                zIndex:99,
    //                                content: 'tanCeng/uncertifiedTip.html?parentBodyId=index&isAdmin='+isAdmin+'&remainingDays='+remainingDays+'&houseAmount='+houseAmount+'&certifiedHouseAcount='+certifiedHouseAcount+'&nocertifiedHouseAcount='+nocertifiedHouseAcount+'&certifiedDataRetentionDays='+certifiedDataRetentionDays
    //                            })
    //                        }else if (tableJjrUser.confirmType == "1"){   //已认证
    //                            setItems("edition","3");
    //                            var tishiData = {
    //                                tipFirstcontent:"该试用账号将于"+resultObj.remainingDays+"天后停用，请咨询客服了解更多服务",   //第一行提示内容
    //                                tipSecondcontent:"客服热线：010-56013617",   //第二行提示内容
    //                                tipLeftButton:"",   //左侧按钮内容
    //                                tipRightButton:""   //右侧按钮内容
    //                            };
    //                            top.layer.open({
    //                                type: 2,
    //                                title: [
    //                                    "提示",
    //                                    'color: #86b22f; font-size:16px;'
    //                                ],
    //                                area: ['451px', "210px"],
    //                                zIndex:99,
    //                                content: 'tanCeng/trialVersionTips.html?parentBodyId=index&tipFirstcontent='+tishiData.tipFirstcontent+'&tipSecondcontent='+tishiData.tipSecondcontent+'&tipRightButton='+tishiData.tipRightButton
    //                            })
    //                        }
    //                    }else {
    //                        if (tableJjrUser.confirmType == "2" || tableJjrUser.confirmType == "3" ||tableJjrUser.confirmType == "4"){      //未认证
    //                            setItems("edition","2");
    //                        }else if (tableJjrUser.confirmType == "1") {   //已认证
    //                            setItems("edition","3");
    //                        }
    //                    }
    //
    //
    //
    //                }
    //            }
    //
    //        }
    //
    //    }
    //});
}
// 服务器存储选中的角色
function sendState(sendData) {
    $.send({
        url: "/v2/sys/table_jjr_user/save_landfall",
        data: sendData,
        success: function (json) {
            if (json.status.code == 200) {

            }else{
                top.ff.tips("error",json.status.msg);
            }
        }
    });
}
