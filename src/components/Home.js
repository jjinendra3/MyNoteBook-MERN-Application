import React, { useEffect } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === "null") {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container">
        <AddNote alert={props.alert} />
        <Noteitem alert={props.alert} />
      </div>
    </div>
  );
};

export default Home;
