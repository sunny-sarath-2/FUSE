import React, { Component } from "react";
import appController from "../controller/controller";
import Warningprompts from "../modelPopups/warningprompts";
import Restpasswordprompts from "../modelPopups/restpasswordprompts";
import API from "../../services/API";
import Switch from "@material-ui/core/Switch";

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
          this.setState({
            showModel: true,
            loading: false,
            modelError: err.message,
            modelHeader: "Error"
          });
        },
        newPasswordRequired: () => {
          alert("user haven't confirmed by admin");
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
  LoginAffilate(e) {
    e.preventDefault();
    let _state = this.state;
    let validationCheck = appController.validation([
      _state.userName,
      _state.password
    ]);
    if (validationCheck.error == 0) {
      let AppName = "ascaFuse";
      let AppKey = "6c4f4L0idNy4OJ63";
      this.getURI(AppName, AppKey).then(res => {
        this.getTokens(res).then(response => {
          console.log(response);
          appController.setAffilateTokens(
            response.appToken,
            response.userToken,
            response.uri
          );
          console.log(appController.getAffilateTokens());
        });
      });
    } else {
      this.setState({
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
      console.log(res.uri, res.accessToken);
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
        .then(res => res.json())
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
                    <h5 style={{ float: "left" }}>Admin</h5>
                    <span style={{ float: "left" }}>
                      <Switch
                        color="primary"
                        checked={this.state.handleLogin}
                        onChange={e => this.handleChange(e, "handleLogin")}
                      />
                    </span>
                    <h5>Affiliate</h5>
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
