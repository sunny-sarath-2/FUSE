import React, { Component } from "react";
import HtmlContent from "../../../public/template/index.html";

export default class template1 extends Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: HtmlContent }} />;
  }
}
