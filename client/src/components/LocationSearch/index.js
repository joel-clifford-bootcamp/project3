import React from "react"
import PlacesSearchBox from "../PlacesSearchBox";

function LocationSearch({origin, destination, searchBoxMessage, searchBounds, onSearchResultChanged, useCurrentLocation}) {

    return (
    <div>
    {(
        origin === null || destination === null) &&
        <PlacesSearchBox 
            placeholder={searchBoxMessage}
            bounds={searchBounds}
            onPlaceChanged={onSearchResultChanged}/>}

        {(origin === null && destination !== null && "geolocation" in navigator) &&
         <a className="btn-floating btn-large waves-effect waves-light grey darken-1"
            onClick={useCurrentLocation}
            style={{
                position: "absolute",
                marginTop: "12px",
                left: "580px",
                height: "40px",
                width: "40px"
            }}><i className="material-icons" style={{lineHeight: "20px"}}>my_location</i></a>}      
    </div>)
}

export default LocationSearch