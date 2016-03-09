$(function(){
answerView = {
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
		var oppositeElement;
		if (answerView.isAscending(voteDetails.targetElem)) {
			oppositeElement = voteDetails.downElement;
			answerView.setVoteCountUpDown(voteDetails,"up","down",1,oppositeElement);
		} else {
			oppositeElement = voteDetails.upElement;
			answerView.setVoteCountUpDown(voteDetails,"down","up",-1,oppositeElement);
		}

	},
	setVoteCountUpDown:function(voteDetails,clicked,oppositeOfClicked,countMultiplier,oppositeElement)
	{
			
			if (!answerController.getHasVoted(clicked,voteDetails.upDownId)) {
				if (!answerController.getHasVoted(oppositeOfClicked,voteDetails.upDownId)) {
					voteChange = 1*countMultiplier;
				}
				else {
					voteChange = 2*countMultiplier;
					answerController.cancelVoted(oppositeOfClicked,voteDetails.upDownId);
					$(oppositeElement).attr('class',answerView.getChangedClassName(oppositeOfClicked,"colorless"));//"fa fa-sort-desc fa-3x colorless";
				}
				$(voteDetails.targetElem).attr('class',answerView.getChangedClassName(clicked,"colored"));//"fa fa-sort-asc fa-3x colored";
				answerController.setVoted(clicked,voteDetails.upDownId);
			}
			else {
				$(voteDetails.targetElem).attr('class',answerView.getChangedClassName(clicked,"colorless"));//"fa fa-sort-asc fa-3x colorless";
				voteChange = -1*countMultiplier;
				answerController.cancelVoted(clicked,voteDetails.upDownId);
			}
			answerController.changeVoteCount(voteDetails.upDownId,voteDetails.countElement, voteChange);
	},
	getChangedClassName:function(upDown,color)
	{
		if(upDown == "up")
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
});