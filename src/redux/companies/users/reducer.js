import actions from "./actions";
import {
  COMPANIES_USERS_LIST_DID_MOUNT,
  COMPANIES_USERS_LIST_FETCH,
  COMPANIES_USERS_LIST_SUCCESS,
  COMPANIES_USERS_LIST_ERROR,
  COMPANIES_USERS_LIST_DONE
} from "../../constants";

import { getDefaultPageSize } from "../../../util/default-objects";
const ROW_COUNT = getDefaultPageSize();
const initState = { error: null, loading: false, count: ROW_COUNT, rows: [] };

export default function companiesUsersReducer(state = initState, action) {
  switch (action.type) {
    case COMPANIES_USERS_LIST_DID_MOUNT:
      return state;
    case COMPANIES_USERS_LIST_FETCH:
      return {
        ...state,
        loading: true
      };
    case COMPANIES_USERS_LIST_DONE:
      const {
        payload: { loading = null }
      } = action;
      return {
        ...state,
        loading: loading === null ? false : loading
      };
    case COMPANIES_USERS_LIST_SUCCESS:
      const {
        payload: { rows = [], count = ROW_COUNT }
      } = action;

      return {
        ...state,
        rows,
        count
      };
    case COMPANIES_USERS_LIST_ERROR:
      const {
        payload: { error = null }
      } = action;
      return {
        ...state,
        error
      };
    default:
      return state;
  }
}
