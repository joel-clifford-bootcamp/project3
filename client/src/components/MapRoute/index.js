import React from "react";
import "./index.css";

function MapRoute() {
  return (
    <div>
        <div id="map-canvas"></div>
            <div id="right-panel">
                <section className="profile">
                    <h5 id="detour" className="carpool">
                        Your route...
                    </h5>
                  <table id="pRoute" className="carpool">
                      <thead>
                        <tr>
                            <th>Origin address</th>
                            <th>Destination address</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td id="pOrigin" className="detour"></td>
                            <td id="pDestination" className="detour"></td>
                          </tr>
                      </tbody>
                      <thead>
                        <tr className="passengerDirect">
                            <th>Distance</th>
                            <th>Duration</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr className="passengerDirect">
                            <td id="dDistance" className="detour"></td>
                            <td id="dDuration" className="detour"></td>
                          </tr>
                        </tbody>
                    </table>
                    <h5 id="detour" className="carpool">
                        Driver detour...
                    </h5>
                  <table className="carpool">
                      <thead>
                        <tr>
                            <th>Route to parking</th>
                            <th>Duration to parking</th>
                            <th>Time difference</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td id="distanceToParking" className="detour">wait...</td>
                            <td id="detouredTime" className="detour">wait...</td>
                            <td id="difference" className="detour">wait...</td>
                          </tr>
                      </tbody>
                    </table>
                </section>
            </div>
    </div>
    );
}

export default MapRoute;