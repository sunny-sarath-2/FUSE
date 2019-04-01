import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Template1 from "./views/TemplateView/template1";
// core components
import Admin from "./layouts/Admin";
import LoginLayout from "./layouts/LoginLayout";
// import RTL from "layouts/RTL.jsx";
import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/template1" component={Template1} />
      <Route path="/login" component={LoginLayout} />
      {/* <Route path="/rtl" component={RTL} /> */}
      <Redirect from="/" to="/login/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
