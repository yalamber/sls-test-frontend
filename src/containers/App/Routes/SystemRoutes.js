import asyncComponent from '../../../helpers/AsyncFunc';

export default [
  {
    path: '',
    component: asyncComponent( () => import('../../Page/dashboard'))
  },
  {
    path: 'agencies',
    component: asyncComponent(() => import('../../Modules/Agency/List'))
  },
  {
    path: 'agency/create',
    component: asyncComponent(() => import('../../Modules/Agency/Create'))
  },
  {
    path: 'agency/edit/:id',
    component: asyncComponent(() => import('../../Modules/Agency/Edit'))
  },
  {
    path: 'agency/users/:agencyId',
    component: asyncComponent(() => import('../../Modules/Agency/users/List'))
  },
  {
    path: 'agency/teams/:agencyId',
    component: asyncComponent(() => import('../../Modules/Agency/Teams/List'))
  },
  {
    path: 'agency/teams/:teamId/members',
    component: asyncComponent(() => import('../../Modules/Agency/Teams/members/List'))
  },
  {
    path: 'agency/teams/:agencyId/edit',
    component: asyncComponent(() => import('../../Modules/Agency/Teams/Edit'))
  },
  {
    path: 'agency/team/:agencyId/create',
    component: asyncComponent(() => import('../../Modules/Agency/Teams/Create'))
  },
  {
    path: 'agency/user/create/:agencyId',
    component: asyncComponent(() => import('../../Modules/Agency/users/CreateOrEdit'))
  },
  {
    path: 'agency/user/:agencyId/edit/:userId',
    component: asyncComponent(() => import('../../Modules/Companies/users/CreateOrEdit'))
  },
  {
    path: 'agency/teams/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('../../Modules/Agency/Teams/members/MemberCreateEdit'))
  },
  {
    path: 'agency/test-manager',
    component: asyncComponent(() =>
      import('../../Modules/Agency/TestManager/List')
    )
  },
  {
    path: 'agency/test-manager/test-case',
    component: asyncComponent(() =>
      import('../../Modules/Agency/TestManager/TestCaseScreen')
    )
  },
  {
    path: 'agency/test-manager/:agencyId/available-tests',
    component: asyncComponent(() =>
      import('../../Modules/Agency/TestManager/TestQueues/AvailableTests')
    )
  },
  {
    path: 'agency/test-manager/:agencyId/assigned-tests',
    component: asyncComponent(() =>
      import('../../Modules/Agency/TestManager/TestQueues/AssignedTests')
    )
  },
  //company list
  {
    path: 'companies',
    component: asyncComponent(() => import('../../Modules/Companies/companies/List'))
  },
  {
    path: 'company/teams/:companyId',
    component: asyncComponent(() => import('../../Modules/Companies/companies/CompanyTeams'))
  },
  {
    path: 'company/create',
    component: asyncComponent(() => import('../../Modules/Companies/companies/Create'))
  },
  {
    path: 'company/edit/:id',
    component: asyncComponent(() => import('../../Modules/Companies/companies/Edit'))
  },
  {
    path: 'company/teams',
    component: asyncComponent(() => import('../../Modules/Companies/teams/List'))
  },
  {
    path: 'company/team/:id/create',
    component: asyncComponent(() => import('../../Modules/Companies/teams/Create'))
  },
  {
    path: 'company/teams/edit/:id',
    component: asyncComponent(() => import('../../Modules/Companies/teams/Edit'))
  },
  {
    path: 'company/teams/:teamId/members',
    component: asyncComponent(() => import('../../Modules/Companies/teams/members/List'))
  },
  {
    path: 'company/user/create/:companyId',
    exact: true,
    component: asyncComponent(() => import('../../Modules/Companies/users/CreateOrEdit'))
  },
  {
    path: 'company/teams/:teamId/member/add',
    exact: true,
    component: asyncComponent(() => import('../../Modules/Companies/teams/members/MemberCreateEdit'))
  },
  {
    path: 'company/user/:companyId/edit/:userId',
    component: asyncComponent(() => import('../../Modules/Companies/users/CreateOrEdit'))
  },
  {
    path: 'company/users/:companyId',
    component: asyncComponent(() => import('../../Modules/Companies/users/List'))
  },

  /* test manager */
  {
    path: 'company/test-manager',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/List'))
  },

  /* test manager -> Test Case */
  {
    path: 'company/:companyId/test-manager/test-case/list',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestCases/List'))
  },
  {
    path: 'company/:companyId/test-manager/test-case/create/:suiteId',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestCases/Create'))
  },

  /* test manager -> Test Suite */
  {
    path: 'company/:companyId/test-manager/suite/create/:teamId',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestSuite/Create'))
  },
  {
    path: 'company/:companyId/test-manager/',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestSuite/List'))
  },

  /* test manager -> Test Run */
  {
    path: 'company/:companyId/test-manager/test-run',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestRun/List'))
  },
  {
    path: 'company/:companyId/test-manager/test-run/create',
    component: asyncComponent(() => import('../../Modules/Companies/TestManager/TestRun/Create'))
  },
  //Roles
  {
    path: "roles",
    component: asyncComponent(() => import("../../Modules/Roles/List.jsx"))
  },
  {
    path: "role/create",
    component: asyncComponent(() => import("../../Modules/Roles/CreateOrEdit.jsx"))
  },
  {
    path: "role/edit",
    component: asyncComponent(() => import("../../Modules/Roles/CreateOrEdit.jsx"))
  }
];
