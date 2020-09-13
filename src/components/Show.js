import React, { Component } from 'react'

import Details from './Details';

export default class Show extends React.Component {

  componentDidMount() {
    alert("3")
  }
  
  render() {
    return (
      <div>
        <h1>Show</h1>
        <Details />
      </div>
    )
  }
}