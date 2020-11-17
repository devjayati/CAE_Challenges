
// make all applicable correct but tell them why 
function myFunction1() {
  var img = document.getElementsByClassName("img");
  var img1 = "option1";
  var idx = document.getElementsByClassName("scene")[0].id;
	if(idx=="41") {
		x=idx;
	}
	else if(idx=="42") {
		x=42;
	}
	else if(idx=="43") {
		x=43;
	}
	else if(idx=="44") {
		x=44;
	}
	else if(idx=="45") {
		x=45;
	}
	else {
		x=0;
	}
  var results = document.getElementById("results");
		//document.getElementById("display-results").innerHTML = "";
		results.style.display = "block";
	//	img1.focus(alert('focused on option 1')) 
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
      };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}
function myFunction2() {
  var img = document.getElementsByClassName("img");
  var img1 = "option2";
  var idx = document.getElementsByClassName("scene")[0].id;
	if(idx=="41") {
		x=idx;
	}
	else if(idx=="42") {
		x=42;
	}
	else if(idx=="43") {
		x=43;
	}
	else if(idx=="44") {
		x=44;
	}
	else if(idx=="45") {
		x=45;
	}
	else {
		x=0;
	}
  var results = document.getElementById("results");
		//document.getElementById("display-results").innerHTML = "";
		results.style.display = "block";
	//	img1.focus(alert('focused on option 1')) 
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
      };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}
function myFunction3() {
  var img = document.getElementsByClassName("img");
  var img1 = "option3";
  var idx = document.getElementsByClassName("scene")[0].id;
	if(idx=="41") {
		x=idx;
	}
	else if(idx=="42") {
		x=42;
	}
	else if(idx=="43") {
		x=43;
	}
	else if(idx=="44") {
		x=44;
	}
	else if(idx=="45") {
		x=45;
	}
	else {
		x=0;
	}
  var results = document.getElementById("results");
		//document.getElementById("display-results").innerHTML = "";
		results.style.display = "block";
	//	img1.focus(alert('focused on option 1')) 
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			document.getElementById("display-results").innerHTML = this.responseText;
      };
    xmlhttp.open("GET", "index.php?q=" + img1 + '&x=' + x, true);
    xmlhttp.send();
}

