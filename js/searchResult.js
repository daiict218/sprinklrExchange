$(function () {
    var questionCache = [];
    var model = {
        getQuestionArray: function () {
            return JSON.parse(localStorage.getItem(question));
        },
        getMatchingQuestions: function () {
            return JSON.parse(localStorage.getItem(searchResult));
        }
    };
    var octopus = {
        init: function () {
            view.init();
        },

        cacheQuestionArray: function () {
            questionCache = model.getQuestionArray();
        },
        getQuestion: function (questionID) {
            return questionCache[questionID];

        },
        getVotes: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.votes;
        },
        getAnswerLength: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.answers.length;
        },
        getViews: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.views;
        },
        getSearchResultArray: function () {
            return model.getMatchingQuestions();
        },
        getTags: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.tags;
        },
        getAuthor: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.author;
        },
        getTitle: function (questionID) {
            var question = octopus.getQuestion(questionID);
            return question.title;
        },
    };
    var view = {
        init: function () {
            octopus.cacheQuestionArray();
            view.render();
        },

        render: function () {
            var tagString,
                htmlString = "",
                listElement = document.getElementById('questionlist');
            var arr = octopus.getSearchResultArray();
            arr.forEach(function (questionID, i, array) {
                tagString = "";
                octopus.getTags(questionID - 1).forEach(function (element, iterator, a) {
                    tagString += '<a href="#" class="tags">' + element + '</a>';
                });
                var questionBlock = document.createElement('div');
                questionBlock.className = 'question';
                questionBlock.id = 'question' + index;
                htmlString = '<div class="question__vav">' + '<div id="votesbtn' + index + '"class="question__vav__btn" data-id=' + index + ' >' +
                    '                           <div class="mini-counts"><span class="x">' + octopus.getVotes(questionID - 1) + '</span></div>' +
                    '                           <div class="name">votes</div>' +
                    '                       </div>' +
                    '               <div id="answerbtn' + index + '"class="question__vav__btn question__vav__btn--color">' +
                    '               <div class="mini-counts"><span class="x--mod">' + octopus.getAnswerLength(questionID - 1) + '</span></div>' +
                    '                       <div class="name--mod">answers</div>' +
                    '                       </div>' +
                    '                       <div id="viewbtn' + index + '" class="question__vav__btn" onclick="view.index2setter(this,' + index + ')">' +
                    '                           <div class="mini-counts"><span class="x">' + octopus.getViews(questionID - 1) + '</span></div>' +
                    '                           <div class="name">views</div>' +
                    '                       </div>' +
                    '            </div>' +
                    '                   <div class="question__summary">' +
                    '                       <div class="question__summary__ques">' +
                    '                           <h3><a href="questionanswer.html"  class="question-link">' + octopus.getTitle(questionID - 1) + '</a></h3>' +
                    '                       </div>' +
                    '                       <div class="question__summary__tags">' +
                    tagString +
                    '                       </div>' +
                    '                       <div id="author' + index + '" class="question__summary__author">' +
                    '                           <div class="author">' +

                    '                               <a href="#">' + octopus.getAuthor(questionID - 1) + '</a>' +
                    '                               </author>' +
                    '                           </div>' +
                    '                       </div>' +
                    '                   </div>';
                questionBlock.innerHTML = htmlString;
                listElement.appendChild(questionBlock);

            });


        }
    };
    octopus.init();


});