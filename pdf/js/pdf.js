/**
 * Created by wx on 2019/8/19.
 */
//备注：打印出来是黑色的一大半的原因是下边控制高度的代码，需注释掉


initMapWindows();
//初始化内容区域高度
function initMapWindows() {
    $("#pdfs").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
}
//监听浏览器可视区域触发事件
$(window).resize(function () {
    $("#pdfs").css({"height":($(window).height()-50) + "px"},{"width":($(window).width()-180) + "px"});
});
var downPdf = document.getElementById("renderPdf");
downPdf.onclick = function() {
    html2canvas(document.getElementById("content"), {
        onrendered:function(canvas) {

            //返回图片dataURL，参数：图片格式和清晰度(0-1)
            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
            var pdf = new jsPDF('', 'pt', 'a4');

            //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
            //无分页的情况
            // ------开始------
             pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height )
            // ------结束------
            // 分页的情况
            //当内容未超过pdf一页显示的范围，无需分页
            //--------分页开始--------
            var leftHeight = canvas.height;
                //pdf页面偏移
            var position = 0;
            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = canvas.width / 592.28 * 841.89;
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
            }else{
                while(leftHeight > 0) {
                    //20 是设置边距的
                    pdf.addImage(pageData, 'JPEG', 0, position, 595.28, 592.28/canvas.width * canvas.height)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            //--------分页结束--------
            pdf.save('stone.pdf');
        },
        background: "#fff"
    })
}