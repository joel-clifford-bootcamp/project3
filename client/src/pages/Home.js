import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import "../home.css";

function Home() {
  return (
    <div>
      <Nav />
      <div>
        <h1>
          Find Your <span>Perfect Place.</span>
        </h1>
      </div>
      {/* <div className="row mood-button-row">
                    <div className="col s1"><button type="button" className="mood-buttons map"><img
                                src="./assets/images/emoticons/Thankly-Face-1.png"
                                className="mood-btn-img" /></button></div>
                    <div className="col s1"><button type="button" className="mood-buttons park"><img
                                src="./assets/images/emoticons/Thankly-Face-2.png"
                                className="mood-btn-img" /></button></div>
                    <div className="col s1"><button type="button" className="mood-buttons find"><img
                                src="./assets/images/emoticons/Thankly-Face-3.png"
                                className="mood-btn-img" /></button></div>
                    <div className="col s1"><button type="button" className="mood-buttons rate"><img
                                src="./assets/images/emoticons/Thankly-Face-4.png"
                                className="mood-btn-img" /></button></div>
                </div>
        <div className="row s12 m12 l12">
            <div className="col s3"><button className="button buttonHome"><i className="fas fa-map icon"></i></button><h5>Map A Safe Route</h5></div>
            <div className="col s3"><button className="button buttonHome"><i className="fas fa-parking icon"></i></button>Park Your Bike</div>
            <div className="col s3"><button className="button buttonHome"><i className="fas fa-map-marker-alt icon"></i></button>Find a Bixi Bike</div>
            <div className="col s3"><button className="button buttonHome"><i className="fas fa-star icon"></i></button>Rate a Parking Spot</div> 
        </div> */}
      <div className="row s12">
        <div className="col s12 m12 l12">
          <ul className="tabs s12 m12">
            <li className="tab col s3">
              <button className="button buttonHome">
              <a href="/map"><i className="fas fa-map icon"></i></a>
              </button>
              <a className="linkNames" href="/map">Map A Safe Route</a>
            </li>
            <li className="tab col s3">
              <button className="button buttonHome">
              <a href="/map">
                  <i className="fas fa-parking icon"></i>
                  </a>
              </button>
              <a className="linkNames" href="/map">Park Your Bike</a>
            </li>
            <li className="tab col s3">
              <button className="button buttonHome">
              <a href="/map">
                  <i className="fas fa-map-marker-alt icon"></i>
                </a>
                </button>
              <a className="active linkNames" href="/map">
              Find a Bixi Bike
              </a>
            </li>
            <li className="tab col s3 disabled">
              <button className="button buttonHome">
              <a href="/map">
                  <i className="fas fa-star icon"></i>
                </a>
              </button>
              <a 
              href="/map"
              className="linkNames">
                  Rate a Parking Spot</a>
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
    </div>
  );
}

export default Home;
