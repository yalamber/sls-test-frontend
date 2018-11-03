import asyncComponent from "../../../helpers/AsyncFunc";

export default [
    {
        path: "agencies_list",
        component: asyncComponent(() => import("../../Admin/Agency/List.jsx"))
    }
]