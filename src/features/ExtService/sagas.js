import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getDiscordToken,
  getGithubToken,
  getDiscordUser,
  getGithubUser
} from './services';
import * as actions from './actions';

function* discordSaga(action) {
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

function* githubSaga(action) {
  try {
    const { code, redirectUrl } = action;
    const data = yield call(getGithubToken, action.meta.token, {
      code,
      redirectUrl
    });
    yield put(actions.githubTokenSuccess(data));
    const accountInfo = yield call(getGithubUser, data.access_token);
    yield put(actions.githubUserDataSuccess(accountInfo));
    yield;
  } catch (error) {
    yield put(actions.githubTokenError(error.response));
  }
}

function* watchDiscordCode() {
  yield takeLatest(actions.EXT_DISCORD_CODE_SUCCESS, discordSaga);
  yield takeLatest(actions.EXT_GITHUB_CODE_SUCCESS, githubSaga);
}

export default [watchDiscordCode()];
