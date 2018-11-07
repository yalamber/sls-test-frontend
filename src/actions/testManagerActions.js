import {post, get, deleteRecord} from "../helpers/http";
//Suite
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
export const deleteSuite = (row) => {
  return deleteRecord('test/suite/' + row.testSuiteId);
};

//cases
export const getCases = (companyId, teamId, suiteId) => {
  return get('test/case?suiteId='+suiteId);
};

export const addTestCase = (formData) => {
  delete formData.company;
  delete formData.team;
  delete formData.title;
  return post('test/case', formData)
};

export const deleteTestCase = (id) => {
  return deleteRecord('test/case/' + id)
};