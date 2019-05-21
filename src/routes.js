// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Language from "@material-ui/icons/Language";
import Person from "@material-ui/icons/Person";
import Event from "@material-ui/icons/Event";
import DeviceHub from "@material-ui/icons/DeviceHub";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard";
import Template from "./views/Template/Template";
import appController from "./controller/controller";
import Event1 from "./views/Shooju/Event1";
import AffiliateRegister from "./views/Affiliate/AffiliateRegister";
import AffiliateList from "./views/AffiliateList/AffiliateList";
import UserTemplate from "./views/Template/userTemplate";
import Blogs from "./views/AffilateBlogs/Blogs";
import Chapters from "./views/Chapters/Chapters";
import Events from "./views/Events/Events";
import ContentManager from "./views/Shooju/ContentManager";
import ContentManagerView from "./views/Shooju/ContentManagerView";
import ContentManagerAdd from "./views/Shooju/ContentManagerAdd";
import CreateContentManager from "./views/Shooju/CreateContentManager";

var id_token = localStorage.getItem("idToken");
let dashboardRoutes = [];
if (id_token == null) {
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
      icon: DeviceHub,
      component: UserTemplate,
      layout: "/admin"
    },
    // {
    //   path: "/event1",
    //   name: "Event",
    //   icon: Event,
    //   component: Events,
    //   layout: "/admin"
    // },
    // {
    //   path: "/Blogs",
    //   name: "Blogs",
    //   icon: Event,
    //   component: Blogs,
    //   layout: "/admin"
    // },
    {
      path: "/content-manager-create",
      name: "Create Content Manager",
      icon: Language,
      component: CreateContentManager,
      layout: "/admin"
    },
    {
      path: "/content-manager",
      name: "Content Manager",
      icon: Language,
      component: ContentManager,
      layout: "/admin"
    },
    {
      path: "/content/view/:model",
      name: "Content Manager View",
      icon: Language,
      component: ContentManagerView,
      layout: "/admin"
    },
    {
      path: "/content/add/:model",
      name: "Content Manager Add",
      icon: Language,
      component: ContentManagerAdd,
      layout: "/admin"
    }
  ];
} else {
  let userDetails;
  if (id_token != null) {
    userDetails = appController.getUser(id_token);
  } else {
    userDetails = appController.getAffilateTokens();
  }
  console.log(userDetails);
  if (userDetails.userType == "parent") {
    dashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
      },
      ,
      {
        path: "/Chapters",
        name: "Chapters",
        icon: Person,
        component: Chapters,
        layout: "/admin"
      },
      // {
      //   path: "/affiliate_list",
      //   name: "Affiliates",
      //   icon: Person,
      //   component: AffiliateList,
      //   layout: "/admin"
      // },
      {
        path: "/template",
        name: "Template",
        icon: Language,
        component: Template,
        layout: "/admin"
      },
      {
        path: "/reg_affiliate",
        name: "Create Affiliate",
        icon: Person,
        component: AffiliateRegister,
        layout: "/admin"
      },
      // {
      //   path: "/content-manager",
      //   name: "Content Manager",
      //   icon: Language,
      //   component: ContentManager,
      //   layout: "/admin"
      // },
      {
        path: "/content/view/:model",
        name: "Content Manager View",
        icon: Language,
        component: ContentManagerView,
        layout: "/admin"
      },
      {
        path: "/content/add/:model",
        name: "Content Manager Add",
        icon: Language,
        component: ContentManagerAdd,
        layout: "/admin"
      }
    ];
  } else if (userDetails.userType == "affilate") {
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
        icon: DeviceHub,
        component: UserTemplate,
        layout: "/admin"
      },
      // {
      //   path: "/event1",
      //   name: "Event",
      //   icon: Event,
      //   component: Events,
      //   layout: "/admin"
      // },
      // {
      //   path: "/Blogs",
      //   name: "Blogs",
      //   icon: Event,
      //   component: Blogs,
      //   layout: "/admin"
      // },
      {
        path: "/content-manager-create",
        name: "Create Content Manager",
        icon: Language,
        component: CreateContentManager,
        layout: "/admin"
      },
      {
        path: "/content-manager",
        name: "Content Manager",
        icon: Language,
        component: ContentManager,
        layout: "/admin"
      },
      {
        path: "/content/view/:model",
        name: "Content Manager View",
        icon: Language,
        component: ContentManagerView,
        layout: "/admin"
      },
      {
        path: "/content/add/:model",
        name: "Content Manager Add",
        icon: Language,
        component: ContentManagerAdd,
        layout: "/admin"
      }
    ];
  }
}

export default dashboardRoutes;
