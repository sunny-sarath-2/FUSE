import React, { Component } from "react";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
import appController from "../../controller/controller";
import Button from "../../components/CustomButtons/Button";
import Warningprompts from "../../modelPopups/warningprompts";
// const AWS = require("aws-sdk");
// AWS.config.region = "us-east-1";
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   // IdentityPoolId:
// });
// const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({
//   apiVersion: "2016-04-19",
//   region: "us-west-1",
//   accessKeyId: "ststc11lqm7tdv8b8hgalvbgi",
//   ClientId: "ststc11lqm7tdv8b8hgalvbgi"
// });

export default class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailId: "",
      organisation: "",
      tier: "",
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
        (err, result) => {
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
                        <option value="Tier">Tier</option>
                        <option value="parent">Parent</option>
                        <option value="affilate">Affilate</option>
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
