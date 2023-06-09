import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";
const AddNote = () => {
  const adder = useContext(noteContext);
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2>Add A Note</h2>
        <form>
          <div className="mb-3 my-2">
            <label htmlFor="exampleInputtitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 my-2">
            <label htmlFor="exampleInputtag" className="form-label">
              Tag{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="tagHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={onChange}
              id="description"
              name="description"
              rows="8"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={(event) => {
              adder.addNote(note.title, note.description, note.tag);
            }}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
