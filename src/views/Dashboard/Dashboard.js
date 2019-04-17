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

var sjc = require("shooju-client");
var sj = new sjc(
  "https://fuse.shooju.com",
  "api.test",
  "tMAFDsRVm1ONRAaCzCzAZFFkvwmsf4vUBIfo6DntokOFSlBWWaJjMwAqUZwe9DZZH"
);

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
      userdetails: {
        username: localStorage.getItem("username")
      }
    };
    this.pageData = this.pageData.bind(this);
  }

  pageData = e =>
    new Promise((resolve, rejects) => {
      this.setState({
        site_title: e.series[0].fields.sites_map_obj[0].site_map,
        site_desc: e.series[0].fields.sites_map_obj[0].site_desc,
        site_inc: e.series[0].fields.sites_map_obj[0].site_inc,
        loading: false
      });
      resolve(e.series[0].fields.sites_map_obj[0].site_inc);
    });

  componentDidMount() {
    // appController.checkAccess((value, userdetails) => {
    //   if (value) {
    //     this.setState({ userdetails: userdetails, loading: true });
    //   } else {
    //     this.props.history.push("/login");
    //   }
    // });
    //read all the series inside 'sid:test'

    sj.raw.get(
      "/series",
      {
        query: "sid:test\\FuseParent",
        fields: ["sites_map_obj", "meta.updated_at"]
      },
      response => {
        this.pageData(response).then(site_inc => {
          if (site_inc == undefined) site_inc = 12;
          // sj.raw.post(
          //   "/jobs",
          //   {},
          //   { description: "my test job", source: "api", notes: "" },
          //   function(job) {
          //     //we started a job and can write as much as we want now
          //     sj.raw.post(
          //       "/series/write",
          //       { job_id: job.job_id },
          //       {
          //         series: [
          //           {
          //             //series_id: "test\\clientA\\docTypeX\\docId128",
          //             series_id: "test\\FuseParent",
          //             fields: {
          //               sites_map_obj: [
          //                 {
          //                   site_id: "003",
          //                   site_inc: parseInt(site_inc) + parseInt(1),
          //                   site_map: "Welcome to Parent site.",
          //                   site_desc:
          //                     "This is Parent site description from Shooju DB" +
          //                     " "
          //                 }
          //               ]
          //             }
          //           }
          //         ]
          //       },
          //       function(response) {
          //         sj.raw.post(
          //           "/jobs/" + job.job_id + "/finish",
          //           {},
          //           {},
          //           function(jobCompleteResponse) {}
          //         );
          //       }
          //     );
          //   }
          // );
        });
      },
      function(error) {
        console.log(error);
      }
    );
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader>
            <p style={{ color: "#17a2b8" }}>
              welcome{" "}
              <b style={{ fontSize: "larger" }}>
                {this.state.userdetails.username} !!
              </b>
            </p>
          </CardHeader>
        </GridItem>

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  99% <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
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
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>$34,24</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
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
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
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
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    this.state.site_title
                  )}
                </h4>
              </CardHeader>
              <CardBody>
                <h5
                  style={{
                    color: "#000",
                    fontWeight: "300",
                    marginTop: "0px"
                  }}
                >
                  {this.state.loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    this.state.site_desc
                  )}
                </h5>
                <h5>
                  {this.state.loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Site Increment:" + this.state.site_inc
                  )}
                </h5>
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
