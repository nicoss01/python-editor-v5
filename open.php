<?php
session_start();
ini_set("display_errors",0);
if(isset($_GET['state'])){
	$state = json_decode(stripslashes($_GET['state']));
	$_SESSION['mode'] = $state->action;

	if(isset($state->ids)){
	  $_SESSION['fileIds'] = $state->ids;
	}else{
	  $_SESSION['fileIds'] = array();
	}
	if(isset($state->parentId)){
	  $_SESSION['parentId'] = $state->parentId;
	}else{
	  $_SESSION['parentId'] = null;
	}
	header("Location:index.php#".$state->ids[0]);
} else {
	header("Location:index.php");
}
?>