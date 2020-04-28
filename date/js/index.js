/**
 * Created by wx on 2019/8/14.
 */

$(function()
{
    if (!window['console'])
    {
        window.console = {};
        window.console.log = function(){};
    }

    /*
     define a new language named "custom"
     */
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();

    var week_start_date,week_end_date;

    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
    Day = '0' + Day;
}
    var year_month_day = Year + '-' + Month + '-' + Day ;

    var set_month_date = date.setDate(1);
    var set_month_year = date.getFullYear();
    var set_month_month = date.getMonth() + 1;
    var set_month_day = date.getDate();
    set_month_month = ('0' + set_month_month).substr(-2);
    set_month_day = ('0' + set_month_day).substr(-2);
    var month_start_date = set_month_year + '-' + set_month_month + '-' + set_month_day;
    //最后一天
    var last_month = date.getMonth();
    var last_month_count = ++last_month;
    var new_last = new Date(date.getFullYear(),last_month_count,1);
    var oneDay = 1000*60*60*24;
    var last_month_date = new Date(new_last - oneDay);
    var set_month_last_day = last_month_date.getDate();
    set_month_last_day = ('0'+set_month_last_day).substr(-2);
    var month_end_date =  set_month_year + '-' + set_month_month + '-' + set_month_last_day;
    // 获取周
    var date = new Date(year_month_day);
    date.setDate(date.getDate() - (date.getDay() + 7) % 7);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length == 1){
        month = '0' + month;
    }if(String(day).length == 1){
    day = '0' + day;
}
    week_start_date = year +'-'+ month + '-' + day;
    date.setDate(date.getDate() + 6);
    var year_end = date.getFullYear();
    var month_end = date.getMonth()+1;
    var day_end = date.getDate();
    if(String(month_end).length == 1){
        month_end = '0' + month_end;
    }if(String(day_end).length == 1){
    day_end = '0' + day_end;
}

    week_end_date = year_end + '-' + month_end + '-' + day_end;
    $('.startDate').text(week_start_date);
    $('.endDate').text(week_end_date);




    $.dateRangePickerLanguages['custom'] =
    {
        'selected': 'Choosed:',
        'days': 'Days',
        'apply': 'Close',
        'week-1' : 'Mon',
        'week-2' : 'Tue',
        'week-3' : 'Wed',
        'week-4' : 'Thu',
        'week-5' : 'Fri',
        'week-6' : 'Sat',
        'week-7' : 'Sun',
        'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
        'shortcuts' : 'Shortcuts',
        'past': 'Past',
        '7days' : '7days',
        '14days' : '14days',
        '30days' : '30days',
        'previous' : 'Previous',
        'prev-week' : 'Week',
        'prev-month' : 'Month',
        'prev-quarter' : 'Quarter',
        'prev-year' : 'Year',
        'less-than' : 'Date range should longer than %d days',
        'more-than' : 'Date range should less than %d days',
        'default-more' : 'Please select a date range longer than %d days',
        'default-less' : 'Please select a date range less than %d days',
        'default-range' : 'Please select a date range between %d and %d days',
        'default-default': 'This is costom language'
    };

    $('input[name=mode]').change(function(e){
        var ele_id = $('.wrapper').attr('data-id');
        var o = $('#datepicker').data('dateRangePicker');
        if(typeof o == 'object'){
            o.destroy();
        }

        if($(this).val() == 'day'){
            $(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
            $('.shopForce').show();
        }else if($(this).val() == 'week'){
            $(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
            $('.shopForce').show();
        }else if($(this).val() == 'month'){
            $(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
            $('.shopForce').show();
        }else if($(this).val() == 'customize'){
            $(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
            $('.shopForce').hide();
        }
        var date1 = $('#'+ele_id).attr('data-date1');
        var date2 = $('#'+ele_id).attr('data-date2');
        var langCodes = '';
        if(getUrlParam('lang') == '' || getUrlParam('lang') == 'undefined'){
            langCodes = 'cn'
        }else{
            langCodes = getUrlParam('lang')
        }
        switch($(this).val()){
            case 'month':
                $('#datepicker').dateRangePicker(
                    {
                        startOfWeek: 'monday',
                        batchMode: 'month',
                        singleMonth: true,
                        language:langCodes,
                        showShortcuts: false,
                        inline:true,
                        container: '#pickerContainer',
                        alwaysOpen:true,
                    }).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
                    var date1 = obj.date1;
                    var year = obj.date1.getFullYear();
                    var month = obj.date1.getMonth()+1;
                    var day = obj.date1.getDate();
                    month = ('0'+month).substr(-2);
                    day = ('0'+day).substr(-2);
                    var date2 = obj.date2;
                    var year2 = obj.date2.getFullYear();
                    var month2 = obj.date2.getMonth()+1;
                    var day2 = obj.date2.getDate();
                    month2 = ('0'+month2).substr(-2);
                    day2 = ('0'+day2).substr(-2);
                    var month_start = year + '-' + month + '-' + day;
                    var month_end = year2 + '-' + month2 + '-' + day2;

                    $('.wrapper').attr('data-date1',month_start);
                    $('.wrapper').attr('data-date2',month_end);
                    $('#'+ele_id).attr('data-date1',month_start);
                    $('#'+ele_id).attr('data-date2',month_end);
                    $('#'+ele_id).attr('data-mode','month');
                    $('.wrapper').attr('data-mode','month');
                })
                break;
            case 'week':
                $('#datepicker').dateRangePicker(
                    {
                        startOfWeek: 'monday',
                        batchMode: 'week',
                        singleMonth: true,
                        language:langCodes,
                        showShortcuts: false,
                        inline:true,
                        container: '#pickerContainer',
                        alwaysOpen:true
                    }).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
                    var date1 = obj.date1;
                    var year = obj.date1.getFullYear();
                    var month = obj.date1.getMonth()+1;
                    var day = obj.date1.getDate();
                    month = ('0'+month).substr(-2);
                    day = ('0'+day).substr(-2);
                    var date2 = obj.date2;
                    var year2 = obj.date2.getFullYear();
                    var month2 = obj.date2.getMonth()+1;
                    var day2 = obj.date2.getDate();
                    month2 = ('0'+month2).substr(-2);
                    day2 = ('0'+day2).substr(-2);
                    var week_start = year + '-' + month + '-' + day;
                    var week_end = year2 + '-' + month2 + '-' + day2;
                    $('.wrapper').attr('data-date1',week_start);
                    $('.wrapper').attr('data-date2',week_end);
                    $('#'+ele_id).attr('data-date1',week_start);
                    $('#'+ele_id).attr('data-date2',week_end);
                    $('#'+ele_id).attr('data-mode','week');
                    $('.wrapper').attr('data-mode','week');
                })
                break;
            case 'day':
                $('#datepicker').dateRangePicker(
                    {
                        startOfWeek: 'monday',
                        singleDate:true,
                        singleMonth:true,
                        language:langCodes,
                        showShortcuts: false,
                        inline:true,
                        container: '#pickerContainer',
                        alwaysOpen:true
                    }).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
                    var date1 = obj.date1;
                    var year = obj.date1.getFullYear();
                    var month = obj.date1.getMonth()+1;
                    var day = obj.date1.getDate();
                    month = ('0'+month).substr(-2);
                    day = ('0'+day).substr(-2);
                    var day_date = year + '-' + month + '-' + day;
                    $('.wrapper').attr('data-date1',day_date);
                    $('.wrapper').attr('data-date2',day_date);
                    $('.wrapper').attr('data-mode','day');
                    $('#'+ele_id).attr('data-date1',day_date);
                    $('#'+ele_id).attr('data-date2',day_date);
                    $('#'+ele_id).attr('data-mode','day');
                })

                break;
            case 'customize':
                $('#datepicker').dateRangePicker(
                    {
                        startOfWeek: 'monday',
                        language:langCodes,
                        showShortcuts: false,
                        inline:true,
                        container: '#pickerContainer',
                        alwaysOpen:true
                    }).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
                    var date1 = obj.date1;
                    var year = obj.date1.getFullYear();
                    var month = obj.date1.getMonth()+1;
                    var day = obj.date1.getDate();
                    month = ('0'+month).substr(-2);
                    day = ('0'+day).substr(-2);
                    var date2 = obj.date2;
                    var year2 = obj.date2.getFullYear();
                    var month2 = obj.date2.getMonth()+1;
                    var day2 = obj.date2.getDate();
                    month2 = ('0'+month2).substr(-2);
                    day2 = ('0'+day2).substr(-2);
                    var range_start = year + '-' + month + '-' + day;
                    var range_end = year2 + '-' + month2 + '-' + day2;

                    $('.wrapper').attr('data-date1',range_start);
                    $('.wrapper').attr('data-date2',range_end);
                    $('.wrapper').attr('data-mode','customize');
                    $('#'+ele_id).attr('data-date1',range_start);
                    $('#'+ele_id).attr('data-date2',range_end);
                    $('#'+ele_id).attr('data-mode','customize');
                })
                break;
        }

    });
    $(document).on('click','#datepicker',function(){
        $('.wrapper').attr('data-id',$(this).attr('id'));

        var val = $(this).attr('data-mode');

        if($(this).attr('id') == 'datepicker4'){
            if(!!!val){
                val = 'month';
                $('#dp-week').hide();
                $('#dp-day').hide();
                $('#dp-range').hide();
            }else{
                $('#dp-week').hide();
                $('#dp-day').hide();
                $('#dp-range').hide();
            }
        }else{
            if(!!!val){
                val = 'day';
                $('#dp-week').show();
                $('#dp-day').show();
                $('#dp-range').show();
            }else{
                $('#dp-week').show();
                $('#dp-day').show();
                $('#dp-range').show();
            }
        }

        $('input[name=mode][value='+val+']').prop('checked',true);
        $('input[name=mode][value='+val+']').change();

        var date1 = $(this).attr('data-date1');
        var date2 = $(this).attr('data-date2');
        if(!!date1 && !!date2){
            $(this).data('dateRangePicker').setDateRange(date1,date2);
        }


        $('.background').show();
        $('.wrapper').show();
        $('body').css('overflow','hidden');
    })

    $('#pickerBox .close').click(function(){
        $('#pickerBox').hide();
    });

    $('.btn').click(function(e){
        var type = $('.wrapper').attr('data-mode');
        if(type == 'day'){
            var date1 = $(e.target).parents('.wrapper').attr('data-date1');
            var date2 = '';
            $('.startDate').text(date1);
            $('.endDate').text(date2);
            $('.icondate').hide();
        }else{
            var date1 = $(e.target).parents('.wrapper').attr('data-date1');
            var date2 = $(e.target).parents('.wrapper').attr('data-date2');
            $('.startDate').text(date1);
            $('.endDate').text(date2);
            $('.icondate').show();
        }
        $('.wrapper').hide();
    })

});
// ----------------------------------------------------------------
// jQuery(function()
// {
// 	var $ = jQuery;
// 	var date1='',date2='';
// 	if (!window['console'])
// 	{
// 		window.console = {};
// 		window.console.log = function(){};
// 	}

