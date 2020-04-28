
//提示信息
//有三种提示功能，1、成功，2、失败，3、警告
//插件类名通过ff-[插件名]-[用途/示意]的规范进行定义，避免多插件引起冲突的的问题
//插件名通过ff.[插件名]进行定义，ff为window或global对象下的全局属性，用来定义插件的命名作用域，同样是为了防止命名冲突

/**
*使用方法:ff.tips("success","保存成功");
**/
!(function(_){
	//icon-success/error/info三种类型
	//text-提示显示的文字-使用innerHTML，所以内容可以是html标签内容。
	//fn-提示展现完成时的回掉函数
	//timer-提示停留的事件
	var tips=function(icon,text,timer){
		return new tips.fn.init(icon,text,timer);
	}
	//提示插件的html模板
	var html='\
			<div class="ff-tips-inner">\
			  <div id="ff-tips-icon-id" class="ff-tips-icon"></div>\
			  <div id="ff-tips-text-id" class="ff-tips-text"></div>\
			</div>\
			  ';
	//提示插件的css样式
	//将样式写在插件内部，形成更强的封装性
	var cssrules=['.ff-tips-wrapper{position:fixed;z-index:2100000000;white-space:nowrap;left:0;right:0;top:-45px;point-events:none;font-size:0;text-align:center;}',
			'.ff-tips-inner{display:inline-block;white-space:nowrap;box-shadow:0px 0px 12px 4px rgba(0,0,0,0.08);border-radius:2px;}',
			'.ff-tips-icon{height:40px;width:40px;display:inline-block;vertical-align:top;}',
			'.ff-tips-text{line-height:40px;padding:0 24px;background:#ffffff;font-size:14px;display:inline-block;color:#8391a5;vertical-align:top;}',
			'.ff-tips-state-info{background:url(/images/tips-info.png) center no-repeat;background-size:100% 100%;}',
			'.ff-tips-state-success{background:url(/images/tips-success.png) center no-repeat;background-size:100% 100%;}',
			'.ff-tips-state-error{background:url(/images/tips-error.png) center no-repeat;background-size:100% 100%;}',
			];
	//实现js的动画封装
var requestA=top.requestAnimationFrame||top.webkitRequestAnimationFrame||top.mozRequestAnimationFrame||top.oRequestAnimaitonFrame||function(callback){return top.setTimeout(callback,1000/60);};
function moAnimate(elm,tm,funarg){
        if(typeof elm === 'string'){
            elm=document.getElementById(elm);
        }
        tm=tm||300;
        var startTime=0;
        if(window.performance&&window.performance.now){
            startTime=window.performance.now();
        }else{
            startTime=Date.now();
        }
        funarg=funarg||function(){};
        requestA(function(){//使用requestA同步帧调用动画实现方法。
            moRequest(elm,startTime,tm,funarg);
        });
    }
  function moRequest(elm,startTime,tm,funarg){
        var currTime=0,name="";
        if(window.performance&&window.performance.now){
            currTime=window.performance.now();
        }else{
            currTime=Date.now();
        }
        /*if(!startTime){
            startTime=currTime;
            id=requestA(function(){moRequest(elm,startTime,tm,funarg);});
            return ;
        }*/
        var percent=(currTime-startTime)/tm;//通过当前时间与开始时间的差值与所需动画时间对比
        percent=percent>1?1:percent;//得到运行的进度值。
        if(percent>=1){
            funarg.call(elm,percent);//将进度值传递给回调函数
        }else{
            funarg.call(elm,percent);
            id=requestA(function(){moRequest(elm,startTime,tm,funarg);});//递归调用moRequest方法。
        }
         
    }
	//用来保存单例模式的句柄。
	var sington=null;
	//默认提示停留事件
	var dtimer=2200;
	var dicon="info";
	tips.fn = tips.prototype={
		init:function(icon,text,timer){
			var div=top.document.createElement("div");
			div.className="ff-tips-wrapper";
			div.innerHTML=html;
			//保存dom对象
			top.document.body.appendChild(div);
			this.wrapper=div;
			console.log(div);
			this.iconcont=div.querySelector("#ff-tips-icon-id");
			var icon=icon||dicon;
			this.iconcont.className+=" ff-tips-state-"+icon;
			this.textcont=div.querySelector("#ff-tips-text-id");
			var osheet=top.document.getElementById("ff-tips-sheet18530");
			if(!osheet){
				var style=top.document.createElement("style");
				style.id="ff-tips-sheet18530";
				style.type="text/css";
				top.document.getElementsByTagName("head")[0].appendChild(style);
				var sheet=style.sheet||style.styleSheet;
				for(var i=0;i<cssrules.length;i++){
					if(sheet.insertRule){
						sheet.insertRule(cssrules[i],0);
					}
				}
			}
			this.show(icon,text,timer);
		},
		show(icon,text,timer){
			this.textcont.innerHTML=text;
			var timer=timer||dtimer;
			//this.wrapper.style.cssText="transition:all 0.4s;transform:translateY(0);top:20px;";
			moAnimate(this.wrapper,150,function(per){
				this.style.cssText="top:"+(per*70-45)+"px";
				console.log("top:"+(per*70-45));
				if(per==1){
					var th=this;
					console.log("timer:"+timer);
					setTimeout(function(){
						moAnimate(th,150,function(per){
							this.style.cssText="top:"+(30-per*70)+"px";
							if(per==1){
								top.document.body.removeChild(th);
							}
						});
						
					},timer);
				}
			});
			
		}
	}
	tips.fn.init.prototype=tips.fn;
	if(!_.ff){
		_.ff={};
	}
	ff.tips=tips;

}(window));