import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { setToken, getToken, clearToken } from '../../helpers/utility';
import actions from './actions';
import {signIn} from "../../actions/userAction";
import notification from '../../components/notification';



export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { history, userInfo } = payload;
    const result = yield call(signIn, userInfo);
    if (result.data && result.data.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: result.data,
        token: result.data.token,
        history
      });
    } else {
      notification('error', 'login failed');
      yield put({ type: actions.LOGIN_ERROR });
    }

  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*({ payload, history }) {
    yield setToken(payload.token);
    if (history) {
      history.push('/dashboard');
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile'
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
