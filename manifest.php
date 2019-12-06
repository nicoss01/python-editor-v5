<?php
include dirname(__FILE__)."/version.php";
header("content-type:text/cache-manifest");
?>
CACHE MANIFEST
# Version <?php v(); echo "\n";?>

<?php
echo "index.php\n";
$dir=dirname(__FILE__);
$directory_iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
$exts=array("php","psd","txt","py","htaccess","buildinfo","DS_Store","md","dist");
foreach($directory_iterator as $filename => $path_object)
{
	$ext = end(explode(".",$filename));
    if(!in_array($ext,$exts)&&!is_dir($filename)&&!preg_match("/docs\//",$filename)&&!preg_match("/snippets\//",$filename)&&!preg_match("/old\//",$filename)&&!preg_match("/update\//",$filename)&&!preg_match("/sources\//",$filename)&&$filename!=$dir."/manifest.php")
		echo str_replace($dir."/","",$filename)."\n";
}
?>
SETTINGS:
prefer-online
NETWORK:
*