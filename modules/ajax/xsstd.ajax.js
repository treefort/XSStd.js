xsstd.ajax = xsstd.output.extend({

	_url:'',
	_method:'post',

	constructor: function(){
		
	   	this._setParams(arguments[0]);
	},

	send: function(_data){

		var _self = this;

		var request = $.ajax({
			  url: _self._url,
			  type: _self._method,
			  data: {data:_data}
		});
		
		console.log(request);

		request.done(function(msg) {
			  xsstd.log('ajax win: ' + msg);
		});
		 
		request.fail(function(jqXHR, textStatus) {
			  xsstd.log( "Request failed: " + textStatus );
		});

	},

	_setParams: function(args){
			if (typeof args!='undefined'){
		   	if(typeof args.url=='string'){
		   		this._url = args.url;
		   	}
		   	if(typeof args.method=='string'){
		   		this._method = args.method;
		   	}
		}
	}

});
