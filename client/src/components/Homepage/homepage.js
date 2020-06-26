import React from "react";

function Homepage() {
  return (
    <div>
        <h1>Find Your Perfect Place.</h1>
        <div class="row">
            <div class="col s3">Map A Safe Route</div>
            <div class="col s3">Park Your Bike</div>
            <div class="col 31">Find a Bixi Bike</div>
            <div class="col s3">Rate a Parking Spot</div>
        </div>
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s3"><a href="#test1">Routes</a></li>
                    <li class="tab col s3"><a class="active" href="#test2">Find a Bixi Bike</a></li>
                    <li class="tab col s3 disabled"><a href="#test3">Find a Parking Spot</a></li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Homepage;