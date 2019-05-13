import React from "react";
import FieldCreater from "../fieldCreater/fieldCreater";
import Button from "@material-ui/core/Button";

const FieldEditor = props => {
  let { field, classes, data } = props;
  console.log(data);
  return (
    <span>
      {field.map((field, key) => {
        return (
          <FieldCreater
            key={key}
            field={field}
            classes={classes}
            data={data}
            Change={props.Change}
            onEditorChange={props.onEditorChange}
          />
        );
      })}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={props.SubmitForm}
      >
        SUBMIT
      </Button>
    </span>
  );
};

export default FieldEditor;
