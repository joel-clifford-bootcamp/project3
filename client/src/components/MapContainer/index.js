import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FindRoute from "../FindRoute";
import FindBike from "../FindBike";
import FindParking from "../FindParking";
import Nav from "../Nav";
function MapContainer() {
  return (
    <div>
      <Nav/>
      <LoadScript googleMapsApiKey="AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE">
      <Router>
      <div>
        <Switch>
          <Route exact path={["/route"]} >
            <FindRoute />
          </Route>
          <Route exact path={["/station"]} >
            <FindBike/>
          </Route>
          <Route exact path={["/parking"]} >
            <FindParking />
          </Route>
        </Switch>
      </div>
    </Router>
      </LoadScript>
    </div>
  );
}
export default MapContainer;