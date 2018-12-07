import actions from './actions';
const ROLE_PAGE_SIZE_DEFAULT = 5;
//TODO separate current agency, agency users and teams reducers
const initState = {
  list: {
    loading: true,
    error: null,
    rows: [],
    paginationOptions: {
      current: 1,
      pageSize: ROLE_PAGE_SIZE_DEFAULT,
      total: 0
    }
  },
  currentAgency: {
    loading: true,
    error: null,
    agencyData: {
      name: ''
    },
    teamList: {
      loading: true,
      error: null,
      rows: [],
      paginationOptions: {
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
        current: 1,
        pageSize: ROLE_PAGE_SIZE_DEFAULT,
        total: 0
      }
    }
  },
  agencyUserRoles: {
    loading: true,
    error: null,
    rows: []
  },
  currentAgencyUser: {
    loading: true,
    error: null,
    data: {}
  }
};

export default function agencyReducer(state = initState, action) {
  switch (action.type) {
    //agency list
    case actions.REQUEST_AGENCY_LIST:
      return  {
        ...state,
        list: initState.list
      }
    case actions.RECEIVE_AGENCY_LIST:
      let {
        payload: { agencyListData = { rows: [], count: 0, paginationOptions: { current: 1 } } }
      } = action;
      return {
        ...state,
        list: {
          ...state.list,
          rows: agencyListData.rows,
          loading: false,
          error: null,
          paginationOptions: {
            ...state.list.paginationOptions,
            total: agencyListData.count,
            current: agencyListData.paginationOptions.current
          }
        },
      };
    case actions.ERROR_AGENCY_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: action.error
        },
      };
    //current agency
    case actions.CLEAR_CURRENT_AGENCY: 
      return  {
        ...state,
        currentAgency: initState.currentAgency
      };
    case actions.REQUEST_CURRENT_AGENCY:
      return {
        ...state,
        currentAgency: initState.currentAgency,
      };
    case actions.RECEIVE_CURRENT_AGENCY:
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          loading: false,
          error: null,
          agencyData: action.agencyData
        }
      };
    case actions.ERROR_CURRENT_AGENCY:
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          loading: false,
          error: action.error
        }
      };
    //agency user list
    case actions.REQUEST_AGENCY_USER_LIST:
      return  {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          userList: initState.currentAgency.userList,
        }
      };
    case actions.RECEIVE_AGENCY_USER_LIST:
      let {
        payload: { userListData = { rows: [], count: 0, paginationOptions: { current: 1 }} }
      } = action;
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          userList: {
            ...state.currentAgency.userList,
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
    case actions.ERROR_AGENCY_USER_LIST:
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          userList: {
            ...state.currentAgency.userList,
            loading: false,
            error: action.error,
          }
        }
      };
    //current agency
    case actions.CLEAR_CURRENT_AGENCY_USER: 
      return  {
        ...state,
        currentAgencyUser: initState.currentAgencyUser
      };
    case actions.REQUEST_CURRENT_AGENCY_USER: 
      return  {
        ...state,
        currentAgencyUser: initState.currentAgencyUser
      };
    case actions.RECEIVE_CURRENT_AGENCY_USER:
      return  {
        ...state,
        currentAgencyUser: {
          error: null,
          loading: false,
          data: action.userData
        }
      };
    case actions.ERROR_CURRENT_AGENCY_USER:
      return {
        ...state,
        currentAgencyUser: {
          ...state.currentAgencyUser,
          error: action.error,
          loading: false,
        }
      };
    //roles
    case actions.REQUEST_AGENCY_USER_ROLES:
      return  {
        ...state,
        agencyUserRoles: initState.agencyUserRoles
      };
    case actions.RECEIVE_AGENCY_USER_ROLES:
      return  {
        ...state,
        agencyUserRoles: {
          error: null,
          loading: false,
          rows: action.roles
        }
      };
    case actions.ERROR_AGENCY_USER_ROLES:
      return {
        ...state,
        agencyUserRoles: {
          ...state.agencyUserRoles,
          error: action.error,
          loading: false,
        }
      };
    //create agency user
    case actions.REQUEST_CREATE_AGENCY_USER:
      return {
        ...state,
        currentAgencyUser: initState.currentAgencyUser
      };
    case actions.RECEIVE_CREATE_AGENCY_USER:
      return {
        ...state,
        currentAgencyUser: {
          loading: false, 
          error: null,
          data: action.membership
        }
      };  
    case actions.ERROR_CREATE_AGENCY_USER:
      return {
        ...state,
        currentAgencyUser: {
          ...state.currentAgencyUser,
          error: action.error,
          loading: false,
        }
      };
    
    //agency Team list
    case actions.REQUEST_AGENCY_TEAM_LIST:
      return  {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          teamList: initState.currentAgency.teamList,
        }
      };
    case actions.RECEIVE_AGENCY_TEAM_LIST:
      let {
        payload: { teamListData = { rows: [], count: 0, paginationOptions: { current: 1 }} }
      } = action;
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          teamList: {
            ...state.currentAgency.teamList,
            rows: teamListData.rows,
            loading: false,
            error: null,
            paginationOptions: {
              ...state.list.paginationOptions,
              total: teamListData.count,
              current: teamListData.paginationOptions.current
            }
          }
        }
      };
    case actions.ERROR_AGENCY_TEAM_LIST:
      return {
        ...state,
        currentAgency: {
          ...state.currentAgency,
          teamList: {
            ...state.currentAgency.teamList,
            loading: false,
            error: action.error,
          }
        }
      };
    default:
      return state;
  }
}
