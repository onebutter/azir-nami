import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { postRegister } from 'Utils/api';

export function* register(action) {
  try {
    const data = yield call(postRegister, action.credentials);
    yield put(actions.submitCredentialSuccess());
  } catch (error) {
    yield put(actions.submitCredentialError(error));
  }
}

export function* watchCredentialSubmitRequest() {
  yield takeLatest(actions.REGISTER_CREDENTIAL_SUBMIT_REQUEST, register);
}

export default [watchCredentialSubmitRequest()];
