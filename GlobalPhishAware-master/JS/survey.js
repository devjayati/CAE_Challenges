/**
 * Created by Tom on 3/25/2015.
 */

var questions;
var which_set;

//function processReload(event){


//};

//window.addEventListener("beforeunload", processReload, false);
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

function popup(url)
{
    var width  = screen.width;
    var height = screen.height;
    var left   = (screen.width  - width)/2;
    var top    = (screen.height - height)/2;
    var params = 'width='+width+', height='+height;
    params += ', top='+top+', left='+left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=yes';
    params += ', status=no';
    params += ', toolbar=no';
    newwin=window.open(url,'experimentWindow', params);
    var timer = setInterval(function() {
        if(newwin.closed) {
            clearInterval(timer);
            runSurvey();
        }
    }, 100);
    if (window.focus) {newwin.focus();}
}

$(document).ready(function(){

	blockTurkForward();
	window.history.forward(-1);
	var experimentCondition = $('#experimentCondition').val();
	var participantType = $('#participantType').val();
	var docTitle = document.title;
	switch(docTitle){
	case "Log in Not Log in Study Description":
		prepValidationInstructions();
		//questions = participantValidationQuestions[participantType].concat(validationQuestions[participantType][experimentCondition]);
		questions = participantValidationQuestions[participantType];
		which_set = "validation";
		break;
	case "Study Description":
	        prepExperimentInstructions();
        	questions = cultureQuestions.concat(skill_questions);
        	which_set = "skills";
		break;
	case "Log in Not Log in Consent Form":
	        prepSisAcknowledged();
			prepValidationInstructions();
			questions = participantValidationQuestions[participantType];
			//questions = participantValidationQuestions[participantType].concat(validationQuestions[participantType][experimentCondition]);
			//questions = participantQuestions[participantType];
			which_set = "validation";
		break;
	default:
		console.log("Unknown");
	}
});

function blockTurkForward(){
    $("#submitButton").hide();
    $("#sis_form").keypress(function(e){
        if (e.which == 13)
        {
            return false;
        }
    });
    !window.debug && $("#completedquestions").hide();
}

function prepSisAcknowledged(){
    $("#jscriptwarning").hide();
    $("#sis").show();
    $("#sisacknowledged").click(function(){
        // TODO: verify that they have accepted the job
        if ($('#assignmentId').val()=='ASSIGNMENT_ID_NOT_AVAILABLE'){
            alert('You must accept the HIT before continuing.');
            return false;
        }
        $("#sis").hide();
        runSurvey();
        return false;
    });
}

function prepValidationInstructions(){
	$("#jscriptwarning").hide();
    	$("#sis").show();
        $("#checkUnderstanding").click(function(){
        // TODO: verify that they have accepted the job
        if ($('#assignmentId').val()=='ASSIGNMENT_ID_NOT_AVAILABLE'){
            alert('You must accept the HIT before continuing.');
            return false;
        }
	$("#sis").hide();
        runSurvey();
        return false;
    });
}


function prepExperimentInstructions(){
    $("#jscriptwarning").hide();
    $("#sis").show();
    //$("#beginExperiment").click(function(){
        // TODO: verify that they have accepted the job
    //    if ($('#assignmentId').val()=='ASSIGNMENT_ID_NOT_AVAILABLE'){
    //        alert('You must accept the HIT before continuing.');
    //        return false;
    //    }
    //    $("#sis").hide();
    //    popup("experiment.php");
    //    $("#question").html("<h3>Please leave this window open while completing the site tasks. Closing or reloading will invalidate the results and you will not get paid.</h3>").show();
    //    return false;
    //});
}

function runSurvey(){
    $("#sis").hide();
    $("#completedquestions").append("<h1>COMPLETED QUESTIONS</h1>");
    setupQuestion(0);
    $("#navigation").html("<hr><button id='nextbutton' style='background-color: #6B8E23;border: none;color: white;text-align: center;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;padding: 12px 28px;'>Continue</button>");
    $("#nextbutton").click(function(){
        nextQuestion();
        return false;
    });
}

function showFinish(){
	switch(which_set){
		case 'skills':
		$("#surveyResults").submit();
		break;
		case 'sis':
		$("#sis_form").submit();
		break;
		case 'validation':
		console.log("HERE");
		$.post('../GlobalPhishAware-master/PHP/dataReceiver.php', $("#surveyResults").serialize());
		$("#sis").hide();
		popup("../GlobalPhishAware-master/PHP/experiment.php");
		$("#question").html("<h3>Please leave this window open while completing the site tasks. Closing or reloading this page will invalidate the results and you will not get paid.</h3>").show();
		questions = cultureQuestions.concat(skill_questions);
                which_set = "skills";
		break;
		default:
		break;
	}
}

