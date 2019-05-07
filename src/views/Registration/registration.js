import React, { Component } from "react";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
import appController from "../../controller/controller";
import Button from "../../components/CustomButtons/Button";
import Warningprompts from "../../modelPopups/warningprompts";
import API from "../../../services/API";
var sjc = require("shooju-client");
var sj = new sjc(
  "https://fuse.shooju.com",
  "api.test",
  "tMAFDsRVm1ONRAaCzCzAZFFkvwmsf4vUBIfo6DntokOFSlBWWaJjMwAqUZwe9DZZH"
);
// const AWS = require("aws-sdk");
// AWS.config.region = "us-east-1";
// AWS.config.credentials = new AWS.CognitoIdentityCredentials(
//   {
//     IdentityPoolId: "us-east-1_9FuCrBs4V",
//     RoleArn:
//       "arn:aws:cognito-idp:us-east-1:433766273334:userpool/us-east-1_9FuCrBs4V"
//   },
//   {
//     region: "us-east-1",
//     httpOptions: {
//       timeout: 100
//     }
//   }
// );
// //CognitoIdentityServiceProvider//cognitoidentity
// const cognitoidentity = new AWS.CognitoIdentity({
//   apiVersion: "2014-06-30"
// });
// {
//   apiVersion: "2016-04-19",
//   region: "us-west-1",
//   accessKeyId: "ststc11lqm7tdv8b8hgalvbgi",
//   ClientId: "ststc11lqm7tdv8b8hgalvbgi"
// }
export default class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      emailId: "",
      organisation: "",
      tier: "affilate",
      password: "",
      confirmPassword: "",
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

    // var params = {
    //   IdentityPoolId: "us-east-1_9FuCrBs4V",
    //   MaxResults: "12"
    //   // HideDisabled: false,
    //   // NextToken: "STRING_VALUE"
    // };
    // cognitoidentity.listIdentities(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   // an error occurred
    //   else console.log(data); // successful response
    // });
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
      _state.firstName,
      _state.lastName,
      _state.emailId,
      _state.phone_number,
      _state.organisation,
      _state.password,
      _state.confirmPassword
    ]);
    if (validationCheck.error == 0) {
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      if (regularExpression.test(_state.password)) {
        if (_state.password == _state.confirmPassword) {
          this.setState({ loading: true });
          var poolData = {
            UserPoolId: "us-east-1_9FuCrBs4V",
            ClientId: "ststc11lqm7tdv8b8hgalvbgi"
          };
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
                // let response = await API.registerAffiliates({
                //   userName: userName,
                //   emailId: emailId,
                //   phone_number: phone_number,
                //   organisation: organisation,
                //   tier: tier,
                //   password: password
                // });
                // console.log(response);
                // sj.raw.post(
                //   "/jobs",
                //   {},
                //   { description: "my test job", source: "api", notes: "" },
                //   function(job) {
                //     console.log("job made!", job);
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
                //         console.log("data written!", response);
                //         //let's read now
                //         //read();
                //         //and finish the job
                //         sj.raw.post(
                //           "/jobs/" + job.job_id + "/finish",
                //           {},
                //           {},
                //           function(jobCompleteResponse) {
                //             console.log("job finished!");
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
            errorfileds: [
              "",
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              true
            ],
            errorMessage: "Password Should match confirm password"
          });
        }
      } else {
        this.setState({
          error: true,
          errorfileds: [
            "",
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false
          ],
          errorMessage:
            "Password should contain atleast one number,one special character and caps alphabet "
        });
      }
    } else {
      console.log(validationCheck.errorfileds);
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
    this.props.history.push("/login");
  }
  render() {
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
          <div className="col-md-6">
            <div className="card-group">
              <div className="p-4 card">
                <div className="card-body">
                  <Button
                    style={{ float: "right", backgroundColor: "#036470" }}
                    onClick={() => this.props.history.push("/login")}
                  >
                    GO Back
                  </Button>
                  <div>
                    <h1>Sign Up</h1>
                    <p className="text-muted">Create your account</p>
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="jon jones"
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
                          <i className="fa fa-user-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="jon"
                        type="text"
                        className={
                          this.state.errorfileds[2] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.firstName}
                        onChange={e => {
                          this.inputChange(e, "firstName");
                        }}
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="jones"
                        type="text"
                        className={
                          this.state.errorfileds[3] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.lastName}
                        onChange={e => {
                          this.inputChange(e, "lastName");
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
                        placeholder="jonjones@gmail.com"
                        type="text"
                        className={
                          this.state.errorfileds[4] && this.state.error
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
                        placeholder="+19471256478"
                        type="number"
                        className={
                          this.state.errorfileds[5] && this.state.error
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
                          <i className="fa fa-sitemap" aria-hidden="true" />
                        </span>
                      </div>
                      <select
                        name="organisation"
                        className={
                          this.state.errorfileds[6] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        onChange={e => {
                          this.inputChange(e, "organisation");
                        }}
                      >
                        <option value="Organisation">Organisation</option>
                        <option value="ASCA">ASCA</option>
                        <option value="ZEE5">ZEE5</option>
                        <option value="FUSE-ASCA">FUSE-ASCA</option>
                      </select>
                    </div>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="abcXYZ123#"
                        type="password"
                        className={
                          this.state.errorfileds[7] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.password}
                        onChange={e => {
                          this.inputChange(e, "password");
                        }}
                      />
                    </div>

                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="abcXYZ123#"
                        type="password"
                        className={
                          this.state.errorfileds[8] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.confirmPassword}
                        onChange={e => {
                          this.inputChange(e, "confirmPassword");
                        }}
                      />
                    </div>

                    <button
                      className="mt-3 btn btn-primary btn-block"
                      onClick={this.SignUp}
                    >
                      Sign up
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

// <div className="mb-3 input-group">
// <div className="input-group-prepend">
//   <span className="input-group-text">
//     <i className="fa fa-building-o" aria-hidden="true" />
//   </span>
// </div>
// <input
//   placeholder="Organisation"
//   type="text"
//   className={
//     this.state.errorfileds[4] && this.state.error
//       ? "form-control error-border-color"
//       : "form-control"
//   }
//   value={this.state.organisation}
//   onChange={e => {
//     this.inputChange(e, "organisation");
//   }}
// />
// </div>
