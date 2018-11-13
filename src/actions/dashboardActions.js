// import HttpApiClient from "../helpers/http-api-client";
import { post, get, put, deleteRecord } from "../helpers/http-api-client";

export const getDashboards = (clientId = null) => {
  return get('dashboard', {clientId});
};

export const getDashboard = (id) => {
  return get('dashboard/' + id);
};

export const addDashboard = (formData) => {
  delete formData.company;
  return post('dashboard', {...formData, teamType: 'client'});
};

export const updateDashboard = (id, formData) => {
  return put('dashboard/' + id, formData);
};

export const deleteDashboard = (id) => {
  return deleteRecord('dashboard/' + id);
};
