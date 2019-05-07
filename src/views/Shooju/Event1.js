import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import appController from "../../controller/controller";
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
  async componentDidMount() {
    let response = await API.getEvents();

    this.setState({
      tests: response.fields
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
