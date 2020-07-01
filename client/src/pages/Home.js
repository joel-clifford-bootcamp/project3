import React from "react";
import Nav from "../components/Nav"
import "../home.css";



function Home() {
  return (
    <div>
        <Nav />
        <h1>Find Your <span>Perfect Place.</span></h1>
        <div className="row">
            <div className="col s3">Map A Safe Route</div>
            <div className="col s3">Park Your Bike</div>
            <div className="col 31">Find a Bixi Bike</div>
            <div className="col s3">Rate a Parking Spot</div>
        </div>
        <div className="row">
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s3"><a href="#test1">Routes</a></li>
                    <li className="tab col s3"><a className="active" href="#test2">Find a Bixi Bike</a></li>
                    <li className="tab col s3 disabled"><a href="#test3">Find a Parking Spot</a></li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Home;