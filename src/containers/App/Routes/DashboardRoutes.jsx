import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "dashboards/list",
    component: asyncComponent(() => import("../../Admin/Dashboard/List"))
  }
]