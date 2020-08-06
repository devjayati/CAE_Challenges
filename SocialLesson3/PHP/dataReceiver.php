<?php
/**
 * Created by IntelliJ IDEA.
 * User: Tom
 * Date: 3/26/2015
 * Time: 1:32 PM
 */

session_start();
if(isset($_POST['trials'])){
    $_SESSION['trials'] = $_POST['trials'];
}

$totalTrials = $_SESSION['trials'];
$halfTrials = $totalTrials/2;

foreach($_POST as $k => $v) {
    if (strpos($k, 'difficulty') !== false) {
        $foundkey = TRUE;
    }
}

if (array_key_exists('What_is_your_age', $_POST) == TRUE) {
    $_POST['participant'] = $_SESSION['participant'];
    $encoded = json_encode($_POST, JSON_PRETTY_PRINT);
    $saveto = dirname(__FILE__)."/results/raw_sis_data_".$_SESSION['participant']."_".$_SESSION['time'].".json";
    file_put_contents($saveto, $encoded);

    header("Location: stressSite.php");
} elseif (array_key_exists('For_the_purposes_of_this_study_if_you_feel_the_presented_website_is_insecure_what_action_should_you_take', $_POST)==TRUE){
	$_POST['participant'] = $_SESSION['participant'];
	$encoded = json_encode($_POST, JSON_PRETTY_PRINT);
	$saveto = dirname(__FILE__)."/results/raw_validation_data_".$_SESSION['participant']."_".$_SESSION['time'].".json";
	file_put_contents($saveto, $encoded);

	if (array_key_exists('What_is_your_gender', $_POST) == TRUE) {
    		$_POST['workerId'] = $_SESSION['participant'];
    		$_POST['assignmentId'] = $_SESSION['assignmentId'];

    		$encoded = json_encode($_POST, JSON_PRETTY_PRINT);
    		$saveto = dirname(__FILE__)."/results/raw_survey_data_".$_SESSION['participant']."_".$_SESSION['time'].".json";
    		file_put_contents($saveto, $encoded);

    		if($_SESSION['CAS'] == true){
      		header("Location: thanksIU.php");
    		} else{
                if($_SESSION['type'] == "mturk"){
                    header("Location: thanksMturk.php");    
                }else{
                    header("Location: thanksinv.php");   
                }
      		
    		}
	}
} elseif ($foundkey == TRUE) {
    $_POST['participant'] = $_SESSION['participant'];

    $saveto = dirname(__FILE__)."/results/raw_site_data_".$_SESSION['participant']."_".$_SESSION['time'].".json";

    $arr_data = array();

    if (file_exists($saveto)) {
        $server_json = file_get_contents($saveto);
        $arr_data = json_decode($server_json, true);
    }

    $arr_data[] = $_POST;
    $encoded = json_encode($arr_data, JSON_PRETTY_PRINT);
    file_put_contents($saveto, $encoded);
	  $_SESSION['completedTrials'] = $_SESSION['completedTrials']+1;
    if (array_key_exists('bonusPay', $_POST) == TRUE) {
        $goodSites = $halfTrials - $_POST['goodSitesSkipped'];
        $badSites = $halfTrials - $_POST['badSitesLoggedInto'];
        $bonusPay = $_POST['bonusPay'];

        $_SESSION['bonusPay'] = $_POST['bonusPay'];

        echo
        "Here is a tally of your performance:<br>
        The number of total test websites: $totalTrials<br>
        You correctly signed-in to $goodSites of $halfTrials secure websites.<br>
        You correctly declined to signed-in to $badSites of $halfTrials insecure websites.<br>
        <p>In order to receive your bonus of <strong>\$$bonusPay</strong> with the guaranteed compensation of \$2.00, you now need to complete the survey.</p>
        <p>This survey consists of a series of questions designed to assess your practical as well as formal knowledge of cyber security. Please note that some of the questions are included for quality control, and you will not be approved for payment if you do not pay attention and answer all the questions.</p><br>
        <BUTTON id=\"startSurvey\" onClick=\"javascript:startSurvey()\">Continue to Survey</BUTTON>";
    }
};
