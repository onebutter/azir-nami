import { combineReducers } from 'redux';
import { createStatus } from 'Utils/reducer';
import * as actions from './actions';
const {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS
} = actions;

const status = createStatus({
  request: [AUTH_LOGIN_REQUEST, AUTH_LOGOUT_REQUEST],
  success: [AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS],
  error: [AUTH_LOGIN_ERROR, AUTH_LOGOUT_ERROR]
});

const _access = {
  isAuthorized: false,
  token: null
};

const access = (state = _access, action) => {
  switch (action.type) {
    case AUTH_LOGOUT_REQUEST:
      return _access;
    case AUTH_LOGIN_SUCCESS:
      return {
        isAuthorized: true,
        token: action.token
      };
    default:
      return state;
  }
};

const _user = {
  id: '',
  username: ''
};

const user = (state = _user, action) => {
  switch (action.type) {
    case AUTH_LOGOUT_REQUEST:
      return _user;
    case AUTH_LOGIN_SUCCESS: {
      const { username, id } = action.user;
      return { username, id };
    }
    default:
      return state;
  }
};

const error = (state, action) => {
  switch (action.type) {
    case AUTH_LOGOUT_ERROR:
    case AUTH_LOGIN_ERROR:
      return { ...action.error };
    default:
      return {};
  }
};

export default combineReducers({
  status,
  error,
  user,
  access
});
