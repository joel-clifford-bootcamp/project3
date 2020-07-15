import React, {useState} from "react"
import { Marker, InfoWindow} from "@react-google-maps/api"
import bixiMarker from "./bike-share-toronto-logo.png"
import infoBoxString from "../InfoBoxString"
import InfoBoxString from "../InfoBoxString";

const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

function CustomMapMarker( props ) {

    const [hideInfoWindow, setHideInfoWindow] = useState(true);

    const handleClick = () => {
        // props.selectPlace(props.place);
        console.log(props);
        setHideInfoWindow(!hideInfoWindow);
    }

    return ( 
        <Marker
            //icon={bixiMarker}
            icon={iconBase + 'parking_lot_maps.png'}
            onClick={handleClick}
            position={{lat:props.place.lat, lng:props.place.lng}}>
                { hideInfoWindow ? '' :
                <InfoWindow onCloseClick={handleClick}>
                    <InfoBoxString name={props.place.name}/>
                </InfoWindow> }
            </Marker>

    )
}

export default CustomMapMarker;