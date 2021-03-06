import { get } from 'lodash';
import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import jwtDecode from 'jwt-decode';
import { setCompanyToken, getCompanyToken, clearCompanyToken } from '../../helpers/utility';
import actions from './actions';
import SWQAClient from "../../helpers/apiClient";
import notification from '../../components/notification';

//agency
export function* requestMyAgencies() {
  yield takeLatest(actions.REQUEST_MY_AGENCIES, function* ({ payload }) {
    try {
      // do api call
      const data = yield call(SWQAClient.getMyAgencies);
      yield put(actions.receiveMyAgencies(data));
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
  yield takeLatest(actions.REQUEST_AGENCY_LOGIN, function* ({ payload }) {
    try {
      yield put({
        type: actions.REQUEST_APP_SWITCH
      });
      const { history, agencyData } = payload;
      const data = yield call(SWQAClient.agencyLogin, agencyData);
      if (get(data, "token", false)) {
        yield put({
          type: actions.SUCCESS_ACCOUNT_LOGIN,
          payload: data,
          token: data.token,
          activeCompanyTokenData: jwtDecode(data.token),
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
  yield takeLatest(actions.REQUEST_MY_CLIENTS, function* ({ payload }) {
    try {
      // do api call
      const data = yield call(SWQAClient.getMyClients);
      yield put(actions.receiveMyClients(data));
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
  yield takeLatest(actions.REQUEST_CLIENT_LOGIN, function* ({ payload }) {
    try {
      yield put({
        type: actions.REQUEST_APP_SWITCH
      });
      const { history, clientData } = payload;
      const data = yield call(SWQAClient.clientLogin, clientData);
      if (get(data, "token", false)) {
        yield put({
          type: actions.SUCCESS_ACCOUNT_LOGIN,
          payload: data,
          token: data.token,
          activeCompanyTokenData: jwtDecode(data.token),
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
    history,
    activeCompanyTokenData
  }) {
    if (payload) {
      const { token } = payload;
      yield setCompanyToken(token);
      if (history && history.push) {
        if(activeCompanyTokenData.type === 'agencyUser'){
          return history.push("/my-agency");  
        }
        if(activeCompanyTokenData.type === 'clientUser'){
          return history.push("/my-client");  
        }
        if(activeCompanyTokenData.type === 'freelanceUser'){
          return history.push("/freelance");  
        }
        history.push("/my");
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
        token,
        activeCompanyTokenData: jwtDecode(token),
      });
    }
  });
}

export function* switchSystemAdmin() {
  yield takeEvery(actions.SWITCH_SYSTEM_ADMIN, function* ({ payload }) {
    if(payload) {  
      let { history = false } = payload;
      yield clearCompanyToken();
      if (history && history.push) {
        history.push("/admin");
      }
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
    fork(checkActiveAccount),
    fork(switchSystemAdmin),
  ]);
}
