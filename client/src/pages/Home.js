import React from "react";
import Nav from "../components/Nav"
import "../home.css";

function Home() {
  return (
    <div>
        <Nav />
        <h1>Find Your <span>Perfect Place.</span></h1>
        <div className="row mood-button-row">
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
            <div className="col s3">Map A Safe Route</div>
            <div className="col s3">Park Your Bike</div>
            <div className="col s3">Find a Bixi Bike</div>
            <div className="col s3">Rate a Parking Spot</div>
        </div>
        <div className="row s12">
            <div className="col s12 m12 l12">
                <ul className="tabs s12">
                    <li className="tab col s3"><a href="#test1">Routes</a></li>
                    <li className="tab col s3"><a href="#test3">Find a Parking Spot</a></li>
                    <li className="tab col s3"><a className="active" href="#test2">Find a Bixi Bike</a></li>
                    <li className="tab col s3 disabled"><a href="#test4">Rate</a></li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Home;