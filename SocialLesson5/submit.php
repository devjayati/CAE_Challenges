<html>
<link rel="stylesheet" type="text/css" href="style.css" />
<body>
<?php
	session_start();
	$name = $_POST["name"]; 
	$email = $_POST["email"];
	$age = $_POST["age"];
	$gender = $_POST["gender"];
	$_SESSION["name"] = $name; 
	$_SESSION["email"] = $email;
	$_SESSION["age"] = $age;
	$_SESSION["gender"] = $gender;
	//echo $_SESSION["name"];
?>
	<p>Hello <?php echo $name; ?>! You have entered the following information: <br>
	Email address: <?php echo $email; ?> <br> 
	Age: <?php echo $age; ?> years <br>
	Gender: <?php echo $gender; ?> <br>
	<hr> </p>
	
<?php 

//$servername = "db.sice.indiana.edu";
//$username = "phishingsummer19";
//$password = "DK-PS-Nineteen";
//$db = "phishingsummer19";

// Create connection
//$conn = new mysqli($servername, $username, $password, $db);

// Check connection
//if ($conn->connect_error) {
//  die("Connection failed: " . $conn->connect_error);
//}

//$sql = "INSERT INTO sl5 (name, email, age, gender)
//VALUES ('$name', '$email', '$age', '$gender')";

// input check echo $sql;
?>

<?php 
//if ($conn->query($sql) === TRUE) {
  //echo "New record created successfully";/
//} else {
//  echo "Error: " . $sql . "<br>" . $conn->error;
//}

//$conn->close();

?>

<div id="next-button">
	<form action="email1.php" method="post">
		<input type="submit" class="button" value="Let's look at Emails" />
	</form>
</div>
</body>
</html>

