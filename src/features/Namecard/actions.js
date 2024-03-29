export const NAMECARD_LOAD_REQUEST = 'NAMECARD_LOAD_REQUEST';
export const NAMECARD_LOAD_SUCCESS = 'NAMECARD_LOAD_SUCCESS';
export const NAMECARD_LOAD_ERROR = 'NAMECARD_LOAD_ERROR';

export const NAMECARD_CREATE_REQUEST = 'NAMECARD_CREATE_REQUEST';
export const NAMECARD_CREATE_SUCCESS = 'NAMECARD_CREATE_SUCCESS';
export const NAMECARD_CREATE_ERROR = 'NAMECARD_CREATE_ERROR';

export const NAMECARD_DELETE_REQUEST = 'NAMECARD_DELETE_REQUEST';
export const NAMECARD_DELETE_SUCCESS = 'NAMECARD_DELETE_SUCCESS';
export const NAMECARD_DELETE_ERROR = 'NAMECARD_DELETE_ERROR';

export const loadNamecardRequest = (username = null) => ({
  type: NAMECARD_LOAD_REQUEST,
  meta: { authorization: true, requestingUser: true },
  username
});

export const loadNamecardSuccess = (username, data) => ({
  type: NAMECARD_LOAD_SUCCESS,
  username,
  data
});

export const loadNamecardError = (username, error) => ({
  type: NAMECARD_LOAD_ERROR,
  username,
  error
});

export const createNamecardRequest = payload => ({
  type: NAMECARD_CREATE_REQUEST,
  meta: { authorization: true },
  payload
});

export const createNamecardSuccess = payload => ({
  type: NAMECARD_CREATE_SUCCESS,
  meta: { requestingUser: true },
  payload
});

export const createNamecardError = error => ({
  type: NAMECARD_CREATE_ERROR,
  error
});

export const deleteNamecardRequest = id => ({
  type: NAMECARD_DELETE_REQUEST,
  meta: { authorization: true, requestingUser: true },
  id
});

export const deleteNamecardSuccess = payload => ({
  type: NAMECARD_DELETE_SUCCESS,
  meta: { requestingUser: true },
  payload
});

export const deleteNamecardError = error => ({
  type: NAMECARD_DELETE_ERROR,
  error
});
