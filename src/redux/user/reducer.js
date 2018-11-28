import actions from './actions';

const initState = { 
  myAgencies: {
    loading: true,
    error: false,
    data: []
  },
  myCompanies: {
    loading: true,
    error: false,
    data: []
  }, 
  activeAccount: null 
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
        }
      };
    case actions.ERROR_MY_AGENCIES:
      return { 
        ...state, 
        myAgencies: {
          data: [], 
          loading: false, 
          error: true
        }
      };
    case actions.RECEIVE_MY_COMPANIES:
      return { ...state, myCompanies: action.payload, myCompaniesLoading: false };
    default:
      return state;
  }
}
