import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import jwtDecode from "jwt-decode";
import { 
  setUserToken, 
  clearUserToken, 
  getUserToken, 
  clearCompanyToken 
} from '@helpers/utility';
import SWQAClient from '@helpers/apiClient';
import notification from '@components/notification';
import actions from './actions';
import myActions from '../my/actions';

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
          userTokenData: jwtDecode(result.token),
          history
        });
      } else {
        notification('error', 'login failed');
        yield put({ type: actions.LOGIN_ERROR });
      }
    } catch (e) {
      notification('error', 'login failed');
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* ({payload, history, userTokenData}) {
    if (payload) {
      const { token } = payload;
      yield setUserToken(token);
      if (history && history.push) {
        //get token data then redirect to proper locaton
        if(userTokenData && userTokenData.systemRole) {
          yield put({
            type: myActions.SWITCH_SYSTEM_ADMIN
          });
          history.push('/admin');
        } else {
          history.push('/my');
        }
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
    yield put({
      type: myActions.RESET_MY_DATA
    })
    yield put(push('/'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    try {
      const token = getUserToken();
      if (token) {
        //TODO: check token expiry
        const userTokenData = jwtDecode(token);
        const expiredAt = userTokenData.expiredAt || userTokenData.exp * 1000;
        if (expiredAt > new Date().getTime()) {
          yield put({
            type: actions.LOGIN_SUCCESS,
            payload: { token },
            token,
            userTokenData
          });
          if(userTokenData.systemRole) {
            yield put({
              type: myActions.SWITCH_SYSTEM_ADMIN
            });
          }
        } else {
          yield put(actions.logout());
        }
      } else {
        yield put(actions.logout());
      }
    } catch (e) {
      yield put({ type: actions.LOGIN_ERROR });
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
