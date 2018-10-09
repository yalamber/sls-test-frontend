import {post, get, put, deleteRecord} from "../helpers/http";

export const addCompany = (company) => {
  return post('client', company)
};
export const editCompany = (id, company) => {
  return put('client/' + id, company)
};
export const deleteCompany = (id) => {
  return deleteRecord('client/' + id)
};
export const getCompanies = () => {
  return get('client');
};
export const getCompany = (id) => {
  return get('client/' + id);
};

//Teams
export const addTeam = (team) => {
  return post('team/client', team);
};
export const deleteTeam = (teamId) => {
  return deleteRecord('team/client/' + teamId);
};
export const getTeams = (companyId) => {
  return get('team/client', {clientId: companyId});
};
export const getClientTeam = (clientTeamId) => {
  return get('team/client/' + clientTeamId);
};


//Users
export const addCompanyUser = (user) => {
  return post('user', user);
};

export const getCompanyUsers = () => {
  return get('user');
};