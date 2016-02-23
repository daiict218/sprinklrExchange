$(function () {
    var currentTagId=0;
    var tag_array=[];
    var tag_return={};
    var temp_array=[];
    var tags = {};

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
            // console.log(JSON.parse(localStorage.tags));
            temp_array=JSON.parse(localStorage.tags);
            tag_return = temp_array[iterator];
            // console.log(temp_array);
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
            // console.log("dsds");
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

    };


    var view = {
        init: function () {
            view.render();

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
                var str="";
                for(var i=0;i<len;i++) {

                    if (octopus.tagSearch(filterString,i)) {
                        octopus.getTagObject(i);

                        str = str + '<div class="tag-cell">' +
                            '<div class="tag-cell__tagname">' +
                            '<a href="tagsQuestion.html" class="tag" title="" rel="tag" id='+tags_init.tags[i].tag_id+'>' + octopus.getTagName() + '</a>' +
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
                // console.log(tags_init.tags[i].tag_id);
                str =str+ '<div class="tag-cell">' +
                    '<div class="tag-cell__tagname">' +
                    '<a href="tagsQuestion.html" class="tag" title="" rel="tag" id='+tags_init.tags[i].tag_id+'>' + octopus.getTagName()+ '</a>' +
                    '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                    '<span class="tag-cell__tagname__totaltags">' + octopus.getTotalQuestion() + '</span>' +
                    '</div>' +
                    '<div class="tag-cell__excerpt">' + octopus.getTagSummary() +
                    '</div>' + '</div>';
                    octopus.setNumberQuestions(i,octopus.getTotalQuestion());
                    // console.log(tags_init.tags[i].numberQuestion);
            }
            elem1.innerHTML=str;

        }





    };
    octopus.init();
});
