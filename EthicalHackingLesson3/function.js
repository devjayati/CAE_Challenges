function myFunction() {
	var results = document.getElementById("results");
	results.style.display = "block";
	var x = document.getElementsByClassName("scene")[0].id;
	var img1;
	if(document.getElementById("public").checked){
		img1="public";
	}
	else if(document.getElementById("private").checked){
		img1="private";
	}
	else if(document.getElementById("mixed").checked){
		img1="mixed";
	}
	else if(document.getElementById("none").checked){
		img1="none";
	}
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
    };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}