function setupQuestion(question){
    window.currentQuestion=question;
    question=questions[question];
    if (typeof question.question == 'undefined'){
        if (window.surveypath=='benefit'){
            question.question=question.question_ben;
        } else {
            question.question=question.question_risk;
        }
    }
    $("#question").hide();
    $("#question").html('<h3>'+question.question+'</h3>').show();

    switch (question.type)
    {
        case 'checkboxmatrix':
            buildCheckboxMatrix(question);
            break;
        case 'checkall':
            buildCheckAll(question);
            break;
        case 'matrixrank':
            buildMatrixRank(question);
            break;
        case 'dimensionalrank':
            buildDimensionalRank(question);
            break;
        case 'freeformint':
            buildFreeFormInt(question);
            break;
        case 'freeCode':
            buildCode(question);
            break;
        case 'freeform':
            buildFreeForm(question);
            break;
        case 'radiowithother':
            buildRadioWithOther(question);
            break;
        case 'radio':
            buildRadio(question);
            break;
        case 'radiowithform':
            buildRadioWithForm(question);
            break;
        case 'agreementscale':
            buildAgreementScale(question);
            break;
		case 'countrySelect':
			buildCountrySelect(question);
			break;
        default:
            alert('uncrecognized question type '+question.type);
    }
    window.currentQuestionStartTime = new Date().getTime();
}

function buildAgreementScale(question){
    var html='<table>';

    for (i in question.options){
		var name = clean(question.options[i]);
		var outputName = name.substr(0,name.indexOf('.'));
		var min = question.min;
		var max = question.scale;
		var step = question.step;
		var defaultVal = question.def;
        var questionHTML = "<tr><td>"+question.options[i]+
		"</td><td>"+min+"</td><td><input type='range' min='"+min+"' max='"+max+"' step='"+step+"' value='"+defaultVal+"'name='"+name+"'onchange='"+outputName+"Output.value = value'/></td><td>"+max+"</td></tr><tr><td colspan='4' style='text-align:center'><output id='"+outputName+"Output'>"+defaultVal+"</output></td></tr>";
		html += questionHTML;
    }
	html += '</table>';
    $("#question").append(html);
}

function buildRadio(question){
    var html='';
    for (i in question.options){
        html+="<input type='radio' name='"+clean(question.question)+"' value='"+clean(question.options[i])+"'/> "+question.options[i]+'<br>';
    }
    $("#question").append(html);
}

function buildRadioWithOther(question){
    var html='';
    for (i in question.options){
        html+="<input type='radio' name='"+clean(question.question)+"' value='"+clean(question.options[i])+"'/> "+question.options[i]+'<br>';
    }
    html+="<input type='radio' name='"+clean(question.question)+"' value='other'/> Other (please specify):";
    html+="<input type='text' name='"+clean(question.question)+"_other' value=''/><br>";
    $("#question").append(html);
}

function buildRadioWithForm(question){
    var html='';
    for (i in question.options){
        html+="<input type='radio' name='"+clean(question.question)+"' value='"+clean(question.options[i])+"'/> "+question.options[i]+'<br>';
    }
    for(i in question.formText){
        html+=question.formText[i]+" <input type='text' name='"+clean(question.question)+'_'+clean(question.formText[i])+"' value=''/><br>";
    }
    //html+= name='"'+clean(question.question)+"_"+clean(question.formText[i])+'"';
    $("#question").append(html);
}

function buildFreeFormInt(question){
    var html='<br><input type="text" name="'+clean(question.question)+'" value="">';
    $("#question").append(html);
}
function buildCode(question){
    var html='<br><input type="text" name="'+clean(question.question)+'" value="">';
    $("#question").append(html);
}

function buildFreeForm(question){
    var html='<br><input type="text" name="'+clean(question.question)+'" value="">';
    $("#question").append(html);
}

function buildDimensionalRank(question){
    var html='';
    for (i in question.dimensions){
        html+='<b>'+question.dimensions[i].title+'</b>: '+question.dimensions[i].explanation+'<br>';
    }
    html+='<br><table border="1"><tr><td><i>Information</i></td>';
    for (i in question.dimensions){
        html+='<td><b>'+question.dimensions[i].title+'</b></td>';
    }
    html+='</tr>';
    for (i in question.rows){
        html+='<tr><td>'+question.rows[i]+'</td>';
        for (j in question.dimensions){
            html+='<td><input type="text" name="'+clean(question.prefix+'_'+question.rows[i]+'_'+question.dimensions[j].title)+'" value=""/></td>';
        }
        html+='</tr>';
    }
    html+='</table>';
    $("#question").append(html);
}

function buildMatrixRank(question){
    var html='<table border="1"><tr><td><i>Information</i></td>';
    for (i in question.columns){
        html+='<td><b>'+question.columns[i]+'</b></td>';
    }
    html+='</tr>';
    for (i in question.rows){
        html+='<tr><td>'+question.rows[i]+'</td>';
        for (j in question.columns){
            html+='<td><input type="text" name="'+clean(question.prefix+'_'+question.rows[i]+'_'+question.columns[j])+'" value=""/></td>';
        }
        html+='</tr>';
    }
    html+='</table>';
    $("#question").append(html);
}

function buildCheckboxMatrix(question){
    var html='<table border="1"><tr><td><i>Information</i></td>';
    for (i in question.columns){
        html+='<td><b>'+question.columns[i]+'</b></td>';
    }
    html+='</tr>';
    for (i in question.rows){
        html+='<tr><td>'+question.rows[i]+'</td>';
        for (j in question.columns){
            html+='<td><input type="checkbox" name="'+clean(question.prefix+'_'+question.rows[i]+'_'+question.columns[j])+'" value="yes"/></td>';
        }
        html+='</tr>';
    }
    html+='</table>';
    $("#question").append(html);
}

function buildCheckAll(question){
    var html='';
    for (i in question.options){
        html+='<input type="checkbox" name="'+clean(question.prefix+'_'+question.options[i])+'" value="yes"/>'+question.options[i]+'<br/>';
    }
    $("#question").append(html);
}

