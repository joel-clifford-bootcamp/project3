import React from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
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
      <div className="row hide-on-small-only">
        <div className="col s12 m12 l12">
          <ul className="tabs s12 m12 buttonBackground center-align">
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
          </ul>
        </div> 
        </div>
        <div className="hide-on-med-and-up">
          <ul className="center-align">
            <li>
              <Link  to="/route" className="buttonLink">
                  <button className="button buttonHome">
                    <i className="medium material-icons center">map</i>
                  </button>
              </Link>
            </li>
            <li>  
              <a className="linkNames" href="/route">Map A Safe Route</a>
            </li>
            <li className="col s12">
              <Link  to="/parking" className="buttonLink">
                <button className="button buttonHome">
                  <i className="medium material-icons center">local_parking</i>
                </button>
              </Link>
            </li>
            <li>  
              <a className="linkNames" href="/station">Park Your Bike</a>
            </li>
            <li className="col s12">
             <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                    <i className="medium material-icons center">location_on</i>
                  </button>
              </Link>
            </li>
            <li>   
              <a className="active linkNames" href="/station">Find a Bixi Bike</a>
            </li>
            <li className="col s12">
              {/* <li className="tab col s3 disabled"> */}
              <Link  to="/station" className="buttonLink">
                  <button className="button buttonHome">
                      <i className="medium material-icons center">star</i>
                  </button>
              </Link>
            </li>
            <li>  
              <a href="/map" className="linkNames">Rate a Parking Spot</a>
            </li>
          </ul>
        </div>    
      <div className="container"></div>
    </div>
  );
}

export default Home;