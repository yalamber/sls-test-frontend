// import { get } from 'lodash';
import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import * as actions from './actions';
// import SWQAClient from "../../helpers/apiClient";
// import notification from '../../components/notification';
import { AGENCIES_LIST_DID_MOUNT, AGENCIES_LIST_FETCH } from '../../redux/constants';
import { getAgency } from '../../helpers/http-api-client';
import { getDefaultPaginationOptions } from '../../util/default-objects';

export function* agenciesListDidMountFork() {
  yield takeLatest(AGENCIES_LIST_DID_MOUNT, function* ({ payload }) {
    yield put(actions.agenciesListFetch(getDefaultPaginationOptions()));
  });
}

export function* agenciesListFetchFork() {
  yield takeLatest(AGENCIES_LIST_FETCH, function* ({ payload }) {
    try {
      const data = yield call(getAgency, payload);
      yield put(actions.agenciesListSuccess(data.data));
      yield put(actions.agenciesListDone());
    } catch (e) {
      console.log(e);
      yield put(actions.agenciesListError(e));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(agenciesListDidMountFork),
    fork(agenciesListFetchFork)
  ]);
}
