$(function(){
<<<<<<< HEAD

    var quesId;
    if(localStorage.questions!==undefined){
        console.log("iamhere");
        quesId=parseInt(JSON.parse(localStorage.maxid));
        //console.log(localStorage.maxid);
        //console.log(quesId);
    }
    else
        quesId=1;
    //console.log(JSON.parse(localStorage.questions).id);
    var questions= [];
    var tags = ['JavaScript','HTML','CSS','Java','Swing','AngularJS','BackboneJS','React'];
=======
    
    var questions = [];
    if(!localStorage.author){
        localStorage.author = "Anonymous";
    }
    if(!localStorage.questions){
        localStorage.questions = questions;
    }
    else
    {
        questions = JSON.parse(localStorage.questions);
    }
    var quesId= questions.length+1;
    var allTags = JSON.parse(localStorage.tags);
    console.log(allTags);
    var tags = [];
    for (var i = allTags.length - 1; i >= 0; i--) {
        tags[i] = allTags[i].tag_name;
    };
    console.log(tags);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
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
<<<<<<< HEAD
        this.answers = [];
        this.author = author;
        this.views=0;
        this.votes=0;
        this.time= new Date();
        
=======
        this.author = author;
        this.answers = [];
        this.votes = 0;
        this.views = 0;
        this.time = new Date();
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
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

<<<<<<< HEAD
=======
    var getTags = function(){
        return JSON.parse(localStorage.tags);
    }

>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
    /* Question model in the question */
    var model = {
        init: function(){

        },

        add:function(title,text,tags){
            var question = new Question(title,text,tags,getAuthor());
            question.id = question.id();
<<<<<<< HEAD
            //localStorage.questions.maxid=JSON.stringify(quesId);
            if(localStorage.questions!==undefined)
            questions=JSON.parse(localStorage.questions);
            questions.push(question);

            localStorage.questions = JSON.stringify(questions);
            //console.log('hello');
            //console.log(quesId);
            localStorage.maxid=quesId;
=======
            questions.push(question);
            localStorage.questions = JSON.stringify(questions);
            var tagsArray = getTags();
            for (var i = tagsArray.length - 1; i >= 0; i--) {
                for(var j=tags.length-1;j>=0;j--){
                    if(tags[j] == tagsArray[i].tag_name){
                        tagsArray[i].questionId.push(question.id);
                    }
                }
            };
            localStorage.tags = JSON.stringify(tagsArray);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
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
<<<<<<< HEAD
                var text = $('#wmd-input').val();
=======
                var text = $('#wmd-preview').html();
                console.log(text);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
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
<<<<<<< HEAD
=======
                    window.location.href="index.html";
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
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