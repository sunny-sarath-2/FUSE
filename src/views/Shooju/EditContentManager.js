import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import appController from "../../controller/controller";
import API from "../../../services/API";
import { Link } from "react-router-dom";

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

class EditContentManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: true,
      btnsubmit: false,
      model_name: "",
      count: 1,
      name: "",
      connection: "default",
      description: "",
      getChapters: [],
      chapter: "",
      attributes: [],
      errmsg: "",
      username: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.Change = this.Change.bind(this);
    this.AttrChange = this.AttrChange.bind(this);
    this.AddAttributes = this.AddAttributes.bind(this);
    this.DelAttributes = this.DelAttributes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let model = this.props.match.params.model;
    let fields = await API.getOneContentTypes(model);
    let response = await API.getChaptersbyAdmin({
      affiliate: localStorage.getItem("username")
    });
    await this.setState({
      loading: false,
      model_name: model,
      name: fields.pagename,
      description: fields.description,
      chapter: fields.chapter,
      username: fields.username,
      attributes: JSON.parse(fields.fields),
      getChapters: response.series
    });
  }
  handleChange(e) {}
  Change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  AttrChange(e, i) {
    let attributes = [...this.state.attributes];
    if (e.target.name == "name") {
      attributes[i][e.target.name] = e.target.value;
    } else {
      attributes[i]["params"][e.target.name] = e.target.value;
    }
    this.setState({
      attributes: attributes
    });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  AddAttributes() {
    let attributes = [...this.state.attributes];
    let newArray = [];
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i] != undefined) {
        newArray.push(attributes[i]);
      }
    }
    let attr_params = {
      name: "",
      params: {
        default: "",
        appearance: {},
        multiple: "false",
        type: "string"
      }
    };
    newArray.push(attr_params);
    this.setState({
      attributes: newArray
    });
  }
  DelAttributes(k) {
    var array = [...this.state.attributes]; // make a separate copy of the array
    array.splice(k, 1);
    this.setState({ attributes: array });
  }
  async handleSubmit() {
    let {
      name,
      description,
      attributes,
      connection,
      collectionName,
      model_name,
      chapter,
      username
    } = this.state;
    name = name.toLowerCase();
    name = name.replace(" ", "");

    if (attributes.length === 0) {
      await this.setState({
        errmsg: "Attributes cannot be empty."
      });
      setTimeout(() => {
        this.setState({
          errmsg: ""
        });
      }, 3000);
      return false;
    }
    if (name === "") {
      await this.setState({
        errmsg: "Name cannot be empty."
      });
      setTimeout(() => {
        this.setState({
          errmsg: ""
        });
      }, 3000);
      return false;
    }
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].name === "") {
        await this.setState({
          errmsg: "Name cannot be empty."
        });
        setTimeout(() => {
          this.setState({
            errmsg: ""
          });
        }, 3000);
        return false;
      } else {
        attributes[i].name = attributes[i].name.replace(" ", "_");
      }
    }

    var data = {
      fields: JSON.stringify(attributes),
      pagename: name,
      description: description,
      chapter: chapter,
      username: localStorage.getItem("username"),
      status: true
    };
    this.setState({
      btnsubmit: true
    });

    let response = await API.updateNewContentType(model_name, data);

    console.log(response, "response");
    if (response) {
      setTimeout(() => {
        this.props.history.push("/admin/content-manager");
      }, 1000);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Content Manager</h4>
              <Button
                style={{ float: "right" }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.history.push("/admin/content-manager");
                }}
              >
                Go Back
              </Button>
            </CardHeader>
            {this.state.loading ? (
              <center>
                <div className="spinner-border text-primary" />
              </center>
            ) : (
              <CardBody>
                {this.state.errmsg != "" ? (
                  <div style={{ color: "red" }}>{this.state.errmsg}</div>
                ) : null}
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-name"
                    label={"Name"}
                    name={"name"}
                    fullWidth
                    type={"text"}
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.Change}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-name"
                    label={"Description"}
                    name={"description"}
                    rows="4"
                    multiline
                    fullWidth
                    type={"text"}
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.Change}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <div style={{ fontSize: "18px", fontWeight: "800" }}>
                    Attributes:
                  </div>
                  {this.state.attributes.map((attr, i) => {
                    let k = i + 1;
                    return (
                      <Grid key={i} container spacing={16}>
                        <Grid item xs={12} md={5}>
                          <TextField
                            id="outlined-name"
                            label={"Name"}
                            name={"name"}
                            fullWidth
                            type={"text"}
                            className={classes.textField}
                            value={attr.name}
                            onChange={e => this.AttrChange(e, i)}
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <TextField
                            id="outlined-name"
                            label={"Type"}
                            name={"type"}
                            fullWidth
                            select
                            type={"text"}
                            className={classes.textField}
                            value={attr.params.type}
                            onChange={e => this.AttrChange(e, i)}
                            margin="normal"
                            variant="outlined"
                          >
                            <MenuItem value={"string"}>String</MenuItem>
                            <MenuItem value={"text"}>Text</MenuItem>
                            <MenuItem value={"integer"}>Integer</MenuItem>
                            <MenuItem value={"date"}>Date</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <div
                            style={{ textAlign: "center", marginTop: "24px" }}
                          >
                            {this.state.attributes.length > 0 ? (
                              <Button
                                variant="contained"
                                color={"secondary"}
                                className={classes.button}
                                onClick={() => this.DelAttributes(i)}
                              >
                                {"Delete"}
                              </Button>
                            ) : null}
                          </div>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      color={"primary"}
                      className={classes.button}
                      onClick={this.AddAttributes}
                    >
                      {"Add Attributes"}
                    </Button>
                    &nbsp;&nbsp;
                    {this.state.btnsubmit ? (
                      <Button
                        variant="contained"
                        color={"primary"}
                        className={classes.button}
                        disabled
                      >
                        {"... Saving"}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color={"primary"}
                        className={classes.button}
                        onClick={this.handleSubmit}
                      >
                        {"Submit"}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardBody>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(EditContentManager);
