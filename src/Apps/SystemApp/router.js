import asyncComponent from '@helpers/AsyncFunc';

const routes = [
  {
    path: '/',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  //agencies
  {
    path: 'agencies',
    component: asyncComponent(() => import('./containers/Agencies/List'))
  },
  {
    path: 'agency/create',
    component: asyncComponent(() => import('./containers/Agencies/CreateEdit'))
  },
  {
    path: 'agency/:agencyId/edit',
    component: asyncComponent(() => import('./containers/Agencies/CreateEdit'))
  },
  {
    path: 'agency/:agencyId/details',
    component: asyncComponent(() => import('./containers/Agencies/Detail'))
  },
  //client users
  {
    path: 'agency/:agencyId/users',
    component: asyncComponent(() => import('./containers/Agencies/Users/List'))
  },
  {
    path: 'agency/:agencyId/user/create',
    exact: true,
    component: asyncComponent(() => import('./containers/Clients/Users/CreateEdit'))
  },
  {
    path: 'agency/:agencyId/user/:userId/edit',
    exact: true,
    component: asyncComponent(() => import('./containers/Agencies/Users/CreateEdit'))
  },
  {
    path: 'agency/:agencyId/user/:userId/details',
    exact: true,
    component: asyncComponent(() => import('./containers/Agencies/Users/Detail'))
  },
  //agency teams
  {
    path: 'agency/:agencyId/teams',
    component: asyncComponent(() => import('./containers/Agencies/Teams/List'))
  },
  {
    path: 'agency/:agencyId/team/create',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Create'))
  },
  {
    path: 'agency/team/:teamId/edit',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Edit'))
  },
  {
    path: 'agency/team/:teamId/details',
    component: asyncComponent(() => import('./containers/Clients/Teams/Edit'))
  },
  {
    path: 'agency/team/:teamId/members',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/List'))
  },
  {
    path: 'agency/team/:teamId/member/add',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/CreateEdit'))
  },
  {
    path: 'agency/team/:teamId/member/:userId/edit',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/CreateEdit'))
  },
  {
    path: 'agency/team/:teamId/member/:userId/details',
    component: asyncComponent(() => import('./containers/Agencies/Teams/Members/Detail'))
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
  //////////////////////clients//////////////////////////////////////////////////////////////////////////
  {
    path: 'clients',
    component: asyncComponent(() => import('./containers/Clients/List'))
  },
  {
    path: 'client/create',
    component: asyncComponent(() => import('./containers/Clients/CreateEdit'))
  },
  {
    path: 'client/:clientId/edit',
    component: asyncComponent(() => import('./containers/Clients/CreateEdit'))
  },
  {
    path: 'client/:clientId/details',
    component: asyncComponent(() => import('./containers/Clients/Detail'))
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
    path: 'client/team/:teamId/edit',
    component: asyncComponent(() => import('./containers/Clients/Teams/Edit'))
  },
  {
    path: 'client/team/:teamId/details',
    component: asyncComponent(() => import('./containers/Clients/Teams/Edit'))
  },
  {
    path: 'client/team/:teamId/members',
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/List'))
  },
  {
    path: 'client/team/:teamId/member/add',
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/CreateEdit'))
  },
  {
    path: 'client/team/:teamId/member/:userId/edit',
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/CreateEdit'))
  },
  {
    path: 'client/team/:teamId/member/:userId/details',
    component: asyncComponent(() => import('./containers/Clients/Teams/Members/Detail'))
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
    component: asyncComponent(() => import("./containers/SystemUsers/List.jsx"))
  },
  {
    path: "user/create",
    component: asyncComponent(() => import("./containers/SystemUsers/CreateEdit.jsx"))
  },
  {
    path: "user/:userId/edit",
    component: asyncComponent(() => import("./containers/SystemUsers/CreateEdit.jsx"))
  }
];

export default routes;
