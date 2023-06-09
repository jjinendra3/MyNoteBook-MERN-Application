import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";
const NoteState = (props) => {
  const notesInit = [];
  const fetcher = () => {
    axios
      .get("http://localhost:5000/api/notes/fetchnotes", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MDI1OTE2NTNmODI0YTc2N2YxYzAyIn0sImlhdCI6MTY4NjI1NDk5M30.CU6HY9fFzaQm4wjST36gIQDVOyWy6qzL-wuYkBR6_LA",
        },
      })
      .then((response) => {
        setnotes(response.data);
      });
  };
  const addNote = (title, description, tag) => {
    if (tag === "") {
      axios.post(
        "http://localhost:5000/api/notes/addnote",
        { title, description },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MDI1OTE2NTNmODI0YTc2N2YxYzAyIn0sImlhdCI6MTY4NjMwNzg1MX0.7Q9unmwvOcimnE0IzK3iuQV0ghQnDwQqXzRzSopuFYI",
          },
        }
      );
    } else {
      axios.post(
        "http://localhost:5000/api/notes/addnote",
        { title, description, tag },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MDI1OTE2NTNmODI0YTc2N2YxYzAyIn0sImlhdCI6MTY4NjMwNzg1MX0.7Q9unmwvOcimnE0IzK3iuQV0ghQnDwQqXzRzSopuFYI",
          },
        }
      );
    }
  };
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MDI1OTE2NTNmODI0YTc2N2YxYzAyIn0sImlhdCI6MTY4NjMwNzg1MX0.7Q9unmwvOcimnE0IzK3iuQV0ghQnDwQqXzRzSopuFYI",
        },
      })
      .then(() => {
        fetcher();
      });
  };

  const editNote = (title, description, tag, id) => {
    axios
      .put(
        `http://localhost:5000/api/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MDI1OTE2NTNmODI0YTc2N2YxYzAyIn0sImlhdCI6MTY4NjMwNzg1MX0.7Q9unmwvOcimnE0IzK3iuQV0ghQnDwQqXzRzSopuFYI",
          },
        }
      )
      .then(() => {
        fetcher();
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
