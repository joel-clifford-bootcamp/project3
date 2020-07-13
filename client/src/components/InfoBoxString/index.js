import "./style.css";
import React, { Component } from "react";
import { ModalButton, ModalComment } from "../Modal";
import M from "materialize-css";

function InfoBoxString() {
  return (
    <div>
      {/* <div id="content"> */}
        {/* <div id="siteNotice"></div> */}
        {/* <h1 id="firstHeading" class="firstHeading">
          Location
        </h1> */}
        <div id="bodyContent">
          <div>
            <h5 className="LocationName">Location Name</h5>
          </div>
          <div>
            <p className="addressLine1">42 Wallaby Way</p>
            <p className="cityAndProvinceAndPostalCode">Sydney, NSW</p>
            <p className="country">Australia</p>
          </div>
          <div>
            <p className="ratingCount">No Ratings</p>
          </div>
          <div>
            <p className="capacity">Capacity: 0</p>
          </div>
          <div>
            <ModalButton />
          </div>
        </div>
      </div>
    // </div>
  );
}

export default InfoBoxString;
