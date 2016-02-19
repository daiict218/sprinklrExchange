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







