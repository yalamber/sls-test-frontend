// import { get } from 'lodash';
import { all, call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
// import SWQAClient from '@helpers/apiClient';
// import notification from '@components/notification';
import { COMPANIES_LIST_DID_MOUNT, COMPANIES_LIST_FETCH } from '@redux/constants';
import { getCompany } from '@helpers/http-api-client';
import { getDefaultPaginationOptions } from '@utils/default-objects';
import * as actions from './actions';

export function* companiesListDidMountFork() {
  yield takeLatest(COMPANIES_LIST_DID_MOUNT, function* ({ payload }) {
    yield put(actions.companiesListFetch(getDefaultPaginationOptions()));
  });
}

export function* companiesListFetchFork() {
  yield takeLatest(COMPANIES_LIST_FETCH, function* ({ payload }) {
    try {
      const data = yield call(getCompany, payload);
      yield put(actions.companiesListSuccess(data));
      yield put(actions.companiesListDone());
    } catch (e) {
      console.log(e);
      yield put(actions.companiesListError(e));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(companiesListDidMountFork),
    fork(companiesListFetchFork)
  ]);
}
