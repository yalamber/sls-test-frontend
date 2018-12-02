const systemAdminOptions = [
  {
    key: "companies",
    label: "sidebar.company",
    leftIcon: "ion-grid"
  },
  {
    key: "agencies",
    label: "sidebar.agency",
    leftIcon: "ion-grid"
  },
  {
    key: "roles",
    label: "sidebar.roles",
    leftIcon: "ion-eye"
  },
  {
    key: "users",
    label: "sidebar.systemUsers",
    leftIcon: "ion-person"
  },
];

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

const clientOptions = [
  {
    key: "teams",
    label: "sidebar.teams",
    leftIcon: "ion-ios-people"
  },
  {
    key: "test-suites",
    label: "sidebar.testSuite",
    leftIcon: "ion-ios-photos"
  },
  {
    key: "test-cases",
    label: "sidebar.testCases",
    leftIcon: "ion-ios-flask"
  },
  {
    key: "test-queue",
    label: "sidebar.testQueue",
    leftIcon: "ion-cloud"
  },
  {
    key: "test-run",
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

const freelancerOptions = [
  {
    key: "test/suites",
    label: "sidebar.company",
    leftIcon: "ion-settings"
  },
  
]

const options = {
  systemAdminOptions,
  clientOptions,
  agencyOptions,
  freelancerOptions
}
export default options;
