import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  getNamecards_Q_username,
  getNamecards,
  postNamecards,
  deleteNamecards
} from './services';
import * as actions from './actions';

export function* watchNamecardLoadRequest() {
  yield takeLatest(actions.NAMECARD_LOAD_REQUEST, loadNamecard);
}

function* loadNamecard(action) {
  try {
    if (!action.username) {
      const data = yield call(getNamecards, action.meta.token);
      yield put(actions.loadNamecardSuccess(action.meta.user.username, data));
    } else {
      const data = yield call(
        getNamecards_Q_username,
        action.meta.token,
        action.username
      );
      yield put(actions.loadNamecardSuccess(action.username, data));
    }
  } catch (error) {
    yield put(actions.loadNamecardError(action.username, error));
  }
}

export function* watchNamecardCreateRequest() {
  yield takeLatest(actions.NAMECARD_CREATE_REQUEST, createNamecard);
}

function* createNamecard(action) {
  try {
    const data = yield call(postNamecards, action.meta.token, action.payload);
    yield put(actions.createNamecardSuccess(data));
    yield put(push('/manage'));
  } catch (error) {
    yield put(actions.createNamecardError(error.response));
  }
}

export function* watchNamecardDeleteRequest() {
  yield takeLatest(actions.NAMECARD_DELETE_REQUEST, deleteNamecard);
}

function* deleteNamecard(action) {
  try {
    const { id, meta } = action;
    const data = yield call(deleteNamecards, meta.token, id);
    yield put(actions.deleteNamecardSuccess(data));
    yield put(push('/manage'));
  } catch (error) {
    yield put(actions.deleteNamecardError(error.response));
  }
}

export default [
  watchNamecardLoadRequest(),
  watchNamecardCreateRequest(),
  watchNamecardDeleteRequest()
];
