import Response from "../helpers/Response";
import {suits, cases} from "../helpers/dummyData";

let response = new Response();

export const getSuites = (companyId, teamId) => {
  return Promise.resolve(response.getDataSuccess(suits))
};

export const getCases = (companyId, teamId) => {
  return Promise.resolve(response.getDataSuccess(cases))
};