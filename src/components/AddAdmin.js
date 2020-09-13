import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Axios from '../axios';
import { isError } from './isError';

export default class AddAdmin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('/users/register', {
      ...this.state
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        alert("Uspjesno ste kreirali users!")
        console.log(res)
      })
      .catch(err => {
        alert("Doslo je do greske pokusajte ponovo!")
        isError(err);
      })
  }
   
  render() {
    const classes = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Dodaj korisnika
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <TextField
              name="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Dodaj korisnika
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}