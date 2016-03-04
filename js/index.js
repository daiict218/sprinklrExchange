var model = {
    questionSummary:[],
    noOfQuestions:0,
    init: function () {
        // if (!localStorage.getItem("questions")) {
        //     localStorage.setItem("questions", JSON.stringify([]));
        // }
        if(!localStorage.getItem("noOfQuestions")){
            localStorage.setItem("noOfQuestions",JSON.stringify(0));
        }
        else{   
         model.noOfQuestions = localStorage.getItem("noOfQuestions");
        }

        if (!localStorage.getItem("author")) { //todo
            localStorage.setItem("author","Anonymus");
        }
        if (!localStorage.getItem("currentQuestionId")) {
            localStorage.setItem("currentQuestionId", '1');
        }
        for(var index=1;index<=this.noOfQuestions;index++)
            this.questionSummary.push(JSON.parse(localStorage.getItem("question"+index)));
    },
    getAllQuestions: function () { //todo
        return this.questionSummary;
    },
    increment: function(questionBlockId) {
        this.questionSummary[questionBlockId].views++;
    },
    setter: function(property,value){
        localStorage.setItem(property, JSON.stringify(value));
    }
};
var octopus = {
    init: function () {
        model.init();
        view.init();
    },
    getQuestions: function () {
        return model.getAllQuestions();
    },
    set: function (property, value) { //todo
        model.setter(property,value);
    },
    incrementViews: function(questionBlockId){
      model.increment(questionBlockId);
    }
};

var utilityFunctions = {
    getTimeDifference: function (current, previous) {
        //todo:var
        var msPerMinute = 60 * 1000,msPerHour = msPerMinute * 60,msPerDay = msPerHour * 24,msPerMonth = msPerDay * 30,msPerYear = msPerDay * 365,elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
}
var view = {
    init: function () {

        //todo: camelCase
        this.listElem = document.getElementById('questionlist');
        var questionSummary = octopus.getQuestions();
        this.listElem.addEventListener('click', function (e) {
            //todo: var
            var targetEl = e.target;
            var isValidClick = 0;
            while (targetEl.dataset.id === undefined) {
                if (targetEl.dataset.flagger == 1)
                    isValidClick = 1;
                targetEl = targetEl.parentNode;
            }

            if (isValidClick) {
                octopus.incrementViews(parseInt(targetEl.dataset.id));
            }
            octopus.set("currentQuestionId", questionSummary[parseInt(targetEl.dataset.id)].id);
            octopus.set("question"+questionSummary[parseInt(targetEl.dataset.id)].id, questionSummary[parseInt(targetEl.dataset.id)]);
        });

        this.render();
    },
    //todo: rename `i`
    questionBlockRender: function (elem, index, tagstr) {
        return '<div class="question" data-id="' + index + '"><a class="question__vavlink" href="questionanswer.html"><div class="question__vav" data-flagger="1">' + view.votesBtnRender(elem.votes) +
            view.answerBtnRender(elem.answers.length) +
            view.viewsBtnRender(elem.views) +
            '            </div></a>' +
            '                   <div class="question__summary">' +
            '                       <div class="question__summary__ques">' +
            '                           <h3><a href="questionanswer.html" data-flagger="1"  class="question-link">' + elem.title + '</a></h3>' +
            '                       </div>' +
            '                       <div class="question__summary__tags">' +
            tagstr +
            '                       </div>' +
            '                       <div class="question__summary__author">' +
            '                           <div class="author">' +
            utilityFunctions.getTimeDifference(new Date(), Date.parse(elem.time)) +
            '                               <a href="#">' + elem.author + '</a>' +
            '                               </author>' +
            '                           </div>' +
            '                       </div>' +
            '                   </div>' +
            '                  </div>';


    },
    render: function () {
        var htmlStr = ''; //todo: camelCase
        //console.log(octopus.getQuestions()[0]);
        octopus.getQuestions().forEach(function (elem, index) { //todo: `i`
            //todo: camelCase
            //console.log(elem.tags,"elem");
            var tagStr = elem.tags.reduce(function (a, b) { //todo
                //console.log("I came here");
                return a + '<a href="#" class="tags">' + b + '</a>';
            }, '');
            htmlStr += view.questionBlockRender(elem, index, tagStr);
        });
        this.listElem.innerHTML = htmlStr;
    },
    answerBtnRender: function (length) {
        var flag = !length;
        return '               <div id="answerbtn" ' + ((flag) ? "class=question__vav__btn" : "class=question__vav__btn--color") + '>' +
            '               <div class="mini-counts"><span class="x">' + length + '</span></div>' +
            '                       <div class="name">answers</div>' +
            '                       </div>';
    },

    viewsBtnRender: function (views) {
        return '                       <div  class="question__vav__btn" >' +
            '                           <div class="mini-counts"><span class="x">' + views + '</span></div>' +
            '                           <div class="name">views</div>' +
            '                       </div>';
    },
    votesBtnRender: function (votes) {
        return '<div  class="question__vav__btn" >' +
            '                           <div class="mini-counts"><span class="x">' + votes + '</span></div>' +
            '                           <div class="name">votes</div>' +
            '</div>';
    }
}
octopus.init();
 