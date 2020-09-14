import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Axios from '../axios';

import { isError } from './isError';
import { Link } from 'react-router-dom';

export default class ReportsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reports: []
    }
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

  componentDidMount(){
    console.log("MOunt")
    Axios.get("/reports/getByCategory/" + this.props.match.params.groupId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({
          reports: res.data
        });
      })
      .catch(err => {
        isError(err)
      })
  }

  componentDidUpdate() {
    Axios.get("/reports/getByCategory/" + this.props.match.params.groupId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({
          reports: res.data
        })
      })
      .catch(err => {
        isError(err)
      })
  }

  render() {
    return (
      <div>
        <h1>{this.props.match.params.groupId}</h1>

        {
          this.state.reports.map(r => {
            return <div key={r.id} style={{ border: "1px solid black", padding: "10px", borderRadius: "10px", boxShadow: "1px 5px 5px 1px grey" }}>
              <h2>Naziv: {r.description}</h2>
              <p>Prijava kreirana: {r.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
              
              <p>
                { r.imageName ? <a href={`https://34.89.184.202:8080/images/${r.imageName}`}>Vidi sliku</a> : null }
              </p>
              <p>
                { r.videoName ? <a href={`https://34.89.184.202:8080/images/${r.videoName}`}>Vidi video</a> : null }
              </p>
              <a href={`https://www.google.com/maps/@${r.locationCode},13z`} target="_blank">Vidi na mapi</a>
              <br />
              <br />
              <Button color="primary" variant="contained" onClick={() => this.deleteReport(r.id)}>Obrisi prijiavu</Button>
            </div>
          })
        }
      </div>
    )
  }
}