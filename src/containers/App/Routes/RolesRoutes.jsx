import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "roles/list",
    component: asyncComponent(() => import("../../Modules/Roles/List.jsx"))
  },
  {
    path: "roles/create",
    component: asyncComponent(() => import("../../Modules/Roles/Create.jsx"))
  },
  {
    path: "roles/edit",
    component: asyncComponent(() => import("../../Modules/Roles/Create.jsx"))
  }
];
