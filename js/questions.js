$(function(){
    var quesId= 1;
    var questions= [];
    var tags = ['JavaScript','HTML','CSS','Java','Swing','AngularJS','BackboneJS','React'];
    // var questionCollection = {
    //     init: function () {
    //         this.questions = data.map(function (datum) {
    //             new QuestionModel(datum);
    //         });
    //     },
    //     add: function(datum){
    //         this.questions.push(new QuestionModel())
    //     }
    // };
    // var QuestionModel = function (questionProps) {
    //     this.data = questionProps;
    //     this.id = QuestionModel._getId();
    // };
    // QuestionModel.prototype = {
    //     constructor: QuestionModel,
    //     update: function (updatedProps) {
    //         this.data = updatedProps;
    //     }
    // };
    // QuestionModel._getId = function () {
    //     return 'q' + QuestionModel._counter++;
    // };
    // QuestionModel._counter = 0;


    /* Constructor function for the question */
    var Question = function(title,text,tags,author){
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.author = author;
    }

    Question.prototype.id = function(){
        return quesId++;
    }


    /*Some getters and setters for localStorage*/

    var getAuthor = function(){
        return localStorage.author;
    };

    var setAuthor = function(author){
        localStorage.author = author;
    }

    /* Question model in the question */
    var model = {
        init: function(){

        },

        add:function(title,text,tags){
            var question = new Question(title,text,tags,getAuthor());
            question.id = question.id();
            questions.push(question);
            localStorage.questions = JSON.stringify(questions);
        },
        getAllQuestions: function() {
            return questions;
        }
    };


    var octopus = {
        addNewQuestion:function(title,text,tags){
            model.add(title,text,tags);
            view.render();
        },

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
            $('#btn-submit').click(function(e){
                var title = $('#input_element1').val();
                // console.log(title);
                var text = $('#wmd-input').val();
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