// 	/*
// 	define a new language named "custom"
// 	*/
// 	var date = new Date();
//   var Year = date.getFullYear();
//   var Month = date.getMonth() + 1;
//   var Day = date.getDate();

//   var week_start_date,week_end_date;

//   if(String(Month).length == 1){
//       Month = '0' + Month;
//   }if(String(Day).length == 1){
//       Day = '0' + Day;
//   }
//   var year_month_day = Year + '-' + Month + '-' + Day ;

//   var set_month_date = date.setDate(1);
//   var set_month_year = date.getFullYear();
//   var set_month_month = date.getMonth() + 1;
//   var set_month_day = date.getDate();
//   set_month_month = ('0' + set_month_month).substr(-2);
//   set_month_day = ('0' + set_month_day).substr(-2);
//   var month_start_date = set_month_year + '-' + set_month_month + '-' + set_month_day;
// 	//最后一天
// 	var last_month = date.getMonth();
// 	var last_month_count = ++last_month;
// 	var new_last = new Date(date.getFullYear(),last_month_count,1);
// 	var oneDay = 1000*60*60*24;
// 	var last_month_date = new Date(new_last - oneDay);
// 	var set_month_last_day = last_month_date.getDate();
// 	set_month_last_day = ('0'+set_month_last_day).substr(-2);
// 	var month_end_date =  set_month_year + '-' + set_month_month + '-' + set_month_last_day;
// 	$.dateRangePickerLanguages['custom'] =
// 	{
// 		'selected': 'Choosed:',
// 		'days': 'Days',
// 		'apply': 'Close',
// 		'week-1' : 'Mon',
// 		'week-2' : 'Tue',
// 		'week-3' : 'Wed',
// 		'week-4' : 'Thu',
// 		'week-5' : 'Fri',
// 		'week-6' : 'Sat',
// 		'week-7' : 'Sun',
// 		'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
// 		'shortcuts' : 'Shortcuts',
// 		'past': 'Past',
// 		'7days' : '7days',
// 		'14days' : '14days',
// 		'30days' : '30days',
// 		'previous' : 'Previous',
// 		'prev-week' : 'Week',
// 		'prev-month' : 'Month',
// 		'prev-quarter' : 'Quarter',
// 		'prev-year' : 'Year',
// 		'less-than' : 'Date range should longer than %d days',
// 		'more-than' : 'Date range should less than %d days',
// 		'default-more' : 'Please select a date range longer than %d days',
// 		'default-less' : 'Please select a date range less than %d days',
// 		'default-range' : 'Please select a date range between %d and %d days',
// 		'default-default': 'This is costom language'
// 	};

