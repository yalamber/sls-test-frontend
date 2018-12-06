import asyncComponent from '@helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  {
    path: 'agencies',
    component: asyncComponent(() => import('./containers/Agencies/List'))
  },
  {
    path: 'agency/create',
    component: asyncComponent(() => import('./containers/Agencies/Create'))
  },
  {
    path: 'agency/:id/edit',
    component: asyncComponent(() => import('./containers/Agencies/Edit'))
  },
  {
    path: 'agency/:agencyId/Users',
    component: asyncComponent(() => import('./containers/Agencies/Users/List'))
  },
  {
    path: 'agency/:agencyId/teams',
    component: asyncComponent(() => import('./containers/Agencies/Teams/List'))
  },
  {
    path: 'agency/teams/:teamId/members',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/List'))
  },
  {
    path: 'agency/teams/:agencyId/edit',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Edit'))
  },
  {
    path: 'agency/team/:agencyId/create',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Create'))
  },
  {
    path: 'agency/user/create/:agencyId',
    component: asyncComponent(() => import('./containers/Agencies/Users/CreateEdit'))
  },
  {
    path: 'agency/user/:agencyId/edit/:userId',
    component: asyncComponent(() => import('./containers/Clients/Users/CreateEdit'))
  },
  {
    path: 'agency/teams/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/CreateEdit'))
  },
  {
    path: 'agency/test-manager',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/List'))
  },
  {
    path: 'agency/test-manager/test-case',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/TestCaseScreen'))
  },
  {
    path: 'agency/test-manager/:agencyId/available-tests',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/TestQueues/AvailableTests'))
  },
  {
    path: 'agency/test-manager/:agencyId/assigned-tests',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/TestQueues/AssignedTests'))
  },
  //clients
  {
    path: 'clients',
    component: asyncComponent(() => import('./containers/Clients/List'))
  },
  {
    path: 'client/create',
    component: asyncComponent(() => import('./containers/Clients/Create'))
  },
  {
    path: 'client/:clientId/edit',
    component: asyncComponent(() => import('./containers/Clients/Edit'))
  },
  //client users
  {
    path: 'client/:clientId/users',
    component: asyncComponent(() => import('./containers/Clients/Users/List'))
  },
  {
    path: 'client/:clientId/user/create',
    exact: true,
    component: asyncComponent(() => import('./containers/Clients/Users/CreateEdit'))
  },
  {
    path: 'client/:clientId/user/:userId/edit',
    exact: true,
    component: asyncComponent(() => import('./containers/Clients/Users/CreateEdit'))
  },
  {
    path: 'client/:clientId/user/:userId/details',
    exact: true,
    component: asyncComponent(() => import('./containers/Clients/Users/Detail'))
  },
  //client teams
  {
    path: 'client/:clientId/teams',
    component: asyncComponent(() => import('./containers/Clients/Teams/List'))
  },
  {
    path: 'client/:clientId/team/create',
    component: asyncComponent(() => import('./containers/Clients/Teams/Create'))
  },
  {
    path: 'client/:clientId/team/:teamId/edit',
    component: asyncComponent(() => import('./containers/Clients/Teams/Edit'))
  },
  {
    path: 'client/:clientId/team/:teamId/members',
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/List'))
  },
  {
    path: 'client/:clientId/team/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/CreateEdit'))
  },

  /* test manager */
  {
    path: 'client/:clientId/test-manager/test-suite',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/List'))
  },
  {
    path: 'client/:clientId/test-manager/test-suite/create/:teamId',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/Create'))
  },

  /* test manager -> Test Case */
  {
    path: 'client/:clientId/test-manager/test-case',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCases/List'))
  },
  {
    path: 'client/:clientId/test-manager/test-case/create/:suiteId',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCases/Create'))
  },

  /* test manager -> Test Run */
  {
    path: 'client/:clientId/test-manager/test-run',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestRun/List'))
  },
  {
    path: 'client/:clientId/test-manager/test-run/create',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestRun/Create'))
  },
  //Roles
  {
    path: "roles",
    component: asyncComponent(() => import("./containers/Roles/List.jsx"))
  },
  {
    path: "role/create",
    component: asyncComponent(() => import("./containers/Roles/CreateEdit.jsx"))
  },
  {
    path: "role/:roleId/edit",
    component: asyncComponent(() => import("./containers/Roles/CreateEdit.jsx"))
  },
  //Users
  {
    path: "users",
    component: asyncComponent(() => import("./containers/Users/List.jsx"))
  },
  {
    path: "user/create",
    component: asyncComponent(() => import("./containers/Users/CreateEdit.jsx"))
  },
  {
    path: "user/:userId/edit",
    component: asyncComponent(() => import("./containers/Users/CreateEdit.jsx"))
  }
];

export default routes;
