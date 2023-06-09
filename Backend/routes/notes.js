const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //used whenever we want to take input from the user
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
//const fetchnotes = require("../middleware/fetchnotes");
//fetchhnotes will be used when id of note is fiven in header, primarily was used in ROUTE 3 (UPDATING NOTE)
//ROUTE 1: TO FETCH THE NOTES OF THE USER, LOGIN REWUIRED, GET REQ
//This will  use get as it will be easier here to use get instead of post.
router.get("/fetchnotes", fetchuser, async (req, res) => {
  //this fucntion will be used to fetch all the notes of a particular user.
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message); // Any generalized error if there is
    res.status(500).send("There is an error while fetching user's notes.");
  }
});

//ROUTE 2: WILL BE USED TO ADD A NOTE THAT A USER WANTS TO ADD, WILL USE POST REQ
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter a valid title.").exists(), //express validator inputs the material you want user to enter
    body("description"),
  ],
  async (req, res) => {
    const errors = validationResult(req); //validates the input
    if (!errors.isEmpty()) {
      //checks the input for errors
      return res.status(400).json({ errors: errors.array() });
    } //if error found

    try {
      const { title, description, tag } = req.body; //destructuring
      let notes = new Notes({
        //notes creation where the material will be temporarily saved
        title,
        description,
        tag,
        user: req.user.id, //this is special because its the same as that of thhe user whose notes this is, not to be confused by id of the notes
      });
      const savedNotes = await notes.save(); //saving of notes on db
      res.json(savedNotes); //sending the notes saved as a response
    } catch (error) {
      console.error(error.message); // Any generalized error if there is
      res.status(500).send("There is an error while adding a note.");
    }
  }
);

//ROUTE 3:Updating User's notes through POST req '/api/notes/updatenote', login required

// An advantage of using put is because using the same endpoint we can do multiple things like /update/note/:id with post can do a different function
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //here /:id is not required but an easy way to get the id instead of getting it as a header using fetchuser.
    const Note = await Notes.findById(req.params.id);
    if (Note.user.toString() !== req.user.id) {
      //Checks whether the change maker is actually the notemaker client.
      return res.status(900).send("Invalid User!");
    } //req.user comes from fetchuser
    const newnote = {}; //Creates a new json
    const { title, description, tag } = req.body; // this is the input we take from the user as body, it is destructured

    //the elements are passed in if statements because it is not neccesary to change everything, if not provided in the req.body then no chnages will be made to that element.
    if (title) {
      newnote.title = title; // the title passed by client is now the title of newnote
    }
    if (description) {
      newnote.description = description; // the description passed by client is now the description of newnote
    }
    if (tag) {
      newnote.tag = tag; // the tag passed by client is now the tag of newnote
    }
    const updatedNotes = await Notes.findByIdAndUpdate(
      Note.id,
      { $set: newnote },
      { new: true }
    );
    //updatedNotes uses mongoose function to find the entry using id and update it, similar thing is used in deleting the id, it also stores the new updated values to send to the user.

    //IMP NOTE:Usually when you perform update operations in mongoose, it returns the previous state of the document (before it was updated) and not the updated one. By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour

    res.json({ updatedNotes });
  } catch (error) {
    console.error(error.message); // Any generalized error if there is
    res.status(500).send("There is an error while updating the note.");
  }
});

//ROUTE 4: DELETING A NOTE MADE BY USER. USING DELETE REQ '/api/notes/deletenote' LOGIN WILL BE REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(900).send("NoteId Not Found");
    }
    if (notes.user.toString() !== req.user.id) {
      //this req.user comes from fetchuser
      return res.status(900).send("Invalid User!");
    }
    Notes.findByIdAndDelete(req.params.id.toString()).then(() => {
      res.send("Deleted.");
    });
  } catch (error) {
    console.error(error.message); // Any generalized error if there is
    res.status(500).send("There is an error while deleting the note.");
  }
});
module.exports = router;
