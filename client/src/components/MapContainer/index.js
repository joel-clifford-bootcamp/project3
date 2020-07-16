import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  InfoWindow,
  Marker,
  InfoBox,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FindRoute from "../FindRoute";
import FindBike from "../FindBike";
import FindParking from "../FindParking";
import Nav from "../Nav";

class MapContainer extends Component {
  // function MapContainer() {

  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <LoadScript googleMapsApiKey="AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE">
          <Router>
            <div>
              <Switch>
                <Route exact path={["/route1"]}>
                    <FindRoute />
                </Route>
                <Route exact path={["/station"]}>
                  <FindBike />
                </Route>
                <Route exact path={["/parking"]}>
                  <FindParking />
                </Route>
              </Switch>
            </div>
          </Router>
        </LoadScript>
      </div>
    );
  }
}
export default MapContainer;
