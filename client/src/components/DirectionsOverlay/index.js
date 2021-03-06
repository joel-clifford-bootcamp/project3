import React from "react"
import { DirectionsService, DirectionsRenderer} from "@react-google-maps/api"


function DirectionsOverlay(props) {

  return(
    <div>
      <DirectionsService
        // required
        options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
          destination: props.destination,
          origin: props.origin,
          travelMode: 'BICYCLING'
        }}
        // required
        callback={props.directionsCallback}
        // // optional
        // onLoad={directionsService => {
        //   console.log('DirectionsService onLoad directionsService: ', directionsService)
        // }}
        // // optional
        // onUnmount={directionsService => {
        //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
        // }}
      />

      <DirectionsRenderer
        // required
        options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
          directions: props.navResponse
        }}
        // // optional
        // onLoad={directionsRenderer => {
        //   console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
        // }}
        // // optional
        // onUnmount={directionsRenderer => {
        //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
        // }}
      />
    </div>
    )
}

export default DirectionsOverlay