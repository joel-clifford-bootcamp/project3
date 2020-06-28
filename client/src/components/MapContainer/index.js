import React, { useState, useEffect, Component } from 'react';
import "./index.css";
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';




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
      this.onMapClick = this.onMapClick.bind(this)
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

    onMapClick(...args) {
      console.log('onClick args: ', args)
    }


  
    render() {
      return (
        <LoadScript
          googleMapsApiKey="YOUR_API_KEY"
        >
           <GoogleMap
            // required
            id='map-canvas'
            // required
            zoom={2}
            // required
            center={{
              lat: 0,
              lng: -180
            }}
            // optional
            onClick={this.onMapClick}
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
          <div id="right-panel">
            
              <div className='map-settings'>
          <hr className='mt-0 mb-3' />

          <div className='row'>
            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='ORIGIN'>Origin</label>
                <br />
                <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
              </div>
            </div>

            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='DESTINATION'>Destination</label>
                <br />
                <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
              </div>
            </div>
          </div>
          <button className='btn btn-primary' type='button' onClick={this.onClick}>
            Build Route
          </button>
        </div>
             
          </div>
        </LoadScript>
      )
    }

  }

  export default React.memo(MapContainer)

