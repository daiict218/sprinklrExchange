var Model={
    init:function(){
            if (!localStorage.questions) {
                localStorage.questions = JSON.stringify([]);
            }
            this.questionSummary=JSON.parse(localStorage.questions);

    },
    questionSummary:[
        //{votes:10,answers:10,views:10,question:"how do i build stackoverflow front page?",tags:['javascript','html','stackoverflow'],askedby:'jithin',time:'about 1min ago'}
    ]
};
/*var answerbtn = document.getElementsByClassName('question__vav__btn question__vav__btn--color')[0];
var c=answerbtn.childNodes[1].childNodes[0];
//console.log(answerbtn);
var n=answerbtn.childNodes[3];
if(parseInt(c.textContent)==0) {
    c.className = 'x';
    n.className= 'name'
    answerbtn.style.background='white';
}
else
    answerbtn.style.background='orange';*/
var octopus={
    init: function(){
            Model.init();
            view.init();
        }

};

var view={
    init:function(){
        view.render();
    },
    render:function(){
        var listelem=document.getElementById('questionlist');
        Model.questionSummary.forEach(function(elem,i,array){
            //create one question and append it to question list
          //questiondiv
            var questionblock= document.createElement('div');
            var htmlstr='';

            var tagstr='';
            elem.tags.forEach(function(element,index,a){
                tagstr+='<a href="#" class="tags">'+element+'</a>';
            });
            questionblock.className='question';
            questionblock.id='question'+i;
                htmlstr='<div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn">'+
            '							<div class="mini-counts"><span class="x">'+elem.votes+'</span></div>'+
            '							<div class="name">votes</div>'+
            '						</div>'+
                    '				<div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color">'+
                    '				<div class="mini-counts"><span class="x--mod">'+elem.answers+'</span></div>'+
            '						<div class="name--mod">answers</div>'+
            '						</div>'+
                    '						<div id="viewbtn'+i+'" class="question__vav__btn">'+
                    '							<div class="mini-counts"><span class="x">'+elem.views+'</span></div>'+
                    '							<div class="name">views</div>'+
                    '						</div>'+
            '            </div>'+
                    '					<div class="question__summary">'+
                    '						<div class="question__summary__ques">'+
                    '							<h3><a href="#" class="question-link">'+elem.title+'</a></h3>'+
                    '						</div>'+
                    '						<div class="question__summary__tags">'+
                                                tagstr+
                    '						</div>'+
                    '						<div id="author'+i+'" class="question__summary__author">'+
                    '							<div class="author">'+
                    								elem.time+
                    '								<a href="#">'+elem.author+'</a>'+
                    '								</author>'+
                    '							</div>'+
                    '						</div>'+
                    '					</div>'
            questionblock.innerHTML=htmlstr;
            listelem.appendChild(questionblock);
        });
        //questionblock.innerHTML=htmlstr;
        //listelem.appendChild(questionblock);
    }
}
octopus.init();