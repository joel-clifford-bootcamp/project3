import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NavLanding() {
  return (
<nav className="blue-grey lighten-5">
  <div className="nav-wrapper">
      <Link className="brand-logo" to="/signup" id="logoLink"
>
        Link N Park
      </Link>
      <div>
        <ul className="right hide-on-med-and-down" id="nav-mobile">
          {/* <li className="nav-item">
            <Link
              to="/home"
              className={
                window.location.pathname === "/home" || window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
              id="homeLink"
            >
              Home
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link
              to="/profile"
              className={window.location.pathname === "/profile" ? "nav-link active" : "nav-link"}
              id="profileLink"
            >
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/map"
              className={window.location.pathname === "/map" ? "nav-link active" : "nav-link"}
              id="mapLink"
            >
              Map
            </Link>
          </li> */}
            {/* <li className="nav-item">
            <Link
              to="/search"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              Search
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link
              to="/contact"
              className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"}
            >
              Contact
            </Link>
          </li> */}
        </ul>
      </div>
  </div>
    </nav>

  );
}

export default NavLanding;
