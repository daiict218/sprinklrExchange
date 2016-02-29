<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * Created by avinashsrivastava on 19/02/16.
 */
var model= {
    tags:[
        {
            tag_name:"Java script",
            tag_id:"1",
            total_questions:0,
            tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
        },
        {
            tag_name:"Java",
            tag_id:"2",
            total_questions:0,
            tag_summary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools."
        },
        {
            tag_name:"Java script",
            tag_id:"1",
            total_questions:0,
            tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
        },
        {
            tag_name:"Java script",
            tag_id:"1",
            total_questions:0,
            tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
        },
        {
            tag_name:"Java script",
            tag_id:"1",
            total_questions:0,
            tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
        },
        {
            tag_name:"Java script",
            tag_id:"1",
            total_questions:0,
            tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
        },
    ]
};
var elem1 = document.getElementById("tags-browser");
var len=model.tags.length;
console.log(len);
var str="";
for(var i=0;i<len;i++) {
    str =str+ '<div class="tag-cell">' +
        '<div class="tag-cell__tagname">' +
        '<a href="" class="tag" title="" rel="tag">' + model.tags[i].tag_name + '</a>' +
        '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
        '<span class="tag-cell__tagname__totaltags">' + model.tags[i].total_questions + '</span>' +
        '</div>' +
        '<div class="tag-cell__excerpt">' + model.tags[i].tag_summary +
        '</div>' + '</div>';
}
elem1.innerHTML=str;



