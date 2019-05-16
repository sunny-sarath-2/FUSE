import React, { Component } from "react";
import appController from "../../controller/controller";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Template1 from "../TemplateView/template1";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Link } from "react-router-dom";
import API from "../../../services/API";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
class userTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter: "",
      open: false,
      AffiliateData: [],
      selected: true,
      templateProvided: false,
      loading: true
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  async componentDidMount() {
    var id_token = localStorage.getItem("idToken");
    let userDetails;
    if (id_token != null) {
      userDetails = await appController.getUser(token);
    } else {
      userDetails = await appController.getAffilateTokens();
    }
    console.log(userDetails);
    var response = await API.getAffiliatesOnOrginasation(
      userDetails.userOrganisation
    );
    if (response.series.length == 0)
      this.setState({
        AffiliateData: response.series,
        loading: false,
        templateProvided: false,
        loading: false
      });
    else
      this.setState({
        AffiliateData: response.series,
        loading: false,
        templateProvided: true,
        loading: false
      });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Template</h4>
            </CardHeader>
            <CardBody>
              <Grid container spacing={24} style={{ marginTop: "20px" }}>
                {this.state.loading ? (
                  <center>
                    <div className="spinner-border text-primary" />
                  </center>
                ) : this.state.templateProvided ? (
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <img
                        className={classes.media}
                        style={{ height: "200px" }}
                        src="https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png"
                        alt="Paella dish"
                      />
                    </Card>
                    <a
                      target="_blank"
                      onClick={() => {
                        let idToken = localStorage.getItem("idToken");
                        let affiliateDetails = null;
                        if (idToken == null) {
                          affiliateDetails = {
                            userName: localStorage.getItem("username"),
                            userType: "affilate"
                          };
                          affiliateDetails = JSON.stringify(affiliateDetails);
                        }
                        window.open(
                          "http://localhost:3000/admin/home?accessToken=" +
                            idToken +
                            "&strapiToken=" +
                            localStorage.getItem("strapiJwtToken") +
                            "&affiliate=" +
                            localStorage.getItem("username") +
                            "&sitelaunch=true" +
                            "&affiliateDetails=" +
                            affiliateDetails
                        );
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ marginRight: "10px" }}
                        onClick={this.handleClickOpen}
                      >
                        Preview
                      </Button>
                    </a>
                    <a
                      target="_blank"
                      onClick={() => {
                        let idToken = localStorage.getItem("idToken");
                        let affiliateDetails = null;
                        if (idToken == null) {
                          affiliateDetails = {
                            userName: localStorage.getItem("username"),
                            userType: "affilate"
                          };
                          affiliateDetails = JSON.stringify(affiliateDetails);
                        }
                        window.open(
                          "http://localhost:3000/admin/home?accessToken=" +
                            idToken +
                            "&strapiToken=" +
                            localStorage.getItem("strapiJwtToken") +
                            "&affiliate=" +
                            localStorage.getItem("username") +
                            "&sitelaunch=true" +
                            "&affiliateDetails=" +
                            affiliateDetails
                        );
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ marginRight: "10px" }}
                        onClick={this.handleClickOpen}
                      >
                        Launch
                      </Button>
                    </a>
                  </Grid>
                ) : (
                  <h4>No template is provided to this user</h4>
                )}
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(userTemplate);
