import { get } from "lodash";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork
} from "redux-saga/effects";
import { setCompanyToken, getCompanyToken } from "../../helpers/utility";
import actions from "./actions";
import {
  getMyAgencies,
  getMyClients,
  agencyLogin,
  clientLogin
} from "../../helpers/http-api-client";
import notification from "../../components/notification";

//agency
export function* requestMyAgencies() {
  yield takeLatest("REQUEST_MY_AGENCIES", function*({ payload }) {
    try {
      // do api call
      const data = yield call(getMyAgencies);
      yield put(actions.receiveMyAgencies(data.rows));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_MY_AGENCIES });
    }
  });
}

export function* errorMyAgencies() {
  yield takeEvery(actions.ERROR_MY_AGENCIES, function*() {});
}

export function* requestAgencyLogin() {
  yield takeLatest("REQUEST_AGENCY_LOGIN", function*({ payload }) {
    try {
      const { history, agencyData } = payload;
      const data = yield call(agencyLogin, agencyData);
      if (get(data, "token", false)) {
        yield put({
          type: actions.SUCCESS_ACCOUNT_LOGIN,
          payload: data,
          token: data.token,
          history
        });
      } else {
        notification("error", "login failed");
        yield put({ type: actions.ERROR_AGENCY_LOGIN });
      }
    } catch (e) {
      notification("error", "Agency login failed");
      yield put({ type: actions.ERROR_AGENCY_LOGIN });
    }
  });
}

export function* errorAgencyLogin() {
  yield takeEvery(actions.ERROR_AGENCY_LOGIN, function*() {});
}

//client
export function* requestMyClients() {
  yield takeLatest("REQUEST_MY_CLIENTS", function*({ payload }) {
    try {
      // do api call
      const data = yield call(getMyClients);
      yield put(actions.receiveMyClients(data.rows));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_MY_CLIENTS });
    }
  });
}

export function* errorMyClients() {
  yield takeEvery(actions.ERROR_MY_CLIENTS, function*() {});
}

export function* requestClientLogin() {
  yield takeLatest("REQUEST_CLIENT_LOGIN", function*({ payload }) {
    try {
      const { history, clientData } = payload;
      const data = yield call(clientLogin, clientData);
      if (get(data, "token", false)) {
        yield put({
          type: actions.SUCCESS_ACCOUNT_LOGIN,
          payload: data,
          token: data.token,
          history
        });
      } else {
        notification("error", "login failed");
        yield put({ type: actions.ERROR_CLIENT_LOGIN });
      }
    } catch (e) {
      notification("error", "Client login failed");
      yield put({ type: actions.ERROR_ClIENT_LOGIN });
    }
  });
}

export function* errorClientLogin() {
  yield takeEvery(actions.ERROR_CLIENT_LOGIN, function*() {});
}

export function* successAccountLogin() {
  yield takeEvery(actions.SUCCESS_ACCOUNT_LOGIN, function*({
    payload,
    history
  }) {
    if (payload) {
      const { token } = payload;
      yield setCompanyToken(token);
      if (history) {
        history.push("/dashboard");
        history.go(0);
      }
    }
  });
}

export function* checkActiveAccount() {
  yield takeEvery(actions.CHECK_ACTIVE_ACCOUNT, function*() {
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
    //agencies
    fork(requestMyAgencies),
    fork(errorMyAgencies),
    fork(requestAgencyLogin),
    fork(errorAgencyLogin),
    //clients
    fork(requestMyClients),
    fork(errorMyClients),
    fork(requestClientLogin),
    fork(errorClientLogin),
    //common
    fork(successAccountLogin),
    fork(checkActiveAccount)
  ]);
}
