import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './Login';
import SignUp from './SignUp';

export default function OfflineRouter() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="*" component={Login}/>
        </Switch>
    </Router>
  );
}
