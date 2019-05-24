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
import Grid from "@material-ui/core/Grid";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import appController from "../../controller/controller";
import API from "../../../services/API";
import ViewData from "../../components/ViewData/ViewData";
import FieldEditor from "../../components/fieldEditor/FieldEditor";
import { resolve, reject } from "q";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";

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
      chapters: [],
      transferData: {},
      data: {
        fields: {},
        files: {}
      },
      btnclick: false,
      chapterselected: ""
    };
    this.tableData = this.tableData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.copyComponent = this.copyComponent.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  async componentDidMount() {
    let model = this.props.match.params.model;
    let schapter = this.props.match.params.chapter;
    let chapters = await API.getChaptersbyAdmin({
      affiliate: localStorage.getItem("username")
    });
    await this.setState({
      chapters: chapters.series
    });
    await this.copyComponent();
  }
  async copyComponent() {
    let model = this.props.match.params.model;
    let schapter = this.props.match.params.chapter;
    let modelpath = schapter + "/" + model;
    let response = await API.getDataContentTypes(modelpath);
    let modelTypeResponse = await API.getOneContentTypes(model);
    console.log(response, "response");

    let col = [];
    col.push("id");
    let fields = JSON.parse(modelTypeResponse.fields);
    fields.map((prop, key) => {
      col.push(prop.name);
    });
    col = col;
    col.push("fuse_chapter");
    col.push("Action");

    if (response.data.length > 0) {
      this.setState({
        content_list: response.data,
        columns: col,
        loading: true,
        modelTypeColumns: fields,
        model_name: response.modelname
      });
    } else {
      this.setState({
        content_list: response.data,
        loading: true,
        noData: true,
        columns: [],
        model_name: response.modelname
      });
    }
  }
  tableData(data) {
    //console.log("data", data);
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
                  this.setState({
                    switcher: "delete",
                    transferData: {
                      id: td["id"],
                      fuse_chapter: td["fuse_chapter"]
                    }
                  });
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
  async loadData(e) {
    await this.setState({
      chapterselected: e,
      noData: false
    });
    await this.copyComponent();
  }
  onEditorChange(e, fieldName) {
    let data = this.state.data;
    data.fields[fieldName] = e.editor.getData();
    this.setState({ data: data });
  }
  async SubmitForm() {
    await this.setState({
      btnclick: true
    });
    console.log("form submited", this.state.data, this.state.transferData.id);
    let response = await API.updateContentTypesData(
      this.state.model_name +
        "/" +
        this.state.transferData.id +
        "/?source=content-manager",
      this.state.data
    );
    console.log(response);
    if (response) {
      this.setState({
        switcher: "main",
        btnclick: false
      });
    }
  }
  loader() {
    switch (this.state.switcher) {
      case "main":
        return (
          <div>
            {/* <div>
              <Grid container spacing={24} style={{ marginTop: "0px" }}>
                <Grid item xs={12} sm={6}>
                  <label>Select Chapter</label>
                  <Select
                    value={this.state.chapterselected}
                    onChange={e => {
                      this.loadData(e);
                    }}
                    options={this.state.chapters.map(suggestion => ({
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
            </div> */}
            <Table
              tableHeaderColor="primary"
              tableHead={this.state.columns.map(col => {
                return col;
              })}
              tableData={this.tableData(this.state.content_list)}
            />
          </div>
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
          <div>
            <FieldEditor
              field={this.state.modelTypeColumns}
              classes={this.props.classes}
              data={this.state.data.fields}
              chapters={this.state.chapters}
              Change={this.handleChange}
              onEditorChange={this.onEditorChange}
              SubmitForm={this.SubmitForm}
              btnclick={this.state["btnclick"]}
            />
          </div>
        );
      case "delete":
        console.log("delete");
        console.log(this.state.transferData);
        let del_id = this.state.transferData.id;
        let del_chapter = this.state.transferData.fuse_chapter;
        let confirm = window.confirm(
          "Are you sure you want to delete this entry ?"
        );
        if (confirm) {
          this.Delete(del_id, del_chapter).then(async result => {
            console.log(result);
            await this.setState({
              switcher: "main",
              loading: false
            });
            setTimeout(async () => {
              await this.copyComponent();
              await this.setState({
                switcher: "main",
                loading: true
              });
            }, 2000);
          });
          return (
            <center>
              <div className="spinner-border text-primary" />
            </center>
          );
        } else {
          this.setState({
            switcher: "main",
            loading: true
          });
          return null;
        }
      default:
        return null;
    }
  }
  Delete = async (id, del_chapter) => {
    // return new Promise(async (resolve, reject) => {
    let model = this.state.model_name;
    let response = await API.deleteContent(model, id, del_chapter);
    // // resolve(response);
    return response;
    //});
  };

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
                <div>{this.loader()}</div>
              ) : (
                <center>
                  <div className="spinner-border text-primary" />
                </center>
              )}
              {this.state.noData ? (
                <center>
                  <h4>No data found</h4>
                </center>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ContentManagerView);
