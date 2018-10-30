import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "company/list",
    component: asyncComponent(() => import("../../Admin/Companies/companies/List"))
  },
  {
    path: "company/details/:id",
    component: asyncComponent(() => import("../../Admin/Companies/companies/CompanyDetails"))
  },
  {
    path: "company/create",
    component: asyncComponent(() => import("../../Admin/Companies/companies/Create"))
  },
  {
    path: "company/edit/:id",
    component: asyncComponent(() => import("../../Admin/Companies/companies/Edit"))
  },
  {
    path: "company/teams",
    component: asyncComponent(() => import("../../Admin/Companies/teams/List"))
  },
  {
    path: "company/teams/create/:id?",
    component: asyncComponent(() => import("../../Admin/Companies/teams/Create"))
  },
  {
    path: "company/teams/edit/:id",
    component: asyncComponent(() => import("../../Admin/Companies/teams/Edit"))
  },
  {
    path: "company/users/create",
    component: asyncComponent(() => import("../../Admin/Companies/users/Create"))
  },
  {
    path: "company/users",
    component: asyncComponent(() => import("../../Admin/Companies/users/List"))
  },
]