import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import namecard from 'Features/Namecard/reducer';
import register from 'Features/Register/reducer';

export const createReducers = () => {
  return combineReducers({
    namecard,
    register,
    router: routerReducer
  });
};
