import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken, clearToken } from '../../helpers/utility';
import actions from './actions';
import {signIn} from "../../actions/userAction";
import notification from '../../components/notification';


//const fakeApiCall = true; // auth0 or express JWT

// export function* loginRequest() {
//   yield takeEvery('LOGIN_REQUEST', function*() {
//     if (fakeApiCall) {
//       yield put({
//         type: actions.LOGIN_SUCCESS,
//         token: 'secret token',
//         profile: 'Profile'
//       });
//     } else {
//       yield put({ type: actions.LOGIN_ERROR });
//     }
//   });
// }
export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { history, userInfo } = payload;
    const result = yield call(signIn, payload);
    if (result.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: result,
        token: result.token,
        history
      });
    } else {
      notification('error', 'login failed');
      yield put({ type: actions.LOGIN_ERROR });
    }
    // signIn(payload).then(res => {
    //   if (res.token) {
    //     yield put({
    //       type: actions.LOGIN_SUCCESS,
    //       payload: res,
    //       token: res.token
    //     });
    //   } else {
    //     yield put({ type: actions.LOGIN_ERROR });
    //   }
    //   console.log(res);
    // })
    // .catch(error => {
    //   if (error.response.status === 422) {
    //     this.setState({errors: error.response.data});
    //     window.scrollTo(0, 0)
    //   }
    // }).finally(() => {
    //   this.setState({loading: false});
    // })
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile'
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
