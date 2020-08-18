<?php
$servername = "db.sice.indiana.edu";
$username = "phishingsummer19";
$password = "DK-PS-Nineteen";
$db = "phishingsummer19";
//echo "hello world";

//if(isset($_GET['submit']) 
//{
	$output = htmlentities($_GET['enigma-output']);
	//echo $output;
//}

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";

//create db
//NEW: no need to create database - need to check with the existing table and see if the values match. If they match, then show success.html else show error.html
$sql = "SELECT flag FROM test WHERE id=1;";
//echo $sql;
$result = $conn->query($sql);
if ($conn->query($sql) === $output) {
 echo "success";
} else {
  echo "error: " . $conn->error;
}

// close connection
$conn->close();

?>