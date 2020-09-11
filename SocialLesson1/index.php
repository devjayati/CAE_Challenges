<?php
 echo "
<!DOCTYPE html>
<html>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<link rel='stylesheet' type='text/css' href='style.css' />
<title>Social Lesson 1</title>
</head>

<body>
<div id='header'>
	<h1>Social Lesson 1: Social Engineering 101</h1>
</div>
<div id='main'>
	<div id='content'>
	    <p id='scenario'> scenario </p>
		<!--p id='scenario'> Imagine you are a criminal who sneaked into a meeting with a rich celebrity. Your task is to find out the phone password of the celebrity and sell to the highest bidder online. Watch the following video and see if you can shoulder surf the 6 digit pin password to this phone. </p-->  
		<center><div id='kanye'><video style='width:720px;height:540px' controls>
			<source src='social_1_small.mp4' type='video/mp4'>
			Your browser does not support HTML video.
		</video><div></center>
		<center><div id='mike'><img src='sample0.jpg' id='imageinsert' alt='password image'> </div></center>
	</div>
	
	<div id='panel'>
		<!--p id='displaytext'> Enter the 6-digit pincode that the celebrity has: </p--> 
		<p id='displaytext'>Enter the password that you see:</p>
		<input type='text' id='answer' name='answer1' style='padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box;'>
		<hr>
		<button id='checkanswer' class='button' style='background-color: #ff1e00' >Check Your Answer!</button>
		<div>
			<p id = 'displayanswer'> </p>
		</div>
	</div>
	
	<div style='clear: both;' > </div>
</div>

