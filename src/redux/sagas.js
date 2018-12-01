import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './user/saga';
import companiesSagas from './companies/saga';
import companiesTestManagerSagas from './companies/test-manager/saga';
import agenciesSagas from './agencies/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    companiesSagas(),
    agenciesSagas(),
    companiesTestManagerSagas()
  ]);
}
