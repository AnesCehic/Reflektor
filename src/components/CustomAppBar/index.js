import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

import { Route, Link } from 'react-router-dom';
import Show from '../Show';
import ReportsList from '../ReportsList';
import AddAdmin from '../AddAdmin';
import GetUsers from '../GetUsers';
import Details from '../Details'

import Axios from '../../axios';
import AllReports from '../AllReports';

import Logo from './bijeli.png'
import Image from '../Image';
import Statistics from '../Statistics';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  console.log(typeof(localStorage.getItem("admin")))

  const [groups, setGroups] = useState([
    "Kupovina glasova",
    "Korišćenje javnih resursa u izborne svrhe",
    "Pritisci na birače",
    "Predizborno zapošljavanje",
    "Medijsko predstavljanje",
    "Oglašavanje na zabranjenim mjestima",
    "Preuranjena kampanja",
    "Javne usluge u zamjenu za glas",
    "Ostalo"
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
            <img src={Logo} width="150px" height="50px" />
          </Typography>
          <Button color="inherit" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>Odjava</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <h3>Categories</h3>
          <Divider />
          <List>
            {/*<Link to={`/dashboard`}>
              <ListItem button key="Sve prijave">
                <ListItemText primary="Sve prijave" />
              </ListItem>
            </Link>*/}
            {groups.map((g, index) => (
              <Link to={`/dashboard/${g}`}>
                <ListItem button key={index}>
                  <ListItemText primary={g} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          {
            localStorage.getItem("admin") === "true" ? <div><Link to="/dashboard/admins/addAdmin">
            <ListItem button key="addAdmin">
              <ListItemText primary="Dodaj admina" />
            </ListItem>
          </Link>
          <Link to="/dashboard/admins/allUsers">
            <ListItem button key="addAdmin">
              <ListItemText primary="Lista korisnika" />
            </ListItem>
          </Link>
          <Link to="/dashboard/statistics/stat">
            <ListItem button key="addAdmin">
              <ListItemText primary="Statistika" />
            </ListItem>
          </Link></div>
          : null }
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Route path="/dashboard" exact component={AllReports} />
        <Route path="/dashboard/statistics/stat" component={Statistics} />
        <Route path="/dashboard/:groupId" exact component={ReportsList} />
        <Route path="/dashboard/details/:id" component={Details} />
        <Route path="/dashboard/admins/addAdmin" component={AddAdmin} />
        <Route path="/dashboard/admins/allUsers" component={GetUsers} />
        <Route path="/dashboard/image/:imageName" component={Image} />
      </main>
    </div>
  );
}
