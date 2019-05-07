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
      createBlog: false
    };
  }
  componentDidMount() {
    let strapitoken = localStorage.getItem("strapiJwtToken");
    let url = "https://183.83.216.197:5432/events";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //Authorization: "Bearer " + strapitoken
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({
          events: response.series
          //models: response.models.layout.blogs
        });
      });
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
                    // submit={}
                    fields={[
                      ["TextField", "Tittle"],
                      ["multilineText", "Description"],
                      ["dateTimePicker", "Start Date"],
                      ["dateTimePicker", "End Date"],
                      ["TextField", "City"],
                      ["TextField", "State"]
                    ]}
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
                    <p>loading</p>
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
