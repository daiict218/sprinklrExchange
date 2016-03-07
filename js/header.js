
    function onSignIn() {
    //console.log("sign in me aaya ");
    gapi.signin2.render('signin2', {
        'scope': 'profile email',
        'width': 150,
        'height': 23,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });

};

function onSuccess(googleUser) {

    var profile = googleUser.getBasicProfile();
    //console.log(profile);
    view.signIn();


    if (profile.getImageUrl()) {
        view.changeImageURL(profile.getImageUrl());

    }
    model.changeAuthor(profile.getName());


};
function onFailure() {
    alert("Sign in Failed");
};
function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        view.signOut();

        model.changeAuthor("Anonymous");


    });
};

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

        },
        pushSearchResult: function (resultArray) {
           localStorage.searchResult = JSON.stringify(resultArray);
        },
        changeAuthor: function (author) {
          localStorage.author = author;
        },
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
    },
    pushSearchResult: function (resultArray) {
        model.pushSearchResult(resultArray);
    }


};


var view = {
    init: function () {
        //console.log("ddsdsfdsfasdf");
        this.searchElem = document.getElementById("searchAll");
        console.log(this.searchElem);

        this.searchElem.onkeypress = function (e) {

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
            octopus.pushSearchResult(resultArray);


        }


    },
    signOut: function () {
        document.getElementById("signin2").style.display = "inline-block";
        document.getElementById("siout").style.display = "none";
        document.getElementById("image_url").style.display = "none";
    },
    signIn: function () {
        document.getElementById("signin2").style.display = "none";
        document.getElementById("siout").style.display = "inline-block";
        document.getElementById("image_url").style.display = "inline-block";
    },
    changeImageURL: function (imageURL) {
        document.getElementById("image_url").src = imageURL;
    }
};


octopus.init();