function buildCountrySelect(question){
	var html='';
	if(question.multiple='TRUE'){
	html+='<select multiple name="'+clean(question.question)+'">'+countriesHTML+'</select>';
	}
	else{
	html+='<select name="'+clean(question.question)+'">'+countriesHTML+'</select>';
	}
	$("#question").append(html);
}

window.debug=false;

function nextQuestion(){
    if (!verifyQuestion(window.currentQuestion) && !window.debug){
        $("#error").fadeIn();
        return false;
    }
    $("#error").hide();
    var endTime = new Date().getTime();
    var responseTime = endTime - window.currentQuestionStartTime;
    var responseTimeName = clean(window.questions[window.currentQuestion].question)+"ResponseTime";
    console.log(responseTimeName);
    $("#question").append('<input type="hidden" name="'+responseTimeName+'" value="'+responseTime+'">');

    window.currentQuestion++;
    var ref = $("#question").contents();

    $("#completedquestions").append(ref);
    if (window.questions.length<=window.currentQuestion){
        //submit agreement
        //open sites
        //please wait
        $("#question").html("<h2>Challenge complete! w3Lc0m3!HERE is your completion flag.</h2>");
        convertCheckboxesToHiddens();
        $("#nextbutton").hide();
        showFinish();
    } else {
        setupQuestion(window.currentQuestion);
    }
    return false;
}

function convertCheckboxesToHiddens(){
    $('input[type=checkbox]',$("#completedquestions")).each(function(){
        var newhtml="<input type='text' name='"+$(this).attr('name')+"' value='"+($(this).is(':checked')?'checked':'unchecked')+"'/>";
        $(this).replaceWith(newhtml);
    });
}

function verifyQuestion(questionindex){
    var question=window.questions[questionindex];
    switch (question.type)
    {
        case 'checkboxmatrix':
            return true;
            break;
        case 'checkall':
            return verifyCheckAll(question);
            break;
        case 'matrixrank':
            return verifyMatrixRank(question);
            break;
        case 'dimensionalrank':
            return verifyDimensionalRank(question);
            break;
        case 'freeformint':
            return verifyFreeFormInt(question);
            break;
        case 'freeCode':
            return verifyFreeCode(question);
            break;
        case 'freeform':
            return verifyFreeForm(question);
            break;
        case 'radiowithother':
            return verifyRadioWithOther(question);
            break;
        case 'radio':
            return verifyRadio(question);
            break;
        case 'radiowithform':
            return verifyRadioWithForm(question);
            break;
        case 'agreementscale':
            return verifyAgreementScale(question);
            break;
		case 'countrySelect':
	    	return verifyCountrySelect(question);
	    	break;
        default:
            alert('verify: uncrecognized question type '+question.type);
            return false;
    }
}

function hideQuestion(response){
	if(response == 'hide'){
		$('input').remove();
		$('#nextbutton').remove();
		$("#question").hide();
	}
}

function verifyCheckAll(question){
    var error=false;
    if (typeof question.mustbechecked != 'undefined'){
        for (i in question.mustbechecked){
            var name=clean(question.prefix+'_'+question.mustbechecked[i]);
            var ischecked=$('input[name="'+name+'"]',$("#question")).is(':checked');
            if (!ischecked){
                $("#error").html('<h2><font style="color:red;">'+question.rejecterror+'</font></h2>');
                hideQuestion(question.response);
                return false;
            }
        }
        for (i in question.mustnotbechecked){
            var name=clean(question.prefix+'_'+question.mustnotbechecked[i]);
            var ischecked=$('input[name="'+name+'"]',$("#question")).is(':checked');
            if (ischecked){
                $("#error").html('<h2><font style="color:red;">'+question.rejecterror+'</font></h2>');
                hideQuestion(question.response);
                return false;
            }
        }
    }
    return !error;
}

function verifyAgreementScale(question){
    var error=false;
    for (i in question.options){
        var name=clean(question.options[i]);
        var value=$('input[name="'+name+'"]',$("#question")).val().trim();
        if ((!$.isNumeric(value)|| parseFloat(value)>question.scale)){
            error=true;
            $('input[name="'+name+'"]',$("#question")).addClass('error');
        } else {
            $('input[name="'+name+'"]',$("#question")).removeClass('error');
        }
    }
    $("#error").html('<font style="color:red;">Please fill out each field with your agreement on a scale from 1 to '+question.scale+'</font><hr>');
    return !error;
}

function verifyRadio(question){
    var error=false;
    var name=clean(question.question);
    var selected=$('input[name="'+name+'"]:checked',$("#question"));
    if (selected.length<1){
	$('input[name="'+name+'"]',$("#question")).addClass('error');
    	$("#error").html('<font style="color:red;">Please answer the question.</font><hr>');
	return false;
    }
    if (typeof question.mustbechecked != 'undefined'){
	if(selected.val() != clean(question.mustbechecked)){
		$("#error").html('<h2><font style="color:red;">'+question.rejecterror+'</font></h2>');
		hideQuestion(question.response);
		return false;
	}
    }
    return !error;
}

function verifyRadioWithOther(question){
    var error=true;
    var name=clean(question.question);
    var selected=$('input[name="'+name+'"]:checked',$("#question"));
    if (selected.length>0){
        if (selected.val()=='other'){
            if ($('input[name="'+name+'_other"]',$("#question")).val().trim()!=''){
                error=false;
            }
        } else {
            error=false;
        }
    }
    $("#error").html('<font style="color:red;">Please answer the question and fill out the details if you selected "other".</font><hr>');
    return !error;

}

