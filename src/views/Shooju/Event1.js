import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
import appController from "../../controller/controller";
import { Link } from "react-router-dom";

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Event1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter: "",
      tests: [],
      sites_map_obj: [],
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    let access = appController.checkAccess();
    if (!access) {
      //this.props.history.push("/login");
    }
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0Mzc5Nzk2LCJleHAiOjE1NTY5NzE3OTZ9.DWbt_gL_qQLnpv97bmsUA-2jUshXdVRDQRFTy7NZvt0";
    fetch("https://183.83.216.197:5432/shoojus/event1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(response => {
        // console.log(response.fields);
        // console.log(response.fields.start_date.split("T"));
        this.setState({
          tests: response.fields
        });
        //this.props.history.push("/");
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleChange(e) {
    this.setState({ Chapter: e.target.value });
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
          <Grid key={1} item xs={12} sm={12}>
            <div
              style={{
                float: "left",
                background: "#41797a",
                width: "100%"
              }}
            >
              <h2
                style={{ fontWeight: "bold", padding: "10px", color: "#fff" }}
              >
                {this.state.tests.description}
              </h2>
              <h6
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  color: "#fff",
                  textTransform: "capitalize"
                }}
              >
                {this.state.tests.eventcity} {this.state.tests.eventstate}{" "}
                {" | "}
                {this.state.tests.start_date}
              </h6>
            </div>
            <div
              style={{
                width: "100%",
                background: "#FFF",
                marginBottom: "0px"
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "100%",
                background: "#FFF",
                color: "#000",
                padding: "20px",
                fontWeight: "500"
              }}
              dangerouslySetInnerHTML={{ __html: this.state.tests.mainbody }}
            />
            <div
              className="row"
              style={{
                width: "100%",
                background: "#FFF",
                color: "#000",
                padding: "20px",
                fontWeight: "500",
                marginLeft: "0px"
              }}
            >
              <div className="col-md-4">
                <u>Date</u>
                <br />
                {this.state.tests.start_date}
              </div>
              <div className="col-md-4">
                <u>Location</u>
                <br />
                {"City: " + this.state.tests.eventcity}
                <br />
                {"State: " + this.state.tests.eventstate}
              </div>
            </div>
          </Grid>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Event1);
