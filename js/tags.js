$(function () {
    var currentTagId=0;
    var tag_array=[];
    var tag_return={};
    var temp_array=[];
    var tags = {};
    var tags_init= {
        tags:[
            {
                tag_name:"JavaScript",
                tag_id:"0",
                total_questions:0,
                tag_summary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected.",
                questionId: []
            },
            {
                tag_name:"Java",
                tag_id:"1",
                total_questions:0,
                tag_summary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools.",
                questionId: []
            },
            {
                tag_name:"jQuery",
                tag_id:"2",
                total_questions:0,
                tag_summary:"jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API.",
                questionId: []
            },
            {
                tag_name:"HTML",
                tag_id:"3",
                total_questions:0,
                tag_summary:"HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5.",
                questionId: []
            },
            {
                tag_name:"CSS",
                tag_id:"4",
                total_questions:0,
                tag_summary:"CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts.",
                questionId: []
            },
            {
                tag_name:"JSON",
                tag_id:"5",
                total_questions:0,
                tag_summary:"JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON",
                questionId: []
            },
            {
                tag_name:"AJAX",
                tag_id:"6",
                total_questions:0,
                tag_summary:"AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh",
                questionId: []
            },
            {
                tag_name:"Git",
                tag_id:"7",
                total_questions:0,
                tag_summary:"Git is an open-source distributed version control system (DVCS).",
                questionId: []
            }

        ]
    };

    if(!localStorage.tags){
        localStorage.tags = JSON.stringify(tags_init.tags);
    }



    var model = {
        init: function () {
            //localStorage.tags=JSON.stringify(tags_init.tags);
            localStorage.currentTagId=8;


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
            console.log(JSON.parse(localStorage.tags));
            temp_array=JSON.parse(localStorage.tags);
            tag_return = temp_array[iterator];
            console.log(temp_array);
        },
        getTagSummary: function(){
            return tag_return.tag_summary;
        },
        getTagName: function(){
            return tag_return.tag_name;
        },
        getTotalQuestion: function(){
            // console.log(tag_return);
            return tag_return.questionId.length;
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
            console.log("dsds");
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
            // console.log(subText);
            var re1 = new RegExp(subText);
            octopus.getTagObject(iterator);
            // console.log(tag_return);
            var sttrr=JSON.stringify(tag_return);
            var objectString=sttrr.toLowerCase();
            // console.log(objectString);
            // console.log("Hello world");
            return re1.test(objectString);
        }


    };


    var view = {
        init: function () {
            view.render();
            $("#tagfilter").keyup(function(){
                var filterString=document.getElementById("tagfilter").value;
                filterString = filterString.toLowerCase();
                // console.log("here"+filterString);
                var elem1 = document.getElementById("tags-browser");
                var len=octopus.getLength();
                // console.log(len);
                var str="";
                for(var i=0;i<len;i++) {

                    if (octopus.tagSearch(filterString,i)) {
                        octopus.getTagObject(i);

                        str = str + '<div class="tag-cell">' +
                            '<div class="tag-cell__tagname">' +
                            '<a href="" class="tag" title="" rel="tag">' + octopus.getTagName() + '</a>' +
                            '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                            '<span class="tag-cell__tagname__totaltags">' + octopus.getTotalQuestion() + '</span>' +
                            '</div>' +
                            '<div class="tag-cell__excerpt">' + octopus.getTagSummary() +
                            '</div>' + '</div>';
                    }
                    elem1.innerHTML = str;
                }

            });
            // console.log("dsfds");

        },
        render: function () {
            var elem1 = document.getElementById("tags-browser");
            var len=octopus.getLength();
            // console.log(len);
            var str="";
            for(var i=0;i<len;i++) {

                octopus.getTagObject(i);

                str =str+ '<div class="tag-cell">' +
                    '<div class="tag-cell__tagname">' +
                    '<a href="" class="tag" title="" rel="tag">' + octopus.getTagName()+ '</a>' +
                    '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                    '<span class="tag-cell__tagname__totaltags">' + octopus.getTotalQuestion() + '</span>' +
                    '</div>' +
                    '<div class="tag-cell__excerpt">' + octopus.getTagSummary() +
                    '</div>' + '</div>';
            }
            elem1.innerHTML=str;

        }





    };
    octopus.init();
});

