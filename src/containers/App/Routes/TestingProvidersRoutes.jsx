import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "providers/teams",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/List"))
  },
  {
    path: "providers/teams/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/Create"))
  },
  {
    path: "providers/teams/edit/:id",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/Edit"))
  },
  {
    path: "providers/users/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/Create"))
  },
  {
    path: "providers/teams/team-members/:id?",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/List"))
  },
]