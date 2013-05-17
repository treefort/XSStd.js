xsstd.console = xsstd.output.extend({
    send: function(data){
    	console.log('exfil console output:');
    	console.log(data);
    },
    _init: function(){
    	xsstd.o('***console output loaded');
    }
});
