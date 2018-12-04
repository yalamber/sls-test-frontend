const actions = {
  //client list
  REQUEST_CLIENT_LIST: 'REQUEST_CLIENT_LIST',
  RECEIVE_CLIENT_LIST: 'RECEIVE_CLIENT_LIST',
  ERROR_CLIENT_LIST: 'ERROR_CLIENT_LIST',
  REQUEST_DELETE_CLIENT: 'REQUEST_DELETE_CLIENT',
  //current client
  REQUEST_CURRENT_CLIENT: 'REQUEST_CURRENT_CLIENT',
  RECEIVE_CURRENT_CLIENT: 'RECEIVE_CURRENT_CLIENT',
  ERROR_CURRENT_CLIENT: 'ERROR_CURRENT_CLIENT',
  //CLIENT USER ACTIONS
  REQUEST_CLIENT_USER_LIST: 'REQUEST_CLIENT_USER_LIST',
  RECEIVE_CLIENT_USER_LIST: 'RECEIVE_CLIENT_USER_LIST',
  ERROR_CLIENT_USER_LIST: 'ERROR_CLIENT_USER_LIST',
  //action creators
  requestCurrentClient: (clientId) => ({
    type: actions.REQUEST_CURRENT_CLIENT,
    clientId
  }),
  receiveCurrentClient: (clientData) => ({
    type: actions.RECEIVE_CURRENT_CLIENT,
    clientData
  }),
  requestClients: (payload) => ({
    type: actions.REQUEST_CLIENT_LIST,
    payload
  }),
  receiveClients: (payload) => ({
    type: actions.RECEIVE_CLIENT_LIST,
    payload
  }),
  deleteClient: (clientId) => ( {
    type: actions.REQUEST_DELETE_CLIENT,
    clientId
  }),
  requestClientUsers: (clientId, options) => ({
    type: actions.REQUEST_CLIENT_USER_LIST,
    clientId,
    options
  }),
  receiveClientUsers: (payload) => ({
    type: actions.RECEIVE_CLIENT_USER_LIST,
    payload
  })
};

export default actions;
