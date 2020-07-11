import React from "react";
import { Link } from "react-router-dom";
import "../../style.css";
import fullLogo from "../../assets/NarrowLogo.png";


function Nav() {
  
  return (
    <nav className="transparent z-depth-0">
      <div className="nav-wrapper">
        <div>
          <img className="brandLogo" src={fullLogo} alt="Full White Logo"></img>
        </div>
          <ul className="right">
            <li className="nav-item">
              <Link
                to="/home"
                className={
                  window.location.pathname === "/home" ||
                  window.location.pathname === "/home"
                    ? "nav-link active"
                    : "nav-link"
                }
                id="homeLink"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={
                  window.location.pathname === "/profile" ? "nav-link active" : "nav-link"
                }
                id="profileLink"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signin"
                className={
                  window.location.pathname === "/signin"
                    ? "nav-link active"
                    : "nav-link"
                }
                id="mapLink"
              >
                Sign Out
              </Link>
            </li>
            
          </ul>
        {/* </div> */}
      </div>
    </nav>
  // );
  );
}

export default Nav;