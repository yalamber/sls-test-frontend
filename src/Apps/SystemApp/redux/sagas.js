import { all } from 'redux-saga/effects';
import roleSagas from './role/sagas';
import clientSagas from './client/sagas';

export default function* systemAppSaga() {
  yield all([
    roleSagas(), 
    clientSagas()
  ]);
}
