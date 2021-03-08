<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$q = $_GET['q'];
$x = $_GET['x'];
console.log("q="+q+"and x="+x);
//$servername = "db.sice.indiana.edu";
//$username = "phishingsummer19";
//$password = "DK-PS-Nineteen";
//$db = "phishingsummer19";
$servername = "localhost";
$username = "root";
$password = "";
$db = "CAE";
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql="SELECT * FROM test WHERE id = '".$x."' AND challenge = '".$q."'";
$result = $conn->query($sql);

/* echo "<table>
<tr>
<th>challengeindex</th>
<th>answer</th>
<th>response</th>
</tr>"; */
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	  //echo "<tr>";
	  //echo "<td>" . $row['challenge'] . "</td>";
	  //echo "<td>" . $row['id'] . "</td>";
	  echo "<td>" . $row['flag'] . "</td>";
	  //echo "</tr>";
	}
}
else {
	//echo $q;
	//echo $x;
	echo "Hm..possibly. Try a different answer?";
}
//echo "</table>";
$conn->close();
?>
</body>
</html>