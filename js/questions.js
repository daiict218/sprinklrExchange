$(function(){
    var quesId= 1;
    var questions= [];
    var tags = ['JavaScript','HTML','CSS','Java','swing'];
    var model = {
        init: function(){
            
        },

        add:function(title,text,tags){
            var question = {};
            question.id = quesId++;
            question.title = title;
            question.text = text;
            question.tags = tags;
            questions.push(question);
            //console.log(questions+" "+question);
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
            $('#btn-submit').click(function(){
                var title = $('#input_element1').val();
                console.log(title);
                var text = $('#wmd-input').val();
                console.log(text);
                var tags = $('#input_element2').val();
                //console.log(tags);
                var values = tags.split(', ');
                console.log(values);
                octopus.addNewQuestion(title,text,tags);
                view.render();
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
