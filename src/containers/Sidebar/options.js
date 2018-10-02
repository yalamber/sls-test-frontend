const options = [
  {
    key: "companies",
    label: "Software Company",
    leftIcon: "ion-briefcase",
    children: [
      {
        key: 'company/list',
        label: 'List All',
      },
      {
        key: 'company/create',
        label: 'Create Company',
      },
      {
        key: 'company/teams/create',
        label: 'Create Team',
      },
      {
        key: 'company/users/create',
        label: 'Create User',
      },
    ]
  },
  {
    key: "Testing-Providers",
    label: "Testing Providers",
    leftIcon: "ion-android-contacts",
    children: [
      {
        key: 'providers/teams',
        label: 'List All',
      },
      {
        key: 'providers/teams/create',
        label: 'Create Team',
      },
      {
        key: 'providers/users/create',
        label: 'Create User',
      }
    ]
  },
  {
    key: "dashboard",
    label: "Dashboards",
    leftIcon: "ion-grid",
    children: [
      {
        key: 'dashboards/list',
        label: 'List All',
      },
      {
        key: 'dashboards/create',
        label: 'Add New',
      }
    ]
  },
  {
    key: "test",
    label: "Test Manager",
    leftIcon: "ion-settings",
    children: [
      {
        key: 'test-manager/run',
        label: 'Test Run',
      },
      {
        key: 'test-manager/suite',
        label: 'Test Suite',
      },
      {
        key: 'test-manager/cases',
        label: 'Test Cases',
      }
    ]
  }
];
export default options;
