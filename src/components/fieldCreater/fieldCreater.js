import React from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import CKEditor from "ckeditor4-react";

const FieldCreater = props => {
  let { field, classes, data } = props;
  console.log(props);
  switch (field.type) {
    case "string":
      return (
        <TextField
          id="outlined-name"
          label={field.label}
          name={field.name}
          fullWidth
          type={field.type}
          className={classes.textField}
          value={data[field.label]}
          onChange={e => props.Change(e, field.label, field.type)}
          margin="normal"
          variant="outlined"
        />
      );
    case "text":
      return (
        <div>
          <label>{field.label}</label>
          <CKEditor
            data={data[field.label]}
            onChange={e => props.onEditorChange(e, field.label)}
          />
        </div>
      );
    case "date":
      return (
        <TextField
          id="outlined-name"
          label={field.label}
          name={field.name}
          fullWidth
          multiline={field.type === "text" ? true : false}
          rows={field.type === "text" ? "5" : "1"}
          type={field.type == "date" ? "datetime-local" : field.type}
          className={classes.textField}
          value={
            data[field.label] == undefined
              ? moment().format("YYYY-MM-DDThh:mm")
              : data[field.label]
          }
          onChange={e => props.Change(e, field.label, field.type)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          //   value={
          //     field.type == "date"
          //       ? this.state[field.label] == undefined
          //         ? moment().format("YYYY-MM-DDThh:mm")
          //         : ""
          //       : this.state[field.label]
          //   }
        />
      );
    default:
      return null;
  }
};

export default FieldCreater;
