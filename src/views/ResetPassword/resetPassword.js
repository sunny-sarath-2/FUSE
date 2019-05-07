import React, { Component } from "react";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
import appController from "../../controller/controller";
import Button from "../../components/CustomButtons/Button";
import Warningprompts from "../../modelPopups/warningprompts";

export default class registration extends Component {
  constructor(props) {
    super(props);
    var username = appController.getUserName();
    if (username == "") this.props.history.push("/login");
    this.state = {
      verificationCode: "",
      password: "",
      error: false,
      errorfileds: [],
      errorMessage: "",
      loading: false,
      showModel: false,
      modelError: "",
      modelHeader: "",
      userRegistered: false
    };
    this.ResetPassword = this.ResetPassword.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.userRegistered = this.userRegistered.bind(this);
  }
  inputChange(e, field) {
    console.log(this.state.verificationCode);
    let value = this.state;
    value.error = false;
    value.errorMessage = "";
    value[field] = e.target.value;
    this.setState({ value: value });
  }
  closeModel() {
    this.setState({ showModel: false });
  }
  userRegistered() {
    this.props.history.push("/login");
  }
  ResetPassword() {
    console.log("called");
    var verificationCode = this.state.verificationCode;
    var newPassword = this.state.password;
    var cognitoUser = appController.getCognitoUser();
    cognitoUser.confirmPassword(verificationCode, newPassword, this);
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
                  {/* <Button
                    style={{ float: "right", backgroundColor: "#036470" }}
                    onClick={() => this.props.history.push("/login")}
                  >
                    GO Back
                  </Button> */}
                  <div>
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-share" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Verification Code"
                        type="text"
                        className={
                          this.state.errorfileds[1] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.verificationCode}
                        onChange={e => {
                          this.inputChange(e, "verificationCode");
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
                        placeholder="Password"
                        type="password"
                        className={
                          this.state.errorfileds[2] && this.state.error
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
                      onClick={() => {
                        this.ResetPassword();
                      }}
                    >
                      submit
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
