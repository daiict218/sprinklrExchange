var model={
    init:function(){
        if(!localStorageGet("questions")){
            localStorageSet("questions",[]);
        }
        if(!localStorage.author){
            localStorage.author = "Anonymous";
        }
        if(!localStorageGet("currentQuestionId")){
            localStorageSet("currentQuestionId",1);
        }
        this.questionSummary = localStorageGet("questions");
    },
    getallQuestions: function () {
        return this.questionSummary;
    }

};
var octopus={
    init: function(){
            model.init();
            view.init();
        },
    getQuestions: function(){
           return  model.getallQuestions();
    },
    Set: function(property,value){
        localStorageSet(property,value);
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
}
var view={
    init:function(){
        
        this.listelem=document.getElementById('questionlist');

            this.listelem.addEventListener('click',function (e){
                //console.log(e.target,"hellohi", e.target.parentNode);
                //console.log(e.target.parentNode.dataset.id,'what is this')
                var x= e.target;
                //console.log(x, "second",x.parentNode);
                var flag=0;
                while(x.dataset.id===undefined){
                    //console.log(x.parentNode);
                    if(x.dataset.flagger==1)
                        flag=1;
                    x= x.parentNode;
                }
                var questionSummary=octopus.getQuestions();
                if(flag)
                    questionSummary[parseInt(x.dataset.id)].views++;
                octopus.Set("currentQuestionId",questionSummary[parseInt(x.dataset.id)].id);
                octopus.Set("questions",questionSummary);
            });

        this.render();
    },
    addHTML:function(elem,i,tagstr){
        return '<div class="question" data-id="'+i+'"><a href="questionanswer.html" ><div class="question__vav">'+view.votesBtnRender(elem.votes)+
                                 view.answerBtnRender(elem.answers.length)+
                view.viewsBtnRender(elem.views)+
            '            </div></a>'+
            '                   <div class="question__summary">'+
            '                       <div class="question__summary__ques">'+
            '                           <h3><a href="questionanswer.html" data-flagger="1"  class="question-link">'+elem.title+'</a></h3>'+
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
        var htmlstr='';
        var questionSummary =octopus.getQuestions();
        questionSummary.forEach(function(elem,i,array){
            var tagstr=elem.tags.reduce(function(a,b){
                return  a +'<a href="#" class="tags">'+b+'</a>';
            },'');
            htmlstr+=view.addHTML(elem,i,tagstr);

        });
        this.listelem.innerHTML=htmlstr;
    },
    answerBtnRender:function(length){
        var flag=!length;
       return '               <div id="answerbtn" data-flagger="1"'+((flag)? "class=question__vav__btn": "class=question__vav__btn--color")+'>'+
        '               <div class="mini-counts"><span class="x">'+length+'</span></div>'+
        '                       <div class="name">answers</div>'+
        '                       </div>';
    },

    viewsBtnRender: function(views){
        return '                       <div  class="question__vav__btn" data-flagger="1">'+
        '                           <div class="mini-counts"><span class="x">'+views+'</span></div>'+
        '                           <div class="name">views</div>'+
        '                       </div>';
    },
    votesBtnRender: function(votes){
        return '<div  class="question__vav__btn" data-flagger="1">'+
            '                           <div class="mini-counts"><span class="x">'+votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '</div>';
    }
}
octopus.init();
 