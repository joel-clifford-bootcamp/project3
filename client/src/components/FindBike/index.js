import React, {Component } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService, DistanceMatrixService} from '@react-google-maps/api';
import "../../assets/css/style.css";


//Toronto, ON
const center = {
              lat: 43.651070,
              lng:  -79.347015
}

  class FindBike extends Component {
    constructor(props) {
      super(props)

      this.state = {
        response: null,
        results: null,
        position: null,
        travelMode: 'BICYCLING',
        origin: '', // origin input
        originLat: '', // origin latitude
        originLong: '',// origin longitude
        destination: '', // selected station
        originAddress: 'Submit request...', // full origin address from google
        destinationAddress: 'Submit request...', // full destination address from google
        distance: '', // distance in km
        duration:'', // time in hours and minutes
      }
      this.directionsCallback = this.directionsCallback.bind(this)
      this.distancesCallback = this.distancesCallback.bind(this)
      this.getOrigin = this.getOrigin.bind(this)
      this.getDestination = this.getDestination.bind(this)
      this.onClick = this.onClick.bind(this)
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
      if (results !== null && results.rows[0].elements[0].distance !== null && results.rows[0].elements[0].duration !== null) {
        console.log('results '+ JSON.stringify(results))
         this.setState(
          () => ({
             originAddress: results.originAddresses[0],
            destinationAddress: results.destinationAddresses[0],
             distance: results.rows[0].elements[0].distance.text,
             duration: results.rows[0].elements[0].duration.text
           })
         )
      }
    }

   
    getOrigin(ref) {
      this.origin = ref
    }

    getDestination(ref) {
      this.destination = ref
    }

      onClick(e) {
         e.preventDefault();
      if (this.origin.value !== '' && this.destination.value !== '') {
        this.setState(
          () => ({
            //Grabbing the origin and destination from the user inputs
            origin: this.origin.value,
            destination: this.destination.value
            })

        )
      }
      }
  
    render() {
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
             {
             ( 
               this.state.destination !== '' &&
                this.state.origin !== '' && this.state.distance === ''
              ) && (
                <DistanceMatrixService
                  // required
                 // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destinations: [this.state.destination],
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
          <button className='btn waves-effect waves-light z-depth-5 mapButton' type='button' onClick={this.onClick}>
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