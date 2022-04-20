var Filepicker 				= {};
Filepicker.GoogleDrive 		= {};
Filepicker.GoogleDrive.options = {
	developerKey 	: decodeURIComponent(escape(window.atob("YVN5QTBfRWV5dm8xWUh3eFE0TFduSDdyb1NBQ3lPT0RjWEU0"))),
	clientId		: decodeURIComponent(escape(window.atob("MTA3MzcyNDg0OTYwLXJobnNhaTIyNzRianVmcnU0NWxwY3Z2MWZ0YXVtbGZsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"))),
	secret			: decodeURIComponent(escape(window.atob("ekttNXZXZjJNTk1DUDkxQ0dTZy1wdC1y"))),
	scope			:  ['https://www.googleapis.com/auth/drive'],
	oauthToken		: null
};
Filepicker.GoogleDrive.init = function(){
	Utils.event.create("gdloaded");
	console.log(typeof gapi);
	if(typeof gapi=="undefined"){
		Utils.log.text("Google chargement...");
		window.addEventListener("load", function(event) {
			var script = document.createElement("script");
			script.src = "https://www.google.com/jsapi?key="+Filepicker.GoogleDrive.options.developerKey;
			script.onload=function(){
				Utils.log.text("Google api loaded");	
				var script2 = document.createElement("script");
				script2.src="https://apis.google.com/js/client.js?onload=Filepicker_GoogleDrive";
				script2.onload=function(){
					Utils.log.text("Google drive api loaded");	
				};
				document.body.appendChild(script2);
			};
			document.body.appendChild(script);
		});
	}else{
		Filepicker_GoogleDrive();
	}
};
var Filepicker_GoogleDrive = function(){
	Utils.log.text("Google initialisation ...");
	gapi.load('auth', {'callback': Filepicker.GoogleDrive.apiLoaded });
	gapi.load('picker', {'callback': Filepicker.GoogleDrive.onPickerApiLoad});		
};
Filepicker.GoogleDrive.apiLoaded = function(){
	Utils.log.text("Google API callback");
	window.gapi.auth.authorize({
	  'client_id': Filepicker.GoogleDrive.options.clientId,
	  'scope': Filepicker.GoogleDrive.options.scope,
	  'immediate': false
	},Filepicker.GoogleDrive.handleAuthResult);	
};
Filepicker.GoogleDrive.onPickerApiLoad = function() {
	Utils.log.text("Google Picker API callback");
	Utils.event.trigger("gdloaded");
};
Filepicker.GoogleDrive.handleAuthResult = function(authResult){
	if (authResult && !authResult.error) {
		Utils.log.text("Google Authorization ok");
		Filepicker.GoogleDrive.options.oauthToken = authResult.access_token;
		if(window.location.hash) {
			var fl=window.location.hash;
			var action=fl.split("||");
			if(action.length==2&&action[0]=="#open")	
				editor.setValue(Base64.decode(action[1]));
			else
				Filepicker.GoogleDrive.file.open({docs:[{id:fl.replace("#","")}],action: "picked"});
		}
	}else{
		Utils.log.text("Google Authorization not ok");
	}
};
Filepicker.GoogleDrive.select = function(callback){
	Utils.event.listen('gdloaded', function (e) {
		Utils.log.text("Chargement du file picker GD");
		var view = new google.picker.View(google.picker.ViewId.DOCS);
		view.setMimeTypes("application/python,text/python,application/vnd.google.drive.ext-type.py,application/x-python");
		var picker = new google.picker.PickerBuilder()
		  .setAppId('107372484960')
		  .setOAuthToken(Filepicker.GoogleDrive.options.oauthToken)
		  .addView(view)
		  .enableFeature(google.picker.Feature.NAV_HIDDEN)
		  .setLocale(Utils.i18n.lang)
		  .addView(new google.picker.DocsUploadView())
		  .setDeveloperKey(Filepicker.GoogleDrive.options.developerKey)
		  .setCallback(callback)
		  .setRelayUrl('http://python.codnex.net/rpc_relay.html')
		  .build();
		picker.setVisible(true);	
	});
	if(Filepicker.GoogleDrive.options.oauthToken==null){
		Utils.log.text("Lancement initiation GD");
		Filepicker.GoogleDrive.init();
	}else{
		Utils.log.text("Déclenchement de l'event");
		Utils.event.trigger("gdloaded");
	}
};
Filepicker.GoogleDrive.folder = {
	current : null,
	select : function(callback){
			var docsView = new google.picker.DocsView()
			.setIncludeFolders(true) 
			.setMimeTypes('application/vnd.google-apps.folder')
			.setSelectFolderEnabled(true);
			var picker = new google.picker.PickerBuilder()
			.enableFeature(google.picker.Feature.NAV_HIDDEN)
			.addView(docsView)
			  .setOAuthToken(Filepicker.GoogleDrive.options.oauthToken)
			  .setDeveloperKey(Filepicker.GoogleDrive.options.developerKey)
			  .setLocale(Utils.i18n.lang)
			.setCallback(function(data){ 
				if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
					Filepicker.GoogleDrive.folder.current = data[google.picker.Response.DOCUMENTS][0];
					callback(Filepicker.GoogleDrive.folder.current);
				}
			})
			.build();
			picker.setVisible(true);
	}
};
Filepicker.GoogleDrive.file = {
	current 	: null,
	save		: function(fileData,callback){
		const boundary = '-------314159265358979323846';
		const delimiter = "\r\n--" + boundary + "\r\n";
		const close_delim = "\r\n--" + boundary + "--";
		if(typeof Filepicker.GoogleDrive.folder.current =="undefined")
			var folder = [];
		else
			var folder = new Array(Filepicker.GoogleDrive.folder.current);
		var dataFile 	= new Blob( [fileData], {type: 'application/x-python'});
		var reader = new FileReader();
		reader.readAsBinaryString(dataFile);
		reader.onload = function(e) {
			var contentType = fileData.type || 'application/octet-stream';
			var contentType	= "application/x-python";
			if(folder.length>0){
				var metadata = {
					'title': $("#filename").text(),
					'mimeType': contentType,
					'parents' : folder,
					'iconLink': "http://python.codnex.net/icons/doc128.png"				
				};
			}else{
				var metadata = {
					'title': $("#filename").text(),
					'mimeType': contentType,
					'iconLink': "http://python.codnex.net/icons/doc128.png"				
				};
			}
			var base64Data = btoa(reader.result);
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
				'path': '/upload/drive/v2/files' + (Filepicker.GoogleDrive.file.current!=null?"/"+Filepicker.GoogleDrive.file.current.id+"/":""),
				'method': (Filepicker.GoogleDrive.file.current==null?"POST":"PUT"),
				'params': {
					'uploadType': 'multipart',
					'useContentAsIndexableText':true
				},
				'headers': {
					'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
				},
				'body': multipartRequestBody
			});
			if (!callback) {
				callback = function(file) {
					Filepicker.GoogleDrive.file.current = file;
				};
			}
			request.execute(function(file){ 
				Utils.notify(Utils.i18n.translate("filesaved"),"Python Editor : "+ file.originalFilename);
				Filepicker.GoogleDrive.file.current = file;
				callback(file); 
			});
		}
	},
	open		: function(data){
		console.log(data);
		Utils.log.text("File loading from Google Drive");
		var url = 'nothing';
		if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
			var doc = data[google.picker.Response.DOCUMENTS][0];
			window.location.href = "#"+doc.id;
			var request = gapi.client.request({
				'path': '/drive/v2/files/'+doc.id,
				'method': 'GET'
			});
			request.execute(function(a){
				document.title = a.originalFilename+" - Python Editor v5";
				var accessToken = gapi.auth.getToken().access_token;
				var xhr = new XMLHttpRequest();
				xhr.open('GET', a.downloadUrl);
				xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				xhr.onload = function() {
					Filepicker.GoogleDrive.file.current  = a;
					editor.setValue(xhr.responseText);
					$("#filename").text(a.originalFilename);
					Utils.notify(Utils.i18n.translate("fileloaded"),"Python Editor : "+ a.originalFilename);
				};
				xhr.onerror = function() {
					editor.setValue("");
					$("#filename").val("untitle.py");
				};
				xhr.send();
			});
		}
	}
};
Filepicker.local = {
	open	: function(evt){
		var files = evt.target.files;
		var reader = new FileReader();
		reader.onload = function(theFile) {
			var text = reader.result;
			editor.setValue(text);
			$("#filename").text(files[0].name);
			Utils.notify(Utils.i18n.translate("fileloaded"));
		};
		reader.readAsText(files[0]);
	},
	save		: function(){
		var dataFile 	= new Blob( [editor.getValue()], {type: 'application/x-python'});
		saveAs(dataFile, $("#filename").text());
		Utils.notify(Utils.i18n.translate("filesaved"));	
	}
};
Filepicker.DropBox 		= {};
Filepicker.DropBox.options = {
	developerKey 	: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
    clientId		: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	scope			:  ['https://www.googleapis.com/auth/drive'],
	oauthToken		: null
};
Filepicker.DropBox.init = function(){
	if(typeof gapi=="undefined"){
		var script = document.createElement("script");
		script.setAttribute("src","https://www.dropbox.com/static/api/2/dropins.js");
		script.setAttribute("type","text/javascript");
		script.setAttribute("id","dropboxjs");
		script.setAttribute("data-app-key","zogeia2bt7t7fly");
	}else{
		//gapi.load('auth', {'callback': Filepicker.GoogleDrive.apiLoaded });
		//gapi.load('picker');
	}
}
