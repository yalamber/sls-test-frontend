import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "company/list",
    component: asyncComponent(() => import("../../Admin/Companies/List"))
  },
  {
    path: "company/details/:id",
    component: asyncComponent(() => import("../../Admin/Companies/CompanyDetails"))
  },
  {
    path: "company/create",
    component: asyncComponent(() => import("../../Admin/Companies/Create"))
  },
  {
    path: "company/teams/create/:id?",
    component: asyncComponent(() => import("../../Admin/Companies/teams/Create"))
  },
  {
    path: "company/users/create",
    component: asyncComponent(() => import("../../Admin/Companies/users/Create"))
  },
]