import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "",
    component: asyncComponent(() => import("../../dashboard"))
  },
  {
    path: "clients/list",
    component: asyncComponent(() => import("../../Admin/Clients/List"))
  },
  {
    path: "clients/create",
    component: asyncComponent(() => import("../../Admin/Clients/Create"))
  },
]