<?php

session_start();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Log in Not Log in Study Thanks</title>
<style>
</style>
</head>
<div id="finalForm" style="width:60%;margin-left:auto;margin-right:auto;top:100px;font-size:125%;">
<p>
Thank you for participating!
</p>
<!--
<p>
    If you have any additional comments on our study we would appreciate your feedback. These comments are optional and if you just wish to complete the HIT, click the Complete HIT button. Once again thank you for your time and effort.


</p> --> 

<FORM action="url_that_displays_flag" method="POST" id="mturk_form">
    <input type="hidden" name="assignmentId" value="<?php echo $_SESSION['assignmentId'];?>"/>
    <input type="hidden" name="bonusPay" value="<?php echo $_SESSION['bonusPay'];?>"/>
    <input type="hidden" name="foo" value="bar"/>
<p>
<button type="submit" value="Submit">Submit</button>
</p>
    </FORM>

</div>
</html>


<?php
    session_destroy();
?>
