import React, { Component } from 'react'

import Axios from '../axios';

export default class Image extends Component {

  state = {
    image: ""
  }

  componentDidMount() {
    Axios.get(`/${"bb52cddd-b9ad-4d12-bec0-8fa00613a13f.jpg"}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(Buffer.from(res.data, 'binary'))
        this.setState({
          image: Buffer.from(res.data, 'binary').toString('base64')
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  render() {
    return (
      <div>
        <img src={`data:image/png;base64,${this.state.image}`} width="100px" height="200px" />
      </div>
    )
  }
}