import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  Autocomplete,
  BicyclingLayer
} from "@react-google-maps/api";
import "../style.css";
import api from "../utils/API"
import CustomMapMarker from "../components/CustomMapMarker"

const center = {
  lat: 43.65107,
  lng: -79.347015,
};

// Convert object returned form places API to a custom one
const getPlaceObject = (googlePlace) => {
  return {
    location: {
      lat: googlePlace.geometry.location.lat(),
      lng: googlePlace.geometry.location.lng(),
    },
    icon: googlePlace.icon,
    viewport: googlePlace.geometry.viewport,
    addressElement: googlePlace.adr_address,
    name: googlePlace.name,
    address: googlePlace.formatted_address,
  };
};

class FindRoute extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      searchBoxMessage: 'Enter your position',
      findWhat: "findStation",
      response: null,
      travelMode: "BICYCLING",
      origin: "", // input origin
      destination: "", // input destination
      originAddress: "", // full origin address from google
      destinationAddress: "", // full destination address from google
      distance: "", // distance in km
      duration: "", // time in hours and minutes
      showInfoWindow: false,
      infoWindowPosition: {},
      places: [],
      address: "",
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this);
    this.distancesCallback = this.distancesCallback.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleSelection = event => {
    let value = event.target.value;
        // Updating the selection input value
        this.setState({
          findWhat: value,
          response: null,
          origin: "",
          destination:"",
          duration: "",
          distance: "",
        });
      if (value === 'findRoute') {
      this.setState({
          searchBoxMessage: 'Origin (e.g. "CN Tower")',
        });
    }
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    this.autocomplete = autocomplete;
  }

  onPlaceChanged = () => {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  directionsCallback = response => {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }

  distancesCallback= results => {
    if (
      results !== null &&
      results.rows[0].elements[0].distance !== null &&
      results.rows[0].elements[0].duration !== null
    ) {
      this.setState(() => ({
        originAddress: results.originAddresses[0],
        destinationAddress: results.destinationAddresses[0],
        distance: results.rows[0].elements[0].distance.text,
        duration: results.rows[0].elements[0].duration.text,
      }));
    }
  }

  getOrigin= ref => {
    this.origin = ref;
    console.log("ref origin:", ref);
    console.log("this.origin:", this.origin);
  }

  getDestination = ref => {
    this.destination = ref;
    console.log("ref destination:", ref);
    console.log("this.destination:", this.destination);
  }

  onClick = e => {
      e.preventDefault();
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        //Grabbing the origin and destination from the user inputs
        origin: this.origin.value,
        destination: this.destination.value,
        duration: "",
        distance:""
      }));
    }
  }
