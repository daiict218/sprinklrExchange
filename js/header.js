$(function () {


    var model = {
        questions:[],
        noOfQuestions:0,
        init: function(){
            if(!localStorage.noOfQuestions)
                localStorage.noOfQuestions = 0;
            else
                noOfQuestions = JSON.parse(localStorage.noOfQuestions);
            for(var index=1;index<=noOfQuestions;index++)
            {
                model.questions.push(JSON.parse(localStorage.getItem('question'+index)));
            }
        },
        getQuestionArray: function(){
            return  model.questions;
        },
        getQuestion: function(questionId,questionArray){
            return questionArray[questionId];

        }
    };


    var octopus = {
        init: function() {
            model.init();
            view.init();
        },


        search:function(searchText,iterator,questionArray){

            var regexObject = new RegExp(searchText);
            var question= model.getQuestion(iterator,questionArray);
            var questionText=JSON.stringify(question.text+question.title);

            var objectString=questionText.toLowerCase();
            return regexObject.test(objectString);
        },
        getQuestionLength:function(){
            return model.getQuestionArray().length;
        }


    };


    var view = {
        init: function () {
            //console.log('ghdjweghwjegw');
            $("#searchAll").keyup(function(e) {

                var filterString = document.getElementById("searchAll").value;
                filterString = filterString.toLowerCase();

                var len = octopus.getQuestionLength();
                var questionArray=model.getQuestionArray();
                var resultArray=[];
                for (var i = 0; i < len; i++) {
                    if (octopus.search(filterString, i,questionArray)) {
                        resultArray.push(i+1);
                    }

                }

                localStorage.searchResult=JSON.stringify(resultArray);

            });
        }
    };




    octopus.init();
});