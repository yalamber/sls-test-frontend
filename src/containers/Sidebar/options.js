const options = [
  {
    key: "companies",
    label: "Software Company",
    leftIcon: "ion-android-contacts",
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
    leftIcon: "ion-person",
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
  }
];
export default options;
