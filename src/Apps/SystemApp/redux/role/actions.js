const actions = {
  REQUEST_ROLE_LIST: 'REQUEST_ROLE_LIST',
  RECEIVE_ROLE_LIST: 'RECEIVE_ROLE_LIST',
  ERROR_ROLE_LIST: 'ERROR_ROLE_LIST',
  REQUEST_DELETE_ROLE: 'REQUEST_DELETE_ROLE',
  requestRoles: (payload) => ({
    type: actions.REQUEST_ROLE_LIST,
    payload
  }),
  receiveRoles: (payload) => ({
    type: actions.RECEIVE_ROLE_LIST,
    payload
  }),
  deleteRole: (roleID) => ( {
    type: actions.REQUEST_DELETE_ROLE,
    roleID
  })
};

export default actions;
