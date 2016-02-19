$(function(){

    var model = {
        questions = JSON.parse(localStorage.questions);
    };


    var octopus = {
        // addNewNote: function(noteStr) {
        //     model.add({
        //         content: noteStr,
        //         date: Date.now()
        //     });
        //     view.render();
        // },

        // getNotes: function() {
        //     return model.getAllNotes().reverse();
        // },

        // init: function() {
        //     model.init();
        //     view.init();
        // }
    };


    var view = {
        // init: function() {
        //     this.noteList = $('#notes');
        //     var newNoteForm = $('#new-note-form');
        //     var newNoteContent = $('#new-note-content');
        //     newNoteForm.submit(function(e){
        //         octopus.addNewNote(newNoteContent.val());
        //         newNoteContent.val('');
        //         e.preventDefault();
        //     });
        //     view.render();
        // },
        // render: function(){
        //     var htmlStr = '';
        //     octopus.getNotes().forEach(function(note){
        //         htmlStr += '<li class="note">'+
        //                 note.content + '<div class="note-date">' + new Date(note.date).toString() + '</div>'
        //             '</li>';
        //     });
        //     this.noteList.html( htmlStr );
        // }
    };

    octopus.init();
});