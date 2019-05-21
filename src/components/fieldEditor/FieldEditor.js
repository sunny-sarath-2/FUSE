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
      <TextField
        id="outlined-name"
        label={"Chapter"}
        name={"fuse_chapter"}
        fullWidth
        select
        type={"text"}
        className={classes.textField}
        value={data.fuse_chapter}
        onChange={e => props.Change(e, "fuse_chapter", "string")}
        margin="normal"
        variant="outlined"
      >
        {chapters.map((chap, i) => {
          return (
            <MenuItem key={i} value={chap.fields.chapter}>
              {chap.fields.chapter}
            </MenuItem>
          );
        })}
      </TextField>
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
