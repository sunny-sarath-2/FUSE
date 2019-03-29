"use strict";

//import appController from '../core/appController'

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

function getHeaders(url) {
  return url.includes("login")
    ? {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": getJwtToken()
      };
}

function getUrl(url) {
  const timestamp = new Date().getTime();
  const separator = url.includes("?") ? "&" : "?";
  //noinspection JSUnresolvedVariable

  return `${url}${separator}t=${timestamp}`;
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

  post: (url, request) => serviceBase.postPutDelete(url, "POST", request),

  put: async (url, request) => serviceBase.postPutDelete(url, "PUT", request),

  delete: (url, request) => serviceBase.postPutDelete(url, "DELETE", request)
};

export default serviceBase;
