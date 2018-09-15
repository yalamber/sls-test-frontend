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
    key: "Users",
    label: "Users",
    leftIcon: "ion-person",
    children: [
      {
        key: 'users/list',
        label: 'List',
      },
      {
        key: 'users/create',
        label: 'Create',
      }
    ]
  }
];
export default options;