=======
=======
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
$(function () {
    var currentTagId=0;
    var tag_array=[];
    var tag_return={};
    var temp_array=[];
<<<<<<< HEAD
<<<<<<< HEAD
    var tags_init= {
        tags:[
            {
                tag_name:"Java script",
                tag_id:"0",
                total_questions:0,
                tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
=======
    var tags = {};
    var tags_init= {
        tags:[
            {
                tag_name:"JavaScript",
                tag_id:"0",
                total_questions:0,
                tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected.",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"Java",
                tag_id:"1",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools."
            },
            {
                tag_name:"Jquery",
                tag_id:"2",
                total_questions:0,
                tag_summary:"jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API."
=======
                tag_summary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools.",
                questionId: []
            },
            {
                tag_name:"jQuery",
                tag_id:"2",
                total_questions:0,
                tag_summary:"jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API.",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"HTML",
                tag_id:"3",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5."
=======
                tag_summary:"HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5.",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"CSS",
                tag_id:"4",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts."
=======
                tag_summary:"CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts.",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"JSON",
                tag_id:"5",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON"
=======
                tag_summary:"JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"AJAX",
                tag_id:"6",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh"
=======
                tag_summary:"AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            },
            {
                tag_name:"Git",
                tag_id:"7",
                total_questions:0,
<<<<<<< HEAD
                tag_summary:"Git is an open-source distributed version control system (DVCS)."
=======
                tag_summary:"Git is an open-source distributed version control system (DVCS).",
                questionId: []
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            }

        ]
    };

<<<<<<< HEAD
    var model = {
        init: function () {
            localStorage.tags=JSON.stringify(tags_init.tags);
=======
=======
    var tags = {};

>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
    if(!localStorage.tags){
        localStorage.tags = JSON.stringify(tags_init.tags);
    }



    var model = {
        init: function () {
            //localStorage.tags=JSON.stringify(tags_init.tags);
<<<<<<< HEAD
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
            localStorage.currentTagId=8;


=======
            localStorage.currentTagId=8;
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
        },

        add: function (new_tag_name,new_tag_summary) {
            var tag = {};
            tag.tag_name=new_tag_name;
            tag.tag_summary=new_tag_summary;
            tag.tag_id=localStorage.currentTagId;
            tag.total_questions=0;
            currentTagId=parseInt(localStorage.currentTagId);

            tag_array=JSON.parse(localStorage.tags);
            tag_array.push(tag);
            localStorage.tags=JSON.stringify(tag_array);
            localStorage.currentTagId=parseInt(localStorage.currentTagId)+1;


        },
        getTag: function(iterator){
<<<<<<< HEAD
<<<<<<< HEAD
            // console.log(localStorage.tags);
            temp_array=JSON.parse(localStorage.tags);
            tag_return= temp_array[iterator];

=======
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            // console.log(JSON.parse(localStorage.tags));
            temp_array=JSON.parse(localStorage.tags);
            tag_return = temp_array[iterator];
            // console.log(temp_array);
<<<<<<< HEAD
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
        },
        getTagSummary: function(){
            return tag_return.tag_summary;
        },
        getTagName: function(){
            return tag_return.tag_name;
        },
        getTotalQuestion: function(){
<<<<<<< HEAD
<<<<<<< HEAD
            return tag_return.total_questions;
=======
            // console.log(tag_return);
            return tag_return.questionId.length;
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
            // console.log(tag_return);
            return tag_return.questionId.length;
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
        },
        getlength: function(){
            return parseInt(localStorage.currentTagId);
        },
        getTotalData:function(){
            return localStorage.tags;
        }

    };


    var octopus = {
        init: function() {
            model.init();
<<<<<<< HEAD
<<<<<<< HEAD
            console.log("dsds");
=======
            // console.log("dsds");
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
            // console.log("dsds");
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            view.init();
        },
        addNewTag: function (new_tag_name,new_tag_summary) {
            model.add(new_tag_name,new_tag_summary);
            view.render();
        },

        getTagObject: function (iterator) {
            model.getTag(iterator);
        },
        getTagSummary: function(){
            return model.getTagSummary();
        },
        getTagName: function(){
            return model.getTagName();
        },
        getTotalQuestion: function(){
            return model.getTotalQuestion();
        },
        getLength: function(){
            return model.getlength();
        },
        tagSearch:function(subText,iterator){
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(subText);
            var re1 = new RegExp(subText);
            octopus.getTagObject(iterator);
            console.log(tag_return);
            var sttrr=JSON.stringify(tag_return);
            var objectString=sttrr.toLowerCase();
            console.log(objectString);
            return re1.test(objectString);
        }

=======
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            var re1 = new RegExp(subText);
            octopus.getTagObject(iterator);
            var sttrr=JSON.stringify(tag_return);
            var objectString=sttrr.toLowerCase();
            return re1.test(objectString);
        },
        setNumberQuestions:function(id,number_questions){
            tags_init.tags[id].numberQuestion = number_questions;
        },
        getQuestionOfTag:function(id){
            // console.log(tags_init.tags[id].numberQuestion);
            return tags_init.tags[id].numberQuestion;
        }   
<<<<<<< HEAD
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c

    };


    var view = {
        init: function () {
            view.render();
<<<<<<< HEAD
<<<<<<< HEAD
            $("#tagfilter").keyup(function(){
                var filterString=document.getElementById("tagfilter").value;
                console.log("here"+filterString);
                var elem1 = document.getElementById("tags-browser");
                var len=octopus.getLength();
                console.log(len);
=======
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c

            // CurrentTag will store the current tag clicked by the user.
            $(".tag").click(function(){
                localStorage.currentTag = this.id;
                localStorage.numberQuestion = octopus.getQuestionOfTag(this.id);
            });
            $("#tagfilter").keyup(function(){
                var filterString=document.getElementById("tagfilter").value;
                filterString = filterString.toLowerCase();
                // console.log("here"+filterString);
                var elem1 = document.getElementById("tags-browser");
                var len=octopus.getLength();
                // console.log(len);
<<<<<<< HEAD
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
                var str="";
                for(var i=0;i<len;i++) {

                    if (octopus.tagSearch(filterString,i)) {
                        octopus.getTagObject(i);

                        str = str + '<div class="tag-cell">' +
                            '<div class="tag-cell__tagname">' +
<<<<<<< HEAD
<<<<<<< HEAD
                            '<a href="" class="tag" title="" rel="tag">' + octopus.getTagName() + '</a>' +
=======
                            '<a href="tagsQuestion.html" class="tag" title="" rel="tag" id='+tags_init.tags[i].tag_id+'>' + octopus.getTagName() + '</a>' +
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
                            '<a href="tagsQuestion.html" class="tag" title="" rel="tag" id='+tags_init.tags[i].tag_id+'>' + octopus.getTagName() + '</a>' +
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
                            '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                            '<span class="tag-cell__tagname__totaltags">' + octopus.getTotalQuestion() + '</span>' +
                            '</div>' +
                            '<div class="tag-cell__excerpt">' + octopus.getTagSummary() +
                            '</div>' + '</div>';
                    }
                    elem1.innerHTML = str;
                }

            });
<<<<<<< HEAD
<<<<<<< HEAD
            console.log("dsfds");
=======
            // console.log("dsfds");
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
            // console.log("dsfds");
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c

        },
        render: function () {
            var elem1 = document.getElementById("tags-browser");
            var len=octopus.getLength();
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(len);
            var str="";
            for(var i=0;i<len;i++) {

                octopus.getTagObject(i);

                str =str+ '<div class="tag-cell">' +
                    '<div class="tag-cell__tagname">' +
                    '<a href="" class="tag" title="" rel="tag">' + octopus.getTagName()+ '</a>' +
=======
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            // console.log(len);
            var str="";
            for(var i=0;i<len;i++) {
                
                octopus.getTagObject(i);
                // console.log(tags_init.tags[i].tag_id);
                str =str+ '<div class="tag-cell">' +
                    '<div class="tag-cell__tagname">' +
                    '<a href="tagsQuestion.html" class="tag" title="" rel="tag" id='+tags_init.tags[i].tag_id+'>' + octopus.getTagName()+ '</a>' +
<<<<<<< HEAD
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
                    '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                    '<span class="tag-cell__tagname__totaltags">' + octopus.getTotalQuestion() + '</span>' +
                    '</div>' +
                    '<div class="tag-cell__excerpt">' + octopus.getTagSummary() +
                    '</div>' + '</div>';
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    octopus.setNumberQuestions(i,octopus.getTotalQuestion());
                    // console.log(tags_init.tags[i].numberQuestion);
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e
=======
                    octopus.setNumberQuestions(i,octopus.getTotalQuestion());
                    // console.log(tags_init.tags[i].numberQuestion);
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
            }
            elem1.innerHTML=str;

        }





    };
    octopus.init();
});
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 0a077971d001e5ce93191baa48248f833e8c56a4


=======
>>>>>>> 020cf6ef5bf34b0bee583e6c7f5581fa141b9c0e

=======
>>>>>>> b01cb19e00f564264d44538a59214479beef9a1c
