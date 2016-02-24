model={
    init:function(){
        this.questions = JSON.parse(localStorage.questions);
        this.searchResult = JSON.parse(localStorage.searchResult);
        //console.log(this.searchResult);
            //this.tagId = localStorage.currentTag;
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
    getsearchResult: function(){
        return model.searchResult;
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
        if(!localStorage.currentQuestionId){
            localStorage.currentQuestionId=1;
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
            '                       </div>'+
            '                       <div class="question__summary__tags">'+
            tagstr+
            '                       </div>'+
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
        var htmlstr='',questionSummary =octopus.getQuestions(),searchResult=octopus.getsearchResult();
        console.log(searchResult,"ssss");
        searchResult.forEach(function(elem,i,array){
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