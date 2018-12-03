import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork
} from "redux-saga/effects";
import * as companyActions from "../actions";
import * as companyUsersActions from "./actions";

import {
  COMPANIES_USERS_LIST_DID_MOUNT,
  COMPANIES_USERS_LIST_FETCH
} from "@redux/constants";
import { getCompany, getCompanyUsers } from "@helpers/http-api-client";
import { getDefaultPaginationOptions } from "@utils/default-objects";

export function* companiesUsersListDidMountFork() {
  yield takeLatest(COMPANIES_USERS_LIST_DID_MOUNT, function*({ payload }) {
    yield put(
      companyUsersActions.companiesUsersListFetch({
        ...getDefaultPaginationOptions(),
        ...payload
      })
    );
  });
}

export function* companiesUsersListFetchFork() {
  yield takeLatest(COMPANIES_USERS_LIST_FETCH, function*({ payload }) {
    let couldBeUsersError = false;
    try {
      const { companyId, paginationOptions } = payload;
      const data = yield call(getCompany, companyId);
      yield put(companyActions.companiesListSuccess(data));
      yield put(companyActions.companiesListDone());

      couldBeUsersError = true;
      const dataUsers = yield call(
        getCompanyUsers,
        companyId,
        { paginationOptions }
      );

      yield put(companyUsersActions.companiesUsersListSuccess(dataUsers));
      yield put(companyUsersActions.companiesUsersListDone());
    } catch (e) {
      console.log(e);
      if (couldBeUsersError === true) {
        yield put(companyUsersActions.companiesUsersListError(e));
      } else {
        yield put(companyActions.companiesListError(e));
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(companiesUsersListDidMountFork),
    fork(companiesUsersListFetchFork)
  ]);
}
