import {post, get, put, deleteRecord} from "../helpers/http";

export const getTestingProviderTeams = () => {
  return get("agency-team");
};
export const getTestingProviderTeam = (id) => {
  return get("agency-team/" + id);
};
export const deleteProviderTeam = (id) => {
  return deleteRecord("agency-team/" + id);
};

export const addProviderTeam = (teamData) => {
  return post('agency-team', teamData);
};

export const updateProviderTeam = (id, teamData) => {
  return put('agency-team/' + id, teamData);
};


//Members
export const getTestingProviderTeamMembers = (teamId) => {
  if (teamId) {
    return get('agency-team/' + teamId + '/member')
  } else {
    return get('user');
  }
};

export const addProviderUser = (user) => {
  return post('user', user);
};

export const deleteProviderUser = (id) => {
  return deleteRecord('user/' + id);
};