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
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI'
import ChatPage from './ChatPage';

function OnlineRouter(props){

  const logOut = async () => {
    const stateResquest = await sendDisconnectionToAPI();
    if(stateResquest)
    {
      props.disconnectUser();
    }
  }

  const sendDisconnectionToAPI = async () => {
    const id = props.id;
    const token = props.token;
    const url = 'http://greenvelvet.alwaysdata.net/kwick/api/logout';
    console.log("Sendind to API...");
        
      return await promisedJSONP(`${url}/${token}/${id}`)
          .then((response) => {
              if(!verifyStateResponse(response))
              {
                  return false
              }
              return true;
          })
          .catch(() => {
              return false;
          })
  }

    return (
      <Router>
          <NavBar toDisconnect={logOut}/>
          <div className="container mt-3">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/chat" component={ChatPage}/>
                <Route path="/logout"/>
            </Switch>
          </div>
      </Router>
  );
}

const mapStateToProps = (state, ownProps) => {
  const newState = {...state};
  return {
      id: newState.id,
      token: newState.token
  }
}

export default connect(
  mapStateToProps,//Listener
  {disconnectUser}//actions
  )(OnlineRouter)