import actions from './actions';

const initState = { 
  myAgencies: {
    loading: true,
    error: false,
    data: []
  },
  myClients: {
    loading: true,
    error: false,
    data: []
  }, 
  activeCompanyToken: null,
  activeCompanyTokenData: {},
  activeSystemAdmin: false,
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.RECEIVE_MY_AGENCIES:
      return { 
        ...state, 
        myAgencies: {
          data: action.payload, 
          loading: false, 
          error: false
        },
      };
    case actions.ERROR_MY_AGENCIES:
      return { 
        ...state, 
        myAgencies: {
          data: [], 
          loading: false, 
          error: true
        },
      };
    case actions.RECEIVE_MY_CLIENTS:
      return { 
        ...state, 
        myClients: {
          data: action.payload, 
          loading: false, 
          error: false
        },
      };
    case actions.ERROR_MY_CLIENTS:
      return { 
        ...state, 
        myClients: {
          data: [], 
          loading: false, 
          error: true
        },
      };
    case actions.SUCCESS_ACCOUNT_LOGIN:
      return { 
        ...state,
        activeCompanyToken: action.token,
        activeCompanyTokenData: action.activeCompanyTokenData,
      };
    case actions.SWITCH_SYSTEM_ADMIN:
      return { 
        ...state,
        activeCompanyToken: '',
        activeCompanyTokenData: {},
        activeSystemAdmin: true
      };  
    default:
      return state;
  }
}
