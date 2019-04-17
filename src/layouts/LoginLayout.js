import React, { Component } from "react";
import appController from "../controller/controller";
import Warningprompts from "../modelPopups/warningprompts";
// import AmazonCognitoIdentity from "amazon-cognito-identity-js";
global.fetch = require("node-fetch");
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

// var poolData = {
//   UserPoolId: "us-east-1_9FuCrBs4V",
//   ClientId: "ststc11lqm7tdv8b8hgalvbgi" //74b566o357ju94ej02sl6b85p
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      error: false,
      errorfileds: [],
      errorMessage: "",
      loading: false,
      showModel: false,
      modelError: "",
      modelHeader: ""
    };
    this.Login = this.Login.bind(this);
    this.Register = this.Register.bind(this);
    this.signout = this.signout.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.closeModel = this.closeModel.bind(this);
    // this.getCognitoUser = this.getCognitoUser.bind(this);
  }
  componentDidMount() {}
  // getCognitoUser() {
  //   var userData = {
  //     Username: this.state.userName,
  //     Pool: userPool
  //   };
  //   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  //   return cognitoUser;
  // }
  Register() {
    this.props.history.push("/register");
  }
  signout() {
    var cognitoUser = appController.getCognitoUser();
    cognitoUser.getUserAttributes(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      for (i = 0; i < result.length; i++) {
        console.log(
          "attribute " +
            result[i].getName() +
            " has value " +
            result[i].getValue()
        );
      }
    });
    // cognitoUser.forgotPassword({
    //   onSuccess: function(result) {
    //     console.log("call result: " + result);
    //   },
    //   onFailure: function(err) {
    //     console.log(err);
    //     alert(err);
    //   },
    //   inputVerificationCode() {
    //     var verificationCode = prompt("Please input verification code ", "");
    //     var newPassword = prompt("Enter new password ", "");
    //     cognitoUser.confirmPassword(verificationCode, newPassword, this);
    //   }
    // });
  }
  Login(e) {
    e.preventDefault();
    let _state = this.state;
    // console.log(appController.validation([_state.userName, _state.password]));
    let validationCheck = appController.validation([
      _state.userName,
      _state.password
    ]);
    if (validationCheck.error == 0) {
      this.setState({ loading: true });
      var cognitoUser = appController.getCognitoUser();
      var authenticationData = {
        Username: this.state.userName, //SunnySarath
        Password: this.state.password //Welcome@1234$
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          var accessToken = result.getAccessToken().getJwtToken();
          var idToken = result.idToken.jwtToken;
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);
          // console.log(result, "loged in user details");
          /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
          this.props.history.push("/admin/dashboard");
        },

        onFailure: err => {
          // this.setState({ showModel: true });
          // console.log(err);
          this.setState({
            showModel: true,
            loading: false,
            modelError: err.message,
            modelHeader: "Error"
          });
          // alert(err);
        },
        newPasswordRequired: () => {
          alert("user haven't confirmed by admin");
          console.log("called new password");
          return;
          // var attributesData = {
          //   name: "SunnySarath",
          //   phone_number: "+911234567890"
          // };
          // cognitoUser.completeNewPasswordChallenge(
          //   "Welcome@1234$",
          //   attributesData,
          //   this
          // );
        }
      });
    } else {
      this.setState({
        error: true,
        errorfileds: validationCheck.errorfileds,
        errorMessage: "Please fill all the details"
      });
    }
  }

  inputChange(e, field) {
    if (field == "userName") {
      appController.setUserName(e.target.value);
    }
    let value = this.state;
    value.error = false;
    value.errorMessage = "";
    value[field] = e.target.value;
    this.setState({ value: value });
  }

  closeModel() {
    // console.log("close");
    this.setState({ showModel: false });
  }
  render() {
    return (
      <div className="container main form-middle-main">
        <Warningprompts
          errormessage={this.state.modelError}
          header={this.state.modelHeader}
          show={this.state.showModel}
          close={this.closeModel}
        />
        <div className="justify-content-center row">
          <div className="col-md-8">
            <div className="card-group">
              <div className="p-4 card">
                <div className="card-body">
                  <form className="all">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    <div className="mb-3 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-o" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Username"
                        autoComplete="username"
                        type="text"
                        className={
                          this.state.errorfileds[2] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        value={this.state.userName}
                        onChange={e => {
                          this.inputChange(e, "userName");
                        }}
                      />
                    </div>
                    <div className="mb-4 input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                      </div>
                      <input
                        placeholder="Password"
                        autoComplete="current-password"
                        type="password"
                        className={
                          this.state.errorfileds[2] && this.state.error
                            ? "form-control error-border-color"
                            : "form-control"
                        }
                        onChange={e => {
                          this.inputChange(e, "password");
                        }}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          data-toggle="modal"
                          data-target="#myModal"
                          className="px-4 btn btn-primary"
                          onClick={this.Login}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="text-white bg-primary py-5 d-md-down-none card right-bg"
                style={{ width: "44%" }}
              >
                <div className="text-center card-body">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <a>
                      <button
                        tabIndex="-1"
                        className="mt-3 btn btn-primary active"
                        onClick={this.Register}
                      >
                        Register Now!
                      </button>
                    </a>
                    {/* <button
                      tabIndex="-1"
                      className="mt-3 btn btn-primary active"
                      onClick={this.signout}
                    >
                      signout
                    </button> */}
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

export default LoginLayout;

// cognitoUser.forgotPassword({
//   onSuccess: function(result) {
//     console.log("call result: " + result);
//   },
//   onFailure: function(err) {
//     console.log(err);
//     alert(err);
//   },
//   inputVerificationCode() {
//     var verificationCode = prompt("Please input verification code ", "");
//     var newPassword = prompt("Enter new password ", "");
//     cognitoUser.confirmPassword(verificationCode, newPassword, this);
//   }
// });
// console.log("signout");
// // cognitoUser.signOut();
// cognitoUser.getSession(function(err, session) {
//   if (err) {
//     alert(err);
//     return;
//   }
//   console.log("session validity: " + session.isValid());
// });
