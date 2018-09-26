import Response from "../helpers/Response";
import {dashboards} from "../helpers/dummyData";

let response = new Response();

export const getDashboards = (companyId) => {
  //API Call here
  let data = dashboards.filter(function(dashboard) {
    return dashboard.companyId === companyId;
  });
  return Promise.resolve(response.getDataSuccess(data))
};