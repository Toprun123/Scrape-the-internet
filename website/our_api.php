<style>
    .error {
        color: #d8000c;
        background-color: #ffd2d2;
        font-size:25px;
    }
    .error i {
        margin:10px 22px;
        font-size:2em;
        vertical-align:middle;
    }
</style>
<body>
    <?php
        header("Access-Control-Allow-Origin: *");
        include("scracher.php");

        $tag = isset($_GET['tag']) ? $_GET['tag'] : FALSE;
        $by = isset($_GET['by']) ? $_GET['by'] : FALSE;
        $id = isset($_GET['id']) ? $_GET['id'] : FALSE;
        $addr_orig = isset($_GET['addr']) ? $_GET['addr'] : FALSE;
        $tt = isset($_GET['tt']) ? $_GET['tt'] : FALSE;

        // $addr_in_process = str_replace('[amp$', '&', $addr_orig);
        $addr = str_replace('[equ$', "=", str_replace('[amp$', '&', $addr_orig));

        $error = false
        try {
          $html = scrach_website($addr);
        } catch (Exception $e) {
          $error = true
        }

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
    	    } elseif($tt=='text') {
    	        $tt_f = 'plaintext';
    	    } else {
    	        $error = true;
    	    }

    	    if(!$error){
    	        $orignal = $html->find($tag."#".$id,0)->$tt_f;
              echo '<div id="main">';
    	        echo $orignal;
              echo '</div>';
    	    }

    	    if($error){
    	        echo '<div class="error">
    	                <i class="fa fa-times-circle"></i>
    	                Error! The inputs might be invalid!
    	                </div>';
    	    }
    	}
    ?>
</body>
