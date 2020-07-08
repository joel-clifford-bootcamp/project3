import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Map from "../Map";
import Nav from "../Nav";
function MapContainer() {
  return (
    <div>
      <Nav />
      <LoadScript googleMapsApiKey="g">
        <Map />
      </LoadScript>
    </div>
  );
}
export default MapContainer;
