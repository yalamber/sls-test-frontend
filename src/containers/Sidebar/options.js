const options = [
  {
    key: "systemAdmin",
    label: "sidebar.systemAdmin",
    leftIcon: "ion-settings",
    children: [
      {
        key: "system-admin-company/list",
        label: "sidebar.company"
      },
      {
        key: "system-admin/agency/list",
        label: "sidebar.agency"
      },
      {
        key: "system-admin/edit-roles/list",
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
  },
  {
    key: "companies",
    label: "sidebar.softwareCompany",
    leftIcon: "ion-briefcase",
    children: [
      {
        key: "company/list",
        label: "sidebar.company.companies"
      },
      {
        key: "company/teams",
        label: "sidebar.company.teams"
      },
      {
        key: "company/users",
        label: "sidebar.company.users"
      }
    ]
  }
];
export default options;
