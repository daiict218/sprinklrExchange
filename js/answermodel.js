$(function(){
	
answerModel = {
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
});