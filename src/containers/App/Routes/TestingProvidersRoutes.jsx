import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "testing-providers/teams",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/List"))
  },
  {
    path: "testing-providers/users/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/Create"))
  },
  {
    path: "testing-providers/teams/create",
    component: asyncComponent(() => import("../../Admin/TestingProviders/Teams/Create"))
  },
  {
    path: "testing-providers/teams/:id/team-members",
    component: asyncComponent(() => import("../../Admin/TestingProviders/TeamMembers/List"))
  },
]