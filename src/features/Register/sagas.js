import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as authActions from 'Features/Auth/actions';
import { postRegisterAPI } from 'Utils/api';

export function* register(action) {
  try {
    yield call(postRegisterAPI, action.credentials);
    yield put(actions.submitCredentialSuccess());
    yield put(
      authActions.loginRequest(action.credentials, '/register/addcard')
    );
  } catch (error) {
    yield put(actions.submitCredentialError(error));
  }
}

export function* watchCredentialSubmitRequest() {
  yield takeLatest(actions.REGISTER_CREDENTIAL_SUBMIT_REQUEST, register);
}

export default [watchCredentialSubmitRequest()];
