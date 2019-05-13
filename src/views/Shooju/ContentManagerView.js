import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Button from "@material-ui/core/Button";

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
      datafound: false,
      noData: false
    };
    this.tableData = this.tableData.bind(this);
  }
  async componentDidMount() {
    let model = this.props.match.params.model;
    let response = await API.getDataContentTypes(model);
    if (response.length != 0) {
      let col = [];
      col = Object.keys(response[0]);
      col.push("Action");
      if (response.length > 0) {
        this.setState({
          content_list: response,
          columns: col,
          datafound: true,
          model_name: model
        });
      }
    } else {
      this.setState({
        datafound: false,
        noData: true
      });
    }
  }
  tableData(data) {
    // console.log("data", data);
    var arr1 = new Array();
    data.map((td, i) => {
      var arr = new Array();
      this.state.columns.map(col => {
        //col = col.toLowerCase();
        if (col === "Action") {
          arr.push("View");
        } else {
          console.log("td:", td, "col", col);
          if (td[col] !== null) {
            console.log(td[col]);
            let c = td[col];
            arr.push(td[col] != null ? c.toString().substring(0, 50) : td[col]);
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
              <Button
                style={{ float: "right" }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.history.push("/admin/content-manager");
                }}
              >
                GO BACK
              </Button>
            </CardHeader>
            <CardBody>
              {this.state.datafound ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={this.state.columns.map(col => {
                    // console.log(col);
                    return col; //col.charAt(0).toUpperCase() + col.slice(1);
                  })}
                  tableData={this.tableData(this.state.content_list)}
                  // columns={this.state.columns}
                />
              ) : this.state.noData ? (
                <center>
                  <h4>No data found</h4>
                </center>
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

export default withStyles(styles)(ContentManagerView);
