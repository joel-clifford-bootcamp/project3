import React from "react";
import "./style.css";
import profilePicture from "./placeholder.png";
import placeholder from "./placeholder2.jpg";

// This file exports the Input, TextArea, and FormBtn components

export function UserCard(props) {
  return (
    <div className="row">
      <div className="col s12 m5">
        <div
          className="card-panel sticky-action medium cyan darken-1"
          style={{
            height: "20rem",
            width: "20rem",
            backgroundImage: `url(${profilePicture})`,
            margin: "auto",
            padding: "10px",
            border: "5px", 
            borderStyle: "solid",
            borderColor: "#fafafa",
            textAlign: "center"
          }}
        ></div>
      </div>
    </div>
  );
}

export function RecentActivityCard(props) {
  return (
    <div>
      <div className="row">
        <div className="col s12 m7">
          <div className="card sticky-action large" 
          style={{ 
            // width: "20rem", 
            // height: "auto",
            margin: "auto",
            padding: "10px",
            textAlign: "center"
          }}
          
          >
            <div className="card-content">
              <span className="card-title">
                <h4>Recent Activity</h4>
              </span>
              <h5>Ride across town</h5>
            </div>
            <div className="card-image" style={{ margin: "10px"}}>
              <a className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="material-icons">add</i>
              </a>
              <img src={{ placeholder }} />
            </div>
            <div className="card-content" 
            style={{ padding: "10px", margin: "10px"}}
            >
              <p className="grey-text text-darken-1">This location is perfect for a weekend away.</p>
            </div>
            <div className="card-action" 
            style={{ padding: "10px" }}
            >
              <a className="cardLink black-text" href="#" style={{ color: "000000", padding: "10px" }} >
                Open
              </a>
              <a className="cardLink black-text" href="#" style={{ color: "000000", padding: "10px" }}>
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
