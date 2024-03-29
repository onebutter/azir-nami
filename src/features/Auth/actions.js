export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';

export const loginRequest = (credentials, redirect) => ({
  type: AUTH_LOGIN_REQUEST,
  credentials,
  redirect
});

export const loginSuccess = (user, token) => ({
  type: AUTH_LOGIN_SUCCESS,
  user,
  token
});

export const loginError = error => ({
  type: AUTH_LOGIN_ERROR,
  error
});

export const logoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS
});

export const logoutError = error => ({
  type: AUTH_LOGOUT_ERROR,
  error
});
