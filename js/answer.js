$(function(){
	var answers = [];
	var answerId = 0;
	var details = [];
	var questions = [];
	localStorage.author = "Karan Tankshali";
	var answerModel = {
		init:function(){
		
		questions = JSON.parse(localStorage.questions);
		var currentquestionid = localStorage.currentQuestionId;
		//console.log(currentquestionid);
		var question = questions[parseInt(currentquestionid)-1];
			//console.log(questions);
		var answersArray = question.answers;
			if(answersArray.length != 0) {
				answersArray.forEach(function (i) {

					details[i].id = answersArray[i].id;
					details[i].questionId = localStorage.answers.questionId;
					details[i].author = localStorage.answers.author;
					details[i].text = JSON.parse(localStorage.answers.text);
					details[i].timestamp = localStorage.answers.timestamp;
				});
			}


		},
		addAnswer:function(answer){
			//var a = [];
			//if(!localStorage.answers==="")
			//	{a=JSON.parse(localStorage.answers);}
			//a.push(answer);
			if (!localStorage.answers==undefined)
                answers = JSON.parse(localStorage.answers);
            console.log(answers,"before");
            answers.push(answer);
            console.log(answers);
			
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
		return details[i].time;
	},
	getUserName:function(i)
	{
		return details[i].user;
	},
	changecount:function(i,change)
	{
		details[i-1].votes += change;
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
	getText:function()
	{
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].text;
	},
	getNoOfAnswers:function()
	{
		return answers.length;
	}
};
var answerView = {
	init:function()
	{
		$(".question-header__question-hyperlink").text(answerController.getQuestiontitle());
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
				console.log("hmm")

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

			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
			postfooterinfo.textContent = " "+answerController.getPostingTime(i) + " ";
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

			var posttext = document.createElement("div");
			posttext.className = "postcell__posttext";
			posttext.innerHTML = answerController.getAnswerText(i);
			postcell.appendChild(posttext);

			var postfooter = document.createElement("div");
			postfooter.className = "postcell__postfooter";
			postcell.appendChild(postfooter);
			var postfooterinfo = document.createElement("div");
			postfooterinfo.className = "postcell__postfooter__info";
			postfooterinfo.textContent = " "+answerController.getPostingTime(i) + " ";
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