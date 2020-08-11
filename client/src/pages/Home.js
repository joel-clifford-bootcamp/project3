import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import "../style.css";
import api from "../utils/API";

function Home() {
  return (
    <div className="homepageBackground">
      <Nav />
      <div>
        <h1>
          Find Your <span>Perfect Place.</span>
        </h1>
      </div>
      <div className="row hide-on-small-only">
        <div className="col s12 m12 l12">
          <ul className="tabs s12 m12 buttonBackground center-align">
            <li className="tab col s12">
              {/* <li className="tab col s4"> */}
              {/* <li className="tab col s3"> */}
              <Link to="/route" className="buttonLink">
                <button className="button buttonHome">
                  <i className="medium material-icons center">map</i>
                </button>
              </Link>
              <a className="linkNames" href="/route">
                  <li>Find a Bixi Bike and Map A Safe Route</li>
              </a>
            </li>
            {/* <li className="tab col s4"> */}
            {/* <li className="tab col s3"> */}
            {/* <Link to="/bikeshare" className="buttonLink">
                <button className="button buttonHome">
                  <i className="medium material-icons center">location_on</i>
                </button>
              </Link>
              <a className="active linkNames" href="/bikeshare">
                Find a Bixi Bike
              </a>
            </li> */}
            {/* "Park Your Bike" Still to be completed */}
            {/* <li className="tab col s4"> */}
            {/* <li className="tab col s3"> */}
            {/* <Link  to="/parking" className="buttonLink"> */}
            {/* <Link to="#" className="buttonLink disabled">
                <button className="button buttonHome">
                  <i className="medium material-icons center">local_parking</i>
                </button>
              </Link>
              <a className="linkNames" href="/station">
                Park Your Bike
              </a>
            </li> */}
            {/* "Rate a Parking Spot" Still to be completed */}
            {/* <li className="tab col s3">
              <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                      <i className="medium material-icons center">star</i>
                  </button>
              </Link>
              <a href="/" className="linkNames">Rate a Parking Spot</a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="hide-on-med-and-up">
        <ul className="center-align">
          <li>
            <Link to="/route" className="buttonLink">
              <button className="button buttonHome">
                <i className="medium material-icons center">map</i>
              </button>
            </Link>
          </li>
          <li>
            {/* <a className="linkNames" href="/route">
              Map A Safe Route
            </a> */}
            <a className="linkNames" href="/route">
              Find a Bixi Bike
            </a>
          </li>
          <li>
            <a className="linkNames" href="/route">
              Map A Safe Route
            </a>
            {/* <a className="linkNames" href="/route">
                Find a Bixi Bike
            </a> */}
          </li>
          {/* <li className="col s12"> */}
          {/* <li className="col s12 disabled">
            <Link to="/bikeshare" className="buttonLink">
              <button className="button buttonHome">
                <i className="medium material-icons center">location_on</i>
              </button>
            </Link>
          </li>
          <li>
            <a className="linkNames" href="/bikeshare">
              Find a Bixi Bike
            </a>
          </li>
          <li className="col s12">
            <Link to="/parking" className="buttonLink">
              <button className="button buttonHome">
                <i className="medium material-icons center">local_parking</i>
              </button>
            </Link>
          </li>
          <li>
            <a className="linkNames" href="/station">
              Park Your Bike
            </a>
          </li> */}
          {/* <li className="col s12">
              <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                      <i className="medium material-icons center">star</i>
                  </button>
              </Link>
            </li>
            <li>  
              <a href="/" className="linkNames">Rate a Parking Spot</a>
            </li> */}
        </ul>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Home;
