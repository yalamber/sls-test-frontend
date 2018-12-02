import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "dashboards/list",
    component: asyncComponent(() => import("../../Modules/Dashboard/List"))
  },
  {
    path: "dashboards/create/:id?",
    component: asyncComponent(() => import("../../Modules/Dashboard/Create"))
  },
  {
    path: "dashboards/edit/:id?",
    component: asyncComponent(() => import("../../Modules/Dashboard/Edit"))
  },
]