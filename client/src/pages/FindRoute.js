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
import api from "../utils/API"
import CustomMapMarker from "../components/CustomMapMarker"
import DefaultMapMarker from "../components/DefaultMapMarker"
import NearbyTable from "../components/NearbyTable"
import Sidebar from "react-sidebar";

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

let originDuplicates =[]//stores duplicates of the origin for Google DistanceMatrix use
let nearbyNames = []; // nearby stations names
let nearbydDistances = []
let clickedStation = "";

class FindRoute extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      searchBoxMessage: 'Enter your position',
      findWhat: "findStation",
      response: null,
      results:null,
      travelMode: "BICYCLING",
      center: { lat: 43.65107, lng: -79.347015 },
      zoom: 11,
      origin: "", // input origin
      destination: "", // input destination
      clickedStation: "",
      originAddress: "", // full origin address from google
      destinationAddress: "", // full destination address from google
      distance: "", // distance in km
      duration: "", // time in hours and minutes
      searchResult: null,
      showInfoWindow: false,
      infoWindowPosition: {},
      places: [],
      bikeAround: false, // true when button clicked to find closer stations or parkings
      closestSations: [], // list of 10 closest stations with distance
      nearbyNames: [], // list of 10 closest stations'names
      originDuplicates:[], //Duplicates of the origin for Google DistanceMatrix use
      thead: "Your Position" // Table head(first) title
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this);
    this.distancesCallback = this.distancesCallback.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.getStation = this.getStation.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleSelection = event => {
    let value = event.target.value;
        // Updating the selection input value
        this.setState({
          findWhat: value,
          results:null,
          response: null,
          origin: "",
          destination:"",
          duration: "",
          distance: "",
          bikeAround: false,
          thead: "Your Position",
          travelMode: "BICYCLING",
          originDuplicates: [],
          nearbyNames: [],
          nearbydDistances: [],
          closestSations: [],
          searchResult: null,
        });
       
    this.origin.value = ""; // Input field reset
    
      if (value === 'findRoute') {
      this.setState({
        searchBoxMessage: 'Origin (e.g. "CN Tower")',
        thead: "Origin",
        travelMode:"WALKING"
        });
    }
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    this.autocomplete = autocomplete;
  }

  onPlaceChanged = () => {
    if (this.autocomplete !== null && this.state.findWhat!=="findRoute") {
      this.setState({
        searchResult: getPlaceObject(this.autocomplete.getPlace()),
        distance: "zero" // used to stop continuous querry
      });
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

  distancesCallback = results => {
    if (
      results !== null &&
      results.rows[0].elements[0].distance !== null &&
      results.rows[0].elements[0].duration !== null
    ) {
    

      if (this.state.findWhat !== "findRoute") {
        console.log(results.rows[0].elements.length)
      if (results.rows[0].elements.length) {
        nearbydDistances = []
       console.log(results) 
        results.rows[0].elements.forEach(station => {
          
          if (station.status !== "NOT_FOUND") {
            nearbydDistances.push({
            "value": station.distance.value,
            "text": station.distance.text
            }) 
          } else {
            // if no distance found
          nearbydDistances.push({
            "value": 100000000000000,
            "text": "NOT_FOUND"
          }) 
          }
        })
          let bikeStations = this.state.closestSations
          nearbydDistances.forEach(distance => {
            let index = nearbydDistances.indexOf(distance);
            bikeStations[index].distanceValue = nearbydDistances[index].value;
            bikeStations[index].distanceText = nearbydDistances[index].text;
            console.log(index, bikeStations[index])
          })
        
          console.log(bikeStations)
          bikeStations.sort((a, b) => (a.distanceValue > b.distanceValue) ? 1 : -1);
          this.setState(
            () => ({
              closestSations: bikeStations,
            })
          )
          console.log(bikeStations)
        }
      } else {
        this.setState(() => ({
        originAddress: results.originAddresses[0],
        destinationAddress: results.destinationAddresses[0],
        distance: results.rows[0].elements[0].distance.text,
        duration: results.rows[0].elements[0].duration.text,
      })); 
     }
    }  
  }

  getOrigin= ref => {
    this.origin = ref;
  }

  getDestination = ref => {
    this.destination = ref;
  }

  getStation = ref => {
    this.clickedStation = ref;
  }

  onClick = e => {
      e.preventDefault();
    if (this.state.findWhat === "findRoute") {
      if (this.origin.value !== "" && this.destination.value !== "") {
        this.setState(() => ({
          //Grabbing the origin and destination from the user inputs to find a bike route
          origin: this.origin.value,
          destination: this.destination.value,
          duration: "",
          distance:""
        }));
      }
      console.log(this.state.searchResult.address)
    } else if (this.origin.value !== "" && this.state.findWhat !== "findRoute") {
      if (this.state.searchResult !== null) {
       
       originDuplicates = [];
        nearbyNames = [];
          clickedStation = "";
      this.state.closestSations.forEach(station => { originDuplicates.push(this.state.searchResult.address) })
      this.state.closestSations.forEach(station =>{nearbyNames.push(station.name)})
       this.setState(() => ({
        //Grabbing the origin from the user inputs to find a bixi station or a bike parking
        origin: this.origin.value,
        destination: this.origin.value,
        originAddress: this.state.searchResult.address,
        results: null,
        duration: "",
        distance: "",
         bikeAround: true,
         originDuplicates: originDuplicates,
         nearbyNames: nearbyNames,
       }));
        console.log(e.target.id);
        clickedStation = e.target.id;
        console.log(clickedStation)
        if (!(e.target.id === "findBixi" || e.target.id === "findRoute" || e.target.id === "findParking")) {
          

              this.setState(() => ({
              // Grabbing the clecked station name    
                destination: clickedStation
              }));
            console.log(this.state.destination)

        }
      } else {
        prompt("Autocomplete not loaded")
        return
      }
     
    } 
  }
/*********************************************************************************************/
/* The code below (written by Joel) retrieve the closests bixi stations from user position 
/*********************************************************************************************/
  
  //  onSearchResultChanged = autocomplete => {
  //   if (autocomplete !== null) {
  //     this.setState({searchResult: getPlaceObject(autocomplete.getPlace())});
  //   } else {
  //     console.log('Autocomplete is not loaded yet!')
  //   }
  // }

  selectPlace = place => {
    if(this.state.destination === null)
      this.setState({ 
        destpkjjjination: place,    
        searchResult: null,             
        places: [...this.state.places].filter(p => p === place)});
    else
      this.setState({
        origin: place, 
        searchResult: null,             
        places: this.state.places.filter(p => p === place )});
  }

  selectCurrentLocation = _ => {
    console.log("current location click")
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      this.setState({
        searchResult: {
          name: "Current Location",
          location: { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude  
          }
        }
      })
    });
  }
  
  componentDidUpdate() {
    if (this.state.searchResult !== null && this.state.distance==="zero") {
      this.drawNewResults();
       this.setState({
        distance: ""
      })
  }

      // if(prevState.destination !== this.state.destination || prevState.origin !== this.state.origin)
      //   this.updateSearchBoxMessage();
  }
  
   drawNewResults = () => {
    if (this.state.searchResult !== null){
      api.getBixiBikeLocations(this.state.searchResult.location.lat, this.state.searchResult.location.lng)
        .then(stationsResp => {
          console.log(stationsResp.data)
        this.setState({
          closestSations:stationsResp.data
        });
        // parse floats that sequeslize query literal is returning as strings
        stationsResp.data.forEach(x => {
          x.lat = parseFloat(x.lat);
          x.lng = parseFloat(x.lng);
          x.coordDiff = parseFloat(x.coordDiff);
          x.obj_type = "bixi";
        });

        // Retrieve realtime data for stations returned by initial search
        api.getBixiStationAvailability(stationsResp.data.map(station => station.id))
        .then(realTimeResp => {
          // Attach realtime data to each result
          stationsResp.data.forEach(station => {
            let realTimeData = realTimeResp.data.filter(rt => rt.number === station.id);
            station["currentData"] = realTimeData.length > 0 ? realTimeData[0] : {}; 
          });
        })
        .catch(err => console.log(err));
        
        this.setState({ 
          center: this.state.searchResult.location,
          zoom: 17,
          places: stationsResp.data.map(place => <CustomMapMarker key={place.id} place={place} selectPlace={this.selectPlace}/>)});
      })
      .catch(err => console.log(err));
    }
  }
 
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
                this.state.origin !== "" && this.state.destination !== "" && this.state.origin !== this.state.destination  && (
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
            
            {this.state.searchResult !== null &&
            <DefaultMapMarker location={this.state.searchResult.location}/>}
             <BicyclingLayer/>

             
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
                this.state.distance === "" &&  this.state.findWhat === "findRoute" &&(
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

            <div id="right-panel" className="center-align">
              <div className="row z-depth-5 inputs">
                <div className="col s12">
                   <div className="form-group routeForm">
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

              {this.state.findWhat==="findRoute" && (<div className="col s12">
              <div className="form-group">
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
                  <label className="slct-label left">FIND</label>
                  <select className="browser-default"
                      onChange={this.handleSelection}>
                      <option value="findStation">BIXI STATION</option>
                      <option value="findParking">BIKE PARKING</option>
                      <option value="findRoute">CYCLING ROUTE</option>
                    </select>
                </div>
              </div>
            {this.state.findWhat === "findRoute" && (
             <div>
                <button
                    className="findButton"
                  type="button"
                  onClick={this.onClick}
                  >
                    <i className="material-icons center" id="findRoute">map</i>
                </button><br/>
                <p className="findButtonTitle">Map A Bike Route</p>
              </div>
              )}
            {(this.state.distance !== "" || this.state.bikeAround === true) && (
              <table className="row z-depth-5">
                <thead className="thead" id="topRow">
                  <tr>
                    <th colSpan="2" className="columnTitle">{this.state.thead}</th>
                  </tr>
                </thead>

                <tbody className="white">
                  <tr>
                    <td colSpan="2">{this.state.originAddress}</td>
                  </tr>
                </tbody>
                { (this.state.distance !== "") && 
                <thead className="thead">
                  <tr>
                    <th colSpan="2" className="columnTitle">Destination</th>
                  </tr>
                </thead>}

                { (this.state.distance !== "") && 
                  <tbody className="white">
                  <tr>
                    <td colSpan="2">{this.state.destinationAddress}</td>
                  </tr>
                  </tbody>}
                
                { (this.state.distance !== "") && 
                  <thead className="thead" id="bottomRow">
                  <tr>
                    <th className="columnTitle">Distance</th>
                    <th className="columnTitle">Time</th>
                  </tr>
                </thead>}

                { (this.state.distance !== "") && 
                  <tbody className="white">
                  <tr>
                    <td>{this.state.distance}</td>
                    <td>{this.state.duration}</td>
                  </tr>
                </tbody>}
            </table>)}
            {(this.state.findWhat === "findStation" || this.state.distance !== "") &&
             <div>
                <button
                  className="findButton"
                  type="button"
                  onClick={this.onClick}
                  >
                    <i className="material-icons center" id="findBixi">location_on</i>
                </button><br/>
                <p className="findButtonTitle">Nearby Bixi Stations</p>
              </div>}
            {(this.state.findWhat === "findParking" || this.state.distance !== "") &&
              <div>
                <button
                  className="findButton"
                  type="button"
                  id="findStation"
                    onClick={this.onClick}
                  >
                    <i className="material-icons center" id="findParking">local_parking</i>
                </button><br/>
                <p className="findButtonTitle">Nearby Bike Parking</p>
              </div>}
             {/** If an origin and destination have been seelcted, show route */
                  (this.state.origin !== null && this.state.destination !== null && this.state.bikeAround===true) && (
                <NearbyTable 
                  origin={this.state.origin}
                  destination = {this.state.destination}
                  origins={this.state.originDuplicates}
                   destinations={this.state.nearbyNames}
                  closestSations={this.state.closestSations}
                  distancesCallback={this.distancesCallback}
                  directionsCallback={this.directionsCallback}
                  onClick={this.onClick}
                  results={this.state.results}
                  getStation={this.getStation}
                  clickedStation = {this.state.clickedStation}
                />
               )
                  }

            </div>
          </div>
      </div>
    );
  }
}

export default FindRoute;
