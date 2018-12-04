import {
  AGENCIES_LIST_DID_MOUNT,
  AGENCIES_LIST_FETCH,
  AGENCIES_LIST_SUCCESS,
  AGENCIES_LIST_ERROR,
  AGENCIES_LIST_DONE
} from "../constants";
import { getDefaultPageSize } from '@utils/default-objects';

const ROW_COUNT = getDefaultPageSize();
const initState = { error: null, loading: false, count: ROW_COUNT, rows: [] };

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case AGENCIES_LIST_DID_MOUNT:
      return state;
    case AGENCIES_LIST_FETCH:
      return {
        ...state,
        loading: true
      };
    case AGENCIES_LIST_DONE:
      const {
        payload: { loading = null }
      } = action;
      return {
        ...state,
        loading: loading === null ? false : loading
      };
    case AGENCIES_LIST_SUCCESS:
      const {
        payload: { rows = [], count = ROW_COUNT }
      } = action;

      return {
        ...state,
        rows,
        count
      };
    case AGENCIES_LIST_ERROR:
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
