import { call, put, takeLatest } from 'redux-saga/effects';
import { getDiscordToken, getDiscordUser } from './services';
import * as actions from './actions';

function* genTokenFromCode(action) {
  try {
    const { code, redirectUrl } = action;
    const data = yield call(getDiscordToken, action.meta.token, {
      code,
      redirectUrl
    });
    yield put(actions.discordTokenSuccess(data));
    // in turns go request for the real data
    const accountInfo = yield call(getDiscordUser, data.access_token);
    yield put(actions.discordUserDataSuccess(accountInfo));
  } catch (error) {
    yield put(actions.discordTokenError(error.response));
  }
}

function* watchDiscordCode() {
  yield takeLatest(actions.EXT_DISCORD_CODE_SUCCESS, genTokenFromCode);
}

export default [watchDiscordCode()];
