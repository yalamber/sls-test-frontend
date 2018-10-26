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
export const getCases = (companyId, teamId) => {
  return get('test/suite/1/case')
};

export const addTestCase = (formData) => {
  delete formData.company;
  delete formData.team;
  delete formData.title;
  return post('test/suite/case', formData)
};

export const deleteTestCase = (id) => {
  return deleteRecord('test/suite/case/' + id)
};