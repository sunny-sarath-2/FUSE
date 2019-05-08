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
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrganisation: "",
      userType: "",
      AffiliateData: [],
      loading: false,
      createBlog: false,
      blogData: {
        Title: "",
        Description: "",
        created_on: ""
      },
      error: false,
      errorMessage: ""
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitBlog = this.submitBlog.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let response = await API.getBlogsData();
    if (response.series != undefined)
      this.setState({
        AffiliateData: response.series,
        loading: false
        //models: response.models.layout.blogs
      });
    else
      this.setState({
        loading: false
      });
  }
  inputChange(e, field) {
    // console.log(field);
    let dummy = this.state.blogData;
    dummy.error = false;
    dummy[field] = e.target.value;
    this.setState(dummy);
  }
  async submitBlog() {
    this.setState({ loading: true });
    if (
      this.state.blogData.Title != "" &&
      this.state.blogData.Description != ""
    ) {
      let data = {};
      data.title = this.state.blogData.Title;
      data.description = this.state.blogData.Description;
      data.created_on = new Date().toISOString();
      let result = await API.affilateCreateBlog(data);
      if (result.success) {
        let newAffiliateData = this.state.AffiliateData;
        newAffiliateData.push({ fields: data });
        this.setState({
          AffiliateData: newAffiliateData,
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
      console.log(result);
    } else {
      this.setState({
        loading: false,
        error: true,
        errorMessage: "Fill All Details"
      });
    }
    // console.log(this.state.blogData, "submited click");
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
                  <h4 className={classes.cardTitleWhite}>Blogs</h4>

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
                    List of blogs.
                  </p>
                </CardHeader>
                <CardBody>
                  <FormCreater
                    inputChange={this.inputChange}
                    classes={classes}
                    data={this.state.blogData}
                    submit={this.submitBlog}
                    error={this.state.error}
                    fields={[
                      ["TextField", "Title"],
                      ["multilineText", "Description"]
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
                  <h4 className={classes.cardTitleWhite}>Blogs</h4>
                  <Button
                    style={{
                      backgroundColor: "#00acc1",
                      float: "right"
                    }}
                    onClick={() => {
                      this.setState({ createBlog: true });
                    }}
                  >
                    Create Blog
                  </Button>
                  <p
                    className={classes.cardCategoryWhite}
                    style={{ float: "left" }}
                  >
                    List of blogs.
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
                              Created on
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
                                  {td.fields.created_on}
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

export default withStyles(styles)(Blogs);
