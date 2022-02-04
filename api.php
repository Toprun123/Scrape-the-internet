<?php
    include("scraper.php");
    $tag = isset($_GET['tag']) ? $_GET['tag'] : FALSE;
    $by = isset($_GET['by']) ? $_GET['by'] : FALSE;
    $id = isset($_GET['id']) ? $_GET['id'] : FALSE;
    $addr_orig = isset($_GET['addr']) ? $_GET['addr'] : FALSE;
    $tt = isset($_GET['tt']) ? $_GET['tt'] : FALSE;

    $addr_in_process = str_replace("{","&",$addr_orig);
    $addr = str_replace(" ","+",$addr_in_process);

    $html = scrach_website($addr);

    if(($by=='true')&&($id==false)&&($tag==false)&&($tt==false)){
        echo $html;
        $no_cont = true;
    } elseif($by=='false') {
        $no_cont = false;
    } else {
        $error = true;
		$no_cont = false;
    }

	if (!$no_cont) {

		if($tt=='html'){
	        $tt_f = 'innertext';
	        $error = false;
	    } elseif($tt=='text') {
	        $tt_f = 'plaintext';
	        $error = false;
	    } else {
	        $error = true;
	    }

	    if(!$error){
	        $original = $html->find($tag."#".$id,0)->$tt_f;
	        echo $original;
	    }

	    if($error){
	        echo '<div class="error">
	                <i class="fa fa-times-circle"></i>
	                Error! The inputs might be invalid!
	                </div>';
	    }
	}
?>