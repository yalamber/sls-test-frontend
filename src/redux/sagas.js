import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import mySagas from './my/saga';
import companiesSagas from './companies/saga';
import agenciesSagas from './agencies/saga';
import companiesTestManagerSagas from './companies/test-manager/saga';
import agenciesTestManagerSagas from './agencies/test-manager/saga';
import companiesUsersSagas from './companies/users/saga';
//app sagas
import systemAppSagas from '@app/SystemApp/redux/sagas';
import clientAppSagas from '@app/ClientApp/redux/sagas';
import agencyAppSagas from '@app/AgencyApp/redux/sagas';
import freelancerAppSagas from '@app/FreelancerApp/redux/sagas';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    mySagas(),
    companiesSagas(),
    agenciesSagas(),
    companiesTestManagerSagas(),
    agenciesTestManagerSagas(),
    companiesUsersSagas(),
    //app sagas
    systemAppSagas(),
    clientAppSagas(),
    agencyAppSagas(),
    freelancerAppSagas()
  ]);
}
