import React, { Component } from 'react'
import {Autocomplete} from '@react-google-maps/api'

class PlacesSearchBox extends Component  {
  constructor (props) {
    super(props)

    this.onPlaceChanged = props.onPlaceChanged;
    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    this.autocomplete = autocomplete
  }

  render() {
    return (
    <Autocomplete
      bounds={this.props.bounds}
      onLoad={this.onLoad}
      onPlaceChanged={() => this.onPlaceChanged(this.autocomplete)}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            background: 'white',
            border: `1px solid transparent`,
            width: `350px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `16px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            marginTop: "15px",
            left: "25%",
          }}
        />
      </Autocomplete> 
    )}

}

export default PlacesSearchBox