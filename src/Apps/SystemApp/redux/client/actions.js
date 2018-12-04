const actions = {
  REQUEST_CLIENT_LIST: 'REQUEST_CLIENT_LIST',
  RECEIVE_CLIENT_LIST: 'RECEIVE_CLIENT_LIST',
  ERROR_CLIENT_LIST: 'ERROR_CLIENT_LIST',
  REQUEST_DELETE_CLIENT: 'REQUEST_DELETE_CLIENT',
  requestClients: (payload) => ({
    type: actions.REQUEST_CLIENT_LIST,
    payload
  }),
  receiveClients: (payload) => ({
    type: actions.RECEIVE_CLIENT_LIST,
    payload
  }),
  deleteClient: (roleID) => ( {
    type: actions.REQUEST_DELETE_CLIENT,
    roleID
  })
};

export default actions;
