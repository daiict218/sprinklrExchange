$(function(){
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
		return answerModel.answersArray;
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
		return Date.parse(answerModel.answersArray[index].time);
	},
	getUserName:function(index)
	{
		return answerModel.answersArray[index].user;
	},
	/*changeCount:function(index,change)
	{
		answerModel.changeCount(index,change);
		answerView.changeCount(index);
	},
	changeQuestionCount:function(change)
	{
		answerModel.changeQuestionCount(change);
		answerView.changeQuestionCount(); 
	},*/
	changeVoteCount:function(index,change)
	{
		if(index==0)
		{
			answerModel.changeQuestionCount(change);
			answerView.changeQuestionCount();
		}
		else
		{
			answerModel.changeCount(index,change);
			answerView.changeCount(index);
		}
	},
	addNewAnswer:function(text,rawText)
	{
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


		$("#btn-discard").click(function(e){
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
					}
					else
					{
						toBeChanged = upDownId.slice(-1);
						downElement = $("#votedown" + toBeChanged)[0];
						upElement = $("#voteup" + toBeChanged)[0];
					}
					var vote = {upDownId,toBeChanged,downElement,upElement,element};
					answerView.voteCountHelper(vote);
				}
		});
			

	},
	voteCountHelper:function(vote)
	{
		if (vote.upDownId.includes("up")) {
			if (!answerController.hasVotedUp(vote.toBeChanged)) {
				if (!answerController.hasVotedDown(vote.toBeChanged)) {
					answerController.changeVoteCount(vote.toBeChanged, 1);

				}
				else {
					answerController.changeVoteCount(vote.toBeChanged, 2);
					answerController.notVotedDown(vote.toBeChanged);
					vote.downElement.className = "fa fa-sort-desc fa-3x colorless vote";
				}
				vote.element.className = "fa fa-sort-asc fa-3x colored vote";
				answerController.votedUp(vote.toBeChanged);
			}
			else {
				vote.element.className = "fa fa-sort-asc fa-3x colorless vote";
				answerController.changeVoteCount(vote.toBeChanged, -1);
				answerController.notVotedUp(vote.toBeChanged);
			}
		}
		else {
			if (!answerController.hasVotedDown(vote.toBeChanged)) {
				if (!answerController.hasVotedUp(vote.toBeChanged)) {
					answerController.changeVoteCount(vote.toBeChanged, -1);

				}
				else {
					answerController.changeVoteCount(vote.toBeChanged, -2);
					answerController.notVotedUp(vote.toBeChanged)
					vote.upElement.className = "fa fa-sort-asc fa-3x colorless vote";
				}
				vote.element.className = "fa fa-sort-desc fa-3x colored vote";
				answerController.votedDown(vote.toBeChanged);
			}
			else {
				vote.element.className = "fa fa-sort-desc fa-3x colorless vote";
				answerController.changeVoteCount(vote.toBeChanged, 1)
				answerController.notVotedDown(vote.toBeChanged);
			}
		}
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
		answerController.getAnswers().forEach(function(element,index,array){

			tempObject.voteUpId = "voteup"+(index+1);
			tempObject.voteCountId = "votecount"+(index+1);
			tempObject.voteDownId = "votedown"+(index+1);
			tempObject.editLinkId = "editLink"+(index+1);
			tempObject.index = index;
			allAnswersHtmlString = allAnswersHtmlString + answerView.appendAnswerString(tempObject);

		});
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