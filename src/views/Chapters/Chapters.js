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

class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      AffiliateData: []
    };
  }
  async componentDidMount() {
    let response = await API.getChapters();
    this.setState({
      AffiliateData: response.fields.sites_map_obj,
      loading: false
    });
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
                          Chapters
                        </th>
                        <th style={{ width: "10%", padding: "10px 20px" }}>
                          Number Of Affiliates
                        </th>
                        {/* <th style={{ width: "10%", padding: "10px 20px" }}>
                          Count Of Admins
                        </th> */}
                        <th style={{ width: "10%", padding: "10px 20px" }}>
                          URL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.AffiliateData.map((td, i) => {
                        return (
                          <tr key={i}>
                            <td style={{ width: "10%", padding: "10px 20px" }}>
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
                                {td.chapter}
                              </Link>
                            </td>
                            <td style={{ width: "10%", padding: "10px 20px" }}>
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
                                {td.affiliates_count}
                              </Link>
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
                            <td style={{ width: "10%", padding: "10px 20px" }}>
                              <Link
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
                              >
                                {td.url == "" ? "no url found" : td.url}
                              </Link>
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
