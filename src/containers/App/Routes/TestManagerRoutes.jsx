import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  //Suite
  {
    path: "test-manager/suite/list/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/List"))
  },
  {
    path: "test-manager/suite/create/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/TestManager/TestSuite/Create"))
  },

  //Cases
  {
    path: "test-manager/cases/list",
    component: asyncComponent(() => import("../../Admin/TestManager/TestCases/List"))
  },
  {
    path: "test-manager/cases/create/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Admin/TestManager/TestCases/Create"))
  },

  //Runs
  {
    path: "test-manager/runs/list",
    component: asyncComponent(() => import("../../Admin/TestManager/TestRun/List"))
  },

  //QueueManage
  {
    path: "test-manager/queues",
    component: asyncComponent(() => import("../../Admin/TestManager/ManageQueues/List"))
  },
]