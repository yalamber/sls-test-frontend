import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "clients/list",
    component: asyncComponent(() => import("../../Admin/Clients/List"))
  },
  {
    path: "clients/details/:id",
    component: asyncComponent(() => import("../../Admin/Clients/CompanyDetails"))
  },
  {
    path: "clients/create",
    component: asyncComponent(() => import("../../Admin/Clients/Create"))
  },
  {
    path: "clients/teams/create/:id?",
    component: asyncComponent(() => import("../../Admin/Clients/teams/Create"))
  },
  {
    path: "clients/users/create",
    component: asyncComponent(() => import("../../Admin/Clients/users/Create"))
  },
]