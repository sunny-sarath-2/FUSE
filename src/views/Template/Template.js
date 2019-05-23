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
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
//
import Select from "react-select";
import serviceBase from "../../../services/serviceBase";

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
      lChapter: "",
      lChapterAdmin: "",
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
      footerColorSelected: [],
      loadingDetails: false,
      loading: false,
      alertmsg: {}
    };
    // location.href = location.origin + location.pathname;
    this.handleChange = this.handleChange.bind(this);
    // this.handleClickOpen = this.handleClickOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.onSelectClicked = this.onSelectClicked.bind(this);
    this.colorSave = this.colorSave.bind(this);
    this.removeColor = this.removeColor.bind(this);
    //this.addMoreColor = this.addMoreColor.bind(this);
  }

  async componentDidMount() {
    this.setState({ loadingDetails: true });
    var id_token = localStorage.getItem("idToken");
    var userDetails = appController.getUser(id_token);
    var responseadmins = await API.getAffiliatesOnOrginasation(
      userDetails.userOrganisation
    );
    //console.log(responseadmins.series);
    let response = await API.getChapters();
    console.log(response, "````````````");
    await this.setState({
      //AffiliateAdmins: responseadmins.series,
      AffiliateData: response.series,
      loadingDetails: false
    });
  }
  async handleChange(e, name) {
    console.log(e);
    if (e !== null) {
      await this.setState({
        [name]: {
          label: e.label,
          value: e.value
        },
        selected: true
      });
      let template = await API.getSiteconfigbyChapter({
        chapter: e.label,
        affiliate: e.value
      });
      console.log(template);
      if (template.series.length > 0) {
        await this.setState({
          footerColorSelected: template.series[0].fields.footercolors
            ? template.series[0].fields.footercolors
            : [],
          headerColorSelected: template.series[0].fields.headercolors
            ? template.series[0].fields.headercolors
            : [],
          widgetColorSelected: template.series[0].fields.widgetcolors
            ? template.series[0].fields.widgetcolors
            : []
        });
      } else {
        await this.setState({
          footerColorSelected: [],
          widgetColorSelected: [],
          headerColorSelected: []
        });
      }
      if (name === "Chapter") {
        await this.setState({
          lChapterAdmin: null
        });
      }
    } else {
      await this.setState({
        [name]: "",
        ["l" + name]: e,
        selected: false
      });
    }
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
    if (this.state.Chapter != "") {
      this.setState({ selected: true, loading: true });
      var id_token = localStorage.getItem("idToken");
      let userDetails;
      if (id_token != null) {
        userDetails = await appController.getUser(id_token);
      } else {
        userDetails = await appController.getAffilateTokens();
      }
      console.log(userDetails);
      var {
        Chapter,
        ChapterAdmin,
        headerColorSelected,
        widgetColorSelected,
        footerColorSelected
      } = this.state;
      //console.log(Chapter, "ch");
      var response = await API.addTemplateToUser({
        userName: Chapter.value,
        organisation: userDetails.userOrganisation,
        tier: userDetails.userType,
        chapter: Chapter.label,
        templateUrl:
          "https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png",
        headercolors: headerColorSelected,
        widgetcolors: widgetColorSelected,
        footercolors: footerColorSelected
      });
      console.log(response);
      if (response.responses[0].success) {
        this.setState({
          alertmsg: { color: "#4caf50", msg: "Saved the template to user" }
        });
      } else {
        this.setState({
          alertmsg: { color: "#ff9800", msg: "Failed to save template to user" }
        });
      }
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ alertmsg: {} });
      }, 5000);
    } else {
      this.setState({
        alertmsg: { color: "#ff9800", msg: "Select Chapter" }
      });

      setTimeout(() => {
        this.setState({ alertmsg: {} });
      }, 5000);
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
  colorSave(arrayName, e) {
    console.log(e.target.value, e.target.checked);
    let color = e.target.value;
    let getArray = this.state[arrayName];
    getArray = [];
    if (e.target.checked === true) {
      getArray.push(color);
      let dummyState = this.state;
      dummyState[arrayName] = getArray;
      this.setState(dummyState);
    } else {
      let colorIndex = getArray.indexOf(color);
      getArray.splice(colorIndex, 1);
      let dummyState = this.state;
      dummyState[arrayName] = getArray;
      this.setState(dummyState);
    }
    console.log(arrayName, this.state[arrayName]);
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
              <Grid container spacing={24} style={{ marginTop: "0px" }}>
                {this.state.alertmsg.msg != null ? (
                  <Grid item xs={12} sm={12}>
                    <div
                      style={{
                        padding: "15px",
                        fontWeight: "700",
                        backgroundColor: this.state.alertmsg.color,
                        color: "#FFF"
                      }}
                    >
                      {this.state.alertmsg.msg}
                    </div>
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                  <label>Select Chapter</label>
                  <Select
                    value={this.state.Chapter}
                    onChange={e => {
                      this.handleChange(e, "Chapter");
                    }}
                    options={this.state.AffiliateData.map(suggestion => ({
                      value: suggestion.fields.chapter,
                      label: suggestion.fields.chapter,
                      series_id: suggestion.fields.chapter
                    }))}
                    //components={components}
                    placeholder="Search Chapter"
                    isClearable
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} style={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={4}>
                  <label>Click on image for preview</label>
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
                      this.state.chapter != ""
                        ? window.open(
                            "http://183.83.216.197:3000/admin/home?accessToken=" +
                              idToken +
                              "&strapiToken=" +
                              localStorage.getItem("strapiJwtToken") +
                              "&affiliate=" +
                              localStorage.getItem("username") +
                              "&sitelaunch=true" +
                              "&affiliateDetails=" +
                              affiliateDetails
                          )
                        : this.setState({
                            alertmsg: {
                              color: "#ff9800",
                              msg: "Select Chapter"
                            }
                          });

                      setTimeout(() => {
                        this.setState({ alertmsg: {} });
                      }, 5000);
                      return false;
                    }}
                  >
                    <Card>
                      <img
                        className={classes.media}
                        style={{ height: "200px" }}
                        src="https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png"
                        alt="Paella dish"
                      />
                    </Card>
                  </a>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <label>&nbsp;</label>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div style={{ fontWeight: "700" }}>Header Colors :</div>
                  <div style={{ padding: "0px 10px" }} className="row">
                    {this.state.headerColors.map((hcolor, i) => {
                      let chk = this.state.headerColorSelected.indexOf(hcolor);
                      return (
                        <Checkbox
                          style={{ color: hcolor }}
                          key={i}
                          icon={
                            <CheckBoxOutlineBlankIcon
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <CheckBoxIcon style={{ fontSize: "30px" }} />
                          }
                          //indeterminate={chk !== -1 ? false : true}
                          checked={chk !== -1 ? true : false}
                          onChange={e =>
                            this.colorSave("headerColorSelected", e)
                          }
                          value={hcolor}
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
                  </div>
                  {this.state.headeradd ? (
                    <SketchPicker
                      color={this.state.background}
                      onChangeComplete={this.handleChangeComplete}
                    />
                  ) : null} */}
                  <div style={{ fontWeight: "700" }}>Widget Colors:</div>
                  <div style={{ padding: "0px 10px" }} className="row">
                    {this.state.widgetColors.map((hcolor, i) => {
                      let chk = this.state.widgetColorSelected.indexOf(hcolor);
                      return (
                        <Checkbox
                          style={{ color: hcolor }}
                          key={i}
                          icon={
                            <CheckBoxOutlineBlankIcon
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <CheckBoxIcon style={{ fontSize: "30px" }} />
                          }
                          checked={chk !== -1 ? true : false}
                          onChange={e =>
                            this.colorSave("widgetColorSelected", e)
                          }
                          value={hcolor}
                        />
                      );
                    })}
                  </div>
                  <div style={{ fontWeight: "700" }}>Footer Colors:</div>
                  <div style={{ padding: "0px 10px" }} className="row">
                    {this.state.footerColors.map((hcolor, i) => {
                      let chk = this.state.footerColorSelected.indexOf(hcolor);
                      return (
                        <Checkbox
                          style={{ color: hcolor }}
                          key={i}
                          icon={
                            <CheckBoxOutlineBlankIcon
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <CheckBoxIcon style={{ fontSize: "30px" }} />
                          }
                          checked={chk !== -1 ? true : false}
                          onChange={e =>
                            this.colorSave("footerColorSelected", e)
                          }
                          value={hcolor}
                        />
                      );
                    })}
                  </div>
                  <div>
                    {this.state.loading ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled
                      >
                        <div className="spinner-border text-primary" /> &nbsp;
                        Saving
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.onSelectClicked}
                      >
                        Submit
                      </Button>
                    )}
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
