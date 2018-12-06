const actions = {
  REQUEST_SYSTEM_USER_LIST: 'REQUEST_SYSTEM_USER_LIST',
  RECEIVE_SYSTEM_USER_LIST: 'RECEIVE_SYSTEM_USER_LIST',
  ERROR_SYSTEM_USER_LIST: 'ERROR_SYSTEM_USER_LIST',
  REQUEST_DELETE_SYSTEM_USER: 'REQUEST_DELETE_SYSTEM_USER',
  requestSystemUsers: (payload) => ({
    type: actions.REQUEST_SYSTEM_USER_LIST,
    payload
  }),
  receiveSystemUsers: (payload) => ({
    type: actions.RECEIVE_SYSTEM_USER_LIST,
    payload
  }),
  deleteSystemUser: (roleID) => ( {
    type: actions.REQUEST_DELETE_SYSTEM_USER,
    roleID
  })
};

export default actions;
