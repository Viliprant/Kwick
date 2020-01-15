import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import '../ComponentsCSS/navbar.css';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser} from '../redux/actions';
import NavBar from './NavBar';

function OnlineRouter(props){

    return (
      <Router>
        <div>
          <NavBar toDisconnect={props.disconnectUser}/>
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


export default connect(
  null,//Listener
  {disconnectUser}//actions
  )(OnlineRouter)