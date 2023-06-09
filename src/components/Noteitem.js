import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/noteContext";
import axios from "axios";
const Noteitem = () => {
  const notefetch = useContext(noteContext);
  const { notes, setnotes, fetcher } = notefetch;
  const ref = useRef(null);
  const [Note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    id: "",
  });
  useEffect(() => {
    fetcher();
  }, []);
  const onChange = (event) => {
    setNote({ ...Note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        ref={ref}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-2">
                  <label htmlFor="exampleInputtitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={Note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
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
                    value={Note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="tagHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    value={Note.edescription}
                    className="form-control"
                    onChange={onChange}
                    id="edescription"
                    name="edescription"
                    rows="8"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={async () => {
                  setNote({
                    etitle: "",
                    edescription: "",
                    etag: "",
                    id: "",
                  });
                  await notefetch.editNote(
                    Note.etitle,
                    Note.edescription,
                    Note.etag,
                    Note.id
                  );
                  fetcher();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes - Click to Edit</h2>
        {notes.length === 0 && "No Notes to Display."}
        <div className="row my-3">
          {notes.map((note) => {
            return (
              <div className="col-md-4" key={note._id}>
                <div
                  className="container my-2"
                  style={{
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                  }}
                >
                  <p className="my-1" style={{ fontSize: "25px" }}>
                    <strong>{note.title}</strong>
                  </p>
                  <p className="fw-medium my-1">{note.description}</p>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted fst-italic fs-6">
                      Tag: {note.tag}
                    </p>
                    <p className="text-end">
                      {" "}
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{
                          borderStyle: "none",
                          backgroundColor: "white",
                        }}
                        onClick={() => {
                          setNote({
                            etitle: note.title,
                            edescription: note.description,
                            etag: note.tag,
                            id: note._id,
                          });
                        }}
                      >
                        <i className="fa-solid fa-pen "></i>
                      </button>
                      <button
                        className="mx-1"
                        onClick={() => {
                          notefetch.deleteNote(note._id);
                        }}
                        style={{
                          borderStyle: "none",
                          backgroundColor: "white",
                        }}
                        href="/"
                      >
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </p>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Noteitem;
