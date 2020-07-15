import React from "react"
import { InfoWindow, InfoBox } from "@react-google-maps/api"
import InfoBoxString from "../InfoBoxString"

function MapInfoWindow(props) {

        return (
            <InfoWindow>
                <InfoBoxString/>
            </InfoWindow>
        )
    }

export default MapInfoWindow