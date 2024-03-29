import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import appController from "../../controller/controller";

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

class AffiliateT1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter: "",
      tests: [],
      category: [],
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    // let access = appController.checkAccess();
    // if (!access) {
    //   //this.props.history.push("/login");
    // }
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0Mzc5Nzk2LCJleHAiOjE1NTY5NzE3OTZ9.DWbt_gL_qQLnpv97bmsUA-2jUshXdVRDQRFTy7NZvt0";
    fetch("https://183.83.216.197:5432/shoojus/affiliatet1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(response => {
        // console.log(response.fields);
        this.setState({
          tests: response.fields
        });
        //this.props.history.push("/");
      })
      .catch(err => {
        console.error(err);
      });
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
          <Grid key={1} item xs={12} sm={12}>
            <Card key={1}>
              <CardHeader color="primary">
                <h4
                  style={{ float: "left" }}
                  className={classes.cardTitleWhite}
                >
                  {this.state.tests.description}
                </h4>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-4">
                    <b>Description</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.description}</div>
                  <div className="col-md-4">
                    <b>author_company</b>
                  </div>
                  <div className="col-md-8">
                    {this.state.tests.author_company}
                  </div>
                  <div className="col-md-4">
                    <b>author_email</b>
                  </div>
                  <div className="col-md-8">
                    {this.state.tests.author_email}
                  </div>
                  <div className="col-md-4">
                    <b>author_link</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.author_link}</div>
                  <div className="col-md-4">
                    <b>author_name</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.author_name}</div>
                  <div className="col-md-4">
                    <b>author_picture_url</b>
                  </div>
                  <div className="col-md-8">
                    {this.state.tests.author_picture_url}
                  </div>
                  <div className="col-md-4">
                    <b>body</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.body}</div>
                  <div className="col-md-4">
                    <b>date_posted</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.date_posted}</div>
                  <div className="col-md-4">
                    <b>discussion_name</b>
                  </div>
                  <div className="col-md-8">
                    {this.state.tests.discussion_name}
                  </div>
                  <div className="col-md-4">
                    <b>doc_date</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.doc_date}</div>
                  <div className="col-md-4">
                    <b>doc_type</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.doc_type}</div>
                  <div className="col-md-4">
                    <b>hltype</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.hltype}</div>
                  <div className="col-md-4">
                    <b>link</b>
                  </div>
                  <div className="col-md-8">{this.state.tests.link}</div>
                </div>
              </CardBody>
            </Card>
          </Grid>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AffiliateT1);
