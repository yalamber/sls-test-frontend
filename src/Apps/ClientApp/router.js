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
    component: asyncComponent(() => import(`./containers/Teams/CreateEdit`))
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
  {
    path: 'test-manager/test-suites',
    component: asyncComponent(() => import('./containers/TestManager/TestSuite/List'))
  },
  {
    path: 'team/:teamId/test-manager/test-suite/create',
    component: asyncComponent(() => import('./containers/TestManager/TestSuite/CreateEdit'))
  },
  {
    path: 'test-manager/test-suite/:suiteId/details',
    component: asyncComponent(() => import('./containers/TestManager/TestSuite/Detail'))
  },
  {
    path: 'test-manager/test-suite/:suiteId/edit',
    component: asyncComponent(() => import('./containers/TestManager/TestSuite/CreateEdit'))
  },
  
  /* test manager -> Test Case */
  {
    path: 'test-manager/test-cases',
    component: asyncComponent(() => import('./containers/TestManager/TestCase/List'))
  },
  {
    path: 'test-manager/test-suite/:suiteId/test-case/create',
    component: asyncComponent(() => import('./containers/TestManager/TestCase/CreateEdit'))
  },
  {
    path: 'test-manager/test-case/:caseId/edit',
    component: asyncComponent(() => import('./containers/TestManager/TestCase/CreateEdit'))
  },
  {
    path: 'test-manager/test-case/:caseId/details',
    component: asyncComponent(() => import('./containers/TestManager/TestCase/Detail'))
  },

  /* test manager -> Test Run */
  {
    path: 'test-manager/test-run',
    component: asyncComponent(() => import('./containers/TestManager/TestRun/List'))
  },
  {
    path: 'test-manager/test-run/:runId/details',
    component: asyncComponent(() => import('./containers/TestManager/TestRun/Detail'))
  },
  /* test manager -> Test Queue */
  {
    path: 'test-manager/test-queue',
    component: asyncComponent(() => import('./containers/TestManager/TestQueue/List'))
  },
  {
    path: "*",
    component: asyncComponent( () => import('@page/Common/404'))
  }
];