import React, {Component } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import "./index.css";


//Toronto, ON
const center = {
              lat: 43.651070,
              lng:  -79.347015
            }
let loaded = false;

  class Map extends Component {
    constructor(props) {
      super(props)

      this.state = {
        response: null,
        travelMode: 'BICYCLING',
        origin: '',
        destination: ''
      }

      this.directionsCallback = this.directionsCallback.bind(this)
      this.getOrigin = this.getOrigin.bind(this)
      this.getDestination = this.getDestination.bind(this)
      this.onClick = this.onClick.bind(this)
    }

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
        loaded = true;
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
                this.state.destination !== '' &&
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
             this.state.response !== null && (
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
                <label className='white-text' htmlFor='ORIGIN'>Origin</label>
                <br />
                <input id='ORIGIN' className='white' type='text' ref={this.getOrigin} />
              </div>
            </div>

            <div className='col s12'>
              <div className='form-group'>
                <label className='white-text' htmlFor='DESTINATION'>Destination</label>
                <br />
                <input id='DESTINATION' className='white' type='text' ref={this.getDestination} />
              </div>
            </div>
          </div>
          <button className='btn btn-primary z-depth-5' type='button' onClick={this.onClick}>
            Build Route
          </button>
              </div>
    </div>
      )
    }

  }

export default Map;