function verifyRadioWithForm(question){
    var error=false;
    var name=clean(question.question);
    var test='';
    var selected=$('input[name="'+name+'"]:checked',$("#question"));
    if (selected.length>0){
        if (selected.val().substring(0,3) == question.checkVal){
            for(i in question.formText){
                if ($('input[name="'+name+'_'+clean(question.formText[i])+'"]',$("#question")).val().trim()==''){
                    $('input[name="'+name+'_'+clean(question.formText[i])+'"]',$("#question")).addClass('error');
                    error=true;
                }
                else{
                    $('input[name="'+name+'_'+clean(question.formText[i])+'"]',$("#question")).removeClass('error');
                }
            }
        } else {
            error=false;
        }
    }
    $("#error").html('<font style="color:red;">Please make sure to fill out the additional details if you selected '+question.checkVal+'.</font><hr>');
    return !error;
}

function verifyFreeForm(question){
    var error=false;
    var name=clean(question.question);
    var value=$('input[name="'+name+'"]',$("#question")).val().trim();
    $("#error").html('<font style="color:red;">Please answer the question.</font><hr>');
    return (value!='');
}

function verifyFreeFormInt(question){
    var error=false;
    var name=clean(question.question);
    var value=$('input[name="'+name+'"]',$("#question")).val().trim();

        if (!isNormalInteger(value)){
            error=true;
            $('input[name="'+name+'"]',$("#question")).addClass('error');
	    $("#error").html('<font style="color:red;">Please answer the question with a number.</font><hr>');
        }
        else {
            $('input[name="'+name+'"]',$("#question")).removeClass('error');
            if (parseInt(value) < question.minimum){
                $('input').remove();
                $('#nextbutton').remove();
                $("#error").html('<h2><font style="color:red;">'+question.rejecterror+'</font></h2>');
                hideQuestion(question.response);
                return false;
            }

    	}
    return !error;
}

function verifyFreeCode(question){
    var error=false;
    var name=clean(question.question);
    var value=$('input[name="'+name+'"]',$("#question")).val().trim();

        if (!isNormalInteger(value)){
            error=true;
            $('input[name="'+name+'"]',$("#question")).addClass('error');
	    $("#error").html('<font style="color:red;">Please answer the question with a number.</font><hr>');
        }
    if (!value.match('117856')&&!value.match('119032')&&
        !value.match('115656')&&!value.match('113432')&&
       !value.match('105675')&&!value.match('107856')&&
        !value.match('109932')&&!value.match('105675')&&
        !value.match('507856')&&!value.match('503432')&&
        !value.match('505675')&&!value.match('517856')&&
       !value.match('519932')&&!value.match('515675')&&
        !value.match('217656')&&!value.match('219087')&&
        !value.match('217865')&&!value.match('213467')&&
        !value.match('203432')&&!value.match('205675')&&
       !value.match('217856')&&!value.match('219932')&&
        !value.match('317656')&&!value.match('319032')&&
        !value.match('317856')&&!value.match('313432')&&
        !value.match('305675')&&!value.match('307856')&&
       !value.match('309932')&&!value.match('305675')&&
        !value.match('302345')&&!value.match('304325')&&
        !value.match('907653')
       ){
                     error=true;
            $('input[name="'+name+'"]',$("#question")).addClass('error');
	    $("#error").html('<font style="color:red;">Please enter correct code.</font><hr>');
}

        else {
            $('input[name="'+name+'"]',$("#question")).removeClass('error');
            if (parseInt(value) < question.minimum){
                $('input').remove();
                $('#nextbutton').remove();
                $("#error").html('<h2><font style="color:red;">'+question.rejecterror+'</font></h2>');
                hideQuestion(question.response);
                return false;
            }

    	}
    return !error;
}

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function verifyDimensionalRank(question){
    var error=false;

    for (i in question.rows){
        for (j in question.dimensions){
            var name=clean(question.prefix+'_'+question.rows[i]+'_'+question.dimensions[j].title);
            var value=$('input[name="'+name+'"]',$("#question")).val().trim();
            if (value!==''){
                if (!isNumber(value) || parseFloat(value)<1 || parseFloat(value)>7){
                    error=true;
                    $('input[name="'+name+'"]',$("#question")).addClass('error');
                } else {
                    $('input[name="'+name+'"]',$("#question")).removeClass('error');
                }
            }
        }
    }
    $("#error").html('<font style="color:red;">Please fill out every field and verify that each number is between 1 and 7.</font><hr>');
    return !error;
}


function verifyMatrixRank(question){
    var error=false;
    var min=100;
    for (i in question.rows){
        for (j in question.columns){
            var name=clean(question.prefix+'_'+question.rows[i]+'_'+question.columns[j]);
            var value=$('input[name="'+name+'"]',$("#question")).val().trim();
            if (value!==''){
                if (!isNumber(value) || parseFloat(value)<10){
                    error=true;
                    $('input[name="'+name+'"]',$("#question")).addClass('error');
                } else {
                    $('input[name="'+name+'"]',$("#question")).removeClass('error');
                    value = parseFloat(value);
                    if (value<min){
                        min=value;
                    }
                }
            }
        }
    }
    if (min>10){
        error=true;
    }
    $("#error").html('<font style="color:red;">Please fill out every field and verify that each number is 10 or higher. At least one field must be ranked at 10.</font><hr>');
    return !error;
}

