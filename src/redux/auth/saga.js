import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { setToken, getToken, clearToken } from '../../helpers/utility';
import actions from './actions';
import {signIn} from "../../helpers/http-api-client";
import notification from '../../components/notification';

export function* loginRequest() {
  try{
    yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
      const { history, userInfo } = payload;
      try{
        const result = yield call(signIn, userInfo);
        if (result && result.data && result.data.token) {
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
      } catch(e) {
        notification('error', 'login failed');
        yield put({ type: actions.LOGIN_ERROR });
      }
    });
  } catch(e) {
    console.log(e);
    notification('error', 'Server error');
  }
}

export function* loginSuccess() {
  try{
    yield takeEvery(actions.LOGIN_SUCCESS, function*({payload, history}) {
      if(payload) {
        yield setToken(payload.token);
        if (history) {
          history.push('/dashboard');
        }
      }
    });
  } catch(e) {
    console.log(e);
    notification('error', 'Server error');
  }
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
