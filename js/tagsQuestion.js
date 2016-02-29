<<<<<<< HEAD
$(function(){
    var questions = JSON.parse(localStorage.questions);
    var tags = JSON.parse(localStorage.tags);
    var tagId = localStorage.currentTag;
    // console.log(tags[tagId].questionId);
    // questionselem.tags.forEach(function(element,index,a){
    //             tagstr+='<a href="#" class="tags">'+element+'</a>';
    //         });
    var tagstr;
    var htmlStr = "";
    var listelem=document.getElementById('questionlist');
    tags[tagId].questionId.forEach (function(elem,i,array) {
        console.log(elem);
        tagstr="";
        questions[elem].tags.forEach(function(element,index,a){
            tagstr+='<a href="#" class="tags">'+element+'</a>';
        });
        var questionblock= document.createElement('div');
        questionblock.className='question';
        questionblock.id='question'+i;
        htmlStr = '<div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn" data-id='+i+' >'+
            '                           <div class="mini-counts"><span class="x">'+questions[elem-1].votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '                       </div>'+
            '               <div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color">'+
            '               <div class="mini-counts"><span class="x--mod">'+questions[elem-1].answers.length+'</span></div>'+
            '                       <div class="name--mod">answers</div>'+
            '                       </div>'+
            '                       <div id="viewbtn'+i+'" class="question__vav__btn" onclick="view.index2setter(this,'+i+')">'+
            '                           <div class="mini-counts"><span class="x">'+questions[elem-1].views+'</span></div>'+
            '                           <div class="name">views</div>'+
            '                       </div>'+
            '            </div>'+
            '                   <div class="question__summary">'+
            '                       <div class="question__summary__ques">'+
            '                           <h3><a href="questionanswer.html"  class="question-link">'+questions[elem-1].title+'</a></h3>'+
=======
 model={
        init:function(){
            this.questions = JSON.parse(localStorage.questions);
            this.tags = JSON.parse(localStorage.tags);
            this.tagId = localStorage.currentTag;
        },
        question:[],
        tags:[]
    };
    octopus={
        init:function(){
            model.init();
            view.init();
        },
        getQuestions: function () {
            return model.questions;
        },
        getTags: function(){
            return model.tags;
        },
        getTagId :function(){
            return model.tagId;
        }

    };
 var utilityFunctions={
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
     }
 };

var view={
    init:function(){
        if(!localStorageGet("currentQuestionId")){
            localStorageSet("currentQuestionId",1);
        }
        this.listelem=document.getElementById('questionlist');

        this.listelem.addEventListener('click',function (e){
            //console.log(e.target,"hellohi", e.target.parentNode);
            //console.log(e.target.parentNode.dataset.id,'what is this')
            var x= e.target;
            console.log(x, "second",x.parentNode);
            while(x.dataset.id===undefined){
                console.log(x.parentNode);
                x= x.parentNode;
            }
            var questionSummary=octopus.getQuestions();
            questionSummary[parseInt(x.dataset.id)].views++;
            localStorageSet("currentQuestionId",questionSummary[parseInt(x.dataset.id)].id);
            localStorageSet("questions",questionSummary);
        });

        this.render();
    },
    addHTML:function(elem,i,tagstr){
        return '<div class="question" data-id="'+i+'"><a href="questionanswer.html"><div class="question__vav">'+view.votesBtnRender(elem.votes)+
            view.answerBtnRender(elem.answers.length)+
            view.viewsBtnRender(elem.views)+
            '            </div></a>'+
            '                   <div class="question__summary">'+
            '                       <div class="question__summary__ques" >'+
            '                           <h3><a href="questionanswer.html"  class="question-link">'+elem.title+'</a></h3>'+
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            '                       </div>'+
            '                       <div class="question__summary__tags">'+
            tagstr+
            '                       </div>'+
<<<<<<< HEAD
            '                       <div id="author'+i+'" class="question__summary__author">'+
            '                           <div class="author">'+
            
            '                               <a href="#">'+questions[elem-1].author+'</a>'+
            '                               </author>'+
            '                           </div>'+
            '                       </div>'+
            '                   </div>';
            questionblock.innerHTML=htmlStr;
            listelem.appendChild(questionblock);
            // $('#questionlist').html(htmlStr);
    });
    
}());
=======
            '                       <div class="question__summary__author">'+
            '                           <div class="author">'+
            utilityFunctions.getTimeDifference(new Date(),Date.parse(elem.time))+
            '                               <a href="#">'+elem.author+'</a>'+
            '                               </author>'+
            '                           </div>'+
            '                       </div>'+
            '                   </div>' +
            '                  </div>';


    },
    render:function(){
        var htmlstr='',questionSummary =octopus.getQuestions(),tags=octopus.getTags(),tagId=octopus.getTagId();
        tags[tagId].questionId.forEach(function(elem,i,array){
            var tagstr='';
            questionSummary[elem-1].tags.forEach(function(element,index,a){
                tagstr+='<a href="#" class="tags">'+element+'</a>';
            });
            htmlstr+=view.addHTML(questionSummary[elem-1],i,tagstr);

        });
        this.listelem.innerHTML=htmlstr;
    },
    answerBtnRender:function(length){
        var flag;
        if(length==0)
            flag=1;
        else
            flag=0;
        return '               <div id="answerbtn" '+((flag)? "class=question__vav__btn": "class=question__vav__btn--color")+'>'+
            '               <div class="mini-counts"><span class="x">'+length+'</span></div>'+
            '                       <div class="name">answers</div>'+
            '                       </div>';
    },

    viewsBtnRender: function(views){
        return '                       <div  class="question__vav__btn">'+
            '                           <div class="mini-counts"><span class="x">'+views+'</span></div>'+
            '                           <div class="name">views</div>'+
            '                       </div>';
    },
    votesBtnRender: function(votes){
        return '<div  class="question__vav__btn"  >'+
            '                           <div class="mini-counts"><span class="x">'+votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '</div>';
    }
}
octopus.init();
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
