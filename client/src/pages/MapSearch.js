import React, { useState, useEffect } from 'react';
import "../assets/css/style.css";
import Nav from '../components/Nav';
import PlacesSearchBox from "../components/PlacesSearchBox"
import DefaultMapMarker from "../components/DefaultMapMarker"
import CustomMapMarker from "../components/CustomMapMarker"
import MapInfoWindow from "../components/MapInfoWindow"
import api from "../utils/API"

import {
  Autocomplete,
  BicyclingLayer,
  GoogleMap,
  StandaloneSearchBox,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  InfoWindow,
  Marker,
  InfoBox,
  LoadScript,
} from "@react-google-maps/api";
import InfoBoxString from '../components/InfoBoxString';


const containerFull = {
  width: '100vw',
  height: '100vh'
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

// api libraries for LoadScript
const libraries = ['places']

// Bounds for autocomplete search results
const searchBounds = [
  { lat: 43.6292253, lng: -79.4687767 },
  { lat: 43.6816042, lng: -79.3252018}
]

// Convert object returned form places API to a custom one
const getPlaceObject = googlePlace => {
  return {
    location: {
      lat: googlePlace.geometry.location.lat(), 
      lng: googlePlace.geometry.location.lng()
    },
    icon: googlePlace.icon,
    viewport: googlePlace.geometry.viewport,
    addressElement: googlePlace.adr_address,
    name: googlePlace.name,
    address: googlePlace.formatted_address
  }
}

function GoogleMapPage() {
  const [map, setMap] = useState(null);
  const [center, setCenter ] = useState({ lat: 43.651070, lng:  -79.347015 })
  const [zoom, setZoom ] = useState(15)
  const [destination, setDestination ] = useState({ location: null });
  const [places, setPlaces ] = useState([]);
  const [selectedPlace, setSelectedPlace ] = useState(null); 
  const [startLocation, setStart ] = useState({location:null});

  const onDestinationChanged = autocomplete => {
    if (autocomplete !== null) {
      setDestination(getPlaceObject(autocomplete.getPlace()))
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const selectPlace = (place) => {
    setSelectedPlace(place);
  }

  /**
   * Recenter map and update nearby POIs after destination updates
   */
  useEffect(() => {
      if (destination.location !== null){
        setCenter(destination.location);
        setZoom(17);

        api.getBixiBikeLocations(destination.location.lat, destination.location.lng)
        .then(stationsResp => {
          // parse floats that sequeslize query literal is returning as strings
          stationsResp.data.forEach(x => {
            x.lat = parseFloat(x.lat);
            x.lng = parseFloat(x.lng);
            x.coordDiff = parseFloat(x.coordDiff);
          });

          // Retrieve realtime data for stations returned by initial search
          api.getBixiStationAvailability(stationsResp.data.map(station => station.id))
          .then(realTimeResp => {
            // Attach realtime data to each result
            stationsResp.data.forEach(station => {
              let realTimeData = realTimeResp.data.filter(rt => rt.number == station.id);
              station["currentData"] = realTimeData.length > 0 ? realTimeData[0] : {}; 
            });
          })
          .catch(err => console.log(err));
          
          setPlaces(stationsResp.data.map(place => <CustomMapMarker key={place.id} selectPlace={selectPlace} place={place}/>));
        })
        .catch(err => console.log(err));
    }
  }, [destination])


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <div style={containerFull}>
        <LoadScript googleMapsApiKey="AIzaSyDCjcIFpFhSIYjZCOl4WnzOGLhqNqWxH9k" libraries={libraries}>
        <Nav />
          <GoogleMap 
            mapContainerStyle={containerStyle}
            center={center} 
            zoom={zoom}
              //onLoad={onLoad}
              // onUnmount={onUnmount}
            >
              <PlacesSearchBox 
                bounds={searchBounds}
                onPlaceChanged={onDestinationChanged}/>

              {places}
              <DefaultMapMarker location={destination.location}/>
              <BicyclingLayer/>
          </GoogleMap>
      </LoadScript>
    </div>
  )
}
 
export default GoogleMapPage