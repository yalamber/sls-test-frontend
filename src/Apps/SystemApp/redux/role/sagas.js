import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//agency
export function* requestRoleList() {
  yield takeLatest(actions.REQUEST_ROLE_LIST, function* ({ payload }) {
    try {
      let offset = payload.pageSize * (payload.page - 1);
      const data = yield call(SWQAClient.getRoles, {
        offset,
        limit: payload.pageSize
      });
      yield put(actions.receiveRoles({
        data,
        paginationMeta: {
          current: payload.page
        }
      }));
    } catch (e) {
      yield put({ type: actions.ERROR_ROLE_LIST });
    }
  });
}

export function* errorRoleList() {
  yield takeEvery(actions.ERROR_ROLE_LIST, function*() {

  });
}

export default function* rootSaga() {
  yield all([
    fork(requestRoleList),
    fork(errorRoleList),
  ]);
}
