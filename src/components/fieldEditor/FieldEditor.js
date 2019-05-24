import React from "react";
import FieldCreater from "../fieldCreater/fieldCreater";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const FieldEditor = props => {
  let { field, classes, data, chapters } = props;
  console.log(data, "data");
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

      {props.btnclick ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled
        >
          ... Saving
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={props.SubmitForm}
        >
          SUBMIT
        </Button>
      )}
    </span>
  );
};

export default FieldEditor;
