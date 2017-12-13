import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import namecard from 'Features/Namecard/reducer';
import register from 'Features/Register/reducer';
import auth from 'Features/Auth/reducer';

export const createReducers = () => {
  return combineReducers({
    auth,
    namecard,
    register,
    router: routerReducer
  });
};
