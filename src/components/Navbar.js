import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  let navigate = useNavigate();
  let location = useLocation(); //react router dom hook
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          mynotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") === "null" && (
            <Link className="btn mx-2" to="/login">
              <i className="fa-solid fa-user"></i>
            </Link>
          )}
          {localStorage.getItem("token") !== "null" && (
            <button
              className="btn mx-2"
              onClick={() => {
                localStorage.setItem("token", null);
                props.alert("Signed Out Succesfully", "success");

                navigate("/login");
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}

          {/* <button className="btn btn-outline-primary mx-2">Enable Dark Mode</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
