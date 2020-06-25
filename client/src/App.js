import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/books"]}>
            <Books />
          </Route>
          <Route exact path={["/login"]}>
            <Login />
          </Route>
          <Route exact path={["/register"]}>
            <Register />
          </Route>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path={["/profile"]}>
            <Profile />
          </Route>
          <Route exact path={["/search"]}>
            <Search />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
