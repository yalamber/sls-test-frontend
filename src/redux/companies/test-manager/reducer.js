import actions from "./actions";
import {
  COMPANIES_TEST_MANAGERLIST_DID_MOUNT,
  COMPANIES_TEST_MANAGERLIST_FETCH,
  COMPANIES_TEST_MANAGERLIST_SUCCESS,
  COMPANIES_TEST_MANAGERLIST_ERROR,
  COMPANIES_TEST_MANAGERLIST_DONE
} from "../../constants";

import { getDefaultPageSize } from '../../util/default-objects';
const ROW_COUNT = getDefaultPageSize();
const initState = { error: null, loading: false, count: ROW_COUNT, rows: [] };

export default function companiesTestManagerReducer(state = initState, action) {
  switch (action.type) {
    case COMPANIES_TEST_MANAGERLIST_DID_MOUNT:
      return state;
    default:
      return state;
  }
}
