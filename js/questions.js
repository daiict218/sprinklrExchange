$(function(){
    
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
    // console.log("Hello world");
    var quesId= questions.length+1;
    var allTags = tags_init.tags;
    // console.log("Hello world");
    // console.log(allTags);
    var tags = [];
    for (var i = allTags.length - 1; i >= 0; i--) {
        tags[i] = allTags[i].tag_name;
    };
    


    /* Constructor function for the question */
    var Question = function(title,text,tags,author){
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.author = author;
        this.answers = [];
        this.votes = 0;
        this.views = 0;
        this.time = new Date();
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

    var getTags = function(){
        return JSON.parse(localStorage.tags);
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
            var tagsArray = getTags();
            for (var i = tagsArray.length - 1; i >= 0; i--) {
                for(var j=tags.length-1;j>=0;j--){
                    if(tags[j] == tagsArray[i].tag_name){
                        tagsArray[i].questionId.push(question.id);
                    }
                }
            };
            localStorage.tags = JSON.stringify(tagsArray);
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
            var button = $('#btn-submit');
            var dom = $('.mainbar');
            button.click(function(e){
                var title = dom.find("#input_element1").val();
                console.log(title);
                var text = dom.find("#wmd-preview").html();
                var errors = dom.find('.inputtags__errors');
                var elements = dom.find('.inputtags__element');
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
           var index = -1;
           var htmlStr = tags.reduce(function(a,b){
                index++;
                return a + "<option value="+(index+1)+">"+b+"</option>"; 
           },'');
           $("#options").html(htmlStr);
        }
    };
    octopus.init();
});