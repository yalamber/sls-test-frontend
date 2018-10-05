import Response from "../helpers/Response";
import {post, get} from "../helpers/http";

import {cases} from "../helpers/dummyData";

let response = new Response();

export const getSuites = (companyId, teamId) => {
  return get('test/suite', {clientTeamId: teamId});
};
export const addSuite = (formData) => {
  return post('test/suite', formData);
};

export const getCases = (companyId, teamId) => {
  return Promise.resolve(response.getDataSuccess(cases))
};