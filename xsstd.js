xsstd = {
	VERSION:'0.0.1',
	FILENAME:'xsstd.js',
	__verbosity:1,
	__scriptsToLoad: [],
	__params:[],
	attacks:{},
	
	init: function(){

		var _self = this;

		if ( !Array.prototype.forEach ) {
		    Array.prototype.forEach = function(fn, scope) {
		        for(var i = 0, len = this.length; i < len; ++i) {
		            fn.call(scope, this[i], i, this);
		        }
		    }
		}

		var modules;
		var script_tags = document.getElementsByTagName('script');
		for (var script_index = 0; script_index < script_tags.length; script_index++){
			if (script_tags[script_index].src.indexOf(this.FILENAME)!= -1){
				var _path = script_tags[script_index].src;
				_self.__params = {}, keyValuePairs = _path.substring(_path.indexOf('?')).slice(1).split('&');

			    keyValuePairs.forEach(function(keyValuePair) {
			        keyValuePair = keyValuePair.split('=');
			        _self.__params[keyValuePair[0]] = keyValuePair[1] || '';
			    });
			}
		}

		if (this.__verbosity>5) this.log(_self.__params);

		this.__scriptsToLoad.push('../xsstd/lib/jquery-1.7.2.min.js');
	 	this.__scriptsToLoad.push('../xsstd/lib/underscore-min.js');
	 	this.__scriptsToLoad.push('../xsstd/lib/backbone-min.js');
	 	this.__scriptsToLoad.push('../xsstd/core/xsstd.std.js');
	 	this.__scriptsToLoad.push('../xsstd/core/xsstd.output.js');

	 	var _modules = _self.__params.m.split('|');

	 	for (var src=0;src<_modules.length;src++){
			this.__scriptsToLoad.push('../xsstd/modules/' + _modules[src] + '/xsstd.' + _modules[src] + '.js');
	 	}

	 	if (_self.__params.u==null || _self.__params.u==''){
	 		if (this.__verbosity>0) this.log('xsstd: no user script provided -- use &u={your script path}');
	 	} else {
	 		this.__scriptsToLoad.push(_self.__params.u);
	 	}

	 	this.__ijs();

	},
	__ijs: function(){

		if (this.__scriptsToLoad.length){

			var file = this.__scriptsToLoad.shift();
			if (this.__verbosity>5) this.log('xsstd loading module: ' + file);
			var _self=this;
			
			var html_doc = document.getElementsByTagName('head')[0];
		    var js = document.createElement('script');
		    js.setAttribute('type', 'text/javascript');
		    js.setAttribute('src', file);
		    html_doc.appendChild(js);

		    js.onreadystatechange = function () {
		        if (js.readyState == 'complete') {
		            js.onreadystatechange = null;
		            js.onload = null;
		           	if (_self.__verbosity>5) _self.log('script loaded: ' + file);
		           	_self.__ijs();
		        }
		    }
		 
		    js.onload = function () {
		        js.onreadystatechange = null;
	            js.onload = null;

	            if (_self.__verbosity>5) _self.log('script loaded: ' + file);
	            _self.__ijs();

	        }

	        if (typeof Backbone!='undefined' && typeof this.on=='undefined'){
	     	   _.extend(this, Backbone.Events);
	    	}

	    } else {
			this.ready();
		}		    
	},
	ready: function(){

		if (this.__verbosity>0) this.log('xsstd ready!');
		this.trigger('ready');

	},
	log: function(){
		if(this.console){
		  console.log(arguments);
		}
	}
};

_x=xsstd;


/* DOM ready */

var ready = function () {
    function g() {
        if (!a.isReady) {
            try {
                document.documentElement.doScroll("left")
            } catch (b) {
                setTimeout(g, 1);
                return
            }
            a.ready()
        }
    }
    var e, c, m = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Object]": "object"
        }, a = {
            isReady: !1,
            readyWait: 1,
            holdReady: function (b) {
                b ? a.readyWait++ : a.ready(!0)
            },
            ready: function (b) {
                if (!0 === b && !--a.readyWait || !0 !== b && !a.isReady) {
                    if (!document.body) return setTimeout(a.ready,
                            1);
                    a.isReady = !0;
                    !0 !== b && 0 < --a.readyWait || e.resolveWith(document, [a])
                }
            },
            bindReady: function () {
                if (!e) {
                    e = a._Deferred();
                    if ("complete" === document.readyState) return setTimeout(a.ready, 1);
                    if (document.addEventListener) document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", a.ready, !1);
                    else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", c);
                        window.attachEvent("onload", a.ready);
                        var b = !1;
                        try {
                            b = null == window.frameElement
                        } catch (f) {}
                        document.documentElement.doScroll &&
                            b && g()
                    }
                }
            },
            _Deferred: function () {
                var b = [],
                    f, c, e, h = {
                        done: function () {
                            if (!e) {
                                var c = arguments,
                                    d, g, j, l, k;
                                f && (k = f, f = 0);
                                d = 0;
                                for (g = c.length; d < g; d++) j = c[d], l = a.type(j), "array" === l ? h.done.apply(h, j) : "function" === l && b.push(j);
                                k && h.resolveWith(k[0], k[1])
                            }
                            return this
                        },
                        resolveWith: function (a, d) {
                            if (!e && !f && !c) {
                                d = d || [];
                                c = 1;
                                try {
                                    for (; b[0];) b.shift().apply(a, d)
                                } finally {
                                    f = [a, d], c = 0
                                }
                            }
                            return this
                        },
                        resolve: function () {
                            h.resolveWith(this, arguments);
                            return this
                        },
                        isResolved: function () {
                            return !(!c && !f)
                        },
                        cancel: function () {
                            e = 1;
                            b = [];
                            return this
                        }
                    };
                return h
            },
            type: function (a) {
                return null == a ? String(a) : m[Object.prototype.toString.call(a)] || "object"
            }
        };
    document.addEventListener ? c = function () {
        document.removeEventListener("DOMContentLoaded", c, !1);
        a.ready()
    } : document.attachEvent && (c = function () {
        "complete" === document.readyState && (document.detachEvent("onreadystatechange", c), a.ready())
    });
    return function (b) {
        a.bindReady();
        a.type(b);
        e.done(b)
    }
}();
ready(function () {
    // DOM is ready, let's load our core + modules
    xsstd.init();
});


