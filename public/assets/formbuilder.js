$(function(){function a(a){$(this).hide(),$(this).prev("fieldset").remove(),a.preventDefault()}$("form .add_fields").on("click",function(b){time=(new Date).getTime(),regexp=new RegExp($(this).data("id"),"g"),$(this).before($(this).data("fields").replace(regexp,time)),b.preventDefault(),$(this).hide(),$("form .cancel").on("click",a)}),$(".dateSelect").datepicker({format:"mm/dd/yyyy"}),$("#message_message_text").live("keyup keydown",function(a){var b=160,c=b-$(this).val().length;$("#char-count").html(c)}),$(".defaultTime").hover(function(){$(this).append($("<span>&nbsp;<a class='editTime btn btn-mini' href='#'>Edit</a></span>"))},function(){$(this).find("span:last").remove()}),$(".editTime").live("click",function(){$("#delivery_send_time").clone().attr("type","text").insertAfter("#delivery_send_time").prev().remove(),$('<label for="delivery_send_date">Delivery time</label>').insertBefore("#delivery_send_time"),$(".defaultTime").remove()}),$("#messages-table").dataTable({sDom:'<"top"f>rt<"bottom"p><"clear">',sPaginationType:"bootstrap",oLanguage:{sLengthMenu:"_MENU_ records per page"}})});