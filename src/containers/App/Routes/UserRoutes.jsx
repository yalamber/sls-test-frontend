import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "users/list",
    component: asyncComponent(() => import("../../Admin/Users/List"))
  },
  {
    path: "users/create",
    component: asyncComponent(() => import("../../Admin/Users/Create"))
  }
]