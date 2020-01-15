import React from 'react';
import {
    NavLink,
    useHistory
  } from "react-router-dom";

import logo from '../assets/Kwick-logo-32.png';

const activeLink = {
    fontWeight: "bold"
  }

function NavBar(props){
    let history = useHistory();

    const onClickDisconnect = () => {
        props.toDisconnect();
        history.push("/");
    }
  
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
            <span className="nav-link linkP" onClick={onClickDisconnect}>Déconnexion</span>
        </div>
    </nav>
        
        )
    }

export default NavBar;
    