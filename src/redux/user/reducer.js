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
  activeAccountToken: null 
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
    default:
      return state;
  }
}
