const actions = {
  CHECK_ACTIVE_ACCOUNT: 'CHECK_ACTIVE_ACCOUNT',
  //agencies
  REQUEST_MY_AGENCIES: 'REQUEST_MY_AGENCIES',
  RECEIVE_MY_AGENCIES: 'RECEIVE_MY_AGENCIES',
  ERROR_MY_AGENCIES: 'ERROR_MY_AGENCIES',
  REQUEST_AGENCY_LOGIN: 'REQUEST_AGENCY_LOGIN',
  ERROR_AGENCY_LOGIN: 'ERROR_AGENCY_LOGIN',
  //clients
  REQUEST_MY_CLIENTS: 'REQUEST_MY_CLIENTS',
  RECEIVE_MY_CLIENTS: 'RECEIVE_MY_CLIENTS',
  ERROR_MY_CLIENTS: 'ERROR_MY_CLIENTS',
  REQUEST_CLIENT_LOGIN: 'REQUEST_CLIENT_LOGIN',
  ERROR_CLIENT_LOGIN: 'ERROR_CLIENT_LOGIN',
  //same action for both in success
  SUCCESS_ACCOUNT_LOGIN: 'SUCCESS_ACCOUNT_LOGIN',
  //system admin
  SWITCH_SYSTEM_ADMIN: 'SWITCH_SYSTEM_ADMIN',

  checkActiveAccount: (payload) => ({ 
    type: actions.CHECK_ACTIVE_ACCOUNT,
    payload
  }),
  //agencies actions
  requestMyAgencies: () => ({
    type: actions.REQUEST_MY_AGENCIES
  }),
  receiveMyAgencies: (payload) => ({
    type: actions.RECEIVE_MY_AGENCIES,
    payload
  }),
  requestAgencyLogin: (payload) => ({
    type: actions.REQUEST_AGENCY_LOGIN,
    payload
  }),
  //clients actions
  requestMyClients: () => ({
    type: actions.REQUEST_MY_CLIENTS
  }),
  receiveMyClients: (payload) => ({
    type: actions.RECEIVE_MY_CLIENTS,
    payload
  }),
  requestClientLogin: (payload) => ({
    type: actions.REQUEST_CLIENT_LOGIN,
    payload
  }),
  //same action for success
  successAccountLogin: (payload) => ({
    type: actions.SUCCESS_ACCOUNT_LOGIN,
    payload
  }),
  //switch to system admin
  switchSystemAdmin: (payload) => ({
    type: actions.SWITCH_SYSTEM_ADMIN,
    payload
  })
};
export default actions;