function clean(input){
    var output=input.replace(/ /g,"_");
    output=output.replace(/[^a-zA-Z0-9_.]/g,"");
    return output;
}

function isNumber(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
}


//mturk questions are indexed at 0, iu questions are indexed at 1, 2 invitation based questions. Time questions are indexed at 0, accuracy questions are indexed at 1.
//var participantQuestions = [ 
    // [   
    // {
        // type:'freeform',
        // question:'What is your Mechanical Turk ID?',
        // response: 'hide',
    // },
    // {
        // type:'freeformint',
        // question:'What is your age?',
        // minimum: '18',
	   // response: 'hide',
        // rejecterror:'This study is only for participants age 18 and older. Please return the HIT.'
    // },
    // {
        // type:'checkall',
        // question:'What languages can you read and understand?',
        // prefix:'language',
        // options:[
            // 'English',
            // 'Spanish',
            // 'Chinese',
            // 'French',
            // 'Tagalog',
            // 'Vietnamese',
            // 'Hindi',
            // 'Arabic',
            // 'Korean',
            // 'German'
        // ],
	// response: 'hide',
	// mustbechecked:['English'],
	// rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please return the HIT.'
    // },
    // {
		// type:'radio',
		// question:'Are you a US Citizen?',
		// options:[
			// 'Yes',
			// 'No'
			// ],
        // response: 'hide',
	// mustbechecked:'Yes',
	// rejecterror:'This study is designed for US Citizens. Please return the HIT.'
        
	// }
// ],
 // [

    // {
        // type:'freeformint',
        // question:'What is your age?',
        // minimum: '18',
        // response: 'hide',
        // rejecterror:'This study is only for participants age 18 and older. Please alert the experimenter.'
    // },
    // {
        // type:'checkall',
        // question:'What languages can you read and understand?',
        // prefix:'language',
        // options:[
            // 'English',
            // 'Spanish',
            // 'Chinese',
            // 'French',
            // 'Tagalog',
            // 'Vietnamese',
            // 'Hindi',
            // 'Arabic',
            // 'Korean',
            // 'German'
        // ],
        // response: 'hide',
	// mustbechecked:['English'],
	// rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please alert the experimenter.'
    // },
    // {
		// type:'radio',
		// question:'Do you wish to participate in the research? (We will include your anonymized data in our analysis)',
		// options:[
			// 'Yes',
			// 'No'
			// ],
        // response: 'hide',
	// },
     // {
     // type:'radio',
		// question:'Are you a US Citizen?',
		// options:[
			// 'Yes',
			// 'No'
			// ],
        // response: 'hide',
     // }
// ],
                            
// [
     // {
        // type:'freeCode',
        // question:'What is the code provided to you over email? (if multiple codes are entered, it will reject the response)',
    // },                      

    // {
        // type:'freeformint',
        // question:'What is your age?',
        // minimum: '18',
        // response: 'hide',
        // rejecterror:'This study is only for participants age 18 and older.'
    // },
    // {
        // type:'checkall',
        // question:'What languages can you read and understand?',
        // prefix:'language',
        // options:[
            // 'English',
            // 'Spanish',
            // 'Chinese',
            // 'French',
            // 'Tagalog',
            // 'Vietnamese',
            // 'Hindi',
            // 'Arabic',
            // 'Korean',
            // 'German'
        // ],
        // response: 'hide',
	// mustbechecked:['English'],
	// rejecterror:'It is important that you be able to read and understand the instructions for this experiment.'
    // },
    // {
		// type:'radio',
		// question:'Are you a US Citizen?',
		// options:[
			// 'Yes',
			// 'No'
			// ],
        // response: 'hide',
         // mustbechecked:'Yes',
        // rejecterror:'This study is designed for US Citizens.'
	// }
// ]
// ];

/* var usCitizen = [
{
		type:'radio',
		question:'Are you a US Citizen? (This is not a validation question, but is used to adjust the demographic questions later in the survey)',
		options:[
			'Yes',
			'No'
			]
	}

]

 var usTax = [
	{
		type:'radio',
		question:'Do you file taxes in the US?',
		options:[
			'Yes',
			'No'
			]
	}

] 

var countryTax=[
    {
        type:'freeform',
        question: 'What is your country of tax residence?'
    }
]*/


