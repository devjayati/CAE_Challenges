<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css" />
<script src="function.js"></script>
<title>Social Lesson 5</title>
</head>

<body>
<div id="header">
	<h2>Social Lesson 5: Spear Phishing</h2>
	<p>Now you have to decide if the email below is phished or not.</p> 
</div>

<?php 
session_start();
//include 'submit.php';
//echo "hello world";
//echo $_SESSION["name"];
$servername = "db.sice.indiana.edu";
$username = "phishingsummer19";
$password = "DK-PS-Nineteen";
$db = "phishingsummer19";

// Create connection
$x = new mysqli($servername, $username, $password, $db);

// Check connection
if ($x->connect_error) {
  echo "Connection failed: " . $x->connect_error;
}
//$last_id = $x->insert_id;
//console.log($last_id);
//$sql = "SELECT * FROM sl5 WHERE id = '".$last_id."'";
//$result = $x->query($sql);

// input check echo $sql;
//if ($result->num_rows > 0) {
  // output data of each row
//  while($row = $result->fetch_assoc()) {
//    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
//  }
//} else {
//  echo "0 results";
//}

$x->close();

?>
<div id="main-content">
	<div id="scenario" style="text-align:left;">
		<p> From: Job Notification <newsletters@jobs.gov> <br>
			Date: Tue 2/14/2021 10:00 AM <br>
			To: <?php echo $_SESSION["email"];?> <br>
			Subject: <?php echo $_SESSION["name"];?>, We are hiring! <br>
			Note: This message from trusted sender <br>
			<hr>
												References-ID#7329560
			<br><br><br><br>

			Dear <?php echo $_SESSION["name"];?>, <br><br>

			We are hiring at Gleaming Media and found your profile to be a suitable candidate for this job! <br><br>
			Responsibilities: <br><br>

			1. Creating well-written copy that is free from mistakes. <br>
			2. Maintaining a database of customers who have opted to receive our correspondence. <br>
			3. Distributing emails through the use of automation software. <br><br>
			
			Requirements: <br><br>
			1. Outstanding copywriting and copyediting abilities.<br>
			2. Ability to harness collaboration to produce well-crafted content.<br>
			3. Drive, ingenuity, and gumption.<br>
 
			<br> 
			<a href="https://usablesecurity.net/">Apply Now!</a>
			<br><br>
			<hr>
	</div>
	<div id="options">
			
	</div>
	<div id="options">
		<input type="hidden" class="scene" id="552"/>
		<input type="button" class="option" value="Phishing Email" id="option1" onclick="myFunction1()"/>
		<input type="button" class="option" value="Spear Phishing Email" id="option2" onclick="myFunction2()" />
		<br style="clear: left;" />
	</div>
	<div id="results">
		<p id="display-results"> Show/ Hide </p>
		<div id="next-button">
			<form action="success.html">
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
