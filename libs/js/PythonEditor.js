var lang = navigator.language || navigator.userLanguage; 
if(lang!="fr"&&lang!="en"&&lang!="es")
	lang="en";

function onApiLoad() {
	$("<div id='notification' class='notification'></div>").appendTo("body");
	PythonEditor.GoogleDrive.init();
}

var PythonEditor = {};
PythonEditor.GoogleDrive = {};
PythonEditor.Tools = {};
PythonEditor.LocalVar = {};
PythonEditor.config = {
	fileID	: null,
	filename: "untitle.py",
	version	: '4.6.0',
	gd_dk 	: 'AIzaSyA0_Eeyvo1YHwxQ4LWnH7roSACyOODcXE4',
	gd_ci 	: '107372484960-rhnsai2274bjufru45lpcvv1ftaumlfl.apps.googleusercontent.com',
	gd_sp 	: ['https://www.googleapis.com/auth/drive'],
	debug	: true,
	picker	: false,
	gd_auth	: null
}
PythonEditor.is = {
	GoogleDrive : false	
}
PythonEditor.notify = function(str){
	if(typeof i18n != "undefined"){
		str = i18n.translate(str);	
	}
	PythonEditor.log("Notify : "+str);
	$('#notification').html(str).css({bottom:-55,left:($("body").width()-300)/2}).animate({bottom:-5},"slow").delay(2500).animate({bottom:-55},"slow");
}
PythonEditor.LocalVar.save = function(name,value){
	if(window.localStorage) {
		localStorage[name]=value;
		localStorage.setItem(name,value);		
	}else{
		// cookie
	}
}
PythonEditor.LocalVar.load = function(name){
	var ret = false;
	if(window.localStorage) {
		ret = localStorage[name];
	}else{
		// cookie
	}
	return ret;
}

PythonEditor.Tools.fullscreen = function(){
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
PythonEditor.Tools.Base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = PythonEditor.Tools.Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			PythonEditor.Tools.Base64._keyStr.charAt(enc1) + PythonEditor.Tools.Base64._keyStr.charAt(enc2) +
			PythonEditor.Tools.Base64._keyStr.charAt(enc3) + PythonEditor.Tools.Base64._keyStr.charAt(enc4);
	
		}
		return output;
	},
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = PythonEditor.Tools.Base64._keyStr.indexOf(input.charAt(i++));
			enc2 = PythonEditor.Tools.Base64._keyStr.indexOf(input.charAt(i++));
			enc3 = PythonEditor.Tools.Base64._keyStr.indexOf(input.charAt(i++));
			enc4 = PythonEditor.Tools.Base64._keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = PythonEditor.Tools.Base64._utf8_decode(output);	
		return output;
	},
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