var countriesHTML =
	'<option value="AF">Afghanistan</option>'+
	'<option value="AX">Åland Islands</option>'+
	'<option value="AL">Albania</option>'+
	'<option value="DZ">Algeria</option>'+
	'<option value="AS">American Samoa</option>'+
	'<option value="AD">Andorra</option>'+
	'<option value="AO">Angola</option>'+
	'<option value="AI">Anguilla</option>'+
	'<option value="AQ">Antarctica</option>'+
	'<option value="AG">Antigua and Barbuda</option>'+
	'<option value="AR">Argentina</option>'+
	'<option value="AM">Armenia</option>'+
	'<option value="AW">Aruba</option>'+
	'<option value="AU">Australia</option>'+
	'<option value="AT">Austria</option>'+
	'<option value="AZ">Azerbaijan</option>'+
	'<option value="BS">Bahamas</option>'+
	'<option value="BH">Bahrain</option>'+
	'<option value="BD">Bangladesh</option>'+
	'<option value="BB">Barbados</option>'+
	'<option value="BY">Belarus</option>'+
	'<option value="BE">Belgium</option>'+
	'<option value="BZ">Belize</option>'+
	'<option value="BJ">Benin</option>'+
	'<option value="BM">Bermuda</option>'+
	'<option value="BT">Bhutan</option>'+
	'<option value="BO">Bolivia, Plurinational State of</option>'+
	'<option value="BQ">Bonaire, Sint Eustatius and Saba</option>'+
	'<option value="BA">Bosnia and Herzegovina</option>'+
	'<option value="BW">Botswana</option>'+
	'<option value="BV">Bouvet Island</option>'+
	'<option value="BR">Brazil</option>'+
	'<option value="IO">British Indian Ocean Territory</option>'+
	'<option value="BN">Brunei Darussalam</option>'+
	'<option value="BG">Bulgaria</option>'+
	'<option value="BF">Burkina Faso</option>'+
	'<option value="BI">Burundi</option>'+
	'<option value="KH">Cambodia</option>'+
	'<option value="CM">Cameroon</option>'+
	'<option value="CA">Canada</option>'+
	'<option value="CV">Cape Verde</option>'+
	'<option value="KY">Cayman Islands</option>'+
	'<option value="CF">Central African Republic</option>'+
	'<option value="TD">Chad</option>'+
	'<option value="CL">Chile</option>'+
	'<option value="CN">China</option>'+
	'<option value="CX">Christmas Island</option>'+
	'<option value="CC">Cocos (Keeling) Islands</option>'+
	'<option value="CO">Colombia</option>'+
	'<option value="KM">Comoros</option>'+
	'<option value="CG">Congo</option>'+
	'<option value="CD">Congo, the Democratic Republic of the</option>'+
	'<option value="CK">Cook Islands</option>'+
	'<option value="CR">Costa Rica</option>'+
	'<option value="CI">Côte d\'Ivoire</option>'+
	'<option value="HR">Croatia</option>'+
	'<option value="CU">Cuba</option>'+
	'<option value="CW">Curaçao</option>'+
	'<option value="CY">Cyprus</option>'+
	'<option value="CZ">Czech Republic</option>'+
	'<option value="DK">Denmark</option>'+
	'<option value="DJ">Djibouti</option>'+
	'<option value="DM">Dominica</option>'+
	'<option value="DO">Dominican Republic</option>'+
	'<option value="EC">Ecuador</option>'+
	'<option value="EG">Egypt</option>'+
	'<option value="SV">El Salvador</option>'+
	'<option value="GQ">Equatorial Guinea</option>'+
	'<option value="ER">Eritrea</option>'+
	'<option value="EE">Estonia</option>'+
	'<option value="ET">Ethiopia</option>'+
	'<option value="FK">Falkland Islands (Malvinas)</option>'+
	'<option value="FO">Faroe Islands</option>'+
	'<option value="FJ">Fiji</option>'+
	'<option value="FI">Finland</option>'+
	'<option value="FR">France</option>'+
	'<option value="GF">French Guiana</option>'+
	'<option value="PF">French Polynesia</option>'+
	'<option value="TF">French Southern Territories</option>'+
	'<option value="GA">Gabon</option>'+
	'<option value="GM">Gambia</option>'+
	'<option value="GE">Georgia</option>'+
	'<option value="DE">Germany</option>'+
	'<option value="GH">Ghana</option>'+
	'<option value="GI">Gibraltar</option>'+
	'<option value="GR">Greece</option>'+
	'<option value="GL">Greenland</option>'+
	'<option value="GD">Grenada</option>'+
	'<option value="GP">Guadeloupe</option>'+
	'<option value="GU">Guam</option>'+
	'<option value="GT">Guatemala</option>'+
	'<option value="GG">Guernsey</option>'+
	'<option value="GN">Guinea</option>'+
	'<option value="GW">Guinea-Bissau</option>'+
	'<option value="GY">Guyana</option>'+
	'<option value="HT">Haiti</option>'+
	'<option value="HM">Heard Island and McDonald Islands</option>'+
	'<option value="VA">Holy See (Vatican City State)</option>'+
	'<option value="HN">Honduras</option>'+
	'<option value="HK">Hong Kong</option>'+
	'<option value="HU">Hungary</option>'+
	'<option value="IS">Iceland</option>'+
	'<option value="IN">India</option>'+
	'<option value="ID">Indonesia</option>'+
	'<option value="IR">Iran, Islamic Republic of</option>'+
	'<option value="IQ">Iraq</option>'+
	'<option value="IE">Ireland</option>'+
	'<option value="IM">Isle of Man</option>'+
	'<option value="IL">Israel</option>'+
	'<option value="IT">Italy</option>'+
	'<option value="JM">Jamaica</option>'+
	'<option value="JP">Japan</option>'+
	'<option value="JE">Jersey</option>'+
	'<option value="JO">Jordan</option>'+
	'<option value="KZ">Kazakhstan</option>'+
	'<option value="KE">Kenya</option>'+
	'<option value="KI">Kiribati</option>'+
	'<option value="KP">Korea, Democratic People\'s Republic of</option>'+
	'<option value="KR">Korea, Republic of</option>'+
	'<option value="KW">Kuwait</option>'+
	'<option value="KG">Kyrgyzstan</option>'+
	'<option value="LA">Lao People\'s Democratic Republic</option>'+
	'<option value="LV">Latvia</option>'+
	'<option value="LB">Lebanon</option>'+
	'<option value="LS">Lesotho</option>'+
	'<option value="LR">Liberia</option>'+
	'<option value="LY">Libya</option>'+
	'<option value="LI">Liechtenstein</option>'+
	'<option value="LT">Lithuania</option>'+
	'<option value="LU">Luxembourg</option>'+
	'<option value="MO">Macao</option>'+
	'<option value="MK">Macedonia, the former Yugoslav Republic of</option>'+
	'<option value="MG">Madagascar</option>'+
	'<option value="MW">Malawi</option>'+
	'<option value="MY">Malaysia</option>'+
	'<option value="MV">Maldives</option>'+
	'<option value="ML">Mali</option>'+
	'<option value="MT">Malta</option>'+
	'<option value="MH">Marshall Islands</option>'+
	'<option value="MQ">Martinique</option>'+
	'<option value="MR">Mauritania</option>'+
	'<option value="MU">Mauritius</option>'+
	'<option value="YT">Mayotte</option>'+
	'<option value="MX">Mexico</option>'+
	'<option value="FM">Micronesia, Federated States of</option>'+
	'<option value="MD">Moldova, Republic of</option>'+
	'<option value="MC">Monaco</option>'+
	'<option value="MN">Mongolia</option>'+
	'<option value="ME">Montenegro</option>'+
	'<option value="MS">Montserrat</option>'+
	'<option value="MA">Morocco</option>'+
	'<option value="MZ">Mozambique</option>'+
	'<option value="MM">Myanmar</option>'+
	'<option value="NA">Namibia</option>'+
	'<option value="NR">Nauru</option>'+
	'<option value="NP">Nepal</option>'+
	'<option value="NL">Netherlands</option>'+
	'<option value="NC">New Caledonia</option>'+
	'<option value="NZ">New Zealand</option>'+
	'<option value="NI">Nicaragua</option>'+
	'<option value="NE">Niger</option>'+
	'<option value="NG">Nigeria</option>'+
	'<option value="NU">Niue</option>'+
	'<option value="NF">Norfolk Island</option>'+
	'<option value="MP">Northern Mariana Islands</option>'+
	'<option value="NO">Norway</option>'+
	'<option value="OM">Oman</option>'+
	'<option value="PK">Pakistan</option>'+
	'<option value="PW">Palau</option>'+
	'<option value="PS">Palestinian Territory, Occupied</option>'+
	'<option value="PA">Panama</option>'+
	'<option value="PG">Papua New Guinea</option>'+
	'<option value="PY">Paraguay</option>'+
	'<option value="PE">Peru</option>'+
	'<option value="PH">Philippines</option>'+
	'<option value="PN">Pitcairn</option>'+
	'<option value="PL">Poland</option>'+
	'<option value="PT">Portugal</option>'+
	'<option value="PR">Puerto Rico</option>'+
	'<option value="QA">Qatar</option>'+
	'<option value="RE">Réunion</option>'+
	'<option value="RO">Romania</option>'+
	'<option value="RU">Russian Federation</option>'+
	'<option value="RW">Rwanda</option>'+
	'<option value="BL">Saint Barthélemy</option>'+
	'<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>'+
	'<option value="KN">Saint Kitts and Nevis</option>'+
	'<option value="LC">Saint Lucia</option>'+
	'<option value="MF">Saint Martin (French part)</option>'+
	'<option value="PM">Saint Pierre and Miquelon</option>'+
	'<option value="VC">Saint Vincent and the Grenadines</option>'+
	'<option value="WS">Samoa</option>'+
	'<option value="SM">San Marino</option>'+
	'<option value="ST">Sao Tome and Principe</option>'+
	'<option value="SA">Saudi Arabia</option>'+
	'<option value="SN">Senegal</option>'+
	'<option value="RS">Serbia</option>'+
	'<option value="SC">Seychelles</option>'+
	'<option value="SL">Sierra Leone</option>'+
	'<option value="SG">Singapore</option>'+
	'<option value="SX">Sint Maarten (Dutch part)</option>'+
	'<option value="SK">Slovakia</option>'+
	'<option value="SI">Slovenia</option>'+
	'<option value="SB">Solomon Islands</option>'+
	'<option value="SO">Somalia</option>'+
	'<option value="ZA">South Africa</option>'+
	'<option value="GS">South Georgia and the South Sandwich Islands</option>'+
	'<option value="SS">South Sudan</option>'+
	'<option value="ES">Spain</option>'+
	'<option value="LK">Sri Lanka</option>'+
	'<option value="SD">Sudan</option>'+
	'<option value="SR">Suriname</option>'+
	'<option value="SJ">Svalbard and Jan Mayen</option>'+
	'<option value="SZ">Swaziland</option>'+
	'<option value="SE">Sweden</option>'+
	'<option value="CH">Switzerland</option>'+
	'<option value="SY">Syrian Arab Republic</option>'+
	'<option value="TW">Taiwan, Province of China</option>'+
	'<option value="TJ">Tajikistan</option>'+
	'<option value="TZ">Tanzania, United Republic of</option>'+
	'<option value="TH">Thailand</option>'+
	'<option value="TL">Timor-Leste</option>'+
	'<option value="TG">Togo</option>'+
	'<option value="TK">Tokelau</option>'+
	'<option value="TO">Tonga</option>'+
	'<option value="TT">Trinidad and Tobago</option>'+
	'<option value="TN">Tunisia</option>'+
	'<option value="TR">Turkey</option>'+
	'<option value="TM">Turkmenistan</option>'+
	'<option value="TC">Turks and Caicos Islands</option>'+
	'<option value="TV">Tuvalu</option>'+
	'<option value="UG">Uganda</option>'+
	'<option value="UA">Ukraine</option>'+
	'<option value="AE">United Arab Emirates</option>'+
	'<option value="GB">United Kingdom</option>'+
	'<option value="US">United States</option>'+
	'<option value="UM">United States Minor Outlying Islands</option>'+
	'<option value="UY">Uruguay</option>'+
	'<option value="UZ">Uzbekistan</option>'+
	'<option value="VU">Vanuatu</option>'+
	'<option value="VE">Venezuela, Bolivarian Republic of</option>'+
	'<option value="VN">Viet Nam</option>'+
	'<option value="VG">Virgin Islands, British</option>'+
	'<option value="VI">Virgin Islands, U.S.</option>'+
	'<option value="WF">Wallis and Futuna</option>'+
	'<option value="EH">Western Sahara</option>'+
	'<option value="YE">Yemen</option>'+
	'<option value="ZM">Zambia</option>'+
	'<option value="ZW">Zimbabwe</option>';


