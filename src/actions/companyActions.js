import Response from "../helpers/Response";
import {clients, teams} from "../helpers/dummyData";

let response = new Response();

export const addCompany = (company) => {
  //API Call here
  return Promise.resolve(response.saveSuccess())
};

export const addCompanyUser = (user) => {
  //API call
  return Promise.resolve(response.saveSuccess());
};

export const getCompanies = () => {
  //API Call here
  return Promise.resolve(response.getDataSuccess(clients))
};

export const getTeams = (cimpanyId) => {
//API Call
  return Promise.resolve(response.getDataSuccess(teams))
};