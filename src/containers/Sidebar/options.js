const options = [
  {
    key: "clients",
    label: "Software Company",
    leftIcon: "ion-android-contacts",
    children: [
      {
        key: 'clients/list',
        label: 'List',
      },
      {
        key: 'clients/create',
        label: 'Create',
      }
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
