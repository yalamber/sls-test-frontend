import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { omit } from 'lodash';
import actions from './actions';
import SWQAClient from "@helpers/apiClient";

//request agency saga
export function* requestAgencyList() {
  yield takeLatest(actions.REQUEST_AGENCY_LIST, function* ({ payload }) {
    try {
      let offset = payload.pageSize * (payload.page - 1);
      const data = yield call(SWQAClient.getAgencies, {
        offset,
        limit: payload.pageSize
      });
      data.paginationOptions = {
        current: payload.page
      };
      yield put(actions.receiveAgencies({
        agencyListData: data
      }));
    } catch (e) {
      yield put({ type: actions.ERROR_AGENCY_LIST, error: e });
    }
  });
}
//error agency list saga
export function* errorAgencyList() {
  yield takeEvery(actions.ERROR_AGENCY_LIST, function*({ error }) {
    //TODO make log when error
  });
}

//request current agency
export function* requestCurrentAgency() {
  yield takeLatest(actions.REQUEST_CURRENT_AGENCY, function* ({ agencyId }) {
    try {
      const data = yield call(SWQAClient.getAgency, agencyId);
      yield put(actions.receiveCurrentAgency(data));
    } catch (e) {
      yield put({ type: actions.ERROR_CURRENT_AGENCY, error: e });
    }
  });
}

//error current agency
export function* errorCurrentAgency() {
  yield takeEvery(actions.ERROR_CURRENT_AGENCY, function*({ error }) {
    //TODO make log when error
  });
}

//request agency user list 
export function* requestAgencyUserList() {
  yield takeLatest(actions.REQUEST_AGENCY_USER_LIST, function* ({ agencyId, options }) {
    try {
      let offset = options.pageSize * (options.page - 1);
      const data = yield call(SWQAClient.getAgencyUsers, agencyId, {
        offset,
        limit: options.pageSize
      });
      data.paginationOptions = {
        current: options.page
      };
      yield put(actions.receiveAgencyUsers({
        userListData: data
      }));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_AGENCY_USER_LIST, error: e });
    }
  });
}
//error agency user list
export function* errorAgencyUserList() {
  yield takeEvery(actions.ERROR_AGENCY_USER_LIST, function*() {

  });
}

export function* requestCurrentAgencyUser() {
  yield takeLatest(actions.REQUEST_CURRENT_AGENCY_USER, function* ({ agencyId, userId }) {
    try {
      const data = yield call(SWQAClient.getAgencyUser, agencyId, userId);
      yield put(actions.receiveCurrentAgencyUser(data));
    } catch (e) {
      yield put({ type: actions.ERROR_CURRENT_AGENCY_USER, error: e });
    }
  });
}

//creat agency user
export function* requestCreateAgencyUser() {
  yield takeLatest(actions.REQUEST_CREATE_AGENCY_USER, function* ({ agencyId, userData, history }) {
    try {
      let roleId = userData.role;
      let status = userData.status;
      userData = omit(userData, ['role', 'status']);
      const data = yield call(SWQAClient.createUser, userData);
      const membership = yield call(SWQAClient.addAgencyUser, agencyId, {
        status: status,
        roleId: roleId,
        userId: data.userId
      });
      yield put({
        type: actions.RECEIVE_CREATE_AGENCY_USER,
        membership,
        history
      });
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_CREATE_AGENCY_USER, error: e });
    }
  });
}


export function* receiveCreateAgencyUser() {
  yield takeEvery(actions.RECEIVE_CREATE_AGENCY_USER, function* ({membership, history}) {
    console.log('here', membership, history);
    if (membership) {
      if (history && history.push) {
        history.push(`/admin/agency/${membership.agencyId}/user/${membership.userId}/details`);
      }
    }
  });
}

//error current agency
export function* errorCurrentAgencyUser() {
  yield takeEvery(actions.ERROR_CURRENT_AGENCY_USER, function*({ error }) {
    //TODO make log when error
  });
}

//request agency roles
export function* requestAgencyRoles() {
  yield takeLatest(actions.REQUEST_AGENCY_USER_ROLES, function* ({ payload }) {
    try {
      const data = yield call(SWQAClient.getRoles, {
        offset: 0,
        limit: 10,
        type: 'agencyUser',
      });
      yield put(actions.receiveAgencyUserRoles(data.rows));
    } catch (e) {
      yield put({ type: actions.ERROR_AGENCY_USER_ROLES, error: e });
    }
  });
}

//error agency roles list
export function* errorAgencyRoles() {
  yield takeEvery(actions.ERROR_AGENCY_USER_ROLES, function*() {

  });
}

//request agency team list 
export function* requestAgencyTeamList() {
  yield takeLatest(actions.REQUEST_AGENCY_TEAM_LIST, function* ({ agencyId, options }) {
    try {
      let offset = options.pageSize * (options.page - 1);
      const data = yield call(SWQAClient.getAgencyTeams, agencyId, {
        offset,
        limit: options.pageSize
      });
      data.paginationOptions = {
        current: options.page
      };
      yield put(actions.receiveAgencyTeams({
        teamListData: data
      }));
    } catch (e) {
      console.log(e);
      yield put({ type: actions.ERROR_AGENCY_TEAM_LIST, error: e });
    }
  });
}

//error agency team list
export function* errorAgencyTeamList() {
  yield takeEvery(actions.ERROR_AGENCY_TEAM_LIST, function*() {

  });
}


export default function* rootSaga() {
  yield all([
    fork(requestAgencyList),
    fork(errorAgencyList),

    fork(requestCurrentAgency),
    fork(errorCurrentAgency),
    
    fork(requestAgencyUserList),
    fork(errorAgencyUserList),
    
    fork(requestCurrentAgencyUser),
    fork(errorCurrentAgencyUser),

    fork(requestAgencyRoles),
    fork(errorAgencyRoles),

    fork(requestCreateAgencyUser),
    fork(receiveCreateAgencyUser),

    fork(requestAgencyTeamList),
    fork(errorAgencyTeamList),
    
  ]);
}
