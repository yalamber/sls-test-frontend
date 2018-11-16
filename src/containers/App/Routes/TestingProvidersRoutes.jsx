import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "providers/teams",
    component: asyncComponent(() => import("../../Modules/TestingProviders/Teams/List"))
  },
  {
    path: "providers/teams/create",
    component: asyncComponent(() => import("../../Modules/TestingProviders/Teams/Create"))
  },
  {
    path: "providers/teams/edit/:id",
    component: asyncComponent(() => import("../../Modules/TestingProviders/Teams/Edit"))
  },
  {
    path: "providers/users/create",
    component: asyncComponent(() => import("../../Modules/TestingProviders/TeamMembers/Create"))
  },
  {
    path: "providers/users/edit/:id",
    component: asyncComponent(() => import("../../Modules/TestingProviders/TeamMembers/Edit"))
  },
  {
    path: "providers/teams/team-members/:id?",
    component: asyncComponent(() => import("../../Modules/TestingProviders/TeamMembers/List"))
  },
]