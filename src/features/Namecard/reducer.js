import { combineReducers } from 'redux';
import { createStatus } from 'Utils/reducer';
import _ from 'lodash';
import * as actions from './actions';
const {
  NAMECARD_LOAD_REQUEST,
  NAMECARD_LOAD_SUCCESS,
  NAMECARD_LOAD_ERROR
} = actions;

const status = createStatus({
  request: [NAMECARD_LOAD_REQUEST],
  success: [NAMECARD_LOAD_SUCCESS],
  error: [NAMECARD_LOAD_ERROR]
});

const namecards = (state = {}, action) => {
  switch (action.type) {
    case NAMECARD_LOAD_SUCCESS: {
      return _.reduce(
        action.data,
        (acc, v) => {
          if (!acc[v.privacy]) {
            acc[v.privacy] = [];
          }
          acc[v.privacy] = [...acc[v.privacy], v];
          return acc;
        },
        state
      );
    }
    default:
      return state;
  }
};

const entitiesInitial = {};
const entities = (state = entitiesInitial, action) => {
  switch (action.type) {
    case NAMECARD_LOAD_SUCCESS:
      state = {
        ...state,
        [action.username]: namecards(state[action.username], action)
      };
      return state;
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch (action.type) {
    case NAMECARD_LOAD_REQUEST:
    case NAMECARD_LOAD_SUCCESS:
      return {};
    case NAMECARD_LOAD_ERROR:
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
