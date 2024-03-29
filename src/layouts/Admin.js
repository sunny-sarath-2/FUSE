/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/Navbars/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import routes from "../routes";
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle";
import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/Fuse_Affliliates_logo.png";
import API from "../../services/API";
import appController from "../controller/controller";

const SwitchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Admin extends React.Component {
  constructor(props) {
    super(props);
    let reload = localStorage.getItem("reload");
    if (reload == null || reload == undefined) {
      localStorage.setItem("reload", false);
      window.location.reload();
    }

    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      username: localStorage.getItem("username"),
      loading: true
    };
    this.signout = this.signout.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }
  async componentDidMount() {
    this.setState({ loading: false });
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  handleImageClick(image) {
    this.setState({ image: image });
  }
  handleColorClick(color) {
    this.setState({ color: color });
  }
  handleFixedClick() {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  }
  handleDrawerToggle() {
    console.log(this.state.mobileOpen)
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  signout() {
    var poolData = {
      UserPoolId: "us-east-1_9FuCrBs4V",
      ClientId: "ststc11lqm7tdv8b8hgalvbgi"
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: this.state.username,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signOut();
    // console.log(userDetails);
    appController.setAffilateTokens("", "", "", "", "");
    localStorage.clear();
    this.props.history.push("/login");
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"FUSE"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
          signout={this.signout}
/>

        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
            signout={this.signout}
          />

          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{SwitchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{SwitchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Admin);
