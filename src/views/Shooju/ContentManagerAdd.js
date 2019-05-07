import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TextField from "@material-ui/core/TextField";
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

class ContentManagerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Title: "",
      // Description: "",
      // Created_on: "",
      formBuild: { Title: "", Description: "", Created_on: "" },
      formData: [],
      columns: [],
      open: false,
      dense: false,
      secondary: false,
      model_name: ""
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
    let url = "https://localhost:1337/content-manager/models";
    if (model.substring(model.length - 1) !== "s") {
      model = model + "s";
    }
    let model_url = `https://localhost:1337/${model}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + strapitoken
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          columns: Object.values(
            response.models.models[this.state.model_name].fields
          )
        });
      });
  }
  handleChange(e) {
    let formData = [...this.state.formData];
    let formBuild = [...this.state.formBuild];
    if (e.target.name === "Title") {
      formBuild.Title = e.target.value;
    } else if (e.target.name === "Description") {
      formBuild.Description = e.target.value;
    } else {
      formBuild.Created_on = e.target.value;
    }
    console.log(formBuild.Title);
    console.log(formBuild.Description);
    console.log(formBuild.Created_on);
    formData[e.target.name] = e.target.value;
    this.setState({ formData }, () => console.log(this.state.formData));
    this.setState({ formBuild }, () => console.log(this.state.formBuild));
    //this.setState({ [e.target.name]: e.target.value });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  tableData(data) {}
  render() {
    const { classes } = this.props;
    console.log(this.state.formData);
    console.log(this.state.formBuild);
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
            </CardHeader>
            <CardBody>
              {this.state.columns.map((field, i) => {
                return (
                  <TextField
                    key={i}
                    data-id={i}
                    id="outlined-name"
                    label={field.label}
                    name={field.name}
                    fullWidth
                    multiline={field.type === "text" ? true : false}
                    rows={field.type === "text" ? "5" : "1"}
                    type={field.type}
                    className={classes.textField}
                    //value={this.state[field.name]}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                );
              })}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ContentManagerAdd);
