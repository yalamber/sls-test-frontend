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
  {
    path: "test-queues/complete-tests",
    component: asyncComponent(() => import("../../Admin/TestQueues/CompletedTests.jsx"))
  },
  {
    path: "test-queues/complete-tests/edit/:id",
    component: asyncComponent(() => import("../../Admin/TestQueues/CompletedTestEdit.jsx"))
  },
]
