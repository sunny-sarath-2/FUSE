import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import Button from "@material-ui/core/Button";

const CreateChapter = props => {
  const { classes } = props;
  return (
    <div>
      <div>
        <TextField
          id="outlined-name"
          label="name"
          fullWidth
          className={classes.textField}
          value={props.name}
          onChange={e => props.handleChange(e, "name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="loaction"
          fullWidth
          className={classes.textField}
          value={props.location}
          onChange={e => props.handleChange(e, "location")}
          margin="normal"
          variant="outlined"
          style={{ marginBottom: "25px" }}
        />
        {props.loadingCreate ? (
          <center>
            <div className="spinner-border text-primary" />
          </center>
        ) : (
          <Select
            value={props.recivedSelect}
            onChange={e => {
              props.handleChange(e, "recivedSelect");
            }}
            options={props.impexiumData.map(suggestion => ({
              value: suggestion.name,
              label: suggestion.name
            }))}
            placeholder="select affiliate"
            isClearable
          />
        )}
        <Button
          style={{
            backgroundColor: "#00acc1",
            color: "#fff",
            marginTop: "15px"
          }}
          onClick={props.submit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateChapter;
