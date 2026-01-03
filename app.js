const notes = require("./notes.js");
const yargs = require("yargs/yargs"); //import core yargs functions (new version "yargs/yargs")
const { hideBin } = require("yargs/helpers"); // import helper called hibeBin (remove uncessary parts of process.argv)
const { describe, demandOption, strict, argv } = require("yargs");

//NEW VERSION
yargs(hideBin(process.argv))
  //Adding note
  .command({
    command: "add",
    describe: "Adding a new note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },

      comment: {
        describe: "Note comment",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      notes.addNote(argv.title, argv.comment);
    },
  })

  //Removing note
  .command({
    command: "remove",
    describe: "removing note",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      },
    },

    handler(argv) {
      notes.removeNote(argv.title);
    },
  })

  //Removing all note
  .command({
    command: "remove-all",
    describe: "removing all notes",
    handler() {
      notes.removeAllNotes();
    },
  })

  //List notes
  .command({
    command: "list",
    describe: "displays all notes",
    handler() {
      notes.listNotes();
    },
  })

  //Read note (title + note comment)
  .command({
    command: "read",
    describe: "reading note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },

    handler(argv) {
      notes.readNote(argv.title);
    },
  })

  //Edit note
  .command({
    command: "edit",
    describe: "editing note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      comment: {
        describe: "New note",
        demandOption: true,
        type: "string",
      },
    },

    handler(argv) {
      notes.editNote(argv.title, argv.comment);
    },
  })
  .parse();
