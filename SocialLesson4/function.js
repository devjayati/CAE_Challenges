function myFunction1() {
	var results = document.getElementById("results");
	results.style.display = "block";
	var x = document.getElementsByClassName("scene")[0].id;
	var img1 = "option1";
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
    };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}
function myFunction2() {
	var results = document.getElementById("results");
	results.style.display = "block";
	var x = document.getElementsByClassName("scene")[0].id;
	var img1 = "option2";
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
    };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}