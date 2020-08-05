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
import FindRoute from "../../pages/FindRoute";
import FindBike from "../FindBike";
import FindParking from "../FindParking";
import Nav from "../Nav";
import MapSearch from "../../pages/MapSearch"

// api libraries for LoadScript
const libraries = ['places']

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
        <LoadScript googleMapsApiKey="AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE" libraries={libraries}>
          <Router>
            <div>
              <Switch>
                <Route exact path={["/route"]}>
                    <FindRoute />
                </Route>
                <Route exact path={["/station"]}>
                  <FindBike />
                </Route>
                <Route exact path={["/parking"]}>
                  <FindParking />
                </Route>
                 <Route exact path={["/bikeshare"]}>
                  <MapSearch />
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
