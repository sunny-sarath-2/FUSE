import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import appController from "../../controller/controller";
import Button from "../../components/CustomButtons/Button";
import { Link } from "react-router-dom";
import API from "../../../services/API";
import FormCreater from "../../components/FormCreater/FormCreater";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrganisation: "",
      userType: "",
      events: [],
      loading: false,
      createBlog: false,
      eventData: {
        Title: "",
        Description: "",
        Start_Date: "2019-05-07T14:30",
        End_Date: "2019-05-07T14:30",
        City: "",
        State: ""
      },
      error: false,
      errorMessage: ""
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let response = await API.getEventsData();
    if (response.series != undefined)
      this.setState({
        events: response.series,
        loading: false
      });
    else
      this.setState({
        loading: false
      });
  }

  inputChange(e, field) {
    let dummy = this.state.eventData;
    dummy.error = false;
    dummy[field] = e.target.value;
    this.setState(dummy);
  }
  async submitEvent() {
    this.setState({ loading: true });
    if (
      this.state.eventData.Title != "" &&
      this.state.eventData.Description != "" &&
      this.state.eventData.City != "" &&
      this.state.eventData.State != ""
    ) {
      console.log("clicked");
      let data = {};
      data.title = this.state.eventData.Title;
      data.description = this.state.eventData.Description;
      data.start_date = this.state.eventData.Start_Date;
      data.end_date = this.state.eventData.End_Date;
      data.event_city = this.state.eventData.City;
      data.event_state = this.state.eventData.State;
      let result = await API.affilateCreateEvent(data);
      if (result.success) {
        let newAffiliateData = this.state.events;
        newAffiliateData.push({ fields: data });
        this.setState({
          events: newAffiliateData,
          createBlog: false,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          error: true,
          errorMessage: "Server is not responding"
        });
      }
    } else {
      this.setState({
        error: true,
        errorMessage: "Fill All Details",
        loading: false
      });
    }
    // console.log(this.state.eventData, "submited click");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.createBlog ? (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Events</h4>

                  <Button
                    style={{
                      backgroundColor: "#00acc1",
                      float: "right"
                    }}
                    onClick={() => {
                      this.setState({ createBlog: false });
                    }}
                  >
                    Go Back
                  </Button>
                  <p
                    className={classes.cardCategoryWhite}
                    style={{ float: "left" }}
                  >
                    List of events.
                  </p>
                </CardHeader>
                <CardBody>
                  <FormCreater
                    classes={classes}
                    inputChange={this.inputChange}
                    data={this.state.eventData}
                    submit={this.submitEvent}
                    error={this.state.error}
                    fields={[
                      ["TextField", "Title"],
                      ["multilineText", "Description"],
                      ["dateTimePicker", "Start_Date"],
                      ["dateTimePicker", "End_Date"],
                      ["TextField", "City"],
                      ["TextField", "State"]
                    ]}
                    errorMessage={this.state.errorMessage}
                    loading={this.state.loading}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        ) : (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Events</h4>
                  <Button
                    style={{
                      backgroundColor: "#00acc1",
                      float: "right"
                    }}
                    onClick={() => {
                      this.setState({ createBlog: true });
                    }}
                  >
                    Create Events
                  </Button>
                  <p
                    className={classes.cardCategoryWhite}
                    style={{ float: "left" }}
                  >
                    List of events.
                  </p>
                </CardHeader>
                <CardBody>
                  {this.state.loading === false ? (
                    <div className="CustomTable-tableResponsive-397">
                      <table
                        className="MuiTable-root-398 CustomTable-table-394"
                        style={{ width: "100%" }}
                      >
                        <thead className="MuiTableHead-root-399 CustomTable-primaryTableHeader-388">
                          <tr>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              Title
                            </th>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              Description
                            </th>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              Start Date
                            </th>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              End Date
                            </th>
                            <th style={{ width: "40%", padding: "10px 20px" }}>
                              City
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.events.map((td, i) => {
                            if (td.fields == undefined) return null;
                            return (
                              <tr key={i}>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.fields.title}
                                </td>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.fields.description}
                                </td>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.fields.start_date}
                                </td>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.fields.end_date}
                                </td>
                                <td
                                  style={{ width: "40%", padding: "10px 20px" }}
                                >
                                  {td.fields.event_city}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <center>
                      <div className="spinner-border text-primary" />
                    </center>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </div>
    );
  }
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
    marginTop: "10px",
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

export default withStyles(styles)(Events);