// 	$('input[name=mode]').change(function(e){
// 		var ele_id = $('.wrapper').attr('data-id');
// 		// $('#'+ele_id).attr('data-mode',$(this).val());
// 		var o = $('#'+ele_id).data('dateRangePicker');
// 		if(typeof o == 'object'){
// 			o.destroy();
// 		}

// 		$('.datepicker').each(function(){
// 			var o = $(this).data('dateRangePicker');
// 			if(typeof o == 'object'){
// 				o.destroy();
// 			}
// 		})

// 		if($(this).val() == 'day'){
// 			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
// 			$('.shopForce').show();
// 		}else if($(this).val() == 'week'){
// 			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
// 			$('.shopForce').show();
// 		}else if($(this).val() == 'month'){
// 			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
// 			$('.shopForce').show();
// 		}else if($(this).val() == 'customize'){
// 			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
// 			$('.shopForce').hide();
// 		}

// 		var date1 = $('#'+ele_id).attr('data-date1');
// 		var date2 = $('#'+ele_id).attr('data-date2');
// 		switch($(this).val()){
// 			case 'month':
// 				$('#'+ele_id).dateRangePicker(
// 				{
// 					startOfWeek: 'monday',
// 					batchMode: 'month',
// 					singleMonth: true,
// 					language:'cn',
// 					showShortcuts: false,
// 					inline:true,
// 					container: '#pickerContainer',
// 					alwaysOpen:true,
// 				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
// 					var date1 = obj.date1;
// 					var year = obj.date1.getFullYear();
// 					var month = obj.date1.getMonth()+1;
// 					var day = obj.date1.getDate();
// 					month = ('0'+month).substr(-2);
// 					day = ('0'+day).substr(-2);
// 					var date2 = obj.date2;
// 					var year2 = obj.date2.getFullYear();
// 					var month2 = obj.date2.getMonth()+1;
// 					var day2 = obj.date2.getDate();
// 					month2 = ('0'+month2).substr(-2);
// 					day2 = ('0'+day2).substr(-2);
// 					var month_start = year + '-' + month + '-' + day;
// 					var month_end = year2 + '-' + month2 + '-' + day2;

