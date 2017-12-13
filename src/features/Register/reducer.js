import { combineReducers } from 'redux';
import { createStatus } from 'Utils/reducer';
import * as actions from './actions';
const {
  REGISTER_CREDENTIAL_SUBMIT_REQUEST,
  REGISTER_CREDENTIAL_SUBMIT_SUCCESS,
  REGISTER_CREDENTIAL_SUBMIT_ERROR
} = actions;

const status = createStatus({
  request: [REGISTER_CREDENTIAL_SUBMIT_REQUEST],
  success: [REGISTER_CREDENTIAL_SUBMIT_SUCCESS],
  error: [REGISTER_CREDENTIAL_SUBMIT_ERROR]
});

export default combineReducers({
  status
});
