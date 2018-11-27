import actions from './actions';

const initState = { userToken: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, userToken: action.token };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
