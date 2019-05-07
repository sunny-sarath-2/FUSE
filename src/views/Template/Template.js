import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import classnames from "classnames";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Link } from "react-router-dom";
import appController from "../../controller/controller";
import API from "../../../services/API";
import { SketchPicker } from "react-color";

// var sjc = require("shooju-client");
// var sj = new sjc(
//   "https://fuse.shooju.com",
//   "api.test",
//   "tMAFDsRVm1ONRAaCzCzAZFFkvwmsf4vUBIfo6DntokOFSlBWWaJjMwAqUZwe9DZZH"
// );

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

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter: "",
      ChapterAdmin: "",
      open: false,
      AffiliateData: [],
      AffiliateAdmins: [],
      selected: true,
      color: "red",
      background: "#fff",
      headeradd: false,
      widgetadd: false,
      footeradd: false,
      headerColors: ["#9c27b0", "#00bbff", "#4caf50", "#f44336", "#ff9800"],
      headerColorSelected: [],
      widgetColors: ["#9c27b0", "#00bbff", "#4caf50", "#f44336", "#ff9800"],
      widgetColorSelected: [],
      footerColors: ["#9c27b0", "#00bbff", "#4caf50", "#f44336", "#ff9800"],
      footerColorSelected: []
    };
    // location.href = location.origin + location.pathname;
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSelectClicked = this.onSelectClicked.bind(this);
    this.colorSave = this.colorSave.bind(this);
    this.removeColor = this.removeColor.bind(this);
    //this.addMoreColor = this.addMoreColor.bind(this);
  }

  async componentDidMount() {
    var id_token = localStorage.getItem("idToken");
    var userDetails = appController.getUser(id_token);
    var responseadmins = await API.getAffiliatesOnOrginasation(
      userDetails.userOrganisation
    );
    //console.log(responseadmins.series);
    await this.setState({
      AffiliateAdmins: responseadmins.series,
      loading: false
    });
    let response = await API.getChapters();
    await this.setState({
      AffiliateData: response.fields.sites_map_obj,
      loading: false
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, selected: true });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleChangeComplete = color => {
    this.setState({
      background: color.hex,
      headerColors: [...this.state.headerColors, color.hex]
    });
  };
  handleChangeComplete1 = color => {
    const cc = color.hex;
    console.log("cc", cc);
    this.setState({ background: color.hex });

    this.state.widgetColors.push(cc);
  };
  handleChangeComplete2 = color => {
    const cc = color.hex;
    console.log("cc", cc);
    this.setState({ background: color.hex });

    this.state.footerColors.push(cc);
  };
  async onSelectClicked() {
    // console.log("clicked");
    if (this.state.Chapter != "" && this.state.ChapterAdmin) {
      this.setState({ selected: true });
      var id_token = localStorage.getItem("idToken");
      var userDetails = appController.getUser(id_token);
      var {
        Chapter,
        ChapterAdmin,
        headerColorSelected,
        widgetColorSelected,
        footerColorSelected
      } = this.state;
      var response = await API.addTemplateToUser({
        userName: ChapterAdmin,
        organisation: userDetails.userOrganisation,
        tier: userDetails.userType,
        chapter: Chapter,
        templateUrl:
          "https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png",
        headercolors: headerColorSelected,
        widgetcolors: widgetColorSelected,
        footercolors: footerColorSelected
      });
      console.log(response);
      if (response.responses[0].success) {
        alert("saved the template to user");
      } else {
        alert("failed to save template to user");
      }
    } else {
      this.setState({ selected: false });
    }
  }
  addMoreColor(e) {
    if (e == "headeradd") {
      this.setState({
        headeradd: !this.state.headeradd
      });
    } else if (e == "widgetadd") {
      this.setState({
        widgetadd: !this.state.widgetadd
      });
    } else {
      this.setState({
        footeradd: !this.state.footeradd
      });
    }
  }
  colorSave(color, arrayName) {
    let getArray = this.state[arrayName];
    if (getArray.indexOf(color) == -1) {
      getArray.push(color);
      let dummyState = this.state;
      dummyState[arrayName] = getArray;
      this.setState(dummyState);
    } else {
    }
  }
  removeColor(color, arrayName) {
    let getArray = this.state[arrayName];
    let colorIndex = getArray.indexOf(color);
    getArray.splice(colorIndex, 1);
    let dummyState = this.state;
    dummyState[arrayName] = getArray;
    this.setState(dummyState);
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-select-currency"
                    select
                    name="Chapter"
                    label="Select Chapter"
                    style={{ width: "300px" }}
                    value={this.state.Chapter}
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.AffiliateData.map((prop, key) => {
                      return (
                        <MenuItem value={prop.chapter} key={key}>
                          {prop.chapter}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  {this.state.selected ? (
                    ""
                  ) : (
                    <p style={{ color: "red" }}>Select Chapter</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-select-currency"
                    select
                    name="ChapterAdmin"
                    label="Select Admin"
                    style={{ width: "300px" }}
                    value={this.state.ChapterAdmin}
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.AffiliateAdmins.map((prop, key) => {
                      //console.log(prop.fields.username);
                      return (
                        <MenuItem value={prop.fields.username} key={key}>
                          {prop.fields.username}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={24} style={{ marginTop: "20px" }}>
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
                      this.state.ChapterAdmin != ""
                        ? window.open(
                            "http://183.83.216.197:3000/admin/home?accessToken=" +
                              localStorage.getItem("idToken") +
                              "&strapiToken=" +
                              localStorage.getItem("strapiJwtToken") +
                              "&affiliate=" +
                              this.state.ChapterAdmin +
                              "&chapter=" +
                              this.state.Chapter
                          )
                        : alert("Select Admin");
                      return false;
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
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.onSelectClicked}
                  >
                    Select
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div style={{ fontWeight: "700" }}>Header Colors:</div>
                  <p>Available Colors: </p>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.headerColors.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            this.colorSave(hcolor, "headerColorSelected");
                          }}
                        />
                      );
                    })}
                  </div>
                  <p>Selected Colors: </p>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.headerColorSelected.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            this.removeColor(hcolor, "headerColorSelected");
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* <div
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        background: "white",
                        marginRight: "5px",
                        marginBottom: "5px",
                        fontSize: "30px",
                        border: "solid 1px",
                        textAlign: "center"
                      }}
                      onClick={() => this.addMoreColor("headeradd")}
                    >
                      +
                    </div> */}
                  {/* {this.state.headeradd ? (
                      <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete}
                      />
                    ) : null} */}
                  <div style={{ fontWeight: "700" }}>Widget Colors:</div>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.widgetColors.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px"
                          }}
                          onClick={() => {
                            this.colorSave(hcolor, "widgetColorSelected");
                          }}
                        />
                      );
                    })}
                  </div>
                  <p>Selected Colors: </p>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.widgetColorSelected.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            this.removeColor(hcolor, "widgetColorSelected");
                          }}
                        />
                      );
                    })}

                    {/* <div
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        background: "white",
                        marginRight: "5px",
                        marginBottom: "5px",
                        fontSize: "30px",
                        border: "solid 1px",
                        textAlign: "center"
                      }}
                      onClick={() => this.addMoreColor("widgetadd")}
                    >
                      +
                    </div>

                    {this.state.widgetadd ? (
                      <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete1}
                      />
                    ) : null} */}
                  </div>
                  <div style={{ fontWeight: "700" }}>Footer Colors:</div>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.footerColors.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px"
                          }}
                          onClick={() => {
                            this.colorSave(hcolor, "footerColorSelected");
                          }}
                        />
                      );
                    })}
                  </div>
                  <p>Selected Colors: </p>
                  <div style={{ padding: "10px" }} className="row">
                    {this.state.footerColorSelected.map((hcolor, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            width: "30px",
                            height: "30px",
                            background: hcolor,
                            marginRight: "5px",
                            marginBottom: "5px",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            this.removeColor(hcolor, "footerColorSelected");
                          }}
                        />
                      );
                    })}

                    {/* <div
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        background: "white",
                        marginRight: "5px",
                        marginBottom: "5px",
                        fontSize: "30px",
                        border: "solid 1px",
                        textAlign: "center"
                      }}
                      onClick={() => this.addMoreColor("footeradd")}
                    >
                      +
                    </div>
                    {this.state.footeradd ? (
                      <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete2}
                      />
                    ) : null} */}
                  </div>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Template);
