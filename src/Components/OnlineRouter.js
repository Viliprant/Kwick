import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from '../assets/Kwick-logo-32.png';

import '../ComponentsCSS/navbar.css';

export default function OnlineRouter() {
  return (
    <Router>
      <div>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="logout">
        <img style={{marginRight: "10px"}} src={logo} alt=""/>
        Kwick
        </Link>
        <div className="form-inline">
          <Link className="nav-link" to="logout">Déconnexion</Link>
        </div>
      </nav>

        <Switch>
          <Route exact path="/"/>
          <Route path="/users"/>
          <Route path="/logout"/>
        </Switch>
      </div>
    </Router>
  );
}
