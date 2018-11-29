// import { get } from 'lodash';
import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { setCompanyToken, getCompanyToken } from '../../helpers/utility';
import * as actions from './actions';
// import SWQAClient from "../../helpers/apiClient";
// import notification from '../../components/notification';
import { COMPANIES_LIST_DID_MOUNT } from '../../redux/constants';
import { getCompany } from '../../helpers/http-api-client';

export function* companiesListDidMount() {
  yield takeLatest(COMPANIES_LIST_DID_MOUNT, function* ({ payload }) {
    try {
      // do api call
      yield put(actions.companiesListFetch());
      const data = yield call(getCompany);
      yield put(actions.companiesListSuccess(data.data));
      yield put(actions.companiesListDone());
    } catch (e) {
      console.log(e);
      // yield put({ type: actions.ERROR_MY_AGENCIES });
      yield put(actions.companiesListError());
    }
  });
}

/*export function* errorMyAgencies() {
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
*/
export default function* rootSaga() {
  yield all([
    fork(companiesListDidMount)
  ]);
}
