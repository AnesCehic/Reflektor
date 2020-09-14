import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import CustomAppBar from './components/CustomAppBar/index.js';
import Login from './components/Login';
import Show from './components/Show';

function App() {
  return (
    <div className="App">
      <Router>
        {
          !localStorage.getItem("token") ? <Route path="/" exact component={Login} /> : <Redirect to="/dashboard" />
        }
        {
          localStorage.getItem("token") ? <Route path="/dashboard" component={CustomAppBar} /> : <Redirect to="/" />
        }
      </Router>
    </div>
  );
}

export default App;
