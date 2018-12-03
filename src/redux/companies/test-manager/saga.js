// import { get } from 'lodash';
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork
} from "redux-saga/effects";
import * as companyActions from "../actions";
import * as companyTestManagerActions from "./actions";
// import SWQAClient from "../../helpers/apiClient";
// import notification from '../../components/notification';
import {
  COMPANIES_TEST_MANAGER_LIST_DID_MOUNT,
  COMPANIES_TEST_MANAGER_LIST_FETCH
} from "@redux/constants";
import { getCompany } from "@helpers/http-api-client";
import { getDefaultPaginationOptions } from "@utils/default-objects";

export function* companiesListTestManagerDidMountFork() {
  yield takeLatest(COMPANIES_TEST_MANAGER_LIST_DID_MOUNT, function*({
    payload
  }) {
    yield put(
      companyTestManagerActions.companiesTestManagerListFetch(getDefaultPaginationOptions())
    );
  });
}

export function* companiesListTestManagerFetchFork() {
  yield takeLatest(COMPANIES_TEST_MANAGER_LIST_FETCH, function*({ payload }) {
    try {
      const data = yield call(getCompany, payload);
      yield put(companyActions.companiesListSuccess(data));
      yield put(companyActions.companiesListDone());
    } catch (e) {
      console.log(e);
      yield put(companyActions.companiesListError(e));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(companiesListTestManagerDidMountFork),
    fork(companiesListTestManagerFetchFork)
  ]);
}
