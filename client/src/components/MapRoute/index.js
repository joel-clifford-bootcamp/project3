import React from "react";
import "./index.css";

function mapRoute() {
  return (
    <div>
       <div id="map-canvas"></div>
    <div id="right-panel">
        <section class="profile">
            <h5 id="detour" class="carpool" style="width:95%; padding-left: 10px; color: green; display: none;">
                Your route...
            </h5>
            <table id="pRoute" class="carpool" style="width:95%;  display: none;">
                <tr>
                    <th>Origin address</th>
                    <th>Destination address</th>
                </tr>
                <tr>
                    <td id="pOrigin" class="detour"></td>
                    <td id="pDestination" class="detour"></td>
                </tr>
                <tr class="passengerDirect">
                    <th>Distance</th>
                    <th>Duration</th>
                </tr>
                <tr class="passengerDirect">
                    <td id="dDistance" class="detour"></td>
                    <td id="dDuration" class="detour"></td>
                </tr>
            </table>
            <h5 id="detour" class="carpool" style="width:95%; padding-left: 10px; color: green; display: none;">
                Driver detour...
            </h5>
            <table class="carpool" style="width:95%; display: none;">
                <tr>
                    <th>Route to parking</th>
                    <th>Duration to parking</th>
                    <th>Time difference</th>
                </tr>
                <tr>
                    <td id="distanceToParking" class="detour">wait...</td>
                    <td id="detouredTime" class="detour">wait...</td>
                    <td id="difference" class="detour">wait...</td>
                </tr>
            </table>
        </section>
    </div>
              <section class="profile">
                  <h5 id="detour" class="carpool" style="width:95%; padding-left: 10px; color: green; display: none;">
                    Your route...
                </h5>
                <table id="pRoute" class="carpool" style="width:95%;  display: none;">
                    <tr>
                        <th>Origin address</th>
                        <th>Destination address</th>
                    </tr>
                    <tr>
                        <td id="pOrigin" class="detour"></td>
                        <td id="pDestination" class="detour"></td>
                    </tr>
                    <tr class="passengerDirect">
                        <th>Distance</th>
                        <th>Duration</th>
                    </tr>
                    <tr class="passengerDirect">
                        <td id="dDistance" class="detour"></td>
                        <td id="dDuration" class="detour"></td>
                    </tr>
                </table>
                <h5 id="detour" class="carpool" style="width:95%; padding-left: 10px; color: green; display: none;">
                    Driver detour...
                </h5>
                <table class="carpool" style="width:95%; display: none;">
                    <tr>
                        <th>Route to parking</th>
                        <th>Duration to parking</th>
                        <th>Time difference</th>
                    </tr>
                    <tr>
                        <td id="distanceToParking" class="detour">wait...</td>
                        <td id="detouredTime" class="detour">wait...</td>
                        <td id="difference" class="detour">wait...</td>
                    </tr>
                </table>
                <div>
                </div>
            </section>
        </div>
    </div>
    );
}

export default mapRoute;