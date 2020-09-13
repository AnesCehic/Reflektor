import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import Axios from '../axios'

import { isError } from './isError'
import Details from './Details';

export default class AllReports extends Component {
  constructor() {
    super()

    this.state = {
      reports: []
    }
  }
  
  componentDidMount() {
    Axios.get('/reports/getAll', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res)
        this.setState({
          reports: res.data
        })
      })
      .catch(err => {
        isError(err)
      })
  }

  deleteReport = (id) => {
    Axios.delete('/reports/delete/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        alert("Prijava obrisana");
        window.location.reload();
      })
      .catch(err => {
        alert("Ne možete obrisati prijavu!")
        isError(err)
      })
  }

  render() {
    return (
      <div>
        <h1>Lista svih prijava</h1>
        {
          this.state.reports.map(r => {
            return <div key={r.id} style={{ borderBottom: "1px solid grey", padding: "10px", borderRadius: "10px", boxShadow: "1px 1px 1px 1px grey" }}>
              <h2>Naziv: {r.description}</h2>
              <p>Prijava kreirana: {r.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
              
              <p>
                Video link
              </p>
              <p>
                Image link
              </p>
              <p>
                Google Map link
                <a href={`https://www.google.com/maps/@${43.4104079},${18.174408},12z`}>Vidi na mapi</a>
              </p>
              <Button color="primary" variant="contained" onClick={() => this.deleteReport(r.id)}>Obriši prijavu</Button>
            </div>
          })
        }
      </div>
    )
  }
} 