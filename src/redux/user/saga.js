import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { setCompanyToken, clearCompanyToken, getCompanyToken } from '../../helpers/utility';
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
      const data = yield call(SWQAClient.agencyLogin, payload);
      yield put(actions.receiveAgencyLogin(data));
    } catch (e) {
      console.log(e);
    }
  });
}

export function* agencyLoginSuccess() {
  yield takeEvery(actions.SUCCESS_AGENCY_LOGIN, function* ({ payload, history }) {
    if (payload) {
      console.log(payload);
      const { token } = payload;
      yield setCompanyToken(token);
      if (history) {
        history.push('/dashboard');
      }
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(requestMyAgencies),
    fork(errorMyAgencies),
    fork(requestAgencyLogin),
    fork(agencyLoginSuccess),
  ]);
}
