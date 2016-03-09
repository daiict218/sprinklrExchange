$(function(){
answerController = {
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

	setVoted:function(upDown,index)
	{
		if(upDown=="up")
			answerModel.hasVotedUp[index] = true;		
		else
			answerModel.hasVotedDown[index] = true;	
	},
	cancelVoted:function(upDown,index)
	{
		if(upDown=="up")
			answerModel.hasVotedUp[index] = false;		
		else
			answerModel.hasVotedDown[index] = false;
	},

	getHasVoted:function(upDown,index)
	{
		if(upDown=="up")
			return !!(answerModel.hasVotedUp[index]);
		else
			return !!(answerModel.hasVotedDown[index]);
	}

};
answerController.init();
});