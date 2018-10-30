const options = [
  {
    key: "companies",
    label: "sidebar.softwareCompany",
    leftIcon: "ion-briefcase",
    children: [
      {
        key: 'company/list',
        label: 'sidebar.company.companies',
      },
      {
        key: 'company/teams',
        label: 'sidebar.company.teams',
      },
      {
        key: 'company/users',
        label: 'sidebar.company.users',
      },
    ]
  },
  {
    key: "Testing-Providers",
    label: "sidebar.testingProviders",
    leftIcon: "ion-android-contacts",
    children: [
      {
        key: 'providers/teams',
        label: 'sidebar.provider.teams',
      },
      {
        key: 'providers/teams/team-members',
        label: 'sidebar.provider.users',
      }
    ]
  },
  {
    key: "dashboard",
    label: "sidebar.Dashboards",
    leftIcon: "ion-grid",
    children: [
      {
        key: 'dashboards/list',
        label: 'sidebar.listAll',
      },
      {
        key: 'dashboards/create',
        label: 'sidebar.addNew',
      }
    ]
  },
  {
    key: "test",
    label: "sidebar.testManager",
    leftIcon: "ion-settings",
    children: [
      {
        key: 'test-manager/queues',
        label: 'sidebar.testManager.manageQueues',
      },
      {
        key: 'test-manager/runs/list',
        label: 'sidebar.testRun',
      },
      {
        key: 'test-manager/suite/list',
        label: 'sidebar.testSuite',
      },
      {
        key: 'test-manager/cases/list',
        label: 'sidebar.testCases',
      }
    ]
  },
  {
    key: "testQueues",
    label: "sidebar.testQueues",
    leftIcon: "ion-ios-browsers-outline",
    children: [
      {
        key: 'test-queues/available-tests',
        label: 'sidebar.testQueues.availableTests',
      },
      {
        key: 'test-queues/assigned-tests',
        label: 'sidebar.testQueues.activeTests',
      },
      {
        key: 'test-queues/complete-tests',
        label: 'sidebar.testQueues.completeTests',
      },
      {
        key: 'test-queues/reports',
        label: 'sidebar.testQueues.reports',
      }
    ]
  }
];
export default options;
