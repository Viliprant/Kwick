import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import logo from '../assets/Kwick-logo-32.png';
import '../ComponentsCSS/navbar.css';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser} from '../redux/actions'

const activeLink = {
  fontWeight: "bold"
}

function NavBar(props){
  const onClickDisconnect = () => {
    props.toDisconnect();
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
        <NavLink className="nav-link linkP" activeStyle={activeLink} exact to="/logout" onClick={onClickDisconnect}>Déconnexion</NavLink>
      </div>
    </nav>
  )
}

class OnlineRouter extends React.Component{
  
  render(){
      return (
        <Router>
          <div>
            <NavBar toDisconnect={this.props.disconnectUser}/>
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
}


export default connect(
  null,//Listener
  {disconnectUser}//actions
  )(OnlineRouter)