/*
*npm s
* HOW TO ADD A NEW ACTION
*
*
* 1. create your action just like the old way
* make sure to place it in the public section
* export const createAgency = function(company) {
*   return _post("client", company);
* };
*
*/

import axios from "axios";
import qs from "qs";
import _ from "lodash";

axios.defaults.baseURL = "https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/";
//axios.defaults.baseURL = "http://localhost:8080/";

const _middlewares = [];

/*
*
* Append public api's here below
*
*/

/** User Roles **/

export const getUserRoles = function(obj) {
  const options = obj;
  if (typeof options === "object") {
    return _getWithLimitOffset(`role`, options)
  }/* else if (options) {
    return _get(`role/${options}`);
  }*/

  return _get(`role`);
};

/* Users */
export const addUser = (user) => {
  return _post("user", user);
};

export const addUserToCompany = (userId, companyId, data) => {
  data.userId = userId;
  return _post(`client/${companyId}/user`, data);
};

/** AGENCY **/
export const createAgency = function(agency) {
  return _post("agency", agency);
};

export const updateAgency = function(agencyId, data) {
  return _put(`agency/${agencyId}`, data);
};

export const deleteAgencyUser = function(id) {
  return _deleteRecord("user/" + id);
};

export const getAgencyUsers = function(agencyId, option = {}) {
  return _getWithLimitOffset(`agency/${agencyId}/user`, option);
};

export const getAgency = function(objOrAgencyId) {
  const option = objOrAgencyId;
  if (typeof option === "object") {
    return _getWithLimitOffset(`agency`, option);
  } else if (option) {
    return _get(`agency/${option}`);
  }

  return _get(`agency`);
};

export const getAgencies = (option) => {
  return _getWithLimitOffset(`agency`, option);
}

export const deleteAgency = function(id) {
  return _deleteRecord("agency/" + id);
};

/** Agency Team **/

export const getAgencyTeam = function(agencyTeamId) {
  return _get("agency-team/" + agencyTeamId);
};

export const getAgencyTeams = function(option = {}) {
  return _getWithLimitOffset(`agency-team`, option);
};

export const createAgencyTeam = teamData => {
  return _post("agency-team", teamData);
};

/** Agency Users **/
export const addAgencyUser = function(user) {
  return _post("user", user);
};

/** Agency Team Member **/

export const addAgencyTeamMember = function({ teamId, userId, status }) {
  return _post(`agency-team/${teamId}/member`, { userId, status, roleId: 2 });
};

export const getAgencyTeamMembers = function(teamId, option = {}) {
  return _getWithLimitOffset(`agency-team/${teamId}/member`, option);
};

/** Company **/
export const addCompany = function(company) {
  return _post("client", company);
};
export const editCompany = function(id, company) {
  return _put("client/" + id, company);
};
export const deleteCompany = function(id) {
  return _deleteRecord("client/" + id);
};
export const getCompanies = objOrCompanyId => {
  const option = objOrCompanyId;
  if (typeof option === "object") {
    return _getWithLimitOffset(`client`, option);
  }

  return _get(`client`);
};

export const getCompany = function(objOrCompanyId) {
  const option = objOrCompanyId;
  if (typeof option === "object") {
    return _getWithLimitOffset(`client`, option);
  } else if (option) {
    return _get(`client/${option}`);
  }

  return _get(`client`);
};

//Teams
export const addTeam = function(team) {
  return _post("client-team", team);
};
export const updateTeam = function(team, id) {
  return _put("client-team/" + id, team);
};
export const deleteTeam = function(teamId) {
  return _deleteRecord("client-team/" + teamId);
};
export const getTeams = function(companyId) {
  return _get("client-team", { clientId: companyId });
};
export const getClientTeam = function(clientTeamId) {
  return _get("client-team/" + clientTeamId);
};

export const getCompanyTeam = function(companyTeamId) {
  return _get("client-team/" + companyTeamId);
};

export const getCompanyTeams = function(option = {}) {
  return _getWithLimitOffset(`client-team`, option);
};

export const deleteCompanyTeam = function(teamId) {
  return _deleteRecord("client-team/" + teamId);
};

export const getCompanyTeamMembers = function(teamId, option = {}) {
  return _getWithLimitOffset(`client-team/${teamId}/member`, option);
};

export const deleteCompanyTeamMember = function(teamId, userId) {
  return _deleteRecord(`client-team/${teamId}/member/${userId}`);
};

/** Company Team Member **/

export const addCompanyTeamMember = function({ teamId, userId }) {
  return _post(`client-team/${teamId}/member`, { userId, roleId: 2 });
};

/** Company Users **/
export const addCompanyUser = function(user) {
  return _post("user", user);
};

export const saveEditCompanyUser = function(params, user) {
  delete user.company;
  const { companyId, userId } = params;
  user = _.omit(user, "isClientUser");
  user = _.omit(user, "isProviderUser");
  user = _.omit(user, "clientTeams");

  return _put(`user/${userId}`, user);
};

export const getCompanyUserOld = function() {
  return _get("user");
};
export const deleteCompanyUser = function(id) {
  return _deleteRecord("user/" + id);
};

export const getCompanyUsersByTeamId = function(teamId) {
  return _get("client-team/" + teamId + "/member");
};

export const getCompanyUsers = function(companyId, option = {}) {
  return _getWithLimitOffset(`client/${companyId}/user`, option);
};

export const getCompanyTeamUsers = function(teamId, option = {}) {
  return _getWithLimitOffset(`client-team/${teamId}/member`, option);
};

