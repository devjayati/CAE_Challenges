<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css" />
<script src="function.js"></script>
<title>Social Lesson 5</title>
</head>

<body>
<? 
session_start();
?>
<div id="header">
	<h2>Social Lesson 5: Spear Phishing</h2>
	<p>Now you have to decide if the email below is phished or not.</p> 
</div>

<div id="main-content">
	<div id="scenario" style="text-align:left;">
		<p> From: Netflix <localportalnotfy1328@ikebcew.com> <br>
			Date: 12/28/2020 5:31 AM <br>
			To: <br>
			Subject: Netflix Automatic Payments <br>
			Note: This message from trusted sender <br>
			<hr>
												References-ID#7329560
			<br><br><br><br>

			Hi customer, <br><br>

			Your Auto p͏a͏y͏m͏e͏n͏t͏ cannot process. Your subscription period will end on Mon, February 01, 2021.
 
			<br> 
			<a href="https://usablesecurity.net/">Please click here to update your p͏a͏y͏m͏e͏n͏t͏ method.</a>
			<br><br><br>
			Regards, <br>
			Netflix Team 
			<hr>
	</div>
	<div id="options">
			
	</div>
	<div id="options">
		<input type="hidden" class="scene" id="551"/>
		<input type="button" class="option" value="Phishing Email" id="option1" onclick="myFunction1()"/>
		<input type="button" class="option" value="Spear Phishing Email" id="option2" onclick="myFunction2()" />
		<br style="clear: left;" />
	</div>
	<div id="results">
		<p id="display-results"> Show/ Hide </p>
		<div id="next-button">
			<form action="email2.php" method="post">
				<input type="submit" class="button" value="Next" />
			</form>
		</div>
	</div>
</div>
<div id="footer">
	<p> © 2020. Developed by <a href="http://usablesecurity.net/">HATS Indiana University</a> under the Creative Commons license.</p> 
</div>
</body>
</html>
