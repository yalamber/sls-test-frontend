import {
  AGENCIES_LIST_DID_MOUNT,
  AGENCIES_LIST_FETCH,
  AGENCIES_LIST_SUCCESS,
  AGENCIES_LIST_ERROR,
  AGENCIES_LIST_DONE
} from "../constants";

export const agenciesListDidMount = () => ({
  type: AGENCIES_LIST_DID_MOUNT
});

export const agenciesListFetch = (payload = {}) => ({
  type: AGENCIES_LIST_FETCH,
  payload
});

export const agenciesListSuccess = (payload = {}) => ({
  type: AGENCIES_LIST_SUCCESS,
  payload
});

export const agenciesListError = (payload = {}) => ({
  type: AGENCIES_LIST_ERROR,
  payload
});

export const agenciesListDone = (payload = {}) => ({
  type: AGENCIES_LIST_DONE,
  payload
});
