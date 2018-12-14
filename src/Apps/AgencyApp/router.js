import asyncComponent from "@helpers/AsyncFunc";

export default [
  {
    path: '',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  {
    path: "*",
    component: asyncComponent( () => import('@page/Common/404'))
  }
];