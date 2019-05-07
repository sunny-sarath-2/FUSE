import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import appController from "../../controller/controller";
import Warningprompts from "../../modelPopups/warningprompts";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

var sjc = require("shooju-client");
var sj = new sjc(
  "https://fuse.shooju.com",
  "api.test",
  "tMAFDsRVm1ONRAaCzCzAZFFkvwmsf4vUBIfo6DntokOFSlBWWaJjMwAqUZwe9DZZH"
);

const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  // IdentityPoolId:
});
const cognitoIdentityService = new AWS.CognitoIdentity({
  apiVersion: "2016-04-19",
  region: "us-west-1",
  accessKeyId: "ststc11lqm7tdv8b8hgalvbgi",
  ClientId: "ststc11lqm7tdv8b8hgalvbgi"
});

class AffiliateRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailId: "",
      organisation: "",
      tier: "affilate",
      password: "",
      phone_number: "",
      error: false,
      errorfileds: [],
      errorMessage: "",
      loading: false,
      showModel: false,
      modelError: "",
      modelHeader: "",
      userRegistered: false
    };

    this.inputChange = this.inputChange.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.userRegistered = this.userRegistered.bind(this);

    // cognitoIdentityService.listIdentities(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   // an error occurred
    //   else console.log(data); // successful response
    // });
  }

  componentDidMount() {
    var id_token = localStorage.getItem("idToken");
    var userDetails = appController.getUser(id_token);
    this.setState({
      organisation: userDetails.userOrganisation
    });

    sj.raw.get(
      "/series",
      {
        query: "sid:test\\Pronteff\\affilate",
        fields: ["username", "meta.updated_at"]
      },
      function(response) {
        // console.log("read!", response.series);
        //console.log("fields for first series!", response.series[0].fields);
      },
      function(error) {
        // error callback
      }
    );
  }

  inputChange(e, field) {
    let value = this.state;
    value.error = false;
    value.errorMessage = "";
    value[field] = e.target.value;
    this.setState({ value: value });
  }
  SignUp() {
    // console.log("register");
    let _state = this.state;
    let validationCheck = appController.validation([
      _state.userName,
      _state.emailId,
      _state.phone_number,
      _state.organisation,
      _state.tier,
      _state.password
    ]);
    if (validationCheck.error == 0) {
      this.setState({ loading: true });
      var poolData = {
        UserPoolId: "us-east-1_9FuCrBs4V",
        ClientId: "ststc11lqm7tdv8b8hgalvbgi"
      };
      //console.log(this.state);
      const {
        userName,
        emailId,
        phone_number,
        organisation,
        tier,
        password
      } = this.state;

      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var attributeList = [];

      var dataEmail = {
        Name: "email",
        Value: this.state.emailId
      };
      var dataName = {
        Name: "name",
        Value: this.state.userName
      };
      var dataOrganisation = {
        Name: "custom:Organisation",
        Value: this.state.organisation
      };
      var dataTier = {
        Name: "custom:Tier",
        Value: this.state.tier
      };
      var dataPhoneNumber = {
        Name: "phone_number",
        Value: "+911234567890"
      };
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataEmail
      );
      var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataName
      );
      var attributeOrganisation = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataOrganisation
      );
      var attributetier = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataTier
      );
      var attributephone_number = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataPhoneNumber
      );
      attributeList.push(attributeEmail);
      attributeList.push(attributeName);
      attributeList.push(attributeOrganisation);
      attributeList.push(attributetier);
      attributeList.push(attributephone_number);

      userPool.signUp(
        this.state.userName,
        this.state.password,
        attributeList,
        null,
        async (err, result) => {
          if (err) {
            // console.log(err, "err");
            this.setState({
              showModel: true,
              loading: false,
              modelError: err.message,
              modelHeader: "Error"
            });
            return;
          } else {
            var response = await API.registerAffiliates({
              userName: userName,
              emailId: emailId,
              phone_number: phone_number,
              organisation: organisation,
              tier: tier,
              password: password
            });
            console.log(response);
            // sj.raw.post(
            //   "/jobs",
            //   {},
            //   { description: "my test job", source: "api", notes: "" },
            //   function(job) {
            //     // console.log("job made!", job);
            //     //we started a job and can write as much as we want now
            //     sj.raw.post(
            //       "/series/write",
            //       { job_id: job.job_id },
            //       {
            //         series: [
            //           {
            //             series_id: `test\\${organisation}\\${tier}\\${Date.now()}`,
            //             fields: {
            //               userName: userName,
            //               emailId: emailId,
            //               phone_number: phone_number,
            //               organisation: organisation,
            //               tier: tier,
            //               password: password
            //             }
            //           }
            //         ]
            //       },
            //       function(response) {
            //         // console.log("data written!", response);
            //         //let's read now
            //         //read();
            //         //and finish the job
            //         sj.raw.post(
            //           "/jobs/" + job.job_id + "/finish",
            //           {},
            //           {},
            //           function(jobCompleteResponse) {
            //             // console.log("job finished!");
            //           }
            //         );
            //       }
            //     );
            //   }
            // );

            this.setState({
              showModel: true,
              loading: false,
              modelError:
                "user has been registered please confirm your email id",
              modelHeader: "User Registered",
              userRegistered: true
            });
            // console.log(result);
          }
          // cognitoUser = result.user;
          // console.log("user name is " + cognitoUser.getUsername());
        }
      );
    } else {
      this.setState({
        error: true,
        errorfileds: validationCheck.errorfileds,
        errorMessage: "Please fill all the details"
      });
    }
  }
  closeModel() {
    this.setState({ showModel: false });
  }
  userRegistered() {
    this.props.history.push("/admin/affiliate_list");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <Warningprompts
          errormessage={this.state.modelError}
          header={this.state.modelHeader}
          show={this.state.showModel}
          close={this.closeModel}
          userRegistered={this.state.userRegistered}
          submit={this.userRegistered}
        />
        <div className="justify-content-center row regi">
          <div className="col-md-12">
            <div className="card-group">
              <div className="p-4 card">
                <div className="card-body">
                  <Button
                    style={{
                      float: "right",
                      backgroundColor: "#036470",
                      color: "#fff"
                    }}
                    onClick={() =>
                      this.props.history.push("/admin/affiliate_list")
                    }
                  >
                    GO Back
                  </Button>
                  <div>
                    <h1>Create Affiliate</h1>
                    <p className="text-muted">Create affiliate account</p>
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Username"
                        type="text"
                        className={
                          this.state.errorfileds[1] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.userName}
                        onChange={e => {
                          this.inputChange(e, "userName");
                        }}
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope-o " aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Email Id"
                        type="text"
                        className={
                          this.state.errorfileds[2] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.emailId}
                        onChange={e => {
                          this.inputChange(e, "emailId");
                        }}
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-phone" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Phone Number"
                        type="number"
                        className={
                          this.state.errorfileds[3] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.emphone_numberailId}
                        onChange={e => {
                          this.inputChange(e, "phone_number");
                        }}
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-building-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Organisation"
                        type="text"
                        readOnly
                        className={
                          this.state.errorfileds[4] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.organisation}
                        onChange={e => {
                          this.inputChange(e, "organisation");
                        }}
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-sitemap" aria-hidden="true" />
                        </span>
                      </div>
                      <select
                        name="Tier"
                        className={
                          this.state.errorfileds[5] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        onChange={e => {
                          this.inputChange(e, "tier");
                        }}
                      >
                        <option value="affilate">Affiliate</option>
                      </select>
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Password"
                        type="password"
                        className={
                          this.state.errorfileds[6] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.password}
                        onChange={e => {
                          this.inputChange(e, "password");
                        }}
                      />
                    </div>

                    <button
                      className="mt-3 btn btn-primary btn-block"
                      onClick={this.SignUp}
                    >
                      Create Affiliate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AffiliateRegister);
