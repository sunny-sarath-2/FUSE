import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Template1 from "../TemplateView/template1";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter: "",
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange(e) {
    this.setState({ Chapter: e.target.value });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Template</h4>
            </CardHeader>
            <CardBody>
              <TextField
                id="standard-select-currency"
                select
                label="Select Chapter"
                style={{ width: "300px" }}
                value={this.state.Chapter}
                onChange={e => {
                  this.handleChange(e);
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                <MenuItem value="Alabama">Alabama</MenuItem>
                <MenuItem value="Illinois">Illinois</MenuItem>
                <MenuItem value="California">California</MenuItem>
                <MenuItem value="Colorado">Colorado</MenuItem>
                <MenuItem value="Mississippi">Mississippi</MenuItem>
              </TextField>

              <Grid container spacing={24} style={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png"
                      alt="Paella dish"
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                  >
                    <Fab
                      color="secondary"
                      aria-label="Add"
                      className={classes.fab}
                      style={{ zIndex: "111111", position: "fixed" }}
                      onClick={this.handleClose}
                    >
                      <CloseIcon />
                    </Fab>
                    <Template1 />
                  </Dialog>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/themequarry/material-pro.png"
                      alt="Paella dish"
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/themequarry/ample-admin.png"
                      alt="Paella dish"
                    />
                  </Card>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/themequarry/material-pro.png"
                      alt="Paella dish"
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/themequarry/ample-admin.png"
                      alt="Paella dish"
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card>
                    <img
                      className={classes.media}
                      style={{ height: "200px" }}
                      src="https://adminlte.io/uploads/images/free_templates/creative-tim-material-angular.png"
                      alt="Paella dish"
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    onClick={this.handleClickOpen}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select
                  </Button>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Template);
