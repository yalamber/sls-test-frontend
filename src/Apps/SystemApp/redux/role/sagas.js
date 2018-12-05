import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//agency
export function* requestRoleList() {
  yield takeLatest(actions.REQUEST_ROLE_LIST, function* ({ payload }) {
    try {
      let offset = payload.pageSize * (payload.page - 1);
      const params = {
        offset,
        limit: payload.pageSize,
      };
      if(payload.type) {
        params.type = payload.type;
      }
      const data = yield call(SWQAClient.getRoles, params);
      yield put(actions.receiveRoles({
        data,
        paginationOptions: {
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
