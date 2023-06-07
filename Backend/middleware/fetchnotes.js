const Notes = require("../models/Notes");
const fetchnotes = async (req, res, next) => {
  const noteid = req.header("note-id"); //takes the note-id as
  if (!noteid) {
    res.status(403).json({ error: "Note ID is invalid or not provided." });
  }
  const notes = await Notes.findById(noteid);
  req.note = notes;
  next();
};
module.exports = fetchnotes;
