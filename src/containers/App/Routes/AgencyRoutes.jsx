import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "agency/list",
    component: asyncComponent(() => import("../../Modules/Agency/List"))
  },
  {
    path: "agency/create",
    component: asyncComponent(() => import("../../Modules/Agency/Create"))
  },
  {
    path: "agency/edit/:id",
    component: asyncComponent(() => import("../../Modules/Agency/Edit"))
  },
  {
    path: "agency/users/:agencyId",
    component: asyncComponent(() => import("../../Modules/Agency/users/List"))
  },
  {
    path: "agency/teams/:agencyId",
    component: asyncComponent(() => import("../../Modules/Agency/Teams/List"))
  },
  {
    path: "agency/teams/:teamId/members",
    component: asyncComponent(() => import("../../Modules/Agency/Teams/members/List"))
  },
  {
    path: "agency/teams/:agencyId/edit",
    component: asyncComponent(() => import("../../Modules/Agency/Teams/Edit"))
  },
  {
    path: "agency/team/:agencyId/create",
    component: asyncComponent(() => import("../../Modules/Agency/Teams/Create"))
  },
  {
    path: "agency/user/create",
    component: asyncComponent(() => import("../../Modules/Agency/users/Create"))
  },
  {
    path: "agency/teams/:teamId/member/add",
    exact: true,
    component: asyncComponent(() => import("../../Modules/Agency/Teams/members/MemberCreateEdit"))
  },
  {
    path: "agency/test-manager",
    component: asyncComponent(() =>
      import("../../Modules/Agency/TestManager/List")
    )
  },
  {
    path: "agency/test-manager/test-case",
    component: asyncComponent(() =>
      import("../../Modules/Agency/TestManager/TestCaseScreen")
    )
  },
  {
    path: "agency/test-manager/available-tests",
    component: asyncComponent(() =>
      import("../../Modules/Agency/TestManager/TestQueues/AvailableTests")
    )
  },
  {
    path: "agency/test-manager/assigned-tests",
    component: asyncComponent(() =>
      import("../../Modules/Agency/TestManager/TestQueues/AssignedTests")
    )
  }
];
