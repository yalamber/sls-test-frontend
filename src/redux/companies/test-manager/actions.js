import {
  COMPANIES_TEST_MANAGER_LIST_DID_MOUNT,
  COMPANIES_TEST_MANAGER_LIST_FETCH,
  COMPANIES_TEST_MANAGER_LIST_SUCCESS,
  COMPANIES_TEST_MANAGER_LIST_ERROR,
  COMPANIES_TEST_MANAGER_LIST_DONE
} from "../../constants";

export const companiesTestManagerListDidMount = () => ({
  type: COMPANIES_TEST_MANAGER_LIST_DID_MOUNT
});

export const companiesTestManagerListFetch = (payload = {}) => ({
  type: COMPANIES_TEST_MANAGER_LIST_FETCH,
  payload
});

export const companiesTestManagerListSuccess = (payload = {}) => ({
  type: COMPANIES_TEST_MANAGER_LIST_SUCCESS,
  payload
});

export const companiesTestManagerListError = (payload = {}) => ({
  type: COMPANIES_TEST_MANAGER_LIST_ERROR,
  payload
});

export const companiesTestManagerListDone = (payload = {}) => ({
  type: COMPANIES_TEST_MANAGER_LIST_DONE,
  payload
});
