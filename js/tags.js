$(function () {
    var model = {
        currentTagId: 0,
        tagArray: [],
        tagReturn: {},
        cacheArray: [],
        init: function () {
            try {
                if (!localStorage.getItem("tags")) {
                    localStorage.setItem("tags", JSON.stringify(model.tags));
                }
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
            return model.cacheArray[iterator].questionId.length;
        },
        getTagId:function(iterator){
            return model.cacheArray[iterator].tagId;
        }
    };
    var octopus = {
        init: function () {
            model.init();
            view.init();
        },
        getTagArray: function () {
            return model.cacheArray;
        },
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
        getTagId:function(iterator){
             return model.getTagId(iterator);
        },

        getTagObject: function (iterator) {
            var tagObject = {
                tagName: octopus.getTagName(iterator),
                tagSummary: octopus.getTagSummary(iterator),
                totalQuestions: octopus.getTotalQuestion(iterator),
                tagId:octopus.getTagId(iterator)
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
    };
    var view = {
        init: function () {
            view.render();
            $(".tag").click(function(){
                var tagID=$(this).attr('id');
                localStorage.currentTag=tagID;
                console.log($(this).attr('id'));
            });
            $("#tagfilter").keyup(function () {
                var searchString = view.getSearchString();
                console.log(searchString);
                var innerString = "";
                octopus.getTagArray().forEach(function (object, iterator) {
                    if (octopus.tagSearch(searchString, iterator)) {
                        var tagObject = octopus.getTagObject(iterator);
                        innerString = innerString + view.getHTMLString(tagObject);
                    }
                });
                view.putString(innerString);
            });
        },
        render: function () {
            var innerStringRender = "";
            octopus.getTagArray().forEach(function (object, iterator) {
                var tagObject = octopus.getTagObject(iterator);
                innerStringRender = innerStringRender + view.getHTMLString(tagObject);
            });
            view.putString(innerStringRender);
        },
        getHTMLString: function (tagObject) {
            var HTMLString = '<div class="tag-cell">' +
                '<div class="tag-cell__tagname">' +
                '<a href="tagsQuestion.html" class="tag"'+'id='+tagObject.tagId+' title="" rel="tag">' + tagObject.tagName + '</a>' +
                '<span class="tag-cell__tagname__multiply-x">' + "x" + '</span>' +
                '<span class="tag-cell__tagname__totaltags">' + tagObject.totalQuestions + '</span>' +
                '</div>' +
                '<div class="tag-cell__excerpt">' + tagObject.tagSummary +
                '</div>' + '</div>';
                
            return HTMLString;
        },
        putString: function (innerString) {
            document.getElementById("tags-browser").innerHTML = innerString;
        },
        getSearchString: function () {
            return document.getElementById("tagfilter").value.toLowerCase();
        }
    };
    octopus.init();
});