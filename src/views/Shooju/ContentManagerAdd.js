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
import FieldCreate from "../../components/fieldCreater/fieldCreater";

class ContentManagerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      model_name: "",
      data: {
        fields: {},
        files: {}
      },
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let model = this.props.match.params.model;
    let response = await API.getOneContentTypes(model);
    console.log(response);
    this.setState({
      columns: response.model.attributes,
      model_name: model,
      loading: false
    });
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
    let response = await API.createContentTypesData(
      this.state.model_name + "/?source=content-manager",
      this.state.data
    );
    console.log(response);
  }
  render() {
    const { classes } = this.props;
    console.log(this.state.data);
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
                  <FieldCreate
                    key={i}
                    field={field}
                    classes={classes}
                    data={this.state.data.fields}
                    Change={this.handleChange}
                    onEditorChange={this.onEditorChange}
                  />
                );
              })}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.SubmitForm}
              >
                SUBMIT
              </Button>
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
