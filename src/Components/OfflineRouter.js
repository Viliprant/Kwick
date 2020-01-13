import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './Login';

export default function OnlineRouter() {
  return (
    <Router>
        <Switch>
          <Route path="*">
            <Login/>
          </Route>
          <Route path="/signup">
          </Route>
        </Switch>
    </Router>
  );
}
