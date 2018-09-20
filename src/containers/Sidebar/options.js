const options = [
  {
    key: "clients",
    label: "Software Company",
    leftIcon: "ion-android-contacts",
    children: [
      {
        key: 'clients/list',
        label: 'List All',
      },
      {
        key: 'clients/create',
        label: 'Create Company',
      },
      {
        key: 'clients/teams/create',
        label: 'Create Team',
      },
      {
        key: 'clients/users/create',
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
        key: 'testing-providers/teams',
        label: 'List All',
      },
      {
        key: 'testing-providers/teams/create',
        label: 'Create Team',
      },
      {
        key: 'testing-providers/users/create',
        label: 'Create User',
      }
    ]
  }
];
export default options;
