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
    path: "agency/test-manager",
    component: asyncComponent(() => import("../../Admin/Agency/TestManager/List"))
  },
  {
    path: "agency/test-manager/create",
    component: asyncComponent(() => import("../../Admin/Agency/Create"))
  },
  {
    path: "agency/test-manager/test-case",
    component: asyncComponent(() => import("../../Admin/Agency/TestManager/TestCaseScreen"))
  }
];