<div id='footer'>
	<!--p> insert back and forward buttons here </p-->
	<!--button id='back' class='button' >Previous</button-->
	<button id='next' class='button' >Next</button>
	<script type='text/javascript' src='imageMapResizer.min.js'></script>
	<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
	<script type='text/javascript'>
	window.onload = function() {
		document.getElementById('kanye').style.display = 'none';
		//document.getElementById('mike').style.display = 'none';
	};
	document.getElementById('checkanswer').onclick = function () {
		if(document.getElementById('answer').value == '000000')
		{
			document.getElementById('displayanswer').innerHTML = '<strong>Correct! </strong> Since we do not have access to the phone, you might be wondering why it is a big deal for his password to be out there. But if he has such a bad phone password, the rest of his passwords for other accounts are probably just as terrible. Since hackers saw that the celebrity does not have strong passwords, they realized he would be an easy target. <strong> Now please click on SUBMIT to get your challenge flag.</strong>';
			
		}
		//else if(document.getElementById('answer').value == 'False' || document.getElementById('answer').value == 'false')
		//{
		//	document.getElementById('displayanswer').innerHTML = '<strong>Correct! </strong> Mike Bloomberg never sent out such a tweet. This was a Bitcoin scam spread on Twitter in July 2020 that targeted the profiles of certain high profile verified Twitter accounts such as Mike Bloomberg, Elon Musk, Bill Gates, and so on. <strong>Now please click on NEXT.</strong>';  
		//}
		//else if(document.getElementById('answer').value == 'True' || document.getElementById('answer').value == 'true')
		//{
			//document.getElementById('displayanswer').innerHTML = '<strong>Incorrect! </strong> Mike Bloomberg never sent out such a tweet. This was a Bitcoin scam spread on Twitter in July 2020 that targeted the profiles of certain high profile verified Twitter accounts such as Mike Bloomberg, Elon Musk, Bill Gates, and so on. <strong>Please type in the correct answer to proceed. </strong>'; 
		//}
		else if(document.getElementById('answer').value == 'nbc')
		{
			document.getElementById('displayanswer').innerHTML = '<strong> Correct! </strong>Now please click on <strong>NEXT.</strong>'; 
		}
		else if(document.getElementById('answer').value == 'w3Lc0m3!HERE')
		{
			document.getElementById('displayanswer').innerHTML = '<strong> Correct! </strong>Now please click on <strong>NEXT.</strong>'; 
		}
		else if(document.getElementById('answer').value == 'Winter14')
		{
			document.getElementById('displayanswer').innerHTML = '<strong> Correct! </strong>Now please click on <strong>NEXT.</strong>'; 
		}
		else if(document.getElementById('answer').value == 'eventhorizon')
		{
			document.getElementById('displayanswer').innerHTML = '<strong> Correct! </strong>Now please click on </strong>NEXT.</strong>'; 
		}
		else 
		{
			document.getElementById('displayanswer').innerHTML = '<strong>Incorrect.</strong> Look at the visual carefully. Answers are case-sensitive.';	
		}
	}
	var gameimages = ['sample0.jpg', 'sample2.jpg', 'BBC.jpg', 'sample1.jpg'];
	document.getElementById('next').onclick = function () {
			if(document.getElementById('answer').value == '000000'){
				location.replace('../SocialLesson1/flag.html');
			}
			//else if(document.getElementById('answer').value == 'False' || document.getElementById('answer').value == 'false')
			//{
			//	document.getElementById('scenario').innerHTML = 'scenario';
			//	document.getElementById('answer').value = '';
			//	document.getElementById('displayanswer').innerHTML = '';
			//	document.getElementById('displaytext').innerHTML = 'Enter the password that you see:';
			//	document.getElementById('next').innerHTML = 'Next';
			//	$('#kanye').hide();
			//	var image = document.getElementById('imageinsert'); 
			//	if (image.src.match('tweet.jpg')){
			//		image.src = gameimages[0];
			//	}
			//	document.getElementById('mike').style.display = 'inline';
				//location.replace('../SocialLesson1/flag.html');
			//}
			else if(document.getElementById('answer').value == 'nbc')
			{
				document.getElementById('scenario').innerHTML = 'scenario';
				document.getElementById('answer').value = '';
				document.getElementById('displayanswer').innerHTML = '';
				document.getElementById('displaytext').innerHTML = 'Enter the password that you see:';
				document.getElementById('next').innerHTML = 'Next';
				$('#kanye').hide();
				var image = document.getElementById('imageinsert'); 
				if (image.src.match(gameimages[0])){
					image.src = gameimages[1];
				}
				document.getElementById('mike').style.display = 'inline'; 
			}
			else if(document.getElementById('answer').value == 'Winter14')
			{
				document.getElementById('scenario').innerHTML = 'scenario';
				document.getElementById('answer').value = '';
				document.getElementById('displayanswer').innerHTML = '';
				document.getElementById('displaytext').innerHTML = 'Enter the password that you see:';
				document.getElementById('next').innerHTML = 'Next';
				$('#kanye').hide();
				var image = document.getElementById('imageinsert'); 
				if (image.src.match(gameimages[1])){
					image.src = gameimages[2];
				}
				document.getElementById('mike').style.display = 'inline';
			}
			else if(document.getElementById('answer').value == 'eventhorizon')
			{
				document.getElementById('scenario').innerHTML = 'scenario';
				document.getElementById('answer').value = '';
				document.getElementById('displayanswer').innerHTML = '';
				document.getElementById('displaytext').innerHTML = 'Enter the password that you see:';
				document.getElementById('next').innerHTML = 'Next';
				$('#kanye').hide();
				var image = document.getElementById('imageinsert'); 
				if (image.src.match(gameimages[2])){
					image.src = gameimages[3];
				}
				document.getElementById('mike').style.display = 'inline';
			}
			else if(document.getElementById('answer').value == 'w3Lc0m3!HERE')
			{
				//location.replace('../SocialLesson1/flag.html');
				document.getElementById('mike').style.display = 'none';
				document.getElementById('scenario').innerHTML = 'Imagine you are a criminal who sneaked into a meeting with a rich celebrity. Your task is to find out the phone password of the celebrity and sell to the highest bidder online. Watch the following video and see if you can shoulder surf the 6 digit pin password to this phone.';
				document.getElementById('displaytext').innerHTML = 'Enter the 6-digit pincode that the celebrity has:';
				document.getElementById('answer').value = '';
				document.getElementById('displayanswer').innerHTML = '';
				document.getElementById('next').innerHTML = 'Submit';
				$('#kanye').show();
				//document.getElementById('mike').style.display = 'inline';
			}
			else
			{
				alert('Missing answer');
			}
	}
			imageMapResize();
</script>
	<p> © 2020. Developed by <a href='http://usablesecurity.net/'>HATS Indiana University</a> under the Creative Commons license.</p> 
</div>
</body>
</html>";
?>