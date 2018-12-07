import { all } from 'redux-saga/effects';
import roleSagas from './role/sagas';
import clientSagas from './client/sagas';
import agencySagas from './agency/sagas';
import systemUserSagas from './systemUser/sagas';

export default function* systemAppSaga() {
  yield all([
    roleSagas(), 
    clientSagas(),
    agencySagas(),
    systemUserSagas(),
  ]);
}
