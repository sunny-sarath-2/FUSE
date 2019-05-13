import React from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import CKEditor from "ckeditor4-react";

const FieldCreater = props => {
  let { field, classes, data } = props;
  console.log(props);
  switch (field.params.type) {
    case "string":
      return (
        <TextField
          id="outlined-name"
          label={field.name}
          name={field.name}
          fullWidth
          type={field.params.type}
          className={classes.textField}
          value={data[field.name]}
          onChange={e => props.Change(e, field.name, field.params.type)}
          margin="normal"
          variant="outlined"
        />
      );
    case "text":
      return (
        <div>
          <label>{field.name}</label>
          <CKEditor
            data={data[field.name]}
            onChange={e => props.onEditorChange(e, field.name)}
          />
        </div>
      );
    case "date":
      return (
        <TextField
          id="outlined-name"
          label={field.name}
          name={field.name}
          fullWidth
          multiline={field.params.type === "text" ? true : false}
          rows={field.params.type === "text" ? "5" : "1"}
          type={
            field.params.type == "date" ? "datetime-local" : field.params.type
          }
          className={classes.textField}
          value={
            data[field.name] == undefined
              ? moment().format("YYYY-MM-DDThh:mm")
              : data[field.name]
          }
          onChange={e => props.Change(e, field.name, field.params.type)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      );
    default:
      return null;
  }
};

export default FieldCreater;
