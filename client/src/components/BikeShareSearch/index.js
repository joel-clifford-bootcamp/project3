import React, {Component } from 'react';
import "../../assets/css/style.css";
import Nav from '../Nav';

import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  InfoWindow,
  Marker,
  InfoBox,
  LoadScript,
} from "@react-google-maps/api";


const containerStyle = {
  width: '100%',
  height: '100%'
};

//Toronto, ON
const center = {
  lat: 43.651070,
  lng:  -79.347015
}


function BikeShareSearch() {
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
      googleMapsApiKey="AIzaSyDCjcIFpFhSIYjZCOl4WnzOGLhqNqWxH9k"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default BikeShareSearch