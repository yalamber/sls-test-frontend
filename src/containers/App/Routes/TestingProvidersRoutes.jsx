import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "providers/teams",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/List"))
  },
  {
    path: "providers/users/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/Create"))
  },
  {
    path: "providers/teams/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/Create"))
  },
  {
    path: "providers/teams/:id/team-members",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/List"))
  },
]