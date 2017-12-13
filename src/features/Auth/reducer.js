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

const initialState = {
  isAuthorized: false,
  username: '',
  token: null
};

const access = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  status,
  access
});
