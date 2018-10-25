import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "test-queues/available-tests",
    component: asyncComponent(() => import("../../Admin/TestQueues/AvailableTests"))
  },
  {
    path: "test-queues/active-tests",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/Create"))
  },
  {
    path: "test-queues/completed-tests",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/Create"))
  },
  {
    path: "test-queues/reports",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/Create"))
  },
]