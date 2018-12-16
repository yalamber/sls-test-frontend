import asyncComponent from "@helpers/AsyncFunc";

export default [
  {
    path: '',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  //users
  {
    path: `users`,
    component: asyncComponent(() => import(`./containers/Users/List`))
  },
  {
    path: `user/create`,
    exact: true,
    component: asyncComponent(() => import(`./containers/Users/CreateEdit`))
  },
  {
    path: `user/:userId/edit`,
    exact: true,
    component: asyncComponent(() => import(`./containers/Users/CreateEdit`))
  },
  {
    path: `user/:userId/details`,
    exact: true,
    component: asyncComponent(() => import(`./containers/Users/Detail`))
  },
  //teams
  {
    path: `teams`,
    component: asyncComponent(() => import(`./containers/Teams/List`))
  },
  {
    path: `team/create`,
    component: asyncComponent(() => import(`./containers/Teams/CreateEdit`))
  },
  {
    path: `team/:teamId/edit`,
    component: asyncComponent(() => import(`./containers/Teams/CreateEdit`))
  },
  {
    path: `team/:teamId/details`,
    component: asyncComponent(() => import(`./containers/Teams/Detail`))
  },
  {
    path: `team/:teamId/members`,
    component: asyncComponent(() => import(`./containers/Teams/Members/List`))
  },
  {
    path: `team/:teamId/member/add`,
    component: asyncComponent(() => import(`./containers/Teams/Members/CreateEdit`))
  },
  {
    path: `team/:teamId/member/:userId/edit`,
    component: asyncComponent(() => import(`./containers/Teams/Members/CreateEdit`))
  },
  {
    path: `team/:teamId/member/:userId/details`,
    component: asyncComponent(() => import(`./containers/Teams/Members/Detail`))
  },
  /* test manager*/
  {
    path: 'test-manager/test-queue',
    component: asyncComponent(() => import('./containers/TestManager/TestQueue'))
  },
  {
    path: 'test-manager/assigned-tests',
    component: asyncComponent(() => import('./containers/TestManager/AssignedTests'))
  },
  {
    path: 'test-manager/completed-tests',
    component: asyncComponent(() => import('./containers/TestManager/CompletedTests'))
  },
  {
    path: "*",
    component: asyncComponent( () => import('@page/Common/404'))
  }
];