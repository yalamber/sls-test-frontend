import {testingProviderTeamMembers, testingProviderTeams} from "../helpers/dummyData";
import Response from "../helpers/Response";

let response = new Response();
export const getTestingProviderTeams = () => {
  //API Call here
  return Promise.resolve(response.getDataSuccess(testingProviderTeams))
};

export const getTestingProviderTeamMembers = (teamId) => {
  //API Call here
  return Promise.resolve(response.getDataSuccess(testingProviderTeamMembers))
};