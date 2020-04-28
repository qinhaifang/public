/**
 * Created by Long on 2017/6/16.
 */
var saveData = {
    title: '',//提醒标题
    content: '',//提醒内容
    remindTime: ''//提醒时间
};
//保存按钮
function saveAddRiCheng() {
    saveData.remindTime = $("#date").val();
    saveData.content = $("#content").val();
    var sendData = saveData;
    saveAddRiChengData(sendData);
}


















