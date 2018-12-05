import axios from 'axios';
import _ from "lodash";
import isUrl from 'is-url';
import joinUrl from 'proper-url-join';
//TODO: make compatible with redux store

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
    if (method === 'POST') {
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
  getClientUsers = (clientId, options) => {
    return this.api.send('GET', `client/${clientId}/user`, options);
  }
  //users
  getUser = (userId) => {
    return this.api.send('GET', `user/${userId}`);
  }

  //roles
  addRole = (options) => {
    return this.api.send('PUT', 'role', options);
  }

  getRoles = (options) => {
    return this.api.send('GET', 'role', options);
  }

  editRole = (roleId, options) => {
    return this.api.send('PUT', `role/${roleId}`, options);
  }

}

export default SWQA;
