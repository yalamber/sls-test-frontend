import actions from './actions';

const initState = { userToken: null, userTokenData: {}, loginProcessing: false };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST: 
      return { ...state, loginProcessing: true};
    case actions.LOGIN_SUCCESS:
      return { ...state, userToken: action.token, userTokenData: action.userTokenData, loginProcessing: false }; 
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
