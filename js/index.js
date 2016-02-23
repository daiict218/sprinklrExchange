
if(!localStorage.author){
    localStorage.author = "Anonymous";
}


var Model={
    init:function(){
        if(!localStorageGet("questions")){
            localStorageSet("questions",[]);
        }
        this.questionSummary = localStorageGet("questions");
    },
    questionSummary:[
    ],
    getallQuestions: function () {
        return this.questionSummary;
    }

};//view onlcik
//answes
var octopus={
    init: function(){
            Model.init();
            view.init();
        },
    getQuestions: function(){
           return  Model.getallQuestions();
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
};

var view={
    init:function(){
        if(!localStorageGet("currentQuestionId")){
            localStorageSet("currentQuestionId",1);
        }
        // if(!localStorage.currentQuestionId)
        //     localStorage.currentQuestionId= 1;
        view.render();
    },
    addHTML:function(elem,i,tagstr){
        console.log(elem,elem.author );
        return '<a href="questionanswer.html"><div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn" data-id='+i+'  onclick="view.index2setter(this,'+i+')">'+
            '                           <div class="mini-counts"><span class="x">'+elem.votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '                       </div>'+
            '               <div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color" onclick="view.index2setter(this,'+i+')">'+
            '               <div class="mini-counts"><span class="x--mod">'+elem.answers.length+'</span></div>'+
            '                       <div class="name--mod">answers</div>'+
            '                       </div>'+
            '                       <div id="viewbtn'+i+'" class="question__vav__btn" onclick="view.index2setter(this,'+i+')">'+
            '                           <div class="mini-counts"><span class="x">'+elem.views+'</span></div>'+
            '                           <div class="name">views</div>'+
            '                       </div>'+
            '            </div></a>'+
            '                   <div class="question__summary">'+
            '                       <div class="question__summary__ques" onclick="view.index2setter(this,'+i+')">'+
            '                           <h3><a href="questionanswer.html"  class="question-link">'+elem.title+'</a></h3>'+
            '                       </div>'+
            '                       <div class="question__summary__tags">'+
            tagstr+
            '                       </div>'+
            '                       <div id="author'+i+'" class="question__summary__author">'+
            '                           <div class="author">'+
            octopus.getTimeDifference(new Date(),Date.parse(elem.time))+
            '                               <a href="#">'+elem.author+'</a>'+
            '                               </author>'+
            '                           </div>'+
            '                       </div>'+
            '                   </div>';
            //

    },
    render:function(){
        var listelem=document.getElementById('questionlist');
        var questionSummary =octopus.getQuestions();
        questionSummary.forEach(function(elem,i,array){
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
                htmlstr=view.addHTML(elem,i,tagstr);
            questionblock.innerHTML=htmlstr;
            listelem.appendChild(questionblock);
        });

        questionSummary.forEach(function(element,index,a){

            var answerbtn = document.getElementsByClassName('question__vav__btn question__vav__btn--color')[index+1];
            var c=answerbtn.childNodes[1].childNodes[0];
//console.log(answerbtn);
            //console.log(c.textContent);
            var n=answerbtn.childNodes[3];
            if(parseInt(c.textContent)==0) {
                // console.log(element.title);
                c.className = 'x';
                n.className= 'name'
                answerbtn.style.background='white';
                // console.log(answerbtn);
            }
            else {
                // console.log(element.title, "hello");
                answerbtn.style.background = '#f69c55';
            }
        });
    },
   index2setter: function(e,i){
        var questionSummary=octopus.getQuestions();
        questionSummary[parseInt(i)].views++;
        // console.log(questionSummary[parseInt(i)].id);
        localStorageSet("currentQuestionId",questionSummary[parseInt(i)].id);
        // localStorage.currentQuestionId=questionSummary[parseInt(i)].id;
        // console.log(localStorage.currentQuestionId);
       // console.log(elem);
       localStorageSet("questions",questionSummary);
       // localStorage.questions=JSON.stringify(questionSummary);
    }
}
octopus.init();
 