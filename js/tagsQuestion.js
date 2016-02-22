$(function(){
    var questions = JSON.parse(localStorage.questions);
    var tags = JSON.parse(localStorage.tags);
    var tagId = localStorage.currentTag;
    // console.log(tags[tagId].questionId);
    // questionselem.tags.forEach(function(element,index,a){
    //             tagstr+='<a href="#" class="tags">'+element+'</a>';
    //         });
    tagstr = "";
    var htmlStr = "";
    var listelem=document.getElementById('questionlist');
    tags[tagId].questionId.forEach (function(elem,i,array) {
        console.log(elem);
        var questionblock= document.createElement('div');
        questionblock.className='question';
        questionblock.id='question'+i;
        htmlStr = '<div class="question__vav">'+'<div id="votesbtn'+i+'"class="question__vav__btn" data-id='+i+' >'+
            '                           <div class="mini-counts"><span class="x">'+questions[elem-1].votes+'</span></div>'+
            '                           <div class="name">votes</div>'+
            '                       </div>'+
            '               <div id="answerbtn'+i+'"class="question__vav__btn question__vav__btn--color">'+
            '               <div class="mini-counts"><span class="x--mod">'+questions[elem-1].answers.length+'</span></div>'+
            '                       <div class="name--mod">answers</div>'+
            '                       </div>'+
            '                       <div id="viewbtn'+i+'" class="question__vav__btn" onclick="view.index2setter(this,'+i+')">'+
            '                           <div class="mini-counts"><span class="x">'+questions[elem-1].views+'</span></div>'+
            '                           <div class="name">views</div>'+
            '                       </div>'+
            '            </div>'+
            '                   <div class="question__summary">'+
            '                       <div class="question__summary__ques">'+
            '                           <h3><a href="questionanswer.html"  class="question-link">'+questions[elem-1].title+'</a></h3>'+
            '                       </div>'+
            '                       <div class="question__summary__tags">'+
            tagstr+
            '                       </div>'+
            '                       <div id="author'+i+'" class="question__summary__author">'+
            '                           <div class="author">'+
            
            '                               <a href="#">'+questions[elem-1].author+'</a>'+
            '                               </author>'+
            '                           </div>'+
            '                       </div>'+
            '                   </div>';
            questionblock.innerHTML=htmlStr;
            listelem.appendChild(questionblock);
            // $('#questionlist').html(htmlStr);
    });
    
}());