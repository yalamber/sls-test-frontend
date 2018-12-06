import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//request client saga
export function* requestClientList() {
  yield takeLatest(actions.REQUEST_CLIENT_LIST, function* ({ payload }) {
    try {
      let offset = payload.pageSize * (payload.page - 1);
      const data = yield call(SWQAClient.getClients, {
        offset,
        limit: payload.pageSize
      });
      data.paginationOptions = {
        current: payload.page
      };
      yield put(actions.receiveClients({
        clientListData: data
      }));
    } catch (e) {
      yield put({ type: actions.ERROR_CLIENT_LIST, error: e });
    }
  });
}
//error client list saga
export function* errorClientList() {
  yield takeEvery(actions.ERROR_CLIENT_LIST, function*({ error }) {
    //TODO make log when error
  });
}

//request current client
export function* requestCurrentClient() {
  yield takeLatest(actions.REQUEST_CURRENT_CLIENT, function* ({ clientId }) {
    try {
      const data = yield call(SWQAClient.getClient, clientId);
      yield put(actions.receiveCurrentClient(data));
    } catch (e) {
      yield put({ type: actions.ERROR_CURRENT_CLIENT, error: e });
    }
  });
}

//error current client
export function* errorCurrentClient() {
  yield takeEvery(actions.ERROR_CURRENT_CLIENT, function*({ error }) {
    //TODO make log when error
  });
}

//request client user list 
export function* requestClientUserList() {
  yield takeLatest(actions.REQUEST_CLIENT_USER_LIST, function* ({ clientId, options }) {
    try {
      let offset = options.pageSize * (options.page - 1);
      const data = yield call(SWQAClient.getClientUsers, clientId, {
        offset,
        limit: options.pageSize
      });
      data.paginationOptions = {
        current: options.page
      };
      yield put(actions.receiveClientUsers({
        userListData: data
      }));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_CLIENT_USER_LIST, error: e });
    }
  });
}
//error client user list
export function* errorClientUserList() {
  yield takeEvery(actions.ERROR_CLIENT_USER_LIST, function*() {

  });
}

//request current client user
export function* requestCurrentClientUser() {
  yield takeLatest(actions.REQUEST_CURRENT_CLIENT_USER, function* ({ userId }) {
    try {
      const data = yield call(SWQAClient.getUser, userId);
      yield put(actions.receiveCurrentClientUser(data));
    } catch (e) {
      yield put({ type: actions.ERROR_CURRENT_CLIENT_USER, error: e });
    }
  });
}

//error current client
export function* errorCurrentClientUser() {
  yield takeEvery(actions.ERROR_CURRENT_CLIENT_USER, function*({ error }) {
    //TODO make log when error
  });
}

//request client roles
export function* requestClientRoles() {
  yield takeLatest(actions.REQUEST_CLIENT_USER_ROLES, function* ({ payload }) {
    try {
      const data = yield call(SWQAClient.getRoles, {
        offset: 0,
        limit: 10,
        type: 'clientUser',
      });
      yield put(actions.receiveClientUserRoles(data.rows));
    } catch (e) {
      yield put({ type: actions.ERROR_CLIENT_USER_ROLES, error: e });
    }
  });
}

//error client roles list
export function* errorClientRoles() {
  yield takeEvery(actions.ERROR_CLIENT_USER_ROLES, function*() {

  });
}



export default function* rootSaga() {
  yield all([
    fork(requestClientList),
    fork(errorClientList),

    fork(requestCurrentClient),
    fork(errorCurrentClient),
    
    fork(requestClientUserList),
    fork(errorClientUserList),
    
    fork(requestCurrentClientUser),
    fork(errorCurrentClientUser),

    fork(requestClientRoles),
    fork(errorClientRoles),
  ]);
}
