import actions from './actions';

const initState = { myAgencies: [], myCompanies: [], activeAccount: null };

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.RECEIVE_MY_AGENCIES:
      return { ...state, myAgencies: action.payload };
    case actions.RECEIVE_MY_COMPANIES:
      return { ...state, myCompanies: action.payload };
    default:
      return state;
  }
}
