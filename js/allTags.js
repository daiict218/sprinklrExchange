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
    if(!localStorage.tags)
        localStorage.tags = JSON.stringify(tags_init.tags);
    allTags = tags_init.tags;
    tags = [];
    for (var i = allTags.length - 1; i >= 0; i--) {
        tags[i] = allTags[i].tag_name;
    };