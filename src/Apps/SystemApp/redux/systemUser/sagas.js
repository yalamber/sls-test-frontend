import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//agency
export function* requestSystemUserList() {
  yield takeLatest(actions.REQUEST_SYSTEM_USER_LIST, function* ({ payload }) {
    try {
      let offset = payload.pageSize * (payload.page - 1);
      const params = {
        offset,
        limit: payload.pageSize,
      };
      if(payload.type) {
        params.type = payload.type;
      }
      const data = yield call(SWQAClient.getSystemUsers, params);
      yield put(actions.receiveSystemUsers({
        data,
        paginationOptions: {
          current: payload.page
        }
      }));
    } catch (e) {
      yield put({ type: actions.ERROR_SYSTEM_USER_LIST, error: e });
    }
  });
}

export function* errorSystemUserList() {
  yield takeEvery(actions.ERROR_SYSTEM_USER_LIST, function*() {

  });
}

export default function* rootSaga() {
  yield all([
    fork(requestSystemUserList),
    fork(errorSystemUserList),
  ]);
}