// 					$('.wrapper').attr('data-date1',month_start);
// 					$('.wrapper').attr('data-date2',month_end);
// 					$('#'+ele_id).attr('data-date1',month_start);
// 					$('#'+ele_id).attr('data-date2',month_end);
// 					$('#'+ele_id).attr('data-mode','month');
// 					$('.wrapper').attr('data-mode','month');
// 				})
// 				// if(date1 == undefined || date2 == undefined){
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(month_start_date);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(month_end_date);
// 				// }else{
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
// 				// }

// 			break;
// 			case 'week':
// 				$('#'+ele_id).dateRangePicker(
// 				{
// 				startOfWeek: 'monday',
// 				batchMode: 'week',
// 				singleMonth: true,
// 				language:'cn',
// 				showShortcuts: false,
// 				inline:true,
// 				container: '#pickerContainer',
// 				alwaysOpen:true
// 				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
// 					var date1 = obj.date1;
// 					var year = obj.date1.getFullYear();
// 					var month = obj.date1.getMonth()+1;
// 					var day = obj.date1.getDate();
// 					month = ('0'+month).substr(-2);
// 					day = ('0'+day).substr(-2);
// 					var date2 = obj.date2;
// 					var year2 = obj.date2.getFullYear();
// 					var month2 = obj.date2.getMonth()+1;
// 					var day2 = obj.date2.getDate();
// 					month2 = ('0'+month2).substr(-2);
// 					day2 = ('0'+day2).substr(-2);
// 					var week_start = year + '-' + month + '-' + day;
// 					var week_end = year2 + '-' + month2 + '-' + day2;
// 					$('.wrapper').attr('data-date1',week_start);
// 					$('.wrapper').attr('data-date2',week_end);
// 					$('#'+ele_id).attr('data-date1',week_start);
// 					$('#'+ele_id).attr('data-date2',week_end);
// 					$('#'+ele_id).attr('data-mode','week');
// 					$('.wrapper').attr('data-mode','week');
// 				})

