import {
  all,
  call,
  put,
  takeLatest,
  fork
} from "redux-saga/effects";
import * as agencyActions from "../actions";
import * as agencyTestManagerActions from "./actions";

import {
  AGENCIES_TEST_MANAGER_LIST_DID_MOUNT,
  AGENCIES_TEST_MANAGER_LIST_FETCH
} from "@redux/constants";
import { getAgency } from "@helpers/http-api-client";
import { getDefaultPaginationOptions } from "@utils/default-objects";

export function* agenciesListTestManagerDidMountFork() {
  yield takeLatest(AGENCIES_TEST_MANAGER_LIST_DID_MOUNT, function*({
    payload
  }) {
    yield put(
      agencyTestManagerActions.agenciesTestManagerListFetch(getDefaultPaginationOptions())
    );
  });
}

export function* agenciesListTestManagerFetchFork() {
  yield takeLatest(AGENCIES_TEST_MANAGER_LIST_FETCH, function*({ payload }) {
    try {
      const data = yield call(getAgency, payload);
      yield put(agencyActions.agenciesListSuccess(data));
      yield put(agencyActions.agenciesListDone());
    } catch (e) {
      console.log(e);
      yield put(agencyActions.agenciesListError(e));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(agenciesListTestManagerDidMountFork),
    fork(agenciesListTestManagerFetchFork)
  ]);
}
