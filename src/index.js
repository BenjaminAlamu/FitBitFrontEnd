import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import './assets/css/main.css';
import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.1.0";
import 'assets/bootstrap/dist/css/bootstrap.min.css';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
