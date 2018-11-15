import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "system-admin/agency/list",
    component: asyncComponent(() => import("../../Admin/Agency/List"))
  },
  {
    path: "agency/list",
    component: asyncComponent(() => import("../../Admin/Agency/List"))
  },
  {
    path: "agency/create",
    component: asyncComponent(() => import("../../Admin/Agency/Create"))
  },
  {
    path: "agency/edit/:id",
    component: asyncComponent(() => import("../../Admin/Agency/Edit"))
  },
  {
    path: "agency/users/:agencyId/team",
    component: asyncComponent(() => import("../../Admin/Agency/users/List"))
  },
  {
    path: "agency/teams/:agencyId",
    component: asyncComponent(() => import("../../Admin/Agency/Teams/List"))
  },
  {
    path: "agency/teams/:agencyId/edit",
    component: asyncComponent(() => import("../../Admin/Agency/Teams/Edit"))
  },
  {
    path: "agency/teams-create/:agencyId",
    component: asyncComponent(() => import("../../Admin/Agency/Teams/Create"))
  },
  {
    path: "agency/users-create/:agencyId",
    component: asyncComponent(() => import("../../Admin/Agency/users/Create"))
  },

  {
    path: "agency/test-manager",
    component: asyncComponent(() =>
      import("../../Admin/Agency/TestManager/List")
    )
  },
  {
    path: "agency/test-manager/test-case",
    component: asyncComponent(() =>
      import("../../Admin/Agency/TestManager/TestCaseScreen")
    )
  },
  {
    path: "agency/test-manager/available-tests",
    component: asyncComponent(() =>
      import("../../Admin/Agency/TestManager/TestQueues/AvailableTests")
    )
  },
  {
    path: "agency/test-manager/assigned-tests",
    component: asyncComponent(() =>
      import("../../Admin/Agency/TestManager/TestQueues/AssignedTests")
    )
  }
];
