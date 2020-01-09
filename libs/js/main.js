
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/**
 * notificationFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	var docElem = window.document.documentElement,
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	
	/**
	 * extend obj function
	 */
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * NotificationFx function
	 */
	function NotificationFx( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * NotificationFx options
	 */
	NotificationFx.prototype.options = {
		// element to which the notification will be appended
		// defaults to the document.body
		wrapper : document.body,
		// the message
		message : 'yo!',
		// layout type: growl|attached|bar|other
		layout : 'growl',
		// effects for the specified layout:
		// for growl layout: scale|slide|genie|jelly
		// for attached layout: flip|bouncyflip
		// for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
		// ...
		effect : 'slide',
		// notice, warning, error, success
		// will add class ns-type-warning, ns-type-error or ns-type-success
		type : 'error',
		// if the user doesnÂ´t close the notification then we remove it 
		// after the following time
		ttl : 10000,
		// callbacks
		onClose : function() { return false; },
		onOpen : function() { return false; }
	}

	/**
	 * init function
	 * initialize and cache some vars
	 */
	NotificationFx.prototype._init = function() {
		// create HTML structure
		this.ntf = document.createElement( 'div' );
		this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
		var strinner = '<div class="ns-box-inner">';
		strinner += this.options.message;
		strinner += '</div>';
		strinner += '<span class="ns-close"></span></div>';
		this.ntf.innerHTML = strinner;

		// append to body or the element specified in options.wrapper
		this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

		// dismiss after [options.ttl]ms
		var self = this;
		this.dismissttl = setTimeout( function() {
			if( self.active ) {
				self.dismiss();
			}
		}, this.options.ttl );

		// init events
		this._initEvents();
	}

	/**
	 * init events
	 */
	NotificationFx.prototype._initEvents = function() {
		var self = this;
		// dismiss notification
		this.ntf.querySelector( '.ns-close' ).addEventListener( 'click', function() { self.dismiss(); } );
	}

	/**
	 * show the notification
	 */
	NotificationFx.prototype.show = function() {
		this.active = true;
		classie.remove( this.ntf, 'ns-hide' );
		classie.add( this.ntf, 'ns-show' );
		this.options.onOpen();
	}

	/**
	 * dismiss the notification
	 */
	NotificationFx.prototype.dismiss = function() {
		var self = this;
		this.active = false;
		clearTimeout( this.dismissttl );
		classie.remove( this.ntf, 'ns-show' );
		setTimeout( function() {
			classie.add( self.ntf, 'ns-hide' );
			
			// callback
			self.options.onClose();
		}, 25 );

		// after animation ends remove ntf from the DOM
		var onEndAnimationFn = function( ev ) {
			if( support.animations ) {
				if( ev.target !== self.ntf ) return false;
				this.removeEventListener( animEndEventName, onEndAnimationFn );
			}
			self.options.wrapper.removeChild( this );
		};

		if( support.animations ) {
			this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
		}
		else {
			onEndAnimationFn();
		}
	}

	/**
	 * add to global namespace
	 */
	window.NotificationFx = NotificationFx;

} )( window );


