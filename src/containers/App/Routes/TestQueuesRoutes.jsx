import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "test-queues/available-tests",
    component: asyncComponent(() => import("../../Admin/TestQueues/AvailableTests"))
  },
  {
    path: "test-queues/assigned-tests",
    component: asyncComponent(() => import("../../Admin/TestQueues/AssignedTests.jsx"))
  },
]