import Response from "../helpers/Response";
import {post, get, put, deleteRecord} from "../helpers/http";
import { teams} from "../helpers/dummyData";

let response = new Response();

export const addCompany = (company) => {
  return post('client', company)
};

export const editCompany = (id, company) => {
  return put('client/'+id, company)
};
export const deleteCompany = (id) => {
  return deleteRecord('client/'+id)
};

export const addCompanyUser = (user) => {

};

export const getCompanies = () => {
  return get('client');
};

export const getCompany = (id) => {
  return get('client/' + id);
};

export const getTeams = (cimpanyId) => {
//API Call
  return Promise.resolve(response.getDataSuccess(teams))
};