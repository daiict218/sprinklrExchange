$(function () {
    var quesId = 1;
    var questions = [];
    var tags = ['JavaScript', 'HTML', 'CSS', 'Java', 'Swing', 'AngularJS', 'BackboneJS', 'React'];

/*    var questionCollection = {
        init: function () {
            this.questions = data.map(function (datum) {
                new QuestionModel(datum);
            });
        },
        add: function(datum){
            this.questions.push(new QuestionModel())
        }
    };

    var QuestionModel = function (questionProps) {
        this.data = questionProps;
        this.id = QuestionModel._getId();
    };

    QuestionModel.prototype = {
        constructor: QuestionModel,
        update: function (updatedProps) {
            this.data = updatedProps;
        }
    };

    QuestionModel._getId = function () {
        return 'q' + QuestionModel._counter++;
    };
    QuestionModel._counter = 0;
*/
    var model = {
        init: function () {

        },

        add: function (title, text, tags) {
            var question = {};
            question.id = quesId++;
            question.title = title;
            question.text = text;
            question.tags = tags;

            question.author = localStorage.author;
            question.time = new Date();
            question.votes = 0;
            question.answers = [];
            question.views = 0;
            if (questions.length > 0)
                questions = JSON.parse(localStorage.questions);
            questions.push(question);
            localStorage.questions = JSON.stringify(questions);

        },
        getAllQuestions: function () {
            return questions;
        }
    };


    var octopus = {
        addNewQuestion: function (title, text, tags) {
            model.add(title, text, tags);
            view.render();
        },

        getQuestions: function () {
            return model.getAllQuestions();
        },

        init: function () {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function () {
            $('#btn-submit').click(function (e) {
                var title = $('#input_element1').val();
                // console.log(title);
                var text = document.getElementById('wmd-preview').innerHTML;
                var errors = $('.inputtags__errors');
                var elements = $('.inputtags__element');
                var message = [];
                var selected = $("#options option:selected");
                selected.each(function (i) {
                    message[i] = $(this).text();
                });
                if (title === "") {
                    errors.html("Empty title");
                }
                else if (text === "") {

                    errors.html("Empty Body");
                }
                else if (message.length === 0) {
                    errors.html("No tags selected");
                }
                else {
                    //console.log('hello');
                    octopus.addNewQuestion(title, text, message);
                    window.location.href="index.html";
                }

                e.preventDefault();
            });
            view.render();
        },
        render: function () {
            // $('#viewTemp').html(octopus.getQuestions()[0]);

            // console.log(questions);
            var htmlStr = '';
            for (var i = 0; i < tags.length; i++) {
                htmlStr += "<option value=" + (i + 1) + ">" + tags[i] + "</option>"
            }
            ;
            //console.log(htmlStr);
            $("#options").html(htmlStr);
        }
    };
    octopus.init();
});



