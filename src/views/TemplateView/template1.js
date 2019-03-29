import React, { Component } from "react";
import HtmlContent from "../../../public/template/index.html";

export default class template1 extends Component {
  createMarkup() {
    return { __html: html };
  }
  render() {
    return <div dangerouslySetInnerHTML={{ __html: HtmlContent }} />;
  }
}
