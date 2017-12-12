import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import namecard from 'Features/Namecard/reducer';

export const createReducers = () => {
  return combineReducers({
    namecard,
    router: routerReducer
  });
};
