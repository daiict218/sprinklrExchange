$(function(){
	
var answerModel = {
		nextAnswerId : 0,
		currentQuestionId : 0,
		question : {},
		answersArray:[],
		hasVotedUp:[],	//0th index for question
		hasVotedDown:[],	

		init:function(){
			if(!localStorage.getItem('author'))
	    		localStorage.setItem('author',"Anonynous");
			
			answerModel.currentQuestionId = JSON.parse(localStorage.getItem('currentQuestionId'));
			
			answerModel.question = JSON.parse(localStorage.getItem('question'+answerModel.currentQuestionId));//questions[parseInt(answerModel.currentQuestionId)-1];
			answerModel.answersArray = answerModel.question.answers;

		},

		addAnswer:function(answer){

            answerModel.answersArray.push(answer);
            localStorage.setItem('question'+answerModel.currentQuestionId,JSON.stringify(answerModel.question));
		},

		getQuestionTitle:function(){
			return answerModel.question.title;
		},

		getQuestionVotes:function(){
			return answerModel.question.votes;	
		},

		getText:function(){
			return answerModel.question.text;
		},

		getQuestionPostingTime:function(){
			return Date.parse(answerModel.question.time);
		},

		getAsker:function(){
		 	return answerModel.question.author;
		},

		getTags:function(){
			return answerModel.question.tags;
		},

		getAuthor:function(){
			return localStorage.getItem('author');
		},

		getCurrentQuestionId:function(){
			return answerModel.currentQuestionId;
		},

		changeVoteCount:function(index,change) {
			answerModel.answersArray[index-1].votes += change;
			localStorage.setItem('question'+answerModel.currentQuestionId,JSON.stringify(answerModel.question));
		},

		changeQuestionVoteCount:function(change){
			answerModel.question.votes +=change;
			localStorage.setItem('question'+answerModel.currentQuestionId,JSON.stringify(answerModel.question));
			
		}

		
};


var answerController = {
	init:function(){
		answerModel.init();
		answerView.init();
	},

	getAnswersArray:function(){
		return answerModel.answersArray;
	},

	getCurrentAnswer:function(){
		return answerModel.currentAnswer;
	},

	setCurrentAnswer:function(answer){
		answerModel.currentAnswer = answer;
	},

	getVoteCount:function(index){
		return answerModel.answersArray[index].votes;
	},

	getAnswerText:function(index){
		return answerModel.answersArray[index].text;
	},

	getPostingTime:function(index){
		return Date.parse(answerModel.answersArray[index].time);
	},

	getUserName:function(index){
		return answerModel.answersArray[index].user;
	},
	changeVoteCount:function(index,countElement,change){
		if(index==0){
			answerModel.changeQuestionVoteCount(change);
			answerView.changeQuestionVoteCount();
		}else{
			answerModel.changeVoteCount(index,change);
			answerView.changeVoteCount(index,countElement);
		}
	},

	addNewAnswer:function(text,rawText){

		var newAnswer = {user:answerModel.getAuthor(),
						question:answerModel.getCurrentQuestionId(),
						text:text,
						rawText:rawText,
						votes:0,
						time:new Date(),
						verified:false,
						id:++answerModel.nextAnswerId

		};
		answerModel.addAnswer(newAnswer);
		answerView.addNewAnswer(answerModel.answersArray.length-1);
	},

	getQuestionTitle:function(){
		return answerModel.getQuestionTitle();
	},

	getQuestionVotes:function(){
		return answerModel.getQuestionVotes();	
	},

	getText:function(){
		return answerModel.getText();
	},

	getAnswers:function(){
		return answerModel.answers;
	},

	getNoOfAnswers:function(){
		return answerModel.answersArray.length;
	},

	getTimeDifference:function(current, previous) {
    
	    var msPerMinute = 60 * 1000,msPerHour = msPerMinute * 60,msPerDay = msPerHour * 24,msPerMonth = msPerDay * 30,msPerYear = msPerDay * 365;
	    
	    var elapsed = current - previous;
	    
	    if (elapsed < msPerMinute) {
	         return Math.round(elapsed/1000) + ' seconds ago';   
	    } else if (elapsed < msPerHour) {
	         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
	    } else if (elapsed < msPerDay ) {
	         return Math.round(elapsed/msPerHour ) + ' hours ago';   
	    } else if (elapsed < msPerMonth) {
	         return Math.round(elapsed/msPerDay) + ' days ago';   
	    }else if (elapsed < msPerYear) {
	         return Math.round(elapsed/msPerMonth) + ' months ago';   
	    }else {
	         return Math.round(elapsed/msPerYear ) + ' years ago';   
	    }
	},

	isAnswerVerified:function(index){	//After Backend Support and User Integration
		return answerModel.answersArray[index].verified;
	},

	getQuestionPostingTime:function(){
		return answerModel.getQuestionPostingTime();
	},

	getAsker:function(){
	 	return answerModel.getAsker();
	},

	getTags:function(){
		return answerModel.getTags();
	},


	setAnswers:function(answers){
		answerModel.answers = answers;
	},

	setVoted:function(isUpButton,index,toBeSet){
		if(isUpButton)
			answerModel.hasVotedUp[index] = toBeSet;		
		else
			answerModel.hasVotedDown[index] = toBeSet;	
	},

	getHasVoted:function(isUpButton,index){
		if(isUpButton)
			return !!(answerModel.hasVotedUp[index]);
		else
			return !!(answerModel.hasVotedDown[index]);
	}

};

var answerView = {
	init:function(){
		
		this.render();
		this.setEventHandlers();
		
		

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

	
	render:function(){
		this.jQuestionVotes = $("#questionvotes");
		this.jNoOfAnswers = $(".no-of-answers");
		this.jAnswers = $(".answers");
			
		$(".question-header__question-hyperlink").text(answerController.getQuestionTitle());
		this.jQuestionVotes.text(answerController.getQuestionVotes());
		$(".postcell__posttext").html(answerController.getText()); 
		
		this.renderTags();
		this.renderPostFooterInfo();
		
		answerController.setAnswers(answerController.getAnswersArray());

		this.jNoOfAnswers.text(answerController.getNoOfAnswers());
		
		var allAnswersHtmlString = '';
		answerController.getAnswers().forEach(function(element,index,array){
			allAnswersHtmlString = allAnswersHtmlString + answerView.getAnswerHtml(index);

		});
		this.jAnswers.append(allAnswersHtmlString);	
	},

	setEventHandlers:function(){
		this.setVoteCountHandler();

		var jAddAnswer = $(".addanswer");
		jAddAnswer.find("#btn-submit").click(function(e){
			var text = jAddAnswer.find('#wmd-preview').html(),
				rawText = jAddAnswer.find('#wmd-input').val(),
				errors = jAddAnswer.find('.inputtags__errors'),
				elements = jAddAnswer.find('.inputtags__element');
            
            if(text == ""){
                    errors.html("Empty Body");   
            }else{
				//console.log(text);
				errors.html("");
                answerController.addNewAnswer(text,rawText);
            }

            jAddAnswer.find('#wmd-input').val('');
            e.preventDefault();    
		});


		jAddAnswer.find("#btn-discard").click(function(e){
			jAddAnswer.find('#wmd-input').val('');
		});
	},

	setVoteCountHandler:function(){
		$(".content").on("click", function (e) {
				
				var targetElem = e.target,
					voteDetails,
					jParentNode;

				if (answerView.isAscending(targetElem) || answerView.isDescending(targetElem)){		//if (element.id.includes("voteup") || element.id.includes("votedown")
					jParentNode = $(targetElem).parent();
					
					voteDetails = {
						parentNode : jParentNode,
						upDownId : jParentNode[0].dataset.id,
						downElement : jParentNode.find(".fa-sort-desc")[0],
						upElement : jParentNode.find(".fa-sort-asc")[0],
						countElement : jParentNode.find(".votecount")[0],
						targetElem : targetElem
					}
					
					answerView.setVoteCountChange(voteDetails);
				}

		});
			

	},

	// setVoteCountChange:function(voteDetails){
	// 	var voteChange = 0;
	// 	if (voteDetails.targetElem.className.indexOf("asc") > -1) {
	// 		if (!answerController.getHasVotedUp(voteDetails.upDownId)) {
	// 			if (!answerController.getHasVotedDown(voteDetails.upDownId)) {
	// 				voteChange = 1;
	// 			}
	// 			else {
	// 				voteChange = 2;
	// 				answerController.cancelVotedDown(voteDetails.upDownId);
	// 				voteDetails.downElement.className = "fa fa-sort-desc fa-3x colorless";
	// 			}
	// 			voteDetails.targetElem.className = "fa fa-sort-asc fa-3x colored";
	// 			answerController.setVotedUp(voteDetails.upDownId);
	// 		}
	// 		else {
	// 			voteDetails.targetElem.className = "fa fa-sort-asc fa-3x colorless";
	// 			voteChange = -1;
	// 			answerController.cancelVotedUp(voteDetails.upDownId);
	// 		}
	// 	}
	// 	else {
	// 		if (!answerController.getHasVotedDown(voteDetails.upDownId)) {
	// 			if (!answerController.getHasVotedUp(voteDetails.upDownId)) {
	// 				voteChange = -1;
	// 			}
	// 			else {
	// 				voteChange = -2;
	// 				answerController.cancelVotedUp(voteDetails.upDownId)
	// 				voteDetails.upElement.className = "fa fa-sort-asc fa-3x colorless";
	// 			}
	// 			voteDetails.targetElem.className = "fa fa-sort-desc fa-3x colored";
	// 			answerController.setVotedDown(voteDetails.upDownId);
	// 		}
	// 		else {
	// 			voteDetails.targetElem.className = "fa fa-sort-desc fa-3x colorless";
	// 			voteChange = 1;
	// 			answerController.cancelVotedDown(voteDetails.upDownId);
	// 		}
	// 	}
	// 	answerController.changeVoteCount(voteDetails.upDownId,voteDetails.countElement, voteChange);

	// },
	setVoteCountChange:function(voteDetails){
		var oppositeVoteButton;
		if (answerView.isAscending(voteDetails.targetElem)) {
			oppositeVoteButton = voteDetails.downElement;
			answerView.setVoteCountUpDown(voteDetails,true,1,oppositeVoteButton);		//true for up and false for down
		} else {
			oppositeVoteButton = voteDetails.upElement;
			answerView.setVoteCountUpDown(voteDetails,false,-1,oppositeVoteButton);
		}

	},

	//This function is used for both voteup and vote down
	//countMultiplier negates the votes to be changed(eg if in voteup I want to change vote by +1 , in downvote it will change by -1)
	//isUpButton checks whether upbutton was clicked or downbutton was clicked
	//oppositeViteButton contains opposite element,for upvote it contains downvote element and viceversa.
	setVoteCountUpDown:function(voteDetails,isUpButton,countMultiplier,oppositeVoteButton)
	{
			
			if (!answerController.getHasVoted(isUpButton,voteDetails.upDownId)) {
				if (!answerController.getHasVoted(!isUpButton,voteDetails.upDownId)) {
					voteChange = 1*countMultiplier;
				}
				else {
					voteChange = 2*countMultiplier;
					answerController.setVoted(!isUpButton,voteDetails.upDownId,false);
					$(oppositeVoteButton).attr('class',answerView.getChangedClassName(!isUpButton,"colorless"));//"fa fa-sort-desc fa-3x colorless";
				}
				$(voteDetails.targetElem).attr('class',answerView.getChangedClassName(isUpButton,"colored"));//"fa fa-sort-asc fa-3x colored";
				answerController.setVoted(isUpButton,voteDetails.upDownId,true);
			}
			else {
				$(voteDetails.targetElem).attr('class',answerView.getChangedClassName(isUpButton,"colorless"));//"fa fa-sort-asc fa-3x colorless";
				voteChange = -1*countMultiplier;
				answerController.setVoted(isUpButton,voteDetails.upDownId,false);
			}
			answerController.changeVoteCount(voteDetails.upDownId,voteDetails.countElement, voteChange);
	},
	getChangedClassName:function(isUpButton,color)
	{
		if(isUpButton)
			return "fa fa-sort-asc fa-3x "+color;
		else
			return "fa fa-sort-desc fa-3x "+color;
	},

	isAscending:function(targetElem)
	{
		var targetClassName = $(targetElem).attr('class');
		if(targetClassName)
			return targetClassName.indexOf("asc") > -1;
		else
			return false;
	},

	isDescending:function(targetElem)
	{
		var targetClassName = $(targetElem).attr('class');
		if(targetClassName)
			return targetClassName.indexOf("desc") > -1;
		else
			return false;
	},

	getAnswerHtml:function(index){
		return '<div class="answer-closure">'+
					'<div class="votecell">'+
						'<div class="votecell__vote" data-id="'+(index+1)+'">'+
							'<i class="fa fa-sort-asc fa-3x colorless"></i>'+
							'<div class="votecount">'+answerController.getVoteCount(index)+'</div>'+
							'<i class="fa fa-sort-desc fa-3x colorless"></i>'+
						'</div>'+
					'</div>'+
					'<div class="postcell">'+
						'<div class="postcell__posttext">'+answerController.getAnswerText(index)+'</div>'+
						'<div class="postcell__postfooter clearfix">'+
							'<div class="postcell__postfooter__info">'+
								"<div> answered "+answerController.getTimeDifference(new Date(),answerController.getPostingTime(index))+'</div>'+
								'<div class="postcell__postfooter__info__userinfo">'+answerController.getUserName(index)+'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
	},

	addNewAnswer:function(index){
			var answerHtml = this.getAnswerHtml(index);
			
			
			
			this.jAnswers.append(answerHtml);	
			this.jNoOfAnswers.text(answerController.getNoOfAnswers());
	},

	renderTags:function(){
		var tagshtml = '',
			tags = answerController.getTags();

		tags.forEach(function(element,index,array){
			tagshtml = tagshtml + answerView.getTag(tags[index],index);
		});

		$(".postcell__posttaglist").html(tagshtml);
	},

	getTag:function(tag,index){
		return '<div class="tag" id="'+index+'">'+tag+'</div>';
	},

	changeQuestionVoteCount:function(){
		this.jQuestionVotes.text(answerController.getQuestionVotes());
	},

	renderPostFooterInfo:function(){
		var postFooterHtml =  '<div>asked '+answerController.getTimeDifference(new Date(),answerController.getQuestionPostingTime())+'</div><div class="postcell__postfooter__info__userinfo">'+answerController.getAsker();+'</div>';
		$(".postcell__postfooter__info").html(postFooterHtml);
	},

	changeVoteCount:function(index,countElement){
		$(countElement).text(answerController.getVoteCount(index-1));
	}
};
answerController.init();
});