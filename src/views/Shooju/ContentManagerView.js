import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import appController from "../../controller/controller";
import API from "../../../services/API";
import ViewData from "../../components/ViewData/ViewData";
import FieldEditor from "../../components/fieldEditor/FieldEditor";

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
      loading: false,
      noData: false,
      switcher: "main",
      modelTypeColumns: [],
      transferData: {},
      data: {
        fields: {},
        files: {}
      }
    };
    this.tableData = this.tableData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  async componentDidMount() {
    let model = this.props.match.params.model;
    let response = await API.getDataContentTypes(model);
    if (response.length != 0) {
      let col = [];
      col = Object.keys(response[0]);
      col.push("Action");
      let modelTypeResponse = await API.getOneContentTypes(model);
      if (response.length > 0) {
        this.setState({
          content_list: response,
          columns: col,
          loading: true,
          model_name: model,
          modelTypeColumns: modelTypeResponse.model.attributes
        });
      }
    } else {
      this.setState({
        loading: false,
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
          arr.push(
            <span>
              <ViewIcon
                onClick={() => {
                  this.setState({ switcher: "view", transferData: td });
                  console.log("click", td);
                }}
              />
              <EditIcon
                onClick={() => {
                  let data = this.state.data;
                  data.fields = td;
                  this.setState({
                    switcher: "edit",
                    transferData: td,
                    data: data
                  });
                  console.log("click", td);
                }}
              />
              <DeleteIcon
                onClick={() => {
                  this.setState({ switcher: "delete", transferData: td });
                  console.log("click", td);
                }}
              />
            </span>
          );
        } else {
          if (td[col] !== null) {
            let c = td[col];
            arr.push(td[col] != null ? c.toString().substring(0, 50) : td[col]);
          }
        }
      });
      arr1.push(arr);
    });
    return arr1;
  }
  handleChange(e, fieldName, fieldType) {
    // console.log(e.target.value, fieldName, fieldType);
    let data = this.state.data;
    // data["type"] = this.state.model_name;
    data.fields[fieldName] = e.target.value;
    this.setState({ data: data });
  }
  onEditorChange(e, fieldName) {
    let data = this.state.data;
    data.fields[fieldName] = e.editor.getData();
    this.setState({ data: data });
  }
  async SubmitForm() {
    console.log("form submited", this.state.data, this.state.transferData.id);
    let response = await API.updateContentTypesData(
      this.state.model_name +
        "/" +
        this.state.transferData.id +
        "/?source=content-manager",
      this.state.data
    );
    console.log(response);
  }
  loader() {
    switch (this.state.switcher) {
      case "main":
        return (
          <Table
            tableHeaderColor="primary"
            tableHead={this.state.columns.map(col => {
              return col;
            })}
            tableData={this.tableData(this.state.content_list)}
          />
        );
      case "view":
        return (
          <ViewData
            modelType={this.state.modelTypeColumns}
            classes={this.props.classes}
            data={this.state.transferData}
          />
        );
      case "edit":
        return (
          <FieldEditor
            field={this.state.modelTypeColumns}
            classes={this.props.classes}
            data={this.state.data.fields}
            Change={this.handleChange}
            onEditorChange={this.onEditorChange}
            SubmitForm={this.SubmitForm}
          />
        );
      case "delete":
        return <ViewData modelType={this.state.modelTypeColumns} />;
    }
  }
  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    console.log(this.state.data.fields);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                style={{ textTransform: "capitalize" }}
                className={classes.cardTitleWhite}
              >
                View {this.state.model_name}
              </h4>
              <Button
                style={{ float: "right" }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  if (this.state.switcher == "main")
                    this.props.history.push("/admin/content-manager");
                  else this.setState({ switcher: "main" });
                }}
              >
                GO BACK
              </Button>
            </CardHeader>
            <CardBody>
              {this.state.loading ? (
                this.loader()
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
