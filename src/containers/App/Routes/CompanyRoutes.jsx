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
    path: "company/teams/:companyId",
    component: asyncComponent(() => import("../../Modules/Companies/companies/CompanyTeams"))
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
    path: "company/teams/:teamId/members",
    component: asyncComponent(() => import("../../Modules/Companies/teams/members/List"))
  },
  {
    path: "company/user/create/:companyId",
    exact: true,
    component: asyncComponent(() => import("../../Modules/Companies/users/Create"))
  },
  {
    path: "company/teams/:teamId/member/add",
    exact: true,
    component: asyncComponent(() => import("../../Modules/Companies/teams/members/MemberCreateEdit"))
  },
  {
    path: "company/user/:companyId/edit/:userId",
    component: asyncComponent(() => import("../../Modules/Companies/users/Edit"))
  },
  {
    path: "company/users/:companyId",
    component: asyncComponent(() => import("../../Modules/Companies/users/List"))
  },

  /* test manager */
  {
    path: "company/test-manager",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/List"))
  },
  {
    path: "company/test-manager/suite/create/:companyId/:teamId",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestSuite/Create"))
  },
  {
    path: "company/test-manager/suite/list/:companyId/:teamId",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestSuite/List"))
  },
]
