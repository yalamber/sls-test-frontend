import {testingProviderTeamMembers, testingProviderTeams} from "../helpers/dummyData";
import {post, get, put, deleteRecord} from "../helpers/http";

import Response from "../helpers/Response";

let response = new Response();
export const getTestingProviderTeams = () => {
  return get("team/provider");
};
export const getTestingProviderTeam = (id) => {
  return get("team/provider/"+id);
};
export const deleteProviderTeam = (id) => {
  return deleteRecord("team/provider/" + id);
};

export const addProviderTeam = (teamData) => {
  return post('team/provider', teamData);
};

export const updateProviderTeam=(id, teamData)=>{
  return put('team/provider/'+id, teamData);
};

export const getTestingProviderTeamMembers = (teamId) => {
  //API Call here
  return Promise.resolve(response.getDataSuccess(testingProviderTeamMembers))
};