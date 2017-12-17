import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as actions from './actions';
import { postLoginAPI } from './services';

export function* login(action) {
  try {
    const data = yield call(postLoginAPI, action.credentials);
    yield put(actions.loginSuccess(data.user, data.auth.token));
    if (action.redirect) {
      yield put(push(action.redirect));
    }
  } catch (error) {
    yield put(actions.loginError(error));
  }
}

export function* watchLoginRequest() {
  yield takeLatest(actions.AUTH_LOGIN_REQUEST, login);
}

export function* logout() {
  try {
    yield put(actions.logoutSuccess());
    yield put(push('/'));
    yield put({ type: 'RESET' });
  } catch (error) {
    yield put(actions.logoutError(error));
  }
}

export function* watchLogoutRequest() {
  yield takeLatest(actions.AUTH_LOGOUT_REQUEST, logout);
}

export default [watchLoginRequest(), watchLogoutRequest()];
