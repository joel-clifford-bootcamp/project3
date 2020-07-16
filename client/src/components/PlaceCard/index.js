import React from "react"
import "./style.css"

export const PlaceCardContainer = ({children}) => {
  return (<div className="place-card-container">
    {children}
  </div>)
}

export const PlaceCard = ({ type, place, discardPlace }) => {

    return (
        <div className="card darken-1 place-card">
        <div className="location-card-content white-text">
        <a className="btn-floating btn waves-effect waves-light transparent white-text small" onClick={discardPlace}>x</a>
          <p>{type}</p>
          <span className="card-title">{typeof place === 'undefined' ? null : place.name}</span>
        </div>
      </div>
    )
}
