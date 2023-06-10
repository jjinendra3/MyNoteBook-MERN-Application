import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  let navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === "null") {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <NoteState alert={showalert}>
        <Navbar alert={showalert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home alert={alert} />} />
            <Route exact path="/about" element={<About alert={showalert} />} />
            <Route exact path="/login" element={<Login alert={showalert} />} />
            <Route
              exact
              path="/signup"
              element={<Signup alert={showalert} />}
            />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
