$(function(){
var answerModel = {
		currentAnswer : null,
		details: [
		{
			user:"Karan Tankshali",	//id
			question:1,
			text:"dgfghdjf dfhjkdsfhdjk sdgjfgkd dhfjskdfhjdskff dhfksdfjh",
			//upvotes:5,
			//downvotes:3,
			votes:2,
			time:3,
			verified:true
		},
		{
			user:"Ajay Gaur",	//id
			question:1,
			text:`<p>Hello</p><p>sfhgjk</p><p>dhfjkdfsf</p><p>djkfsdfsdf</p><p>fsdf</p>`,
			//upvotes:4,
			//downvotes:6,
			votes:-2,
			time:4,
			verified:true
		}

		],
};
var answerController = {
	init:function()
	{
		answerView.init();
	},
	getAnswers:function()
	{
		return answerModel.details;
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
		return answerModel.details[i].votes;
	},
	getAnswerText:function(i)
	{
		return answerModel.details[i].text;
	},
	getPostingTime:function(i)
	{
		return answerModel.details[i].time;
	},
	getUserName:function(i)
	{
		return answerModel.details[i].user;
	},
	changecount:function(i,change)
	{
		answerModel.details[i-1].votes += change;
		answerView.changecount(i);
	}
};
var answerView = {
	init:function()
	{
		answers = answerController.getAnswers();
		$(".noofanswers").text(answers.length);
		this.render();
		$(".vote").click(function(e)		//will be changed once user is associated
		{
			var element = e.toElement;
			
			var updownid = element.id;
			var tobechanged = updownid.slice(-1);
			var downelement = document.getElementById("votedown"+tobechanged);
			var upelement = document.getElementById("voteup"+tobechanged);
			//console.log(downelement);
			if(updownid.includes("up"))
			{	
				if(element.className.includes("grey"))
				{
					if(downelement.className.includes("grey"))
					{
						answerController.changecount(tobechanged,1);
					}
					else
					{
						answerController.changecount(tobechanged,2);
						downelement.className = "fa fa-sort-desc fa-3x grey vote";
					}
					element.className = "fa fa-sort-asc fa-3x orange vote";	
				}
				else
				{

				}
			}
			else
			{
				if(element.className.includes("grey"))
				{
					if(upelement.className.includes("grey"))
					{
						answerController.changecount(tobechanged,-1);
					}
					else
					{
						answerController.changecount(tobechanged,-2);
						upelement.className = "fa fa-sort-asc fa-3x grey vote";
					}
					element.className = "fa fa-sort-desc fa-3x orange vote";
				}
				else
				{

				}	
			}
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
			postfooterinfo.textContent = "answered "+answerController.getPostingTime(i) + " hours ago";
			postfooter.appendChild(postfooterinfo);
			var userinfo = document.createElement("div");
			userinfo.className = "postcell__postfooter__info__userinfo";
			userinfo.innerHTML = answerController.getUserName(i);
			postfooterinfo.appendChild(userinfo);

		}	
	},
	changecount:function(i)
	{
		//console.log("Here");
		$("#votecount"+(i)).text(answerController.getVoteCount(i-1));
	}
};
answerController.init();
});