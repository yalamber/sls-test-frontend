import {
  COMPANIES_USERS_LIST_DID_MOUNT,
  COMPANIES_USERS_LIST_FETCH,
  COMPANIES_USERS_LIST_SUCCESS,
  COMPANIES_USERS_LIST_ERROR,
  COMPANIES_USERS_LIST_DONE
} from "../../constants";

export const companiesUsersListDidMount = (payload = {}) => ({
  type: COMPANIES_USERS_LIST_DID_MOUNT,
  payload
});

export const companiesUsersListFetch = (payload = {}) => ({
  type: COMPANIES_USERS_LIST_FETCH,
  payload
});

export const companiesUsersListSuccess = (payload = {}) => ({
  type: COMPANIES_USERS_LIST_SUCCESS,
  payload
});

export const companiesUsersListError = (payload = {}) => ({
  type: COMPANIES_USERS_LIST_ERROR,
  payload
});

export const companiesUsersListDone = (payload = {}) => ({
  type: COMPANIES_USERS_LIST_DONE,
  payload
});
