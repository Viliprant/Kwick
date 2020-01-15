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

function OnlineRouter(props){

  const logOut = async () => {
    const stateResquest = await sendDisconnectionToAPI();
    console.log('stateResquest:',stateResquest)
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
              console.log(response)
              return true;
          })
          .catch(() => {
              return false;
          })
  }

    return (
      <Router>
        <div>
          <NavBar toDisconnect={logOut}/>
          <div className="container mt-3">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/chats"/>
                <Route path="/users"/>
                <Route path="/logout"/>
            </Switch>
          </div>
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