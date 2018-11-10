import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "system-admin-company",
    component: asyncComponent(() => import("../../Admin/Companies/companies/List"))
  },
  {
    path: "system-admin-company/list",
    component: asyncComponent(() => import("../../Admin/Companies/companies/List"))
  },
  {
    path: "system-admin-company/details/:id",
    component: asyncComponent(() => import("../../Admin/Companies/companies/CompanyDetails"))
  },
  {
    path: "system-admin-company/create",
    component: asyncComponent(() => import("../../Admin/Companies/companies/Create"))
  },
  {
    path: "system-admin-company/edit/:id",
    component: asyncComponent(() => import("../../Admin/Companies/companies/Edit"))
  },
  {
    path: "system-admin-company/teams",
    component: asyncComponent(() => import("../../Admin/Companies/teams/List"))
  },
  {
    path: "system-admin-company/teams/create/:id?",
    component: asyncComponent(() => import("../../Admin/Companies/teams/Create"))
  },
  {
    path: "system-admin-company/teams/edit/:id",
    component: asyncComponent(() => import("../../Admin/Companies/teams/Edit"))
  },
  {
    path: "system-admin-company/user/create",
    exact: true,
    component: asyncComponent(() => import("../../Admin/Companies/users/Create"))
  },
  {
    path: "system-admin-company/users/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/Companies/users/List"))
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
    path: "company/user/create",
    exact: true,
    component: asyncComponent(() => import("../../Admin/Companies/users/Create"))
  },
  {
    path: "company/users/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/Companies/users/List"))
  },

  /* test manager */
  {
    path: "company/test-manager",
    component: asyncComponent(() => import("../../Admin/Companies/TestManager/List"))
  },
]
