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
      yield put(actions.receiveClients({
        clientListData: data,
        paginationOptions: {
          current: payload.page
        }
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

export default function* rootSaga() {
  yield all([
    fork(requestClientList),
    fork(errorClientList),
  ]);
}
