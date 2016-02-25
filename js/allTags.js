var tags_init= {
        tags:[
            {
                tagName:"JavaScript",
                tagId:"0",
                totalQuestions:0,
                tagSummary:"JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected.",
                questionId: []
            },
            {
                tagName:"Java",
                tagId:"1",
                totalQuestions:0,
                tagSummary:"Java (not to be confused with JavaScript) is a general-purpose object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM).Java is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to Java programming language or Java platform tools.",
                questionId: []
            },
            {
                tagName:"jQuery",
                tagId:"2",
                totalQuestions:0,
                tagSummary:"jQuery is a popular cross-browser JavaScript library that facilitates DOM (Document Object Model - HTML Structure) traversal, event handling, animations, and AJAX interactions by minimizing the discrepancies across browsers and providing an easy-to-use API.",
                questionId: []
            },
            {
                tagName:"HTML",
                tagId:"3",
                totalQuestions:0,
                tagSummary:"HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. The most recent revision to the HTML specification is HTML5.",
                questionId: []
            },
            {
                tagName:"CSS",
                tagId:"4",
                totalQuestions:0,
                tagSummary:"CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML (Hyper Text Markup Language) and XML (Extensible Markup Language) documents including (but not limited to) colors, layout, and fonts.",
                questionId: []
            },
            {
                tagName:"JSON",
                tagId:"5",
                totalQuestions:0,
                tagSummary:"JSON (JavaScript Object Notation) is a 100% textual data interchange format originally inspired by JavaScript objects. It is widely used in RESTful web services. Parsers for JSON exist in nearly all languages, and libraries also exist which can deserialize JSON to native objects or serialize native objects to JSON",
                questionId: []
            },
            {
                tagName:"AJAX",
                tagId:"6",
                totalQuestions:0,
                tagSummary:"AJAX (Asynchronous JavaScript and XML) is a technique for creating seamless interactive websites via asynchronous data exchange between client and server. AJAX facilitates communication with the server or partial page updates without a traditional page refresh",
                questionId: []
            },
            {
                tagName:"Git",
                tagId:"7",
                totalQuestions:0,
                tagSummary:"Git is an open-source distributed version control system (DVCS).",
                questionId: []
            }

        ]
    };
    if(!localStorage.tags)
        localStorage.tags = JSON.stringify(tags_init.tags);
    allTags = tags_init.tags;
    tags = [];
    for (var i = allTags.length - 1; i >= 0; i--) {
        tags[i] = allTags[i].tagName;
    };