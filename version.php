<?php
ini_set("display_errors",0);
$version = "5.3.5";
function v($output=true,$html=false){
	global $version;
	$v = explode(".",$version);
	if($output)
		if($html)
			echo $v[0]."<small class='sub-version'>.".$v[1].'.'.$v[2].".".$v[3].'</small>';
		else
			echo $version;	
	else
		return $version;
}
?>