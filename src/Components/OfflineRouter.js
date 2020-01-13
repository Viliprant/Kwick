import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function OnlineRouter() {
  return (
    <Router>
        <Switch>
          <Route path="*">
          </Route>
          <Route path="/signup">
          </Route>
        </Switch>
    </Router>
  );
}
