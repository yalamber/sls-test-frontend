/*
*
* HOW TO A ADD NEW ACTION
*
*
* 1. create your action the old way
* export const addCompany = (company) => {
*   return _post('client', company)
* };
*
* 2. export the created action at #1 from the last line of this file
* export {
*   post,
*   get,
*   put,
*   deleteRecord,
*   createAgency,
*   getAgencyTeams,
*   getUsers,
*   getAgencyTeamMembers,
*   getAgency
*   addCompany
* };
*
*/



import axios from "axios";
import qs from "qs";
import _ from 'lodash';

axios.defaults.baseURL =
  // "https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/";
axios.defaults.baseURL = 'http://localhost:8080/';

const _middlewares = [];

/*
*
* Append public api's here below
*
*/

/** AGENCY **/
export const createAgency = function(company) {
  return _post("client", company);
};

export const getAgencyTeams = function(query) {
  return _get(`agency-team`, query);
};

export const getAgencyUsers = function(agencyId, teamId) {
  return getAgencyTeamMembers(teamId);
};

export const getAgencyTeamMembers = function(teamId) {
  if (teamId) {
    return _get(`agency-team/${teamId}/member`);
  } else {
    // return _get('user?clientId=' + companyId);
  }
};

export const getAgency = function(agencyId) {
  if (agencyId) {
    return _get(`agency/${agencyId}`);
  }

  return _get(`agency`);
};


/** Company **/
export const addCompany = function(company) {
  return _post('client', company)
};
export const editCompany = function(id, company) {
  return _put('client/' + id, company)
};
export const deleteCompany = function(id) {
  return _deleteRecord('client/' + id)
};
export const getCompanies = function() {
  return _get('client');
};
export const getCompany = function(id) {
  return _get('client/' + id);
};

//Teams
export const addTeam = function(team) {
  return _post('client-team', team);
};
export const updateTeam = function(team, id) {
  return _put('client-team/' + id, team);
};
export const deleteTeam = function(teamId) {
  return _deleteRecord('client-team/' + teamId);
};
export const getTeams = function(companyId) {
  return _get('client-team', {clientId: companyId});
};
export const getClientTeam = function(clientTeamId) {
  return _get('client-team/' + clientTeamId);
};


//Users
export const addCompanyUser = function(user) {
  delete user.company;
  // console.log(user);
  user = _.omit(user, 'isClientUser');
  user = _.omit(user, 'isProviderUser');
  // console.log('user2', user);
  return _post('user', user);
};

export const saveEditCompanyUser = function(params, user) {
  delete user.company;
  const { companyId, userId } = params;
  user = _.omit(user, 'isClientUser');
  user = _.omit(user, 'isProviderUser');
  user = _.omit(user, 'clientTeams');

  return _put(`user/${userId}`, user);
};

export const getCompanyUserOld = function() {
  return _get('user');
};
export const deleteCompanyUser = function(id) {
  return _deleteRecord('user/' + id);
};

export const getCompanyUsersByTeamId = function(teamId) {
  return _get('client-team/' + teamId + '/member');
};

export const getCompanyUsers = function(companyId, teamId) {
  if (teamId) {
    return _get('client-team/' + teamId + '/member');
  } else {
    // return _get('user?clientId=' + companyId);
  }
};

// Test Manager Action
export const getSuites = (clientId = null, clientTeamId = null) => {
  if (clientId) {
    return _get('test/suite', {clientId});
  } else if (clientTeamId) {
    return _get('test/suite', {clientTeamId});
  }
  return Promise.resolve({});
};
export const addSuite = (formData) => {
  return _post('test/suite', formData);
};
export const deleteSuite = (row) => {
  return _deleteRecord('test/suite/' + row.testSuiteId);
};

//cases
export const getCases = (companyId, teamId, suiteId) => {
  return _get('test/case?suiteId='+suiteId);
};

export const addTestCase = (formData) => {
  delete formData.company;
  delete formData.team;
  delete formData.title;
  return _post('test/case', formData)
};

export const deleteTestCase = (id) => {
  return _deleteRecord('test/case/' + id)
};
/*
*
* Private Start
*
*/


export const _post = function(url, data = []) {
  return _sendRequest(url, data, "POST");
};
export const post = function(url, data = []) {
  return _sendRequest(url, data, "POST");
};

export const _patch = function(url, data = []) {
  return _sendRequest(url, data, "PATCH");
};
export const patch = function(url, data = []) {
  return _sendRequest(url, data, "PATCH");
};

export const _put = function(url, data = []) {
  return _sendRequest(url, data, "PUT");
};
export const put = function(url, data = []) {
  return _sendRequest(url, data, "PUT");
};

export const _deleteRecord = function(url, data = []) {
  return _sendRequest(url, data, "DELETE");
};
export const deleteRecord = function(url, data = []) {
  return _sendRequest(url, data, "DELETE");
};

export const _get = function(url, data = {}) {
  return _sendRequest(url, data, "GET");
};
export const get = function(url, data = {}) {
  return _sendRequest(url, data, "GET");
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
    if (method.toLowerCase() === 'get') {
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
