import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/';
// axios.defaults.baseURL = 'http://localhost:8080/';

export function post(url, data = []) {
  return send(url, data, 'POST');
}

export function patch(url, data = []) {
  return send(url, data, 'PATCH');
}

export function put(url, data = []) {
  return send(url, data, 'PUT');
}

export function deleteRecord(url, data = []) {
  return send(url, data, 'DELETE');
}

export function get(url, data = {}) {
  return axios({
    url: url + '?' + qs.stringify(data),
    method: 'GET',
  }).catch(error => {
    if (error.response === undefined) {
      alert("Network Error");
    } else {
      if (error.response.status !== 422) {
        alert("Something went wrong please try again.");
      }
    }
    throw  error;
  });
}

export function send(url, data = [], method) {
  return axios({
    url: url,
    method: method,
    data: data
  }).catch(error => {
    throw  error;
  });
}
