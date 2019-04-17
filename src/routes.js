// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Language from "@material-ui/icons/Language";
import Person from "@material-ui/icons/Person";
import Event from "@material-ui/icons/Event";
import DeviceHub from "@material-ui/icons/DeviceHub";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard";
import WebsiteList from "./views/WebsiteList/WebsiteList";
import Template from "./views/Template/Template";
import appController from "./controller/controller";
import Parent from "./views/Shooju/Parent";
import Affiliate from "./views/Shooju/Affiliate";
import AffiliateT1 from "./views/Shooju/AffiliateT1";
import AffiliateT2 from "./views/Shooju/AffiliateT2";
import Event1 from "./views/Shooju/Event1";

var id_token = localStorage.getItem("idToken");
// console.log(id_token);
let dashboardRoutes = [];
if (id_token == null) {
  // console.log("if null");
} else {
  var userDetails = appController.getUser(id_token);
  // console.log(userDetails, "from route");
  if (userDetails.userType == "parent") {
    // console.log("check");
    dashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
      },
      {
        path: "/template",
        name: "Template",
        icon: Language,
        component: Template,
        layout: "/admin"
      },
      {
        path: "/site-meta",
        name: "Site Meta",
        icon: Language,
        component: WebsiteList,
        layout: "/admin"
      },
      {
        path: "/parent",
        name: "Parent",
        icon: Person,
        component: Parent,
        layout: "/admin"
      },
      {
        path: "/affiliate",
        name: "Affiliate",
        icon: DeviceHub,
        component: Affiliate,
        layout: "/admin"
      }
    ];
  } else if (userDetails.userType == "affilate") {
    // console.log("else if route");
    dashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
      },
      {
        path: "/1affiliate",
        name: "Affiliate T1",
        icon: DeviceHub,
        component: AffiliateT1,
        layout: "/admin"
      },
      {
        path: "/2affiliate",
        name: "Affiliate T2",
        icon: DeviceHub,
        component: AffiliateT2,
        layout: "/admin"
      },
      {
        path: "/event1",
        name: "Event 1",
        icon: Event,
        component: Event1,
        layout: "/admin"
      }
    ];
  }
}

export default dashboardRoutes;
