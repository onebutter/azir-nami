import { logoutRequest } from '../../actions';

export default function createAuthorizationMiddleware() {
  return store => next => action => {
    if (
      action.error &&
      action.error.response &&
      action.error.response.status === 401
    ) {
      store.dispatch(logoutRequest());
      return next(action);
    }

    if (action.meta && action.meta.authorization) {
      const state = store.getState();
      const isAuthorized = state.auth.access.isAuthorized;
      if (!isAuthorized) {
        store.dispatch(logoutRequest());
        return next(action);
      }
      const { token } = state.auth.access;
      if (isAuthorized && token) {
        const newAction = { ...action, meta: { ...action.meta, token } };
        return next(newAction);
      }
    }
    next(action);
  };
}
