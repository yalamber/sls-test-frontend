import { get } from 'lodash';
import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { setCompanyToken, getCompanyToken } from '../../helpers/utility';
import actions from './actions';
import SWQAClient from "../../helpers/apiClient";
import notification from '../../components/notification';

export function* requestMyAgencies() {
  yield takeLatest('REQUEST_MY_AGENCIES', function* ({ payload }) {
    try {
      // do api call
      const data = yield call(SWQAClient.getMyAgencies);
      yield put(actions.receiveMyAgencies(data.rows));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_MY_AGENCIES });
    }
  });
}

export function* errorMyAgencies() {
  yield takeEvery(actions.ERROR_MY_AGENCIES, function* () { });
}

export function* requestAgencyLogin() {
  yield takeLatest('REQUEST_AGENCY_LOGIN', function* ({ payload }) {
    try {
      const { history, agencyData } = payload;
      const data = yield call(SWQAClient.agencyLogin, agencyData);
      if (get(data, 'token', false)) {
        yield put({
          type: actions.SUCCESS_ACCOUNT_LOGIN,
          payload: data,
          token: data.token,
          history
        });
      } else {
        notification('error', 'login failed');
        yield put({ type: actions.ERROR_AGENCY_LOGIN });
      }
    } catch (e) {
      notification('error', 'Agency login failed');
      yield put({ type: actions.ERROR_AGENCY_LOGIN });
    }
  });
}

export function* successAccountLogin() {
  yield takeEvery(actions.SUCCESS_ACCOUNT_LOGIN, function* ({ payload, history }) {
    if (payload) {
      const { token } = payload;
      yield setCompanyToken(token);
      if (history) {
        history.push('/dashboard');
        history.go(0);
      }
    }
  });
}

export function* errorAgencyLogin() {
  yield takeEvery(actions.ERROR_AGENCY_LOGIN, function* () { });
}

export function* checkActiveAccount() {
  yield takeEvery(actions.CHECK_ACTIVE_ACCOUNT, function* () {
    const token = getCompanyToken();
    if (token) {
      yield put({
        type: actions.SUCCESS_ACCOUNT_LOGIN,
        payload: { token },
        token
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(requestMyAgencies),
    fork(errorMyAgencies),
    fork(requestAgencyLogin),
    fork(successAccountLogin),
    fork(errorAgencyLogin),
    fork(checkActiveAccount),
  ]);
}
