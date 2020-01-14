import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import logo from '../assets/Kwick-logo-32.png';

import '../ComponentsCSS/navbar.css';

const activeLink = {
  fontWeight: "bold"
}

function NavBar(props){
  return(
    <nav id="mainNavbar" className="navbar navbar-light bg-light">
      <ul className="list-link">
        <li className="nav-item">
          <NavLink className="navbar-brand" exact to="/">
            <img style={{marginRight: "10px"}} src={logo} alt=""/>
            <span>Kwick</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link linkP" activeStyle={activeLink} exact to="/chats">Conversations</NavLink>
        </li>
        <li>
          <NavLink className="nav-link linkP" activeStyle={activeLink} exact to="/users">Utilisateurs</NavLink>
        </li>
      </ul>
      <div className="form-inline">
        <NavLink className="nav-link linkP" activeStyle={activeLink} exact to="/logout">Déconnexion</NavLink>
      </div>
    </nav>
  )
}

export default function OnlineRouter() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Switch>
          <Route exact path="/"/>
          <Route path="/chats"/>
          <Route path="/users"/>
          <Route path="/logout"/>
        </Switch>
      </div>
    </Router>
  );
}
