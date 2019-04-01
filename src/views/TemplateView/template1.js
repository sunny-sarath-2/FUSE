import React, { Component } from "react";
import HtmlContent from "../../../public/template/index.html";
// import "../../../public/template/css/style.css";

export default class template1 extends Component {
  createMarkup() {
    return { __html: html };
  }
  loadcss() {}
  render() {
    // console.log("check");
    // var link = document.createElement("link");
    // link.href = cs;
    // link.type = "text/css";
    // link.rel = "stylesheet2";
    // document.getElementsByTagName("head")[0].appendChild(link);
    return <div dangerouslySetInnerHTML={{ __html: HtmlContent }} />;
  }
}
