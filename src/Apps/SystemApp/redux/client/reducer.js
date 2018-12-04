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
  currentClient: {
    clientData: { 
      name: ''
    },
    teamList: {
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
    userList: {
      loading: true,
      error: null,
      rows: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: ROLE_PAGE_SIZE_DEFAULT,
        total: 0
      }
    }
  },
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
      let {
        payload: { clientListData = { rows: [], count: 0, paginationOptions: { current: 1 } } }
      } = action;
      return {
        ...state,
        list: {
          ...state.list,
          rows: clientListData.rows,
          loading: false,
          error: null,
          paginationOptions: {
            ...state.list.paginationOptions,
            total: clientListData.count,
            current: clientListData.paginationOptions.current
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
    case actions.RECEIVE_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          clientData: action.clientData
        }
      };
    case actions.REQUEST_CLIENT_USER_LIST: 
      return  {
        ...state,
        currentClient: {
          ...state.currentClient,
          userList: {
            ...state.currentClient.userList,
            loading: true
          }
        }
      };
    case actions.RECEIVE_CLIENT_USER_LIST:
      let {
        payload: { userListData = { rows: [], count: 0, paginationOptions: { current: 1 }} }
      } = action;
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          userList: {
            ...state.currentClient.userList,
            rows: userListData.rows,
            loading: false,
            error: null,
            paginationOptions: {
              ...state.list.paginationOptions,
              total: userListData.count,
              current: userListData.paginationOptions.current
            }
          }
        }
      };
    default:
      return state;
  }
}
