const clientOptions = [
  {
    key: "teams",
    label: "sidebar.teams",
    leftIcon: "ion-ios-people"
  },
  {
    key: "test-manager/test-suites",
    label: "sidebar.testSuite",
    leftIcon: "ion-ios-photos"
  },
  {
    key: "test-manager/test-cases",
    label: "sidebar.testCases",
    leftIcon: "ion-ios-flask"
  },
  {
    key: "test-manager/test-queue",
    label: "sidebar.testQueue",
    leftIcon: "ion-cloud"
  },
  {
    key: "test-manager/test-run",
    label: "sidebar.testRun",
    leftIcon: "ion-checkmark"
  },
  {
    key: "users",
    label: "sidebar.users",
    leftIcon: "ion-person",
    roles: ['client-admin']
  },
];

export default clientOptions;