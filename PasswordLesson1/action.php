<?php
$servername = "db.sice.indiana.edu";
$username = "phishingsummer19";
$password = "DK-PS-Nineteen";
$db = "phishingsummer19";
//echo "hello world";

//if(isset($_GET['submit']) 
//{
	//echo "session";
	//echo $_SESSION["levels"];
	//echo "output";
	$output = htmlentities($_GET['answer']);
	//echo $output;
	//echo "results below:";
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
$sql = "SELECT challenge, flag, id FROM test WHERE challenge='P1';";
//echo $sql;
$result = $conn->query($sql);
//$result = $conn->query($sql);
$index = 0; 
$a = array("", "", "", "", "", "");
$b = array("", "", "", "", "", "");
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
	  $a[$index] = $row["id"];
	  $b[$index] = $row["flag"];
	  //echo "id:".$a[$index]." flag:".$b[$index]."index:".$index."<br>";
	  $index++;
  }
} else {
  echo "0 results";
}
//echo "print test <br>";
//$j=0;
//while($j<5){
	//echo "id:".$a[$j]." flag:".$b[$j]."index:".$j."<br>";
	//$j++;
//}
$index = 0;
$flag = 0;
while($index<5) {
 //echo "id: " . $row["id"]. " - Flag: " . $row["flag"]. " " . "<br>";
 //echo "id:".$a[$index]." flag:".$b[$index]."index:".$index."<br>";
	 if(($b[$index] == $output) && ($a[$index] == 4)) {
		// //htmlentities($_GET['displaymsg']) = "Correct! Level 1 Complete.";		
		 //echo "success level 1";
		 $flag = 1;
		 header("Location: success.html");
		 //$_SESSION["levelclear"] = 1; 
		// //echo $row["flag"];
		// //echo $row["id"];
		//echo "output:".$output."id:".$a[index]." flag:".$b[index]."index:".$index."\n";
		break;
		// //header("Location: success.html");
		// //header("Location: success.html");
	 }
	 else if((($b[$index] == $output) && ($a[$index] == 5)) || (($b[$index] == $output) && ($a[$index] == 6))) {
		// //htmlentities($_GET['displaymsg']) = "Correct! Level 2 Complete.";
		$flag = 1;
		header("Location: success.html");
		 //echo "success level 2";
		 //echo "output:".$output."id:".$a[index]." flag:".$b[index]."index:".$index."\n";
		// //echo $row["flag"];
		// //echo $row["id"];
		break;
	 }
	 else if((($b[$index] == $output) && ($a[$index] == 7)) || (($b[$index] == $output) && ($a[$index] == 8))) {
		// //htmlentities($_GET['displaymsg']) = "Correct! Level 3 Complete.";
		$flag = 1;
		header("Location: success.html");
		 //echo "success level 3";
		 //echo "output:".$output."id:".$a[index]." flag:".$b[index]."index:".$index."\n";
		// //echo $row["flag"];
		// //echo $row["id"];
		break;
	 }
	 else {
		// //htmlentities($_GET['displaymsg']) = "Wrong answer! Check again.";
		 //echo "error";
		 $flag = 0;
		// //header("Location: error.html");
		// //echo "success";
		 //echo $output;
		 //echo $a[index];
		 //echo $b[index];
		//break;
	 }
	 $index++;
}
$index = 0;
if($flag == 0) {
	header("Location: error.html");
}
//echo "error";
//if ($conn->query($sql) === $output) {
// echo "success";
//} else {
//  echo "error: " . $conn->error;
//}
// close connection
$conn->close();

?>