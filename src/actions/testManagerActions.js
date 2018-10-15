import Response from "../helpers/Response";
import {post, get} from "../helpers/http";

import {cases} from "../helpers/dummyData";

let response = new Response();

export const getSuites = (clientId = null, clientTeamId = null) => {
  if (clientId) {
    return get('test/suite', {clientId});
  } else if (clientTeamId) {
    return get('test/suite', {clientTeamId});
  }
  return Promise.resolve({});
};
export const addSuite = (formData) => {
  return post('test/suite', formData);
};

export const getCases = (companyId, teamId) => {
  return Promise.resolve(response.getDataSuccess(cases))
};