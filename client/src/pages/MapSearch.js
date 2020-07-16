import React, { Component } from 'react';
import "../assets/css/style.css";
import Nav from '../components/Nav';
import PlacesSearchBox from "../components/PlacesSearchBox"
import DefaultMapMarker from "../components/DefaultMapMarker"
import CustomMapMarker from "../components/CustomMapMarker"
import DirectionsOverlay from "../components/DirectionsOverlay"
import { PlaceCard, PlaceCardContainer } from "../components/PlaceCard"
import { ModalComment } from "../components/Modal";
import api from "../utils/API"

import { BicyclingLayer, GoogleMap, LoadScript} from "@react-google-maps/api";

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
const searchBounds = {
    south: 43.6292253, 
    west: -79.4687767,
    north: 43.6816042, 
    east: -79.3252018
}

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

class GoogleMapPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      map: null,
      response: null,
      center: { lat: 43.651070, lng:  -79.347015 },
      zoom: 15,
      searchBoxMessage: '',
      searchResult: null,
      places: [],
      origin: null,
      destination: null
    }

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  onSearchResultChanged = autocomplete => {
    if (autocomplete !== null) {
      this.setState({searchResult: getPlaceObject(autocomplete.getPlace())});
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  selectPlace = place => {
    if(this.state.destination === null)
      this.setState({ destination: place});
    else
      this.setState({origin: place});
  }

  /**
   * Recenter map and update nearby POIs after destination updates
   */
  componentDidUpdate(prevProps, prevState) {
      if(prevState.searchResult !== this.state.searchResult)
        this.drawNewResults();

      if(prevState.destination !== this.state.destination || prevState.origin !== this.state.origin)
        this.updateSearchBoxMessage();
  }

  drawNewResults = () => {
    if (this.state.searchResult !== null){

      api.getBixiBikeLocations(this.state.searchResult.location.lat, this.state.searchResult.location.lng)
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
            let realTimeData = realTimeResp.data.filter(rt => rt.number === station.id);
            station["currentData"] = realTimeData.length > 0 ? realTimeData[0] : {}; 
          });
        })
        .catch(err => console.log(err));
        
        this.setState({ 
          center: this.state.searchResult.location,
          zoom: 17,
          places: stationsResp.data.map(place => <CustomMapMarker key={place.id} place={place} selectPlace={this.selectPlace}/>)});
      })
      .catch(err => console.log(err));
    }
  }

  updateSearchBoxMessage(){
    if(this.state.destination === null)
      this.setState({searcBoxMessage: "Find your Destination Station"});
    else
      this.setState({searchBoxMessage: "Find your BixiBike!"});
  }

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])
 
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])
 
  render() { 
    return(
    <div style={containerFull}>
        <Nav />
          <div style={{height:"100%"}}>
          <LoadScript googleMapsApiKey="AIzaSyDCjcIFpFhSIYjZCOl4WnzOGLhqNqWxH9k" libraries={libraries}>
            <GoogleMap 
              id="map-canvas"
              mapContainerStyle={containerStyle}
              center={this.state.center} 
              zoom={this.state.zoom}
                //onLoad={onLoad}
                // onUnmount={onUnmount}
              >

                {(this.state.origin === null || this.state.destination === null) &&
                <PlacesSearchBox 
                  placeholder={this.state.searchBoxMessage}
                  bounds={searchBounds}
                  onPlaceChanged={this.onSearchResultChanged}/>}

                {this.state.places}

                {this.state.searchResult !== null &&
                  <DefaultMapMarker location={this.state.searchResult.location}/>}
                <ModalComment />
                <BicyclingLayer/>
                  
                <PlaceCardContainer>
                  {this.state.destination !== null &&
                      <PlaceCard 
                        type="Destination" 
                        place={this.state.destination} discardPlace={() => this.setState({destination:null})}/>
                  }

                  {
                    this.state.origin !== null &&
                    <PlaceCard type="Origin" place={this.state.origin} discardPlace={() => this.setState({origin: null})}/>
                  }
                </PlaceCardContainer>

                {
                  (this.state.origin !== null && this.state.destination !== null) && (
                <DirectionsOverlay 
                  origin={this.state.origin}
                  navResponse={this.state.response}
                  destination={this.state.destination}
                  directionsCallback={this.directionsCallback}
                />)}
                
            </GoogleMap>
          
          </LoadScript> 
        </div>

    </div>
  )}
}
 
export default GoogleMapPage