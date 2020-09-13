import { Button } from '@material-ui/core';
import React, { Component } from 'react';

import Axios from '../axios';

import { isError } from './isError';

export default class GetUsers extends Component {
  constructor() {
    super();

    this.state = {
      users: []
    }
  }

  deleteUser = (id) => {
    Axios.delete("/users/delete/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({
          users: this.state.users.filter(u => u.id !== id)
        })
      })
      .catch(err => {
        isError(err)
        alert("Niste u mogučnosti obrisati usera")
      })
  }

  componentDidMount() {
    Axios.get('/users/getAll', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        alert("Niste u mogučnosti vidjeti usere!")
      })
  }

  render() {
    return (
      <div>
        <h1>
          Svi korisnici
        </h1>

        <br/>
        <ul style={{ listStyleType: "none" }}>
        {
          this.state.users.map(e => {
            return <li key={e.id} style={{ borderBottom: "1px solid grey", boxShadow: "1px 1px 1px 1px grey", borderRadius: "5px", padding: "5px", marginBottom: "10px", paddingLeft: "30px" }}>
              <h3 style={{ textAlign: "left" }}>{e.username}
                {e.id !== "12312" ? <Button
                style={{ marginLeft: "25px"}}
                onClick={() => this.deleteUser(e.id)}
                variant="contained"
                color="primary"
                >
                  Obriši korisnika
                </Button> : null}
                </h3>
            </li>
          })
        }
        </ul>
      </div>
    )
  }
}