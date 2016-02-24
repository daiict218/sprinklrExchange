$(function(){
	var answers = [];
	var answerId = 0;
	var details = [];
	var questions = [];
	if(!localStorage.author)
    	localStorage.author = "Anonynous";
	var ansArray = [];
	var answersArray = [];
	var currentQuestionId = 0;
	var question = "";
var answerModel = {
		init:function(){
		questions = JSON.parse(localStorage.questions);
		
		currentQuestionId = localStorage.currentQuestionId;
		//console.log(currentQuestionId);
		question = questions[parseInt(currentQuestionId)-1];
		//console.log(question.answers);
		answersArray = question.answers;

		},
		addAnswer:function(answer){
			if (!question.answers)
                answers = JSON.parse(question.answers);
            answers.push(answer);
            question.answers = JSON.stringify(answers);
            var tempQuestions = JSON.parse(localStorage.questions);
            tempQuestions[currentQuestionId-1].answers.push(answer);
            localStorage.questions = JSON.stringify(tempQuestions);
		}
		
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
	getVoteCount:function(index)
	{
		return answersArray[index].votes;
	},
	getAnswerText:function(index)
	{
		return answersArray[index].text;
	},
	getPostingTime:function(index)
	{
		return Date.parse(answersArray[index].time);
	},
	getUserName:function(index)
	{
		return answersArray[index].user;
	},
	changeCount:function(index,change)
	{
		answersArray[index-1].votes += change;
		var tempQuestions = JSON.parse(localStorage.questions);
		tempQuestions[parseInt(currentQuestionId)-1].answers[index-1].votes = answersArray[index-1].votes;
		localStorage.questions = JSON.stringify(tempQuestions);
		answerView.changeCount(index);
	},
	changeQuestionCount:function(change)
	{
		 var n = JSON.parse(localStorage.questions);
		 n[parseInt(localStorage.currentQuestionId)-1].votes += change;
		 localStorage.questions = JSON.stringify(n);
		 answerView.changeQuestionCount(); 
	},
	addNewAnswer:function(text,rawText)
	{
		var newAnswer = {};
		newAnswer.user=localStorage.author;
		newAnswer.question=parseInt(localStorage.currentQuestionId);
		newAnswer.text=text;
		newAnswer.rawText = rawText;
		newAnswer.votes=0;
		newAnswer.time=new Date();
		newAnswer.verified=false;
		newAnswer.id = ++answerId;
		answerModel.addAnswer(newAnswer);
		answerView.addNewAnswer(answersArray.length-1);
	},
	getQuestiontitle:function()
	{
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
		return answersArray[index].verified;
	},
	getQuestionPostingTime:function()
	{
		// console.log("ohh",Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time));
		return Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time);
	},
	getAsker:function()
	{
	 	return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].author;
	},
	getTags:function()
	{
		return JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].tags;
	}

};
var answerView = {
	init:function()
	{
		$(".question-header__question-hyperlink").text(answerController.getQuestiontitle());
		$("#questionvotes").text(answerController.getQuestionVotes());
		$(".postcell__posttext").html(answerController.getText()); 
		
		this.addTags();
		this.addPostFooterInfo();
		
		answers = answerController.getAnswers();

		$(".noofanswers").text(answerController.getNoOfAnswers());
		this.render();
			
		$(".content")[0].addEventListener("click", function (e) 
		{
				
				var element = e.target;
				if (element.id.includes("voteup") || element.id.includes("votedown")) {
					var upDownId = element.id,toBeChanged,downElement,upElement;
					if(element.id.includes("q"))
					{	
						toBeChanged = null;
						downElement = $("#qvotedown")[0];
						upElement = $("#qvoteup")[0];
						if (upDownId.includes("up")) 
						{
							if (element.className.includes("colorless")) 
							{
								if (downElement.className.includes("colorless")) 
								{
									answerController.changeQuestionCount(1);
								}
								else {
									answerController.changeQuestionCount(2);
									downElement.className = "fa fa-sort-desc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-asc fa-3x colored vote";
							}
							else {
								element.className = "fa fa-sort-asc fa-3x colorless vote";
								answerController.changeQuestionCount(-1);
							}
						}
						else {
							if (element.className.includes("colorless")) {
								if (upElement.className.includes("colorless")) {
									answerController.changeQuestionCount(-1);
								}
								else {
									answerController.changeQuestionCount(-2);
									upElement.className = "fa fa-sort-asc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-desc fa-3x colored vote";
							}
							else {
								element.className = "fa fa-sort-desc fa-3x colorless vote";
								answerController.changeQuestionCount(1);
							}
						}
					}
					else
					{
						toBeChanged = upDownId.slice(-1);
						downElement = $("#votedown" + toBeChanged)[0];
						upElement = $("#voteup" + toBeChanged)[0];
						if (upDownId.includes("up")) {
							if (element.className.includes("colorless")) {
								if (downElement.className.includes("colorless")) {
									answerController.changeCount(toBeChanged, 1);
								}
								else {
									answerController.changeCount(toBeChanged, 2);
									downElement.className = "fa fa-sort-desc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-asc fa-3x colored vote";
							}
							else {
								element.className = "fa fa-sort-asc fa-3x colorless vote";
								answerController.changeCount(toBeChanged, -1);
							}
						}
						else {
							if (element.className.includes("colorless")) {
								if (upElement.className.includes("colorless")) {
									answerController.changeCount(toBeChanged, -1);
								}
								else {
									answerController.changeCount(toBeChanged, -2);
									upElement.className = "fa fa-sort-asc fa-3x colorless vote";
								}
								element.className = "fa fa-sort-desc fa-3x colored vote";
							}
							else {
								element.className = "fa fa-sort-desc fa-3x colorless vote";
								answerController.changeCount(toBeChanged, 1);
							}
						}
					}
				}
			});
			

/*event handlers*/
		
		$("#btn-submit").click(function(e){
			var text = $('#wmd-preview').html(),rawText = $('#wmd-input').val(),errors = $('.inputtags__errors'),elements = $('.inputtags__element');
            
            if(text === ""){
                    errors.html("Empty Body");   
            }
            else{
				//console.log(text);
                answerController.addNewAnswer(text,rawText);
            }
            $('#wmd-input').val('');
            e.preventDefault();    
		});


		$("#discard").click(function(e){
			$('#wmd-input').val('');
		});

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


	appendAnswerString:function(voteUpId,voteCountId,voteDownId,editLinkId,index)
	{
		return '<div class="answer-padding">'+
					'<div class="votecell">'+
						'<div class="votecell__vote">'+
							'<i class="fa fa-sort-asc fa-3x colorless" id="'+voteUpId+'"></i>'+
							'<div class="votecount" id="'+voteCountId+'">'+answerController.getVoteCount(index)+'</div>'+
							'<i class="fa fa-sort-desc fa-3x colorless" id="'+voteDownId+'"></i>'+
						'</div>'+
					'</div>'+
					'<div class="postcell">'+
						'<div class="postcell__posttext">'+answerController.getAnswerText(index)+'</div>'+
						'<div class="postcell__postfooter clearfix">'+
							'<div class="postcell__postfooter__info">'+
								"answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(index))+
								'<div class="postcell__postfooter__info__userinfo">'+answerController.getUserName(index)+'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
	},


	render:function()
	{
		var allAnswersHtmlString = '';
		for(var index=0;index<answers.length;index++)
		{
			allAnswersHtmlString = allAnswersHtmlString + this.appendAnswerString("voteup"+(index+1),"votecount"+(index+1),"votedown"+(index+1),"editLink"+(index+1),index);
		}
		$(".answers").append(allAnswersHtmlString);	
	},


	addNewAnswer:function(index)
	{
		var newAnswerHtmlString = this.appendAnswerString("voteup"+(index+1),"votecount"+(index+1),"votedown"+(index+1),"editLink"+(index+1),index);
			
			$(".answers").append(newAnswerHtmlString);	
			$(".noofanswers").text(answerController.getNoOfAnswers());
	},

	addTags:function()
	{
		var tagshtml = '',tags = answerController.getTags();
		for(var index=0;index<tags.length;index++)
		{
			tagshtml = tagshtml + this.appendTag(tags[index]);
		}
		//console.log(tagshtml);
		$(".postcell__posttaglist").html(tagshtml);
	},

	appendTag:function(tag)
	{
		return '<div class="tag">'+tag+'</div>';
	},

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
	{
		//console.log("Here");
		$("#votecount"+(index)).text(answerController.getVoteCount(index-1));
	}
};
answerController.init();
});