import asyncComponent from "../../../helpers/AsyncFunc";

export default [
    {
        path: "agency/list",
        component: asyncComponent(() => import("../../Admin/Agency/List"))
    },
    {
        path: "agency/create",
        component: asyncComponent(() => import("../../Admin/Agency/Create"))
    }
]