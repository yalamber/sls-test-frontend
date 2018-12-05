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
    loading: true,
    error: null,
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
  clientUserRoles: {
    loading: true,
    error: null,
    rows: []
  },
  currentClientUser: {
    loading: true,
    error: null,
    userData: {}
  }
};

export default function clientReducer(state = initState, action) {
  switch (action.type) {
    //client list
    case actions.REQUEST_CLIENT_LIST: 
      return  {
        ...state,
        list: initState.list
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
          ...state.list,
          data: [],
          loading: false,
          error: action.error
        },
      };
    //current client
    case actions.REQUEST_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: initState.currentClient,
      };
    case actions.RECEIVE_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          loading: false,
          error: null,
          clientData: action.clientData
        }
      };
    case actions.ERROR_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          loading: false,
          error: action.error
        }
      };
    //client user list 
    case actions.REQUEST_CLIENT_USER_LIST: 
      return  {
        ...state,
        currentClient: {
          ...state.currentClient,
          userList: initState.currentClient.userList,
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
    case actions.ERROR_CLIENT_USER_LIST: 
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          userList: {
            ...state.currentClient.userList,
            loading: false, 
            error: action.error,
          }
        }
      };
    //current client
    case actions.REQUEST_CURRENT_CLIENT_USER: 
      return  {
        ...state,
        currentClientUser: state.currentClientUser
      };
    case actions.RECEIVE_CURRENT_CLIENT_USER: 
      return  {
        ...state,
        currentClientUser: {
          error: null,
          loading: false,
          userData: action.userData
        }
      };
    case actions.ERROR_CURRENT_CLIENT_USER: 
      return {
        ...state,
        currentClientUser: {
          ...state.currentClientUser,
          error: action.error,
          loading: false,
        }
      };
    //roles
    case actions.REQUEST_CLIENT_USER_ROLES: 
      return  {
        ...state,
        clientUserRoles: initState.clientUserRoles 
      };
    case actions.RECEIVE_CLIENT_USER_ROLES: 
      return  {
        ...state,
        clientUserRoles: {
          error: null,
          loading: false,
          rows: action.roles
        }
      };
    case actions.ERROR_CLIENT_USER_ROLES: 
      return {
        ...state,
        clientUserRoles: {
          ...state.clientUserRoles,
          error: action.error,
          loading: false,
        }
      };
    default:
      return state;
  }
}
