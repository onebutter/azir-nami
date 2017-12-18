import { call, put, takeLatest } from 'redux-saga/effects';
import { getNamecards_Q_username, postNamecards } from './services';
import * as actions from './actions';

export function* watchNamecardLoadRequest() {
  yield takeLatest(actions.NAMECARD_LOAD_REQUEST, loadNamecard);
}

export function* loadNamecard(action) {
  try {
    const data = yield call(
      getNamecards_Q_username,
      action.meta.token,
      action.username
    );
    yield put(actions.loadNamecardSuccess(action.username, data));
  } catch (error) {
    yield put(actions.loadNamecardError(action.username, error));
  }
}

export function* watchNamecardCreateRequest() {
  yield takeLatest(actions.NAMECARD_CREATE_REQUEST, createNamecard);
}

export function* createNamecard(action) {
  try {
    const data = yield call(postNamecards, action.meta.token, action.payload);
    yield put(actions.createNamecardSuccess(data));
  } catch (error) {
    yield put(actions.createNamecardError(error));
  }
}

export default [watchNamecardLoadRequest(), watchNamecardCreateRequest()];