var participantValidationQuestions = [

[
 	{
		type:'radio',
		question:'Refreshing the experiment page will invalidate your results and result in a rejection?',
		options:[
			'True',
			'False'
			],
		mustbechecked:'True',
		rejecterror:'Oh no! You cannot refresh the page. Please restart the challenge.',
		response:'hide'
	},

	{
		type:'radio',
		question:'For the purposes of this study, if you feel the presented website is insecure, what action should you take?',
		options:[
			'Close the window',
			'Find the login button on the simulated page and click it.',
			'Find the back button on the simulated browser and click it.',
			'Reload the experiment',
			'Exit your browser'
			],
		mustbechecked:'Find the back button on the simulated browser and click it.',
		rejecterror:'Oh no! You are supposed to click the back button. Please restart the challenge.',
		response:'hide'
	},

	{
		type:'radio',
		question:'For the purposes of this study, if you feel the presented website is secure, what action should you take?',
		options:[
			'Close the window',
                        'Find the login button on the simulated page and click it.',
                        'Find the back button on the simulated browser and click it.',
                        'Reload the experiment',
                        'Exit your browser'
			],
 		mustbechecked:'Find the login button on the simulated page and click it.',
                rejecterror:'Oh no! You are supposed to click the login button. Please restart the challenge.',
                response:'hide'
        },

]
];

