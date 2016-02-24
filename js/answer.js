$(function(){
	var answers = [];
	var answerId = 0;
	var details = [];
	var questions = [];
	if(!localStorage.author)
    	localStorage.author = "Anonynous";
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
		}
		//currentAnswer : null,

};


var answerController = {
	init:function()
	{
		answerModel.init();
		answerView.init();
	},
	getAnswers:function()
	{
		return answersArray;
	},
	getCurrentAnswer:function()
	{
		return answerModel.currentAnswer;
	},
	setCurrentAnswer:function(answer)
	{
		answerModel.currentAnswer = answer;
	},
	getVoteCount:function(i)
	{
		//console.log(answerModel.details[i]);
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
	},
	addNewAnswer:function(text)
	{
		var newans = {};
		newans.user=localStorage.author;
		newans.question=parseInt(localStorage.currentQuestionId);
		newans.text=text;
		newans.votes=0;
		newans.time=new Date();
		newans.verified=false;
		newans.id = ++answerId;
		answerModel.addAnswer(newans);
		answerView.addNewAnswer(answersArray.length-1);
	},
	getQuestiontitle:function()
	{
		//consolensole.log(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1]);
		//console.log(localStorage.questions[parseInt(localStorage.currentQuestionId)-1].title);
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].title;
	},
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
	},
	getAsker()
	{
	 	return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].author;
	}


};
var answerView = {
	init:function()
	{
		$(".question-header__question-hyperlink").text(answerController.getQuestiontitle());
		$("#questionvotes").text(answerController.getQuestionVotes());
		document.getElementsByClassName("postcell__posttext")[0].innerHTML = answerController.getText();
		var postfooter_info = document.getElementsByClassName("postcell__postfooter__info")[0];
		postfooter_info.textContent = "asked "+answerController.getTimeDifference(new Date(),answerController.getQuestionPostingTime());
		var tag = document.createElement("div");
		tag.className = "tag";
		var posttags = document.getElementsByClassName("postcell__posttaglist")[0];
		var tags = JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].tags;
		var userinfo = document.createElement("div");
		userinfo.className = "postcell__postfooter__info__userinfo";
		userinfo.innerHTML = answerController.getAsker();
		postfooter_info.appendChild(userinfo);
		for(var j=0;j<tags.length;j++)
		{
			var tag = document.createElement("div");
			tag.className = "tag";

			tag.innerHTML= tags[j];
			posttags.appendChild(tag);
		}
		answers = answerController.getAnswers();
			$(".noofanswers").text(answerController.getNoOfAnswers());
			this.render();
			document.getElementsByClassName("content")[0].addEventListener("click", function (e) {
				//console.log("hmm")

				var element = e.target;
				if (element.id.includes("voteup") || element.id.includes("votedown")) {
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
						}
					}
				}
			});
		
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
		// 				answerController.changeCount(tobechanged,1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changeCount(tobechanged,2);
		// 				downelement.className = "fa fa-sort-desc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-asc fa-3x orange vote";	
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-asc fa-3x grey vote";
		// 			answerController.changeCount(tobechanged,-1);
		// 		}
		// 	}
		// 	else
		// 	{
		// 		if(element.className.includes("grey"))
		// 		{
		// 			if(upelement.className.includes("grey"))
		// 			{
		// 				answerController.changeCount(tobechanged,-1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changeCount(tobechanged,-2);
		// 				upelement.className = "fa fa-sort-asc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-desc fa-3x orange vote";
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-desc fa-3x grey vote";
		// 			answerController.changeCount(tobechanged,1);
		// 		}	
		// 	}
		// });
		$("#btn-submit").click(function(e){
			var text = document.getElementById('wmd-preview').innerHTML;
			var errors = $('.inputtags__errors');
            var elements = $('.inputtags__element');
            
            if(text === ""){
                    errors.html("Empty Body");   
            }
            else{
				//console.log(text);
                answerController.addNewAnswer(text);
            }
            $('#wmd-input').val('');
            e.preventDefault();    
		});
		$("#discard").click(function(e){
			$('#wmd-input').val('');
		});

	},
	render:function()
	{
		for(var i=0;i<answers.length;i++)
		{
			var answerpadding = document.createElement("div");
			answerpadding.className = "answer-padding";
			$(".answers").append(answerpadding);

			var ta = document.createElement("table");
			var tbo = document.createElement("tbody");
			var tr = document.createElement("tr");
			var votecell = document.createElement("td");
			var postcell = document.createElement("td");
			votecell.className = "votecell";
			postcell.className = "postcell";
			answerpadding.appendChild(ta);
			ta.appendChild(tbo);
			tbo.appendChild(tr);
			tr.appendChild(votecell);
			tr.appendChild(postcell);

			var vote = document.createElement("div");
			vote.className = "votecell__vote";
			votecell.appendChild(vote);
			var voteup = document.createElement("i");
			voteup.className = "fa fa-sort-asc fa-3x grey vote";
			voteup.id = "voteup"+(i+1);
			var votedown = document.createElement("i");
			votedown.className = "fa fa-sort-desc fa-3x grey vote";
			votedown.id = "votedown"+(i+1);
			var votecount = document.createElement("div");
			votecount.className = "votecount";
			votecount.id = "votecount"+(i+1);
			votecount.innerHTML = answerController.getVoteCount(i);

			vote.appendChild(voteup);
			vote.appendChild(votecount);
			vote.appendChild(votedown);

			if(answerController.isAnswerVerified(i))
			{
				var verified = document.createElement("div");
				vote.appendChild(verified);
				var varicon = document.createElement("i");
				varicon.className = "fa fa-check fa-2x green";
				verified.appendChild(varicon);
			}

			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
			postfooterinfo.textContent = "answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(i));
			postfooter.appendChild(postfooterinfo);
			var userinfo = document.createElement("div");
			userinfo.className = "postcell__postfooter__info__userinfo";
			userinfo.innerHTML = answerController.getUserName(i);
			postfooterinfo.appendChild(userinfo);

		}	
	},
	addNewAnswer:function(i)
	{
			var answerpadding = document.createElement("div");
			answerpadding.className = "answer-padding";
			$(".answers").append(answerpadding);

			var ta = document.createElement("table");
			var tbo = document.createElement("tbody");
			var tr = document.createElement("tr");
			var votecell = document.createElement("td");
			var postcell = document.createElement("td");
			votecell.className = "votecell";
			postcell.className = "postcell";
			answerpadding.appendChild(ta);
			ta.appendChild(tbo);
			tbo.appendChild(tr);
			tr.appendChild(votecell);
			tr.appendChild(postcell);

			var vote = document.createElement("div");
			vote.className = "votecell__vote";
			votecell.appendChild(vote);
			var voteup = document.createElement("i");
			voteup.className = "fa fa-sort-asc fa-3x grey vote";
			voteup.id = "voteup"+(i+1);
			var votedown = document.createElement("i");
			votedown.className = "fa fa-sort-desc fa-3x grey vote";
			votedown.id = "votedown"+(i+1);
			var votecount = document.createElement("div");
			votecount.className = "votecount";
			votecount.id = "votecount"+(i+1);
			votecount.innerHTML = answerController.getVoteCount(i);

			vote.appendChild(voteup);
			vote.appendChild(votecount);
			vote.appendChild(votedown);

			if(answerController.isAnswerVerified(i))
			{
				var verified = document.createElement("div");
				vote.appendChild(verified);
				var varicon = document.createElement("i");
				varicon.className = "fa fa-check fa-2x green";
				verified.appendChild(varicon);
			}
			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
			postfooterinfo.textContent = "answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(i));
			postfooter.appendChild(postfooterinfo);
			var userinfo = document.createElement("div");
			userinfo.className = "postcell__postfooter__info__userinfo";
			userinfo.innerHTML = answerController.getUserName(i);
			postfooterinfo.appendChild(userinfo);
			$(".noofanswers").text(answerController.getNoOfAnswers());
	},
	changeQuestionCount:function()
	{
		$("#questionvotes").text(answerController.getQuestionVotes());
	},
	changeCount:function(i)
	{
		//console.log("Here");
		$("#votecount"+(i)).text(answerController.getVoteCount(i-1));
	}
};
answerController.init();
});