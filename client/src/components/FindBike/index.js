import React, {Component } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService, DistanceMatrixService} from '@react-google-maps/api';
import "../../assets/css/style.css";
import bixiAPI from "../../utils/bixiAPI"


//Map center in Toronto, ON
const center = {
              lat: 43.651070,
              lng:  -79.347015
}
let stationNames = [];
// bixiBike stations
  class FindBike extends Component {
    constructor(props) {
      super(props)

      this.state = {
        response: null,
        results: null,
        position: null,
        travelMode: 'BICYCLING',
        stations:[],
        originLat: '', // origin latitude
        originLong: '',// origin longitude
        destination: '', // selected station
        originAddress: 'Submit request...', // full origin address from google
        destinationAddress: 'Submit request...', // full destination address from google
        distance: '', // distance in km
        duration:'', // time in hours and minutes
      }
      this.findBike = this.findBike.bind(this)
      this.directionsCallback = this.directionsCallback.bind(this)
      this.distancesCallback = this.distancesCallback.bind(this)
      this.getOrigin = this.getOrigin.bind(this)
      this.getDestination = this.getDestination.bind(this)
    }

    componentDidMount() {
      if (navigator.geolocation) {
        let currentComponent = this;
        navigator.geolocation.getCurrentPosition(function (position) {
       currentComponent.setState(
          () => ({
             originLat: position.coords.latitude,
             originLong: position.coords.longitude,
           })
       )
      console.log(position.coords.longitude);
    });
      } else {
        prompt("Geolocation is not supported by this browser.");
      }
    };
  
    findBike() {
      bixiAPI.getStations()
        .then(res => {
          console.log(res);
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          if (this.origin.value !== '') {
            this.setState(
              () => ({
                //Grabbing the origin and destination from the user inputs
                origin: this.origin.value,
                stations: res.data
                })
            )
          }
          console.log(this.state.origin, this.state.stations)
        })
        .catch(err => console.log(err))
    };

   

    directionsCallback(response) {
      console.log(response)

      if (response !== null) {
        if (response.status === 'OK') {
          this.setState(
            () => ({
              response
            })
          )
        } else {
          console.log('response: ', response)
        }
      }
    }

    distancesCallback(results) {
         console.log("results "+ JSON.stringify(results))
      if (results !== null) {
      
      }
    }

   
    getOrigin(ref) {
      this.origin = ref
    }

    getDestination(ref) {
      this.destination = ref
    }

    
  
    render() {
      console.log(this.state.stationsNames)
      console.log(this.state.origin)
      return (
     <div>
           <GoogleMap
            // Map container
            id='map-canvas'
            // Initial zoom
            zoom={10}
            // Map initial center in Toronto
            center={center}

          >
            { /* Child components, such as markers, info windows, etc. */}
             {
             (this.state.stations.map(station =>
                <DistanceMatrixService
                  // required
                 // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destinations: [station.name], 
                    origins: [this.state.origin],
                    travelMode: this.state.travelMode
                  }}
                   // required
                  callback={this.distancesCallback}
                  // optional
                  onLoad={distanceMatrixService=> {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', distanceMatrixService)
                  }}
                  // optional
                  onUnmount={distanceMatrixService => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', distanceMatrixService)
                  }}
                />)               
              )
            }
           {
              ( 
                this.state.duration ==='' && this.state.destination !== '' &&
                this.state.origin !== ''
              ) && (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: this.state.travelMode
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                  }}
                />
              )
            }
            
            {
             (this.state.response !== null) && (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: this.state.response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
                
              )
            }
        
          </GoogleMap>
          <div id="right-panel" className='center-align'>
          <div className='row z-depth-5'>
            <div className='col s12'>
              <div className='form-group'>
                <label htmlFor='ORIGIN'>Your position</label>
                <br />
                <input id='ORIGIN' className='white' type='text' ref={this.getOrigin} defaultValue="CN Tower" />
              </div>
            </div>
          </div>
          <button className='btn waves-effect waves-light z-depth-5 mapButton' type='button' onClick={this.findBike}>
              Find your bike
          </button>
      <table className='row z-depth-5'>
        <thead className="thead">
          <tr>
              <th colSpan="2">Your Bike Station</th>
          </tr>
        </thead>

        <tbody  className="white">
          <tr>
            <td colSpan="2">{this.state.destinationAddress}</td>
          </tr>
        </tbody>
        <thead className="thead">
          <tr>
              <th>Distance</th>
              <th>Time</th>
          </tr>
        </thead>

        <tbody  className="white">
          <tr>
            <td>{this.state.distance}</td>
            <td>{this.state.duration}</td>
          </tr>
        </tbody>
      </table>
      <button className='btn waves-effect waves-light z-depth-5 mapButton' type='button' onClick={this.onClick}>
              Walk Way 
      </button>
      </div>
          
    </div>
      )
    }

  }

export default FindBike;