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

function Redirectpage() {
  window.location =
    "https://fuseas-dev-ams.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=74b566o357ju94ej02sl6b85p&redirect_uri=https://183.83.216.197:3000/admin/dashboard";
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/template1" component={Template1} />
      <Route path="/login" component={LoginLayout} />
      {/* <Route path="/rtl" component={RTL} /> */}
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
