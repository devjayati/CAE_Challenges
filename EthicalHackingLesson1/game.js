		var i =0; 
		var scenario = ["Sally the Locksmith","Jimmy the Toy Whisperer", "Josie the Password Master", "Rob and the Credit Card", "Alex the Decoder", "Bill and the Alexa"];
				//option green cards 
				var item1 = ["Sally buys a lock at the store and takes it home.  She puts it on her toolbox and wants to practice picking the lock to see if she can.  (green card - the lock is hers to pick and the contents of the box are hers to see). ", "Jimmy's dad gives him a toy Fisher Price Smart Toy Bear and says 'Have fun with it, it's all yours now'.  It can see, hear, detect movement, and speak.  Jimmy wants to look inside to see how it works so he grabs his tool kit to look inside. (green card - it is his toy and his content)", "Josie learns that a lot of peoples passwords are based on personal information. To test this idea she asks her mom if she can guess the mom's password to her facebook account. The mom says yes and Josie tries things like date of birth, name of first pet, and names of children. (green card - mom said yes)","Rob finds a credit card on the ground of a local supermarket. He looks up the person online and sends a message saying 'I think you lost your card.' He then turns it into the store's lost and found. (green card - he alerted the person to the lost card, and then turned it into the appropriate channel.)", "Alex and her friend, James, pass notes in class using a Caesar cypher they determine how much it is shifted everyday. They pass notes using that and Alex only reads notes meant for her. (green card - she is meant to see it.)", "Bill is at home and decides to prank his sibling by quietly broadcasting the Kahoot music in ever room. (green he is allowed to use the Alexa bc its his own)"];
				//option yellow cards
				var item2 = ["Sally is at school and one of her friends dares her to pick the lock on his locker “if she can!” (yellow card, although the contents are his and he did give permission, the lock belongs to the school.  Best she ask permission of a school official first.) ","Jimmy sees that data is being sent from the toy up to the Fisher Price's cloud servers and wonders if he could modify the data going up and see if he can prove that Fisher Price's security is weak enough that he could get to some other kid's data. (yellow card - without a bug bounty or other written permission to hack, Jimmy is likely to run into trouble since the cloud server is not his and neither is another person's data.  Trying to do a good thing in proving weakness does not alleviate the wrongness of improper data access)","After Josie hacked into her mom's account she wanted to see if she could do it to her dad too. He's asleep right now so she can't ask but since mom didn't mind why would he. (yellow card - while dad might not care she should have express permission.)","Rob finds another credit card on the ground this time he keeps it and messages the person about the missing card. He says that if they want it back they can meet for lunch sometime, he suggests that the person buy his lunch since he was such a good samaritan. (yellow card - he is making the person give him something in exchange for return of their card)","Alex and James tells their other friend Susan about this new note passing method. Susan sends a note to James that James then sends to Alex too. Alex wasn't told the shift so she cracks the code to read the message. (yellow card - while Alex was given the note she wasn't given the information need to read it and had to figure it out herself.)","Bill is hungry and his mom orders pizza through the Alexa all the time and sometimes let him do it. He decides to order a pizza without asking first. (Yellow - while he has permitted access to it, he might not have permission to use it.)"];
				//option red cards 
				var item3 = ["Sally learns that her mom has a hidden safe in her bedroom closet and wants to see if she can pick it the next time mom is gone to work (red card - the safe is not hers, the contents are not hers, she has no permission to pick). ","Jimmy finds out that he can take over the bear's nose camera and record video from his laptop over the internet. He considers taking it to school and leaving it for some kid to find and take home so that he can get some kind of funny video from it (red card - it is not legal, or morally right to record someone in their private spaces without their knowledge or consent).","Josie's teacher is giving a presentation and leaves the room. Josie noticed that her teacher has facebook on her favorites bar. Josie gets up and clicks on it. The password is saved and suddenly her and the entire class can see the facebook page and feed. The class agrees to make a post ;you got hacked by your class haha'. (Red light - Josie was given no permission, shared the information she found with the class, and embarrassed the teacher online.) ","Rob find yet another card on the ground at a store. Since it is a credit card it requires no pin he decides to buy his groceries with it and then trash the card. (red card - he is stealing)","Susan drops a note that is encoded and Alex picks it up. She doesn't know what the code is and cracks it. She finds out that James asked out Susan and Susan said no. Neither one of them probably didn't want her to read it. (red card - she was not given the note, and she cracked it)","Bill and his friend, John, are hanging out at John's house. They get hungry and Bill decides to order pizza. John's parents don't use Alexa to order pizza. (red - Bill is using someone else's Alexa to order pizza and its not even something Johns parents might be okay with."];
				//level1 -- Green - Green - Yellow - Red - Yellow - Green
				var level1 = ["Sally buys a lock at the store and takes it home.  She puts it on her toolbox and wants to practice picking the lock to see if she can.  ", "Jimmy's dad gives him a toy Fisher Price Smart Toy Bear and says 'Have fun with it, it's all yours now'.  It can see, hear, detect movement, and speak.  Jimmy wants to look inside to see how it works so he grabs his tool kit to look inside.","After Josie hacked into her mom's account she wanted to see if she could do it to her dad too. He's asleep right now so she can't ask but since mom didn't mind why would he.", "Rob find yet another card on the ground at a store. Since it is a credit card it requires no pin he decides to buy his groceries with it and then trash the card. ", "Alex and James tells their other friend Susan about this new note passing method. Susan sends a note to James that James then sends to Alex too. Alex wasn't told the shift so she cracks the code to read the message. ", "Bill is at home and decides to prank his sibling by quietly broadcasting the Kahoot music in ever room."];
				//level2 -- Red - Yellow - Red - Green - Green - Yellow
				var level2 = ["Sally learns that her mom has a hidden safe in her bedroom closet and wants to see if she can pick it the next time mom is gone to work.", "Jimmy sees that data is being sent from the toy up to the Fisher Price's cloud servers and wonders if he could modify the data going up and see if he can prove that Fisher Price's security is weak enough that he could get to some other kid's data.", "Josie's teacher is giving a presentation and leaves the room. Josie noticed that her teacher has facebook on her favorites bar. Josie gets up and clicks on it. The password is saved and suddenly her and the entire class can see the facebook page and feed. The class agrees to make a post ;you got hacked by your class haha'.", "Rob finds a credit card on the ground of a local supermarket. He looks up the person online and sends a message saying 'I think you lost your card.' He then turns it into the store's lost and found.", "Alex and her friend, James, pass notes in class using a Caesar cypher they determine how much it is shifted everyday. They pass notes using that and Alex only reads notes meant for her.", "Bill is hungry and his mom orders pizza through the Alexa all the time and sometimes let him do it. He decides to order a pizza without asking first."];
				//level3 -- Yellow - Red - Green - Yellow - Red - Red 
				var level3 = ["Sally is at school and one of her friends dares her to pick the lock on his locker 'if she can!'", "Jimmy finds out that he can take over the bear's nose camera and record video from his laptop over the internet. He considers taking it to school and leaving it for some kid to find and take home so that he can get some kind of funny video from it.", "Josie learns that a lot of peoples passwords are based on personal information. To test this idea she asks her mom if she can guess the mom's password to her facebook account. The mom says yes and Josie tries things like date of birth, name of first pet, and names of children.", "Rob finds another credit card on the ground this time he keeps it and messages the person about the missing card. He says that if they want it back they can meet for lunch sometime, he suggests that the person buy his lunch since he was such a good samaritan. ", "Susan drops a note that is encoded and Alex picks it up. She doesn't know what the code is and cracks it. She finds out that James asked out Susan and Susan said no. Neither one of them probably didn't want her to read it. ", "Bill and his friend, John, are hanging out at John's house. They get hungry and Bill decides to order pizza. John's parents don't use Alexa to order pizza."];
				//level1 explanation
				var exp1 = ["", "", "", "", "", ""];
				//level2 explanation
				var exp2 = ["", "", "", "", "", ""];
				//level3 explanation
				var exp3 = ["", "", "", "", "", ""];
				//level1 order 
				var order1 = [3,3,2, 1,2,3]; // 3 = green; 2 = yellow; 1 = red
				//level2 order 
				var order2 = [1,2,1,3,3,2];
				//level3 order
				var order3 = [2,1,3,2,1,1];
			/* document.getElementById("next").onclick = function () {
				i++;
				//document.getElementById("scenario").innerHTML = scenario[i];
				if(flag == 1) {
				alert ("you have selected red -- explanation of why good or bad");
				//image.src = "trafficlights.jpg";
				test();
				}
				if(flag == 2) {
				alert ("you have selected yellow -- explanation of why good or bad");
				//image.src = "trafficlights.jpg";
				test();
				}
				if(flag == 3) {
				alert ("you have selected green -- explanation of why good or bad");
				//image.src = "trafficlights.jpg";
				test();
				}
				if(document.getElementById("next").innerHTML == "Submit and Get Flag" ) { 
					document.getElementById("main").style.display = "none";
					document.getElementById("footer").style.display = "none";
					document.getElementById("nextbutton").style.display = "none";
					document.getElementById("finalmsg").style.display = "block";
				}
				// for last scenario, click submit and save data
			}; */
		var flag = 0;
		var image = document.getElementById('lights'); 
			function changecolorred()  {
			
			if (image.src.match("trafficlights") || image.src.match("yellowonlight") || image.src.match("greenonlight")) 
					image.src = "redonlight.jpg";
					flag = 1;
					//alert ("you have selected red -- explanation of why good or bad");
					if(dropDown.value == "one") {
						if(flag == order1[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "two") {
						if(flag == order2[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "three") {
						if(flag == order3[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
			}
			function changecoloryellow()  {
			//var image = document.getElementById('lights'); 
			if (image.src.match("trafficlights") || image.src.match("redonlight") || image.src.match("greenonlight")) 
					image.src = "yellowonlight.jpg";
					flag = 2;
					//alert ("you have selected yellow -- explanation of why good or bad");
					if(dropDown.value == "one") {
						if(flag == order1[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "two") {
						if(flag == order2[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "three") {
						if(flag == order3[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
			}
			function changecolorgreen()  {
			//var image = document.getElementById('lights'); 
			if (image.src.match("trafficlights") || image.src.match("redonlight") || image.src.match("yellowonlight")) 
					image.src = "greenonlight.jpg";
					flag = 3;
					//alert ("you have selected green -- explanation of why good or bad");
					if(dropDown.value == "one") {
						if(flag == order1[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "two") {
						if(flag == order2[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
					if(dropDown.value == "three") {
						if(flag == order3[i]) {
							alert("Correct!");
						}
						else {
							alert("Incorrect. Try again.");
						}
					}
			}
			function test() {
				 $('input[name="colors"]').attr('checked',false);
				 $('input[name="device"]').attr('checked',false);
				 $('input[name="permission"]').attr('checked',false);
				if(dropDown.value == "default"){ 
				   //default
				   alert("Please select a level");
				 } else if(dropDown.value == "one"){
				   //easy order
				   if (i < level1.length) { 
						document.getElementById("scenario").innerHTML = level1[i];
						document.getElementById("item").innerHTML = scenario[i];
				   }
				   else { 
						document.getElementById("next").innerHTML = "Submit and Get Flag";
				   }
				   //flag = 1; 
				   //alert("game 1");
				  } else if(dropDown.value == "two"){
				   //medium order
				   //flag = 2;
				   //alert("game 2");
				   if (i < level2.length) { 
						document.getElementById("scenario").innerHTML = level2[i];
						document.getElementById("item").innerHTML = scenario[i];
				   }
				   else { 
						document.getElementById("next").innerHTML = "Submit and Get Flag";
				   }
				  } else if(dropDown.value == "three"){
				   //difficult order
				   //flag = 3; 
				   //alert("game 3");
				   if (i < level3.length) { 
						document.getElementById("scenario").innerHTML = level3[i];
						document.getElementById("item").innerHTML = scenario[i];
				   }
				   else { 
						document.getElementById("next").innerHTML = "Submit and Get Flag";
				   }
				}
			}

document.getElementById("next").onclick = function (){
        var check = true;
        $("input:radio").each(function(){
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                check = false;
            }
        });
        
        if(check){
            console.log('One radio in each group is checked.');
				i++;
				//document.getElementById("scenario").innerHTML = scenario[i];
				if(flag == 1) {
				//alert ("you have selected red -- explanation of why good or bad");
				image.src = "trafficlights.jpg";
				//$("input[name="+name+"]").attr('checked',false); //reset buttons
				test();
				}
				if(flag == 2) {
				//alert ("you have selected yellow -- explanation of why good or bad");
				image.src = "trafficlights.jpg";
				//$("input[name="+name+"]").attr('checked',false);
				test();
				}
				if(flag == 3) {
				//alert ("you have selected green -- explanation of why good or bad");
				image.src = "trafficlights.jpg";
				//$("input[name="+name+"]").attr('checked',false);
				test();
				}
				if(document.getElementById("next").innerHTML == "Submit and Get Flag" ) { 
					document.getElementById("main").style.display = "none";
					document.getElementById("footer").style.display = "none";
					document.getElementById("nextbutton").style.display = "none";
					document.getElementById("finalmsg").style.display = "block";
				}
				// for last scenario, click submit and save data
			
        }else{
            alert('Please select one option in each question.');
        }
};