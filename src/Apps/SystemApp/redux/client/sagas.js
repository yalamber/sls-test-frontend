import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//agency
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
      yield put({ type: actions.ERROR_CLIENT_LIST });
    }
  });
}

export function* errorClientList() {
  yield takeEvery(actions.ERROR_CLIENT_LIST, function*() {

  });
}

//current client
export function* requestCurrentClient() {
  yield takeLatest(actions.REQUEST_CURRENT_CLIENT, function* ({ clientId }) {
    try {
      const data = yield call(SWQAClient.getClient, clientId);
      yield put(actions.receiveCurrentClient(data));
    } catch (e) {
      yield put({ type: actions.ERROR_CURRENT_CLIENT });
    }
  });
}

//client user list 
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
      yield put({ type: actions.ERROR_CLIENT_USER_LIST });
    }
  });
}

export function* errorClientUserList() {
  yield takeEvery(actions.ERROR_CLIENT_USER_LIST, function*() {

  });
}

export default function* rootSaga() {
  yield all([
    fork(requestClientList),
    fork(errorClientList),
    fork(requestCurrentClient),
    fork(requestClientUserList),
    fork(errorClientUserList),
  ]);
}
