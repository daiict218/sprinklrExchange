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
			if (!question.answers)
                answers = JSON.parse(question.answers);
            answers.push(answer);
            question.answers = JSON.stringify(answers);
            var p = JSON.parse(localStorage.questions);
            p[currentquestionid-1].answers.push(answer);
            localStorage.questions = JSON.stringify(p);
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
	getVoteCount:function(i)
	{
		return answersArray[i].votes;
	},
	getAnswerText:function(i)
	{
		return answersArray[i].text;
	},
	getPostingTime:function(i)
	{
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
	addNewAnswer:function(text,rawText)
	{
		var newans = {};
		newans.user=localStorage.author;
		newans.question=parseInt(localStorage.currentQuestionId);
		newans.text=text;
		newans.rawText = rawText;
		newans.votes=0;
		newans.time=new Date();
		newans.verified=false;
		newans.id = ++answerId;
		answerModel.addAnswer(newans);
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
	isAnswerVerified:function(i)
	{
		return answersArray[i].verified;
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
			var text = $('#wmd-preview').html();
			var rawText = $('#wmd-input').val();
			var errors = $('.inputtags__errors');
            var elements = $('.inputtags__element');
            
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


		document.getElementsByClassName("content")[0].addEventListener("click", function (e) {
			var element = e.target;
			console.log(element);
			if(element.id.includes("editLink"))
			{

				localStorage.editAnswerId = element.id.substring(8);
				window.location.href = "edit.html";

			}
		});	
	},


	appendAnswers:function(voteUpId,voteCountId,voteDownId,editLinkId,i)
	{
		return '<div class="answer-padding">'+
				'<table>'+
					'<tbody>'+
					'<tr>'+
						'<td class="votecell">'+
							'<div class="votecell__vote">'+
								'<i class="fa fa-sort-asc fa-3x colorless" id="'+voteUpId+'"></i>'+
								'<div class="votecount" id="'+voteCountId+'">'+answerController.getVoteCount(i)+'</div>'+
								'<i class="fa fa-sort-desc fa-3x colorless" id="'+voteDownId+'"></i>'+
							'</div>'+
						'</td>'+
						'<td class="postcell">'+
							'<div class="postcell__posttext">'+answerController.getAnswerText(i)+'</div>'+
							'<div class="postcell__postfooter">'+
								'<div class="postcell__postfooter__posteditdiv">'+
									'<a class="postcell__postfooter__posteditdiv__editlink" id="'+editLinkId+'">Edit</a>'+
								'</div>'+
								'<div class="postcell__postfooter__info">'+
									"answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(i))+
									'<div class="postcell__postfooter__info__userinfo">'+answerController.getUserName(i)+'</div>'+
								'</div>'+
							'</div>'+
						'</td>'+
					'</tr>'+
					'</tbody>'+
				'</table>'+
			'</div>'
	},


	render:function()
	{
		var answershtml = '';
		for(var i=0;i<answers.length;i++)
		{
			answershtml = answershtml + this.appendAnswers("voteup"+(i+1),"votecount"+(i+1),"votedown"+(i+1),"editLink"+(i+1),i);
		}
		$(".answers").append(answershtml);	
	},


	addNewAnswer:function(i)
	{
		var appendhtml = this.appendAnswers("voteup"+(i+1),"votecount"+(i+1),"votedown"+(i+1),"editLink"+(i+1),i);
			
			$(".answers").append(appendhtml);	
			$(".noofanswers").text(answerController.getNoOfAnswers());
	},

	addTags:function()
	{
		var tagshtml = '';
		var tags = answerController.getTags();
		for(var i=0;i<tags.length;i++)
		{
			tagshtml = tagshtml + this.appendTag(tags[i]);
		}
		console.log(tagshtml);
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
		postFooterHtml =  'asked '+answerController.getTimeDifference(new Date(),answerController.getQuestionPostingTime())+'<div class="postcell__postfooter__info__userinfo">'+answerController.getAsker();+'</div>';
		$(".postcell__postfooter__info").html(postFooterHtml);
	},
	changeCount:function(i)
	{
		//console.log("Here");
		$("#votecount"+(i)).text(answerController.getVoteCount(i-1));
	}
};
answerController.init();
});