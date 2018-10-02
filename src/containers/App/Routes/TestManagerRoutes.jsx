import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "test-manager/suite/list",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/List"))
  },
  {
    path: "test-manager/suite/create/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/Create"))
  },

  {
    path: "test-manager/cases/list",
    component: asyncComponent(() => import("../../Admin/TestManager/TestCases/List"))
  },
  {
    path: "test-manager/cases/create/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/TestManager/TestCases/Create"))
  },
]