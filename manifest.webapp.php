<?php
include dirname(__FILE__)."/version.php";
header("Content-type:application/x-web-app-manifest+json");
?>
{
  "name": "Python Editor",
  "description": "Edit your Python file directly in your browser and save it to google drive",
  "launch_path": "/index.php",
  "icons": {
    "256": "http://python.codnex.net/icons/doc256.png",
    "128": "http://python.codnex.net/icons/doc128.png",
    "64": "http://python.codnex.net/icons/doc64.png",
    "32": "http://python.codnex.net/icons/doc32.png",
    "16": "http://python.codnex.net/icons/doc16.png"
  },
  "developer": {
    "name": "Nicolas Grillet",
    "url": "http://www.erreurs404.net"
  },
  "installs_allowed_from": ["*"],
  "default_locale": "en",
  "type": "web",
  "appcache_path": "/manifest.php",
  "fullscreen": "true",
  "version":"<?php v(); ?>"
}