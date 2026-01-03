const fs = require("fs"); //used to read/write files
const { title } = require("process");

// Adding Note
const addNote = (title, comment) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      comment: comment,
    });

    saveNotes(notes); //Saves data after changes
    console.log("New note added!");
  } else {
    console.log("Note title already taken!");
  }
};

// Remove
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log("Note removed");

    saveNotes(notesToKeep);
  } else {
    console.log("No note found!");
  }
};

// Remove all notes
const removeAllNotes = () => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log("Nothing to remove.");
  } else {
    saveNotes([]);
    console.log("All notes removed!");
  }
};

//List Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log("Your notes:");
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// Reading Note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(`Title: ${note.title}`);
    console.log(`Comment: ${note.comment}`);
  } else {
    console.log("Notes not found!");
  }
};

// Editing note comment/body
const editNote = (title, newComment) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (!note) {
    console.log("Note not found");
  } else {
    note.comment = newComment;
    saveNotes(notes);
    console.log("Note Updated!");
  }
};

// Save Data
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON); //Sync wait until the file is writed before continuing, dataJSON is the content, notes.json is the file in this case string (JSON.stringify )where data stored.
};

// Load Data
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; //This alllow to start also if we don't have an existing file
  }
};

// Export
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  removeAllNotes: removeAllNotes,
  listNotes: listNotes,
  readNote: readNote,
  editNote: editNote,
};
