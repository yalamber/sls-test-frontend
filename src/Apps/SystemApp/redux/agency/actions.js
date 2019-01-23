const actions = {
  //agency list
  REQUEST_AGENCY_LIST: 'REQUEST_AGENCY_LIST',
  RECEIVE_AGENCY_LIST: 'RECEIVE_AGENCY_LIST',
  ERROR_AGENCY_LIST: 'ERROR_AGENCY_LIST',
  REQUEST_DELETE_AGENCY: 'REQUEST_DELETE_AGENCY',
  //current agency
  REQUEST_CURRENT_AGENCY: 'REQUEST_CURRENT_AGENCY',
  RECEIVE_CURRENT_AGENCY: 'RECEIVE_CURRENT_AGENCY',
  ERROR_CURRENT_AGENCY: 'ERROR_CURRENT_AGENCY',
  CLEAR_CURRENT_AGENCY: 'CLEAR_CURRENT_AGENCY',
  //AGENCY USER ACTIONS
  REQUEST_AGENCY_USER_LIST: 'REQUEST_AGENCY_USER_LIST',
  RECEIVE_AGENCY_USER_LIST: 'RECEIVE_AGENCY_USER_LIST',
  ERROR_AGENCY_USER_LIST: 'ERROR_AGENCY_USER_LIST',
  //agency current USER
  CLEAR_CURRENT_AGENCY_USER: 'CLEAR_CURRENT_AGENCY_USER',
  REQUEST_CURRENT_AGENCY_USER: 'REQUEST_CURRENT_AGENCY_USER',
  RECEIVE_CURRENT_AGENCY_USER: 'RECEIVE_CURRENT_AGENCY_USER',
  ERROR_CURRENT_AGENCY_USER: 'ERROR_CURRENT_AGENCY_USER',
  //add agency user
  REQUEST_CREATE_AGENCY_USER: 'REQUEST_CREATE_AGENCY_USER',
  RECEIVE_CREATE_AGENCY_USER: 'RECEIVE_CREATE_AGENCY_USER',
  ERROR_CREATE_AGENCY_USER: 'ERROR_CREATE_AGENCY_USER',
  //agency user roles
  REQUEST_AGENCY_USER_ROLES: 'REQUEST_AGENCY_USER_ROLES',
  RECEIVE_AGENCY_USER_ROLES: 'RECEIVE_AGENCY_USER_ROLES',
  ERROR_AGENCY_USER_ROLES: 'ERROR_AGENCY_USER_ROLES',
  //AGENCY TEAM ACTIONS
  REQUEST_AGENCY_TEAM_LIST: 'REQUEST_AGENCY_TEAM_LIST',
  RECEIVE_AGENCY_TEAM_LIST: 'RECEIVE_AGENCY_TEAM_LIST',
  ERROR_AGENCY_TEAM_LIST: 'ERROR_AGENCY_TEAM_LIST',
  
  //current agency creators
  requestCurrentAgency: (agencyId) => ({
    type: actions.REQUEST_CURRENT_AGENCY,
    agencyId
  }),
  receiveCurrentAgency: (agencyData) => ({
    type: actions.RECEIVE_CURRENT_AGENCY,
    agencyData
  }),
  //current agency user
  clearCurrentAgency: () => {
    return {
      type: actions.CLEAR_CURRENT_AGENCY
    };
  },
  //agencys list
  requestAgencies: (payload) => ({
    type: actions.REQUEST_AGENCY_LIST,
    payload
  }),
  receiveAgencies: (payload) => ({
    type: actions.RECEIVE_AGENCY_LIST,
    payload
  }),
  //delete agency
  deleteAgency: (agencyId) => ( {
    type: actions.REQUEST_DELETE_AGENCY,
    agencyId
  }),
  //agency users list
  requestAgencyUsers: (agencyId, options) => ({
    type: actions.REQUEST_AGENCY_USER_LIST,
    agencyId,
    options
  }),
  receiveAgencyUsers: (payload) => ({
    type: actions.RECEIVE_AGENCY_USER_LIST,
    payload
  }),
  //current agency user
  clearCurrentAgencyUser: () => {
    return {
      type: actions.CLEAR_CURRENT_AGENCY_USER
    };
  },
  requestCurrentAgencyUser: (agencyId, userId) => ({
    type: actions.REQUEST_CURRENT_AGENCY_USER,
    agencyId,
    userId
  }),
  receiveCurrentAgencyUser: (userData) => ({
    type: actions.RECEIVE_CURRENT_AGENCY_USER,
    userData
  }),
  //add agency user
  requestCreateAgencyUser: (agencyId, userData, history, appType) => ({
    type: actions.REQUEST_CREATE_AGENCY_USER,
    agencyId,
    userData,
    history,
    appType
  }),
  receiveCreateAgencyUser: (membershipData) => ({
    type: actions.RECEIVE_CREATE_AGENCY_USER,
    membershipData
  }),
  //agency roles
  requestAgencyUserRoles: () => ({
    type: actions.REQUEST_AGENCY_USER_ROLES
  }),
  receiveAgencyUserRoles: (roles = []) => ({
    type: actions.RECEIVE_AGENCY_USER_ROLES,
    roles
  }),
  //teams
  requestAgencyTeams: (agencyId, options) => ({
    type: actions.REQUEST_AGENCY_TEAM_LIST,
    agencyId,
    options
  }),
  receiveAgencyTeams: (payload) => ({
    type: actions.RECEIVE_AGENCY_TEAM_LIST,
    payload
  }),
};

export default actions;
