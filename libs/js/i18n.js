var i18n = {};
i18n.lang = "en";
i18n.translations = {};
i18n.init = function(){
	var lang =  (navigator.language || navigator.userLanguage).split("-");
	i18n.lang = lang[0];
	console.log(i18n.lang);
	i18n.load();
	document.addEventListener("ready",function(){
		console.log("lancement traduction");
		i18n.getAllTranslationsNeeded();
		i18n.translateAll();
	});
}
i18n.load = function(lang){
	var el = document.createElement("script");
	el.setAttribute("type","text/javascript");
	el.setAttribute("id","i18n_translation");
	el.setAttribute("src","libs/lang/"+(lang?lang:i18n.lang)+".js");
	el.onerror = function() { 
		i18n.load("en"); 
	};
	el.onload = function(){  
		i18n.translations = T9N; 
	};
	document.getElementsByTagName("head")[0].appendChild(el);
}
i18n.getAllTranslationsNeeded = function(){
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
