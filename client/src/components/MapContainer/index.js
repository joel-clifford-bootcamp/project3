import React, { Component } from "react";
import "./index.css";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: 43.651070, 
  lng: -79.347015
};

function MapContainer() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE"
    >
      <GoogleMap
        id={"map-canvas"}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        
      </GoogleMap>
       <div id="right-panel">
                <section className="profile">
                    <h5 id="detour" className="carpool">
                        Your route...
                    </h5>
                  <table className="table mx-auto  mb-0  border">
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
    </LoadScript>
  )
}
 
export default React.memo(MapContainer)

