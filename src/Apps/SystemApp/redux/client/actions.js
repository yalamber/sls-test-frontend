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
  CLEAR_CURRENT_CLIENT: 'CLEAR_CURRENT_CLIENT',
  //CLIENT USER ACTIONS
  REQUEST_CLIENT_USER_LIST: 'REQUEST_CLIENT_USER_LIST',
  RECEIVE_CLIENT_USER_LIST: 'RECEIVE_CLIENT_USER_LIST',
  ERROR_CLIENT_USER_LIST: 'ERROR_CLIENT_USER_LIST',
  //client current USER
  CLEAR_CURRENT_CLIENT_USER: 'CLEAR_CURRENT_CLIENT_USER',
  REQUEST_CURRENT_CLIENT_USER: 'REQUEST_CURRENT_CLIENT_USER',
  RECEIVE_CURRENT_CLIENT_USER: 'RECEIVE_CURRENT_CLIENT_USER',
  ERROR_CURRENT_CLIENT_USER: 'ERROR_CURRENT_CLIENT_USER',
  //add client user
  REQUEST_CREATE_CLIENT_USER: 'REQUEST_CREATE_CLIENT_USER',
  RECEIVE_CREATE_CLIENT_USER: 'RECEIVE_CREATE_CLIENT_USER',
  ERROR_CREATE_CLIENT_USER: 'ERROR_CREATE_CLIENT_USER',
  //client user roles
  REQUEST_CLIENT_USER_ROLES: 'REQUEST_CLIENT_USER_ROLES',
  RECEIVE_CLIENT_USER_ROLES: 'RECEIVE_CLIENT_USER_ROLES',
  ERROR_CLIENT_USER_ROLES: 'ERROR_CLIENT_USER_ROLES',
  //CLIENT TEAM ACTIONS
  REQUEST_CLIENT_TEAM_LIST: 'REQUEST_CLIENT_TEAM_LIST',
  RECEIVE_CLIENT_TEAM_LIST: 'RECEIVE_CLIENT_TEAM_LIST',
  ERROR_CLIENT_TEAM_LIST: 'ERROR_CLIENT_TEAM_LIST',

  //current client creators
  requestCurrentClient: (clientId) => ({
    type: actions.REQUEST_CURRENT_CLIENT,
    clientId
  }),
  receiveCurrentClient: (clientData) => ({
    type: actions.RECEIVE_CURRENT_CLIENT,
    clientData
  }),
  //current client user
  clearCurrentClient: () => {
    return {
      type: actions.CLEAR_CURRENT_CLIENT
    };
  },
  //clients list
  requestClients: (payload) => ({
    type: actions.REQUEST_CLIENT_LIST,
    payload
  }),
  receiveClients: (payload) => ({
    type: actions.RECEIVE_CLIENT_LIST,
    payload
  }),
  //delete client
  deleteClient: (clientId) => ( {
    type: actions.REQUEST_DELETE_CLIENT,
    clientId
  }),
  //client users list
  requestClientUsers: (clientId, options) => ({
    type: actions.REQUEST_CLIENT_USER_LIST,
    clientId,
    options
  }),
  receiveClientUsers: (payload) => ({
    type: actions.RECEIVE_CLIENT_USER_LIST,
    payload
  }),
  //current client user
  clearCurrentClientUser: () => {
    return {
      type: actions.CLEAR_CURRENT_CLIENT_USER
    };
  },
  requestCurrentClientUser: (clientId, userId) => ({
    type: actions.REQUEST_CURRENT_CLIENT_USER,
    clientId,
    userId
  }),
  receiveCurrentClientUser: (userData) => ({
    type: actions.RECEIVE_CURRENT_CLIENT_USER,
    userData
  }),
  //add client user
  requestCreateClientUser: (clientId, userData, history, appType) => ({
    type: actions.REQUEST_CREATE_CLIENT_USER,
    clientId,
    userData,
    history,
    appType
  }),
  receiveCreateClientUser: (membershipData) => ({
    type: actions.RECEIVE_CREATE_CLIENT_USER,
    membershipData
  }),
  //client roles
  requestClientUserRoles: () => ({
    type: actions.REQUEST_CLIENT_USER_ROLES
  }),
  receiveClientUserRoles: (roles = []) => ({
    type: actions.RECEIVE_CLIENT_USER_ROLES,
    roles
  }),
  //teams
  requestClientTeams: (clientId, options) => ({
    type: actions.REQUEST_CLIENT_TEAM_LIST,
    clientId,
    options
  }),
  receiveClientTeams: (payload) => ({
    type: actions.RECEIVE_CLIENT_TEAM_LIST,
    payload
  }),
};

export default actions;
