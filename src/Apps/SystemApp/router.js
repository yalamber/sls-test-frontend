import asyncComponent from '@helpers/AsyncFunc';

function commonAgencyClientRoutes(type = 'agency') {
  let routeConfig = {
    plural: 'agencies',
    singular: 'agency',
    containerDirectory: 'Agencies'
  };
  if(type === 'client'){
    routeConfig = {
      plural: 'clients',
      singular: 'client',
      containerDirectory: 'Clients'
    };
  }
  return [
    {
      path: routeConfig.plural,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/List`))
    },
    {
      path: `${routeConfig.singular}/create`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/edit`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/details`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Detail`))
    },
    //client users
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/users`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Users/List`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/user/create`,
      exact: true,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Users/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/user/:userId/edit`,
      exact: true,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Users/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/user/:userId/details`,
      exact: true,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Users/Detail`))
    },
    //${routeConfig.singular} teams
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/teams`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/List`))
    },
    {
      path: `${routeConfig.singular}/:${routeConfig.singular}Id/team/create`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/edit`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/details`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/Detail`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/members`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/Members/List`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/member/add`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/Members/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/member/:userId/edit`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/Members/CreateEdit`))
    },
    {
      path: `${routeConfig.singular}/team/:teamId/member/:userId/details`,
      component: asyncComponent(() => import(`./containers/${routeConfig.containerDirectory}/Teams/Members/Detail`))
    }
  ];
}

const routes = [
  {
    path: '',
    component: asyncComponent( () => import('@page/Dashboard'))
  },
  //agencies
  ...commonAgencyClientRoutes('agency'),
  {
    path: 'agency/:agencyId/test-manager/completed-tests',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/CompletedTests'))
  },
  {
    path: 'agency/:agencyId/test-manager/assigned-tests',
    component: asyncComponent(() => import('./containers/Agencies/TestManager/AssignedTests'))
  },
  //clients
  ...commonAgencyClientRoutes('client'),
  //client test manager
  {
    path: 'client/:clientId/test-manager/test-suites',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/List'))
  },
  {
    path: 'client/team/:teamId/test-manager/test-suite/create',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/CreateEdit'))
  },
  {
    path: 'client/test-manager/test-suite/:suiteId/details',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/Detail'))
  },
  {
    path: 'client/test-manager/test-suite/:suiteId/edit',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestSuite/CreateEdit'))
  },
  
  /* test manager -> Test Case */
  {
    path: 'client/:clientId/test-manager/test-cases',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCase/List'))
  },
  {
    path: 'client/test-manager/test-suite/:suiteId/test-case/create',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCase/CreateEdit'))
  },
  {
    path: 'client/test-manager/test-case/:caseId/edit',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCase/CreateEdit'))
  },
  {
    path: 'client/test-manager/test-case/:caseId/details',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestCase/Detail'))
  },

  /* test manager -> Test Run */
  {
    path: 'client/:clientId/test-manager/test-run',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestRun/List'))
  },
  {
    path: 'client/test-manager/test-run/:runId/details',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestRun/Detail'))
  },
  /* test manager -> Test Queue */
  {
    path: 'client/:clientId/test-manager/test-queue',
    component: asyncComponent(() => import('./containers/Clients/TestManager/TestQueue/List'))
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
