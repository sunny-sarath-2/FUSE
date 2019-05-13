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
      return (
        <span>
          <label>{field.name}</label>
          <CardContent />
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