// Test Manager Action
export const getSuites = (clientId = null, clientTeamId = null) => {
  if (clientId) {
    return _get("test/suite", { clientId });
  } else if (clientTeamId) {
    return _get("test/suite", { clientTeamId });
  }
  return Promise.resolve({});
};
export const addSuite = formData => {
  return _post("test/suite", formData);
};
export const deleteSuite = row => {
  return _deleteRecord("test/suite/" + row.testSuiteId);
};

//cases
export const getCases = (companyId, teamId, suiteId) => {
  return _get("test/case?suiteId=" + suiteId);
};

export const addTestCase = formData => {
  delete formData.company;
  delete formData.team;
  delete formData.title;
  return _post("test/case", formData);
};

export const deleteTestCase = id => {
  return _deleteRecord("test/case/" + id);
};

// Dashboard Actions
export const getDashboards = (clientId = null) => {
  return _get("dashboard", { clientId });
};

export const getDashboard = id => {
  return _get("dashboard/" + id);
};

export const addDashboard = formData => {
  delete formData.company;
  return _post("dashboard", { ...formData, teamType: "client" });
};

export const updateDashboard = (id, formData) => {
  return _put("dashboard/" + id, formData);
};

export const deleteDashboard = id => {
  return _deleteRecord("dashboard/" + id);
};

// Testing Provider Actions

export const getTestingProviderTeams = query => {
  return _get(`agency-team`, query);
};

export const getTestingProviderTeam = id => {
  return _get("agency-team/" + id);
};
export const deleteProviderTeam = id => {
  return _deleteRecord("agency-team/" + id);
};

export const updateProviderTeam = (id, teamData) => {
  return _put("agency-team/" + id, teamData);
};

//Members
export const getTestingProviderTeamMembers = teamId => {
  if (teamId) {
    return _get("agency-team/" + teamId + "/member");
  } else {
    return _get("user");
  }
};

export const addProviderUser = user => {
  return _post("user", user);
};
export const getProviderUser = id => {
  return _get("user/" + id);
};
export const deleteProviderUser = id => {
  return _deleteRecord("user/" + id);
};

// User Actions
export const signIn = userCred => {
  return _post("auth/signin", userCred);
};

/** Roles **/
export const addRole = function(role) {
  return _post("role", role);
};

export const editRole = function(id, role) {
  return _put("role/" + id, role);
};

export const deleteRole = function(id) {
  return _deleteRecord("role/" + id);
};

export const getRoles = (option) => {
  return _getWithLimitOffset(`role`, option);
};

export const getRole = function(roleId) {
  return _get(`role/${roleId}`);
};

export const getRoleTypes = (option) => {
  return _getWithLimitOffset(`role/types`, option);
};

/*
*
* Private Start
*
*/

export const _post = function(url, data = []) {
  return _sendRequest(url, data, "POST");
};

export const _patch = function(url, data = []) {
  return _sendRequest(url, data, "PATCH");
};

export const _put = function(url, data = []) {
  return _sendRequest(url, data, "PUT");
};

export const _deleteRecord = function(url, data = []) {
  return _sendRequest(url, data, "DELETE");
};

export const _get = function(url, data = {}) {
  return _sendRequest(url, data, "GET");
};

export const _getWithLimitOffset = function(url, option = {}) {
  const { paginationOptions, query } = option;
  let queryObj = {};
  if (query) {
    queryObj = { ...query };
  }

  if (paginationOptions) {
    if (paginationOptions.pageSize) {
      queryObj.limit = paginationOptions.pageSize;
    }
    if (
      typeof paginationOptions.current !== "undefined" &&
      typeof paginationOptions.pageSize !== "undefined"
    ) {
      queryObj.offset =
        paginationOptions.pageSize * (paginationOptions.current - 1);
    }
  }

  return _get(url, queryObj);
};

/* middlewareOption - param
  {
    type: override|some|other - for now it's always override
    condition: {
      method: get|put|patch|post|delete| - http verb
      url: string - the url
    }
    middlewareBoundMethod: the bound function to be invoked as the override
  }
*/

/* disable for now
export const use = function(middlewareOption) {
  if (
    typeof middlewareOption === "object" &&
    middlewareOption.condition &&
    middlewareOption.condition.url &&
    middlewareOption.condition.method &&
    middlewareOption.type === "override"
  ) {
    _middlewares.push(middlewareOption);
  } else {
    throw Error("must pass a valid middleware object");
  }
};*/

export const _getLastMatchingMiddleware = function(url, method) {
  let found = false;
  _middlewares.forEach(middleware => {
    const { condition } = middleware;
    if (
      condition.method.toLowerCase() === method.toLowerCase() &&
      condition.url === url
    ) {
      found = middleware; // should return a promise
    }
  });

  return found !== false ? found : false;
};

export const _dispatchFoundMiddleware = function(url, method) {
  let matched = _getLastMatchingMiddleware(url, method);
  if (matched !== false) {
    return matched.middlewareBoundMethod();
  }

  return false;
};

export const _sendRequest = function(url, data = [], method) {
  /*const possibleOverride = _dispatchFoundMiddleware(
    url,
    method
  );
  if (possibleOverride !== false) {
    return possibleOverride; // return the already invoked promise
  } else {*/
  if (method.toLowerCase() === "get") {
    return axios({
      url: url + "?" + qs.stringify(data),
      method: "GET"
    }).catch(error => {
      if (error.response === undefined) {
        alert("Network Error");
      } else {
        if (error.response.status !== 422) {
          alert("Something went wrong please try again.");
        }
      }
      throw error;
    });
  }

  return axios({
    url: url,
    method: method,
    data: data
  }).catch(error => {
    throw error;
  });
  // }
};
