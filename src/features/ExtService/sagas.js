import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

function* fetchDiscordData(action) {
  console.log(action)
}

function* watchDiscordCode() {
  yield takeLatest(actions.EXT_DISCORD_CODE_SUCCESS, fetchDiscordData);
}

export default [watchDiscordCode()];
