$(function(){
<<<<<<< HEAD
	var answers = [];
	var answerId = 0;
	var details = [];
<<<<<<< HEAD
	var answerModel = {
		init:function(){
			var questions = JSON.parse(localStorage.questions);
		var currentquestionid = localStorage.currentQuestionId;
		var question = questions[parseInt(currentquestionid)-1];
			console.log(question.author);
		var answersArray = question.answers;
			if(answersArray.length != 0) {
				answersArray.forEach(function (i) {

					details[i].id = answersArray[i].id;
					details[i].questionId = localStorage.answers.questionId;
					details[i].author = localStorage.answers.author;
					details[i].text = localStorage.answers.text;
					details[i].timestamp = localStorage.answers.timestamp;
				});
			}


		},
		addAnswer:function(answer){
			var a = [];
			if(!localStorage.answers==="")
				{a=JSON.parse(localStorage.answers);}
			a.push(answer);
			localStorage.answers=JSON.stringify(a);
=======
	var questions = [];
	localStorage.author = "Karan Tankshali";
	var ansArray = [];
	var answersArray = [];
	var currentquestionid = 0;
	var question = "";
	var answerModel = {
		init:function(){
		questions = JSON.parse(localStorage.questions);
		
		currentquestionid = localStorage.currentQuestionId;
		//console.log(currentquestionid);
		question = questions[parseInt(currentquestionid)-1];
		console.log(question.answers);
		answersArray = question.answers;

		},
		addAnswer:function(answer){
			//var a = [];
			//if(!question.answers==="")
			//	{a=JSON.parse(question.answers);}
			//a.push(answer);
			if (!question.answers==undefined)
                answers = JSON.parse(question.answers);
            //console.log(answers,"before");
            answers.push(answer);
            //console.log(answers);
			
            question.answers = JSON.stringify(answers);
            var p = JSON.parse(localStorage.questions);
            p[currentquestionid-1].answers.push(answer);
            localStorage.questions = JSON.stringify(p);
			//ocalStorage.answers=JSON.stringify(a);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
	
	//var answersArray = [];
	
var answerModel = {
		answers : [],
		nextAnswerId : 0,
		currentQuestionId : 0,
		question : "",
		answersArray:[],
		hasVotedUp:[],	//0th index for question
		hasVotedDown:[],	
		init:function(){
			if(!localStorage.author)
	    		localStorage.author = "Anonynous";
		
			questions = JSON.parse(localStorage.questions);
			
			answerModel.currentQuestionId = localStorage.currentQuestionId;
			
			answerModel.question = questions[parseInt(answerModel.currentQuestionId)-1];
			
			answerModel.answersArray = answerModel.question.answers;

		},
		addAnswer:function(answer){
			if (!answerModel.question.answers)
            {    
            	answeerModel.answers = JSON.parse(answerModel.question.answers);
            }
            answerModel.answers.push(answer);
            answerModel.question.answers = JSON.stringify(answerModel.answers);
            var tempQuestions = JSON.parse(localStorage.questions);
            tempQuestions[answerModel.currentQuestionId-1].answers.push(answer);
            localStorage.questions = JSON.stringify(tempQuestions);
		},
		getQuestiontitle:function()
		{
			return answerModel.question.title;
		},
		getQuestionVotes:function()
		{
			return answerModel.question.votes;	
		},
		getText:function()
		{
			return answerModel.question.text;
		},
		getQuestionPostingTime:function()
		{
			// console.log("ohh",Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time));
			return Date.parse(answerModel.question.time);
		},
		getAsker:function()
		{
		 	return answerModel.question.author;
		},
		getTags:function()
		{
			return answerModel.question.tags;
		},
		changeCount:function(index,change)
		{
			answerModel.answersArray[index-1].votes += change;
			var tempQuestions = JSON.parse(localStorage.questions);
			tempQuestions[parseInt(answerModel.currentQuestionId)-1].answers[index-1].votes = answerModel.answersArray[index-1].votes;
			localStorage.questions = JSON.stringify(tempQuestions);
		},
		changeQuestionCount:function(change)
		{
			answerModel.question.votes +=change;
			var tempQuestions = JSON.parse(localStorage.questions);
			tempQuestions[parseInt(localStorage.currentQuestionId)-1].votes += change;
			localStorage.questions = JSON.stringify(tempQuestions);
			
		},
		getAuthor:function()
		{
			return localStorage.author;
		},
		getCurrentQuestionId:function()
		{
			return parseInt(localStorage.currentQuestionId);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
		}
		
};


var answerController = {
	init:function()
	{
		answerModel.init();
		answerView.init();
	},
	getAnswersArray:function()
	{
<<<<<<< HEAD
<<<<<<< HEAD
		return details;
=======
		return answersArray;
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
		return answerModel.answersArray;
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	getCurrentAnswer:function()
	{
		return answerModel.currentAnswer;
	},
	setCurrentAnswer:function(answer)
	{
		answerModel.currentAnswer = answer;
	},
	getVoteCount:function(index)
	{
		return answerModel.answersArray[index].votes;
	},
	getAnswerText:function(index)
	{
		return answerModel.answersArray[index].text;
	},
	getPostingTime:function(index)
	{
<<<<<<< HEAD
		//console.log(answerModel.details[i]);
<<<<<<< HEAD
		return details[i].votes;
=======
		return Date.parse(answerModel.answersArray[index].time);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	getUserName:function(index)
	{
<<<<<<< HEAD
		return details[i].text;
=======
		return answerModel.answersArray[index].user;
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	changeCount:function(index,change)
	{
<<<<<<< HEAD
		return details[i].time;
=======
		answerModel.changeCount(index,change);
		answerView.changeCount(index);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	changeQuestionCount:function(change)
	{
<<<<<<< HEAD
		return details[i].user;
=======
		answerModel.changeQuestionCount(change);
		answerView.changeQuestionCount(); 
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	addNewAnswer:function(text,rawText)
	{
<<<<<<< HEAD
		details[i-1].votes += change;
		answerView.changecount(i);
=======
		return answersArray[i].votes;
	},
	getAnswerText:function(i)
	{
		return answersArray[i].text;
	},
	getPostingTime:function(i)
	{
		//console.log(details[i].time);
		//console.log(Date.parse(details[i].time));
		return Date.parse(answersArray[i].time);
	},
	getUserName:function(i)
	{
		return answersArray[i].user;
	},
	changeCount:function(i,change)
	{
		answersArray[i-1].votes += change;
		var n = JSON.parse(localStorage.questions);
		n[parseInt(currentquestionid)-1].answers[i-1].votes = answersArray[i-1].votes;
		localStorage.questions = JSON.stringify(n);
		answerView.changeCount(i);
	},
	changeQuestionCount:function(change)
	{
		 var n = JSON.parse(localStorage.questions);
		 n[parseInt(localStorage.currentQuestionId)-1].votes += change;
		 localStorage.questions = JSON.stringify(n);
		 answerView.changeQuestionCount(); 
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
		var newAnswer = {};
		newAnswer.user=answerModel.getAuthor();
		newAnswer.question=answerModel.getCurrentQuestionId();
		newAnswer.text=text;
		newAnswer.rawText = rawText;
		newAnswer.votes=0;
		newAnswer.time=new Date();
		newAnswer.verified=false;
		newAnswer.id = ++answerModel.nextAnswerId;
		answerModel.addAnswer(newAnswer);
		answerView.addNewAnswer(answerModel.answersArray.length-1);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	},
	getQuestiontitle:function()
	{
<<<<<<< HEAD
		var newans = {};
		newans.user=localStorage.author;
		newans.question=parseInt(localStorage.currentQuestionId);
		newans.text=text;
		newans.votes=0;
		newans.time=new Date();
		newans.verified=false;
		newans.id = ++answerId;
<<<<<<< HEAD
		//console.log(newans);
		//console.log(newans);
		//console.log(details)
		//console.log();
		console.log (details);
		details.push(newans);
		answerModel.addAnswer(newans);
		//console.log(answerModel.details);
		console.log(details);
		answerView.addNewAnswer(details.length-1);
=======
		answerModel.addAnswer(newans);
		answerView.addNewAnswer(answersArray.length-1);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
	},
	getQuestiontitle:function()
	{
		//consolensole.log(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1]);
		//console.log(localStorage.questions[parseInt(localStorage.currentQuestionId)-1].title);
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].title;
	},
<<<<<<< HEAD
	getText:function()
	{
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].text;
	}
=======
	getQuestionVotes:function()
	{
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].votes;	
	},
	getText:function()
	{
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].text;
	},
	getNoOfAnswers:function()
	{
		return answers.length;
	},
	getTimeDifference:function(current, previous) {
    
	    var msPerMinute = 60 * 1000;
	    var msPerHour = msPerMinute * 60;
	    var msPerDay = msPerHour * 24;
	    var msPerMonth = msPerDay * 30;
	    var msPerYear = msPerDay * 365;
	    
	    var elapsed = current - previous;
	    
	    if (elapsed < msPerMinute) {
	         return Math.round(elapsed/1000) + ' seconds ago';   
	    }
	    
	    else if (elapsed < msPerHour) {
	         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
	    }
	    
	    else if (elapsed < msPerDay ) {
	         return Math.round(elapsed/msPerHour ) + ' hours ago';   
	    }

	    else if (elapsed < msPerMonth) {
	         return Math.round(elapsed/msPerDay) + ' days ago';   
	    }
	    
	    else if (elapsed < msPerYear) {
	         return Math.round(elapsed/msPerMonth) + ' months ago';   
	    }
	    
	    else {
	         return Math.round(elapsed/msPerYear ) + ' years ago';   
	    }
	},
	isAnswerVerified(i)
	{
		return answersArray[i].verified;
	},
	getQuestionPostingTime()
	{
		// console.log("ohh",Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time));
		return Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time);
	}


>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
		return answerModel.getQuestiontitle();
	},
	getQuestionVotes:function()
	{
		return answerModel.getQuestionVotes();	
	},
	getText:function()
	{
		return answerModel.getText();
	},
	getAnswers:function()
	{
		return answerModel.answers;
	},
	getNoOfAnswers:function()
	{
		return answerModel.answers.length;
	},
	getTimeDifference:function(current, previous) {
    
	    var msPerMinute = 60 * 1000,msPerHour = msPerMinute * 60,msPerDay = msPerHour * 24,msPerMonth = msPerDay * 30,msPerYear = msPerDay * 365;
	    
	    var elapsed = current - previous;
	    
	    if (elapsed < msPerMinute) {
	         return Math.round(elapsed/1000) + ' seconds ago';   
	    }
	    
	    else if (elapsed < msPerHour) {
	         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
	    }
	    
	    else if (elapsed < msPerDay ) {
	         return Math.round(elapsed/msPerHour ) + ' hours ago';   
	    }

	    else if (elapsed < msPerMonth) {
	         return Math.round(elapsed/msPerDay) + ' days ago';   
	    }
	    
	    else if (elapsed < msPerYear) {
	         return Math.round(elapsed/msPerMonth) + ' months ago';   
	    }
	    
	    else {
	         return Math.round(elapsed/msPerYear ) + ' years ago';   
	    }
	},
	isAnswerVerified:function(index)	//After Backend Support and User Integration
	{
		return answerModel.answersArray[index].verified;
	},
	getQuestionPostingTime:function()
	{
		return answerModel.getQuestionPostingTime();
	},
	getAsker:function()
	{
	 	return answerModel.getAsker();
	},
	getTags:function()
	{
		return answerModel.getTags();
	},
	setAnswers:function(answers)
	{
		answerModel.answers = answers;
	},
	votedUp:function(index)
	{
		answerModel.hasVotedUp[index] = true;
	},
	votedDown:function(index)
	{
		answerModel.hasVotedDown[index] = true;
	},
	notVotedUp:function(index)
	{
		answerModel.hasVotedUp[index] = false;
	},
	notVotedDown:function(index)
	{
		answerModel.hasVotedDown[index] = false;
	},
	hasVotedUp:function(index)
	{
		return !!(answerModel.hasVotedUp[index]);
	},
	hasVotedDown:function(index)
	{
		return !!(answerModel.hasVotedDown[index]);
	}

>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
};
var answerView = {
	init:function()
	{
		$(".question-header__question-hyperlink").text(answerController.getQuestiontitle());
<<<<<<< HEAD
<<<<<<< HEAD
		$(".postcell__posttext").text(answerController.getText());
=======
		$("#questionvotes").text(answerController.getQuestionVotes());
		document.getElementsByClassName("postcell__posttext")[0].innerHTML = answerController.getText();
		var postfooter_info = document.getElementsByClassName("postcell__postfooter__info")[0];
		postfooter_info.textContent = "asked "+answerController.getTimeDifference(new Date(),answerController.getQuestionPostingTime());
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		var tag = document.createElement("div");
		tag.className = "tag";
		var posttags = document.getElementsByClassName("postcell__posttaglist")[0];
		var tags = JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].tags;
		for(var j=0;j<tags.length;j++)
		{
			var tag = document.createElement("div");
			tag.className = "tag";

			tag.innerHTML= tags[j];
			posttags.appendChild(tag);
		}
		answers = answerController.getAnswers();
<<<<<<< HEAD
		if(answers.length > 0) {
			$(".noofanswers").text(answers.length);
			this.render();
			document.getElementsByClassName("answers")[0].addEventListener("click", function (e) {
=======
			$(".noofanswers").text(answerController.getNoOfAnswers());
			this.render();
			document.getElementsByClassName("content")[0].addEventListener("click", function (e) {
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
				//console.log("hmm")

				var element = e.target;
				if (element.id.includes("voteup") || element.id.includes("votedown")) {
<<<<<<< HEAD
					var updownid = element.id;
					var tobechanged = updownid.slice(-1);
					var downelement = document.getElementById("votedown" + tobechanged);
					var upelement = document.getElementById("voteup" + tobechanged);
					if (updownid.includes("up")) {
						if (element.className.includes("grey")) {
							if (downelement.className.includes("grey")) {
								answerController.changecount(tobechanged, 1);
							}
							else {
								answerController.changecount(tobechanged, 2);
								downelement.className = "fa fa-sort-desc fa-3x grey vote";
							}
							element.className = "fa fa-sort-asc fa-3x orange vote";
						}
						else {
							element.className = "fa fa-sort-asc fa-3x grey vote";
							answerController.changecount(tobechanged, -1);
						}
					}
					else {
						if (element.className.includes("grey")) {
							if (upelement.className.includes("grey")) {
								answerController.changecount(tobechanged, -1);
							}
							else {
								answerController.changecount(tobechanged, -2);
								upelement.className = "fa fa-sort-asc fa-3x grey vote";
							}
							element.className = "fa fa-sort-desc fa-3x orange vote";
						}
						else {
							element.className = "fa fa-sort-desc fa-3x grey vote";
							answerController.changecount(tobechanged, 1);
=======
					var updownid;
					var tobechanged;
					var downelement;
					var upelement;
					if(element.id.includes("q"))
					{	
						updownid = element.id;
						downelement = document.getElementById("qvotedown");
						upelement = document.getElementById("qvoteup");
						if (updownid.includes("up")) 
						{
							if (element.className.includes("grey")) 
							{
								if (downelement.className.includes("grey")) 
								{
									answerController.changeQuestionCount(1);
								}
								else {
									answerController.changeQuestionCount(2);
									downelement.className = "fa fa-sort-desc fa-3x grey vote";
								}
								element.className = "fa fa-sort-asc fa-3x orange vote";
							}
							else {
								element.className = "fa fa-sort-asc fa-3x grey vote";
								answerController.changeQuestionCount(-1);
							}
						}
						else {
							if (element.className.includes("grey")) {
								if (upelement.className.includes("grey")) {
									answerController.changeQuestionCount(-1);
								}
								else {
									answerController.changeQuestionCount(-2);
									upelement.className = "fa fa-sort-asc fa-3x grey vote";
								}
								element.className = "fa fa-sort-desc fa-3x orange vote";
							}
							else {
								element.className = "fa fa-sort-desc fa-3x grey vote";
								answerController.changeQuestionCount(1);
							}
						}
					}
					else
					{
						updownid = element.id;
						tobechanged = updownid.slice(-1);
						downelement = document.getElementById("votedown" + tobechanged);
						upelement = document.getElementById("voteup" + tobechanged);
						if (updownid.includes("up")) {
							if (element.className.includes("grey")) {
								if (downelement.className.includes("grey")) {
									answerController.changeCount(tobechanged, 1);
								}
								else {
									answerController.changeCount(tobechanged, 2);
									downelement.className = "fa fa-sort-desc fa-3x grey vote";
								}
								element.className = "fa fa-sort-asc fa-3x orange vote";
							}
							else {
								element.className = "fa fa-sort-asc fa-3x grey vote";
								answerController.changeCount(tobechanged, -1);
							}
						}
						else {
							if (element.className.includes("grey")) {
								if (upelement.className.includes("grey")) {
									answerController.changeCount(tobechanged, -1);
								}
								else {
									answerController.changeCount(tobechanged, -2);
									upelement.className = "fa fa-sort-asc fa-3x grey vote";
								}
								element.className = "fa fa-sort-desc fa-3x orange vote";
							}
							else {
								element.className = "fa fa-sort-desc fa-3x grey vote";
								answerController.changeCount(tobechanged, 1);
							}
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
						}
					}
				}
			});
<<<<<<< HEAD
		}
=======
		
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		// $(".vote").click(function(e)		//will be changed once user is associated
		// {
		// 	var element = e.toElement;
			
		// 	var updownid = element.id;
		// 	var tobechanged = updownid.slice(-1);
		// 	var downelement = document.getElementById("votedown"+tobechanged);
		// 	var upelement = document.getElementById("voteup"+tobechanged);
		// 	//console.log(downelement);
		// 	if(updownid.includes("up"))
		// 	{	
		// 		if(element.className.includes("grey"))
		// 		{
		// 			if(downelement.className.includes("grey"))
		// 			{
<<<<<<< HEAD
		// 				answerController.changecount(tobechanged,1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changecount(tobechanged,2);
=======
		// 				answerController.changeCount(tobechanged,1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changeCount(tobechanged,2);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		// 				downelement.className = "fa fa-sort-desc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-asc fa-3x orange vote";	
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-asc fa-3x grey vote";
<<<<<<< HEAD
		// 			answerController.changecount(tobechanged,-1);
=======
		// 			answerController.changeCount(tobechanged,-1);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		// 		}
		// 	}
		// 	else
		// 	{
		// 		if(element.className.includes("grey"))
		// 		{
		// 			if(upelement.className.includes("grey"))
		// 			{
<<<<<<< HEAD
		// 				answerController.changecount(tobechanged,-1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changecount(tobechanged,-2);
=======
		// 				answerController.changeCount(tobechanged,-1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changeCount(tobechanged,-2);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		// 				upelement.className = "fa fa-sort-asc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-desc fa-3x orange vote";
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-desc fa-3x grey vote";
<<<<<<< HEAD
		// 			answerController.changecount(tobechanged,1);
=======
		// 			answerController.changeCount(tobechanged,1);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
		// 		}	
		// 	}
		// });
=======
		$("#questionvotes").text(answerController.getQuestionVotes());
		$(".postcell__posttext").html(answerController.getText()); 
		
		this.addTags();
		this.addPostFooterInfo();
		
		answerController.setAnswers(answerController.getAnswersArray());

		$(".no-of-answers").text(answerController.getNoOfAnswers());
		this.render();
		this.eventHandlers();
		
		

/*	Not decided whether to include or not

		document.getElementsByClassName("content")[0].addEventListener("click", function (e) {
			var element = e.target;
			console.log(element);
			if(element.id.includes("editLink"))
			{

				localStorage.editAnswerId = element.id.substring(8);
				window.location.href = "edit.html";

			}
		});	
*/
	},

	eventHandlers:function()
	{
		this.voteCountHandler();
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
		$("#btn-submit").click(function(e){
			var text = $('#wmd-preview').html(),rawText = $('#wmd-input').val(),errors = $('.inputtags__errors'),elements = $('.inputtags__element');
            
            if(text === ""){
                    errors.html("Empty Body");   
            }
            else{
				//console.log(text);
<<<<<<< HEAD
                answerController.addNewAnswer(text);
=======
                answerController.addNewAnswer(text,rawText);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            }
            $('#wmd-input').val('');
            e.preventDefault();    
		});


		$("#discard").click(function(e){
			$('#wmd-input').val('');
		});
	},

	voteCountHandler:function()
	{
		$(".content")[0].addEventListener("click", function (e) 
		{
				
				var element = e.target;
				if (element.id.includes("voteup") || element.id.includes("votedown")) {
					var upDownId = element.id,toBeChanged,downElement,upElement;
					if(element.id.includes("q"))
					{	
						toBeChanged = 0;
						downElement = $("#qvotedown")[0];
						upElement = $("#qvoteup")[0];
						if (upDownId.includes("up")) 
						{
							//answerController.votedUp(0);
							if (!answerController.hasVotedUp(0)) 
							{
								if (!answerController.hasVotedDown(0)) 
								{
									answerController.changeQuestionCount(1);
								}
								else {
									answerController.changeQuestionCount(2);
									answerController.notVotedDown(0);
									downElement.className = "fa fa-sort-desc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-asc fa-3x colored vote";
								answerController.votedUp(0);
							}
							else {
								element.className = "fa fa-sort-asc fa-3x colorless vote";
								answerController.changeQuestionCount(-1);
								answerController.notVotedUp(0);
							}
						}
						else {
							if (!answerController.hasVotedDown(0)) {
								if (!answerController.hasVotedUp(0)) {
									answerController.changeQuestionCount(-1);
								}
								else {
									answerController.changeQuestionCount(-2);
									answerController.notVotedUp(0)
									upElement.className = "fa fa-sort-asc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-desc fa-3x colored vote";
								answerController.votedDown(0);
							}
							else {
								element.className = "fa fa-sort-desc fa-3x colorless vote";
								answerController.changeQuestionCount(1);
								answerController.notVotedDown(0);
							}
						}
					}
					else
					{
						toBeChanged = upDownId.slice(-1);
						downElement = $("#votedown" + toBeChanged)[0];
						upElement = $("#voteup" + toBeChanged)[0];
						if (upDownId.includes("up")) {
							if (!answerController.hasVotedUp(toBeChanged)) {
								if (!answerController.hasVotedDown(toBeChanged)) {
									answerController.changeCount(toBeChanged, 1);
								}
								else {
									answerController.changeCount(toBeChanged, 2);
									answerController.notVotedDown(toBeChanged);
									downElement.className = "fa fa-sort-desc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-asc fa-3x colored vote";
								answerController.votedUp(toBeChanged);
							}
							else {
								element.className = "fa fa-sort-asc fa-3x colorless vote";
								answerController.changeCount(toBeChanged, -1);
								answerController.notVotedUp(toBeChanged);
							}
						}
						else {
							if (!answerController.hasVotedDown(toBeChanged)) {
								if (!answerController.hasVotedUp(toBeChanged)) {
									answerController.changeCount(toBeChanged, -1);
								}
								else {
									answerController.changeCount(toBeChanged, -2);
									answerController.notVotedUp(toBeChanged)
									upElement.className = "fa fa-sort-asc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-desc fa-3x colored vote";
								answerController.votedDown(toBeChanged);
							}
							else {
								element.className = "fa fa-sort-desc fa-3x colorless vote";
								answerController.changeCount(toBeChanged, 1);
								answerController.notVotedDown(toBeChanged);
							}
						}
					}
					//answerView.voteCountHelper(upDownId,toBeChanged,downElement,upElement,elemen);
				}
			});
			

	},
	/* Can also make use of helper function
	voteCountHelper:function(upDownId,toBeChanged,downElement,upElement,element)
	{
						if (upDownId.includes("up")) {
							if (!answerController.hasVotedUp(toBeChanged)) {
								if (!answerController.hasVotedDown(toBeChanged)) {
									if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, 1);
									}
									else
									{
										answerController.changeQuestionCount(1);
									}
								}
								else {
									if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, 2);
									}
									else
									{
										answerController.changeQuestionCount(2);
									}
									answerController.notVotedDown(toBeChanged);
									downElement.className = "fa fa-sort-desc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-asc fa-3x colored vote";
								answerController.votedUp(toBeChanged);
							}
							else {
								element.className = "fa fa-sort-asc fa-3x colorless vote";
									if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, -1);
									}
									else
									{
										answerController.changeQuestionCount(-1);
									}
									answerController.notVotedUp(toBeChanged);
							}
						}
						else {
							if (!answerController.hasVotedDown(toBeChanged)) {
								if (!answerController.hasVotedUp(toBeChanged)) {
									if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, -1);
									}
									else
									{
										answerController.changeQuestionCount(-1);
									}
								}
								else {
									if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, -2);
									}
									else
									{
										answerController.changeQuestionCount(-2);
									}
									answerController.notVotedUp(toBeChanged)
									upElement.className = "fa fa-sort-asc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-desc fa-3x colored vote";
								answerController.votedDown(toBeChanged);
							}
							else {
								element.className = "fa fa-sort-desc fa-3x colorless vote";
																	if(toBeChanged!=0)
									{	
										answerController.changeCount(toBeChanged, 1);
									}
									else
									{
										answerController.changeQuestionCount(1);
									}
									answerController.notVotedDown(toBeChanged);
							}
						}
	},*/
	appendAnswerString:function(tempObject)
	{
		return '<div class="answer-padding">'+
					'<div class="votecell">'+
						'<div class="votecell__vote">'+
							'<i class="fa fa-sort-asc fa-3x colorless" id="'+tempObject.voteUpId+'"></i>'+
							'<div class="votecount" id="'+tempObject.voteCountId+'">'+answerController.getVoteCount(tempObject.index)+'</div>'+
							'<i class="fa fa-sort-desc fa-3x colorless" id="'+tempObject.voteDownId+'"></i>'+
						'</div>'+
					'</div>'+
					'<div class="postcell">'+
						'<div class="postcell__posttext">'+answerController.getAnswerText(tempObject.index)+'</div>'+
						'<div class="postcell__postfooter clearfix">'+
							'<div class="postcell__postfooter__info">'+
								"answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(tempObject.index))+
								'<div class="postcell__postfooter__info__userinfo">'+answerController.getUserName(tempObject.index)+'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
	},

	
	render:function()
	{
		var allAnswersHtmlString = '';
		var tempObject = {};		//to pass 5 arguments
		answerController.getAnswers().forEach(function(element,index,array){

			tempObject.voteUpId = "voteup"+(index+1);
			tempObject.voteCountId = "votecount"+(index+1);
			tempObject.voteDownId = "votedown"+(index+1);
			tempObject.editLinkId = "editLink"+(index+1);
			tempObject.index = index;
			allAnswersHtmlString = allAnswersHtmlString + answerView.appendAnswerString(tempObject);

<<<<<<< HEAD
<<<<<<< HEAD
=======
			if(answerController.isAnswerVerified(i))
			{
				var verified = document.createElement("div");
				vote.appendChild(verified);
				var varicon = document.createElement("i");
				varicon.className = "fa fa-check fa-2x green";
				verified.appendChild(varicon);
			}

>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
<<<<<<< HEAD
			postfooterinfo.textContent = " "+answerController.getPostingTime(i) + " ";
=======
			postfooterinfo.textContent = "answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(i));
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
			postfooter.appendChild(postfooterinfo);
			var userinfo = document.createElement("div");
			userinfo.className = "postcell__postfooter__info__userinfo";
			userinfo.innerHTML = answerController.getUserName(i);
			postfooterinfo.appendChild(userinfo);
=======
		});
		$(".answers").append(allAnswersHtmlString);	
	},

>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c

	addNewAnswer:function(index)
	{
			var tempObject = {};	//to pass 5 arguments
			tempObject.voteUpId = "voteup"+(index+1);
			tempObject.voteCountId = "votecount"+(index+1);
			tempObject.voteDownId = "votedown"+(index+1);
			tempObject.editLinkId = "editLink"+(index+1);
			tempObject.index = index;
			
		var newAnswerHtmlString = this.appendAnswerString(tempObject);
			
			$(".answers").append(newAnswerHtmlString);	
			$(".no-of-answers").text(answerController.getNoOfAnswers());
	},

	addTags:function()
	{
		var tagshtml = '',tags = answerController.getTags();
		tags.forEach(function(element,index,array){
			tagshtml = tagshtml + answerView.appendTag(tags[index]);
		});
		$(".postcell__posttaglist").html(tagshtml);
	},

	appendTag:function(tag)
	{
		return '<div class="tag">'+tag+'</div>';
	},

<<<<<<< HEAD
<<<<<<< HEAD
=======
			if(answerController.isAnswerVerified(i))
			{
				var verified = document.createElement("div");
				vote.appendChild(verified);
				var varicon = document.createElement("i");
				varicon.className = "fa fa-check fa-2x green";
				verified.appendChild(varicon);
			}
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
<<<<<<< HEAD
			postfooterinfo.textContent = " "+answerController.getPostingTime(i) + " ";
=======
			postfooterinfo.textContent = "answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(i));
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
			postfooter.appendChild(postfooterinfo);
			var userinfo = document.createElement("div");
			userinfo.className = "postcell__postfooter__info__userinfo";
			userinfo.innerHTML = answerController.getUserName(i);
			postfooterinfo.appendChild(userinfo);
<<<<<<< HEAD
	},
	changecount:function(i)
=======
			$(".noofanswers").text(answerController.getNoOfAnswers());
	},
	changeQuestionCount:function()
	{
		$("#questionvotes").text(answerController.getQuestionVotes());
	},
	changeCount:function(i)
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
	changeQuestionCount:function()
	{
		$("#questionvotes").text(answerController.getQuestionVotes());
	},

	addPostFooterInfo:function()
	{
		var postFooterHtml =  'asked '+answerController.getTimeDifference(new Date(),answerController.getQuestionPostingTime())+'<div class="postcell__postfooter__info__userinfo">'+answerController.getAsker();+'</div>';
		$(".postcell__postfooter__info").html(postFooterHtml);
	},
	changeCount:function(index)
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
	{
		//console.log("Here");
		$("#votecount"+(index)).text(answerController.getVoteCount(index-1));
	}
};
answerController.init();
});