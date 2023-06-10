import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = (props) => {
  let navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const oubmit = () => {
    axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.s) {
          await localStorage.setItem("token", response.data.AuthToken);
          props.alert("Login Sucessful", "success");
          navigate("/");
        } else {
          props.alert("Login unsucessful", "error");
        }
      });
  };
  return (
    <>
      <div className="container my-7" style={{ marginTop: "5%" }}>
        <div className="container text-center my-4">
          {" "}
          <h1>Welcome Back!</h1>
        </div>

        <div className="d-flex justify-content-center">
          <br />
          <form>
            <div
              className="form-outline mb-4"
              style={{ justifyContent: "center " }}
            >
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={(event) => {
                  setemail(event.target.value);
                }}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                name="mail"
                className="form-control"
                placeholder="Password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={oubmit}
              >
                Sign in
              </button>
            </div>
            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Sign Up!</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
