import React, { Component } from "react";
import "../assets/css/style.css";
// import Nav from '../components/Nav';
// import { SideBarReact, SideBarNav, SideBarButton } from "../components/SideBar";

import LoactionSearch from "../components/LocationSearch";
import DefaultMapMarker from "../components/DefaultMapMarker";
import CustomMapMarker from "../components/CustomMapMarker";
import DirectionsOverlay from "../components/DirectionsOverlay";
import { PlaceCard, PlaceCardContainer } from "../components/PlaceCard";
import { ModalComment } from "../components/Modal";
import api from "../utils/API";

import { BicyclingLayer, GoogleMap, LoadScript } from "@react-google-maps/api";
import { PrimaryButton } from "../components/Buttons";
import LocationSearch from "../components/LocationSearch";
import Sidebar from "react-sidebar";
// import SideBarReactResponsive from "../components/SideBarComponent";
// import SideBarReact from "../components/SideBarComponent";
import {
  SideBarReact,
  SideBarButtonReact,
} from "../components/SideBarComponent";
// import { SideBarReact, SideBarReactResponsive, SideBarNav, SideBarButton } from "../components/SideBarComponent";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { SideNav, SideNavItem, Icon, Button } from "react-materialize";
import "react-pro-sidebar/dist/css/styles.css";

/**********************************************************************/
/* IMPORTANT: LoadsCript and API shared used in MapContainer component*/
/**********************************************************************/

// let googleKey;

// if(process.env.google_key_1) {
//   googleKey = process.env.google_key_1
// }
// else{
//   try{
//   const googleKeys = require("../utils/google_keys.json");
//   googleKey = googleKeys.key1;
//   } catch{}
// }

const containerFull = {
  width: "100vw",
  height: "100vh",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

// // api libraries for LoadScript
// const libraries = ['places']

// Bounds for autocomplete search results
const searchBounds = {
  south: 43.6292253,
  west: -79.4687767,
  north: 43.6816042,
  east: -79.3252018,
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

class GoogleMapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      response: null,
      center: { lat: 43.65107, lng: -79.347015 },
      zoom: 15,
      searchBoxMessage: "Find your Destination Station",
      searchResult: null,
      places: [],
      origin: null,
      destination: null,
      sidebarOpen: true,
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
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

  onSearchResultChanged = (autocomplete) => {
    if (autocomplete !== null) {
      this.setState({ searchResult: getPlaceObject(autocomplete.getPlace()) });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

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

  /**
   * Recenter map and update nearby POIs after destination updates
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResult !== this.state.searchResult)
      this.drawNewResults();

    if (
      prevState.destination !== this.state.destination ||
      prevState.origin !== this.state.origin
    )
      this.updateSearchBoxMessage();
  }

  drawNewResults = () => {
    if (this.state.searchResult !== null) {
      api
        .getBixiBikeLocations(
          this.state.searchResult.location.lat,
          this.state.searchResult.location.lng
        )
        .then((stationsResp) => {
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

  updateSearchBoxMessage() {
    if (this.state.destination === null)
      this.setState({ searcBoxMessage: "Find your Destination Station" });
    else this.setState({ searchBoxMessage: "Find your BixiBike!" });
  }

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  render(props) {
    return (
      <div>
        {/* <SideBarReactResponsive /> */}
        {/* <ProSidebar>
          <Menu iconShape="square">
            <MenuItem 
            // icon={<FaGem />}
            >Dashboard</MenuItem>
            <SubMenu title="Components" 
            // icon={<FaHeart />}
            >
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar> */}
        ;{/* <SideBarButton /> */}
        <div className="col 6">
          {/* <div style={containerFull}> */}
          {/* <Nav /> */}
          <div style={{ height: "100%" }}>
            {/* <LoadScript googleMapsApiKey={googleKey} libraries={libraries}> */}
            <GoogleMap
              id="map-canvas"
              mapContainerStyle={containerStyle}
              center={this.state.center}
              zoom={this.state.zoom}
            >
              <LocationSearch
                origin={this.state.origin}
                destination={this.state.destination}
                searchBoxMessage={this.state.searchBoxMessage}
                searchBounds={searchBounds}
                useCurrentLocation={this.selectCurrentLocation}
                onSearchResultChanged={this.onSearchResultChanged}
              />
              {this.state.places}

              {this.state.searchResult !== null && (
                <DefaultMapMarker location={this.state.searchResult.location} />
              )}
              <ModalComment />
              <BicyclingLayer />

              {
                /** If a destination, but not origin, has been selected, convert its map marker into a non-clickable one*/
                this.state.destination !== null &&
                  this.state.origin === null && (
                    <DefaultMapMarker location={this.state.destination} />
                  )
              }

              {
                /** If an origin has been selected, convert its map marker into a non-clickable one*/
                this.state.origin !== null &&
                  this.state.destination === null && (
                    <DefaultMapMarker location={this.state.origin} />
                  )
              }

              <PlaceCardContainer>
                {
                  /** If a destination has been selected, show its location card */
                  this.state.destination !== null && (
                    <PlaceCard
                      type="Destination"
                      place={this.state.destination}
                      discardPlace={() => this.setState({ destination: null })}
                    />
                  )
                }

                {
                  /** If an origin has been selected, show its location card */
                  this.state.origin !== null && (
                    <PlaceCard
                      type="Origin"
                      place={this.state.origin}
                      discardPlace={() => this.setState({ origin: null })}
                    />
                  )
                }
              </PlaceCardContainer>

              {
                /** If an origin and destination have been seelcted, show route */
                this.state.origin !== null &&
                  this.state.destination !== null && (
                    <DirectionsOverlay
                      origin={this.state.origin}
                      navResponse={this.state.response}
                      destination={this.state.destination}
                      directionsCallback={this.directionsCallback}
                    />
                  )
              }
            </GoogleMap>
            {/* <SideBarReact /> */}

            {/* </LoadScript>  */}
          </div>
        </div>
        <div className="col 6">
          <div>
            <button
              className="btn waves-effect waves-light z-depth-5 sideBarButton"
              type="button"
              onClick={() => this.onSetSidebarOpen(true)}
            >
              <Icon>chevron_right</Icon>
            </button>
            <Sidebar
              sidebar={<b>Sidebar content</b>}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: "white" } }}
            ></Sidebar>
            {/* <SideBarButtonReact />
              <SideBarReact /> */}
          </div>

          {/* <SideBarButtonReact /> */}
          {/* <SideBarReact /> */}
        </div>
        {/* <SideBarNav /> */}
        {/* <SideBarReact /> */}
      </div>
    );
  }
}

export default GoogleMapPage;
