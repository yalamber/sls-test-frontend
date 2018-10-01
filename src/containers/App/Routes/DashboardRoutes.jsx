import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "dashboards/list",
    component: asyncComponent(() => import("../../Admin/Dashboard/List"))
  },
  {
    path: "dashboards/create/:id?",
    component: asyncComponent(() => import("../../Admin/Dashboard/Create"))
  },
]