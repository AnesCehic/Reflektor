import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class Details extends React.Component {

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={{ width: "200px", height: "100px" }}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          <Marker position={{ lat: 47.444, lng: -122.17 }} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFPmSCt3luwSVnnNX3_zpjuBpqM8fADn8'
})(Details);