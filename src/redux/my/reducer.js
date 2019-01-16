import { get } from 'lodash';
import actions from './actions';

const initState = {
  myAgencies: {
    count: 0,
    loading: true,
    error: false,
    data: []
  },
  myClients: {
    count: 0,
    loading: true,
    error: false,
    data: []
  },
  activeCompanyToken: null,
  activeCompanyTokenData: {},
  activeAppType: 'global',
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.RECEIVE_MY_AGENCIES:
      return {
        ...state,
        myAgencies: {
          count: get(action, 'payload.count', []),
          data: get(action, 'payload.rows', []),
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
          count: get(action, 'payload.count', []),
          data: get(action, 'payload.rows', []),
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
    case actions.REQUEST_APP_SWITCH:
      return {
        ...state,
        appSwitching: true,
      };
    case actions.SUCCESS_ACCOUNT_LOGIN:
      let activeAppType = 'global';
      if(action.activeCompanyTokenData.type === 'clientUser') {
        activeAppType = 'client';
      } else if(action.activeCompanyTokenData.type === 'agencyUser') {
        activeAppType = 'agency';
      }
      return {
        ...state,
        activeCompanyToken: action.token,
        activeCompanyTokenData: action.activeCompanyTokenData,
        activeAppType: activeAppType,
        appSwitching: false,
      };
    case actions.SWITCH_SYSTEM_ADMIN:
      return { 
        ...state,
        activeCompanyToken: '',
        activeCompanyTokenData: {},
        activeAppType: 'system',
        appSwitching: false,
      };  
    case actions.RESET_MY_DATA:
      return initState;
    default:
      return state;
  }
}
