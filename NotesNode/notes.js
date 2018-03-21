const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);     
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = function(title, body){
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if ( duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = function(){
    return fetchNotes();
}

var removeNote = function(title){
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);
    return notes.length !== newNotes.length;
}

var readNote = function(title){
    var notes = fetchNotes();
    note = notes.filter((note) => note.title === title);
    return note[0];
}

var logNote = function(note){
    debugger;
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote,
    logNote
}
