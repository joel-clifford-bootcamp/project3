import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import MapContainer from "./components/MapContainer";
import BikeShareSearch from "./components/BikeShareSearch";


function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={["/signin"]}>
            <SignIn />
          </Route>

          <Route exact path={["/signup"]}>
            <SignUp />
          </Route>

          <Route exact path={["/route"]} >
            <MapContainer />
          </Route>

          <Route exact path={["/parking"]} >
            <MapContainer />
          </Route>

           <Route exact path={["/station"]} >
            <MapContainer/>
          </Route>

          <Route exact path={["/bikeshare"]}>
            <BikeShareSearch/>
          </Route>


          <Route exact path={["/profile"]}>
            <Profile />
          </Route>

          <Route exact path={["/*"]}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
