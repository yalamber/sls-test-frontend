import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "test-manager/suite",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/List"))
  },
]