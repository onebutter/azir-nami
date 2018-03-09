import _ from 'lodash';
import { logoutRequest } from '../actions';

export default function createAuthorizationMiddleware() {
  return store => next => action => {
    if (action.error && action.error.status && action.error.status === 401) {
      store.dispatch(logoutRequest());
      return next(action);
    }

    if (action.meta) {
      const state = store.getState();
      const { auth } = state;
      if (!auth) {
        return next(action);
      }
      const { isAuthorized } = state.auth.access;
      let newAction = { ...action };
      if (action.meta.authorization) {
        const { token } = state.auth.access;
        if (isAuthorized) {
          if (token) {
            _.set(newAction, 'meta.token', token);
          } else {
            _.set(newAction, 'meta.token', null);
          }
        }
      }

      if (action.meta.requestingUser) {
        const { user } = state.auth;
        if (isAuthorized) {
          if (user) {
            _.set(newAction, 'meta.user', user);
          } else {
            _.set(newAction, 'meta.user', null);
          }
        }
      }
      return next(newAction);
    }
    next(action);
  };
}
