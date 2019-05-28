import React from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import CKEditor from "ckeditor4-react";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";

const FieldCreater = props => {
  let { field, classes, data } = props;
  //console.log(props);
  switch (field.params.type) {
    case "string":
      return (
        <TextField
          id="outlined-name"
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
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
    case "integer":
      return (
        <TextField
          id="outlined-name"
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
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
    case "email":
      return (
        <TextField
          id="outlined-name"
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
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
          <label>
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
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
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
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
    case "boolean":
      let booleanvalue;
      if (data[field.name]) {
        if (data[field.name].toString() === "true") {
          booleanvalue = true;
        } else {
          booleanvalue = false;
        }
      }
      return (
        <div>
          <label>{field.name}</label>
          <Switch
            color="primary"
            checked={booleanvalue}
            name={field.name}
            value={data[field.name] === "true" ? false : true}
            onChange={e => props.Change(e, field.name, field.params.type)}
          />
          <label>{data[field.name]}</label>
        </div>
      );
    case "media":
      let blob;
      let fname;
      if (data[field.name]) {
        if (typeof data[field.name] === "string") {
          data[field.name] = JSON.parse(data[field.name]);
        }
        if (typeof data[field.name] === "object") {
          blob = data[field.name].blob;
          fname = data[field.name].name;
        }
      }
      return (
        <div>
          {blob ? <img alt="..." src={blob} height="100" width="150" /> : null}
          <TextField
            id="outlined-name"
            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            name={field.name}
            fullWidth
            type={"file"}
            className={classes.textField}
            //value={""}
            onChange={e => props.Change(e, field.name, field.params.type)}
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    case "enum":
      let options = field.params.options.split(",");
      return (
        <TextField
          id="outlined-name"
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          name={field.name}
          fullWidth
          select
          type={"text"}
          className={classes.textField}
          value={data[field.name] ? data[field.name] : ""}
          onChange={e => props.Change(e, field.name, field.params.type)}
          margin="normal"
          variant="outlined"
        >
          {options.map((opt, i) => {
            opt = opt.replace(" ", "");
            return (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
      );
    default:
      return null;
  }
};

export default FieldCreater;
