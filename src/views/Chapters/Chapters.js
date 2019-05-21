import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import API from "../../../services/API";
import CreateChapter from "./createChapter";
import appController from "../../controller/controller";

class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      AffiliateData: [],
      impexiumData: [],
      createChapter: false,
      recivedSelect: "",
      location: "",
      name: "",
      loadingCreate: true,
      btnsubmit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  async componentDidMount() {
    let response = await API.getChapters();
    console.log(response);
    var id_token = localStorage.getItem("idToken");
    let userDetails;
    this.setState({
      loading: false,
      AffiliateData: response.series
    });
    if (id_token != null) {
      userDetails = await appController.getUser(id_token);
    } else {
      userDetails = await appController.getAffilateTokens();
    }
    var responseadmins = await API.getAffiliatesOnOrginasation(
      userDetails.userOrganisation
    );

    this.getUsersImpexium().then(async responsedata => {
      let finalData = [];
      await responseadmins.series.map(data => {
        finalData = responsedata.dataList;
        finalData.push({ name: data.fields.username });
        // console.log(data.fields.username);
      });
      await this.setState({
        AffiliateData: response.series,
        loading: false,
        loadingCreate: false,
        impexiumData: finalData
      });
    });
  }
  handleChange(e, name) {
    if (e !== null) {
      console.log(e.value);
      if (name == "recivedSelect")
        this.setState({ [name]: { label: e.value, value: e.value } });
      else this.setState({ [name]: e.target.value });
    }
  }
  async submit() {
    if (this.state.name != undefined) {
      this.setState({
        btnsubmit: true
      });
      let a = await API.createChapters({
        chapter: this.state.name,
        location: this.state.location,
        affiliates: [this.state.recivedSelect.value]
      });
      console.log("clcikced", a);
      this.setState({
        createChapter: false,
        btnsubmit: false
      });
      this.recall();
    }
  }
  async recall() {
    this.setState({ loading: true });
    setTimeout(async () => {
      let response = await API.getChapters();
      this.setState({
        loading: false,
        AffiliateData: response.series
      });
    }, 2500);
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chapters</h4>
              <p
                className={classes.cardCategoryWhite}
                style={{ float: "left" }}
              >
                List of Chapters.
              </p>
              <Button
                style={{
                  backgroundColor: "#00acc1",
                  float: "right",
                  color: "#fff"
                }}
                onClick={() =>
                  this.setState({ createChapter: !this.state.createChapter })
                }
              >
                {this.state.createChapter ? "Go Back" : "Create chapter"}
              </Button>
            </CardHeader>
            <CardBody>
              {this.state.loading === false ? (
                this.state.createChapter ? (
                  <CreateChapter
                    {...this.props}
                    handleChange={this.handleChange}
                    impexiumData={this.state.impexiumData}
                    recivedSelect={this.state.recivedSelect}
                    name={this.state.name}
                    location={this.state.location}
                    submit={this.submit}
                    loadingCreate={this.state.loadingCreate}
                    btnsubmit={this.state.btnsubmit}
                  />
                ) : (
                  <div className="CustomTable-tableResponsive-397">
                    <table
                      className="MuiTable-root-398 CustomTable-table-394"
                      style={{ width: "100%" }}
                    >
                      <thead className="MuiTableHead-root-399 CustomTable-primaryTableHeader-388">
                        <tr>
                          <th style={{ width: "10%", padding: "10px 20px" }}>
                            Chapters
                          </th>
                          <th style={{ width: "10%", padding: "10px 20px" }}>
                            Admin
                          </th>
                          {/* <th style={{ width: "10%", padding: "10px 20px" }}>
                          Count Of Admins
                        </th> */}
                          <th style={{ width: "10%", padding: "10px 20px" }}>
                            location
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.AffiliateData.map((td, i) => {
                          return (
                            <tr key={i}>
                              <td
                                style={{ width: "10%", padding: "10px 20px" }}
                              >
                                {/* <Link
                                  to={{
                                    pathname: "/admin/affiliate_list",
                                    state: { data: td }
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "#3c4858"
                                  }}
                                > */}
                                {td.fields.chapter}
                                {/* </Link> */}
                              </td>
                              <td
                                style={{ width: "10%", padding: "10px 20px" }}
                              >
                                {/* <Link
                                  to={{
                                    pathname: "/admin/affiliate_list",
                                    state: { data: td }
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "#3c4858"
                                  }}
                                > */}
                                {td.fields.affiliates[0]}
                                {/* </Link> */}
                              </td>
                              {/* <td style={{ width: "10%", padding: "10px 20px" }}>
                              <Link
                                to={{
                                  pathname: "/admin/affiliate_list",
                                  state: { data: td }
                                }}
                                style={{
                                  textDecoration: "none",
                                  color: "#3c4858"
                                }}
                              >
                                {td.admin_count}
                              </Link>
                            </td> */}
                              <td
                                style={{ width: "10%", padding: "10px 20px" }}
                              >
                                {/* <Link
                                  // to={{
                                  //   pathname: "/admin/affiliate_list",
                                  //   state: { data: td }
                                  // }}
                                  to={{}}
                                  onClick={() => {
                                    if (td.url != "") window.open(td.url);
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "#3c4858"
                                  }}
                                > */}
                                {td.fields.location == ""
                                  ? ""
                                  : td.fields.location}
                                {/* </Link> */}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <center>
                  <div className="spinner-border text-primary" />
                </center>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

  getUsersImpexium = () =>
    new Promise((resolve, reject) => {
      let AppName = "ascaFuse";
      let AppKey = "6c4f4L0idNy4OJ63";
      this.getURI(AppName, AppKey).then(basicAuth => {
        this.getTokens(basicAuth).then(secoundryAuth => {
          this.getUserDetails(secoundryAuth).then(finalAuth => {
            console.log(finalAuth);
            resolve(finalAuth);
          });
        });
      });
    });

  getURI = (AppName, AppKey) =>
    new Promise((resolve, reject) => {
      let data = {
        AppName,
        AppKey
      };
      fetch("https://public.impexium.com/Api/v1/WebApiUrl", {
        method: "POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => resolve(response));
    });
  getTokens = res =>
    new Promise((resolve, reject) => {
      let data = {
        AppId: "ascaFuse",
        AppPassword: "6c4f4L0idNy4OJ63",
        AppUserEmail: "fuse_Integration@notchpoint.com", //fuse_Integration@notchpoint.com
        AppUserPassword: "8cT8EWMzmsksHcnc" //8cT8EWMzmsksHcnc
      };
      fetch(res.uri, {
        method: "POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          AccessToken: res.accessToken
        }
      })
        .then(res => {
          console.log(res);
          if (res.status == 401) {
            return undefined;
          } else {
            return res.json();
          }
        })
        .then(response => {
          console.log(response);
          resolve(response);
        });
    });

  getUserDetails = res =>
    new Promise((resolve, reject) => {
      fetch(res.uri + "/Individuals/Members/All/1", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          appToken: res.appToken,
          userToken: res.userToken
        }
      })
        .then(response => response.json())
        .then(response => resolve(response));
    });
}
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

export default withStyles(styles)(Chapters);
