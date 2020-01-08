(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

var i18n = {};
i18n.lang = "en";
i18n.translations = {};
i18n.init = function(){
	var lang =  (navigator.language || navigator.userLanguage).split("-");
	i18n.lang = lang[0];
	console.log(i18n.lang);
	i18n.load();
	docReady(function() {
		console.log("Init translation process...");
		i18n.getAllTranslationsNeeded();
		i18n.translateAll();
	});
}
i18n.load = function(lang){
	console.log("Translation loading...");
	var el = document.createElement("script");
	el.setAttribute("type","text/javascript");
	el.setAttribute("id","i18n_translation");
	el.setAttribute("src","libs/lang/"+(lang?lang:i18n.lang)+".js");
	el.onerror = function() { 
		i18n.load("en"); 
	};
	el.onload = function(){  
		i18n.translations = T9N; 
		console.log("Translations loaded !")
		console.log(T9N);
	};
	document.getElementsByTagName("head")[0].appendChild(el);
}
i18n.getAllTranslationsNeeded = function(){
	console.log("Translate each items in progress...");
	var a = document.querySelectorAll("[data-i18n]");
	var list = new Array();
	for(i=0;i<a.length;i++){
		var el = a[i].getAttribute("data-i18n");
		if(typeof i18n.translations[el] != "undefined"){
			a[i].innerHTML=i18n.translations[el];
			list.push(el+" : "+i18n.translations[el]);
		}else{
			list.push(el+" : NO TRANSLATION");
		}
	}
	console.table(list);
}
i18n.translateAll = function(){
	var a = document.querySelectorAll("[data-i18n]");
	for(i=0;i<a.length;i++){
		var el = a[i].getAttribute("data-i18n");
		if(typeof i18n.translations[el] != "undefined"){
			a[i].innerHTML=i18n.translations[el];
		}
	}
}
i18n.translate = function(str){
	return typeof i18n.translations[str] != "undefined"?i18n.translations[str]:str;
}
i18n.init();
