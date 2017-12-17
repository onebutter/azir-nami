import { call, put, takeLatest } from 'redux-saga/effects';
import { getNamecardsByUsernameAPI } from './services';
import * as actions from './actions';

export function* watchNamecardLoadRequest() {
  yield takeLatest(actions.NAMECARD_LOAD_REQUEST, loadNamecard);
}

export function* loadNamecard(action) {
  try {
    const data = yield call(
      getNamecardsByUsernameAPI,
      action.meta.token,
      action.username
    );
    yield put(actions.loadNamecardSuccess(action.username, data));
  } catch (error) {
    yield put(actions.loadNamecardError(action.username, error));
  }
}

export default [watchNamecardLoadRequest()];
