import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function OnlineRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Utilisateurs</Link>
          </li>
          <li>
            <Link to="/logout">Déconnexion</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/logout">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