var w=null;
var editor=null;
var file=null;
var folder=null;
window.updateWindowParent = function(){
	return editor;
}
function initParameters(){
	$p = ['offline','resultwindow'];
	for(i in $p){
		var $v = Utils.storage.local($p[i]);
		if($v==null){
			$("#"+$p[i]).removeAttr("checked");			
		}else{
			if($v=="true")
				$("#"+$p[i]).attr("checked","checked");						
			else
				$("#"+$p[i]).removeAttr("checked");						
		}
	}
	$("#theme option[value='"+Utils.storage.local("theme")+"']").attr("selected","true");
	$("#theme").trigger("change");
}
var output = $("#ot");
var outf = function (text) {
        output.text(output.text() + text);
};
function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }
$(document).ready(function(e) {
	$("#loader_block").fadeIn("fast");
	
	$("#open").click(function(e) {
		$("#opener").modal("show");
	});
	$("#open_gd").click(function(e) {
		$('#opener').modal('hide');
		Filepicker.GoogleDrive.select(function(data){
			Filepicker.GoogleDrive.file.open(data);
		});
	});  
	$("#open_local").change(function(e){
		e.preventDefault();
		$('#opener').modal('hide');
		Filepicker.local.open(e);
	});
	$("#export").click(function(e) {
		Filepicker.local.save();
	});
	Utils.online.check(function(){
		if(Utils.online.status=="online"){
			$("#on-off").html('<i class="fa fa-toggle-on"></i>');	
		}else{
			$("#on-off").html('<i class="fa fa-toggle-on off"></i>');	
		}
	});
	$("#menu-mobile").click(function(e) {
		$(".menu").slideToggle("fast");
	});
	$("#fs").click(function(e) {
		Utils.fullscreen();
	});
	editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
		lineNumbers: true,
		styleActiveLine: true,
		parserfile: ["addon/parse/parsepython.js"],
        autofocus: true,
		matchBrackets: true,
		extraKeys: {"Ctrl-Space": "autocomplete"},
        mode: {name: "python", globalVars: true},
		styleActiveLine: true,
		lineNumbers: true,
		lineWrapping: true,
		scanUp:true,
		autoMatchParens: true,
		parserConfig: {'pythonVersion': 2, 'strictErrors': true}
  	});
	editor.setOption("theme", "xq-dark");
	$("#theme").bind("change",function(){
		Utils.storage.local("theme",$("#theme").val());
		$("#theme_css").attr("href","libs/js/editor/theme/"+$("#theme").val()+".css");
		editor.setOption("theme", $("#theme").val());
	});
	initParameters();
	$(window).resize(function(e) {
		$(".CodeMirror,.CodeMirror-scroll,#editor").height(window.innerHeight-40);
	});
	$(".CodeMirror,.CodeMirror-scroll,#editor").height(window.innerHeight-40);
	$("#editor").css('font-size','14px');
	$("#new").click(function(e) {
		if(confirm(Utils.i18n.translate("askexit"))){
			editor.setValue("");
			window.location.hash="";
			Filepicker.GoogleDrive.file.current=null;
			Filepicker.GoogleDrive.folder.current=null;
			$("#filename").text("untitle.py");
			Utils.notify(Utils.i18n.translate("newcreated"));
		}
	});
	/*$("#save").click(function(e) {
		if(Filepicker.GoogleDrive.file.current==null){
			Filepicker.GoogleDrive.folder.select(function(folder){
				Filepicker.GoogleDrive.file.save(editor.getValue());
			});
		}else{
			Filepicker.GoogleDrive.file.save(editor.getValue());	
		}
	});*/
	$("#filename").click(function(e) {
		var content = editor.getValue();
		var lines = content.split("\n");
		var libs = content.match(/(import (.*)|import (.*) from (.*))/gi);
		var le=[];
		for(i in libs){
			var s=libs[i].replace("import ");
			if(s!="undefined")
				le.push(libs[i].replace("import "));	
		}
		$('#other').find(".modal-title").text("File stats");
		$('#other').find(".modal-body").html("<p>Filename : <input type='text' name='filename' value='"+(file!=null?file.originalFilename:$("#filename").text())+"' /></p><p>Line count : "+lines.length+"</p><p>Modules requires : "+le.join(", ").replace("undefined","")+"</p>");
		$("input[name=filename]").on("change",function(){
			document.title = $(this).val()+" - Python Editor v5";
			$("#filename").text($(this).val());
			if(Filepicker.GoogleDrive.file.current==null){
				Filepicker.GoogleDrive.folder.select(function(folder){
					Filepicker.GoogleDrive.file.save(editor.getValue());
				});
			}else{
				Filepicker.GoogleDrive.file.save(editor.getValue());	
			}
		});
		$('#other').modal("show");
	});
	
	$("#search").click(function(e) {
	        $("#searcharea").fadeIn("fast");
			$(document).bind("keydown",function(a){
				 if(a.which === 13||a.which === 27) {
					 $("#searcharea input").unbind("keydown");
					 $("#searcharea").fadeOut("fast");
					 editor.findAll($("#searcharea input").val(),{
						backwards: false,
						wrap: false,
						caseSensitive: false,
						wholeWord: false,
						regExp: false
					});
				 }
			});
	});
	$("#run").click(function(e) {
		if(Utils.storage.local("resultwindow")!="true"){
			$("#ot").html("");
			var t = editor.getValue();
			var oo = /open\((.*)(,(.*))+\)/gi.exec(t);
			console.log(oo);
			for(i in oo){
				if(oo[i][3]=='"r"'){
					console.log("open file :"+oo[i][1]);	
				}
			}
			console.log(oo);
			Sk.configure({output: outf, read: builtinRead});
			Sk.externalLibraries = {
			  numpy : {
				path : 'libs/js/skulpt/src/lib/numpy/__init__.js',
			  },
			  matplotlib : {
				path : 'libs/js/skulpt/src/lib/matplotlib/__init__.js',
			  },
			  'matplotlib.pyplot' : {
				path : 'libs/js/skulpt/src/lib/matplotlib/pyplot/__init__.js',
			  },
			  'random' : {
				path : 'libs/js/skulpt/src/lib/numpy/random/__init__.js',
			  },
			};
			Sk.canvas = "og";
			if (editor.getValue().indexOf('turtle') > -1 ) {
				$('#og').show();
			}
			Sk.pre = "ot";
			(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'og';
			Sk.TurtleGraphics.width = ($('#runner .modal-dialog').width()-100);
			Sk.TurtleGraphics.height =($('#runner .modal-dialog').width()-100);
			var p = Sk.misceval.asyncToPromise(function() {
				return Sk.importMainWithBody("<stdin>",false,editor.getValue(),true);
			});
			p.then(function (module) {
				Utils.log.text("no errors");
			}, function (err) {
				alert(err);
			});
			$('#runner').modal("show");			
		}else{
			window.name="python_editor";
			w = window.open("runner.html","python_editor_runner");
		}
	});
	if ($('[data-toggle="switch"]').length) {
		$('[data-toggle="switch"]').bootstrapSwitch();
	}
	$("#parameters .bootstrap-switch").on("click",function() {
		if($(this).hasClass("bootstrap-switch-on"))
			Utils.storage.local($(this).find("input").attr("id"),true);
		else
			Utils.storage.local($(this).find("input").attr("id"),false);		
	});
	/*Filepicker.GoogleDrive.init();*/
});
