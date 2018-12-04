const actions = {
  REQUEST_ROLES_LIST: 'REQUEST_ROLES_LIST',
  RECEIVE_ROLES_LIST: 'RECEIVE_ROLES_LIST',
  ERROR_ROLES_LIST: 'ERROR_ROLES_LIST',
  REQUEST_DELETE_ROLE: 'REQUEST_DELETE_ROLE',
  requestRoles: (payload) => ({
    type: actions.REQUEST_ROLES_LIST,
    payload
  }),
  receiveRoles: (payload) => ({
    type: actions.RECEIVE_ROLES_LIST,
    payload
  }),
  deleteRole: (roleID) => ( {
    type: actions.REQUEST_DELETE_ROLE,
    roleID
  })
};

export default actions;
