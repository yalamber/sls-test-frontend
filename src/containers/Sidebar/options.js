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
        label: 'Teams',
      }
    ]
  }
];
export default options;
