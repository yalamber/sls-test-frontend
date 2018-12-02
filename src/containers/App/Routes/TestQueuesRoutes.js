import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "test-queues/available-tests",
    component: asyncComponent(() => import("../../Modules/TestQueues/AvailableTests"))
  },
  {
    path: "test-queues/assigned-tests",
    component: asyncComponent(() => import("../../Modules/TestQueues/AssignedTests.jsx"))
  },
  {
    path: "test-queues/assigned-test",
    component: asyncComponent(() => import("../../Modules/TestQueues/TestCaseScreen"))
  },
  {
    path: "test-queues/complete-tests",
    component: asyncComponent(() => import("../../Modules/TestQueues/CompletedTests.jsx"))
  },
  {
    path: "test-queues/complete-tests/edit/:id",
    component: asyncComponent(() => import("../../Modules/TestQueues/CompletedTestEdit.jsx"))
  },
]
