import React from "react";
import "./style.css";
import profilePicture from "./placeholder.png";
import placeholder from "./placeholder2.jpg";
// import { Foo, Bar } from "../Rating";



// This file exports the UserCard and RecentActivityCard components
export function UserCard(props) {
  return (
    // <div className="row">
    <div className="col s12 m12 ccenter-align">
      <div className="col s12 m4 ccenter-align"></div>
      <div className="col s12 m4 ccenter-align">
        <div
          className="card sticky-action userCard z-depth-5"
          style={
            {
              // width: "20rem",
              // height: "20rem",
              // margin: "auto",
              // padding: "10px",
              // textAlign: "center",
            }
          }
        >
          <div className="card-content">
            <span className="card-title">
              <h4
                className="userNameHeading red-text text-lighten-1"
                style={{ margin: "10px", textAlign: "center" }}
              >
                User Name
              </h4>
            </span>
          </div>
          <div
            className="card-image"
            // style={{ margin: "10px" }}
          >
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons">add</i>
            </a>
            <img
              className="responsive-img userImage"
              src="http://via.placeholder.com/150x150"
              width="100"
              height="100"
              alt="user_card_image"
            />
          </div>
          {/* <div className="card-image" style={{ margin: "10px" }}>
          <a className="btn-floating halfway-fab waves-effect waves-light red">
            <i className="material-icons">add</i>
          </a>
          <img src={{ placeholder }} />
        </div> */}
          <div
            className="card-content"
            // style={{ padding: "10px", margin: "10px" }}
          >
            <p className="userEmailHeading" style={{ textAlign: "center" }}>
              <a
                href="mailto:user@email.com"
                target="_blank"
                style={{ margin: "10px", color: "cyan darken-1" }}
                // style={{ margin: "10px", color: "white" }}
              >
                user@email.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="col s12 m4 ccenter-align"></div>
    </div>
  );
}

export function RecentActivityCard(props) {
  return (
    <div>
      {/* <div className="row"> */}
      {/* <div className="col s12 m4"> */}
      <div className="col mb-6 sm-12">
        <div
          className="card sticky-action recentCard z-depth-5"
          style={{
            // width: "20rem",
            // height: "auto",
            // margin: "auto",
            // padding: "10px",
            textAlign: "center",
          }}
        >
          <div className="card-content">
            <span className="card-title">
              <h5>Ride across town</h5>
            </span>
          </div>
          <div className="card-image" style={{ margin: "10px" }}>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons">add</i>
            </a>
            <img
              className="responsive-img activityImage"
              src="http://via.placeholder.com/100x100"
              width="100"
              height="100"
              alt="activity_card_image"
            />
          </div>
          <div
            className="card-content"
            style={{ padding: "10px", margin: "10px" }}
          >
              <div className="rating">
                <span className="1star">☆</span><span className="2star">☆</span><span className="3star">☆</span><span className="4star">☆</span><span className="5star">☆</span>
              </div>
              {/* <Foo />
              <Bar /> */}
            <p className="grey-text text-darken-1">
              This location is perfect for a weekend away.
            </p>
          </div>
          <div className="card-action" style={{ padding: "10px" }}>
            <a
              className="cardLink black-text"
              href="#"
              style={{ color: "000000", padding: "10px" }}
            >
              Open
            </a>
            <a
              className="cardLink black-text"
              href="#"
              style={{ color: "000000", padding: "10px" }}
            >
              Share
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
