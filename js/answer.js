$(function(){
	//var answers = [];
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
		answers:[],
		init:function(){
		questions = JSON.parse(localStorage.questions);
		
		currentQuestionId = localStorage.currentQuestionId;
		question = questions[parseInt(currentQuestionId)-1];
		answersArray = question.answers;

		},
		addAnswer:function(answer){
			if (!question.answers)
            {    
            	answeerModel.answers = JSON.parse(question.answers);
            }
            answerModel.answers.push(answer);
            question.answers = JSON.stringify(answerModel.answers);
            var tempQuestions = JSON.parse(localStorage.questions);
            tempQuestions[currentQuestionId-1].answers.push(answer);
            localStorage.questions = JSON.stringify(tempQuestions);
		},
		getQuestiontitle:function()
		{
			return question.title;
		},
		getQuestionVotes:function()
		{
			return question.votes;	
		},
		getText:function()
		{
			return question.text;
		},
		getQuestionPostingTime:function()
		{
			// console.log("ohh",Date.parse(JSON.parse(localStorage.questions)[parseInt(localStorage.currentQuestionId)-1].time));
			return Date.parse(question.time);
		},
		getAsker:function()
		{
		 	return question.author;
		},
		getTags:function()
		{
			return question.tags;
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
		 var tempQuestions = JSON.parse(localStorage.questions);
		 tempQuestions[parseInt(localStorage.currentQuestionId)-1].votes += change;
		 localStorage.questions = JSON.stringify(tempQuestions);
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
		return answersArray[index].verified;
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
		
		answerController.setAnswers(answerController.getAnswersArray());

		$(".noofanswers").text(answerController.getNoOfAnswers());
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
			

	},

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
		for(var index=0;index<answerController.getNoOfAnswers();index++)
		{
			
			tempObject.voteUpId = "voteup"+(index+1);
			tempObject.voteCountId = "votecount"+(index+1);
			tempObject.voteDownId = "votedown"+(index+1);
			tempObject.editLinkId = "editLink"+(index+1);
			tempObject.index = index;
			allAnswersHtmlString = allAnswersHtmlString + this.appendAnswerString(tempObject);
		}
		$(".answers").append(allAnswersHtmlString);	
	},


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