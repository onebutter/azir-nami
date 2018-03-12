import { combineReducers } from 'redux';
import * as actions from './actions';
const { EXT_DISCORD_CODE_REQUEST, EXT_DISCORD_CODE_SUCCESS } = actions;

const requested = (state = null, action) => {
  switch (action.type) {
    case EXT_DISCORD_CODE_REQUEST:
      return 'discord';
    case EXT_DISCORD_CODE_SUCCESS:
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
    default:
      return state;
  }
};

export default combineReducers({
  requested,
  codes,
  // status,
  // entity
});