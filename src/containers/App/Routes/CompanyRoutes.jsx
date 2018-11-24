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

  /* test manager -> Test Case */
  {
    path: "company/:companyId/test-manager/test-case/list",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestCases/List"))
  },
  {
    path: "company/:companyId/test-manager/test-case/create/:suiteId",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestCases/Create"))
  },

  /* test manager -> Test Suite */
  {
    path: "company/:companyId/test-manager/suite/create/:teamId",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestSuite/Create"))
  },
  {
    path: "company/:companyId/test-manager/",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestSuite/List"))
  },

  /* test manager -> Test Run */
  {
    path: "company/:companyId/test-manager/test-run",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestRun/List"))
  },
  {
    path: "company/:companyId/test-manager/test-run/create",
    component: asyncComponent(() => import("../../Modules/Companies/TestManager/TestRun/Create"))
  },

]
