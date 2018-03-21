const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List add notes')
    .command('read', 'Read some note',{
        title: titleOptions
    })
    .command('remove', 'Remove some note',{
        title: titleOptions
    })
    .help()
    .argv;
    
var command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs', argv);

if( command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log("Note created");
        notes.logNote(note);
    }
    else {
        console.log("Note already exist!");
    }
    // if ( typeof note === 'undefined' ){
    //     console.log("Note already exist!");
    // }
    // else{
        // console.log("Note created");
        // console.log(`Title: ${note.title}`);
        // console.log(`Body: ${note.body}`);
    // }
}

else if( command === 'list' ){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes`);
    console.log("----");
    allNotes.forEach( note => notes.logNote(note));
}

else if(command === 'read' ){
    note = notes.readNote(argv.title);
    if (note){
        console.log("Note found");
        notes.logNote(note);
    }
    else {
        console.log("Note does not exist!");
    }
}

else if(command === 'remove' ){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note removed successfully!' : 'Note does not exist';
    console.log(message);
    // if ( noteRemoved ){
    //     console.log("Note removed successfully!");
    // }
    // else{
    //     console.log("Note does not exist");        
    // }
}

else{
    console.log('Command unknown.')
}