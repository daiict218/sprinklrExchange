$(function () {


    var model = {

        getQuestionArray: function () {
            return JSON.parse(localStorage.getItem(question));
        },
        getQuestion: function (questionId, questionArray) {
            return questionArray[questionId];

        }


    };


    var octopus = {
        init: function () {
            view.init();
        },


        search: function (searchText, iterator, questionArray) {

            var regexObject = new RegExp(searchText);
            var question = model.getQuestion(iterator, questionArray);
            var questionText = JSON.stringify(question.text + question.title);

            var objectString = questionText.toLowerCase();
            return regexObject.test(objectString);
        },
        getQuestionLength: function () {
            return model.getQuestionArray().length;
        }


    };


    var view = {
        init: function () {
            $("#searchAll").keyup(function (e) {
                if (e.keyCode == 13) {
                    var filterString = document.getElementById("searchAll").value;
                    filterString = filterString.toLowerCase();


                    var len = octopus.getQuestionLength();
                    var questionArray = model.getQuestionArray();
                    var resultArray = [];
                    for (var i = 0; i < len; i++) {

                        if (octopus.search(filterString, i, questionArray)) {
                            resultArray.push(i + 1);

                        }


                    }
                    localStorage.setItem(searchResult,JSON.stringify(resultArray)) ;
                }
            });
        }
    };


    octopus.init();
});

