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
import { duration } from "moment";

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
      findWhat: "findStation",
      response: null,
      travelMode: "BICYCLING",
      origin: "", // input origin
      destination: "", // input destination
      originAddress: "Submit request...", // full origin address from google
      destinationAddress: "Submit request...", // full destination address from google
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
          results: null,
          origin: "",
          destination:"",
          duration: "",
          distance: "",

        });
    this.origin.value = "";
   this.destination = ""
    
    console.log(this.state.findWhat, this.state.duration, this.state.duration )
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
                    // required
                    callback={this.directionsCallback}
                    // optional
                    onLoad={(directionsService) => {
                      console.log(
                        "DirectionsService onLoad directionsService: ",
                        directionsService
                      );
                    }}
                    // optional
                    onUnmount={(directionsService) => {}}
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
                  // optional
                  onLoad={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onLoad directionsRenderer: ",
                      directionsRenderer
                    );
                  }}
                  // optional
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onUnmount directionsRenderer: ",
                      directionsRenderer
                    );
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
                    // optional
                    onLoad={(distanceMatrixService) => {
                      console.log(
                        "DirectionsRenderer onLoad directionsRenderer: ",
                        distanceMatrixService
                      );
                    }}
                    // optional
                    onUnmount={(distanceMatrixService) => {
                      console.log(
                        "DirectionsRenderer onUnmount directionsRenderer: ",
                        distanceMatrixService
                      );
                    }}
                    onPlaceChanged={this.onPlaceChanged}
                  />
                )}
            </GoogleMap>

            <div id="right-panel" className="center-align">
              <div className="row z-depth-5 inputs">
                <div className="col s12">
                  <div className="form-group">
                    <label className="white-text" htmlFor="ORIGIN">
                      Origin
                    </label>
                    <br />
                    <Autocomplete
                      onLoad={this.onLoad}
                      onPlaceChanged={this.onPlaceChanged}
                    >
                      <input
                        id="ORIGIN"
                        className="white"
                        type="text"
                        ref={this.getOrigin}
                        // defaultValue="CN Tower"
                        placeholder='Origin (e.g. "CN Tower")'
                      />
                    </Autocomplete>
                  </div>
                </div>

              {this.state.findWhat==="findRoute" && (<div className="col s12">
              <div className="form-group">
                <label className="white-text" htmlFor="DESTINATION">
                  Destination
                </label>
                <br />
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
