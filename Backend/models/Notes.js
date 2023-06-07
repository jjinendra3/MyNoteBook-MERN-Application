const mongoose = require("mongoose");
const { Schema } = mongoose;

const Notes = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", //basically a link of user key and the notes associated with him/her... its like a foreign key
  },
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", Notes);
