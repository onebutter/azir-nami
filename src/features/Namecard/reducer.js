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
  request: [NAMECARD_LOAD_REQUEST, NAMECARD_CREATE_REQUEST],
  success: [NAMECARD_LOAD_SUCCESS, NAMECARD_CREATE_SUCCESS],
  error: [NAMECARD_LOAD_ERROR, NAMECARD_CREATE_ERROR]
});

const byName = (state = {}, action) => {
  switch (action.type) {
    case NAMECARD_CREATE_SUCCESS: {
      const { privacy } = action.payload;
      let newState = {
        ...state
      };

      if (privacy === 'default') {
        _.forEach(state.default, v => (v.privacy = 'public'));
        _.merge(newState.public, state.default);
        delete newState.default;
      }

      if (newState[privacy]) {
        newState[privacy] = {
          ...state[privacy],
          [action.payload.id]: action.payload
        };
      } else {
        newState[privacy] = {
          [action.payload.id]: action.payload
        };
      }
      return newState;
    }
    case NAMECARD_LOAD_SUCCESS: {
      return _.reduce(
        action.data,
        (acc, v) => {
          if (!acc[v.privacy]) {
            acc[v.privacy] = {};
          }
          acc[v.privacy][v.id] = v;
          return acc;
        },
        {}
      );
    }
    case NAMECARD_DELETE_SUCCESS: {
      return _.reduce(
        state,
        (acc, v, k) => {
          if (k !== action.payload.privacy) {
            acc[k] = v;
          } else {
            acc[k] = _.omit(v, action.payload.id.toString());
          }
          return acc;
        },
        {}
      );
    }
    default:
      return state;
  }
};

const entitiesInitial = {};
const entities = (state = entitiesInitial, action) => {
  switch (action.type) {
    case NAMECARD_CREATE_SUCCESS: {
      const { username } = action.meta.user;
      state = {
        ...state,
        [username]: byName(state[username], action)
      };
      return state;
    }
    case NAMECARD_LOAD_SUCCESS:
      state = {
        ...state,
        [action.username]: byName(state[action.username], action)
      };
      return state;
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
