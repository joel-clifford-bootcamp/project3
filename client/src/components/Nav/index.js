import React from "react";
import { Link } from "react-router-dom";
import "../../style.css";
import fullLogo from "../../assets/NarrowLogo.png";
// import M from "materialize-css";
// import M from  'materialize-css/dist/js/materialize.min.js';

function Nav() {

//   const slide_menu = document.querySelectorAll(".sidenav");

//         M.Sidenav.init(slide_menu, {});
  
  return (
    <nav className="transparent z-depth-0">
      <div className="nav-wrapper">
        <div class="brand-logo">
          <span className="hide-on-small-only">
            <img className="primaryLogo" src={fullLogo} alt="Full White Logo"></img>
          </span>
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
              ><span className="hide-on-small-only">
                  Home
                </span>
                <span className="hide-on-med-and-up">
                  <i class="material-icons navIcons">home</i>
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={
                  window.location.pathname === "/profile" ? "nav-link active" : "nav-link"
                }
                id="profileLink"
              ><span className="hide-on-small-only">
              Profile
            </span>
            <span className="hide-on-med-and-up">
              <i class="material-icons navIcons">person</i>
            </span>
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
                id="signoutLink"
              ><span className="hide-on-small-only">
              Sign Out
            </span>
            <span className="hide-on-med-and-up">
              <i class="material-icons navIcons">exit_to_app</i>
            </span>
              </Link>
            </li>
          </ul>
          </div>  
      </div>
    </nav>
  );
}

export default Nav;