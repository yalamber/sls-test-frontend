import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './user/saga';
import companiesSagas from './companies/saga';
import agenciesSagas from './agencies/saga';
import companiesTestManagerSagas from './companies/test-manager/saga';
import agenciesTestManagerSagas from './agencies/test-manager/saga';
import companiesUsersSagas from './companies/users/saga';
import rolesSagas from './role/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    companiesSagas(),
    agenciesSagas(),
    companiesTestManagerSagas(),
    agenciesTestManagerSagas(),
    companiesUsersSagas(),
    rolesSagas()
  ]);
}
