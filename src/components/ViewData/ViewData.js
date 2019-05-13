import React from "react";
import FormViewer from "./formViewer";

const ViewData = props => {
  console.log(props);
  let { modelType, classes, data } = props;
  return (
    <div>
      {modelType.map((field, key) => {
        console.log(field);
        return (
          <FormViewer key={key} field={field} classes={classes} data={data} />
        );
      })}
    </div>
  );
};

export default ViewData;
