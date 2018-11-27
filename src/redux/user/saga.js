import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import actions from './actions';
import SWQAClient from "../../helpers/apiClient";

export function* getMyAgencies() {
  yield takeEvery('REQUEST_MY_AGENCIES', function* ({ payload }) {
    try {
      // do api call
      const data = yield call(SWQAClient.getMyAgencies);
      yield put(actions.receiveMyAgencies(data.rows));
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getMyAgencies),
  ]);
}
