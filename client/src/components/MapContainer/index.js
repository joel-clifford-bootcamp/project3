import React, { useState, useEffect, Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from '../Map'




function MapContainer() {
  
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE'
    >
      <Map />
    </LoadScript>
  )
    
}


  export default MapContainer

