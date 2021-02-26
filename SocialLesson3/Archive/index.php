<?php
  //check to see if they are using Firefox
session_start();

  $agent = $_SERVER['HTTP_USER_AGENT'];


//$_SESSION['firefox'] = '/Firefox/';


//$isFirefox = preg_match($_SESSION['firefox'],$agent);
$_SESSION['tt']=0;
$_SESSION['type']='mturk';
$_SESSION['group']=0;
?>
<?php
//if($isFirefox){
    if(isset($_GET['authcheck']) && $_GET['authcheck'] == 'true'){ //check for IU access
      if($_SESSION['valid'] == true){
        require_once('PHP/sisSite.php');
      } else {
        echo 'CAS Session already used. Please close and reopen Firefox browser.';
      }
    } elseif(isset($_GET['casticket'])){ //validate cas ticket
      $_SESSION['casticket'] = $_GET['casticket']; //Perm sets ticket, so you can only login once
      require_once('PHP/casauth.php');
    } else {
      //look for TT and Type
      //if(isset($_GET['tt']) && isset($_GET['type']) && isset($_GET['group'])){
       // $_SESSION['tt']=0;//$_GET['tt']; //Time = 0, Accuracy = 1
       // $_SESSION['type']='mturk';//$_GET['type']; //iu or mturk or inv
       // $_SESSION['group']=0;//$_GET['group']; // 0: no tool
                                           // 1: low risk high security
                                           // 2: medium risk
                                           // 3: high risk low security
	
       // if($_SESSION['group'] < 0 || $_SESSION['group'] > 3){
       //     echo "Please make sure that you put the correct testing parameters (e.g. group should be 0, 1, 2, or 3)";
       // }else{
          if($_SESSION['type'] == 'mturk') { //mturk
              require_once('PHP/sisSite.php');
          }
              else if($_SESSION['type'] == 'inv') { //inv
              require_once('PHP/sisSite.php');
          } elseif($_SESSION['type'] == 'iu') {//iu
              require_once('PHP/casauth.php');
          } else {
            echo 'There seems to be an error in your study type. Please contact and administrator.';
          }
        //}
      //} else {
	//echo 'type:'.$_SESSION['type'];
        //echo 'incorrect testing parameters are set';
      //}
    }
//}
//else{
 // echo 'It appears that you are not using a recognized version of Firefox. Please return to view this HIT using Firefox, as we have some functionality that requires Firefox, and we want to make sure you do not have further problems with this HIT.';
//}
//
//if(empty($_SESSION))
//{
//    echo "<!DOCTYPE html>";
//    echo "<p>There is no session</p>";
//}else{
//    echo "<!DOCTYPE html>";
//    echo "<pre>";
//    print_r($_SESSION);
//    echo "</pre>";
//}
?>