// 				// if(date1 == undefined || date2 == undefined){
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(week_start_date);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(week_end_date);
// 				// }else{
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
// 				// }

// 			break;
// 			case 'day':
// 				$('#'+ele_id).dateRangePicker(
// 				{
// 				startOfWeek: 'monday',
// 				singleDate:true,
// 				singleMonth:true,
// 				language:'cn',
// 				showShortcuts: false,
// 				inline:true,
// 				container: '#pickerContainer',
// 				alwaysOpen:true
// 				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
// 					var date1 = obj.date1;
// 					var year = obj.date1.getFullYear();
// 					var month = obj.date1.getMonth()+1;
// 					var day = obj.date1.getDate();
// 					month = ('0'+month).substr(-2);
// 					day = ('0'+day).substr(-2);
// 					var day_date = year + '-' + month + '-' + day;
// 					$('.wrapper').attr('data-date1',day_date);
// 					$('.wrapper').attr('data-date2',day_date);
// 					$('.wrapper').attr('data-mode','day');
// 					$('#'+ele_id).attr('data-date1',day_date);
// 					$('#'+ele_id).attr('data-date2',day_date);
// 					$('#'+ele_id).attr('data-mode','day');
// 				})
// 				// if(date1 == undefined){
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(year_month_day);
// 				// }else{
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
// 				// }
// 			break;
// 			case 'customize':
// 				$('#'+ele_id).dateRangePicker(
// 				{
// 				startOfWeek: 'monday',
// 				language:'cn',
// 				showShortcuts: false,
// 				inline:true,
// 				container: '#pickerContainer',
// 				alwaysOpen:true
// 				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
// 					var date1 = obj.date1;
// 					var year = obj.date1.getFullYear();
// 					var month = obj.date1.getMonth()+1;
// 					var day = obj.date1.getDate();
// 					month = ('0'+month).substr(-2);
// 					day = ('0'+day).substr(-2);
// 					var date2 = obj.date2;
// 					var year2 = obj.date2.getFullYear();
// 					var month2 = obj.date2.getMonth()+1;
// 					var day2 = obj.date2.getDate();
// 					month2 = ('0'+month2).substr(-2);
// 					day2 = ('0'+day2).substr(-2);
// 					var range_start = year + '-' + month + '-' + day;
// 					var range_end = year2 + '-' + month2 + '-' + day2;

