import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Button from "@material-ui/core/Button";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import appController from "../../controller/controller";
import API from "../../../services/API";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FieldCreate from "../../components/fieldCreater/fieldCreater";

class ContentManagerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      chapters: [],
      model_name: "",
      data: {
        fields: {
          fuse_chapter: ""
        },
        files: {}
      },
      loading: false,
      btnclick: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let model = this.props.match.params.model;
    let chapter = this.props.match.params.chapter;
    let response = await API.getOneContentTypes(model);
    console.log(response);
    let chapters = await API.getChaptersbyAdmin({
      affiliate: localStorage.getItem("username")
    });
    console.log(chapters.series);
    let col = [];
    let fields = JSON.parse(response.fields);
    fields.map((prop, key) => {
      col.push(prop);
    });
    let data = this.state.data;
    data.fields["fuse_chapter"] = chapter;
    await this.setState({
      columns: col,
      model_name: response.pagename.toLowerCase(),
      chapters: chapters.series,
      loading: false,
      btnclick: false
    });
    await this.setState({ data: data });
  }
  handleChange(e, fieldName, fieldType) {
    console.log(e, fieldName, "check");
    let data = this.state.data;
    if (e.target.type === "file") {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = theFile => {
        var filedata = {
          blob: theFile.target.result,
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type
        };
        console.log(filedata);
        data.fields[fieldName] = file.name;
      };
      reader.readAsDataURL(file);
    } else {
      data.fields[fieldName] = e.target.value;
    }
    // data["type"] = this.state.model_name;
    this.setState({ data: data });
  }
  onEditorChange(e, fieldName) {
    let data = this.state.data;
    data.fields[fieldName] = e.editor.getData();
    this.setState({ data: data });
  }
  async SubmitForm() {
    //console.log(this.state.data);
    await this.setState({
      btnclick: true
    });
    let response = await API.createContentTypesData(
      this.state.model_name + "/?source=content-manager",
      this.state.data
    );
    console.log(response, "response");
    if (response) {
      this.props.history.push("/admin/content-manager");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                style={{ textTransform: "capitalize" }}
                className={classes.cardTitleWhite}
              >
                {"Add " + this.state.model_name}
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
              {this.state.loading ? (
                <center>
                  <div className="spinner-border text-primary" />
                </center>
              ) : null}
              {this.state.columns.map((field, i) => {
                console.log(field);
                return (
                  <div key={i}>
                    <FieldCreate
                      key={i}
                      field={field}
                      classes={classes}
                      data={this.state.data.fields}
                      Change={this.handleChange}
                      onEditorChange={this.onEditorChange}
                    />
                  </div>
                );
              })}
              <TextField
                id="outlined-name"
                label={"Chapter"}
                name={"fuse_chapter"}
                fullWidth
                select
                type={"text"}
                className={classes.textField}
                value={this.state.data.fields.fuse_chapter}
                onChange={e => this.handleChange(e, "fuse_chapter", "string")}
                margin="normal"
                variant="outlined"
              >
                <MenuItem key={1} value={this.state.data.fields.fuse_chapter}>
                  {this.state.data.fields.fuse_chapter}
                </MenuItem>
                {/* {this.state.chapters.map((chap, i) => {
                  return (
                    <MenuItem key={i} value={chap.fields.chapter}>
                      {chap.fields.chapter}
                    </MenuItem>
                  );
                })} */}
              </TextField>
              {this.state.btnclick ? (
                <Button variant="contained" color="primary" disabled>
                  ... Saving
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.SubmitForm}
                >
                  Submit
                </Button>
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

export default withStyles(styles)(ContentManagerAdd);
