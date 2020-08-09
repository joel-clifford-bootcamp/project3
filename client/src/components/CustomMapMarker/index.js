import React, {useState} from "react"
import { Marker, InfoWindow} from "@react-google-maps/api"
import InfoBoxString from "../InfoBoxString";
import bixiPin from "./bixiPin.png"
import parkingPin from "./parkingPin.png"

const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png';

function CustomMapMarker( props ) {

    const [hideInfoWindow, setHideInfoWindow] = useState(true);

    const handleClick = () => {
        // props.selectPlace(props.place);
        console.log(props);
        setHideInfoWindow(!hideInfoWindow);
    }

    let icon;

    switch(props.place.obj_type){
        case "bixi":
            icon = bixiPin;
            break;
        case "parking":
            icon = parkingPin;
            break;
        default:
            icon = iconBase;
            break;
    }

    return ( 
        <Marker
            icon={icon}
            style={{scale: "0.07"}}
            onClick={handleClick}
            position={{lat:props.place.lat, lng:props.place.lng}}>
                { hideInfoWindow ? '' :
                <InfoWindow onCloseClick={handleClick}>
                    <InfoBoxString place={props.place} name={props.place.name} selectPlace={props.selectPlace}/>
                </InfoWindow> }
            </Marker>
    )
}

export default CustomMapMarker;