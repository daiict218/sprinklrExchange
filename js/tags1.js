$(function () {
​
​
    var model = {
​
        currentTagId: 0,
        tagArray: [],
        tagReturn: {},
        cacheArray: [],
        tags: [
            {
                tagName: "JavaScript",
                tagId: "0",
                totalQuestions: 0,
                tagSummary: "JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected.",
                questionId: []
            },
            {
                tagName: "Java",
                tagId: "1",
                totalQuestions: 0,
                tagSummary: "Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools.",
                questionId: []
            },
            {
                tagName: "jQuery",
                tagId: "2",
                totalQuestions: 0,
                tagSummary: "jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API.",
                questionId: []
            },
            {
                tagName: "HTML",
                tagId: "3",
                totalQuestions: 0,
                tagSummary: "HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5.",
                questionId: []
            },
            {
                tagName: "CSS",
                tagId: "4",
                totalQuestions: 0,
                tagSummary: "CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts.",
                questionId: []
            },
            {
                tagName: "JSON",
                tagId: "5",
                totalQuestions: 0,
                tagSummary: "JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON",
                questionId: []
            },
            {
                tagName: "AJAX",
                tagId: "6",
                totalQuestions: 0,
                tagSummary: "AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh",
                questionId: []
            },
            {
                tagName: "Git",
                tagId: "7",
                totalQuestions: 0,
                tagSummary: "Git is an open-source distributed version control system (DVCS).",
                questionId: []
            }
​
        ],
        init: function () {
            try {
                if (!localStorage.getItem("tags")) {
                    localStorage.setItem("tags", JSON.stringify(model.tags));
                }
​
            }
            catch (e) {
                console.log(e.message);
            }
            try {
                model.cacheArray = JSON.parse(localStorage.getItem("tags"));
            }
            catch (e){
                console.log(e.message);
            }
        },
        getTagSummary: function (iterator) {
            return model.cacheArray[iterator].tagSummary;
        },
        getTagName: function (iterator) {
            return model.cacheArray[iterator].tagName;
        },
        getTotalQuestion: function (iterator) {
            return model.cacheArray[iterator].totalQuestions;
        }
​
​
    };
​
​
    var octopus = {
        init: function () {
            model.init();
            view.init();
        },
        getTagArray: function () {
            return model.cacheArray;
        },
​
        getTag:function(iterator)
        {
            return model.cacheArray[iterator];
        },
        getTagSummary: function (iterator) {
            return model.getTagSummary(iterator);
        },
        getTagName: function (iterator) {
            return model.getTagName(iterator);
        },
        getTotalQuestion: function (iterator) {
            return model.getTotalQuestion(iterator);
        },
        getTagObject: function (iterator) {
            var tagObject = {
                tagName: octopus.getTagName(iterator),
                tagSummary: octopus.getTagSummary(iterator),
                totalQuestions: octopus.getTotalQuestion(iterator)
            }
            return tagObject;
        },
        tagSearch: function (subText, iterator) {
            try {
                var tagString = JSON.stringify(octopus.getTag(iterator)).toLowerCase();
            }
            catch (e) {
                var tagString = "";
                console.log(e.message);
            }
            var re1 = new RegExp(subText);
            return re1.test(tagString);
        }
​
​
    };
​
​
    var view = {
        init: function () {
            view.render();
            $("#tagfilter").keyup(function () {
                var searchString = view.getSearchString();
                console.log(searchString);
                var innerString = "";
                octopus.getTagArray().forEach(function (object, iterator) {
                    if (octopus.tagSearch(searchString, iterator)) {
                        var tagObject = octopus.getTagObject(iterator);
​
                        innerString = innerString + view.getHTMLString(tagObject);
                    }
                });
                view.putString(innerString);
​
​
            });
​
        },
        render: function () {
            var innerStringRender = "";
            octopus.getTagArray().forEach(function (object, iterator) {
                var tagObject = octopus.getTagObject(iterator);
                innerStringRender = innerStringRender + view.getHTMLString(tagObject);
            });
            view.putString(innerStringRender);
​
        },
        getHTMLString: function (tagObject) {
​
            var HTMLString = '<div class="tag-cell">' +
                '<div class="tag-cell__tagname">' +
                '<a href="" class="tag" title="" rel="tag">' + tagObject.tagName + '</a>' +
                '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                '<span class="tag-cell__tagname__totaltags">' + tagObject.totalQuestions + '</span>' +
                '</div>' +
                '<div class="tag-cell__excerpt">' + tagObject.tagSummary +
                '</div>' + '</div>';
            return HTMLString;
​
        },
        putString: function (innerString) {
            document.getElementById("tags-browser").innerHTML = innerString;
        },
        getSearchString: function () {
            return document.getElementById("tagfilter").value.toLowerCase();
        }
​
​
    };
    octopus.init();
});
​