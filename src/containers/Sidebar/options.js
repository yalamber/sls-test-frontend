const systemAdminOptions = [
  {
    key: "company/list",
    label: "sidebar.company",
    leftIcon: "ion-grid"
  },
  {
    key: "agency/list",
    label: "sidebar.agency",
    leftIcon: "ion-grid"
  },
  {
    key: "roles/list",
    label: "sidebar.roles",
    leftIcon: "ion-eye"
  },
];

const agencyOptions = [
  {
    key: "my-agency/teams",
    label: "sidebar.teams",
    leftIcon: "ion-ios-people",
    role: ['agency-admin', 'agency-user']
  },
  {
    key: "my-agency/test-queue",
    label: "sidebar.testQueue",
    leftIcon: "ion-cloud",
    role: ['agency-admin', 'agency-user']
  },
  {
    key: "my-agency/assigned-tests",
    label: "sidebar.assignedTests",
    leftIcon: "ion-ios-paper",
    role: ['agency-admin', 'agency-user']
  },
  {
    key: "my-agency/completed-tests",
    label: "sidebar.completedTests",
    leftIcon: "ion-checkmark",
    role: ['agency-admin', 'agency-user']
  },
  {
    key: "my-agency/users",
    label: "sidebar.users",
    leftIcon: "ion-person",
    role: ['agency-admin']
  },
];

const clientOptions = [
  {
    key: "my-company/teams",
    label: "sidebar.teams",
    leftIcon: "ion-ios-people"
  },
  {
    key: "my-company/test-suites",
    label: "sidebar.testSuite",
    leftIcon: "ion-ios-photos"
  },
  {
    key: "my-company/test-cases",
    label: "sidebar.testCases",
    leftIcon: "ion-ios-flask"
  },
  {
    key: "my-company/test-queue",
    label: "sidebar.testQueue",
    leftIcon: "ion-cloud"
  },
  {
    key: "my-company/test-run",
    label: "sidebar.testRun",
    leftIcon: "ion-checkmark"
  },
  {
    key: "my-company/users",
    label: "sidebar.users",
    leftIcon: "ion-person",
    role: ['agency-admin']
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