// 					$('.wrapper').attr('data-date1',range_start);
// 					$('.wrapper').attr('data-date2',range_end);
// 					$('.wrapper').attr('data-mode','customize');
// 					$('#'+ele_id).attr('data-date1',range_start);
// 					$('#'+ele_id).attr('data-date2',range_end);
// 					$('#'+ele_id).attr('data-mode','customize');
// 				})
// 				// if(date1 == undefined || date2 == undefined){
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(year_month_day);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(year_month_day);
// 				// }else{
// 				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
// 				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
// 				// }
// 			break;
// 		}
// 		$('#'+ele_id).data('dateRangePicker').clear();

// 	});

// 	$('.datepicker').click(function(e){
//     $('.wrapper').attr('data-id',$(this).attr('id'));

// 		var val = $(this).attr('data-mode');
// 		if(!!!val){
// 				val = 'week';
// 		}

// 		$('input[name=mode][value='+val+']').prop('checked',true);
// 		$('input[name=mode][value='+val+']').change();

// 		var date1 = $(this).attr('data-date1');
// 		var date2 = $(this).attr('data-date2');
// 		if(!!date1 && !!date2){
// 			$(this).data('dateRangePicker').setDateRange(date1,date2);
// 		}


// 		$('#bg').show();
//     $('.wrapper').show();
//     $('body').css('overflow','hidden');
// 	})


// // 日历确定button
// 	$('#date_sure').click(function(e){
// 		var type = $('.wrapper').attr('data-mode');
// 		$('#bg').hide();
// 		$('.wrapper').hide();
// 		if(type == 'day'){
// 			date1 = $(e.target).parents('.wrapper').attr('data-date1');
//       date2 = '';
//       $('.date_text1 .start').text(date1);
//       $('.date_text1 .end').text(date2);
//       $('.date_text1 .icondate').hide();
// 		}else if(type == 'week' || type == "month" || type == 'customize'){
// 			date1 = $(e.target).parents('.wrapper').attr('data-date1');
//       date2 = $(e.target).parents('.wrapper').attr('data-date2');
//       $('.date_text1 .start').text(date1);
//       $('.date_text1 .end').text(date2);
//       $('.date_text1 .icondate').show();
// 		}



// 		var ele_id = $('.wrapper').attr('data-id');
// 		// $('#'+ele_id).attr('data-mode',$(this).val());
// 		var o = $('#'+ele_id).data('dateRangePicker');
// 		if(typeof o == 'object'){
// 			o.destroy();
// 		}

// 	})

// 	// // 获取周
//   var date = new Date(year_month_day);
//   date.setDate(date.getDate() - (date.getDay() + 7) % 7);
//   var year = date.getFullYear();
//   var month = date.getMonth()+1;
//   var day = date.getDate();
//   if(String(month).length == 1){
//       month = '0' + month;
//   }if(String(day).length == 1){
//       day = '0' + day;
//   }
//   week_start_date = year +'-'+ month + '-' + day;
//   date.setDate(date.getDate() + 6);
//   var year_end = date.getFullYear();
//   var month_end = date.getMonth()+1;
//   var day_end = date.getDate();
//   if(String(month_end).length == 1){
//       month_end = '0' + month_end;
//   }if(String(day_end).length == 1){
//       day_end = '0' + day_end;
//   }

//   week_end_date = year_end + '-' + month_end + '-' + day_end;
//   $('.start').text(week_start_date);
// 	$('.end').text(week_end_date);

// });

