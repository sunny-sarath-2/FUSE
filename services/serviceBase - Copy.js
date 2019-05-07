"use strict";

//import appController from '../core/appController'
import appController from "../src/controller/controller";

const credentials = {
  credentials: "same-origin"
};

async function checkStatus(response) {
  let dataResponce;
  if (response.status >= 200 && response.status < 300) {
    dataResponce = await response;
  } else {
    let error = new Error(response.statusText);
    error.response = await response.json();

    dataResponce = Promise.reject(error);
  }
  return dataResponce;
}

function getJwtToken() {
  //return appController.jwtToken
}

function StrapiJwtToken() {
  //return appController.getStrapiJwtToken();
  return localStorage.getItem("strapiJwtToken");
}

function getHeaders(url) {
  return url.includes("register")
    ? {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + StrapiJwtToken()
        // "x-access-token": getJwtToken()
      };
}

function getUrl(url) {
  const timestamp = new Date().getTime();
  const separator = url.includes("?") ? "&" : "?";
  //noinspection JSUnresolvedVariable
  // console.log(url);
  //return "http://18.212.235.172:1337" + url;
  return "https://localhost:1337" + url;
  // return `${url}${separator}t=${timestamp}`;
}

/**
 * Base functionality for the server request communications (GET, POST, ...).
 * @type {{get: (function()), postPutDelete: (function()), post: (function()), put: (function()), delete: (function())}}
 */
const serviceBase = {
  get: async url => {
    credentials.headers = getHeaders(url);
    let response = await fetch(getUrl(url), credentials);
    response = await checkStatus(response);

    return response.json();
  },

  postPutDelete: async (url, method, request) => {
    const options = {
      headers: getHeaders(url),
      method: method,
      body: JSON.stringify(request)
    };

    let response = await fetch(
      getUrl(url),
      Object.assign(options, credentials)
    );
    response = await checkStatus(response);

    return response.json();
  },

  userRegister: async (url, method, request) => {
    console.log("reg", url);
    console.log("request", request);
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: method,
      body: JSON.stringify(request)
    };
    console.log("options123", options);
    let response = await fetch(
      getUrl(url),
      Object.assign(options, credentials)
    );
    //response = await checkStatus(response);

    return response.json();
  },

  post: (url, request) => serviceBase.postPutDelete(url, "POST", request),

  put: async (url, request) => serviceBase.postPutDelete(url, "PUT", request),

  delete: (url, request) => serviceBase.postPutDelete(url, "DELETE", request),

  register: (url, request) => serviceBase.userRegister(url, "POST", request)
};

export default serviceBase;
