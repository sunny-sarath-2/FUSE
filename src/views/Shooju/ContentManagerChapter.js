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

class ContentManagerChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Con_manager: "",
      content_list: [],
      models: [],
      open: false,
      dense: false,
      secondary: false,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  async componentDidMount() {
    let response = await API.getChaptersbyAdmin({
      affiliate: localStorage.getItem("username")
    });
    this.setState({
      content_list: response.series,
      models: response.series,
      loading: false
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
  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Content Manager</h4>
            </CardHeader>
            {this.state.loading ? (
              <center>
                <div className="spinner-border text-primary" />
              </center>
            ) : (
              <CardBody>
                <Grid item xs={12} md={12}>
                  <div className={classes.demo}>
                    <List dense={dense}>
                      {this.state.models.map((prop, key) => {
                        return (
                          <ListItem key={key}>
                            <FolderIcon />
                            <ListItemText
                              style={{ textTransform: "capitalize" }}
                              primary={prop.fields.chapter}
                              secondary={secondary ? "Secondary text" : null}
                            />
                            <ListItemSecondaryAction>
                              <Link
                                to={
                                  "/admin/content-manager/" +
                                  prop.fields.chapter
                                }
                              >
                                <IconButton aria-label="view">
                                  <Icon className={classes.icon}>
                                    visibility
                                  </Icon>
                                </IconButton>
                              </Link>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </Grid>
              </CardBody>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ContentManagerChapter);
