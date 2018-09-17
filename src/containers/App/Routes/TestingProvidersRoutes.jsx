import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "testing-providers/teams",
    component: asyncComponent(() => import("../../Admin/TestingProviders/List"))
  },
  {
    path: "testing-providers/teams/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Create"))
  }
]