import React from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import { M } from "materialize-css";
import {Link} from "react-router-dom";
import "../style.css";

function Home() {
  return (
    <div className="homepageBackground">
      <Nav/>
      <div>
        <h1>
          Find Your <span>Perfect Place.</span>
        </h1>
      </div>
      <div className="row s12">
        <div className="col s12 m12 l12">
          <ul className="tabs s12 m12 buttonBackground">
            <li className="tab col s3">
              <Link  to="/route" className="buttonLink">
                  <button className="button buttonHome">
                    <i className="medium material-icons center">map</i>
                  </button>
              </Link>
              <a className="linkNames" href="/route">Map A Safe Route</a>
            </li>
            <li className="tab col s3">
              <Link  to="/parking" className="buttonLink">
                <button className="button buttonHome">
                  <i className="medium material-icons center">local_parking</i>
                </button>
              </Link>
              <a className="linkNames" href="/station">Park Your Bike</a>
            </li>
            <li className="tab col s3">
             <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                    <i className="medium material-icons center">location_on</i>
                  </button>
              </Link> 
              <a className="active linkNames" href="/station">Find a Bixi Bike</a>
            </li>
            <li className="tab col s3">
              {/* <li className="tab col s3 disabled"> */}
              <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                      <i className="medium material-icons center">star</i>
                  </button>
              </Link>
              <a href="/map" className="linkNames">Rate a Parking Spot</a>
            </li>
            {/* <li className="tab col s3">
              <button className="button buttonHome">
                <i className="fas fa-map icon"></i>
              </button>
              <a href="#test1">Map A Safe Route</a>
            </li>
            <li className="tab col s3">
              <button className="button buttonHome">
                <i className="fas fa-parking icon"></i>
              </button>
              <a href="#test2">Park Your Bike</a>
            </li>
            <li className="tab col s3">
              <button className="button buttonHome">
                <i className="fas fa-map-marker-alt icon"></i>
              </button>
              <a className="active" href="#test3">
                Find a Bixi Bike
              </a>
            </li>
            <li className="tab col s3 disabled">
              <button className="button buttonHome">
                <i className="fas fa-star icon"></i>
              </button>
              <a href="#test4">Rate a Parking Spot</a>
            </li> */}

            {/* <li className="tab col s3"><a href="#test1">Routes</a></li>
                    <li className="tab col s3"><a href="#test3">Find a Parking Spot</a></li>
                    <li className="tab col s3"><a className="active" href="#test2">Find a Bixi Bike</a></li>
                    <li className="tab col s3 disabled"><a href="#test4">Rate</a></li> */}
          </ul>
        </div>
      </div>
      <div className="container">
      </div>
    </div>
  );
}

export default Home;