var validationQuestions = [

	[
		[
			{
				type:'radio',
				question:'What is the time penalty for logging into an insecure site?',
				options:[
					'5 seconds',
					'10 seconds',
					'15 seconds',
					'20 seconds',
					'25 seconds',
					'30 seconds'
					],
				mustbechecked:'15 seconds',
				rejecterror:'It is important that you understand the instructions for this experiment. Please return this HIT to avoid a rejection',
				response:'hide'
			}
		],
		[
			{
				type:'radio',
				question:'What is the penalty for logging into an insecure site?',
				options:[
					'$0.50',
					'$0.67',
					'$0.75',
					'$1.00',
					'$1.25',
					'$1.33'
					],
				mustbechecked:'$0.67',
				rejecterror:'It is important that you understand the instructions for this experiment. Please return this HIT to avoid a rejection',
				response:'hide'
			}
		]
	],
	[
		[
			{
                                type:'radio',
                                question:'What is the time penalty for logging into an insecure site?',
                                options:[
                                        '5 seconds',
                                        '10 seconds',
                                        '15 seconds',
                                        '20 seconds',
                                        '25 seconds',
                                        '30 seconds'
                                        ],
                                mustbechecked:'15 seconds',
                                rejecterror:'It is important that you understand the instructions for this experiment. Please alert the experimenter so they can review the instructions with you.',
                        }
		],

		[
			{
                                type:'radio',
                                question:'What is the penalty for logging into an insecure site?',
                                options:[
                                        '$0.50',
                                        '$0.67',
                                        '$0.75',
                                        '$1.00',
                                        '$1.25',
                                        '$1.33'
                                        ],
                                mustbechecked:'$0.67',
                                rejecterror:'It is important that you understand the instructions for this experiment. Please alert the experimenter so they can review the instructions with you.',

                        }
		]
	],
    [
		[
			{
				type:'radio',
				question:'What is the time penalty for logging into an insecure site?',
				options:[
					'5 seconds',
					'10 seconds',
					'15 seconds',
					'20 seconds',
					'25 seconds',
					'30 seconds'
					],
				mustbechecked:'15 seconds',
				rejecterror:'It is important that you understand the instructions for this experiment.',
				response:'hide'
			}
		],
		[
			{
				type:'radio',
				question:'What is the penalty for logging into an insecure site?',
				options:[
					'$0.50',
					'$0.67',
					'$0.75',
					'$1.00',
					'$1.25',
					'$1.33'
					],
				mustbechecked:'$0.67',
				rejecterror:'It is important that you understand the instructions for this experiment.',
				response:'hide'
			}
		]
	]

];

var cultureQuestions = [
    {
        type:'radio',
				question:'Was this challenge fun?',
				options:[
					'Yeah!',
					'Nope!',
					]
    }
];

var skill_questions = [


];
