import actions from "./actions";
import {
  COMPANIES_LIST_DID_MOUNT,
  COMPANIES_LIST_FETCH,
  COMPANIES_LIST_SUCCESS,
  COMPANIES_LIST_ERROR,
  COMPANIES_LIST_DONE
} from "../constants";

const initState = { error: null, loading: false, count: 5, rows: [] };
const ROW_COUNT = initState.count;

export default function companiesReducer(state = initState, action) {
  switch (action.type) {
    case COMPANIES_LIST_DID_MOUNT:
      return state;
    case COMPANIES_LIST_FETCH:
      return {
        ...state,
        loading: true
      }
    case COMPANIES_LIST_DONE:
      const { payload: { loading = null } } = action;
      return {
        ...state,
        loading: loading === null ? false : loading
      }
    case COMPANIES_LIST_SUCCESS:
    console.log("disp!", action)
      const { payload: { rows = [], count = ROW_COUNT } } = action;

      return {
        ...state,
        rows,
        count
      };
    case COMPANIES_LIST_ERROR:
      const { payload: { error = null } } = action;
      return {
        ...state,
        error
      }
    default:
      return state;
  }
}
