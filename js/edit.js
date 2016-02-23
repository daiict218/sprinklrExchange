$(function(){
    
    var questions = [];
    if(!localStorage.questions){
        localStorage.questions = questions;
    }
    else
    {
        questions = JSON.parse(localStorage.questions);
    }
    currentQuestionId = parseInt(localStorage.currentQuestionId);
    // var quesId= localStorage.currentQuestionId;
    var allTags = JSON.parse(localStorage.tags);
    console.log(allTags);
    var tags = [];
    for (var i = allTags.length - 1; i >= 0; i--) {
        tags[i] = allTags[i].tag_name;
    };
    // console.log(tags);

    // if(!localStorage.author)
    //     localStorage.author = "Anonynous";

    /* Constructor function for the question */
    // var Question = function(title,text,tags,author){
    //     this.title = title;
    //     this.text = text;
    //     this.tags = tags;

    //     this.author = author;
    //     this.answers = [];
    //     this.votes = 0;
    //     this.views = 0;
    //     this.time = new Date();
    // }

    // Question.prototype.id = function(){
    //     return quesId++;
    // }


    /*Some getters and setters for localStorage*/

    var getAuthor = function(){
        return localStorage.author;
    };

    /* Question model in the question */
    var model = {
        init: function(){

        },

        // add:function(title,text,tags){
        //     var question = new Question(title,text,tags,getAuthor());
        //     question.id = question.id();
        //     questions.push(question);
        //     localStorage.questions = JSON.stringify(questions);
        //     var tagsArray = getTags();
        //     for (var i = tagsArray.length - 1; i >= 0; i--) {
        //         for(var j=tags.length-1;j>=0;j--){
        //             if(tags[j] == tagsArray[i].tag_name){
        //                 tagsArray[i].questionId.push(question.id);
        //             }
        //         }
        //     };
        //     localStorage.tags = JSON.stringify(tagsArray);
        // },
        getAllQuestions: function() {
            return questions;
        }
    };


    var octopus = {
        // addNewQuestion:function(title,text,tags){
        //     model.add(title,text,tags);
        //     view.render();
        // },

        getQuestions: function() {
            return model.getAllQuestions();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init:function(){
            //console.log("qqqq",questions[currentQuestionId-1]);
            $('.input_element').val(questions[currentQuestionId-1].title);
            $('#wmd-input').val(questions[currentQuestionId-1].rawText);
            $('#btn-submit').click(function(e){
                var title = $('.input_element1').val();
                // console.log(title);
                var text = $('#wmd-preview').html();
                console.log(text);
                var errors = $('.inputtags__errors');
                var elements = $('.inputtags__element');
                var message = [];
                var selected = $("#options option:selected");
                selected.each(function (i) {
                    message[i] = $(this).text();
                });
                if(title === ""){
                    errors.html("Empty title");
                }
                else if(text === ""){
                    errors.html("Empty Body");   
                }
                else if(message.length === 0){
                    errors.html("No tags selected");   
                }
                else{
                    octopus.addNewQuestion(title,text,message);
                    window.location.href="index.html";
                }   
                e.preventDefault();
            });
            view.render();
        },
        render:function(){
            // $('#viewTemp').html(octopus.getQuestions()[0]);
           // console.log(questions);
           var htmlStr = '';
           for (var i = 0; i < tags.length; i++) {
               htmlStr += "<option value="+(i+1)+">"+tags[i]+"</option>"
           };        
           //console.log(htmlStr);
           $("#options").html(htmlStr);
        }
    };
    octopus.init();
});