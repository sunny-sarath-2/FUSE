import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
// import Template1 from "./views/TemplateView/template1";
import appController from "./controller/controller";
import Admin from "./layouts/Admin";
import LoginLayout from "./layouts/LoginLayout";
import Registration from "./views/Registration/registration";
import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

function decide() {
  var c = appController.checkNewAccess();
  // console.log(c);
  if (c != undefined) {
    c.getSession((err, session) => {
      if (err) {
        // console.log(err, "asdfadsfasdf");
        localStorage.setItem("session", false);
        return false;
      }
      if (session.isValid()) {
        localStorage.setItem("username", c.username);
        localStorage.setItem("session", true);
      }
      return true;
      // console.log("session validity: " + session.isValid());
    });
    return true;
  } else {
    // console.log("else case");
    localStorage.setItem("session", false);
    return false;
  }
}
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/admin"
        // component={Admin}
        render={data => {
          return decide() ? (
            <div>
              {localStorage.getItem("session") ? (
                <Admin {...data} called={true} />
              ) : (
                <Redirect from="/" to="/login" />
              )}
            </div>
          ) : (
            <Redirect from="/" to="/login" />
          );
        }}
      />
      <Route
        path="/login"
        render={data => {
          return decide() ? (
            <div>
              {localStorage.getItem("session") ? (
                <div>
                  <Redirect from="/login" to="/admin/dashboard" />
                </div>
              ) : (
                <div>
                  <LoginLayout {...data} />
                  <Warningprompts />
                </div>
              )}
            </div>
          ) : (
            <LoginLayout {...data} />
          );
        }}
        // component={LoginLayout}
      />
      <Route path="/register" component={Registration} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

{
  /* <Route path="/template1" component={Template1} /> */
}
