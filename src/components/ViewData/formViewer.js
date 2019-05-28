import React from "react";
import CardContent from "@material-ui/core/CardContent";

const FormViewer = props => {
  let { field, classes, data } = props;

  switch (field.params.type) {
    case "string":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{data[field.name]}</h4>
          </CardContent>
        </span>
      );
    case "integer":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{data[field.name]}</h4>
          </CardContent>
        </span>
      );
    case "email":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{data[field.name]}</h4>
          </CardContent>
        </span>
      );
    case "enum":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{data[field.name]}</h4>
          </CardContent>
        </span>
      );
    case "text":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <div dangerouslySetInnerHTML={createMarkup(data[field.name])} />
          </CardContent>
        </span>
      );
    case "date":
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{data[field.name]}</h4>
          </CardContent>
        </span>
      );
    case "media":
      var img_data = data[field.name];
      if (typeof img_data === "string") {
        img_data = JSON.parse(img_data);
      }
      let blob;
      if (img_data && typeof img_data === "object") {
        blob = img_data.blob;
      }
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <img alt="..." src={blob} height="200" width="300" />
          </CardContent>
        </span>
      );
    case "boolean":
      let bdata = data[field.name].toString();
      return (
        <span>
          <label>{field.name}</label>
          <CardContent>
            <h4>{bdata === "" ? "false" : bdata}</h4>
          </CardContent>
        </span>
      );
    default:
      return <p>default</p>;
  }
};

function createMarkup(data) {
  return { __html: data };
}

export default FormViewer;
