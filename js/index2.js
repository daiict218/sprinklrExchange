$(function(){
    var quesId= 1;
    var questions= [];
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
            sideView.init();
        }
    };


    var view = {
        init:function(){
            var ulist=document.createElement('ul');
            for(i=0;i<10;i++){
                var listelem=document.createElement('li');
                listelem.textContent="hahah";
                ulist.appendChild(listelem);
            }
             ulist.style.display='none';
             var inputtags=document.getElementsByClassName('inputtags__element');
            //console.log(inputtags);
            body.appendChild(ulist);

             tags.keyup=function(){
             ulist.diplay='';
             }
            body.appendChild(ulist);
            console.log(ulist);
            $('#btn-submit').click(function(){
                var title = $('#input_element1').val();
                console.log(title);
                var text = $('#wmd-input').val();
                console.log(text);
                var tags = $('#input_element2').val();
                console.log(tags);
                var values = tags.split(',');
                //console.log(values);
                octopus.addNewQuestion(title,text,tags);
                view.render();

            });
            view.render();
        },
        render:function(){
            if(octopus.getQuestions()[0]){
                $('.inputtags__element').text("Achut is so great");
                //console.log($(".inputtags__element").text());
                console.log(octopus.getQuestions()[0].tags);
            }
            else
                $('.inputtags__element').text('');
        }
    };
    var sideView ={
        init: function(){
            var title =document.getElementById('input_element1');
            var text = document.getElementById('wmd-input');
            var tags = document.getElementById('input_element2');
            var topPoster=document.getElementById('newbie-upper');
            var lowerPoster = document.getElementById('newbie-lower');
            title.addEventListener('click',function(){
               lowerPoster.style.display='none';
               topPoster.style.display='block';
            });
            text.addEventListener('click',function(){
                topPoster.style.display='none';
                lowerPoster.style.display='block';
            });

                        }
    }
    octopus.init();
});