const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let flag = 0;
var i = 0; 
var gameIndicator = 0;
//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
	//count = count+30;
	//return Math.round((max - min) + count);
}
function numbergenerator() {
	var x;
	//console.log(flag); 
	if(flag == 3) {
		x = Math.random();
	} else if (flag == 1) {
		var answerAttribute = [0.16, 0.33, 0.4, 0.5, 0.67, 0.84];
		if(i < answerAttribute.length) {
			x = answerAttribute[i];
			i++;
			if(i == answerAttribute.length) {
				i = 0;
			}
		}
	}
	else if (flag == 2) {
		var answerAttribute = [0.33, 0.5, 0.84];
		if(i < answerAttribute.length) {
			x = answerAttribute[i];
			i++;
			if(i == answerAttribute.length) {
				i = 0;
			}
		}
	}
	else {
		x = 1; 
	}
	//console.log(x);
	return x;
}

function randomHole(holes){
    const index  = Math.floor(numbergenerator() * holes.length);
	//console.log(holes.length);
	//const index  = Math.floor(numbergenerator() * holes.length);
	//console.log(index);
    const hole = holes[index];
    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); //get a random time to determine how long mole should peep
	//console.log(time);
	//console.log(dropDown);
    const hole = randomHole(holes); //get the random hole from the randomHole function
	//console.log(hole);
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
	if(gameIndicator == 0){
		scoreBoard.textContent = 0;
		timeUp = false;
		score = 0;
		peep();
		setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
		gameIndicator = 1;
	}
	else{
		
	}	
}

function wack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))

// this function is to create the drop down menu and make it appear
var dropDown = document.getElementById("dropDown");
function test() {
    if(dropDown.value == "default"){ 
       document.getElementById("game1").style.display = "none";
	   //document.getElementById("game2").style.display = "none";
	   //document.getElementById("game3").style.display = "none";
	   document.getElementById("score").style.display = "none";
	   document.getElementById("hidelabel").style.display = "none";
	   document.getElementById("button").style.display = "none";
	   alert("Please select a level");
     } else if(dropDown.value == "one"){
       //document.getElementById("game2").style.display = "none";
       document.getElementById("game1").style = "";
	   //document.getElementById("game2").style.display = "none";
	   //document.getElementById("game3").style.display = "none";
	   document.getElementById("score").style.display = "block";
	   document.getElementById("button").style.display = "block";
	   document.getElementById("hidelabel").style.display = "block";
	   document.getElementById("question").style.display = "block";
	   flag = 1; 
	   //alert("game 1");
      } else if(dropDown.value == "two"){
       //myWrappers[i].style.display = "none";
       //document.getElementById("game2").style.display = "block";
	   document.getElementById("game1").style = "";
	   //document.getElementById("game1").style.display = "none";
	   //document.getElementById("game3").style.display = "none";
	   document.getElementById("score").style.display = "block";
	   document.getElementById("button").style.display = "block";
	   document.getElementById("hidelabel").style.display = "block";
	   document.getElementById("question").style.display = "block";
	   flag = 2;
	   //alert("game 2");
      } else if(dropDown.value == "three"){
       //myWrappers[i].style.display = "none";
       //document.getElementById("game3").style.display = "block";
	   document.getElementById("game1").style = "";
	   //document.getElementById("game1").style.display = "none";
	   //document.getElementById("game2").style.display = "none";
	   document.getElementById("score").style.display = "block";
	   document.getElementById("button").style.display = "block";
	   document.getElementById("hidelabel").style.display = "block";
	   document.getElementById("question").style.display = "block";
	   flag = 3; 
	   //alert("game 3");
      }
	  //'<%Session["levels"] = "' + flag + '"; %>';
}
// function displayanswer() {
	// console.log(flag);
	// if(document.getElementById("answer").value == "123456" && flag == 1) {
		// document.getElementById("displaymsg").innerHTML = "Correct! Your flag is 8456.";
	// }
	// else if ((document.getElementById("answer").value == "624624" && flag == 2) || (document.getElementById("answer").value == "246246" && flag == 2)) {
		// document.getElementById("displaymsg").innerHTML = "Correct! Your flag is 4562.";
	// }
	// else if ((document.getElementById("answer").value == "RANDOM" && flag == 3) || (document.getElementById("answer").value == "random" && flag == 3)) {
		// document.getElementById("displaymsg").innerHTML = "Correct! Your flag is 7894.";
	// }
	// else {
		// document.getElementById("displaymsg").innerHTML = "Incorrect! Try again.";
	// }
// }
function check() {
  if (document.getElementById("answer").value!="") {
    document.getElementById("submit").style.display = "block";
  } else {
    document.getElementById("submit").style.display = "none";
    return false;
  }
}

