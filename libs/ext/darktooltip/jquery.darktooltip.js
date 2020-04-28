(function($) {
	function DarkTooltip(element, options){
		this.bearer = element;
		this.options = options;
		this.delay;
	}

	DarkTooltip.prototype = {
		show: function(){
			//Close all other tooltips
			$('ins.dark-tooltip').hide();
			window.clearTimeout(this.delay);
			this.tooltip.css('display', 'block');
		},

		hide: function(){
			this.tooltip.hide();
		},

		toggle: function(){
			if(this.tooltip.is(":visible")){
				this.hide();
			}else{
				this.show();
			}
		},

		addAnimation: function(){
			switch(this.options.animation){
				case 'none':
					break;
				case 'fadeIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('fadeIn');
					break;
				case 'flipIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('flipIn');
					break;
			}
		},

		setContent: function(){
			$(this.bearer).css('cursor', 'pointer');
			//Get tooltip content
			if(this.options.content){
				this.content = this.options.content;
			}else if(this.bearer.attr("data-tooltip")){
				this.content = this.bearer.attr("data-tooltip");
			}else{
				console.log("No content for tooltip: " + this.bearer.selector);
				return;
			}
			if(this.content.charAt(0) == '#'){
				$(this.content).hide();
				this.content = $(this.content).html();
				this.contentType='html';
			}else{
				this.contentType='text';
			}
			//Create tooltip container
			this.tooltip = $("<ins class = 'dark-tooltip " + this.options.theme + " " + this.options.size + " " 
				+ this.options.gravity + "'><div>" + this.content + "</div><div class = 'tip'></div></ins>");
			this.tip = this.tooltip.find(".tip");
			
			$(this.bearer).append(this.tooltip);
			//Adjust size for html tooltip
			if(this.contentType == 'html'){
				this.tooltip.css('max-width','none');
			}
			this.tooltip.css('opacity', this.options.opacity);
			this.addAnimation();
			if(this.options.confirm){
				this.addConfirm();
			}
		},

		setPositions: function(){
			var t = this;
			var leftPos = 0;
			var topPos = 0;
			var bearerTop = this.bearer.offset().top;
			var bearerLeft = this.bearer.offset().left;
			if(this.bearer.css('position')=='fixed' || this.bearer.css('position')=='absolute'){
				bearerTop=0;
				bearerLeft=0;
			}
			switch(this.options.gravity){
				case 'south':
					leftPos = bearerLeft + this.bearer.outerWidth()/2 - this.tooltip.outerWidth()/2;
					topPos = bearerTop - this.tooltip.outerHeight() - this.tip.outerHeight()/2;
					break;
				case 'west':
					leftPos = bearerLeft + this.bearer.outerWidth() + this.tip.outerWidth()/2;
					topPos = bearerTop + this.bearer.outerHeight()/2 - (this.tooltip.outerHeight()/2);
					break;
				case 'north':
					leftPos = bearerLeft + this.bearer.outerWidth()/2 - (this.tooltip.outerWidth()/2);
					topPos = bearerTop + this.bearer.outerHeight() + this.tip.outerHeight()/2;
					break;
				case 'east':
					leftPos = bearerLeft - this.tooltip.outerWidth() - this.tip.outerWidth()/2;
					topPos = bearerTop + this.bearer.outerHeight()/2 - this.tooltip.outerHeight()/2;
					break;
			}
			this.tooltip.css('left', leftPos);
			this.tooltip.css('top', topPos);
			$(this.tooltip).unbind("click");
			$(this.tooltip).click(function(){
				t.onClick();
			});
		},

		setEvents: function(){
			var dt = this;
			if(this.options.trigger == "hover" || this.options.trigger == "mouseover" || this.options.trigger == "onmouseover"){
				this.bearer.mouseover( function(){
					dt.setPositions();
					dt.show();
				}).mouseout( function(){
					dt.hide();
				});
			}else if(this.options.trigger == "click" || this.options.trigger == "onclik"){
				this.tooltip.click( function(e){
					e.stopPropagation();
				});
				this.bearer.click( function(e){
					e.preventDefault();
					dt.setPositions();
					dt.toggle();
					e.stopPropagation();
				});
				$('html').click(function(){
					dt.hide();
				})
			}
		},

		activate: function(){
			this.setContent();
			if(this.content){
				this.setEvents();
			}
		},
		onClick: function(){
			this.options.onClick(this.bearer); 
		}
	}

	$.fn.darkTooltip = function(options) {
		this.each(function(){
			options = $.extend({}, $.fn.darkTooltip.defaults, options);
			var tooltip = new DarkTooltip($(this), options);
			tooltip.activate();
		});	
	}

	$.fn.darkTooltip.defaults = {
        opacity: 0.9,
        content:'',
        size: 'medium',
        gravity: 'south',
        theme: 'dark',
        trigger: 'hover',
        animation: 'none',
        onClick: function(){}
    };

})(jQuery);
