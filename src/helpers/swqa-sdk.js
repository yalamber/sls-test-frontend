import axios from 'axios';
import isUrl from 'is-url';
import joinUrl from 'proper-url-join';

class APIRequest {

  constructor(baseURL, httpsAgent, httpAgent, getToken) {
    if (!isUrl(baseURL)) throw new Error('The base URL provided is not valid');
    this.baseURL = baseURL;
    this.httpsAgent = httpsAgent;
    this.httpAgent = httpAgent;
    this.getToken = getToken;
  }

  send(method, url, data = {}) {
    let callURL = joinUrl(this.baseURL, url, { trailingSlash: true });
    const headers = {};
    let token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let body = '';
    if (['POST', 'PUT'].indexOf(method) !== -1) {
      headers['Content-Type'] = 'application/json';
      body = data;
    } else if (Object.keys(data).length && data.constructor === Object) {
      callURL = joinUrl(callURL, { trailingSlash: true, query: data });
    }

    return axios(callURL, {
      httpsAgent: this.httpsAgent,
      httpAgent: this.httpAgent,
      method,
      data: body,
      headers
    }).then((response) => {
      if (response.status >= 400) { // check for 4XX, 5XX, wtv
        return Promise.reject({
          status: response.status,
          message: response.statusText
        });
      }
      if (response.status >= 200 && response.status <= 202) {
        return response.data;
      }
      return {};
    });
  }
}


class SWQA {

  constructor(options) {
    this.options = options;
    this.baseURL = options.baseURL;
    
    this.api = new APIRequest(
      options.baseURL,
      options.httpsAgent,
      options.httpAgent,
      options.getToken
    );
  }

  //auth
  signIn = (userCred) => {
    return this.api.send('POST', 'auth/signin', userCred);
  }

  //my paths
  getMyClients = () => {
    return this.api.send('GET', 'my/client');
  }

  getMyAgencies = () => {
    return this.api.send('GET', 'my/agency');
  }

  agencyLogin = (payload) => {
    return this.api.send('POST', 'auth/signinAgency', payload);
  }

  clientLogin = (payload) => {
    return this.api.send('POST', 'auth/signinClient', payload);
  }

  //clients
  getClients = (options) => {
    return this.api.send('GET', 'client', options);
  }

  getClient = (clientId) => {
    return this.api.send('GET', `client/${clientId}`);
  }

  // client users
  addClientUser = (clientId, payload) => {
    return this.api.send('POST', `client/${clientId}/user`, payload);
  }

  getClientUsers = (clientId, options) => {
    return this.api.send('GET', `client/${clientId}/user`, options);
  }

  getClientUser = (clientId, userId) => {
    return this.api.send('GET', `client/${clientId}/user/${userId}`);
  }

  // client teams
  addClientTeam = (payload) => {
    return this.api.send('POST', `client-team`, payload);
  }

  getClientTeams = (clientId, options) => {
    options.clientId = clientId;
    return this.api.send('GET', `client-team`, options);
  }

  getClientTeam = (teamId) => {
    return this.api.send('GET', `client-team/${teamId}`);
  }

  updateClientTeam = (teamId, payload) => {
    return this.api.send('PUT', `client-team/${teamId}`, payload);
  }

  //client team members
  addClientTeamMember = (teamId, payload) => {
    return this.api.send('POST', `client-team/${teamId}/member`, payload);
  }

  getClientTeamMembers = (teamId, options) => {
    return this.api.send('GET', `client-team/${teamId}/member`, options);
  }
  
  getClientTeamMembership = (teamId, userId) => {
    return this.api.send('GET', `client-team/${teamId}/member/${userId}`);
  }

  editClientTeamMembership = (teamId, userId, payload) => {
    return this.api.send('put', `client-team/${teamId}/member/${userId}`, payload);
  }

  //agencies
  getAgencies = (options) => {
    return this.api.send('GET', 'agency', options);
  }

  getAgency = (agencyId) => {
    return this.api.send('GET', `agency/${agencyId}`);
  }

  // agency users
  addAgencyUser = (agencyId, payload) => {
    return this.api.send('POST', `agency/${agencyId}/user`, payload);
  }

  getAgencyUsers = (agencyId, options) => {
    return this.api.send('GET', `agency/${agencyId}/user`, options);
  }

  getAgencyUser = (agencyId, userId) => {
    return this.api.send('GET', `agency/${agencyId}/user/${userId}`);
  }

  // agency teams
  addAgencyTeam = (payload) => {
    return this.api.send('POST', `agency-team`, payload);
  }

  getAgencyTeams = (agencyId, options) => {
    options.agencyId = agencyId;
    return this.api.send('GET', `agency-team`, options);
  }

  getAgencyTeam = (teamId) => {
    return this.api.send('GET', `agency-team/${teamId}`);
  }

  updateAgencyTeam = (teamId, payload) => {
    return this.api.send('PUT', `agency-team/${teamId}`, payload);
  }

  //agency team members
  addAgencyTeamMember = (teamId, payload) => {
    return this.api.send('POST', `agency-team/${teamId}/member`, payload);
  }

  getAgencyTeamMembers = (teamId, options) => {
    return this.api.send('GET', `agency-team/${teamId}/member`, options);
  }

  getAgencyTeamMembership = (teamId, userId) => {
    return this.api.send('GET', `agency-team/${teamId}/member/${userId}`);
  }

  editAgencyTeamMembership = (teamId, userId, payload) => {
    return this.api.send('put', `agency-team/${teamId}/member/${userId}`, payload);
  }

  //test manager 
  addTestSuite = (suiteData) => {
    return this.api.send('POST', `test/suite`, suiteData);
  }
  
  getTestSuites = (options) => {
    return this.api.send('GET', `test/suite`, options);
  }

  getTestSuite = (suiteId) => {
    return this.api.send('GET', `test/suite/${suiteId}`);
  }
  
  updateTestSuite = (suiteId, suiteData) => {
    return this.api.send('PUT', `test/suite/${suiteId}`, suiteData);
  }

  deleteTestSuite = (suiteId) => {
    return this.api.send('DELETE', `test/suite/${suiteId}`);
  }

  //test cases
  addTestCase = (testCaseData) => {
    return this.api.send('POST', `test/case`, testCaseData);
  }

  getTestCases = (options) => {
    return this.api.send('GET', `test/case`, options);
  }

  getTestCase = (testCaseId) => {
    return this.api.send('GET', `test/case/${testCaseId}`);
  }

  updateTestCase = (caseId, caseData) => {
    return this.api.send('PUT', `test/case/${caseId}`, caseData);
  }

  deleteTestCase = (caseId) => {
    return this.api.send('DELETE', `test/case/${caseId}`);
  }

  //users
  createUser = (payload) => {
    return this.api.send('POST', `user`, payload);
  }

  getUser = (userId) => {
    return this.api.send('GET', `user/${userId}`);
  }

  getUsers = (options) => {
    return this.api.send('GET', `user`, options);
  }

  updateUser = (userId, userData) => {
    return this.api.send('PUT', `user/${userId}`, userData);
  }

  //roles
  createRole = (roleData) => {
    return this.api.send('POST', 'role', roleData);
  }

  getRoles = (options) => {
    return this.api.send('GET', 'role', options);
  }

  updateRole = (roleId, options) => {
    return this.api.send('PUT', `role/${roleId}`, options);
  }
  
  deleteRole = (roleId) => {
    return this.api.send('DELETE', `role/${roleId}`);
  }

  //system users
  getSystemUsers = (options) => {
    return this.api.send('GET', `system/user`, options);
  }

}

export default SWQA;
