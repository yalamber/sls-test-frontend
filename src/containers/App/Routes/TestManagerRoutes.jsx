import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  //Suite deprecated by Company/TestManager/Suite
  // {
  //   path: "test-manager/suite/list/:companyId?/:teamId?",
  //   component: asyncComponent(() => import("../../Modules/TestManager/TestSuite/List"))
  // },
  // {
  //   path: "test-manager/suite/create/:companyId?/:teamId?",
  //   component: asyncComponent(() => import("../../Modules/TestManager/TestSuite/Create"))
  // },

  //Cases
  {
    path: "test-manager/cases/list",
    component: asyncComponent(() => import("../../Modules/TestManager/TestCases/List"))
  },
  {
    path: "test-manager/cases/create/:companyId?/:teamId?",
    component: asyncComponent(() => import("../../Modules/TestManager/TestCases/Create"))
  },

  //Runs
  {
    path: "test-manager/runs/list",
    component: asyncComponent(() => import("../../Modules/TestManager/TestRun/List"))
  },

  //QueueManage
  {
    path: "test-manager/queues",
    component: asyncComponent(() => import("../../Modules/TestManager/ManageQueues/List"))
  },
]
