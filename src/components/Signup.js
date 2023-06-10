import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = (props) => {
  let navigate = useNavigate();
  const [names, setnames] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [cpassword, setcpassword] = useState("");
  const signup = (name, email, password) => {
    axios
      .post("http://localhost:5000/api/auth/createuser", {
        name,
        email,
        password,
      })
      .then(async (response) => {
        if (response.data.s) {
          await localStorage.setItem("token", response.data.AuthToken);
          navigate("/");
          props.alert("SignUp Sucessful", "success");
        } else {
          props.alert("SignUp unsucessful", "error");
        }
      });
  };
  return (
    <div>
      <div className="container my-7" style={{ marginTop: "5%" }}>
        <div className="container text-center my-4">
          {" "}
          <h1>Welcome Aboard!</h1>
        </div>

        <div className="d-flex justify-content-center">
          <br />
          <form>
            <div className="form-outline mb-4">
              <input
                type="name"
                id="form2Example1"
                className="form-control"
                placeholder="Name"
                onChange={(event) => {
                  setnames(event.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example12"
                className="form-control"
                placeholder="Email"
                onChange={(event) => {
                  setemail(event.target.value);
                }}
                minLength={5}
                required
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                placeholder="Password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2eExample2"
                className="form-control"
                placeholder="Confirm Password"
                onChange={(event) => {
                  setcpassword(event.target.value);
                }}
                minLength={5}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={() => {
                  if (password !== cpassword) {
                    alert("Pasword and confirm password doesnt match!");
                  } else {
                    signup(names, email, password);
                  }
                }}
              >
                Sign Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
