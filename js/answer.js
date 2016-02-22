$(function(){
	var answers = [];
	var answerId = 0;
	var details = [];
	var questions = [];
	localStorage.author = "Karan Tankshali";
	var ansArray = [];
	var answersArray = [];
	var answerModel = {
		init:function(){
		questions = JSON.parse(localStorage.questions);
		
		
		var currentquestionid = localStorage.currentQuestionId;
		//console.log(currentquestionid);
		var question = questions[parseInt(currentquestionid)-1];
			//console.log(questions);
		
		//var answersArray = question.answers;
		//console.log(localStorage.answers)
		//console.log(localStorage.answers+"here")
		if (localStorage.answers!==undefined)
		{		
                ansArray = JSON.parse(localStorage.answers);
               // console.log("hello");
        }
        for(var k = 0;k<ansArray.length;k++)
        {
        	//console.log(ansArray[k]);
        	if(ansArray[k].question == parseInt(currentquestionid))
        	{
        		answersArray.push(ansArray[k]);
        	}
        }

		//console.log(answersArray);
			if(answersArray.length != 0) {
					for(var i=0;i<answersArray.length;i++)
					{
					console.log(answersArray[i]);
					details[i] = {};
					details[i].id = answersArray[i].id;
					details[i].questionId = answersArray[i].question;
					details[i].user = answersArray[i].user;
					details[i].text = answersArray[i].text;
					details[i].time = answersArray[i].time;
					details[i].votes = answersArray[i].votes;
					details[i].verified = answersArray[i].verified;
					console.log(details,"details");
				}
			}


		},
		addAnswer:function(answer){
			//var a = [];
			//if(!localStorage.answers==="")
			//	{a=JSON.parse(localStorage.answers);}
			//a.push(answer);
			if (!localStorage.answers==undefined)
                answers = JSON.parse(localStorage.answers);
            //console.log(answers,"before");
            answers.push(answer);
            //console.log(answers);
			
            localStorage.answers = JSON.stringify(answers);
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
		return details;
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
		return details[i].votes;
	},
	getAnswerText:function(i)
	{
		return details[i].text;
	},
	getPostingTime:function(i)
	{
		console.log(details[i].time);
		console.log(Date.parse(details[i].time));
		return Date.parse(details[i].time);
	},
	getUserName:function(i)
	{
		return details[i].user;
	},
	changecount:function(i,change)
	{
		console.log(i);
		details[i-1].votes += change;
		var n = JSON.parse(localStorage.answers);
		console.log(n,"n");
		n[i-1].votes = details[i-1].votes;
		localStorage.answers = JSON.stringify(n);
		answerView.changecount(i);
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
		//console.log(newans);
		//console.log(newans);
		//console.log(details)
		//console.log();
		//console.log (details);
		//details.push(newans);
		answerModel.addAnswer(newans);
		//console.log(answerModel.details);
		//console.log(details);
		answerView.addNewAnswer(details.length-1);
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
		return details[i].verified;
	}

};
var answerView = {
	init:function()
	{
		$(".question-header__question-hyperlink").text(answerController.getQuestiontitle());
		$("#questionvotes").text(answerController.getQuestionVotes());
		document.getElementsByClassName("postcell__posttext")[0].innerHTML = answerController.getText();

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
			$(".noofanswers").text(answerController.getNoOfAnswers());
			this.render();
			document.getElementsByClassName("content")[0].addEventListener("click", function (e) {
				//console.log("hmm")

				var element = e.target;
				if (element.id.includes("voteup") || element.id.includes("votedown")) {
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
		// 				answerController.changecount(tobechanged,1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changecount(tobechanged,2);
		// 				downelement.className = "fa fa-sort-desc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-asc fa-3x orange vote";	
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-asc fa-3x grey vote";
		// 			answerController.changecount(tobechanged,-1);
		// 		}
		// 	}
		// 	else
		// 	{
		// 		if(element.className.includes("grey"))
		// 		{
		// 			if(upelement.className.includes("grey"))
		// 			{
		// 				answerController.changecount(tobechanged,-1);
		// 			}
		// 			else
		// 			{
		// 				answerController.changecount(tobechanged,-2);
		// 				upelement.className = "fa fa-sort-asc fa-3x grey vote";
		// 			}
		// 			element.className = "fa fa-sort-desc fa-3x orange vote";
		// 		}
		// 		else
		// 		{
		// 			element.className = "fa fa-sort-desc fa-3x grey vote";
		// 			answerController.changecount(tobechanged,1);
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

	changecount:function(i)
	{
		//console.log("Here");
		$("#votecount"+(i)).text(answerController.getVoteCount(i-1));
	}
};
answerController.init();
});