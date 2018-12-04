const agencyOptions = [
  {
    key: "teams",
    label: "sidebar.teams",
    leftIcon: "ion-ios-people",
    roles: ['agency-admin', 'agency-user']
  },
  {
    key: "test-queue",
    label: "sidebar.testQueue",
    leftIcon: "ion-cloud",
    roles: ['agency-admin', 'agency-user']
  },
  {
    key: "assigned-tests",
    label: "sidebar.assignedTests",
    leftIcon: "ion-ios-paper",
    roles: ['agency-admin', 'agency-user']
  },
  {
    key: "completed-tests",
    label: "sidebar.completedTests",
    leftIcon: "ion-checkmark",
    roles: ['agency-admin', 'agency-user']
  },
  {
    key: "users",
    label: "sidebar.users",
    leftIcon: "ion-person",
    roles: ['agency-admin']
  },
];

export default agencyOptions;