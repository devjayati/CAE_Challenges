<html>
<body>
<?php
	$name = $_POST["name"]; 
	$email = $_POST["email"];
	$age = $_POST["age"];
	$gender = $_POST["gender"];
?>
	Hello <?php echo $name; ?>!, we have received email address <?php echo $email; ?>, age <?php echo $age; ?> years and gender <?php echo $gender; ?>. Thanks! 
	
<?php 

$servername = "db.sice.indiana.edu";
$username = "phishingsummer19";
$password = "DK-PS-Nineteen";
$db = "phishingsummer19";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO sl5 (name, email, age, gender)
VALUES ('$name', '$email', '$age', '$gender')";

// input check echo $sql;
?>

<?php 
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>

<div id="next-button">
	<form action="email1.html">
		<input type="submit" class="button" value="Next" />
	</form>
</div>
</body>
</html>

