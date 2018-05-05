import { combineReducers } from 'redux';
import { createStatus } from 'Utils/reducer';
import * as actions from './actions';
const {
  EXT_DISCORD_CODE_REQUEST,
  EXT_DISCORD_CODE_SUCCESS,
  EXT_DISCORD_USERDATA_SUCCESS,
  EXT_GITHUB_CODE_REQUEST,
  EXT_GITHUB_CODE_SUCCESS,
  EXT_GITHUB_USERDATA_SUCCESS
} = actions;

const requested = (state = null, action) => {
  switch (action.type) {
    case EXT_DISCORD_CODE_REQUEST:
      return 'discord';
    case EXT_GITHUB_CODE_REQUEST:
      return 'github';
    case EXT_DISCORD_CODE_SUCCESS:
    case EXT_GITHUB_CODE_SUCCESS:
      return null;
    default:
      return state;
  }
};

const codes = (state = {}, action) => {
  switch (action.type) {
    case EXT_DISCORD_CODE_SUCCESS:
      return { ...state, discord: action.code };
    case EXT_DISCORD_CODE_REQUEST:
      return { ...state, discord: null };
    case EXT_GITHUB_CODE_SUCCESS:
      return { ...state, github: action.code };
    case EXT_GITHUB_CODE_REQUEST:
      return { ...state, github: null };
    default:
      return state;
  }
};

const entities = (state = {}, action) => {
  switch (action.type) {
    case EXT_DISCORD_USERDATA_SUCCESS:
      return {
        ...state,
        discord: `${action.data.username}#${action.data.discriminator}`
      };
    case EXT_GITHUB_USERDATA_SUCCESS:
      return {
        ...state,
        github: `${action.data.login}`
      };
    default:
      return state;
  }
};

const status = createStatus({
  request: [EXT_DISCORD_CODE_REQUEST, EXT_GITHUB_CODE_REQUEST],
  success: [EXT_DISCORD_CODE_SUCCESS, EXT_GITHUB_CODE_SUCCESS],
  error: []
});

export default combineReducers({
  requested,
  codes,
  entities,
  status
});
