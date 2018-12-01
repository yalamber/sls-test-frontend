import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import { setUserToken, clearUserToken, getUserToken, clearCompanyToken } from '../../helpers/utility';
import actions from './actions';
import SWQAClient from "../../helpers/apiClient";
import notification from '../../components/notification';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { history, userInfo } = payload;
    try {
      const result = yield call(SWQAClient.signIn, userInfo);
      if (get(result, 'token', false)) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          payload: result,
          token: result.token,
          history
        });
      } else {
        notification('error', 'login failed');
        yield put({ type: actions.LOGIN_ERROR });
      }
    } catch (e) {
      console.log(e);
      notification('error', 'login failed');
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* ({ payload, history }) {
    if (payload) {
      const { token } = payload;
      yield setUserToken(token);
      if (history) {
        history.push('/dashboard');
      }
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    clearUserToken();
    clearCompanyToken();
    yield put(push('/'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getUserToken();
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: { token },
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