/*********************************************************************************************/
/* The code below (written by Joel) retrieve the the closests bixi stations from user position 
/*********************************************************************************************/
  
   onSearchResultChanged = autocomplete => {
    if (autocomplete !== null) {
      this.setState({searchResult: getPlaceObject(autocomplete.getPlace())});
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  selectPlace = place => {
    if(this.state.destination === null)
      this.setState({ 
        destination: place,    
        searchResult: null,             
        places: [...this.state.places].filter(p => p === place)});
    else
      this.setState({
        origin: place, 
        searchResult: null,             
        places: this.state.places.filter(p => p === place )});
  }

  selectCurrentLocation = _ => {
    console.log("current location click")
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      this.setState({
        searchResult: {
          name: "Current Location",
          location: { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude  
          }
        }
      })
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
      if(prevState.searchResult !== this.state.searchResult)
        this.drawNewResults();

      // if(prevState.destination !== this.state.destination || prevState.origin !== this.state.origin)
      //   this.updateSearchBoxMessage();
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
          x.obj_type = "bixi";
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
 
/*******************************************************************************/

  render() {
    return (
      <div>
          <div className="container">
            <GoogleMap
              // Map container
              id="map-canvas"
              // Initial zoom
              zoom={10}
              // Map initial center in Toronto
              center={center}
              // onClick={() => console.log("Map clicked!")}
            >
              {/* {this.setState.places} */}
              {/* Child components, such as markers, info windows, etc. */}
              {this.state.duration === "" &&
                this.state.destination !== "" &&
                this.state.origin !== "" && (
                  <DirectionsService
                    // required
                    options={{
                      // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                      destination: this.state.destination,
                      origin: this.state.origin,
                      travelMode: this.state.travelMode,
                    }}
                    callback={this.directionsCallback}
                  />
              )}
             <BicyclingLayer/>
              {this.state.response !== null && (
                <DirectionsRenderer
                  // required
                  options={{
                    // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: this.state.response,
                  }}
                />
              )}
              {this.state.destination !== "" &&
                this.state.origin !== "" &&
                this.state.distance === "" && (
                  <DistanceMatrixService
                    // required
                    options={{
                      // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                      destinations: [this.state.destination],
                      origins: [this.state.origin],
                      travelMode: this.state.travelMode,
                    }}
                    // required
                    callback={this.distancesCallback}
                    onPlaceChanged={this.onPlaceChanged}
                  />
                )}
            </GoogleMap>

            <div id="right-panel" className="center-align">
              <div className="row z-depth-5 inputs">
                <div className="col s12">
                  <div className="form-group">
                    <Autocomplete
                      onLoad={this.onLoad}
                      onPlaceChanged={this.onPlaceChanged}
                    >
                      <input
                        id="origin"
                        className="white"
                        type="text"
                        ref={this.getOrigin}
                        // defaultValue="CN Tower"
                        placeholder={this.state.searchBoxMessage}
                      />
                    </Autocomplete>
                  </div>
                </div>

              {this.state.findWhat==="findRoute" && (<div className="col s12">
              <div className="form-group">
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <input
                    id="DESTINATION"
                    className="white"
                    type="text"
                    ref={this.getDestination}
                    // defaultValue="University of Toronto"
                    placeholder='Destination (e.g. "University of Toronto")'
                  />
                </Autocomplete>
              </div>
              </div>)}
                <div className="select-field left">
                  <label className="slct-label left">LOOKING FOR?</label>
                  <select className="browser-default"
                      onChange={this.handleSelection}>
                      <option value="findStation">BIXI STATION</option>
                      <option value="findParking">BIKE PARKING</option>
                      <option value="findRoute">BICYCLING ROUTE</option>
                    </select>
                </div>
              </div>
            {this.state.findWhat === "findRoute" && (
             <div>
                <button
                    className="findButton"
                  type="button"
                  id="findRoute"
                    onClick={this.onClick}
                  >
                    <i className="material-icons center">map</i>
                </button><br/>
                <p className="findButtonTitle">Map A Bike Route</p>
              </div>
              )}
              {this.state.distance!=="" && (<table className="row z-depth-5">
                <thead className="thead">
                  <tr>
                    <th colSpan="2" className="columnTitle">Origin</th>
                  </tr>
                </thead>

                <tbody className="white">
                  <tr>
                    <td colSpan="2">{this.state.originAddress}</td>
                  </tr>
                </tbody>
                <thead className="thead">
                  <tr>
                    <th colSpan="2" className="columnTitle">Destination</th>
                  </tr>
                </thead>

                <tbody className="white">
                  <tr>
                    <td colSpan="2">{this.state.destinationAddress}</td>
                  </tr>
                </tbody>
                <thead className="thead">
                  <tr>
                    <th className="columnTitle">Distance</th>
                    <th className="columnTitle">Time</th>
                  </tr>
                </thead>

                <tbody className="white">
                  <tr>
                    <td>{this.state.distance}</td>
                    <td>{this.state.duration}</td>
                  </tr>
                </tbody>
            </table>)}
            {(this.state.findWhat === "findStation" || this.state.distance !== "") &&
             <div>
                <button
                    className="findButton"
                  type="button"
                  id="findStation"
                    onClick={this.onClick}
                  >
                    <i className="material-icons center">location_on</i>
                </button><br/>
                <p className="findButtonTitle">Close Bixi Stations</p>
              </div>}
            {(this.state.findWhat === "findParking" || this.state.distance !== "") &&
              <div>
                <button
                    className="findButton"
                  type="button"
                  id="findStation"
                    onClick={this.onClick}
                  >
                    <i className="material-icons center">local_parking</i>
                </button><br/>
                <p className="findButtonTitle">Close Bike Parkings</p>
              </div>}
              
            </div>
          </div>
      </div>
    );
  }
}

export default FindRoute;
