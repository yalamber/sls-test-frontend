import axios from "axios";
import qs from "qs";

axios.defaults.baseURL =
  "https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/";
// axios.defaults.baseURL = 'http://localhost:8080/';

function ApiClient() {
  this.middlewares = [];
}

const post = function(url, data = []) {
  return this.sendRequest(url, data, "POST");
};

const patch = function(url, data = []) {
  return this.sendRequest(url, data, "PATCH");
};

const put = function(url, data = []) {
  return this.sendRequest(url, data, "PUT");
};

const deleteRecord = function(url, data = []) {
  return this.sendRequest(url, data, "DELETE");
};

const get = function(url, data = {}) {
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
};

const send = function(url, data = [], method) {
  return axios({
    url: url,
    method: method,
    data: data
  }).catch(error => {
    throw error;
  });
};

/*
*
* Append public api's here below
*
*/

const send = function(url, data = [], method) {
  return axios({
    url: url,
    method: method,
    data: data
  }).catch(error => {
    throw error;
  });
};


/*
*
* Private Start
*
*/

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
ApiClient.prototype._use = function(middlewareOption) {
  if (
    typeof middlewareOption === "object" &&
    middlewareOption.condition &&
    middlewareOption.condition.url &&
    middlewareOption.condition.method &&
    middlewareOption.type === "override"
  ) {

    this.middlewares.push(middlewareOption);
  } else {
    throw Error("must pass a valid middleware object");
  }
};

ApiClient.prototype._getLastMatchingMiddleware = function(url, method) {
  let found = false;
  this.middlewares.forEach(middleware => {
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

ApiClient.prototype._dispatchFoundMiddleware = function(url, method) {
  let matched = this.getLastMatchingMiddleware(url, method);
  if (matched !== false) {
    return matched.middlewareBoundMethod();
  }

  return false;
};

/*
*
* Private End
*
*/

ApiClient.prototype.use = ApiClient.prototype._use;
ApiClient.prototype.post = post;
ApiClient.prototype.patch = patch;
ApiClient.prototype.put = put;
ApiClient.prototype.deleteRecord = deleteRecord;
ApiClient.prototype.get = get;
ApiClient.prototype.send = send;

module.exports = ApiClient;
