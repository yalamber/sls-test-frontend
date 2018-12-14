import asyncComponent from "@helpers/AsyncFunc";

export default [
  {
    path: '',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  {
    path: '/teams',
    component: asyncComponent( () => import('./containers/Teams/List'))
  },
  {
    path: '/test-manager/test-suite',
    component: asyncComponent( () => import('./containers/TestManager/TestSuite/List'))
  },
  {
    path: '/users',
    component: asyncComponent( () => import('./containers/Users/List'))
  },
  {
    path: "*",
    component: asyncComponent( () => import('@page/Common/404'))
  }
];