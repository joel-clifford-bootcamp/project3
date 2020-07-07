import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
} from "@react-google-maps/api";
import "./index.css";

//Toronto, ON
const center = {
  lat: 43.65107,
  lng: -79.347015,
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "BICYCLING",
      origin: "", // input origin
      destination: "", // input destination
      originAddress: "Submit request...", // full origin address from google
      destinationAddress: "Submit request...", // full destination address from google
      distance: "", // distance in km
      duration: "", // time in hours and minutes
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.distancesCallback = this.distancesCallback.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  directionsCallback(response) {
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

  distancesCallback(results) {
    if (results !== null) {
      console.log("results " + results);
      this.setState(() => ({
        originAddress: results.originAddresses[0],
        destinationAddress: results.destinationAddresses[0],
        distance: results.rows[0].elements[0].distance.text,
        duration: results.rows[0].elements[0].duration.text,
      }));
    }
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick(e) {
    e.preventDefault();
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        //Grabbing the origin and destination from the user inputs
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  }

  render() {
    return (
      <div>
        <GoogleMap
          // Map container
          id="map-canvas"
          // Initial zoom
          zoom={10}
          // Map initial center in Toronto
          center={center}
        >
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
          {this.state.response !== null && (
            <DistanceMatrixService
              // required
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
            />
          )}
        </GoogleMap>
        {/* Build root */}
        <div id="right-panel" className="center-align">
          <div className="row z-depth-5">
            <div className="col s12">
              <div className="form-group">
                <label className="white-text" htmlFor="ORIGIN">
                  Origin
                </label>
                <br />
                <input
                  id="ORIGIN"
                  className="white"
                  type="text"
                  ref={this.getOrigin}
                />
              </div>
            </div>

            <div className="col s12">
              <div className="form-group">
                <label className="white-text" htmlFor="DESTINATION">
                  Destination
                </label>
                <br />
                <input
                  id="DESTINATION"
                  className="white"
                  type="text"
                  ref={this.getDestination}
                />
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary z-depth-5"
            type="button"
            onClick={this.onClick}
          >
            Build Route
          </button>
          <table className="row z-depth-5">
            <thead className="teal">
              <tr>
                <th colspan="2">Origin</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td colspan="2">{this.state.originAddress}</td>
              </tr>
            </tbody>
            <thead className="teal">
              <tr>
                <th colspan="2">Destination</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td colspan="2">{this.state.destinationAddress}</td>
              </tr>
            </tbody>
            <thead className="teal">
              <tr>
                <th>Distance</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td>{this.state.distance}</td>
                <td>{this.state.duration}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Build root end */}

      </div>
    );
  }
}

export default Map;
