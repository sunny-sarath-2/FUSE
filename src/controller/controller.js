import jose from "node-jose";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import jwk from "../assets/utils/public.json";
import User from "../model/user.model";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
let username = "";
let StrapiJwtToken = "";
var algoritham;
let appToken = "";
let userToken = "";
let uri = "";
let affilateuserName = "";
let affilateEmail = "";

const appController = {
  checkAccess(callBack) {
    // new Promise((resolve, reject) => {
    var pem = jwkToPem(jwk.keys[0]);
    var pem1 = jwkToPem(jwk.keys[1]);
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken == undefined) {
      callBack(false, "line 14");
      // resolve(false);
    } else {
      jwt.verify(
        accessToken,
        pem1,
        { algorithms: algoritham },
        (err, decodedToken) =>
          new Promise((resolve, reject) => {
            if (err == null) {
              // callBack(true, "line 25");
              resolve(true);
            }
            if (err != null) {
              if (err.name == "JsonWebTokenError") {
                jwt.verify(
                  accessToken,
                  pem,
                  { algorithms: algoritham },
                  (err, decodedToken) => {
                    if (err.name == "JsonWebTokenError") {
                      // callBack(false, "line 36");
                      resolve(false);
                    } else if (err.name == "TokenExpiredError") {
                      // callBack(false, "line 39");
                      resolve(false);
                    } else if (err == null) {
                      // callBack(true, "line 43");
                      resolve(true);
                    }
                  }
                );
              } else if (err.name == "TokenExpiredError") {
                // callBack(false, "line 49");
                resolve(false);
              }
            }
          }).then(result => {
            if (result) {
              var userDeatails;
              var idToken = localStorage.getItem("idToken");
              userDeatails = this.getUser(idToken);
              callBack(true, userDeatails);
              // resolve(true);
            } else {
              callBack(result);
            }
          })
      );
    }
    // });
  },
  createAccess(authenticate, callback) {
    var pem = jwkToPem(jwk.keys[0]);
    var pem1 = jwkToPem(jwk.keys[1]);
    var accessToken = authenticate.access_token;
    var idToken = authenticate.id_token;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);

    var sections = accessToken.split(".");
    var header = jose.util.base64url.decode(sections[0]);
    var payload = jose.util.base64url.decode(sections[1]);
    payload = JSON.parse(payload);
    header = JSON.parse(header);
    algoritham = header.alg;
    var userDeatails;
    var checkHeader = this.checkKID(header);
    if (checkHeader) {
      jwt.verify(
        accessToken,
        pem1,
        { algorithms: header.alg },
        (err, decodedToken) =>
          new Promise((resolve, reject) => {
            if (err == null) {
              resolve(true);
            }
            if (err != null) {
              if (err.name == "JsonWebTokenError") {
                jwt.verify(
                  accessToken,
                  pem,
                  { algorithms: header.alg },
                  (err, decodedToken) => {
                    if (err.name == "JsonWebTokenError") resolve(false);
                    else if (err.name == "TokenExpiredError") resolve(false);
                    else if (err == null) {
                      resolve(true);
                    }
                  }
                );
              } else if (err.name == "TokenExpiredError") {
                resolve(false);
              }
            }
          }).then(result => {
            if (result) {
              if (!checkHeader) return false;
              else {
                userDeatails = this.getUser(idToken);
                callback(true, userDeatails);
              }
            }
          })
      );
    } else if (!checkHeader) {
      callback(false);
      return false;
    }
  },
  checkKID(header) {
    if (header.kid == jwk.keys[0].kid) return true;
    else if (header.kid == jwk.keys[1].kid) return true;
    else return false;
  },
  getUser(idToken) {
    var sections = idToken.split(".");
    var header = jose.util.base64url.decode(sections[0]);
    var payload = jose.util.base64url.decode(sections[1]);
    payload = JSON.parse(payload);
    header = JSON.parse(header);
    var userdetails = new User();
    // console.log(payload);
    userdetails.userType = payload["custom:Tier"];
    userdetails.userOrganisation = payload["custom:Organisation"];
    userdetails.userEmail = payload.email;
    userdetails.userName = payload.name;
    userdetails.userPhoneNumber = payload.phone_number;
    return userdetails;
  },
  checkNewAccess() {
    var poolData = {
      UserPoolId: "us-east-1_9FuCrBs4V",
      ClientId: "ststc11lqm7tdv8b8hgalvbgi"
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userDetails = userPool.getCurrentUser();
    if (userDetails != null) return userDetails;
    // userDetails.getSession((err, session) => {
    //   if (err) {
    //     alert(err);
    //     return;
    //   }
    //   console.log("session validity: " + session.isValid());
    // });
  },
  getCognitoUser() {
    // console.log(username);
    var poolData = {
      UserPoolId: "us-east-1_9FuCrBs4V",
      ClientId: "ststc11lqm7tdv8b8hgalvbgi" //74b566o357ju94ej02sl6b85p
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return cognitoUser;
  },
  setUserName(usernamegiven) {
    // console.log(usernamegiven);
    username = usernamegiven;
  },
  validation(fields) {
    let error = 0;
    let errorfileds = {};
    fields.map((field, index) => {
      if (field == "" || field == null) {
        errorfileds[++index] = true;
        error++;
      }
    });
    return { error: error, errorfileds: errorfileds };
  },
  getUserName() {
    return username;
  },
  setStrapiJwtToken(token) {
    StrapiJwtToken = token;
  },
  getStrapiJwtToken() {
    return StrapiJwtToken;
  },
  setAffilateTokens(rappToken, ruserToken, ruri, rname, remail) {
    localStorage.setItem("username", rname);
    console.log(rappToken, ruserToken, ruri, rname, remail);
    appToken = rappToken;
    userToken = ruserToken;
    uri = ruri;
    affilateuserName = rname;
    affilateEmail = remail;
  },
  getAffilateTokens() {
    console.log(appToken, uri, userToken, affilateuserName, affilateEmail);
    return {
      appToken,
      userToken,
      uri,
      userName: affilateuserName,
      userEmail: affilateEmail,
      userType: "affilate",
      userOrganisation: "ASCA"
    };
  }
};
export default appController;
