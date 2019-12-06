<?php include dirname(__FILE__)."/version.php"; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/lldlpeacadpdfaoekhaiphamkndjghgo">
<title>Update informations - Python Editor v
<?php v(); ?>
</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!--[if lte IE 8]><script src="assets/js/html5shiv.js"></script><![endif]-->
<link rel="stylesheet" href="update/assets/css/main.css" />
<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css?v=<?php v(); ?>">
<noscript>
<link rel="stylesheet" href="update/assets/css/noscript.css" />
</noscript>
<script src="update/assets/js/jq.js"></script>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-15538849-30', 'python.codnex.net');
ga('require', 'displayfeatures');
ga('send', 'pageview');
</script>
<style>
strong{
	font-weight:bold;
	text-decoration:underline;	
}
p[lang]{
	display:none;	
}
</style>
</head>
<body class="is-loading">

<!-- Wrapper -->
<div id="wrapper"> 
						
						<!-- Main -->
						<section id="main">
												<header> <span class="avatar"><img src="icons/doc128.png" alt="" /></span>
																		<h1>Python Editor</h1>
																		<p>Version
																								<?php v(); ?>
																		</p>
																		<!--<h2>Now your editor is ads free</h2>-->
												</header>
                                                <hr />
												<h2>Version 5.2.0</h2>
                                                <p>Fix bugs : </p>
                                                <ul>
                                                	<li>Try to solve the "invalid api key" message from Google Drive</li>
                                                </ul>
                                                <hr />
												<hr />
												<h2>Version 5.1</h2>
                                                <p>New features : </p>
                                                <ul>
                                                	<li>A new editor</li>
                                                    <li>More than 40 theme for the editor</li>
                                                    <li>New python lib partially implemented : numpy, matplotlib.</li>
                                                    <li>Ads desappears after 30 seconds</li>
                                                    <li>Notification windows with new design</li>
                                                </ul>
                                                <hr />
												<h2>Why create a free tool ?</h2>
												<div>Python Editor is being developed by a single developer enthusiast<br />
																		who wants to help people in learning python.<br />
																		It is not easy to answer the many requests for improvements,<br />
																		that's why I added the   <a href="/donation.php" class="btn btn-default"><i class="fa fa-coffee"></i></a> button to the satisfied users make a donation.<br />
																		The amount of the donation is free and can be monthly, which will<br />
																		allow me to devote more time to this project and why not to do my main activity.</div>
												<hr />
												<h2>What's new in this version ?</h2>
												<ol style="text-align:left;">
												<li>Many bugs have been fixed</li>
												<li>Improve offline feature</li>
												<li>A new editor is used (ACE)</li>
												<li>Autocompletion</li>
												<li>A search in code feature has been added</li>
												<li>Discover Snippets website</li>
												<li>You can now test your code in a modal box or a new window</li>
												</ol>
												<hr />
												<h2>What's next</h2>
												<ol style="text-align:left;">
												<li>Add Dropbox features</li>
												<li>Add auto save feature</li>
												<li>Improve Skulpt library to support more modules</li>
												<li>...</li>
												</ol>
												<hr />
												<a href="/index.php">Go to Python Editor<br /><img src="icons/doc256.png" /></a>
												<hr />
												<footer>
																		<ul class="icons">
																								<li><a href="https://fr.linkedin.com/in/ngrillet" target="_blank" class="fa-linkedin">Linkedin</a></li>
																								<li><a href="https://www.facebook.com/PythonEditorCommunity" target="_blank" class="fa-facebook">Facebook</a></li>
																		</ul>
												</footer>
						</section>
						
						<!-- Footer -->
						<footer id="footer">
												<ul class="copyright">
																		<li>&copy; Nicolas Grillet</li>
																		<li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
												</ul>
						</footer>
</div>

<!-- Scripts --> 
<!--[if lte IE 8]><script src="assets/js/respond.min.js"></script><![endif]--> 
<script>
if ('addEventListener' in window) {
window.addEventListener('load', function() { document.body.className = document.body.className.replace(/\bis-loading\b/, ''); });
document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
}
$(document).ready(function(e) {
	var userLang = navigator.language || navigator.userLanguage; 
	var lang=userLang.toLowerCase().split("-");
	lang=lang[0];
	if(lang=="fr"||lang=="en"||lang=="cn"||lang=="pt"||lang=="es"){
		$("p[lang='"+lang+"']").show();
	}else{
		$("p[lang='en']").show();
	}
});
window.onbeforeunload=function(){
	return "**** IMPORTANT ****\n\nHave you read the important message ?\n\nAvez vous lu le message important ?\n\nVocê já leu a mensagem importante?\n\n您已经阅读了重要的信息？\n\n¿Has leído el mensaje importante?\n\n\n\n";	
}
</script>
</body>
</html>
