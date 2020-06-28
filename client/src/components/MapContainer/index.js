import React, { useState, useEffect, Component } from 'react';
import "./index.css";
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';


//Toronto, ON
const center = {
              lat: 43.651070,
              lng:  -79.347015
            }

  class MapContainer extends Component {
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
    }


    getOrigin(ref) {
      this.origin = ref
    }

    getDestination(ref) {
      this.destination = ref
    }

    onClick() {
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
        <LoadScript
          googleMapsApiKey='AIzaSyDE2yBUEZx3Cup_pwq22o_WferVgBpgSdE'
        >
           <GoogleMap
            // Map container
            id='map-canvas'
            // Initial zoom
            zoom={10}
            // Map initial center in Toronto
            center={center}
            // optional
            onLoad={map => {
              console.log('DirectionsRenderer onLoad map: ', map)
            }}
            // optional
            onUnmount={map => {
              console.log('DirectionsRenderer onUnmount map: ', map)
            }}
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
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
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
                <label htmlFor='ORIGIN'>Origin</label>
                <br />
                <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
              </div>
            </div>

            <div className='col s12'>
              <div className='form-group'>
                <label htmlFor='DESTINATION'>Destination</label>
                <br />
                <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
              </div>
            </div>
          </div>
          <button className='btn btn-primary z-depth-5' type='button' onClick={this.onClick}>
            Build Route
          </button>
        </div>
        </LoadScript>
      )
    }

  }

  export default React.memo(MapContainer)

