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
import Home from './Home';

function OnlineRouter(props){

    return (
      <Router>
        <div>
          <NavBar toDisconnect={props.disconnectUser}/>
          <Switch>
            <div className="container mt-3">
              <Route exact path="/" component={Home}/>
              <Route path="/chats"/>
              <Route path="/users"/>
              <Route path="/logout"/>
            </div>
          </Switch>
        </div>
      </Router>
  );
}


export default connect(
  null,//Listener
  {disconnectUser}//actions
  )(OnlineRouter)