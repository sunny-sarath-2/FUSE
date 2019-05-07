import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
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

class ContentManagerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Con_manager: "",
      content_list: [],
      columns: [],
      open: false,
      dense: false,
      secondary: false,
      model_name: "",
      datafound: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.tableData = this.tableData.bind(this);
  }
  async componentDidMount() {
    let strapitoken = localStorage.getItem("strapiJwtToken");
    let model = this.props.match.params.model;
    this.setState({
      model_name: model
    });
    //let url = "https://183.83.216.197:5432/content-manager/models";
    if (model.substring(model.length - 1) !== "s") {
      model = model + "s";
    }
    let model_url = `https://183.83.216.197:5432/${model}`;
    await fetch(model_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + strapitoken
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.series.length > 0) {
          var col = new Array();
          col = Object.keys(response.series[0].fields);
          col.push("Action");
          this.setState({
            content_list: response.series,
            columns: col,
            datafound: true
          });
        }
      });
  }
  handleChange(e) {
    this.setState({ Con_manager: e.target.value });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  tableData(data) {
    //console.log("data", data);
    var arr1 = new Array();
    data.map((td, i) => {
      var arr = new Array();
      this.state.columns.map(col => {
        col = col.toLowerCase();
        if (col === "action") {
          arr.push("View");
        } else {
          //console.log("td:", td.fields, "col", col);
          if (td.fields[col] !== null) {
            arr.push(
              td.fields[col] != null
                ? td.fields[col].substring(0, 200)
                : td.fields[col]
            );
          }
        }
      });
      arr1.push(arr);
    });
    console.log(arr1);
    return arr1;
  }
  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                style={{ textTransform: "capitalize" }}
                className={classes.cardTitleWhite}
              >
                {this.state.model_name}
              </h4>
            </CardHeader>
            <CardBody>
              {this.state.datafound ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={this.state.columns.map(col => {
                    return col.charAt(0).toUpperCase() + col.slice(1);
                  })}
                  tableData={this.tableData(this.state.content_list)}
                />
              ) : (
                <div>No data found...</div>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ContentManagerView);
