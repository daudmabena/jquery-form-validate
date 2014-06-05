jQuery.formValidate
======

jQuery.formValidate v1.1.1. 
jQuery Plugin to validate some basic types of data input. 
(c)2014 Rafael Maruta - rafaelmaruta@gmail.com.
Released under the MIT license

Usage
--------

Accepts the following parameters: *type*, *alertBox*, *borderOriginalColor*, *isreqAlert*, *ismailAlert*, *isnumAlert*, *isdateAlert*.

Use the parameter values for *type*:
- *'reset'* to reset all the border input colors and the alert box changed by the validation. The form element needs to be in the selector;
- *'isreq'* (default) for required fields;
- *'ismail'* to require an e-mail address valid format;
- *'isnum'* to require numbers;
- *'isdate'* to require a date valid format. The default values are DDMMYYYY, DDMMYY, YYYYMMDD and YYMMDD, with '/', '-' and '.' as optional separators.

The parameter *alertBox* is the selector where the alert messages appears. You can personalize for each field, including the use of relative elements.

The parameter *borderOriginalColor* is the original color of the input borders, because sometimes JavaScript can't save the element original color when modified.

The parameters *isreqAlert*, *ismailAlert*, *isnumAlert*, *isdateAlert* are the alert messages when input data errors happen. For default it takes the *'name'* element attribute value and replaced at *{xxxxx}* expression.

Apply
--------

Call examples:

```javascript
$(document).ready(function()
{
 $('form').bind('submit',function()
 {
  $(this).formValidate({type:'reset'});
  $('#div1,#div2,#div3').formValidate();
  $('#div2').formValidate({type:'ismail'});
  $('#div4').formValidate({type:'isdate'});
  return false;
 });
});
```

If some of the validations is invalid, it returns false, so it can be used this way:

```javascript
$(document).ready(function()
{
 $('form').bind('submit',function()
 {
  $(this).formValidate({type:'reset'});
  if (!$('#div1,#div2,#div3').formValidate() || !$('#div2').formValidate({type:'ismail'}) || 
  !$('#div4').formValidate({type:'isdate'}))
   window.console.log(false); // There're errors, needs to be fixed.
  else
   window.console.log(true); // So submit the form.
  return false;
 });
});
```

Any sugestions please contact me.
