<?php
echo str_replace("adsbygoogle","outgg",str_replace("google_","gg_",file_get_contents("http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")));
?>