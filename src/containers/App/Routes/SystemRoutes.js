import asyncComponent from '@helpers/AsyncFunc';

export default [
  {
    path: '',
    component: asyncComponent( () => import('@page/dashboard'))
  },
  {
    path: 'agencies',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/List'))
  },
  {
    path: 'agency/create',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Create'))
  },
  {
    path: 'agency/edit/:id',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Edit'))
  },
  {
    path: 'agency/Users/:agencyId',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Users/List'))
  },
  {
    path: 'agency/teams/:agencyId',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Teams/List'))
  },
  {
    path: 'agency/teams/:teamId/members',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Teams/Members/List'))
  },
  {
    path: 'agency/teams/:agencyId/edit',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Teams/Edit'))
  },
  {
    path: 'agency/team/:agencyId/create',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Teams/Create'))
  },
  {
    path: 'agency/user/create/:agencyId',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Users/CreateEdit'))
  },
  {
    path: 'agency/user/:agencyId/edit/:userId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Users/CreateEdit'))
  },
  {
    path: 'agency/teams/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('@app/SystemApp/Agencies/Teams/Members/CreateEdit'))
  },
  {
    path: 'agency/test-manager',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/TestManager/List'))
  },
  {
    path: 'agency/test-manager/test-case',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/TestManager/TestCaseScreen'))
  },
  {
    path: 'agency/test-manager/:agencyId/available-tests',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/TestManager/TestQueues/AvailableTests'))
  },
  {
    path: 'agency/test-manager/:agencyId/assigned-tests',
    component: asyncComponent(() => import('@app/SystemApp/Agencies/TestManager/TestQueues/AssignedTests'))
  },
  //company list
  {
    path: 'companies',
    component: asyncComponent(() => import('@app/SystemApp/Companies/List'))
  },
  {
    path: 'company/create',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Create'))
  },
  {
    path: 'company/edit/:companyId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Edit'))
  },
  {
    path: 'company/teams/:companyId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Teams/List'))
  },
  {
    path: 'company/team/:companyId/create',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Teams/Create'))
  },
  {
    path: 'company/teams/edit/:teamId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Teams/Edit'))
  },
  {
    path: 'company/teams/:teamId/members',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Teams/Members/List'))
  },
  {
    path: 'company/user/create/:companyId',
    exact: true,
    component: asyncComponent(() => import('@app/SystemApp/Companies/Users/CreateEdit'))
  },
  {
    path: 'company/teams/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('@app/SystemApp/Companies/Teams/Members/CreateEdit'))
  },
  {
    path: 'company/user/:companyId/edit/:userId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Users/CreateEdit'))
  },
  {
    path: 'company/Users/:companyId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/Users/List'))
  },

  /* test manager */
  {
    path: 'company/test-manager',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/List'))
  },

  /* test manager -> Test Case */
  {
    path: 'company/:companyId/test-manager/test-case/list',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestCases/List'))
  },
  {
    path: 'company/:companyId/test-manager/test-case/create/:suiteId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestCases/Create'))
  },

  /* test manager -> Test Suite */
  {
    path: 'company/:companyId/test-manager/suite/create/:teamId',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestSuite/Create'))
  },
  {
    path: 'company/:companyId/test-manager/',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestSuite/List'))
  },

  /* test manager -> Test Run */
  {
    path: 'company/:companyId/test-manager/test-run',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestRun/List'))
  },
  {
    path: 'company/:companyId/test-manager/test-run/create',
    component: asyncComponent(() => import('@app/SystemApp/Companies/TestManager/TestRun/Create'))
  },
  //Roles
  {
    path: "roles",
    component: asyncComponent(() => import("@app/SystemApp/Roles/List.jsx"))
  },
  {
    path: "role/create",
    component: asyncComponent(() => import("@app/SystemApp/Roles/CreateEdit.jsx"))
  },
  {
    path: "role/edit",
    component: asyncComponent(() => import("@app/SystemApp/Roles/CreateEdit.jsx"))
  }
];
