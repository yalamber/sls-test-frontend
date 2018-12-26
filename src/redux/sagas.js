import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import mySagas from './my/saga';
//app sagas
import systemAppSagas from '@app/SystemApp/redux/sagas';
import clientAppSagas from '@app/ClientApp/redux/sagas';
import agencyAppSagas from '@app/AgencyApp/redux/sagas';
import freelancerAppSagas from '@app/FreelancerApp/redux/sagas';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    mySagas(),
    //app sagas
    systemAppSagas(),
    clientAppSagas(),
    agencyAppSagas(),
    freelancerAppSagas()
  ]);
}
