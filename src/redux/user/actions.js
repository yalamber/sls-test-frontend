const actions = {
  //agencies
  REQUEST_MY_AGENCIES: 'REQUEST_MY_AGENCIES',
  RECEIVE_MY_AGENCIES: 'RECEIVE_MY_AGENCIES',
  ERROR_MY_AGENCIES: 'ERROR_MY_AGENCIES',
  REQUEST_AGENCY_LOGIN: 'REQUEST_AGENCY_LOGIN',
  SUCCESS_AGENCY_LOGIN: 'SUCCESS_AGENCY_LOGIN',
  ERROR_AGENCY_LOGIN: 'ERROR_AGENCY_LOGIN',
  //clients
  REQUEST_MY_CLIENTS: 'REQUEST_MY_CLIENTS',
  RECEIVE_MY_CLIENTS: 'RECEIVE_MY_CLIENTS',
  REQUEST_CLIENT_LOGIN: 'REQUEST_CLIENT_LOGIN',
  SUCCESS_CLIENT_LOGIN: 'SUCCESS_CLIENT_LOGIN',
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
  successAgencyLogin: (payload) => ({
    type: actions.SUCCESS_AGENCY_LOGIN,
    payload
  }),
  //client actions
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

};
export default actions;
