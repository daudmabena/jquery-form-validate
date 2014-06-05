/* 
 * jQuery.formValidate v1.1.1.
 * jQuery Plugin to validate some basic types of data input.
 * (c)2014 Rafael Maruta - rafaelmaruta@gmail.com - www.lotuscreative.com.br.
 * Released under the MIT license.
 * 
 * Accepts the following parameters: type, alertBox, borderOriginalColor, isreqAlert, ismailAlert, isnumAlert, isdateAlert.
 * 
 * Use the parameter values for type:
 * - 'reset' to reset all the border input colors and the alert box changed by the validation. The form element needs to be in the selector;
 * - 'isreq' (default) for required fields;
 * - 'ismail' to require an e-mail address valid format;
 * - 'isnum' to require numbers;
 * - 'isdate' to require a date valid format. The default values are DDMMYYYY, DDMMYY, YYYYMMDD and YYMMDD, with '/', '-' and '.' as optional separators.
 * 
 * The parameter alertBox is the selector where the alert messages appears. You can personalize for each field, including the use of relative elements.
 * 
 * The parameter borderOriginalColor is the original color of the input borders, because sometimes JavaScript can't save the element original color when modified.
 * 
 * The parameters isreqAlert, ismailAlert, isnumAlert, isdateAlert are the alert messages when input data errors happen. For default it takes the 'name' element
 * attribute value and replaced at {xxxxx} expression.
 * 
 * Call examples:
 * 
 *	$(document).ready(function()
 * 	{
 * 		$('form').bind('submit',function()
 * 		{
 * 			$(this).formValidate({type:'reset'});
 * 			$('#div1,#div2,#div3').formValidate();
 * 			$('#div2').formValidate({type:'ismail'});
 * 			$('#div4').formValidate({type:'isdate'});
 * 			return false;
 * 		});
 * 	});
 * 
 * If some of the validations is invalid, it returns false, so it can be used this way:
 * 
 * 	$(document).ready(function()
 * 	{
 * 		$('form').bind('submit',function()
 * 		{
 * 			$(this).formValidate({type:'reset'});
 * 			if (!$('#div1,#div2,#div3').formValidate() || !$('#div2').formValidate({type:'ismail'}) || !$('#div4').formValidate({type:'isdate'}))
 * 				window.console.log(false); // There're errors, needs to be fixed.
 *	 		else
 * 				window.console.log(true); // So submit the form.
 * 			return false;
 * 		});
 * 	});
 * 
 * Any sugestions please contact me.
*/

(function()
{
	$.fn.formValidate = function(options)
	{
		/* Setting options. They can be overwritten */
		var opts = $.extend({},$.fn.formValidate.defaults,options);
		var _val;
		
		/* Object that holds the validation functions */
		var valida = 
		{
			/* Resets all the form input fields and alert box formatted by the plugin's validation */
			resetFields:function(x)
			{
				$(x).find('input[type="text"],input[type="password"],textarea,select').css('border','1px solid ' + opts.borderOriginalColor);
				$(opts.alertBox).text('');
			},
			/* Checks the required fields */
			noEmpty:function(x)
			{
				_val = true;
				x.each(function()
				{
					/* If the field is empty */
					if (!$.trim($(this).val()))
					{
						/* Colorize the empty field */
						$(this).css('border','1px solid ' + opts.borderAlertColor);
						/* Appends the message in the alert box */
						$(opts.alertBox).append(opts.isreqAlert.replace('{isreq}',$(this).attr('name')) + '<br />');
						_val = false;
					};
				});
				return _val;
			},
			/* Checks the if is e-mail format */
			isEmail:function(x)
			{
				_val = true;
				x.each(function()
				{
					/* Checks if the '@' and '.' are present and if there's a '.' after the '@' */
					if ($(this).val().indexOf('@') == -1 || $(this).val().indexOf('.') == -1 || $(this).val().lastIndexOf('@') >= $(this).val().indexOf('.'))
					{
						$(this).css('border','1px solid ' + opts.borderAlertColor);
						$(opts.alertBox).append(opts.ismailAlert.replace('{ismail}',$(this).attr('name')) + '<br />');
						_val = false;
					};
				});
				return _val;
			},
			/* Checks the if is number */
			isNumber:function(x)
			{
				_val = true;
				x.each(function()
				{
					if (isNaN(parseFloat($(this).val().replace(',', '.'))))
					{
						$(this).css('border','1px solid ' + opts.borderAlertColor);
						$(opts.alertBox).append(opts.isnumAlert.replace('{isnum}',$(this).attr('name')) + '<br />');
						_val = false;
					};
				});
				return _val;
			},
			/* Checks the if is date format */
			isDate:function(x)
			{
				_val = true;
				/* Date format expressions */
				var _re1 = /^[0-3]?[0-9]\/[01]?[0-9]\/([12][90][0-9][0-9]|[0-9][0-9])$/; //DD/MM/YYYY DD/MM/YY
				var _re2 = /^[0-3]?[0-9]\-[01]?[0-9]\-([12][90][0-9][0-9]|[0-9][0-9])$/; //DD-MM-YYYY DD-MM-YY
				var _re3 = /^[0-3]?[0-9]\.[01]?[0-9]\.([12][90][0-9][0-9]|[0-9][0-9])$/; //DD.MM.YYYY DD.MM.YY
				var _re4 = /^([12][90][0-9][0-9]|[0-9][0-9])\/[01]?[0-9]\/[0-3]?[0-9]$/; //YYYY/MM/DD YY/MM/DD
				var _re5 = /^([12][90][0-9][0-9]|[0-9][0-9])\-[01]?[0-9]\-[0-3]?[0-9]$/; //YYYY-MM-DD YY-MM-DD
				var _re6 = /^([12][90][0-9][0-9]|[0-9][0-9])\.[01]?[0-9]\.[0-3]?[0-9]$/; //YYYY.MM.DD YY.MM.DD
				x.each(function()
				{
					if (!$(this).val().match(_re1) && !$(this).val().match(_re2) && !$(this).val().match(_re3) && !$(this).val().match(_re4) && !$(this).val().match(_re5) && !$(this).val().match(_re6))
					{
						$(this).css('border','1px solid ' + opts.borderAlertColor);
						$(opts.alertBox).append(opts.isdateAlert.replace('{isdate}',$(this).attr('name')) + '<br />');
						_val = false;
					};
				});
				return _val;
			}
		};
		
		/* Checks the type parameter and applies the appropriate validation function */
		switch (opts.type)
		{
			case 'reset':
				valida.resetFields(this);
				break;
			case 'isreq':
				return valida.noEmpty(this);
				break;
			case 'ismail':
				return valida.isEmail(this);
				break;
			case 'isnum':
				return valida.isNumber(this);
				break;
			case 'isdate':
				return valida.isDate(this);
				break;
		}
	};
	
	/* Default properties values */
	$.fn.formValidate.defaults = {
		type:'isreq',
		alertBox:'#alert',
		borderOriginalColor:'#999',
		borderAlertColor:'#f00',
		/* The default alert messages */
		isreqAlert:'Field <strong>{isreq}</strong> is required.',
		ismailAlert:'Field <strong>{ismail}</strong> needs to be an e-mail valid format.',
		isnumAlert:'Field <strong>{isnum}</strong> needs to be a number.',
		isdateAlert:'Field <strong>{isdate}</strong> needs to be a date valid format.',
	};
}(jQuery));
