import React, { useState, useEffect, Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from '../Map'




function MapContainer() {
  
  return (
    <LoadScript
      googleMapsApiKey=''
    >
      <Map />
    </LoadScript>
  )
    
}


  export default MapContainer

