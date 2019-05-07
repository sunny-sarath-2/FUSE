import React from "react";
// @material-ui/core components
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
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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

class AffiliateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrganisation: "",
      userType: "",
      AffiliateData: [],
      loading: true,
      recivedSelect: "",
      chapterList: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let response = await API.getChapters();
    let AffiliateData = await API.getAffiliatesBySeries("NYSSCA_AFFILIATES");

    if (this.props.location.state != undefined) {
      await this.setState({
        chapterList: response.fields.sites_map_obj,
        recivedData: this.props.location.state.data,
        recivedSelect: this.props.location.state.data.chapter,
        loading: false,
        AffiliateData: AffiliateData.series[0].fields.sites_map_obj
      });
    } else
      await this.setState({
        chapterList: response.fields.sites_map_obj,
        AffiliateData: AffiliateData.series[0].fields.sites_map_obj,
        loading: false
      });
  }
  handleChange(e) {
    this.setState({ recivedSelect: e.target.value });
    // getData();
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Affiliates</h4>
              <Link
                style={{
                  float: "right"
                }}
                to="/admin/reg_affiliate"
              >
                <Button
                  style={{
                    backgroundColor: "#00acc1"
                  }}
                >
                  Create Affiliate
                </Button>
              </Link>
              <p
                className={classes.cardCategoryWhite}
                style={{ float: "left" }}
              >
                List of Affiliates.
              </p>
            </CardHeader>
            <CardBody>
              <div>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select Chapter"
                  style={{ width: "300px" }}
                  value={this.state.recivedSelect}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  SelectProps={{
                    className: classes.menu
                  }}
                >
                  {this.state.chapterList.map((prop, key) => {
                    return (
                      <MenuItem value={prop.chapter} key={key}>
                        {prop.chapter}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {this.state.loading === false ? (
                  this.state.recivedSelect ==
                  "New_York_School_Counselor_Association" ? (
                    <div className="CustomTable-tableResponsive-397">
                      <table
                        className="MuiTable-root-398 CustomTable-table-394"
                        style={{ width: "100%" }}
                      >
                        <thead className="MuiTableHead-root-399 CustomTable-primaryTableHeader-388">
                          <tr>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              Association Name
                            </th>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              Contact Information
                            </th>
                            <th style={{ width: "10%", padding: "10px 20px" }}>
                              region
                            </th>
                            <th style={{ width: "40%", padding: "10px 20px" }}>
                              Admin info
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.AffiliateData.map((td, i) => {
                            let contact_information = td.contact_information;
                            let cuttedString = contact_information.substring(
                              0,
                              30
                            );
                            return (
                              <tr key={i}>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.association_name}
                                </td>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {cuttedString + "..."}
                                </td>
                                <td
                                  style={{ width: "10%", padding: "10px 20px" }}
                                >
                                  {td.region}
                                </td>

                                <td
                                  style={{ width: "40%", padding: "10px 20px" }}
                                >
                                  {td.admin_information != undefined
                                    ? td.admin_information
                                    : "No admin found, would like to create new admin "}
                                  {td.admin_information != undefined ? null : (
                                    <Link to="/admin/reg_affiliate">
                                      Click Here
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <center>
                      {this.state.recivedSelect == "" ? (
                        <h3>Select A Chapter</h3>
                      ) : (
                        <h3>No Data Found</h3>
                      )}
                    </center>
                  )
                ) : (
                  <center>
                    <div className="spinner-border text-primary" />
                  </center>
                )}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AffiliateList);
