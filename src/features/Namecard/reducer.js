import { combineReducers } from 'redux';
import { createStatus } from 'Utils/reducer';
import _ from 'lodash';
import * as actions from './actions';
const {
  NAMECARD_LOAD_REQUEST,
  NAMECARD_LOAD_SUCCESS,
  NAMECARD_LOAD_ERROR,
  NAMECARD_CREATE_REQUEST,
  NAMECARD_CREATE_SUCCESS,
  NAMECARD_CREATE_ERROR,
  NAMECARD_DELETE_REQUEST,
  NAMECARD_DELETE_SUCCESS,
  NAMECARD_DELETE_ERROR
} = actions;

const status = createStatus({
  request: [
    NAMECARD_LOAD_REQUEST,
    NAMECARD_CREATE_REQUEST,
    NAMECARD_DELETE_REQUEST
  ],
  success: [
    NAMECARD_LOAD_SUCCESS,
    NAMECARD_CREATE_SUCCESS,
    NAMECARD_DELETE_SUCCESS
  ],
  error: [NAMECARD_LOAD_ERROR, NAMECARD_CREATE_ERROR, NAMECARD_DELETE_ERROR]
});

const byName = (state = [], action) => {
  switch (action.type) {
    case NAMECARD_CREATE_SUCCESS: {
      return [...state, action.payload];
    }
    case NAMECARD_LOAD_SUCCESS: {
      return [...state, ...action.data];
    }
    case NAMECARD_DELETE_SUCCESS: {
      return []; // TODO - delte a namecard
    }
    default:
      return state;
  }
};

const entities = (state = {}, action) => {
  switch (action.type) {
    case NAMECARD_CREATE_SUCCESS: {
      const { username } = action.meta.user;
      state = {
        ...state,
        [username]: byName(state[username], action)
      };
      return state;
    }
    case NAMECARD_LOAD_SUCCESS: {
      return {
        ...state,
        [action.username]: byName(state[action.username], action)
      };
    }
    case NAMECARD_DELETE_SUCCESS: {
      const { username } = action.meta.user;
      state = {
        ...state,
        [username]: byName(state[username], action)
      };
      return state;
    }
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch (action.type) {
    case NAMECARD_LOAD_REQUEST:
    case NAMECARD_LOAD_SUCCESS:
    case NAMECARD_CREATE_REQUEST:
    case NAMECARD_CREATE_SUCCESS:
    case NAMECARD_DELETE_REQUEST:
    case NAMECARD_DELETE_SUCCESS:
      return {};
    case NAMECARD_LOAD_ERROR:
    case NAMECARD_CREATE_ERROR:
    case NAMECARD_DELETE_ERROR:
      return { ...action.error };
    default:
      return state;
  }
};

export default combineReducers({
  status,
  error,
  entities
});