PythonEditor.log = function(str){
	if(PythonEditor.config.debug){
		var n = new Date();
		console.log(n.toLocaleTimeString()+" : "+str);
	}
}
PythonEditor.local = {};
PythonEditor.local.open = function(evt){
	PythonEditor.notify("fileloading");
	var files = evt.target.files;
	var reader = new FileReader();
	reader.onload = function(theFile) {
		console.log(files[0]);
		var text = reader.result;
		editor.setValue(text);
		PythonEditor.config.fileID = null;
		PythonEditor.config.filename = files[0].name;
		PythonEditor.notify("fileloaded");

	};
	reader.readAsText(files[0]);
}
PythonEditor.local.save = function(filename){
	PythonEditor.notify("filesaving");
	var dataFile 	= new Blob( [editor.getValue()], {type: 'application/x-python'});
	saveAs(dataFile, filename);
	PythonEditor.notify("filesaved");
}
PythonEditor.GoogleDrive.init = function() {
	gapi.load('auth', {'callback': PythonEditor.GoogleDrive._AuthLoaded});
	gapi.load('picker', {'callback': PythonEditor.GoogleDrive._PickerLoaded});
	return this;
}
PythonEditor.GoogleDrive._AuthLoaded = function(){
	window.gapi.auth.authorize({
		  'client_id'	: PythonEditor.config.gd_ci,
		  'scope'		: PythonEditor.config.gd_sp,
		  'immediate'	: false
	},PythonEditor.GoogleDrive.getInitResult);	
}
PythonEditor.GoogleDrive._PickerLoaded = function(){
	PythonEditor.config.picker = true;
	PythonEditor.GoogleDrive.filePicker();
}
PythonEditor.GoogleDrive.getInitResult = function(authResult) {
	if(authResult && !authResult.error) {
		PythonEditor.config.gd_auth = authResult.access_token;
		var request = gapi.client.request({
			'path': '/drive/v2/about',
			'method': 'GET'
		});
		request.execute(function(resp) {
			ga('create', 'UA-15538849-30', { 'userId': PythonEditor.Tools.Base64.encode(resp.user.displayName+"-"+resp.user.emailAddress) });
			PythonEditor.log(PythonEditor.Tools.Base64.encode(resp.user.displayName+"-"+resp.user.emailAddress));
		})
		PythonEditor.is.GoogleDrive = true;
		$("*[data-require='GoogleDrive']").removeAttr("disabled");
		if(window.location.hash) {
			var fl=window.location.hash;
			var action=fl.split("||");
			if(action.length==2&&action[0]=="#open")	
				editor.setValue(Base64.decode(action[1]));
			else
				PythonEditor.GoogleDrive.open({id:fl.replace("#","")});
		}
	}

}
PythonEditor.GoogleDrive.filePicker = function() {
	if (PythonEditor.config.picker && PythonEditor.config.gd_auth) {
		PythonEditor.log("Open file picker");
		var view = new google.picker.View(google.picker.ViewId.DOCS);
		view.setMimeTypes("application/python,text/python,application/vnd.google.drive.ext-type.py,application/x-python");
		var picker = new google.picker.PickerBuilder()
		  .setAppId('1146674936')
		  .setOAuthToken(PythonEditor.config.gd_auth)
		  .addView(view)
		  .enableFeature(google.picker.Feature.NAV_HIDDEN)
		  .setLocale(lang)
		  .addView(new google.picker.DocsUploadView())
		  .setCallback(PythonEditor.GoogleDrive._filepickerCallback)
		  .build();
		picker.setVisible(true);
	}
	//		  .setDeveloperKey(PythonEditor.config.gd_dk)

}
PythonEditor.GoogleDrive._filepickerCallback = function(data) {
	var url = 'nothing';
	if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
		var doc = data[google.picker.Response.DOCUMENTS][0];
		window.location.href = "#"+doc.id;
		PythonEditor.GoogleDrive.open(doc);
	}
}
PythonEditor.GoogleDrive.open = function(file) {
	PythonEditor.notify("fileloading");
	if (file.id) {
		var request = gapi.client.request({
			'path': '/drive/v2/files/'+file.id,
			'method': 'GET'
		});
		request.execute(function(a){
			console.log(a);
			PythonEditor.config.fileID = file.id;
			document.title = a.title+" - Python Editor v4";
			var accessToken = gapi.auth.getToken().access_token;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', a.downloadUrl);
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			xhr.onload = function() {
			  editor.setValue(xhr.responseText);
			  $("#filename").val(a.title);
			  PythonEditor.config.filename = a.title;
			  PythonEditor.notify("fileloaded");
			};
			xhr.onerror = function() {
			  editor.setValue("");
			  $("#filename").val("untitle.py");
			  PythonEditor.config.filename = "untitle.py";
			};
			xhr.send();
		});
  } else {
	  $("#filename").val("untitle.py");
	  editor.setValue("");
	  PythonEditor.config.filename = "untitle.py";
  }
}
PythonEditor.GoogleDrive.save = function(title,fileData, callback,folder) {
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  var fileID0 = PythonEditor.config.fileID;
  if(typeof folder =="undefined")
 	var folder = [];
  var dataFile 	= new Blob( [fileData], {type: 'application/x-python'});
  var reader = new FileReader();
  reader.readAsBinaryString(dataFile);
  reader.onload = function(e) {
    var contentType = fileData.type || 'application/octet-stream';
	var contentType	= "application/x-python";
	if(folder.length>0){
		if(fileID0==null){
			var metadata = {
				'title': title,
				'mimeType': contentType,
				'parents' : folder,
				'iconLink': "http://editor.codnex.net/v4/assets/icons/doc128.png"				
			};
		}else{
			var metadata = {
				'mimeType': contentType,
				'parents' : folder,
				'iconLink': "http://editor.codnex.net/v4/assets/icons/doc128.png"
			};
		}
	}else{
		if(fileID0==null){
			var metadata = {
				'title': title,
				'mimeType': contentType,
				'iconLink': "http://editor.codnex.net/v4/assets/icons/doc128.png"
			};
		}else{
			var metadata = {
				'mimeType': contentType,
				'iconLink': "http://editor.codnex.net/v4/assets/icons/doc128.png"
			};
		}
	}
    var base64Data = btoa(reader.result);
	console.log(metadata);
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files' + (fileID0!=null?"/"+fileID0+"/":""),
        'method': (fileID0==null?"POST":"PUT"),
        'params': {'uploadType': 'multipart','useContentAsIndexableText':true},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    if (!callback) {
      callback = function(file) {
        console.log(file)
      };
    }
    request.execute(function(file){ PythonEditor.notify("filesaved");callback(file); });
  }
}
PythonEditor.GoogleDrive.saveToFolder = function(title,fileData, callback) {
	$('#modal_save').modal('hide');
	PythonEditor.GoogleDrive.folder.select(title,fileData, callback);
}
PythonEditor.GoogleDrive.folder = {};
PythonEditor.GoogleDrive.folder.select = function(title,fileData, callback){
	var docsView = new google.picker.DocsView()
	.setIncludeFolders(true) 
	.setMimeTypes('application/vnd.google-apps.folder')
	.setSelectFolderEnabled(true);
	var picker = new google.picker.PickerBuilder()
	.enableFeature(google.picker.Feature.NAV_HIDDEN)
	.addView(docsView)
	.setOAuthToken(PythonEditor.config.gd_auth)
	.setLocale(lang)
	.setCallback(function(data){ PythonEditor.GoogleDrive.folder.selected(data,title,fileData, callback); })
	.build();
	picker.setVisible(true);
	//	.setDeveloperKey(PythonEditor.config.gd_dk)

}
PythonEditor.GoogleDrive.folder.selected = function(data,title,fileData, callback) {
	var url = 'nothing';
	if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
	  var doc = data[google.picker.Response.DOCUMENTS][0];
	  PythonEditor.GoogleDrive.save(title,fileData,callback,[{'id':doc.id}]);
	}
}
