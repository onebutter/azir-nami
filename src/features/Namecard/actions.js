export const NAMECARD_LOAD_REQUEST = 'NAMECARD_LOAD_REQUEST';
export const NAMECARD_LOAD_SUCCESS = 'NAMECARD_LOAD_SUCCESS';
export const NAMECARD_LOAD_ERROR = 'NAMECARD_LOAD_ERROR';

export const NAMECARD_CREATE_REQUEST = 'NAMECARD_CREATE_REQUEST';
export const NAMECARD_CREATE_SUCCESS = 'NAMECARD_CREATE_SUCCESS';
export const NAMECARD_CREATE_ERROR = 'NAMECARD_CREATE_ERROR';

export const loadNamecardRequest = username => ({
  type: NAMECARD_LOAD_REQUEST,
  meta: { authorization: true },
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
