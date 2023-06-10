import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const notesInit = [];
  let navigate = useNavigate();
  const fetcher = () => {
    if (localStorage.getItem("token") !== "null") {
      axios
        .get("http://localhost:5000/api/notes/fetchnotes", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setnotes(response.data);
        });
    } else {
      props.alert("Please Login to continue.", "error");
      navigate("/login");
    }
  };
  const addNote = (title, description, tag) => {
    if (localStorage.getItem("token") !== "null") {
      if (tag === "") {
        axios
          .post(
            "http://localhost:5000/api/notes/addnote",
            { title, description },
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            props.alert("Note added succesfully.", "success");
          });
      } else {
        axios
          .post(
            "http://localhost:5000/api/notes/addnote",
            { title, description, tag },
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            props.alert("Note added succesfully.", "success");
          });
      }
    } else {
      props.alert("Please Login to continue.", "error");
      navigate("/login");
    }
  };
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        fetcher();
        props.alert("Note deleted succesfully.", "success");
      });
  };

  const editNote = (title, description, tag, id) => {
    axios
      .put(
        `http://localhost:5000/api/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
            "note-id": id,
          },
        }
      )
      .then(() => {
        fetcher();
        props.alert("Note updated succesfully.", "success");
      });
  };
  const [notes, setnotes] = useState(notesInit);
  return (
    <noteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, fetcher }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
