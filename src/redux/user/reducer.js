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
  activeAppType: 'system',
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.RECEIVE_MY_AGENCIES:
      return {
        ...state,
        myAgencies: {
          data: action.payload && action.payload.length ? action.payload : [],
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
          data: action.payload && action.payload.length ? action.payload : [],
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
      let activeAppType = 'system';
      if(action.activeCompanyTokenData.type === 'clientUser') {
        activeAppType = 'client';
      } else if(action.activeCompanyTokenData.type === 'agencyUser') {
        activeAppType = 'agency';
      }
      return {
        ...state,
        activeCompanyToken: action.token,
        activeCompanyTokenData: action.activeCompanyTokenData,
        activeAppType: activeAppType
      };
    case actions.SWITCH_SYSTEM_ADMIN:
      return { 
        ...state,
        activeCompanyToken: '',
        activeCompanyTokenData: {},
        activeAppType: 'system'
      };  
    default:
      return state;
  }
}
