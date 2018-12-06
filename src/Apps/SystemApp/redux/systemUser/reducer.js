import actions from './actions';
const SYSTEM_USER_PAGE_SIZE_DEFAULT = 5;

const initState = {
  list: {
    loading: true,
    error: null,
    rows: [],
    paginationOptions: {
      defaultCurrent: 1,
      current: 1,
      pageSize: SYSTEM_USER_PAGE_SIZE_DEFAULT,
      total: 0
    }
  },
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.REQUEST_SYSTEM_USER_LIST: 
      return  {
        ...state,
        list: {
          ...state.list,
          loading: true
        }
      }
    case actions.RECEIVE_SYSTEM_USER_LIST:
      const {
        payload: { data = { rows: [], count: 0 }, paginationOptions = { current: 1 } }
      } = action;
      return {
        ...state,
        list: {
          ...state.list,
          rows: data.rows,
          loading: false,
          error: null,
          paginationOptions: {
            ...state.list.paginationOptions,
            total: data.count,
            current: paginationOptions.current
          }
        },
      };
    case actions.ERROR_SYSTEM_USER_LIST:
      return {
        ...state,
        list: {
          data: [],
          loading: false,
          error: action.error
        },
      };
    default:
      return state;
  }
}
