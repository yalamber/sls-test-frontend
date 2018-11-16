import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "company/list",
    component: asyncComponent(() => import("../../Modules/Companies/companies/List"))
  },
  {
    path: "company/details/:id",
    component: asyncComponent(() => import("../../Modules/Companies/companies/CompanyDetails"))
  },
  {
    path: "company/create",
    component: asyncComponent(() => import("../../Modules/Companies/companies/Create"))
  },
  {
    path: "company/edit/:id",
    component: asyncComponent(() => import("../../Modules/Companies/companies/Edit"))
  },
  {
    path: "company/teams",
    component: asyncComponent(() => import("../../Modules/Companies/teams/List"))
  },
  {
    path: "company/team/:id/create",
    component: asyncComponent(() => import("../../Modules/Companies/teams/Create"))
  },
  {
    path: "company/teams/edit/:id",
    component: asyncComponent(() => import("../../Modules/Companies/teams/Edit"))
  },
  {
    path: "company/user/create",
    exact: true,
    component: asyncComponent(() => import("../../Modules/Companies/users/Create"))
  },
  {
    path: "company/user/:companyId/edit/:userId",
    component: asyncComponent(() => import("../../Modules/Companies/users/Edit"))
  },
  {
    path: "company/users/:companyId?/team/:teamId?",
    component: asyncComponent(() => import("../../Modules/Companies/users/List"))
  },

  /* test manager */
  {
    path: "company/test-manager",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/List"))
  },
]
