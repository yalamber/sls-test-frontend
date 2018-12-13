import {
  COMPANIES_TEST_MANAGER_LIST_DID_MOUNT
} from "../../constants";

import { getDefaultPageSize } from '../../util/default-objects';
const ROW_COUNT = getDefaultPageSize();
const initState = { error: null, loading: false, count: ROW_COUNT, rows: [] };

export default function companiesTestManagerReducer(state = initState, action) {
  switch (action.type) {
    case COMPANIES_TEST_MANAGER_LIST_DID_MOUNT:
      return state;
    default:
      return state;
  }
}
