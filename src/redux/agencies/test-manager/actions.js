import {
  AGENCIES_TEST_MANAGER_LIST_DID_MOUNT,
  AGENCIES_TEST_MANAGER_LIST_FETCH,
  AGENCIES_TEST_MANAGER_LIST_SUCCESS,
  AGENCIES_TEST_MANAGER_LIST_ERROR,
  AGENCIES_TEST_MANAGER_LIST_DONE
} from "../../constants";

export const agenciesTestManagerListDidMount = () => ({
  type: AGENCIES_TEST_MANAGER_LIST_DID_MOUNT
});

export const agenciesTestManagerListFetch = (payload = {}) => ({
  type: AGENCIES_TEST_MANAGER_LIST_FETCH,
  payload
});

export const agenciesTestManagerListSuccess = (payload = {}) => ({
  type: AGENCIES_TEST_MANAGER_LIST_SUCCESS,
  payload
});

export const agenciesTestManagerListError = (payload = {}) => ({
  type: AGENCIES_TEST_MANAGER_LIST_ERROR,
  payload
});

export const agenciesTestManagerListDone = (payload = {}) => ({
  type: AGENCIES_TEST_MANAGER_LIST_DONE,
  payload
});
