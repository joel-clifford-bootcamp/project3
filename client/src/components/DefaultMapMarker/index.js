import React from "react"
import { Marker} from "@react-google-maps/api"

const icon = "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"

function DefaultMapMarker( props ) {
    return ( 
        <Marker
            position={props.location}
        />
    )
}

export default DefaultMapMarker;