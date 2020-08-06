<?php
//may need to uncomment, depending on how people are directed to the study
//session_start();

//check to see if this is valid for given MTurkId


if (isset($_GET['workerId']) && !empty($_GET['workerId'])){
    $validId = true;
}
else{
    $validId = false;
}

if (isset($_GET['assignmentId'])){
	$preview = $_GET['assignmentId'] === "ASSIGNMENT_ID_NOT_AVAILABLE";
}
else {
	$preview = false;
}

if(!$preview && isset($_GET['assignmentId'])){
    $_SESSION['assignmentId'] = $_GET['assignmentId'];
}

if (!$preview && $validId == true && (isset($_GET['hitId']) && !empty($_GET['hitId']))){
    $_SESSION['participant'] = $_GET['workerId'];
    $_SESSION['hitId'] = $_GET['hitId'];
}

else {
    $_SESSION['participant'] = $_SERVER['SERVER_NAME'] . time();
    $_SESSION['hitId'] = 'This is a test.';
	$_SESSION['assignmentId'] = 'This is a test.';
}


if(isset($_SESSION['user'])){
    $_SESSION['participant'] = hash_hmac('sha512',$_SESSION['user'],'DCNLab Login or Not Login Study');
  }


//echo $_SESSION['participant'];

$_SESSION['time'] = time();

//For testing accuracy condition
//Time = 0, Accuracy = 1
if($_SESSION['tt'] == 0){ //Time
  $_SESSION['experimentConditionNumber'] = 0;
} elseif($_SESSION['tt'] == 1){ //Accuracy
  $_SESSION['experimentConditionNumber'] = 1;
} else {  //Defaults to 'Time'
  $_SESSION['experimentConditionNumber'] = 0;
}

if($_SESSION['type'] == 'mturk'){ //MTurk Participants
 $_SESSION['participantType'] = 0;
} elseif($_SESSION['type'] == 'iu'){ //IU Participants
$_SESSION['participantType'] = 1;
}elseif($_SESSION['type'] == 'inv'){ //Invited Participants
$_SESSION['participantType'] = 2;
}
else {
$_SESSION['participantType'] = 3;
}

$directory = "../Images/Windows/Order1/";
$filecount = 0;
$files = glob($directory . "*");
if($files){
	$filecount = count($files);
}
//print  $directory + " : " + $filecount;
$_SESSION['trials'] = $filecount;
$_SESSION['completedTrials'] = 0;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Log in Not Log in Consent Form</title>
<style>

#studyarea {
    font-family: Arial, Helvetica, sans-serif;
}

#sis {
	font-family: Arial, Helvetica, sans-serif;
	display: none;
}

.ease{
width:70%;
margin-left:auto;
margin-right:auto;
top:50px;
}

</style>
<script src="JS/jquery-1.11.0.js" type="text/javascript"></script>
<script src="JS/survey.js" type="text/javascript"></script>
</head>

<body>
<head>
<?php 
//header("Cache-Control: no-cache, must-revalidate");
//header("Pragma: no-cache");
if(!$preview){
$_SESSION['sisStart'] = true;
}
?>
</head>
<div id="studyarea" class="ease">
<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
<div id="sis">

<center><H1>Social Lesson 4</H1></center><p>
		<center><H3> This challenge seeks to understand how you decide whether or not it is secure to sign-in to different websites on the Internet. Read the following instructions very carefully.</H3></center>
					<br>							
			<ul>
				<li><strong>DO NOT REFRESH </strong> any page.</li>
				<li>Click the <strong>BACK </strong> button to go back.</li>
				<li>Click the <strong>LOGIN/ SIGN-IN </strong> button to go forward.</li>
				<li>Time penality is <strong>15 seconds</strong></li>
			</ul>  
					<?php if(!$preview) :?>
		<center><BUTTON id="sisacknowledged" style="background-color: #6B8E23;border: none;color: white;text-align: center;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;padding: 12px 28px;">Start!</BUTTON></center>
		   <?php endif;?>

	</DIV>
<DIV id="error">&nbsp;</DIV>

	<DIV id="question" class="ease">&nbsp;</DIV>

	<DIV id="navigation" class="ease">&nbsp;</DIV>
	<form id="sis_form" action="PHP/dataReceiver.php" method=POST>
	<DIV id="completedquestions">
		<INPUT id="workerId" type="hidden" value="<?php echo $_SESSION['participant'];?>"/>&nbsp;
		<INPUT id="experimentCondition" type="hidden" value="<?php echo $_SESSION['experimentConditionNumber'];?>"/>
		<INPUT id="participantType" type="hidden" value="<?php echo $_SESSION['participantType'];?>"/>
		<INPUT id="trials" type="hidden" value="<?php echo $_SESSION['trials'];?>"/>
	</DIV>
	</form>
</html>
