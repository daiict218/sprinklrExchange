<<<<<<< HEAD
var Model={
    init:function(){
            if (!localStorage.questions) {
                localStorage.questions = JSON.stringify([]);
            }
            this.questionSummary=JSON.parse(localStorage.questions);

=======

if(!localStorage.author){
    localStorage.author = "Anonymous";
}


var model={
    init:function(){
        if(!localStorageGet("questions")){
            localStorageSet("questions",[]);
        }
        this.questionSummary = localStorageGet("questions");
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
    },
    questionSummary:[
    ],
    getallQuestions: function () {
        return this.questionSummary;
    }

<<<<<<< HEAD
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
    
=======
};
var octopus={
    init: function(){
            model.init();
            view.init();
        },
    getQuestions: function(){
           return  model.getallQuestions();
    }
};
var utilityFunctions={
    getTimeDifference:function(current, previous) {

>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
<<<<<<< HEAD
        
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
        if(!localStorage.currentQuestionId)
            localStorage.currentQuestionId= 1;
        view.render();
    },
    addHTML:function(elem,i,tagstr){
<<<<<<< HEAD
        return '<div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn" data-id='+i+' onclick="view.index2setter(this,'+i+')"> '+
            '                           <div class="mini-counts"><span class="x">'+elem.votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '                       </div>'+
            '               <div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color" onclick="view.index2setter(this,'+i+')">'+
=======
        return '<div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn" data-id='+i+' >'+
            '                           <div class="mini-counts"><span class="x">'+elem.votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '                       </div>'+
            '               <div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color">'+
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            '               <div class="mini-counts"><span class="x--mod">'+elem.answers.length+'</span></div>'+
            '                       <div class="name--mod">answers</div>'+
            '                       </div>'+
            '                       <div id="viewbtn'+i+'" class="question__vav__btn" onclick="view.index2setter(this,'+i+')">'+
            '                           <div class="mini-counts"><span class="x">'+elem.views+'</span></div>'+
            '                           <div class="name">views</div>'+
            '                       </div>'+
            '            </div>'+
            '                   <div class="question__summary">'+
<<<<<<< HEAD
            '                       <div class="question__summary__ques" onclick="view.index2setter(this,'+i+')">'+
=======
            '                       <div class="question__summary__ques">'+
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======

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
        if(!localStorageGet("currentQuestionId")){
            localStorageSet("currentQuestionId",1);
        }
        this.listelem=document.getElementById('questionlist');

            this.listelem.addEventListener('click',function (e){
                console.log(e.target,"hellohi", e.target.parentNode);
                console.log(e.target.parentNode.dataset.id,'what is this')
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
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            '                           <h3><a href="questionanswer.html"  class="question-link">'+elem.title+'</a></h3>'+
            '                       </div>'+
            '                       <div class="question__summary__tags">'+
            tagstr+
            '                       </div>'+
<<<<<<< HEAD
            '                       <div id="author'+i+'" class="question__summary__author">'+
            '                           <div class="author">'+
            octopus.getTimeDifference(new Date(),Date.parse(elem.time))
=======
            '                       <div class="question__summary__author">'+
            '                           <div class="author">'+
            utilityFunctions.getTimeDifference(new Date(),Date.parse(elem.time))+
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            '                               <a href="#">'+elem.author+'</a>'+
            '                               </author>'+
            '                           </div>'+
            '                       </div>'+
<<<<<<< HEAD
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
=======
            '                   </div>' +
            '                  </div>';


    },
    render:function(){
        var htmlstr='';
        var questionSummary =octopus.getQuestions();
        questionSummary.forEach(function(elem,i,array){
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            var tagstr='';
            elem.tags.forEach(function(element,index,a){
                tagstr+='<a href="#" class="tags">'+element+'</a>';
            });
<<<<<<< HEAD
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
<<<<<<< HEAD
               // console.log(element.title);
                c.className = 'x';
                n.className= 'name'
                answerbtn.style.background='white';
                //console.log(answerbtn);
=======
                console.log(element.title);
                c.className = 'x';
                n.className= 'name'
                answerbtn.style.background='white';
                console.log(answerbtn);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            }
            else {
                console.log(element.title, "hello");
                answerbtn.style.background = '#f69c55';
            }
        });
    },
   index2setter: function(e,i){
        var questionSummary=octopus.getQuestions();
        questionSummary[parseInt(i)].views++;
        console.log(i);
<<<<<<< HEAD
        localStorage.currentQuestionId=JSON.stringify(questionSummary[parseInt(i)].id);
        console.log('hello');
=======
        localStorage.currentQuestionId=questionSummary[parseInt(i)].id;
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
        console.log(localStorage.currentQuestionId);
       // console.log(elem);
       localStorage.questions=JSON.stringify(questionSummary);
    }
}
<<<<<<< HEAD
octopus.init();
=======
octopus.init();

var tags_init= {
        tags:[
            {
                tag_name:"JavaScript",
                tag_id:"0",
                total_questions:0,
                tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected.",
                questionId: []
            },
            {
                tag_name:"Java",
                tag_id:"1",
                total_questions:0,
                tag_summary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools.",
                questionId: []
            },
            {
                tag_name:"jQuery",
                tag_id:"2",
                total_questions:0,
                tag_summary:"jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API.",
                questionId: []
            },
            {
                tag_name:"HTML",
                tag_id:"3",
                total_questions:0,
                tag_summary:"HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5.",
                questionId: []
            },
            {
                tag_name:"CSS",
                tag_id:"4",
                total_questions:0,
                tag_summary:"CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts.",
                questionId: []
            },
            {
                tag_name:"JSON",
                tag_id:"5",
                total_questions:0,
                tag_summary:"JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON",
                questionId: []
            },
            {
                tag_name:"AJAX",
                tag_id:"6",
                total_questions:0,
                tag_summary:"AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh",
                questionId: []
            },
            {
                tag_name:"Git",
                tag_id:"7",
                total_questions:0,
                tag_summary:"Git is an open-source distributed version control system (DVCS).",
                questionId: []
            }

        ]
    };

    if(!localStorage.tags){
        localStorage.tags = JSON.stringify(tags_init.tags);
    }
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
            htmlstr+=view.addHTML(elem,i,tagstr);

        });
        this.listelem.innerHTML=htmlstr;
    },
    answerBtnRender:function(length){
        var flag=!length;
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
