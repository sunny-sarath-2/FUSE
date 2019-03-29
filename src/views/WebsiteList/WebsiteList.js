import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function WebsiteList(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Site Meta</h4>
            <p className={classes.cardCategoryWhite} style={{ float: "left" }}>
              List of Sites.
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Email",
                "Contact No",
                "Chapter",
                "URL",
                "Status",
                "Last updated"
              ]}
              tableData={[
                [
                  "abc@localhost.com",
                  "+1 78945623",
                  "Oud-Turnhout",
                  "http://abc.localhost.com",
                  "Active",
                  "2 weeks ago"
                ],
                [
                  "def@localhost.com",
                  "+1 78945623",
                  "Sinaai-Waas",
                  "http://def.localhost.com",
                  "Active",
                  "2 weeks ago"
                ],
                [
                  "ghi@localhost.com",
                  "+1 78945623",
                  "Baileux",
                  "http://ghi.localhost.com",
                  "Active",
                  "2 weeks ago"
                ],
                [
                  "jkl@localhost.com",
                  "+1 78945623",
                  "Overland Park",
                  "http://jkl.localhost.com",
                  "Active",
                  "2 weeks ago"
                ],
                [
                  "mnop@localhost.com",
                  "+1 78945623",
                  "Feldkirchen in Kärnten",
                  "http://mnop.localhost.com",
                  "Active",
                  "2 weeks ago"
                ]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(WebsiteList);
