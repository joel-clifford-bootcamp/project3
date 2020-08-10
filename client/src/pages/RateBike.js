import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  Autocomplete,
  BicyclingLayer,
} from "@react-google-maps/api";
import "../assets/css/style.css";
import "../style.css";
import api from "../utils/API";
import CustomMapMarker from "../components/CustomMapMarker";
import DefaultMapMarker from "../components/DefaultMapMarker";
import {
  SideBarReact,
  SideBarButtonReact,
} from "../components/SideBarComponent";
import Sidebar from "react-sidebar";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { SideNav, SideNavItem, Icon, Button } from "react-materialize";
import "react-pro-sidebar/dist/css/styles.css";

//Toronto, ON
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

class RateBike extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      searchBoxMessage: "Enter your position",
      findWhat: "findStation",
      response: null,
      travelMode: "BICYCLING",
      center: { lat: 43.65107, lng: -79.347015 },
      origin: "", // input origin
      zoom: 11,
      destination: "", // input destination
      originAddress: "", // full origin address from google
      destinationAddress: "", // full destination address from google
      distance: "", // distance in km
      duration: "", // time in hours and minutes
      searchResult: null,
      showInfoWindow: false,
      infoWindowPosition: {},
      places: [],
      bikeAround: false, // true when button clicked to find closer stations or parkings
      sidebarOpen: true,
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this);
    this.distancesCallback = this.distancesCallback.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  handleSelection = (event) => {
    let value = event.target.value;
    // Updating the selection input value
    this.setState({
      findWhat: value,
      response: null,
      origin: "",
      destination: "",
      duration: "",
      distance: "",
      bikeAround: false,
    });

    this.origin.value = "";

    if (value === "findRoute") {
      this.setState({
        searchBoxMessage: 'Origin (e.g. "CN Tower")',
      });
    }
  };

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    this.autocomplete = autocomplete;
  }

  onPlaceChanged = () => {
    if (this.autocomplete !== null && this.state.findWhat !== "findRoute") {
      this.setState({
        searchResult: getPlaceObject(this.autocomplete.getPlace()),
        distance: "zero", // used to stop continuous querry
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
    console.log(this.state.searchResult);
  };

  directionsCallback = (response) => {
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
  };

  distancesCallback = (results) => {
    if (
      results !== null &&
      results.rows[0].elements[0].distance !== null &&
      results.rows[0].elements[0].duration !== null
    ) {
      console.log("results " + JSON.stringify(results));
      this.setState(() => ({
        originAddress: results.originAddresses[0],
        destinationAddress: results.destinationAddresses[0],
        distance: results.rows[0].elements[0].distance.text,
        duration: results.rows[0].elements[0].duration.text,
      }));
    }
  };

  getOrigin = (ref) => {
    this.origin = ref;
    console.log("ref origin:", ref);
    console.log("this.origin:", this.origin);
  };

  getDestination = (ref) => {
    this.destination = ref;
    console.log("ref destination:", ref);
    console.log("this.destination:", this.destination);
  };

  onClick = (e) => {
    e.preventDefault();
    if (this.state.findWhat === "findRoute") {
      if (this.origin.value !== "" && this.destination.value !== "") {
        this.setState(() => ({
          //Grabbing the origin and destination from the user inputs to find a bike route
          origin: this.origin.value,
          destination: this.destination.value,
          duration: "",
          distance: "",
        }));
      }
    } else if (
      this.origin.value !== "" &&
      this.state.findWhat !== "findRoute"
    ) {
      this.setState(() => ({
        //Grabbing the origin from the user inputs to find a bixi station or a bike parking
        origin: this.origin.value,
        destination: this.origin.value,
        duration: "",
        distance: "",
        bikeAround: true,
      }));
    }
  };
  /*********************************************************************************************/
  /* The code below (written by Joel) retrieve the the closests bixi stations from user position 
/*********************************************************************************************/

  //  onSearchResultChanged = autocomplete => {
  //   if (autocomplete !== null) {
  //     this.setState({searchResult: getPlaceObject(autocomplete.getPlace())});
  //   } else {
  //     console.log('Autocomplete is not loaded yet!')
  //   }
  // }

  selectPlace = (place) => {
    if (this.state.destination === null)
      this.setState({
        destination: place,
        searchResult: null,
        places: [...this.state.places].filter((p) => p === place),
      });
    else
      this.setState({
        origin: place,
        searchResult: null,
        places: this.state.places.filter((p) => p === place),
      });
  };

  selectCurrentLocation = (_) => {
    console.log("current location click");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      this.setState({
        searchResult: {
          name: "Current Location",
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        },
      });
    });
  };

  componentDidUpdate() {
    if (this.state.searchResult !== null && this.state.distance === "zero") {
      this.drawNewResults();
      this.setState({
        distance: "",
      });
    }

    // if(prevState.destination !== this.state.destination || prevState.origin !== this.state.origin)
    //   this.updateSearchBoxMessage();
  }

  drawNewResults = () => {
    if (this.state.searchResult !== null) {
      api
        .getBixiBikeLocations(
          this.state.searchResult.location.lat,
          this.state.searchResult.location.lng
        )
        .then((stationsResp) => {
          console.log(stationsResp.data);
          // parse floats that sequeslize query literal is returning as strings
          stationsResp.data.forEach((x) => {
            x.lat = parseFloat(x.lat);
            x.lng = parseFloat(x.lng);
            x.coordDiff = parseFloat(x.coordDiff);
            x.obj_type = "bixi";
          });

          // Retrieve realtime data for stations returned by initial search
          api
            .getBixiStationAvailability(
              stationsResp.data.map((station) => station.id)
            )
            .then((realTimeResp) => {
              // Attach realtime data to each result
              stationsResp.data.forEach((station) => {
                let realTimeData = realTimeResp.data.filter(
                  (rt) => rt.number === station.id
                );
                station["currentData"] =
                  realTimeData.length > 0 ? realTimeData[0] : {};
              });
            })
            .catch((err) => console.log(err));

          this.setState({
            center: this.state.searchResult.location,
            zoom: 17,
            places: stationsResp.data.map((place) => (
              <CustomMapMarker
                key={place.id}
                place={place}
                selectPlace={this.selectPlace}
              />
            )),
          });
        })
        .catch((err) => console.log(err));
    }
  };

  /*******************************************************************************/

  render() {
    return (
      <div>
        <div className="container">
          <GoogleMap
            // Map container
            id="map-canvas"
            // Initial zoom
            zoom={this.state.zoom}
            // Map initial center in Toronto
            center={this.state.center}
            // onClick={() => console.log("Map clicked!")}
          >
            {/* {this.setState.places} */}
            {/* Child components, such as markers, info windows, etc. */}
            {this.state.duration === "" &&
              this.state.origin !== "" &&
              this.state.destination !== "" &&
              this.state.origin !== this.state.destination && (
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

            {/* rendering bixi stations markers */}
            {this.state.bikeAround === true && this.state.places}

            {this.state.searchResult !== null && (
              <DefaultMapMarker location={this.state.searchResult.location} />
            )}
            <BicyclingLayer />

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
              this.state.distance === "" &&
              this.state.findWhat === "findRoute" && (
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

          <div id="rightPanelRate" className="center-align">
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
            </div>
            <div>
              <button
                className="btn waves-effect waves-light z-depth-5 mapButton"
                type="button"
                onClick={this.onClick}
              >
                Find Your Bike
              </button>
            </div>

            <table className="row z-depth-5">
              {/* <thead className="thead" id="topRow">
                <tr>
                  <th colSpan="2" className="columnTitle">
                    Origin
                  </th>
                </tr>
              </thead>

              <tbody className="white">
                <tr>
                  <td colSpan="2">{this.state.originAddress}</td>
                </tr>
              </tbody>
              <thead className="thead">
                <tr>
                  <th colSpan="2" className="columnTitle">
                    Your Bike
                  </th>
                </tr>
              </thead> */}

              <tbody className="white">
                <tr>
                  <td colSpan="2">{this.state.destinationAddress}</td>
                </tr>
              </tbody>

              <thead className="thead" id="rateRow">
                <tr>
                  <th className="columnTitle" id="locationColumnRate">
                    Location
                  </th>
                  <th className="columnTitle" id="distanceColumnRate">
                    Distance
                  </th>
                  <th className="columnTitle" id="bikesColumnRate">
                    Bikes
                  </th>
                </tr>
              </thead>

              <tbody className="white">
                <tr>
                  <td>{this.state.distance}</td>
                  <td>{this.state.duration}</td>
                </tr>
              </tbody>
            </table>
            {/* <div>
              <button
                className="btn waves-effect waves-light z-depth-5 mapButton"
                type="button"
                onClick={this.onClick}
              >
                Walk Way
              </button>
            </div> */}
            <div className="container">
              <button
                className="btn waves-effect waves-light z-depth-5 sideBarButton"
                type="button"
                onClick={() => this.onSetSidebarOpen(true)}
              >
                <Icon>chevron_right</Icon>
              </button>
              <Sidebar
                sidebar={
                  <div>
                    <b style={{ padding: 20 }}>Sidebar content</b>
                    <ul>
                      <li>
                        <div className="user-view">
                          <div className="background"></div>
                          <a href="#user">
                            {/* <img
                              className="circle"
                              src="images/yuna.jpg"
                            /> */}
                          </a>
                          <a href="#name">
                            <span className="white-text name">John Doe</span>
                          </a>
                          <a href="#email">
                            <span className="white-text email">
                              jdandturk@gmail.com
                            </span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <a href="#!">
                          <i class="material-icons">cloud</i>First Link With
                          Icon
                        </a>
                      </li>
                      <li>
                        <a href="#!">Second Link</a>
                      </li>
                      <li>
                        <div className="divider"></div>
                      </li>
                      <li>
                        <h6 className="subheader">Subheader</h6>
                      </li>
                      <li>
                        <a classNName="waves-effect" href="#!">
                          Third Link With Waves
                        </a>
                      </li>
                    </ul>
                    {/* <div> */}

                    {/* </div> */}
                    {/* <button
                      className="btn waves-effect waves-light z-depth-5 sideBarButton"
                      type="button"
                      onClick={() => this.onSetSidebarOpen(false)}
                    >
                      <Icon>chevron_left</Icon>
                    </button> */}
                  </div>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{
                  sidebar: {
                    background: "white",
                    zIndex: 2,
                    position: "fixed",
                    top: 65,
                  },
                  root: { position: "relative" },
                }}
              ></Sidebar>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RateBike;
