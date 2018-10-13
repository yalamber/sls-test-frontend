import {post, get, put, deleteRecord} from "../helpers/http";

export const getTestingProviderTeams = () => {
  return get("team/provider");
};
export const getTestingProviderTeam = (id) => {
  return get("team/provider/" + id);
};
export const deleteProviderTeam = (id) => {
  return deleteRecord("team/provider/" + id);
};

export const addProviderTeam = (teamData) => {
  return post('team/provider', teamData);
};

export const updateProviderTeam = (id, teamData) => {
  return put('team/provider/' + id, teamData);
};


//Members
export const getTestingProviderTeamMembers = (teamId) => {
  return get('team/provider/' + teamId + '/member')
};

export const addProviderUser = (user) => {
  return post('user', user);
};

export const deleteProviderUser = (id) => {
  return deleteRecord('user/' + id);
};