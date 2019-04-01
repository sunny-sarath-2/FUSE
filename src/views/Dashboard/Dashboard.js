import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import html from "../../../public/template/index.html";

var sjc = require("shooju-client");
var sj = new sjc(
  "https://fuse.shooju.com",
  "api.test",
  "tMAFDsRVm1ONRAaCzCzAZFFkvwmsf4vUBIfo6DntokOFSlBWWaJjMwAqUZwe9DZZH"
);

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      site_title: "",
      site_desc: "",
      site_inc: "",
      loading: false
    };
    this.pageData = this.pageData.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value, site_title: "sdfsdfsd" });
  };

  handleChangeIndex = index => {
    this.setState({ value: index, site_title: "sdfsdfsd" });
  };

  createMarkup() {
    return { __html: html };
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
    //read all the series inside 'sid:test'
    this.setState({ loading: true });

    sj.raw.get(
      "/series",
      {
        query: "sid:test\\FuseParent",
        fields: ["sites_map_obj", "meta.updated_at"]
      },
      response => {
        this.pageData(response).then(site_inc => {
          if (site_inc == undefined) site_inc = 12;
          sj.raw.post(
            "/jobs",
            {},
            { description: "my test job", source: "api", notes: "" },
            function(job) {
              //we started a job and can write as much as we want now
              sj.raw.post(
                "/series/write",
                { job_id: job.job_id },
                {
                  series: [
                    {
                      //series_id: "test\\clientA\\docTypeX\\docId128",
                      series_id: "test\\FuseParent",
                      fields: {
                        sites_map_obj: [
                          {
                            site_id: "003",
                            site_inc: parseInt(site_inc) + parseInt(1),
                            site_map: "Welcome to Parent site.",
                            site_desc:
                              "This is Parent site description from Shooju DB" +
                              " "
                          }
                        ]
                      }
                    }
                  ]
                },
                function(response) {
                  sj.raw.post(
                    "/jobs/" + job.job_id + "/finish",
                    {},
                    {},
                    function(jobCompleteResponse) {}
                  );
                }
              );
            }
          );
        });
        //console.log("read!", response);
        //console.log("fields for first series!", response); //response.series[0].fields
      },
      function(error) {
        // error callback
        console.log(error);
      }
    );
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
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
                <h3 className={classes.cardTitle}>$34,245</h3>
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
