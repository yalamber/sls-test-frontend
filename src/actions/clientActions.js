import Response from "../helpers/Response";
import {clients, teams} from "../helpers/dummyData";

let response = new Response();

export const addClient = (client) => {
  //API Call here
  return Promise.resolve(response.saveSuccess())
};

export const addClientUser = (user) => {
  //API call
  return Promise.resolve(response.saveSuccess());
};

export const getClients = () => {
  //API Call here
  return Promise.resolve(response.getDataSuccess(clients))
};

export const getTeams = (clientId) => {
//API Call
  return Promise.resolve(response.getDataSuccess(teams))
};