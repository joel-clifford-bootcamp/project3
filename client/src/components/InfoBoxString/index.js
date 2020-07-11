import "./style.css";
import React, { Component } from "react";
import Modal from "../Modal";
import M from "materialize-css";

function InfoBoxString() {
  
    return (
      <div>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">
            Location
          </h1>
          <div id="bodyContent">
            <div></div>
            <p>
            </p>
            <Modal />
          </div>
        </div>
      </div>
    );
  }

export default InfoBoxString;
