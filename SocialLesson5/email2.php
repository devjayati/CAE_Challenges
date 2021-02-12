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
		<p> From: JPMorgan Chase Bank <br>
			Date: Tue 2/2/2021 5:31 AM <br>
			To: <?php echo $_SESSION["name"];?> ( <?php echo $_SESSION["email"];?> )<br>
			Subject: Frault Alert <br>
			Note: This message from trusted sender <br>
			<hr>
												References-ID#7329560
			<br><br><br><br>

			Dear <?php echo $_SESSION["name"];?>, <br><br>

			This is a fraud alert. Let us know immediately if you, or anyone you authorized, changed your Executive Card that was recently used for veterinary care. Please confirm you used your Citi® / Capitol One  Executive Card ending for the transaction(s) noted below by confirming your age. You may not be able to make purchases on your  Executive Card until we hear back from you! <br><br>

			Transaction: Kroger <br>
			Amount: $356.67 <br>
			Your age on our records: <?php echo $_SESSION["age"]; ?> <br>
 
			<br> 
			<a href="https://usablesecurity.net/">Please login here to confirm or deny payment.</a>
			<br><br><br>
			Regards, <br>
			Capital One <br>
			Digital Signature Verified <br>
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
			<form action="email3.php">
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
