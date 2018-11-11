import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: "system-admin/edit-roles/list",
    component: asyncComponent(() => import("../../Admin/EditRoles/List.jsx"))
  },
  {
    path: "system-admin/edit-roles/create",
    component: asyncComponent(() => import("../../Admin/EditRoles/Create.jsx"))
  },
  {
    path: "system-admin/edit-roles/edit",
    component: asyncComponent(() => import("../../Admin/EditRoles/Create.jsx"))
  }
];
