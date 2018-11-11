import _ from 'lodash';
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
  return post('client-team', team);
};
export const updateTeam = (team, id) => {
  return put('client-team/' + id, team);
};
export const deleteTeam = (teamId) => {
  return deleteRecord('client-team/' + teamId);
};
export const getTeams = (companyId) => {
  return get('client-team', {clientId: companyId});
};
export const getClientTeam = (clientTeamId) => {
  return get('client-team/' + clientTeamId);
};


//Users
export const addCompanyUser = (user) => {
  delete user.company;
  // console.log(user);
  user = _.omit(user, 'isClientUser');
  user = _.omit(user, 'isProviderUser');
  // console.log('user2', user);
  return post('user', user);
};

export const saveEditCompanyUser = (params, user) => {
  delete user.company;
  const { companyId, userId } = params;
  user = _.omit(user, 'isClientUser');
  user = _.omit(user, 'isProviderUser');
  user = _.omit(user, 'clientTeams');

  return put(`user/${userId}`, user);
};

export const getCompanyUsers = () => {
  return get('user');
};
export const deleteCompanyUser = (id) => {
  return deleteRecord('user/' + id);
};

export const getCompanyUsersByTeamId = (teamId) => {
  return get('client-team/' + teamId + '/member');
};

export const getUsers = (companyId, teamId) => {
  if (teamId) {
    return get('client-team/' + teamId + '/member');
  } else {
    // return get('user?clientId=' + companyId);
  }
};
