import Response from "../helpers/Response";
import {suits} from "../helpers/dummyData";

let response = new Response();

export const getSuites = (companyId, teamId) => {
  return Promise.resolve(response.getDataSuccess(suits))
};