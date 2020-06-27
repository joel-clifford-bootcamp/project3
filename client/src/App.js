import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav"
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/signin"]}>
            <SignIn />
          </Route>

          <Route exact path={["/signup"]}>
            <SignUp />
          </Route>

          <Route exact path={["/map"]}>
            <MapContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
