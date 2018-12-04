const actions = {
  REQUEST_CLIENT_LIST: 'REQUEST_CLIENT_LIST',
  RECEIVE_CLIENT_LIST: 'RECEIVE_CLIENT_LIST',
  ERROR_CLIENT_LIST: 'ERROR_CLIENT_LIST',
  REQUEST_DELETE_CLIENT: 'REQUEST_DELETE_CLIENT',
  SET_CURRENT_CLIENT: 'SET_CURRENT_CLIENT',
  //CLIENT USER ACTIONS
  REQUEST_CLIENT_USER_LIST: 'REQUEST_CLIENT_USER_LIST',
  RECEIVE_CLIENT_USER_LIST: 'RECEIVE_CLIENT_USER_LIST',
  ERROR_CLIENT_USER_LIST: 'ERROR_CLIENT_USER_LIST',
  //action creators
  setCurrentClient: (client) => ({
    type: actions.SET_CURRENT_CLIENT,
    client
  }),
  requestClients: (payload) => ({
    type: actions.REQUEST_CLIENT_LIST,
    payload
  }),
  receiveClients: (payload) => ({
    type: actions.RECEIVE_CLIENT_LIST,
    payload
  }),
  deleteClient: (clientID) => ( {
    type: actions.REQUEST_DELETE_CLIENT,
    clientID
  }),
  requestClientUsers: (payload) => ({
    type: actions.REQUEST_CLIENT_USER_LIST,
    payload
  })
};

export default actions;
