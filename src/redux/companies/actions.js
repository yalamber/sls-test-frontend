import {
  COMPANIES_LIST_DID_MOUNT,
  COMPANIES_LIST_FETCH,
  COMPANIES_LIST_SUCCESS,
  COMPANIES_LIST_ERROR,
  COMPANIES_LIST_DONE
} from "../constants";

export const companiesListDidMount = () => ({
  type: COMPANIES_LIST_DID_MOUNT
});

export const companiesListFetch = () => ({
  type: COMPANIES_LIST_FETCH
});

export const companiesListSuccess = (payload = {}) => ({
  type: COMPANIES_LIST_SUCCESS,
  payload
});

export const companiesListError = (payload = {}) => ({
  type: COMPANIES_LIST_ERROR,
  payload
});

export const companiesListDone = (payload = {}) => ({
  type: COMPANIES_LIST_DONE,
  payload
});
