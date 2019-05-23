import React, { Component } from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import qs from "query-string";
import appController from "../../controller/controller";
// models
import Authenticate from "../../model/authenticate.model";
import { card } from "../../assets/jss/material-dashboard-react";
import API from "../../../services/API";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // var returned = appController.checkAccess((value, userdetails) => {
    //   if (value) {
    //     // console.log(value, userdetails);
    //   } else {
    //     var urlContent = qs.parse(this.props.location.hash);
    //     console.log(urlContent);
    //     if (
    //       urlContent.access_token == undefined ||
    //       urlContent.access_token == null
    //     ) {
    //       this.props.history.push("/login");
    //     } else {
    //       var auth = new Authenticate();
    //       auth.access_token = urlContent.access_token;
    //       auth.id_token = urlContent.id_token;
    //       auth.expires_in = urlContent.expires_in;
    //       auth.token_type = urlContent.token_type;
    //       appController.createAccess(
    //         auth,
    //         (access_token_verification, userdetails) => {
    //           if (access_token_verification) {
    //             console.log(userdetails);
    //           } else {
    //             this.props.history.push("/login");
    //           }
    //         }
    //       );
    //     }
    //   }
    // });
    // console.log(returned,"---------------------------------------------------------------")
    // var cognitoUser = appController.getCognitoUser();
    // cognitoUser.getUserAttributes(function(err, result) {
    //   if (err) {
    //     console.log(err);
    //     alert(err);
    //     return;
    //   }
    //   for (i = 0; i < result.length; i++) {
    //     console.log(
    //       "attribute " +
    //         result[i].getName() +
    //         " has value " +
    //         result[i].getValue()
    //     );
    //   }
    // });

    this.state = {
      value: 0,
      site_title: "",
      site_desc: "",
      site_inc: "",
      loading: false,
      title: "",
      userdetails: {
        username: localStorage.getItem("username")
      },
      affiliates: 0,
      chapters: 0
    };
    this.pageData = this.pageData.bind(this);
  }

  pageData = e =>
    new Promise((resolve, rejects) => {
      // console.log(e);
      this.setState({
        site_title: e.sites_map_obj[0].site_map,
        site_desc: e.sites_map_obj[0].site_desc,
        site_inc: e.sites_map_obj[0].site_inc,
        loading: false
      });
      resolve(e.sites_map_obj[0].site_inc);
    });

  async componentDidMount() {
    this.setState({ loading: true });
    let token = localStorage.getItem("idToken");
    let userDetails;
    if (token != null) {
      userDetails = await appController.getUser(token);
    } else {
      userDetails = await appController.getAffilateTokens();
    }
    console.log(userDetails);
    if (userDetails.userType === "parent") {
      this.setState({
        title: "Welcome to Parent site."
      });
    } else {
      this.setState({
        title: "Welcome to Affiliate site."
      });
    }
    let affiliates = await API.getAffiliatesBySeries("NYSSCA_AFFILIATES");
    let chapters = await API.getChapters();
    let response = await API.getSiteIncrement();
    await this.setState({
      chapters: chapters.series.length,
      affiliates: chapters.series.length
    });
    this.pageData(response.fields).then(async site_inc => {
      // let postresponse = await API.siteIncrement({
      //   site_id: "003",
      //   site_inc: parseInt(site_inc) + parseInt(1),
      //   site_map: "Welcome to Parent site.",
      //   site_desc: "This is site description from Shooju DB" + " "
      // });
      // console.log(site_inc);
      //console.log(postresponse);
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {/* <GridItem xs={12} sm={12} md={12}>
          <CardHeader>
            <p style={{ color: "#17a2b8" }}>
              welcome{" "}
              <b style={{ fontSize: "larger" }}>
                {this.state.userdetails.username} !!
              </b>
            </p>
          </CardHeader>
        </GridItem> */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                  ) : (
                    this.state.title
                  )}
                </h4>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>
                  <Link to={"/admin/Chapters"}>Chapters Live</Link>
                </p>
                <h3 className={classes.cardTitle}>{this.state.chapters}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a> */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>
                  <Link to={"/admin/Chapters"}>Affiliates</Link>
                </p>
                <h3 className={classes.cardTitle}>{this.state.affiliates}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <DateRange />
                  Last 24 Hours */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Sites Live</p>
                <h3 className={classes.cardTitle}>10</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Update />    
                  Just Updated */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Sites Down</p>
                <h3 className={classes.cardTitle}>3</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <LocalOffer />
                  Tracked from Github */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {/* <CardHeader color="success">
                <h4 style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                  ) : (
                    this.state.title
                  )}
                </h4>
              </CardHeader> */}
              <CardBody>
                <h5
                  style={{
                    color: "#000",
                    fontWeight: "300",
                    marginTop: "0px"
                  }}
                >
                  {this.state.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                  ) : (
                    <div>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
                      sit amet, consetetur sadipscing elitr, sed diam nonumy
                      eirmod tempor invidunt ut labore et dolore magna aliquyam
                      erat, sed diam voluptua. At vero eos et accusam et justo
                      duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                      takimata sanctus est Lorem ipsum dolor sit amet.
                    </div>
                  )}
                </h5>
                {/* <h5>
                  {this.state.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                  ) : (
                    "Site Increment:" + this.state.site_inc
                  )}
                </h5> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
