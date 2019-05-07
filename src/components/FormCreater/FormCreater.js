import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Grid from "@material-ui/core/Grid";

const FormCreater = props => {
  let create = (fieldType, key) => {
    switch (fieldType[0]) {
      case "TextField":
        return (
          <Grid item xs={12} sm={4} key={key}>
            <TextField
              id="outlined-name"
              label={fieldType[1]}
              fullWidth
              className={props.classes.textField}
              value={props.name}
              onChange={props.handleInput}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        );
      case "dateTimePicker":
        return (
          <Grid item xs={12} sm={4} key={key}>
            <TextField
              id="standard-name"
              label={fieldType[1]}
              type="datetime-local"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              className={props.classes.textField}
              value={props.name}
              onChange={() => {}}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        );
      case "multilineText":
        return (
          <Grid item xs={12} sm={4} key={key}>
            <TextField
              id="standard-multiline-static"
              label={fieldType[1]}
              rows="4"
              multiline
              fullWidth
              className={props.classes.textField}
              value={props.name}
              onChange={() => {}}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        );
      default:
        return null;
    }
  };
  console.log(props);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Grid container spacing={24} style={{ marginTop: "20px" }}>
          {props.fields != undefined && props.fields != null
            ? props.fields.map((prop, key) => {
                return create(prop, key);
              })
            : console.log("some else")}

          <Grid item xs={12} sm={12}>
            <Button
              className={"RegularButton-button-142"}
              style={{
                backgroundColor: "#00acc1"
              }}
              onClick={() => {}}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </GridItem>
    </GridContainer>
  );
};

export default FormCreater;
