import actions from './actions';
const ROLE_PAGE_SIZE_DEFAULT = 5;

const initState = {
  list: {
    loading: true,
    error: null,
    rows: [],
    paginationOptions: {
      defaultCurrent: 1,
      current: 1,
      pageSize: ROLE_PAGE_SIZE_DEFAULT,
      total: 0
    }
  },
  currentClient: {}
};

export default function clientReducer(state = initState, action) {
  switch (action.type) {
    case actions.REQUEST_CLIENT_LIST: 
      return  {
        ...state,
        list: {
          ...state.list,
          loading: true
        }
      }
    case actions.RECEIVE_CLIENT_LIST:
      const {
        payload: { data = { rows: [], count: 0 }, paginationMeta = { current: 1 } }
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
            current: paginationMeta.current
          }
        },
      };
    case actions.ERROR_CLIENT_LIST:
      return {
        ...state,
        list: {
          data: [],
          loading: false,
          error: true
        },
      };
    default:
      return state;
  }
}
