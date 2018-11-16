const options = [
  {
    key: "systemAdmin",
    label: "sidebar.systemAdmin",
    leftIcon: "ion-settings",
    children: [
      {
        key: "company/list",
        label: "sidebar.company"
      },
      {
        key: "agency/list",
        label: "sidebar.agency"
      },
      {
        key: "roles/list",
        label: "sidebar.editRoles"
      }
    ]
  },
  {
    key: "company",
    label: "sidebar.company",
    leftIcon: "ion-briefcase",
    children: [
      {
        key: "company/list",
        label: "sidebar.company.myCompanies"
      },
      {
        key: "company/test-manager",
        label: "sidebar.company.testingManager"
      }
    ]
  },
  {
    key: "agency",
    label: "sidebar.agency",
    leftIcon: "ion-android-contacts",
    children: [
      {
        key: "agency/list",
        label: "sidebar.agency.myAgencies"
      },
      {
        key: "agency/test-manager",
        label: "sidebar.company.testingManager"
      }
    ]
  }
];
export default options;
