import React, { Component } from "react";
import appController from "../controller/controller";
import Warningprompts from "../modelPopups/warningprompts";
import Restpasswordprompts from "../modelPopups/restpasswordprompts";
import API from "../../services/API";
import Switch from "@material-ui/core/Switch";
import AWS from "aws-sdk";

var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
require("../../public/style.css");

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
      modelHeader: "",
      showModeForgetPassword: false,
      verificationCode: "",
      restPassword: "",
      submited: false,
      handleLogin: false
    };
    this.Login = this.Login.bind(this);
    this.Register = this.Register.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.ForgetPassword = this.ForgetPassword.bind(this);
    this.getNewPassword = this.getNewPassword.bind(this);
    this.sendNewPassword = this.sendNewPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.LoginAffilate = this.LoginAffilate.bind(this);
  }
  Register() {
    this.props.history.push("/register");
  }

  async setStrapiUser(user) {
    let registerStrapiUser = await API.registerStrapiUser({
      username: user.userName,
      email: user.userEmail,
      password: user.userName,
      provider: "cognito",
      Tier: user.userType,
      Organisation: user.userOrganisation
    });
    if (registerStrapiUser.jwt) {
      await appController.setStrapiJwtToken(registerStrapiUser.jwt);
      await localStorage.setItem("strapiJwtToken", registerStrapiUser.jwt);
      this.props.history.push("/admin/dashboard");
    }
  }

  Login(e) {
    e.preventDefault();
    let _state = this.state;
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
          var userDetails = appController.getUser(idToken);
          this.setStrapiUser(userDetails);
          // console.log(result, "loged in user details");
          /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
          //this.props.history.push("/admin/dashboard");
        },

        onFailure: err => {
          this.LoginAffilate(e, err);
          // this.setState({
          //   //showModel: true,
          //   loading: false,
          //   //modelError: err.message,
          //   //modelHeader: "Error",
          //   error: true,
          //   errorfileds: "",
          //   errorMessage: err.message
          // });
        },
        newPasswordRequired: () => {
          this.setState({
            error: true,
            errorfileds: "",
            errorMessage: "user haven't confirmed by admin"
          });
          console.log("called new password");
          return;
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
    this.setState({
      showModel: false,
      showModeForgetPassword: false,
      verificationCode: "",
      restPassword: ""
    });
  }
  async ForgetPassword() {
    var _state = this.state;
    let validationCheck = appController.validation([_state.userName]);
    if (validationCheck.error == 0) {
      this.setState({
        modelHeader: "reset password",
        showModeForgetPassword: true
      });
      var getNewPassword = this.getNewPassword;
      this.setState({
        showModeForgetPassword: true
      });
      var cognitoUser = appController.getCognitoUser();
      cognitoUser.forgotPassword({
        onSuccess: function(result) {
          console.log("call result: " + result);
        },
        onFailure: err => {
          console.log(err);
          this.setState({
            loading: false,
            modelError: err.message,
            modelHeader: "Error"
          });
        },
        async inputVerificationCode() {
          let a = await getNewPassword();
          console.log(a);
          // cognitoUser.confirmPassword(verificationCode, newPassword, this);
          // var verificationCode =  prompt("Enter verification code ", ""); //getNewPassword
          // var newPassword = prompt("Enter new password ", "");
          // cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
      });
    } else {
      this.setState({
        error: true,
        errorfileds: validationCheck.errorfileds,
        errorMessage: "To reset password username is required"
      });
    }
  }
  async getNewPassword() {
    console.log(this.state.restPassword, this.state.verificationCode);
    if (this.state.submited) {
      return {
        restPassword: this.state.restPassword,
        verificationCode: this.state.verificationCode
      };
    } else {
      // await this.getNewPassword();
    }

    // await callback(this.state.verificationCode, this.state.restPassword);
  }
  sendNewPassword() {
    this.setState({
      submited: true
    });
  }
  handleChange(e, name) {
    console.log(e.target.checked, name);
    this.setState({ [name]: e.target.checked });
  }
  LoginAffilate(e, err) {
    e.preventDefault();
    console.log(err);
    let _state = this.state;
    let validationCheck = appController.validation([
      _state.userName,
      _state.password
    ]);
    if (validationCheck.error == 0) {
      this.setState({ loading: true });
      let AppName = "ascaFuse";
      let AppKey = "6c4f4L0idNy4OJ63";
      this.getURI(AppName, AppKey).then(basicAuth => {
        this.getTokens(basicAuth).then(secoundryAuth => {
          console.log(secoundryAuth);
          if (secoundryAuth != undefined) {
            console.log(secoundryAuth);
            this.getUserDetails(secoundryAuth).then(finalAuth => {
              console.log(finalAuth);
              appController.setAffilateTokens(
                basicAuth.appToken,
                basicAuth.userToken,
                basicAuth.uri,
                finalAuth.dataList[0].name,
                finalAuth.dataList[0].user.loginEmail
              );
              this.setStrapiUser(appController.getAffilateTokens());
              console.log(appController.getAffilateTokens());
            });
          } else {
            this.setState({
              loading: false,
              error: true,
              errorfileds: "",
              errorMessage: err.message
            });
          }
        });
      });

      // const cognitoidentity = new AWS.CognitoIdentity({
      //   apiVersion: "2014-06-30",
      //   region: "us-east-1"
      // });
      // cognitoidentity.getId(
      //   {
      //     IdentityPoolId:
      //       "us-east-1:d8850f9b-8c08-4694-8a8f-8b0b42ba18ef",
      //     Logins: {
      //       "cognito-identity.amazonaws.com": "login.impexium.fuseas"
      //     }
      //   },
      //   (err, data) => {
      //     console.log(finalAuth.dataList[0].id);
      //     console.log(data, err);
      //   }
      // );
      // cognitoidentity.getCredentialsForIdentity(
      //   {
      //     // IdentityPoolId: "FuseAS_Dev_FedIdPool",
      //     IdentityId: "16dd2398-7568-41cd-8502-98fd30674670",
      //     Logins: {
      //       "cognito-identity.amazonaws.com": secoundryAuth.appToken
      //     }
      //   },
      //   (err, data) => {
      //     // console.log(
      //     //   data,
      //     //   err,
      //     //   "check the copgnoito ~~~~~~~~~~~~~~~~~~~"
      //     // );
      //   }
      // );
      // AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      //   {
      //     IdentityPoolId: "FuseAS_Dev_FedIdPool",
      //     IdentityId: "IDENTITY_ID_RETURNED_FROM_YOUR_PROVIDER",
      //     Logins: {
      //       "cognito-identity.amazonaws.com": response.appToken
      //     }
      //   },
      //   {
      //     region: "us-east-1"
      //   }
      // );
      // this.props.history.push("/admin/dashboard");
    } else {
      this.setState({
        loading: false,
        error: true,
        errorfileds: validationCheck.errorfileds,
        errorMessage: "Please fill all the details"
      });
    }
  }
  getURI = (AppName, AppKey) =>
    new Promise((resolve, reject) => {
      let data = {
        AppName,
        AppKey
      };
      fetch("https://public.impexium.com/Api/v1/WebApiUrl", {
        method: "POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => resolve(response));
    });
  getTokens = res =>
    new Promise((resolve, reject) => {
      let data = {
        AppId: "ascaFuse",
        AppPassword: "6c4f4L0idNy4OJ63",
        AppUserEmail: this.state.userName, //fuse_Integration@notchpoint.com
        AppUserPassword: this.state.password //8cT8EWMzmsksHcnc
      };
      fetch(res.uri, {
        method: "POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          AccessToken: res.accessToken
        }
      })
        .then(res => {
          console.log(res);
          if (res.status == 401) {
            return undefined;
          } else {
            return res.json();
          }
        })
        .then(response => {
          console.log(response);
          resolve(response);
        });
    });
  getUserDetails = res =>
    new Promise((resolve, reject) => {
      fetch(res.uri + "/Individuals/Profile/" + res.userId + "/1", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          appToken: res.appToken,
          userToken: res.userToken
        }
      })
        .then(response => response.json())
        .then(response => resolve(response));
    });
  render() {
    return (
      <div className="container main form-middle-main">
        <Warningprompts
          errormessage={this.state.modelError}
          header={this.state.modelHeader}
          show={this.state.showModel}
          close={this.closeModel}
        />
        <Restpasswordprompts
          errormessage={this.state.modelError}
          header={this.state.modelHeader}
          show={this.state.showModeForgetPassword}
          close={this.closeModel}
          errorfileds={[false, false]}
          inputChange={this.inputChange}
          verificationCode={this.state.verificationCode}
          password={this.state.restPassword}
          ResetPassword={this.sendNewPassword}
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
                    {/* <h5 style={{ float: "left" }}>Admin</h5>
                    <span style={{ float: "left" }}>
                      <Switch
                        color="primary"
                        checked={this.state.handleLogin}
                        onChange={e => this.handleChange(e, "handleLogin")}
                      />
                    </span> */}
                    {/* <h5>Affiliate</h5> */}
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
                    <div className="col-12">
                      <button
                        data-toggle="modal"
                        data-target="#myModal"
                        className="px-4 btn btn-primary"
                        onClick={
                          this.state.handleLogin
                            ? this.LoginAffilate
                            : this.Login
                        }
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-12" style={{ overflow: "hidden" }}>
                      <a
                        data-toggle="modal"
                        data-target="#myModal"
                        className=""
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => {
                          this.ForgetPassword();
                        }}
                      >
                        Forget Password
                      </a>
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
                    <p>Sign up your account to get access.</p>
                    <a>
                      <button
                        tabIndex="-1"
                        className="mt-3 btn btn-primary active"
                        onClick={this.Register}
                      >
                        Register Now!
                      </button>
                    </a>
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
// signout() {
//   var cognitoUser = appController.getCognitoUser();
//   // cognitoUser.getUserAttributes(function(err, result) {
//   //   if (err) {
//   //     alert(err);
//   //     return;
//   //   }
//   //   for (i = 0; i < result.length; i++) {
//   //     console.log(
//   //       "attribute " +
//   //         result[i].getName() +
//   //         " has value " +
//   //         result[i].getValue()
//   //     );
//   //   }
//   // });
//   cognitoUser.forgotPassword({
//     onSuccess: function(result) {
//       console.log("call result: " + result);
//     },
//     onFailure: function(err) {
//       console.log(err);
//       alert(err);
//     },
//     inputVerificationCode() {
//       var verificationCode = prompt("Please input verification code ", "");
//       var newPassword = prompt("Enter new password ", "");
//       cognitoUser.confirmPassword(verificationCode, newPassword, this);
//     }
//   });
// }
